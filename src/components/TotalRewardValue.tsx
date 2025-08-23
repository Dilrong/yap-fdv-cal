import { motion } from "framer-motion";
import { useContext } from "react";
import { CalculatorContext } from "../contexts/CalculatorContext";
import { Users } from "lucide-react";

interface TotalRewardValueProps {
  rewardValue: number;
  participants: number;
  formatNumber: (num: number) => string;
}

export default function TotalRewardValue({
  rewardValue,
  participants,
  formatNumber,
}: TotalRewardValueProps) {
  const { dispatch } = useContext(CalculatorContext);
  const individualRewardValue = rewardValue / participants;

  return (
    <div className="space-y-6">
      {/* Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Total Reward Value */}
        <motion.div
          initial={{ y: 20, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          whileHover={{ scale: 1.02 }}
          className="relative overflow-hidden bg-gradient-to-br from-green-500/10 to-emerald-500/5 rounded-3xl p-8 border border-green-500/20"
        >
          <div className="text-center space-y-4">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="text-4xl"
            >
              💎
            </motion.div>
            <div>
              <p className="text-green-400/80 font-light mb-2">
                Total Yapping Reward Value
              </p>
              <motion.p
                key={rewardValue}
                initial={{ scale: 1.1, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="text-3xl md:text-4xl font-bold text-green-400"
              >
                ${formatNumber(rewardValue)}
              </motion.p>
              <p className="text-white/30 text-sm mt-2">
                Total pool for all participants
              </p>
            </div>

            {/* Animated underline */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "60%" }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="h-0.5 bg-gradient-to-r from-transparent via-green-400 to-transparent mx-auto"
            />
          </div>
        </motion.div>

        {/* Individual Reward Value */}
        <motion.div
          initial={{ y: 20, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          whileHover={{ scale: 1.02 }}
          className="relative overflow-hidden bg-gradient-to-br from-purple-500/10 to-violet-500/5 rounded-3xl p-8 border border-purple-500/20"
        >
          <div className="text-center space-y-4">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="text-4xl"
            >
              🚀
            </motion.div>
            <div>
              <p className="text-purple-400/80 font-light mb-2">
                Your Expected Reward
              </p>
              <motion.p
                key={individualRewardValue}
                initial={{ scale: 1.1, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="text-3xl md:text-4xl font-bold text-purple-400"
              >
                ${formatNumber(individualRewardValue)}
              </motion.p>
              <p className="text-white/30 text-sm mt-2">
                Based on {participants.toLocaleString()} participants
              </p>
            </div>

            {/* Animated underline */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "60%" }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="h-0.5 bg-gradient-to-r from-transparent via-purple-400 to-transparent mx-auto"
            />
          </div>
        </motion.div>
      </div>

      {/* Participants Slider */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="bg-white/[0.02] rounded-2xl p-4 border border-white/[0.05]"
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-purple-400" />
            <span className="text-white/80 text-sm">Adjust Participants</span>
          </div>
          <span className="text-purple-400 font-medium">
            {participants.toLocaleString()}
          </span>
        </div>

        <div className="relative">
          <input
            type="range"
            min="10"
            max="10000"
            step="10"
            value={participants}
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
            <span>10</span>
            <span>10K</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
