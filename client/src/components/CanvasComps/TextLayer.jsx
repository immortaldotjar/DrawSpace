import React from 'react'
import { TEXT_FONT, TEXT_LINE_HEIGHT } from './text'


const TextLayer = ({ elements, viewport, editingId }) => {
    return (
        <>
            {
                elements.filter((ele) => ele.type === "text" && ele.id !== editingId)
                    .map((ele) => (
                        <div
                            key={ele.id}
                            className='text-layer-item'
                            style={{
                                left: ele.x * viewport.scale + viewport.x,
                                top: ele.y * viewport.scale + viewport.y,

                                color: ele.color,
                                fontFamily: TEXT_FONT,
                                fontSize: ele.fontSize * viewport.scale,
                                lineHeight: TEXT_LINE_HEIGHT,
                            }}
                        >
                            {ele.text}
                        </div>
                    ))



            }
        </>
    )
}

export default TextLayer