'use strict'

const NUM_OF_IMGS = 18;
const DEFUALT_TXT_SIZE = 28;
const DEFUALT_TXT = 'Write Something!';
const MEME_SENTENCES = [
    'I never eat falafel',
    'DOMS DOMS EVERYWHERE',
    'Stop Using i in for loops',
    'Armed in knowledge',
    'Js error "Unexpected String"',
    'One does not simply write js',
    'I`m a simple man i see vanilla JS, i click like!',
    'JS, HTML,CSS?? Even my momma can do that',
    'May the force be with you',
    'I know JS',
    'JS Where everything is made up and the rules dont matter',
    'Not sure if im good at programming or good at googling',
    'But if we could',
    'JS what is this?',
    'Write hello world , add to cv 7 years experienced',
];


var gImgs = _createImgs();

var gMeme;

function createMeme(selectedImgId, txt = DEFUALT_TXT) {
    gMeme = {
        selectedImgId,
        selectedLineIdx: 0,
        lines: [
            _createLine(txt)
        ]
    };
}

function getMeme() {
    return gMeme;
}

function getImgs() {
    return gImgs;
}

function getNumOfLines() {
    return gMeme.lines.length;
}

function addLine(txt = DEFUALT_TXT) {
    return gMeme.lines.push(_createLine(txt));
}

function getRandMemeSentence() {
    return MEME_SENTENCES[getRandomInt(0, MEME_SENTENCES.length - 1)];
}

function deleteLine() {
    const lineIdx = gMeme.selectedLineIdx;
    gMeme.lines.splice(lineIdx, 1);

    if (gMeme.selectedLineIdx) gMeme.selectedLineIdx--;
}

function getDefualtTxtSize() {
    return DEFUALT_TXT_SIZE;
}

function getDefualtTxt() {
    return DEFUALT_TXT;
}

function getNumOfImgs() {
    return NUM_OF_IMGS;
}

function getCurrLine() {
    return gMeme.lines[gMeme.selectedLineIdx];
}

function getLineText() {
    return getCurrLine().txt;
}

function setLineTxt(txt) {
    getCurrLine().txt = txt;
}

function setLineSize(newSize) {
    getCurrLine().size = newSize;
}

function setFontStyle(newFont) {
    getCurrLine().font = newFont;
}

function setTxtColor(newColor) {
    getCurrLine().color = newColor;
}

function getTxtColor() {
    return getCurrLine().color;
}

function changeFontSize(change) {
    getCurrLine().size += change;
}

function setSelectedLineIdx(newIdx) {
    gMeme.selectedLineIdx = newIdx;
}

function setLineDrag(isDrag) {
    getCurrLine().isDrag = isDrag
}

function setLinePos(newPos) {
    getCurrLine().pos = newPos;
}

function getLinePos() {
    return getCurrLine().pos;
}

function isOverLine(eventPos, lineWidth) {
    const currLine = getCurrLine();
    const { pos } = currLine;

    return eventPos.x >= pos.x && eventPos.x <= pos.x + lineWidth &&
        eventPos.y <= pos.y && eventPos.y >= pos.y - currLine.size;
}

function moveLine(line, dx, dy) {
    line.pos.x += dx
    line.pos.y += dy
}

function _createLine(txt = DEFUALT_TXT) {
    return {
        txt,
        size: DEFUALT_TXT_SIZE,
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
