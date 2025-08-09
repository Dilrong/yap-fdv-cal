import { useState } from "react";
import { motion } from "framer-motion";
import TokenCard from "./TokenCard";
import FDVSlider from "./FDVSlider";
import CalculationResults from "./CalculationResults";
import TotalRewardValue from "./TotalRewardValue";
import AdvancedSettings from "./AdvancedSettings";
import RewardDistribution from "./RewardDistribution";
import DistributionResults from "./DistributionResults";
import {
  type DistributionModel,
  distributionModels,
} from "../constants/distributionModels";

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

  // Advanced Settings States
  const [participants, setParticipants] = useState<number>(100);
  const [customRewardPercentage, setCustomRewardPercentage] =
    useState<number>(0.1);
  const [customTotalSupply, setCustomTotalSupply] =
    useState<number>(1000000000);
  const [fdvMin, setFdvMin] = useState<number>(100000);
  const [fdvMax, setFdvMax] = useState<number>(10000000000);
  const [useCustomValues, setUseCustomValues] = useState<boolean>(false);

  // Distribution Settings
  const [selectedDistributionModel, setSelectedDistributionModel] =
    useState<DistributionModel>(distributionModels[0]);
  const [totalParticipants, setTotalParticipants] = useState<number>(1000);

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

  // Use custom values if enabled, otherwise use token defaults
  const effectiveRewardPercentage = useCustomValues
    ? customRewardPercentage
    : selectedToken.yappingRewardPercentage || 0.1;

  const effectiveTotalSupply = useCustomValues
    ? customTotalSupply
    : selectedToken.totalSupply;

  const tokenPrice = fdv / effectiveTotalSupply;
  const rewardTokens = (effectiveTotalSupply * effectiveRewardPercentage) / 100;
  const rewardValue = rewardTokens * tokenPrice;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden bg-white/[0.02] backdrop-blur-xl rounded-3xl p-8 border border-white/[0.05]"
    >
      <div className="space-y-8">
        {/* Advanced Settings */}
        <AdvancedSettings
          participants={participants}
          setParticipants={setParticipants}
          customRewardPercentage={customRewardPercentage}
          setCustomRewardPercentage={setCustomRewardPercentage}
          customTotalSupply={customTotalSupply}
          setCustomTotalSupply={setCustomTotalSupply}
          fdvMin={fdvMin}
          setFdvMin={setFdvMin}
          fdvMax={fdvMax}
          setFdvMax={setFdvMax}
          useCustomValues={useCustomValues}
          setUseCustomValues={setUseCustomValues}
        />

        {/* Reward Distribution Settings */}
        <RewardDistribution
          selectedModel={selectedDistributionModel}
          setSelectedModel={setSelectedDistributionModel}
          totalParticipants={totalParticipants}
          setTotalParticipants={setTotalParticipants}
        />

        {/* Selected Token Info */}
        <TokenCard
          ticker={selectedToken.ticker}
          imgUrl={selectedToken.imgUrl}
          totalSupply={effectiveTotalSupply}
          yappingRewardPercentage={effectiveRewardPercentage}
          formatNumber={formatNumber}
        />

        {/* FDV Slider */}
        <FDVSlider fdv={fdv} setFdv={setFdv} min={fdvMin} max={fdvMax} />

        {/* Basic Calculation Results (for simple equal distribution) */}
        {selectedDistributionModel.id === "equal" && (
          <CalculationResults
            tokenPrice={tokenPrice}
            rewardTokens={rewardTokens}
            rewardPercentage={effectiveRewardPercentage}
            participants={totalParticipants}
            formatNumber={formatNumber}
          />
        )}

        {/* Advanced Distribution Results */}
        {selectedDistributionModel.id !== "equal" && (
          <DistributionResults
            rewardTokens={rewardTokens}
            rewardValue={rewardValue}
            distributionModel={selectedDistributionModel}
            totalParticipants={totalParticipants}
            formatNumber={formatNumber}
          />
        )}

        {/* Total Reward Value */}
        <TotalRewardValue
          rewardValue={rewardValue}
          participants={totalParticipants}
          formatNumber={formatNumber}
        />
      </div>
    </motion.div>
  );
}
