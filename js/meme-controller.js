'use strict'

var gElCanvas;
var gCanvas;

init();

function init() {
    gElCanvas = document.querySelector('canvas');
    gCanvas = gElCanvas.getContext('2d');
}

function renderMeme() {
    const { selectedImgId, lines } = getMeme();
    const img = getImgFromlocal(selectedImgId);
    img.onload = () => {
        gCanvas.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
        setLineSettings(lines[0]);
        drawText(lines[0].txt, getMiddleForTxt(gElCanvas.width, lines[0].txt),
            lines[0].size, lines[0].size);
    }
}

function onTextChange(txt) {
    setLineTxt(txt);
    renderMeme();
}

function getImgFromlocal(imgId = 1) {
    const img = new Image();
    img.src = `imgs/${imgId}.jpg`;
    return img;
}

function setLineSettings(line, lineWidth = 1, stroke = 'black', fill = 'white') {
    let size = line.size;
    gCanvas.font = `${size}px ${line.font}`;

    while (getTxtWidth(line.txt) > gElCanvas.width && size > 2) {
        size -= 2;
        gCanvas.font = `${size}px ${line.font}`;
    }

    gCanvas.lineWidth = lineWidth; // need to change
    gCanvas.strokeStyle = stroke; // need to change
    gCanvas.fillStyle = fill; // need to change
}

function drawText(text, x, y) {
    gCanvas.fillText(text, x, y, 500); // 500 need to chaneg to canvas current width
    gCanvas.strokeText(text, x, y);
}

function getTxtWidth(txt) {
    return gCanvas.measureText(txt).width;
}

function getMiddleForTxt(x, txt) {
    const txtWidth = getTxtWidth(txt);
    return (x - txtWidth) / 2;
}