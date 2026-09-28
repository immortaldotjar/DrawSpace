import React from 'react'

const measureCtx = document.createElement("canvas").getContext("2d")

const TEXT_FONT = "system-ui, sans-serif"
const TEXT_SIZE = 20
const TEXT_LINE_HEIGHT = 1.25

const getTextSize = (ele) => {
    measureCtx.font = `${ele.fontSize}px ${TEXT_FONT}`
    const lines = ele.text.split("\n")

    const width = Math.max(...lines.map((line) => {
        measureCtx.measureText(line).width
    }))

    const height = lines.length * ele.fontSize * TEXT_LINE_HEIGHT

    return { width, height }

}



export { TEXT_FONT, TEXT_SIZE, TEXT_LINE_HEIGHT, getTextSize }