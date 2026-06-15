const gCanvas = document.querySelector('canvas')
const gCtx = gCanvas.getContext('2d')
let gSelectedLine = 1

function setupInitialText() {
    const { lines } = gEditor

    lines.forEach((line) => {
        gCtx.font = `${line.properties.bold ? 'bold' : ''} ${line.properties.fontSize}px ${line.properties.font}`
        gCtx.fillStyle = line.properties.color
        gCtx.textAlign = line.properties.align
        gCtx.fillText(line.text, line.textPos[0], line.textPos[1])
    })
}

gCanvas.addEventListener('click', (ev) => {
    const rect = gCanvas.getBoundingClientRect()

    const x = ev.clientX - rect.left
    const y = ev.clientY - rect.top

    const clickedLine = checkIfTextClicked(x, y, gCtx)

    if (clickedLine) {
        console.log('Clicked:', clickedLine.text)
    }
})

const textInput = document.querySelector('.text-input')
textInput.addEventListener('input', (ev) => onChangeText(1, ev.target.value))

function onUpdateTextPos(textId) {}

function onChangeText(textId, newText) {
    const selectedLine = gEditor.lines.find((line) => line.lineNumber === textId)
    console.log(selectedLine)
}
