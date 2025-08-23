import { motion } from "framer-motion";
import { DistributionModel, DistributionTier } from "../types";

interface DistributionResultsProps {
  rewardTokens: number;
  rewardValue: number;
  distributionModel: DistributionModel;
  totalParticipants: number;
  formatNumber: (num: number) => string;
}

export default function DistributionResults({
  rewardTokens,
  rewardValue,
  distributionModel,
  totalParticipants,
  formatNumber,
}: DistributionResultsProps) {
  const calculateTierResults = (tier: DistributionTier) => {
    const actualParticipants = Math.round(
      (tier.participants / 100) * totalParticipants
    );
    const tierRewardTokens = (rewardTokens * tier.percentage) / 100;
    const tierRewardValue = (rewardValue * tier.percentage) / 100;
    const tokensPerPerson = tierRewardTokens / actualParticipants;
    const valuePerPerson = tierRewardValue / actualParticipants;

    return {
      actualParticipants,
      tierRewardTokens,
      tierRewardValue,
      tokensPerPerson,
      valuePerPerson,
    };
  };

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.4 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="text-2xl">{distributionModel.icon}</span>
          <h3 className="text-xl font-semibold text-white/80">
            {distributionModel.name}
          </h3>
        </div>
        <p className="text-white/50 text-sm">{distributionModel.description}</p>
      </div>

      {/* Distribution Results */}
      <div className="grid gap-4">
        {distributionModel.tiers.map((tier, index) => {
          const results = calculateTierResults(tier);

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 + 0.5 }}
              className="bg-white/[0.03] rounded-2xl p-6 border border-white/[0.05]"
            >
              <div className="space-y-4">
                {/* Tier Header */}
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className={`font-semibold ${tier.color}`}>
                      {tier.name}
                    </h4>
                    <p className="text-white/40 text-sm">
                      {formatNumber(results.actualParticipants)} participants •{" "}
                      {tier.percentage}% of rewards
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-white/40">Tier Share</div>
                    <div className="text-lg font-bold text-white/70">
                      {tier.percentage}%
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="relative">
                  <div className="w-full h-2 bg-white/[0.05] rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${tier.percentage}%` }}
                      transition={{ delay: index * 0.1 + 0.7, duration: 0.8 }}
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
                </div>

                {/* Results Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {/* Total Tokens for Tier */}
                  <div className="text-center">
                    <div className="text-xs text-white/40 mb-1">
                      Total Tokens
                    </div>
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: index * 0.1 + 0.9 }}
                      className="text-sm font-semibold text-white/80"
                    >
                      {formatNumber(results.tierRewardTokens)}
                    </motion.div>
                  </div>

                  {/* Total Value for Tier */}
                  <div className="text-center">
                    <div className="text-xs text-white/40 mb-1">
                      Total Value
                    </div>
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: index * 0.1 + 1.0 }}
                      className="text-sm font-semibold text-green-400"
                    >
                      ${formatNumber(results.tierRewardValue)}
                    </motion.div>
                  </div>

                  {/* Tokens per Person */}
                  <div className="text-center">
                    <div className="text-xs text-white/40 mb-1">Per Person</div>
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: index * 0.1 + 1.1 }}
                      className="text-sm font-semibold text-white/80"
                    >
                      {formatNumber(results.tokensPerPerson)} tokens
                    </motion.div>
                  </div>

                  {/* Value per Person */}
                  <div className="text-center">
                    <div className="text-xs text-white/40 mb-1">
                      Value per Person
                    </div>
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: index * 0.1 + 1.2 }}
                      className={`text-sm font-semibold ${
                        results.valuePerPerson >= 1000
                          ? "text-yellow-400"
                          : results.valuePerPerson >= 100
                          ? "text-green-400"
                          : "text-blue-400"
                      }`}
                    >
                      ${formatNumber(results.valuePerPerson)}
                    </motion.div>
                  </div>
                </div>

                {/* Highlight for high-value tiers */}
                {results.valuePerPerson >= 1000 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 + 1.4 }}
                    className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-lg p-3 border border-yellow-500/20"
                  >
                    <div className="flex items-center gap-2 text-yellow-400 text-sm">
                      <span>🔥</span>
                      <span className="font-medium">High-Value Tier</span>
                      <span className="text-white/40">
                        • Premium rewards for top participants
                      </span>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Summary Statistics */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-2xl p-6 border border-indigo-500/20"
      >
        <div className="text-center space-y-3">
          <h4 className="text-white/80 font-medium">Distribution Summary</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <div className="text-white/40 text-xs">Total Participants</div>
              <div className="text-indigo-400 font-semibold">
                {formatNumber(totalParticipants)}
              </div>
            </div>
            <div>
              <div className="text-white/40 text-xs">Distribution Tiers</div>
              <div className="text-indigo-400 font-semibold">
                {distributionModel.tiers.length}
              </div>
            </div>
            <div>
              <div className="text-white/40 text-xs">Total Tokens</div>
              <div className="text-indigo-400 font-semibold">
                {formatNumber(rewardTokens)}
              </div>
            </div>
            <div>
              <div className="text-white/40 text-xs">Total Value</div>
              <div className="text-indigo-400 font-semibold">
                ${formatNumber(rewardValue)}
              </div>
            </div>
          </div>

          {/* Inequality Indicator */}
          <div className="pt-3 border-t border-white/[0.05]">
            {distributionModel.id === "equal" && (
              <div className="flex items-center justify-center gap-2 text-green-400 text-sm">
                <span>⚖️</span>
                <span>Perfect equality - everyone gets the same reward</span>
              </div>
            )}
            {distributionModel.id === "power_law" && (
              <div className="flex items-center justify-center gap-2 text-red-400 text-sm">
                <span>📈</span>
                <span>High inequality - top 1% gets 50% of rewards</span>
              </div>
            )}
            {distributionModel.id === "whale_community" && (
              <div className="flex items-center justify-center gap-2 text-yellow-400 text-sm">
                <span>🐋</span>
                <span>Whale-heavy - large holders get majority share</span>
              </div>
            )}
            {distributionModel.id === "tiered" && (
              <div className="flex items-center justify-center gap-2 text-blue-400 text-sm">
                <span>🏆</span>
                <span>Tiered system - balanced between top and bottom</span>
              </div>
            )}
            {distributionModel.id === "dao_governance" && (
              <div className="flex items-center justify-center gap-2 text-purple-400 text-sm">
                <span>🗳️</span>
                <span>Merit-based - rewards active participation</span>
              </div>
            )}
            {distributionModel.id === "influencer" && (
              <div className="flex items-center justify-center gap-2 text-pink-400 text-sm">
                <span>🌟</span>
                <span>Influence-based - rewards reach and engagement</span>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
