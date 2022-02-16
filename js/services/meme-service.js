'use strict'

const NUM_OF_IMGS = 18;
const INITIAL_TXT_SIZE = 48;

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

function getSelectedLineText() {
    return gMeme.lines[gMeme.selectedLineIdx].txt;
}

function setLineTxt(txt) {
    gMeme.lines[gMeme.selectedLineIdx].txt = txt;;
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

function changeFontSize(change) {
    gMeme.lines[gMeme.selectedLineIdx].size += change;
}

function setSelectedLineIdx(newIdx) {
    gMeme.selectedLineIdx = newIdx;
}

function setLinePos(pos) {
    gMeme.lines[gMeme.selectedLineIdx].pos = pos;
}

function _createLine() {
    return {
        txt: 'I sometimes eat Falafel',
        size: INITIAL_TXT_SIZE,
        align: 'center',
        color: 'white',
        font: 'Impact'
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