import { useContext, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CalculatorContext } from "../contexts/CalculatorContext";
import { TrendingUp } from "lucide-react";

export default function FDVSlider() {
  const { state, dispatch } = useContext(CalculatorContext);
  const { fdv, fdvMin, fdvMax } = state;
  const [isDragging, setIsDragging] = useState(false);

  // 최대값을 10B로 제한
  const maxFDV = 10000000000; // 10B
  const effectiveMax = Math.min(fdvMax, maxFDV);
  const sliderProgress = ((fdv - fdvMin) / (effectiveMax - fdvMin)) * 100;

  const formatNumber = (num: number): string => {
    if (num >= 1000000000) return `${(num / 1000000000).toFixed(1)}B`;
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toFixed(2);
  };

  // 모바일 터치 이벤트 처리
  const handleTouchStart = () => {
    setIsDragging(true);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const handleGlobalTouchEnd = () => {
      setIsDragging(false);
    };

    document.addEventListener("touchend", handleGlobalTouchEnd);
    document.addEventListener("mouseup", handleGlobalTouchEnd);

    return () => {
      document.removeEventListener("touchend", handleGlobalTouchEnd);
      document.removeEventListener("mouseup", handleGlobalTouchEnd);
    };
  }, []);

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-blue-400" />
          <h3 className="text-white/90 font-medium">FDV</h3>
        </div>

        <span className="text-lg font-semibold text-blue-400">
          ${formatNumber(fdv)}
        </span>
      </div>

      {/* Slider Container */}
      <div className="relative py-8">
        {/* Background track */}
        <div className="relative h-2 bg-white/[0.05] rounded-full border border-white/[0.1]">
          {/* Progress bar */}
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400"
            style={{ width: `${sliderProgress}%` }}
            initial={{ width: 0 }}
            animate={{ width: `${sliderProgress}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>

        {/* Enhanced HTML range input */}
        <input
          type="range"
          min={fdvMin}
          max={effectiveMax}
          step={Math.max(1000, (effectiveMax - fdvMin) / 1000)}
          value={Math.min(fdv, effectiveMax)}
          onChange={(e) => {
            const newValue = Math.min(Number(e.target.value), effectiveMax);
            dispatch({ type: "SET_FDV", payload: newValue });
          }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer touch-manipulation"
          style={{
            WebkitAppearance: "none",
            appearance: "none",
          }}
        />

        {/* Slider thumb */}
        <motion.div
          className="absolute top-1/2 transform -translate-y-1/2 pointer-events-none"
          style={{ left: `calc(${sliderProgress}% - 10px)` }}
          animate={{
            scale: isDragging ? 1.2 : 1,
          }}
          transition={{ duration: 0.2 }}
        >
          {/* Thumb */}
          <div className="w-5 h-5 bg-white rounded-full shadow-lg border-2 border-blue-400">
            <div className="w-full h-full bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full"></div>
          </div>

          {/* Value tooltip */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{
              opacity: isDragging ? 1 : 0,
              y: isDragging ? -40 : -30,
            }}
            transition={{ duration: 0.2 }}
            className="absolute left-1/2 transform -translate-x-1/2 -top-10 bg-white/[0.95] backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/20 shadow-xl"
          >
            <div className="text-gray-800 text-sm font-medium whitespace-nowrap">
              ${formatNumber(fdv)}
            </div>
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-3 border-r-3 border-t-3 border-transparent border-t-white/95"></div>
          </motion.div>
        </motion.div>
      </div>

      {/* Range indicators */}
      <div className="flex justify-between text-xs text-white/40 mt-2">
        <span>${formatNumber(fdvMin)}</span>
        <span>${formatNumber(effectiveMax)}</span>
      </div>
    </motion.div>
  );
}
