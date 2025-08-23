import { useContext, useState, useEffect } from "react";
import { motion } from "framer-motion";
import TokenCard from "./TokenCard";
import FDVSlider from "./FDVSlider";
import CalculationResults from "./CalculationResults";
import TotalRewardValue from "./TotalRewardValue";
import AdvancedSettings from "./AdvancedSettings";
import RewardDistribution from "./RewardDistribution";
import DistributionResults from "./DistributionResults";
import {
  CalculatorProvider,
  CalculatorContext,
} from "../contexts/CalculatorContext";
import { YappingCalculatorProps } from "../types";
import { priceService, PriceData } from "../services/priceService";

const CalculatorUI = ({ selectedToken }: YappingCalculatorProps) => {
  const { state } = useContext(CalculatorContext);
  const { useCustomValues, selectedDistributionModel } = state;
  const [livePriceData, setLivePriceData] = useState<PriceData | null>(null);

  const isPostTGE = selectedToken?.category === "postTGE";

  // TGE한 프로젝트의 실시간 가격 정보 가져오기
  useEffect(() => {
    if (!selectedToken || !isPostTGE) {
      setLivePriceData(null);
      return;
    }

    let mounted = true;

    const fetchLivePrice = async () => {
      try {
        const data = await priceService.getPrice(
          selectedToken.ticker,
          selectedToken.totalSupply
        );
        if (mounted) {
          setLivePriceData(data);
        }
      } catch (error) {
        console.error("Failed to fetch live price:", error);
      }
    };

    fetchLivePrice();

    // 30초마다 업데이트
    const interval = setInterval(fetchLivePrice, 30000);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, [selectedToken, isPostTGE]);

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

  const effectiveRewardPercentage = useCustomValues
    ? state.customRewardPercentage
    : selectedToken.yappingRewardPercentage || 0.1;

  const effectiveTotalSupply = useCustomValues
    ? state.customTotalSupply
    : selectedToken.totalSupply;

  // TGE한 프로젝트의 경우 실시간 FDV 사용
  const effectiveFDV =
    isPostTGE && livePriceData ? livePriceData.fdv : state.fdv;
  const tokenPrice = effectiveFDV / effectiveTotalSupply;
  const rewardTokens = (effectiveTotalSupply * effectiveRewardPercentage) / 100;
  const rewardValue = rewardTokens * tokenPrice;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden bg-white/[0.02] backdrop-blur-xl rounded-3xl p-8 border border-white/[0.05]"
    >
      <div className="space-y-6">
        {/* Main Content - Always Visible */}
        <div className="space-y-6">
          <TokenCard
            ticker={selectedToken.ticker}
            imgUrl={selectedToken.imgUrl}
            totalSupply={effectiveTotalSupply}
            yappingRewardPercentage={effectiveRewardPercentage}
            formatNumber={formatNumber}
            category={selectedToken.category}
          />

          {/* Live FDV Alert for Post-TGE tokens */}
          {isPostTGE && livePriceData && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-xl p-3 border border-green-500/20"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-400 text-sm font-medium">
                  Live FDV: ${formatNumber(livePriceData.fdv)}
                </span>
              </div>
            </motion.div>
          )}

          {/* FDV Slider - hidden for live tokens */}
          {!isPostTGE && <FDVSlider />}
        </div>

        {/* Results - Always Visible */}
        <div className="space-y-4">
          {selectedDistributionModel.id === "equal" && (
            <CalculationResults
              tokenPrice={tokenPrice}
              rewardTokens={rewardTokens}
              rewardPercentage={effectiveRewardPercentage}
              participants={state.totalParticipants}
              formatNumber={formatNumber}
            />
          )}
          {selectedDistributionModel.id !== "equal" && (
            <DistributionResults
              rewardTokens={rewardTokens}
              rewardValue={rewardValue}
              distributionModel={selectedDistributionModel}
              totalParticipants={state.totalParticipants}
              formatNumber={formatNumber}
            />
          )}
          <TotalRewardValue
            rewardValue={rewardValue}
            participants={state.totalParticipants}
            formatNumber={formatNumber}
          />
        </div>

        {/* Advanced Options - Collapsible */}
        <div className="space-y-4 pt-4 border-t border-white/[0.05]">
          <AdvancedSettings />
          <RewardDistribution />
        </div>
      </div>
    </motion.div>
  );
};

const YappingCalculator = ({ selectedToken }: YappingCalculatorProps) => (
  <CalculatorProvider>
    <CalculatorUI selectedToken={selectedToken} />
  </CalculatorProvider>
);

export default YappingCalculator;
