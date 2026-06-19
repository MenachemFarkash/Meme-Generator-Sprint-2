let gEditor = {
    lines: [
        {
            lineNumber: 1,
            text: 'Enter some text',
            textPos: [350, 100],
            properties: {
                baseline: 'alphabetic',
                font: 'Arial',
                fontSize: 40,
                bold: false,
                align: 'center',
                color: 'white',
            },
        },
    ],
    img: 'images/1.jpg',
    selectedLine: 1,
}

function checkIfTextClicked(x, y, ctx) {
    return gEditor.lines.find((line) => {
        const box = getTextBoundingBox(ctx, line)
        return x >= box.x && x <= box.x + box.width && y >= box.y && y <= box.y + box.height
    })
}

function getTextBoundingBox(ctx, line) {
    ctx = document.querySelector('canvas').getContext('2d')
    ctx.font = `${line.properties.bold ? 'bold' : ''} ${line.properties.fontSize}px ${line.properties.font}`
    const textMetrics = ctx.measureText(line.text)

    let x = line.textPos[0]
    let y = line.textPos[1]

    const width = textMetrics.width
    const height = textMetrics.actualBoundingBoxAscent + textMetrics.actualBoundingBoxDescent

    switch (line.properties.align) {
        case 'center':
            x -= width / 2
            break
        case 'right':
            x -= width
            break
    }

    let top = y

    switch (line.properties.baseline) {
        case 'middle':
            top -= height / 2
            break

        case 'alphabetic':
            top -= textMetrics.actualBoundingBoxAscent
            break

        case 'bottom':
            top -= height
            break
    }

    const pos = {
        x: x - 10,
        y: top - 10,
        width: width + 25,
        height: height + 25,
    }

    return pos
}

function changeSelectedLine(newLine) {
    gEditor.selectedLine = newLine
}

function getSelectedLine() {
    return gEditor.lines[gEditor.selectedLine - 1]
}

function changeTextPos(newPos) {
    const { lines, selectedLine } = gEditor
    const linePos = lines[selectedLine - 1].textPos

    let newX = linePos[0] + newPos[0]
    let newY = linePos[1] + newPos[1]

    if (newPos[0] <= linePos[0]) newX = linePos[0] - newPos[0]
    if (newPos[1] <= linePos[1]) newY = linePos[1] - newPos[1]

    if (newPos[0] > linePos[0]) newX = linePos[0] + newPos[0]
    if (newPos[1] > linePos[1]) newY = linePos[1] + newPos[1]

    linePos[0] = newX
    linePos[1] = newY
}

function addNewTextLine() {
    const newLine = {
        lineNumber: gEditor.lines.length + 1,
        text: 'Enter Text',
        textPos: [350, (gEditor.lines.length + 1) * 50],
        properties: {
            baseline: 'alphabetic',
            font: 'Arial',
            fontSize: 40,
            bold: false,
            align: 'center',
        },
    }

    gEditor.lines.push(newLine)
    gEditor.selectedLine = gEditor.lines.length
    renderText()
}

function changeTextAlignment(newAlignment) {
    const { lines, selectedLine } = gEditor
    lines[selectedLine - 1].properties.align = newAlignment
    renderCanvas()
}

function changeTextFontSize(shouldIncrease) {
    const { lines, selectedLine } = gEditor
    if (shouldIncrease) lines[selectedLine - 1].properties.fontSize += 2
    else lines[selectedLine - 1].properties.fontSize -= 2
    renderCanvas()
}

function changeTextColor(newColor) {
    const { lines, selectedLine } = gEditor
    lines[selectedLine - 1].properties.color = newColor
    renderCanvas()
}

function changeTextFont(newFont) {
    const { lines, selectedLine } = gEditor
    lines[selectedLine - 1].properties.font = newFont
    renderCanvas()
}

function resetEditor() {
    gEditor = {
        lines: [
            {
                lineNumber: 1,
                text: 'Enter some text',
                textPos: [350, 100],
                properties: {
                    baseline: 'alphabetic',
                    font: 'Arial',
                    fontSize: 40,
                    bold: false,
                    align: 'center',
                    color: 'white',
                },
            },
        ],
        img: '',
        selectedLine: 1,
    }
}
