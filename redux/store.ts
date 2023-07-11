import { configureStore } from "@reduxjs/toolkit";

const UPDATE_DICE_VALUES = "UPDATE_DICE_VALUES";
const INCREMENT_ROLL_COUNT = "INCREMENT_ROLL_COUNT";
const RESET_ROLL_COUNT = "RESET_ROLL_COUNT";
const RESET_DICE_VALUES = "RESET_DICE_VALUES";
const UPDATE_SCORE = "UPDATE_SCORE";

export const randomDiceValues = (
  diceValues: { diceVal: number; rerollDice: boolean }[]
) => ({
  type: UPDATE_DICE_VALUES,
  payload: diceValues,
});

export const updateDiceValues = (
  diceValues: { diceVal: number; rerollDice: boolean }[]
) => {
  return {
    type: UPDATE_DICE_VALUES,
    payload: diceValues,
  };
};

export const incrementRollCount = () => {
  return {
    type: INCREMENT_ROLL_COUNT,
  };
};

export const resetDiceValues = () => {
  return {
    type: RESET_DICE_VALUES,
  };
};

export const resetRollCount = () => {
  return {
    type: RESET_ROLL_COUNT,
  };
};

export const updateScore = (score: number) => {
  return {
    type: UPDATE_SCORE,
    payload: score,
  };
};

const initialState = {
  diceValues: [
    { diceVal: Math.floor(Math.random() * 6) + 1, rerollDice: true },
    { diceVal: Math.floor(Math.random() * 6) + 1, rerollDice: true },
    { diceVal: Math.floor(Math.random() * 6) + 1, rerollDice: true },
    { diceVal: Math.floor(Math.random() * 6) + 1, rerollDice: true },
    { diceVal: Math.floor(Math.random() * 6) + 1, rerollDice: true },
  ],
  rollCount: 0,
  score: 0,
};

const rootReducer = (
  state = initialState,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case UPDATE_DICE_VALUES:
      return {
        ...state,
        diceValues: action.payload,
      };

    case RESET_DICE_VALUES:
      return {
        ...state,
        diceValues: [
          { diceVal: Math.floor(Math.random() * 6) + 1, rerollDice: true },
          { diceVal: Math.floor(Math.random() * 6) + 1, rerollDice: true },
          { diceVal: Math.floor(Math.random() * 6) + 1, rerollDice: true },
          { diceVal: Math.floor(Math.random() * 6) + 1, rerollDice: true },
          { diceVal: Math.floor(Math.random() * 6) + 1, rerollDice: true },
        ],
        rollCount: 0,
      };

    case UPDATE_SCORE:
      return {
        ...state,
        score: action.payload,
      };

    case INCREMENT_ROLL_COUNT:
      return {
        ...state,
        rollCount: state.rollCount + 1,
      };

    case RESET_ROLL_COUNT:
      return {
        ...state,
        rollCount: 0,
      };

    default:
      return state;
  }
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
