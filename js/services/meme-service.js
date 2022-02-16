'use strict'

const NUM_OF_IMGS = 18;

var gImgs = _createImgs();

var gMeme = {
    selectedImgId: 0,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I sometimes eat Falafel',
            size: 48,
            align: 'center',
            color: 'white',
            font: 'Impact'
        }
    ]
}

function getMeme() {
    return (gMeme);
}

function getImgs() {
    return gImgs;
}

function setImg(imgId) {
    gMeme.selectedImgId = imgId;;
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