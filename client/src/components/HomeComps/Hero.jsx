import React from 'react'
import { motion } from "motion/react"

const Hero = () => {
    return (
        <>
            <h1 className="text-brand-dark font-black text-[16vw] md:text-[9vw] leading-none tracking-tight mt-6 select-none">
                DRAWSPACE
            </h1>

            <div className="relative bg-brand-dark rounded-4xl mt-4 h-[60vh] md:h-[65vh] overflow-hidden flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="w-40 h-40 md:w-56 md:h-56 rounded-full bg-cream/20 flex items-center justify-center text-cream text-sm"
                >
                    pencil animation here
                </motion.div>

                <div className="absolute top-6 right-6 w-20 h-20 rounded-full bg-neutral-900 flex items-center justify-center">
                    <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
                        className="text-cream text-xs"
                    >
                        ↻
                    </motion.span>
                </div>

                <div className="absolute bottom-6 left-6 bg-white rounded-2xl p-3 flex items-center gap-3 shadow-lg">
                    <div className="w-14 h-14 rounded-xl bg-mint" />
                    <div>
                        <p className="text-xs font-semibold text-neutral-900">My First Board</p>
                        <p className="text-xs text-neutral-500">View board</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Hero