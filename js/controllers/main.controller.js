let currentOpenPage = 'gallery-page'

function onMemeSelect(meme) {
    onChangePage('meme-editor-page')
    renderSelectedMemeToCanvas(meme)
}

function onChangePage(page) {
    const oldPage = document.querySelector(`.${currentOpenPage}`)
    oldPage.classList.add('hidden')

    const newPage = document.querySelector(`.${page}`)
    newPage.classList.remove('hidden')
    currentOpenPage = newPage.classList[0]
}

function onCanvasClick(ev) {
    console.log(ev.layerX, ev.layerY)
    checkIfTextClicked(ev.layerX, ev.layerY)
}
