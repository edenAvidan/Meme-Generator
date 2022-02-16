'use strict'


function renderGallery() {
    const elGalllary = document.querySelector('.gallery-container');
    const imgs = getImgs();
    var strHTML = '';
    imgs.forEach((img) => {
        strHTML += `<img src="${img.url}" class="gallery-img" onclick="onImgSelect(${img.id})" />`
    })
    elGalllary.innerHTML = strHTML;
}

function onImgSelect(imgId) {
    setImg(imgId);
    renderMeme();
    document.querySelector('.meme-editor-container').classList.remove('hidden');
    document.querySelector('.gallery-container').classList.add('hidden');
}