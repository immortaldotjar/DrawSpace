import React, { useEffect, useRef } from 'react'
import { TEXT_FONT, TEXT_LINE_HEIGHT, TEXT_SIZE } from './text'

const TextEditor = ({ left, top, initialText, fontSize, color, scale, onCommit }) => {

    const fieldRef = useRef(null)
    const doneRef = useRef(false)


    const resize = () => {
        const field = fieldRef.current

        field.style.width = "0px"
        field.style.height = "0px"
        field.style.width = `${field.scrollWidth + 2}px`
        field.style.height = `${field.scrollHeight}px`
    }


    useEffect(() => {
        const field = fieldRef.current

        field.focus()
        field.setSelectionRange(field.value.length, field.value.length)
    }, [])

    useEffect(() => {
        resize()
    }, [scale])

    const finish = () => {
        if(doneRef.current) return

        doneRef.current = true
        onCommit(fieldRef.current.value)
    }

    const handleKeyDown = (e) => {
        if(e.key === "Escape") finish()
    }

    return (
        <textarea
            ref={fieldRef}
            defaultValue={initialText}
            wrap='off'
            spellCheck={false}
            onInput={resize}
            onBlur={finish}
            onKeyDown={handleKeyDown}
            className='text-editor'
            style={{
                left,
                top,
                color,
                fontFamily:TEXT_FONT,
                fontSize : fontSize * scale,
                lineHeight :  TEXT_LINE_HEIGHT,
                minWidth : 2,
                minHeight :fontSize * scale *TEXT_LINE_HEIGHT
            }}
        />
    )
}

export default TextEditor