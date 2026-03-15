import { motion, AnimatePresence } from "framer-motion";

interface SpeedControlProps {
  open: boolean;
  speed: number;
  onSpeedChange: (speed: number) => void;
  onClose: () => void;
}

const speeds = [0.5, 1, 1.5, 2];

export default function SpeedControl({ open, speed, onSpeedChange, onClose }: SpeedControlProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="absolute top-14 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1 bg-card/90 backdrop-blur-md rounded-full px-2 py-1.5 border border-border"
        >
          {speeds.map((s) => (
            <button
              key={s}
              onClick={() => { onSpeedChange(s); onClose(); }}
              className={`px-3 py-1 rounded-full text-xs font-display font-semibold transition ${
                speed === s ? "bg-tiktok-pink text-primary-foreground" : "text-foreground hover:bg-muted"
              }`}
            >
              {s}x
            </button>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
