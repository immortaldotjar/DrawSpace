import React from 'react'
import ToolButton from './ToolButton'
import { useViewport } from '../../context/ViewportContext'

const ZoomControl = () => {

    const { viewport, zoomIN, zoomOUT, resetViewScale } = useViewport()

    return (
        <div className="fixed bottom-md left-md surface panel row-sm shadow-panel z-10">
            <ToolButton label={"-"} onClick={zoomOUT} />

            <button onClick={resetViewScale} className="text-xs text-muted px-xs w-12">
                {Math.round(viewport.scale * 100)}%
            </button>

            <ToolButton label={"+"} onClick={zoomIN} />
        </div>
    )
}

export default ZoomControl