import React from 'react'
import ToolButton from './ToolButton'
import { useViewport } from '../../context/ViewportContext'
import { FaPlus, FaMinus } from "react-icons/fa6";

const ZoomControl = () => {

    const { viewport, zoomIN, zoomOUT, resetViewScale } = useViewport()

    return (
        <div className="fixed bottom-sm right-sm surface panel row-sm flex-col shadow-panel z-10">
            <ToolButton label={<FaMinus/>} onClick={zoomOUT} />

            <button onClick={resetViewScale} className="text-xs text-muted px-xs w-8 flex justify-center items-center">
                {Math.round(viewport.scale * 100)}%
            </button>

            <ToolButton label={<FaPlus/>} onClick={zoomIN} />
        </div>
    )
}

export default ZoomControl