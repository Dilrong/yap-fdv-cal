interface PriceData {
  price: number;
  marketCap: number;
  fdv: number;
  priceChange24h: number;
  lastUpdated: number;
}

interface CoinGeckoResponse {
  [key: string]: {
    usd: number;
    usd_market_cap: number;
    usd_24h_change: number;
    usd_24h_vol: number;
  };
}

// CoinGecko ID 매핑 (ticker -> CoinGecko ID)
const COINGECKO_IDS: Record<string, string> = {
  // Major tokens
  ARB: "arbitrum",
  APT: "aptos",
  NEAR: "near",
  DOT: "polkadot",
  INJ: "injective-protocol",
  SEI: "sei-network",
  DYDX: "dydx",
  MNT: "mantle",
  OM: "mantra-dao",
  POL: "polygon-ecosystem-token",
  ZEC: "zcash",
  PYTH: "pyth-network",

  // Newer tokens - these might need different IDs
  FUEL: "fuel",
  PENGU: "pudgy-penguins",
  KAIA: "kaia",
  S: "sonic-network", // Sonic
  INITIA: "initia",
  CORN: "corn",
  MOVEMENT: "movement",
  QUAI: "quai-network",
  BLUE: "bluefin",

  // Add more mappings as needed
};

// 캐시를 위한 저장소
const priceCache = new Map<string, { data: PriceData; timestamp: number }>();
const CACHE_DURATION = 30000; // 30초 캐시

class PriceService {
  private async fetchFromCoinGecko(ids: string[]): Promise<CoinGeckoResponse> {
    const idsString = ids.join(",");
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${idsString}&vs_currencies=usd&include_market_cap=true&include_24hr_change=true&include_24hr_vol=true`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`CoinGecko API error: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Failed to fetch from CoinGecko:", error);
      throw error;
    }
  }

  async getPrice(
    ticker: string,
    totalSupply: number
  ): Promise<PriceData | null> {
    const cacheKey = ticker;
    const now = Date.now();

    // 캐시 확인
    const cached = priceCache.get(cacheKey);
    if (cached && now - cached.timestamp < CACHE_DURATION) {
      return cached.data;
    }

    const coinGeckoId = COINGECKO_IDS[ticker];
    if (!coinGeckoId) {
      console.warn(`No CoinGecko ID found for ticker: ${ticker}`);
      return null;
    }

    try {
      const response = await this.fetchFromCoinGecko([coinGeckoId]);
      const coinData = response[coinGeckoId];

      if (!coinData) {
        console.warn(`No price data found for ${ticker} (${coinGeckoId})`);
        return null;
      }

      const price = coinData.usd;
      const marketCap = coinData.usd_market_cap;
      const fdv = price * totalSupply;
      const priceChange24h = coinData.usd_24h_change || 0;

      const priceData: PriceData = {
        price,
        marketCap,
        fdv,
        priceChange24h,
        lastUpdated: now,
      };

      // 캐시에 저장
      priceCache.set(cacheKey, { data: priceData, timestamp: now });

      return priceData;
    } catch (error) {
      console.error(`Failed to fetch price for ${ticker}:`, error);
      return null;
    }
  }

  async getPrices(
    tokens: Array<{ ticker: string; totalSupply: number }>
  ): Promise<Record<string, PriceData>> {
    const results: Record<string, PriceData> = {};

    // 캐시되지 않은 토큰들만 API 호출
    const tokensToFetch = tokens.filter((token) => {
      const cached = priceCache.get(token.ticker);
      if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
        results[token.ticker] = cached.data;
        return false;
      }
      return COINGECKO_IDS[token.ticker]; // CoinGecko ID가 있는 토큰만
    });

    if (tokensToFetch.length === 0) {
      return results;
    }

    try {
      const coinGeckoIds = tokensToFetch
        .map((token) => COINGECKO_IDS[token.ticker])
        .filter(Boolean);

      if (coinGeckoIds.length === 0) {
        return results;
      }

      const response = await this.fetchFromCoinGecko(coinGeckoIds);
      const now = Date.now();

      tokensToFetch.forEach((token) => {
        const coinGeckoId = COINGECKO_IDS[token.ticker];
        const coinData = response[coinGeckoId];

        if (coinData) {
          const price = coinData.usd;
          const marketCap = coinData.usd_market_cap;
          const fdv = price * token.totalSupply;
          const priceChange24h = coinData.usd_24h_change || 0;

          const priceData: PriceData = {
            price,
            marketCap,
            fdv,
            priceChange24h,
            lastUpdated: now,
          };

          results[token.ticker] = priceData;
          priceCache.set(token.ticker, { data: priceData, timestamp: now });
        }
      });
    } catch (error) {
      console.error("Failed to fetch multiple prices:", error);
    }

    return results;
  }

  // 캐시 클리어
  clearCache(): void {
    priceCache.clear();
  }

  // 특정 토큰의 캐시 클리어
  clearCacheForToken(ticker: string): void {
    priceCache.delete(ticker);
  }
}

export const priceService = new PriceService();
export type { PriceData };
