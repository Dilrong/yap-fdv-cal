import { motion } from "framer-motion";

interface FDVSliderProps {
  fdv: number;
  setFdv: (value: number) => void;
  min?: number;
  max?: number;
}

export default function FDVSlider({
  fdv,
  setFdv,
  min = 100000,
  max = 10000000000,
}: FDVSliderProps) {
  const sliderProgress = ((fdv - min) / (max - min)) * 100;

  const formatNumber = (num: number): string => {
    if (num >= 1000000000) return `${(num / 1000000000).toFixed(1)}B`;
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toFixed(2);
  };

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <label className="text-white/80 font-light">
          FDV (Fully Diluted Valuation)
        </label>
        <motion.span
          key={fdv}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          className="text-lg font-medium text-blue-400"
        >
          ${formatNumber(fdv)}
        </motion.span>
      </div>

      <div className="relative py-4">
        {/* Background track */}
        <div className="h-2 bg-white/[0.05] rounded-full">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full"
            style={{ width: `${sliderProgress}%` }}
            initial={{ width: 0 }}
            animate={{ width: `${sliderProgress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* HTML range input for functionality */}
        <input
          type="range"
          min={min}
          max={max}
          step={Math.max(1000, (max - min) / 1000)}
          value={fdv}
          onChange={(e) => setFdv(Number(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />

        {/* Visual draggable thumb */}
        <motion.div
          className="absolute top-1/2 w-5 h-5 bg-blue-400 rounded-full shadow-lg transform -translate-y-1/2 cursor-pointer border-2 border-white"
          style={{ left: `calc(${sliderProgress}% - 10px)` }}
          whileHover={{
            scale: 1.3,
            boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)",
          }}
          whileTap={{ scale: 0.9 }}
          animate={{
            boxShadow: [
              "0 0 0px rgba(59, 130, 246, 0.3)",
              "0 0 10px rgba(59, 130, 246, 0.5)",
              "0 0 0px rgba(59, 130, 246, 0.3)",
            ],
          }}
          transition={{
            boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" },
          }}
        />
      </div>

      <div className="flex justify-between text-xs text-white/30">
        <span>${formatNumber(min)}</span>
        <span>${formatNumber(max)}</span>
      </div>

      <div className="text-center">
        <p className="text-white/40 text-xs">
          🖱️ Drag the slider to adjust FDV • Min: ${formatNumber(min)} • Max: $
          {formatNumber(max)}
        </p>
      </div>
    </motion.div>
  );
}
