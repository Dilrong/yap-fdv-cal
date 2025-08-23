import { useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CalculatorContext } from "../contexts/CalculatorContext";

export default function AdvancedSettings() {
  const { state, dispatch } = useContext(CalculatorContext);
  const {
    participants,
    customRewardPercentage,
    customTotalSupply,
    fdvMin,
    fdvMax,
    useCustomValues,
  } = state;
  const [isOpen, setIsOpen] = useState(false); // 기본적으로 접혀있음

  const formatNumber = (num: number): string => {
    if (num >= 1000000000) return `${(num / 1000000000).toFixed(1)}B`;
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toLocaleString();
  };

  const sliderStyle = {
    WebkitAppearance: "none" as const,
    background: "rgba(255, 255, 255, 0.05)",
    borderRadius: "9999px",
    height: "8px",
    cursor: "pointer",
  };

  const handleReset = () => {
    dispatch({ type: "SET_PARTICIPANTS", payload: 100 });
    dispatch({ type: "SET_CUSTOM_REWARD_PERCENTAGE", payload: 0.1 });
    dispatch({ type: "SET_CUSTOM_TOTAL_SUPPLY", payload: 1000000000 });
    dispatch({ type: "SET_FDV_MIN", payload: 100000 });
    dispatch({ type: "SET_FDV_MAX", payload: 10000000000 });
    dispatch({ type: "SET_USE_CUSTOM_VALUES", payload: false });
  };

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.1 }}
      className="bg-white/[0.03] rounded-2xl border border-white/[0.05] overflow-hidden"
    >
      {/* Header */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 flex items-center justify-between hover:bg-white/[0.02] transition-colors"
        whileHover={{ scale: 1.005 }}
        whileTap={{ scale: 0.995 }}
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center">
            <span className="text-lg">⚙️</span>
          </div>
          <div className="text-left">
            <h3 className="text-white/80 font-medium">Advanced Settings</h3>
            <p className="text-white/40 text-xs">
              Customize calculation parameters
            </p>
          </div>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-white/40"
        >
          ▼
        </motion.div>
      </motion.button>

      {/* Settings Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-6 pt-0 space-y-6">
              {/* Use Custom Values Toggle */}
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-white/70 font-medium">
                    Use Custom Values
                  </label>
                  <p className="text-white/40 text-xs mt-1">
                    Override token default values
                  </p>
                </div>
                <motion.button
                  onClick={() =>
                    dispatch({
                      type: "SET_USE_CUSTOM_VALUES",
                      payload: !useCustomValues,
                    })
                  }
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    useCustomValues ? "bg-blue-500" : "bg-white/20"
                  }`}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    animate={{ x: useCustomValues ? 24 : 2 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-lg"
                  />
                </motion.button>
              </div>

              {/* Participants */}
              <div className="space-y-3">
                <label className="text-white/70 font-light">
                  Number of Participants:{" "}
                  <span className="text-orange-400 font-medium">
                    {participants.toLocaleString()}
                  </span>
                </label>
                <div className="relative">
                  <input
                    type="range"
                    min="10"
                    max="10000"
                    step="10"
                    value={participants}
                    onChange={(e) =>
                      dispatch({
                        type: "SET_PARTICIPANTS",
                        payload: Number(e.target.value),
                      })
                    }
                    style={sliderStyle}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-white/30 mt-1">
                    <span>10</span>
                    <span>10K</span>
                  </div>
                </div>
              </div>

              {/* Custom Values Section */}
              <AnimatePresence>
                {useCustomValues && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-6 border-t border-white/[0.05] pt-6"
                  >
                    {/* Custom Reward Percentage */}
                    <div className="space-y-3">
                      <label className="text-white/70 font-light">
                        Reward Percentage:{" "}
                        <span className="text-green-400 font-medium">
                          {customRewardPercentage.toFixed(2)}%
                        </span>
                      </label>
                      <div className="relative">
                        <input
                          type="range"
                          min="0.01"
                          max="5"
                          step="0.01"
                          value={customRewardPercentage}
                          onChange={(e) =>
                            dispatch({
                              type: "SET_CUSTOM_REWARD_PERCENTAGE",
                              payload: Number(e.target.value),
                            })
                          }
                          style={sliderStyle}
                          className="w-full"
                        />
                        <div className="flex justify-between text-xs text-white/30 mt-1">
                          <span>0.01%</span>
                          <span>5%</span>
                        </div>
                      </div>
                    </div>

                    {/* Custom Total Supply */}
                    <div className="space-y-3">
                      <label className="text-white/70 font-light">
                        Total Supply:{" "}
                        <span className="text-blue-400 font-medium">
                          {formatNumber(customTotalSupply)}
                        </span>
                      </label>
                      <div className="relative">
                        <input
                          type="range"
                          min="1000000"
                          max="1000000000000"
                          step="1000000"
                          value={customTotalSupply}
                          onChange={(e) =>
                            dispatch({
                              type: "SET_CUSTOM_TOTAL_SUPPLY",
                              payload: Number(e.target.value),
                            })
                          }
                          style={sliderStyle}
                          className="w-full"
                        />
                        <div className="flex justify-between text-xs text-white/30 mt-1">
                          <span>1M</span>
                          <span>1T</span>
                        </div>
                      </div>
                    </div>

                    {/* FDV Range */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <label className="text-white/70 font-light">
                          Min FDV:{" "}
                          <span className="text-purple-400 font-medium">
                            ${formatNumber(fdvMin)}
                          </span>
                        </label>
                        <input
                          type="range"
                          min="10000"
                          max="1000000000"
                          step="10000"
                          value={fdvMin}
                          onChange={(e) =>
                            dispatch({
                              type: "SET_FDV_MIN",
                              payload: Math.min(
                                Number(e.target.value),
                                fdvMax - 10000
                              ),
                            })
                          }
                          style={sliderStyle}
                          className="w-full"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-white/70 font-light">
                          Max FDV:{" "}
                          <span className="text-purple-400 font-medium">
                            ${formatNumber(fdvMax)}
                          </span>
                        </label>
                        <input
                          type="range"
                          min="100000"
                          max="100000000000"
                          step="100000"
                          value={fdvMax}
                          onChange={(e) =>
                            dispatch({
                              type: "SET_FDV_MAX",
                              payload: Math.max(
                                Number(e.target.value),
                                fdvMin + 10000
                              ),
                            })
                          }
                          style={sliderStyle}
                          className="w-full"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Reset Button */}
              <motion.button
                onClick={handleReset}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-2 px-4 bg-white/[0.05] hover:bg-white/[0.08] border border-white/[0.1] rounded-xl text-white/60 text-sm transition-colors"
              >
                Reset to Defaults
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
