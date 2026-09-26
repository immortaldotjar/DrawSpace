import React, { Children, createContext, useContext, useState } from 'react'
const ViewportContext = createContext()

const MIN_SCALE = 0.1, MAX_SCALE = 4

const ViewportProvider = ({ children }) => {
    const [viewport, setViewport] = useState({ x: 0, y: 0, scale: 1 })

    const zoomAt = (screenX, screenY, fact) => {
        setViewport((prev) => {
            const newScale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, prev.scale * fact))

            const worldX = (screenX - prev.x) / prev.scale
            const worldY = (screenY - prev.y) / prev.scale

            return { scale: newScale, x: screenX - worldX * newScale, y: screenY - worldY * newScale }

        })

    }

    const zoomIN = () => {
        zoomAt(window.innerWidth / 2, window.innerHeight / 2, 1.2)

    }
    const zoomOUT = () => {
        zoomAt(window.innerWidth / 2, window.innerHeight / 2, 1 / 1.2)

    }

    const resetViewScale = () => {
        setViewport({ x: 0, y: 0, scale: 1 })
    }

    return (
        <ViewportContext.Provider value={{ viewport, setViewport, zoomAt, zoomIN, zoomOUT, resetViewScale }}>
            {children}
        </ViewportContext.Provider>
    )
}


export { ViewportProvider }
export const useViewport = () => useContext(ViewportContext)