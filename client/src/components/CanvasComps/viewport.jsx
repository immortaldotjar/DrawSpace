import React from 'react'

const screenToWorld = (screenX, screenY, viewport) => ({
    x: (screenX - viewport.x) / viewport.scale,
    y: (screenY - viewport.y) / viewport.scale,
})

export { screenToWorld };