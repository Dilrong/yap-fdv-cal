import { motion, AnimatePresence } from "framer-motion";
import { useMemo } from "react";
import { LeaderboardToken, SelectedToken } from "../types";
import Tooltip from "./Tooltip";

interface TokenSelectionProps {
  leaderboards: LeaderboardToken[];
  selectedToken: SelectedToken | null;
  isTokenListVisible: boolean;
  onSelectToken: (token: LeaderboardToken) => void;
  onReset: () => void;
  onToggleList: () => void;
}

const TokenSelection: React.FC<TokenSelectionProps> = ({
  leaderboards,
  selectedToken,
  isTokenListVisible,
  onSelectToken,
  onReset,
  onToggleList,
}) => {
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
          whileHover={{ y: -2, scale: 1.03 }}
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
              onClick={() => onSelectToken(leaderboard)}
            >
              <div className="absolute inset-0 bg-white/[0.03] backdrop-blur-md rounded-xl md:rounded-2xl border border-white/[0.08] group-hover:bg-white/[0.05] transition-colors duration-200" />
              <div className="relative p-1.5 md:p-2 h-full w-full">
                <img
                  className="w-full h-full rounded-lg md:rounded-xl object-cover"
                  src={leaderboard.imgUrl}
                  alt={leaderboard.ticker}
                  loading="lazy"
                />
              </div>
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
    [leaderboards, selectedToken?.ticker, onSelectToken]
  );

  return (
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
                onClick={onToggleList}
                className="bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] rounded-full px-3 py-1 text-xs text-white/70 transition-colors"
              >
                {isTokenListVisible ? "Hide List" : "Show List"}
              </button>
              <button
                onClick={onReset}
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

      {selectedToken && !isTokenListVisible && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center gap-3 bg-white/[0.03] hover:bg-white/[0.05] rounded-xl p-3 mx-4 cursor-pointer transition-colors border border-white/[0.08]"
          onClick={onToggleList}
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
  );
};

export default TokenSelection;
