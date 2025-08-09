import { motion } from "framer-motion";

interface CalculationResultsProps {
  tokenPrice: number;
  rewardTokens: number;
  rewardPercentage: number;
  participants: number;
  formatNumber: (num: number) => string;
}

export default function CalculationResults({
  tokenPrice,
  rewardTokens,
  rewardPercentage,
  participants,
  formatNumber,
}: CalculationResultsProps) {
  const individualRewardTokens = rewardTokens / participants;

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="grid grid-cols-1 md:grid-cols-3 gap-4"
    >
      {/* Token Price */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-white/[0.03] rounded-2xl p-6 border border-white/[0.05]"
      >
        <div className="text-center">
          <div className="w-12 h-12 mx-auto rounded-full bg-blue-500/10 flex items-center justify-center mb-4">
            <span className="text-2xl">💰</span>
          </div>
          <p className="text-white/40 text-sm mb-2">Token Price</p>
          <p className="text-xl font-semibold text-blue-400">
            ${tokenPrice.toFixed(6)}
          </p>
        </div>
      </motion.div>

      {/* Total Yapping Rewards */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-white/[0.03] rounded-2xl p-6 border border-white/[0.05]"
      >
        <div className="text-center">
          <div className="w-12 h-12 mx-auto rounded-full bg-green-500/10 flex items-center justify-center mb-4">
            <span className="text-2xl">🎁</span>
          </div>
          <p className="text-white/40 text-sm mb-2">Total Yapping Rewards</p>
          <p className="text-xl font-semibold text-green-400">
            {formatNumber(rewardTokens)} tokens
          </p>
          <p className="text-white/30 text-xs mt-1">
            ({rewardPercentage}% of supply)
          </p>
        </div>
      </motion.div>

      {/* Individual Reward */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-white/[0.03] rounded-2xl p-6 border border-white/[0.05]"
      >
        <div className="text-center">
          <div className="w-12 h-12 mx-auto rounded-full bg-purple-500/10 flex items-center justify-center mb-4">
            <span className="text-2xl">👤</span>
          </div>
          <p className="text-white/40 text-sm mb-2">Individual Reward</p>
          <p className="text-xl font-semibold text-purple-400">
            {formatNumber(individualRewardTokens)} tokens
          </p>
          <p className="text-white/30 text-xs mt-1">
            ({participants.toLocaleString()} participants)
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
