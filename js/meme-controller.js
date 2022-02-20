'use strict'

var gElCanvas;
var gCtx;

const gTouchEvs = ['touchstart', 'touchmove', 'touchend'];

initCanvas();

function initCanvas() {
    gElCanvas = document.querySelector('canvas');
    gCtx = gElCanvas.getContext('2d');
    addListeners();
}

function addListeners() {
    addMouseListeners();
    addTouchListeners();
    window.addEventListener('resize', () => {
        const elMemeEditor = document.querySelector('.meme-editor-container');
        if (!elMemeEditor.classList.contains('hidden')) {
            resizeMeme();
            renderMeme();
        }
    })
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousemove', onMove);
    gElCanvas.addEventListener('mousedown', onDown);
    gElCanvas.addEventListener('mouseup', onUp);
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchmove', onMove);
    gElCanvas.addEventListener('touchstart', onDown);
    gElCanvas.addEventListener('touchend', onUp);
}

function renderMeme() {
    const { selectedImgId, lines } = getMeme();
    const img = getImgFromlocal(selectedImgId);
    img.onload = () => {
        resizeMeme();
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);

        lines.forEach(line => {
            setLineSettings(line);
            if (!getLinePos()) {
                setLinePos(createPos(getCanvasMiddle(getDefualtTxt()),
                    getInitialLineYPos(1)));
            }
            drawText(line.txt, line.pos.x, line.pos.y, line.size);
        });

        if (getLineText()) renderLineFocus();
    }
}

function onTextChange(txt) {
    if (!getCurrLine()) {
        addLine();
        const txtColor = document.querySelector('input[name="text-color"]').value;
        setTxtColor(txtColor);
    }
    setLineTxt(txt);
    renderMeme();
}

function onTxtColorChange(color) {
    if (!getNumberOfLines()) return;

    setTxtColor(color);
    renderMeme();
}

function onFontSizeChange(change) {
    if (!getNumberOfLines()) return;

    changeFontSize(change);
    renderMeme();
}

function onTxtAlign(align) {
    const canvasWidth = gElCanvas.width;
    const { pos, txt } = getCurrLine();
    const txtWidth = getTxtWidth(txt);
    var alignedX;

    switch (align) {
        case 'left':
            alignedX = 20;
            break;
        case 'center':
            alignedX = (canvasWidth - txtWidth) / 2;
            break;
        case 'right':
            alignedX = (canvasWidth * 19 / 20) - txtWidth;
            break;
    }

    setLinePos(createPos(alignedX, pos.y));
    renderMeme();
}

function onSwitchLineFocus() {
    if (!getNumberOfLines()) return;

    const { selectedLineIdx, lines } = getMeme();
    const nextLineIdx = selectedLineIdx + 1 < lines.length ? selectedLineIdx + 1 : 0;
    setSelectedLineIdx(nextLineIdx);

    document.querySelector('input[name="meme-text"]').value = getLineText();
    document.querySelector('input[name="text-color"]').value = getTxtColor();

    renderMeme();
}

function onAddLine(lineTxt = getDefualtTxt()) {
    const numOfLines = addLine(lineTxt);
    const newLineIdx = numOfLines - 1;
    setSelectedLineIdx(newLineIdx);

    const linePos = createPos(getCanvasMiddle(lineTxt),
        getInitialLineYPos(numOfLines));
    setLinePos(linePos);

    setElInputs();
    renderMeme();
}

function onDeleteLine() {
    deleteLine();

    if (getCurrLine()) setElInputs(getLineText(), getTxtColor())
    else setElInputs();

    renderMeme();
}

function renderLineFocus() {
    const currLine = getCurrLine();
    if (!currLine) return

    const { txt, size, pos } = currLine;
    setLineSettings(currLine);
    drawRect(pos.x - 10, pos.y + 15, getTxtWidth(txt) + 20, -size - 20);
}

function drawRect(x, y, textWidth, fontSize) {
    gCtx.rect(x, y, textWidth, fontSize)
    gCtx.stroke()
}

function setElInputs(txt = '', color = '#ffffff') {
    const elMemeTextInput = document.querySelector('input[name="meme-text"]');
    if (!txt) {
        elMemeTextInput.placeholder = getDefualtTxt();
    }

    document.querySelector('input[name="meme-text"]').value = txt;
    document.querySelector('input[name="text-color"]').value = color;
}

function getImgFromlocal(imgId = 1) {
    const img = new Image();
    img.src = `imgs/${imgId}.jpg`;
    return img;
}

function setLineSettings(line, stroke = 'black', lineWidth = 1) {
    gCtx.font = `${line.size}px ${line.font}`;
    gCtx.fillStyle = line.color;
    gCtx.lineWidth = lineWidth; // need to change
    gCtx.strokeStyle = stroke; // need to change
}

function drawText(text, x, y) {
    gCtx.fillText(text, x, y);
    gCtx.strokeText(text, x, y);
}

function getTxtWidth(txt) {
    return gCtx.measureText(txt).width;
}

function getCanvasMiddle(txt) {
    const txtWidth = getTxtWidth(txt);
    return (gElCanvas.width - txtWidth) / 2;
}

function resizeMeme() {
    const elContainer = document.querySelector('.editor-options-container');
    gElCanvas.width = elContainer.offsetWidth;
    gElCanvas.height = elContainer.offsetHeight;
}

// TODO: fix line top border not showing if first line was resized
function resizeTxtForCanvas() {
    const line = getCurrLine();
    const SIDE_PADDING = 20;
    var isTxtResized = false;
    setLineSettings(line);
    while (getTxtWidth(line.txt) + SIDE_PADDING > gElCanvas.width) {
        changeFontSize(-1);
        setLineSettings(line);
        isTxtResized = true;
    }

    if (isTxtResized) {
        var lineY = line.pos ? line.pos.y : line.size;
        setLinePos(createPos(SIDE_PADDING, lineY));
    }
}

function getInitialLineYPos(numOfLines) {
    const BORDER_TOP_PADDING = 20;
    const fontSize = getDefualtTxtSize();
    if (numOfLines === 1) return fontSize + BORDER_TOP_PADDING;
    else if (numOfLines === 2) return gElCanvas.height - fontSize;
    else return gElCanvas.height / 2;
}

function onDown(ev) {
    if (!getNumberOfLines()) return;

    const pos = getEvPos(ev)
    if (!isOverLine(pos, getTxtWidth(getLineText()))) return;

    setLineDrag(true);
    setLinePos(pos);
}

function onMove(ev) {
    if (!getNumberOfLines()) return;

    const pos = getEvPos(ev);
    if (!gTouchEvs.includes(ev.type) &&
        isOverLine(pos, getTxtWidth(getLineText()))) {
        document.body.style.cursor = 'pointer';
    } else document.body.style.cursor = 'default';

    const line = getCurrLine();
    if (line.isDrag) {
        const dx = pos.x - line.pos.x;
        const dy = pos.y - line.pos.y;
        moveLine(line, dx, dy);
        renderMeme();
    }
}

function onUp() {
    if (!getNumberOfLines()) return;
    setLineDrag(false);
}
