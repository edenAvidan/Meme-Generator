'use strict'

const NUM_OF_IMGS = 18;
const INITIAL_TXT_SIZE = 36;

var gImgs = _createImgs();

var gMeme;

function createMeme() {
    gMeme = {
        selectedImgId: 0,
        selectedLineIdx: 0,
        lines: [
            _createLine()
        ]
    };
}

function getMeme() {
    return gMeme;
}

function getImgs() {
    return gImgs;
}

function addLine() {
    return gMeme.lines.push(_createLine());
}

function getLineInitTxtSize() {
    return INITIAL_TXT_SIZE;
}

function setImg(imgId) {
    gMeme.selectedImgId = imgId;;
}

function getCurrLine() {
    return gMeme.lines[gMeme.selectedLineIdx];
}

function getLineText() {
    return gMeme.lines[gMeme.selectedLineIdx].txt;
}

function setLineTxt(txt) {
    gMeme.lines[gMeme.selectedLineIdx].txt = txt;
}

function setLineSize(size) {
    gMeme.lines[gMeme.selectedLineIdx].size = size;
}

function setFontStyle(font) {
    gMeme.lines[gMeme.selectedLineIdx].font = font;
}

function setTxtColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].color = color;
}

function getTxtColor() {
    return gMeme.lines[gMeme.selectedLineIdx].color;
}

function changeFontSize(change) {
    gMeme.lines[gMeme.selectedLineIdx].size += change;
}

function setSelectedLineIdx(newIdx) {
    gMeme.selectedLineIdx = newIdx;
}

function setLineDrag(isDrag) {
    gMeme.lines[gMeme.selectedLineIdx].isDrag = isDrag
}

function setLinePos(pos) {
    gMeme.lines[gMeme.selectedLineIdx].pos = pos;
}

function getLinePos() {
    return gMeme.lines[gMeme.selectedLineIdx].pos;
}

function isOverLine(eventPos, lineWidth) {
    const currLine = gMeme.lines[gMeme.selectedLineIdx]
    const { pos } = currLine;

    // 257 needs to change to current line text width.
    return eventPos.x >= pos.x && eventPos.x <= pos.x + lineWidth &&
        eventPos.y <= pos.y && eventPos.y >= pos.y - currLine.size
}

function moveLine(line, dx, dy) {
    line.pos.x += dx
    line.pos.y += dy
}

function _createLine() {
    return {
        txt: 'Write Something!',
        size: INITIAL_TXT_SIZE,
        align: 'center',
        color: '#ffffff',
        font: 'Impact',
        isDrag: false
    };
}

function _createImgs() {
    var imgs = [];
    for (let i = 1; i <= NUM_OF_IMGS; i++) {
        imgs.push(_createImg(i));
    }
    return imgs;
}

function _createImg(id, keywords = []) {
    return {
        id,
        url: `imgs\\${id}.jpg`,
        keywords
    };
}
