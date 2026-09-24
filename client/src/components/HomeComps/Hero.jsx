import React from 'react'
import { motion } from "motion/react"

const Hero = () => {
    return (
        <>
            <h1 className="text-brand-dark font-black text-[16vw] md:text-[9vw] leading-none tracking-tight mt-lg select-none">
                DRAWSPACE
            </h1>

            <div className="relative bg-brand-dark surface mt-md h-[60vh] md:h-[65vh] overflow-hidden flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="w-40 h-40 md:w-56 md:h-56 rounded-full bg-cream/20 flex items-center justify-center text-cream text-sm"
                >
                    pencil animation here
                </motion.div>

                <div className="absolute top-lg right-lg w-20 h-20 rounded-full bg-neutral-900 flex items-center justify-center">
                    <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
                        className="text-cream text-xs"
                    >
                        ↻
                    </motion.span>
                </div>

                <button onClick={handleStart} className="absolute bottom-lg left-lg surface card row-sm shadow-panel">
                    <div className="w-14 h-14 rounded-xl bg-mint" />
                    <div className="text-left">
                        <p className="text-xs font-semibold text-neutral-900">My First Board</p>
                        <p className="text-xs text-muted">View board</p>
                    </div>
                </button>
            </div>
        </>
    )
}

export default Hero