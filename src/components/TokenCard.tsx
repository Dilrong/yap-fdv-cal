import { motion } from "framer-motion";

interface TokenCardProps {
  ticker: string;
  imgUrl: string;
  totalSupply: number;
  yappingRewardPercentage: number;
  formatNumber: (num: number) => string;
}

export default function TokenCard({
  ticker,
  imgUrl,
  totalSupply,
  yappingRewardPercentage,
  formatNumber,
}: TokenCardProps) {
  const getCoinMarketCapLink = (ticker: string) => {
    // CoinMarketCap uses lowercase ticker for most coins
    const searchTicker = ticker.toLowerCase();
    return `https://coinmarketcap.com/currencies/${searchTicker}/`;
  };

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.1 }}
      className="bg-white/[0.03] rounded-2xl p-6 border border-white/[0.05]"
    >
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-2xl overflow-hidden bg-white/[0.05] flex items-center justify-center">
          <img
            src={imgUrl}
            alt={ticker}
            className="w-12 h-12 rounded-xl object-cover"
          />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h3 className="text-xl font-semibold text-white">{ticker}</h3>
            <a
              href={getCoinMarketCapLink(ticker)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 hover:text-blue-400 transition-colors duration-200"
              title="View on CoinMarketCap"
            >
              <svg
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path>
                <path d="M5 5a2 2 0 00-2 2v6a2 2 0 002 2h6a2 2 0 002-2v-2a1 1 0 10-2 0v2H5V7h2a1 1 0 000-2H5z"></path>
              </svg>
            </a>
          </div>
          <div className="flex gap-4 mt-2">
            <div>
              <p className="text-white/40 text-xs">Total Supply</p>
              <p className="text-blue-400 font-medium">
                {formatNumber(totalSupply)}
              </p>
            </div>
            <div>
              <p className="text-white/40 text-xs">Yapping Reward</p>
              <p className="text-green-400 font-medium">
                {yappingRewardPercentage}%
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
