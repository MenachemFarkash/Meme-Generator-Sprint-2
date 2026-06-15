const gEditor = {
    lines: [
        {
            lineNumber: 1,
            text: 'Just some text',
            textPos: [50, 50],
            properties: {
                baseline: 'alphabetic',
                font: 'Arial',
                fontSize: 40,
                bold: false,
                align: 'center',
            },
        },
    ],
    img: 'images/1.jpg',
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
        x,
        y: top,
        width,
        height,
    }

    return pos
}
