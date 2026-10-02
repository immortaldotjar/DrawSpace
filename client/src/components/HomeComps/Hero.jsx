import { motion } from "motion/react";

const Hero = ({ onStart }) => {
  return (
    <>
        <clipPath id="clip-hero" clipPathUnits={'objectBoundingBox'}>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0.0249688 0C0.0111789 0 0 0.0112775 0 0.0251889V0.851385C0 0.865297 0.0111789 0.876574 0.0249688 0.876574H0.179775V0.974811C0.179775 0.988723 0.190954 1 0.204744 1H0.975031C0.988821 1 1 0.988723 1 0.974811V0.157431C1 0.143519 0.988821 0.132242 0.975031 0.132242H0.810237V0.0251889C0.810237 0.0112775 0.799058 0 0.785268 0H0.0249688Z"
            fill="#D9D9D9"
          />
        </clipPath>
      <h1 className="text-brand-dark font-black text-[16vw] md:text-[9vw] leading-none tracking-tight mt-lg select-none">
        DRAWSPACE
      </h1>

      <div className=" bg-white/20 h-screen" style={{clipPath:`url(#clip-hero)`}}>
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

        <button onClick={onStart} className="absolute bottom-lg left-lg surface card row-sm shadow-panel">
          <div className="w-14 h-14 rounded-xl bg-mint" />
          <div className="text-left">
            <p className="text-xs font-semibold text-neutral-900">My First Board</p>
            <p className="text-xs text-muted">View board</p>
          </div>
        </button>
      </div>
    </>
  );
};

export default Hero