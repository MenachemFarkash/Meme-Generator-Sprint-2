function renderSelectedMemeToCanvas(img) {
    onChangePage('meme-editor-page')
    const canvas = document.querySelector('canvas')
    const ctx = canvas.getContext('2d')

    const image = new Image()

    image.onload = function () {
        canvas.width = image.naturalWidth
        canvas.height = image.naturalHeight
        ctx.drawImage(image, 0, 0)

        gEditor.img = img

        setupInitialText()
    }

    image.src = img
}
