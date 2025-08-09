import Tooltip from "./components/Tooltip";
import yappingCalculator from "./components/yappingCalculator";
import { leaderboards } from "./constants/leaderboard";
import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

function App() {
  interface LeaderboardToken {
    ticker: string;
    imgUrl: string;
    totalSupply?: number;
    yappingRewardPercentage?: number;
  }

  const [selectedToken, setSelectedToken] = useState<{
    ticker: string;
    imgUrl: string;
    totalSupply: number;
    yappingRewardPercentage?: number;
  } | null>(null);

  const [isTokenListVisible, setIsTokenListVisible] = useState(true);

  const selectToken = useCallback((token: LeaderboardToken) => {
    setSelectedToken({
      ticker: token.ticker,
      imgUrl: token.imgUrl,
      totalSupply: token.totalSupply || 1000000000, // 기본값: 1B
      yappingRewardPercentage: token.yappingRewardPercentage || 0.1, // 기본값: 0.1%
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

  // 토큰 리스트를 메모이제이션
  const tokenList = useMemo(
    () =>
      leaderboards.map((leaderboard, index) => (
        <motion.div
          key={`${leaderboard.ticker}-${leaderboard.id}`}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            delay: Math.min(0.4 + (index % 20) * 0.02, 0.8),
            duration: 0.3,
          }}
          whileHover={{ y: -2, scale: 1.03 }} // 모바일에서 덜 강한 효과
          whileTap={{ scale: 0.95 }}
          className="relative group"
        >
          <Tooltip content={leaderboard.ticker}>
            <motion.div
              className={`relative w-12 h-12 md:w-16 md:h-16 cursor-pointer transition-all duration-200 ${
                selectedToken?.ticker === leaderboard.ticker
                  ? "ring-2 ring-blue-400/50 ring-offset-1 md:ring-offset-2 ring-offset-black"
                  : ""
              }`}
              onClick={() => selectToken(leaderboard)}
            >
              {/* Glass background */}
              <div className="absolute inset-0 bg-white/[0.03] backdrop-blur-md rounded-xl md:rounded-2xl border border-white/[0.08] group-hover:bg-white/[0.05] transition-colors duration-200" />

              {/* Image */}
              <div className="relative p-1.5 md:p-2 h-full w-full">
                <img
                  className="w-full h-full rounded-lg md:rounded-xl object-cover"
                  src={leaderboard.imgUrl}
                  alt={leaderboard.ticker}
                  loading="lazy"
                />
              </div>

              {/* Selection indicator */}
              {selectedToken?.ticker === leaderboard.ticker && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                  className="absolute -top-0.5 -right-0.5 md:-top-1 md:-right-1 w-4 h-4 md:w-5 md:h-5 bg-blue-500 rounded-full flex items-center justify-center shadow-lg"
                >
                  <span className="text-white text-xs">✓</span>
                </motion.div>
              )}
            </motion.div>
          </Tooltip>
        </motion.div>
      )),
    [leaderboards, selectedToken?.ticker, selectToken]
  );

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
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="space-y-4 md:space-y-8"
                >
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-4 mb-2">
                      <h3 className="text-lg md:text-xl font-light text-white/80">
                        Select Project
                      </h3>
                      {selectedToken && (
                        <>
                          <button
                            onClick={toggleTokenList}
                            className="bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] rounded-full px-3 py-1 text-xs text-white/70 transition-colors"
                          >
                            {isTokenListVisible ? "Hide List" : "Show List"}
                          </button>
                          <button
                            onClick={resetTokenSelection}
                            className="bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] rounded-full px-3 py-1 text-xs text-white/70 transition-colors"
                          >
                            Reset Selection
                          </button>
                        </>
                      )}
                    </div>
                    <p className="text-white/50 text-sm px-4">
                      {selectedToken && !isTokenListVisible
                        ? "Tap the selected token below to change selection"
                        : "Choose a token to calculate yapping rewards"}
                    </p>
                  </div>

                  <AnimatePresence>
                    {isTokenListVisible && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="flex flex-wrap gap-2 md:gap-3 justify-center max-w-5xl mx-auto max-h-64 md:max-h-96 overflow-y-auto p-2">
                          {tokenList}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Selected Token Display (리스트가 숨겨졌을 때) */}
                  {selectedToken && !isTokenListVisible && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center justify-center gap-3 bg-white/[0.03] hover:bg-white/[0.05] rounded-xl p-3 mx-4 cursor-pointer transition-colors border border-white/[0.08]"
                      onClick={toggleTokenList}
                    >
                      <img
                        src={selectedToken.imgUrl}
                        alt={selectedToken.ticker}
                        className="w-8 h-8 rounded-lg"
                      />
                      <span className="text-white/80 font-medium">
                        {selectedToken.ticker}
                      </span>
                      <span className="text-white/40 text-sm">
                        (click to change)
                      </span>
                    </motion.div>
                  )}
                </motion.div>

                {/* Calculator */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <yappingCalculator selectedToken={selectedToken} />
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
