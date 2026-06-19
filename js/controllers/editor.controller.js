const gCanvas = document.querySelector('canvas')
const gCtx = gCanvas.getContext('2d')
let gIsDragging = false
const gDragStartingPos = [0, 0]
const gDragEndingPos = [0, 0]
const gDragOffset = [0, 0]

const textInput = document.querySelector('.text-input')
setupEditorListeners()

function renderCanvas() {
    renderSelectedMemeToCanvas(gEditor.img)
    renderText()
}

function setupEditorListeners() {
    gCanvas.addEventListener('pointerup', () => onCanvasClick(event))
    gCanvas.addEventListener('pointerdown', () => drawTextBoundingBox(gCtx, onCanvasClick(event)))

    // gCanvas.addEventListener('pointermove', () => console.log('pointermove'))
    // gCanvas.addEventListener('pointerup', () => console.log('pointerup'))

    const addTextButton = document.querySelector('.add-text-button')
    addTextButton.addEventListener('click', onAddNewText)

    textInput.addEventListener('input', (ev) => onChangeText(ev.target.value))

    const alignRightButton = document.querySelector('.align-text-right-button')
    const alignCenterButton = document.querySelector('.align-text-center-button')
    const alignLeftButton = document.querySelector('.align-text-left-button')

    alignRightButton.addEventListener('click', () => onChangeTextAlignment('left'))
    alignCenterButton.addEventListener('click', () => onChangeTextAlignment('center'))
    alignLeftButton.addEventListener('click', () => onChangeTextAlignment('right'))

    const increaseFontSizeButton = document.querySelector('.increase-font-size-button')
    const decreaseFontSizeButton = document.querySelector('.decrease-font-size-button')

    increaseFontSizeButton.addEventListener('click', () => onChangeTextFontSize(true))
    decreaseFontSizeButton.addEventListener('click', () => onChangeTextFontSize(false))

    const colorPicker = document.querySelector('.text-color-picker')
    colorPicker.addEventListener('input', () => onChangeTextColor(colorPicker.value))

    const fontPicker = document.querySelector('.text-font-select')
    fontPicker.addEventListener('change', () => changeTextFont(fontPicker.value))

    const downloadButton = document.querySelector('.download-button a')
    downloadButton.addEventListener('click', () => onDownloadImage(downloadButton, gCanvas, Event))
}

function renderText() {
    const { lines } = gEditor

    lines.forEach((line) => {
        gCtx.font = `${line.properties.bold ? 'bold' : ''} ${line.properties.fontSize}px ${line.properties.font}`
        gCtx.fillStyle = line.properties.color
        gCtx.lineWidth = 5
        gCtx.textAlign = line.properties.align
        gCtx.strokeText(line.text, line.textPos[0], line.textPos[1])
        gCtx.fillText(line.text, line.textPos[0], line.textPos[1])
    })
}

function onCanvasClick(ev) {
    console.log(ev.type)
    const rect = gCanvas.getBoundingClientRect()

    const scaleX = gCanvas.width / rect.width
    const scaleY = gCanvas.height / rect.height

    const x = (ev.clientX - rect.left) * scaleX
    const y = (ev.clientY - rect.top) * scaleY

    const clickedLine = checkIfTextClicked(x, y, gCtx)

    if (clickedLine) {
        changeSelectedLine(clickedLine.lineNumber)
        textInput.value = clickedLine.text
        if (ev.type === 'pointerdown') {
            gIsDragging = true
            gDragStartingPos[0] = x
            gDragStartingPos[1] = y
            return getSelectedLine()
        }
    }

    if (gIsDragging) {
        gDragEndingPos[0] = x
        gDragEndingPos[1] = y
        calculateDragOffset()
        changeTextPos(gDragOffset)
        gIsDragging = false
    }
    renderCanvas()
}

function calculateDragOffset() {
    gDragOffset[0] = gDragStartingPos[0] - gDragEndingPos[0]
    gDragOffset[1] = gDragStartingPos[1] - gDragEndingPos[1]
    return gDragOffset
}

function drawTextBoundingBox(ctx, line) {
    if (!line) return
    const box = getTextBoundingBox(ctx, line)

    ctx.save()

    ctx.strokeStyle = 'blue'
    ctx.lineWidth = 1

    ctx.strokeRect(box.x, box.y, box.width, box.height)

    ctx.restore()
}

function onChangeText(newText) {
    const { lines, img, selectedLine } = gEditor
    const lineToEdit = lines.find((line) => line.lineNumber === selectedLine)
    lineToEdit.text = newText
    renderSelectedMemeToCanvas(img)
    renderText()
}

function onChangeTextAlignment(newAlignment) {
    changeTextAlignment(newAlignment)
}

function onChangeTextFontSize(shouldIncrease) {
    changeTextFontSize(shouldIncrease)
}

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

        renderText()
    }

    image.src = img
}

function onAddNewText() {
    addNewTextLine()
}

function onChangeTextColor(newColor) {
    changeTextColor(newColor)
}

function onChangeTextFont(newFont) {
    changeTextFont(newFont)
}

function onDownloadImage(button, canvas, ev) {
    button.href = canvas.toDataURL()
}
