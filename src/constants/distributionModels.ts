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

export const distributionModels: DistributionModel[] = [
  {
    id: "equal",
    name: "Equal Distribution",
    description: "All participants receive the same reward",
    icon: "⚖️",
    tiers: [
      {
        name: "All Participants",
        percentage: 100,
        participants: 100,
        color: "text-blue-400",
      },
    ],
  },
  {
    id: "whale_community",
    name: "Whale + Community",
    description: "Large investors separated from regular users",
    icon: "🐋",
    tiers: [
      {
        name: "Whales (Top 10%)",
        percentage: 60,
        participants: 10,
        color: "text-yellow-400",
      },
      {
        name: "Community (90%)",
        percentage: 40,
        participants: 90,
        color: "text-blue-400",
      },
    ],
  },
  {
    id: "tiered",
    name: "3-Tier System",
    description: "Distribution across upper, middle, and lower tiers",
    icon: "🏆",
    tiers: [
      {
        name: "Top Tier (5%)",
        percentage: 40,
        participants: 5,
        color: "text-yellow-400",
      },
      {
        name: "Mid Tier (25%)",
        percentage: 35,
        participants: 25,
        color: "text-green-400",
      },
      {
        name: "Base Tier (70%)",
        percentage: 25,
        participants: 70,
        color: "text-blue-400",
      },
    ],
  },
  {
    id: "power_law",
    name: "Power Law",
    description: "Realistic power law distribution (Pareto principle)",
    icon: "📈",
    tiers: [
      {
        name: "Top 1%",
        percentage: 50,
        participants: 1,
        color: "text-red-400",
      },
      {
        name: "Top 10%",
        percentage: 30,
        participants: 9,
        color: "text-yellow-400",
      },
      {
        name: "Top 50%",
        percentage: 15,
        participants: 40,
        color: "text-green-400",
      },
      {
        name: "Others",
        percentage: 5,
        participants: 50,
        color: "text-blue-400",
      },
    ],
  },
  {
    id: "dao_governance",
    name: "DAO Governance",
    description: "Distribution based on governance participation",
    icon: "🗳️",
    tiers: [
      {
        name: "Core Contributors",
        percentage: 45,
        participants: 5,
        color: "text-purple-400",
      },
      {
        name: "Active Voters",
        percentage: 35,
        participants: 20,
        color: "text-green-400",
      },
      {
        name: "Token Holders",
        percentage: 20,
        participants: 75,
        color: "text-blue-400",
      },
    ],
  },
  {
    id: "influencer",
    name: "Influencer Model",
    description: "Distribution based on influence and followers",
    icon: "🌟",
    tiers: [
      {
        name: "Mega Influencers",
        percentage: 50,
        participants: 3,
        color: "text-pink-400",
      },
      {
        name: "Macro Influencers",
        percentage: 30,
        participants: 12,
        color: "text-yellow-400",
      },
      {
        name: "Micro Influencers",
        percentage: 20,
        participants: 85,
        color: "text-green-400",
      },
    ],
  },
];
