export interface LeaderboardToken {
  id: number;
  ticker: string;
  imgUrl: string;
  totalSupply?: number;
  yappingRewardPercentage?: number;
  category?: string;
}

export interface SelectedToken {
  ticker: string;
  imgUrl: string;
  totalSupply: number;
  yappingRewardPercentage?: number;
  category?: string;
}

export interface DistributionTier {
  name: string;
  percentage: number;
  participants: number;
  color: string;
}

export interface DistributionModel {
  id: string;
  name: string;
  description: string;
  icon: string;
  tiers: DistributionTier[];
}

export interface CalculatorState {
  fdv: number;
  participants: number;
  customRewardPercentage: number;
  customTotalSupply: number;
  fdvMin: number;
  fdvMax: number;
  useCustomValues: boolean;
  selectedDistributionModel: DistributionModel;
  totalParticipants: number;
}

export type CalculatorAction =
  | { type: "SET_FDV"; payload: number }
  | { type: "SET_PARTICIPANTS"; payload: number }
  | { type: "SET_CUSTOM_REWARD_PERCENTAGE"; payload: number }
  | { type: "SET_CUSTOM_TOTAL_SUPPLY"; payload: number }
  | { type: "SET_FDV_MIN"; payload: number }
  | { type: "SET_FDV_MAX"; payload: number }
  | { type: "SET_USE_CUSTOM_VALUES"; payload: boolean }
  | { type: "SET_SELECTED_DISTRIBUTION_MODEL"; payload: DistributionModel }
  | { type: "SET_TOTAL_PARTICIPANTS"; payload: number };

export interface YappingCalculatorProps {
  selectedToken: SelectedToken | null;
}
