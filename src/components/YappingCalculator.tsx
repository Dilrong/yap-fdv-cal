import { useState } from "react";
import { motion } from "framer-motion";
import TokenCard from "./TokenCard";
import FDVSlider from "./FDVSlider";
import CalculationResults from "./CalculationResults";
import TotalRewardValue from "./TotalRewardValue";

interface yappingCalculatorProps {
  selectedToken: {
    ticker: string;
    imgUrl: string;
    totalSupply: number;
    yappingRewardPercentage?: number;
  } | null;
}

export default function YappingCalculator({
  selectedToken,
}: yappingCalculatorProps) {
  const [fdv, setFdv] = useState<number>(1000000); // Default 1M

  const formatNumber = (num: number): string => {
    if (num >= 1000000000) return `${(num / 1000000000).toFixed(1)}B`;
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toFixed(2);
  };

  if (!selectedToken) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden bg-white/[0.02] backdrop-blur-md rounded-2xl p-8 text-center border border-white/[0.05]"
      >
        <div className="space-y-4">
          <div>
            <p className="text-white/70 font-light">Please select a project</p>
            <p className="text-white/40 text-sm mt-2">
              Choose a token to calculate yapping rewards
            </p>
          </div>
        </div>
      </motion.div>
    );
  }

  const rewardPercentage = selectedToken.yappingRewardPercentage || 0.1; // Default to 0.1% if not specified
  const tokenPrice = fdv / selectedToken.totalSupply;
  const rewardTokens = (selectedToken.totalSupply * rewardPercentage) / 100;
  const rewardValue = rewardTokens * tokenPrice;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden bg-white/[0.02] backdrop-blur-xl rounded-3xl p-8 border border-white/[0.05]"
    >
      <div className="space-y-8">
        {/* Selected Token Info */}
        <TokenCard
          ticker={selectedToken.ticker}
          imgUrl={selectedToken.imgUrl}
          totalSupply={selectedToken.totalSupply}
          yappingRewardPercentage={rewardPercentage}
          formatNumber={formatNumber}
        />

        {/* FDV Slider */}
        <FDVSlider fdv={fdv} setFdv={setFdv} />

        {/* Calculation Results */}
        <CalculationResults
          tokenPrice={tokenPrice}
          rewardTokens={rewardTokens}
          rewardPercentage={rewardPercentage}
          formatNumber={formatNumber}
        />

        {/* Total Reward Value */}
        <TotalRewardValue
          rewardValue={rewardValue}
          formatNumber={formatNumber}
        />
      </div>
    </motion.div>
  );
}
