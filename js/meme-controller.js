'use strict'

var gElCanvas;
var gCanvas;

const gTouchEvs = ['touchstart', 'touchmove', 'touchend']

initCanvas();

function initCanvas() {
    gElCanvas = document.querySelector('canvas');
    gCanvas = gElCanvas.getContext('2d');
    addListeners();
}

function addListeners() {
    addMouseListeners()
    addTouchListeners()
    window.addEventListener('resize', () => {
        const elMemeEditor = document.querySelector('.meme-editor-container');
        if (!elMemeEditor.classList.contains('hidden')) {
            resizeMeme();
            renderMeme();
        }
    })
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchend', onUp)
}

function renderMeme() {
    const { selectedImgId, lines } = getMeme();
    const img = getImgFromlocal(selectedImgId);
    img.onload = () => {
        resizeMeme();
        gCanvas.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
        lines.forEach(line => {
            setLineSettings(line);
            if (!getLinePos()) {
                setLinePos(createPos(getTxtCenterX(gElCanvas.width, line.txt),
                    getInitialLineYPos(1)));
            }
            const linePos = line.pos;
            drawText(line.txt, linePos.x, linePos.y, line.size);
        });
    }
}

function onTextChange(txt) {
    setLineTxt(txt);
    renderMeme();
}

function onTxtColorChange(color) {
    setTxtColor(color);
    renderMeme();
}

function onFontSizeChange(change) {
    changeFontSize(change);
    renderMeme();
}

function onSwitchLineFocus() {
    const { selectedLineIdx, lines } = getMeme();
    const nextLineIdx = selectedLineIdx + 1 < lines.length ? selectedLineIdx + 1 : 0;
    setSelectedLineIdx(nextLineIdx);

    document.querySelector('input[name="meme-text"]').value = getLineText();
    document.querySelector('input[name="text-color"]').value = getTxtColor();
}

function onAddLine() {
    const numOfLines = addLine();
    const newLineIdx = numOfLines - 1;
    setSelectedLineIdx(newLineIdx);

    const defualtLineTxt = getLineText();
    const linePos = createPos(getTxtCenterX(gElCanvas.width, defualtLineTxt),
        getInitialLineYPos(numOfLines));
    setLinePos(linePos);

    const elMemeTextInput = document.querySelector('input[name="meme-text"]');
    document.querySelector('input[name="text-color"]').value = '#ffffff';
    elMemeTextInput.value = '';
    elMemeTextInput.placeholder = getLineText();
    renderMeme();
}

function getImgFromlocal(imgId = 1) {
    const img = new Image();
    img.src = `imgs/${imgId}.jpg`;
    return img;
}

function setLineSettings(line, stroke = 'black', lineWidth = 1) {
    gCanvas.font = `${line.size}px ${line.font}`;
    gCanvas.lineWidth = lineWidth; // need to change
    gCanvas.strokeStyle = stroke; // need to change
    gCanvas.fillStyle = line.color; // need to change
}

function drawText(text, x, y) {
    gCanvas.fillText(text, x, y);
    gCanvas.strokeText(text, x, y);
}

function getTxtWidth(txt) {
    return gCanvas.measureText(txt).width;
}

function getTxtHeight(txt) {
    return gCanvas.measureText(txt).height;
}

function getTxtCenterX(x, txt) {
    const txtWidth = getTxtWidth(txt);
    return (x - txtWidth) / 2;
}

function resizeMeme() {
    const elContainer = document.querySelector('.options-container');
    gElCanvas.width = elContainer.offsetWidth;
    gElCanvas.height = elContainer.offsetHeight;
}

function getInitialLineYPos(numOfLines) {
    const fontSize = getLineInitTxtSize();
    if (numOfLines === 1) return fontSize;
    else if (numOfLines === 2) return gElCanvas.height - fontSize;
    else return gElCanvas.height / 2;
}

function onDown(ev) {
    const pos = getEvPos(ev)

    if (!isOverLine(pos, getTxtWidth(getLineText()))) return;

    setLineDrag(true)
    setLinePos(pos);
}

function onMove(ev) {
    const pos = getEvPos(ev)

    if (isOverLine(pos, getTxtWidth(getLineText()))) {
        document.body.style.cursor = 'pointer';
    }
    else document.body.style.cursor = 'default';

    const line = getCurrLine();
    if (line.isDrag) {
        const dx = pos.x - line.pos.x
        const dy = pos.y - line.pos.y
        moveLine(line, dx, dy);
        renderMeme()
    }
}

function onUp() {
    setLineDrag(false);
}
