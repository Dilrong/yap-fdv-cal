import YappingCalculator from "./components/YappingCalculator";
import { leaderboards } from "./constants/leaderboard";
import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { LeaderboardToken, SelectedToken } from "./types";
import TokenSelection from "./components/TokenSelection";

function App() {
  const [selectedToken, setSelectedToken] = useState<SelectedToken | null>(
    null
  );

  const [isTokenListVisible, setIsTokenListVisible] = useState(true);

  const selectToken = useCallback((token: LeaderboardToken) => {
    setSelectedToken({
      ticker: token.ticker,
      imgUrl: token.imgUrl,
      totalSupply: token.totalSupply || 1000000000, // 기본값: 1B
      yappingRewardPercentage: token.yappingRewardPercentage || 0.1, // 기본값: 0.1%
      category: token.category,
    });
    // 토큰 선택 시 리스트 숨기기 (모든 화면 크기에서)
    setIsTokenListVisible(false);
  }, []);

  const toggleTokenList = useCallback(() => {
    setIsTokenListVisible(!isTokenListVisible);
  }, [isTokenListVisible]);

  const resetTokenSelection = useCallback(() => {
    setSelectedToken(null);
    setIsTokenListVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      ></div>

      {/* Subtle ambient glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-2 md:p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="relative w-full max-w-6xl"
        >
          {/* Glass Surface Container */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="relative overflow-hidden bg-white/[0.02] backdrop-blur-xl rounded-2xl md:rounded-3xl border border-white/[0.05] shadow-2xl"
          >
            {/* Inner glass panel */}
            <div className="relative p-4 md:p-8 lg:p-12">
              <div className="text-center space-y-6 md:space-y-12">
                {/* Header */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="space-y-4 md:space-y-6"
                >
                  <h1 className="text-2xl md:text-4xl lg:text-5xl font-light text-white/90 tracking-wide px-4">
                    How much is the yapping reward?
                  </h1>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 1, duration: 1.2 }}
                    className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mx-auto max-w-md"
                  />
                </motion.div>

                {/* Project Selection */}
                <TokenSelection
                  leaderboards={leaderboards}
                  selectedToken={selectedToken}
                  isTokenListVisible={isTokenListVisible}
                  onSelectToken={selectToken}
                  onReset={resetTokenSelection}
                  onToggleList={toggleTokenList}
                />

                {/* Calculator */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <YappingCalculator selectedToken={selectedToken} />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default App;
