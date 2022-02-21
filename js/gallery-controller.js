'use strict'


function renderGallery() {
    const elGalllary = document.querySelector('.gallery-imgs');
    const imgs = getImgs();
    var strHTMLs = imgs.map(img => {
        return `<img src="${img.url}" class="gallery-img" onclick="onImgSelect(${img.id})" />`;
    }).join('');
    elGalllary.innerHTML = strHTMLs;
};

function onImgSelect(imgId, txt = undefined) {
    createMeme(imgId, txt);
    setElInputs();
    openMemeEditor();
    renderMeme();
}

function onOpenRandomMeme() {
    const imgId = getRandomInt(1, getNumOfImgs());
    onImgSelect(imgId, getRandMemeSentence());
}

function openMemeEditor() {
    document.querySelector('.meme-editor-container').classList.remove('hidden');
    document.querySelector('.gallery-container').classList.add('hidden');
}

function openGallery() {
    document.querySelector('.meme-editor-container').classList.add('hidden');
    document.querySelector('.gallery-container').classList.remove('hidden');
    if (document.body.classList.contains('menu-open')) toggleMenu();
}

function toggleMenu() {
    document.body.classList.toggle("menu-open");
}
