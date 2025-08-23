import { createContext, useReducer, Dispatch, FC, ReactNode } from "react";
import { CalculatorState, CalculatorAction } from "../types";
import { distributionModels } from "../constants/distributionModels";

export const initialState: CalculatorState = {
  fdv: 1000000,
  participants: 100,
  customRewardPercentage: 0.1,
  customTotalSupply: 1000000000,
  fdvMin: 100000,
  fdvMax: 10000000000,
  useCustomValues: false,
  selectedDistributionModel: distributionModels[0],
  totalParticipants: 100,
};

export const calculatorReducer = (
  state: CalculatorState,
  action: CalculatorAction
): CalculatorState => {
  switch (action.type) {
    case "SET_FDV":
      return { ...state, fdv: action.payload };
    case "SET_PARTICIPANTS":
      return { ...state, participants: action.payload };
    case "SET_CUSTOM_REWARD_PERCENTAGE":
      return { ...state, customRewardPercentage: action.payload };
    case "SET_CUSTOM_TOTAL_SUPPLY":
      return { ...state, customTotalSupply: action.payload };
    case "SET_FDV_MIN":
      return { ...state, fdvMin: action.payload };
    case "SET_FDV_MAX":
      return { ...state, fdvMax: action.payload };
    case "SET_USE_CUSTOM_VALUES":
      return { ...state, useCustomValues: action.payload };
    case "SET_SELECTED_DISTRIBUTION_MODEL":
      return { ...state, selectedDistributionModel: action.payload };
    case "SET_TOTAL_PARTICIPANTS":
      return { ...state, totalParticipants: action.payload };
    default:
      return state;
  }
};

export const CalculatorContext = createContext<{
  state: CalculatorState;
  dispatch: Dispatch<CalculatorAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

export const CalculatorProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(calculatorReducer, initialState);

  return (
    <CalculatorContext.Provider value={{ state, dispatch }}>
      {children}
    </CalculatorContext.Provider>
  );
};
