import { useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CalculatorContext } from "../contexts/CalculatorContext";
import { distributionModels } from "../constants/distributionModels";
import { DistributionTier } from "../types";

export default function RewardDistribution() {
  const { state, dispatch } = useContext(CalculatorContext);
  const { selectedDistributionModel, totalParticipants } = state;
  const [isOpen, setIsOpen] = useState(false); // 기본적으로 접혀있음

  const formatNumber = (num: number): string => {
    return num.toLocaleString();
  };

  const calculateParticipantsForTier = (tier: DistributionTier) => {
    return Math.round((tier.participants / 100) * totalParticipants);
  };

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.15 }}
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
          <div className="w-8 h-8 rounded-full bg-indigo-500/10 flex items-center justify-center">
            <span className="text-lg">📊</span>
          </div>
          <div className="text-left">
            <h3 className="text-white/80 font-medium">Reward Distribution</h3>
            <p className="text-white/40 text-xs">
              {selectedDistributionModel.name} •{" "}
              {formatNumber(totalParticipants)} participants
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

      {/* Distribution Panel */}
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
              {/* Total Participants Slider */}
              <div className="space-y-3">
                <label className="text-white/70 font-light">
                  Total Participants:{" "}
                  <span className="text-indigo-400 font-medium">
                    {formatNumber(totalParticipants)}
                  </span>
                </label>
                <div className="relative">
                  <input
                    type="range"
                    min="50"
                    max="50000"
                    step="50"
                    value={totalParticipants}
                    onChange={(e) =>
                      dispatch({
                        type: "SET_TOTAL_PARTICIPANTS",
                        payload: Number(e.target.value),
                      })
                    }
                    className="w-full h-2 bg-white/[0.05] rounded-full appearance-none cursor-pointer"
                    style={{
                      WebkitAppearance: "none",
                      background: "rgba(255, 255, 255, 0.05)",
                      borderRadius: "9999px",
                      height: "8px",
                      cursor: "pointer",
                    }}
                  />
                  <div className="flex justify-between text-xs text-white/30 mt-1">
                    <span>50</span>
                    <span>50K</span>
                  </div>
                </div>
              </div>

              {/* Distribution Models */}
              <div className="space-y-4">
                <h4 className="text-white/70 font-medium">
                  Distribution Models
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {distributionModels.map((model) => (
                    <motion.button
                      key={model.id}
                      onClick={() =>
                        dispatch({
                          type: "SET_SELECTED_DISTRIBUTION_MODEL",
                          payload: model,
                        })
                      }
                      className={`p-4 rounded-xl border text-left transition-all ${
                        selectedDistributionModel.id === model.id
                          ? "bg-white/[0.05] border-indigo-400/50 ring-1 ring-indigo-400/30"
                          : "bg-white/[0.02] border-white/[0.05] hover:bg-white/[0.03]"
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-lg">{model.icon}</span>
                        <span className="text-white/80 font-medium text-sm">
                          {model.name}
                        </span>
                      </div>
                      <p className="text-white/40 text-xs">
                        {model.description}
                      </p>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Selected Model Details */}
              <div className="space-y-4">
                <h4 className="text-white/70 font-medium">
                  Distribution Breakdown
                </h4>
                <div className="space-y-3">
                  {selectedDistributionModel.tiers.map((tier, index) => {
                    const actualParticipants =
                      calculateParticipantsForTier(tier);
                    const rewardPerPerson =
                      tier.percentage / actualParticipants;

                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center justify-between p-3 bg-white/[0.02] rounded-lg border border-white/[0.05]"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span
                              className={`font-medium text-sm ${tier.color}`}
                            >
                              {tier.name}
                            </span>
                            <span className="text-white/40 text-xs">
                              ({formatNumber(actualParticipants)} people)
                            </span>
                          </div>
                          <div className="flex items-center gap-4 text-xs">
                            <span className="text-white/60">
                              {tier.percentage}% of total rewards
                            </span>
                            <span className="text-white/40">
                              {rewardPerPerson.toFixed(2)}% per person
                            </span>
                          </div>
                        </div>

                        {/* Progress bar */}
                        <div className="w-20 h-2 bg-white/[0.05] rounded-full overflow-hidden ml-4">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${tier.percentage}%` }}
                            transition={{
                              delay: index * 0.1 + 0.3,
                              duration: 0.5,
                            }}
                            className={`h-full rounded-full ${
                              tier.color.includes("blue")
                                ? "bg-blue-400"
                                : tier.color.includes("green")
                                ? "bg-green-400"
                                : tier.color.includes("yellow")
                                ? "bg-yellow-400"
                                : tier.color.includes("red")
                                ? "bg-red-400"
                                : tier.color.includes("purple")
                                ? "bg-purple-400"
                                : tier.color.includes("pink")
                                ? "bg-pink-400"
                                : "bg-gray-400"
                            }`}
                          />
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Summary */}
              <div className="p-4 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-xl border border-indigo-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">
                    {selectedDistributionModel.icon}
                  </span>
                  <span className="text-indigo-400 font-medium">
                    {selectedDistributionModel.name}
                  </span>
                </div>
                <p className="text-white/60 text-sm">
                  {selectedDistributionModel.description}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
