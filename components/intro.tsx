"use client";

import clsx from "clsx";
import Dice from "./dice";
import { useDispatch, useSelector } from "react-redux";
import { updateDiceValues, incrementRollCount } from "@/redux/store";

interface DiceValuesState {
  diceValues: {
    diceVal: number;
    rerollDice: boolean;
  }[];
}

export default function Intro() {
  const dispatch = useDispatch();
  const diceValues = useSelector(
    (state) => (state as DiceValuesState).diceValues
  );
  const rollCount = useSelector(
    (state) => (state as { rollCount: number }).rollCount
  );
  const score = useSelector((state) => (state as { score: number }).score);
  const handleRoll = () => {
    dispatch(incrementRollCount());
  };

  function Roll() {
    if (rollCount < 2) {
      const newDiceValues = [...diceValues].map((item) => {
        if (item.rerollDice === true) {
          return {
            ...item,
            diceVal: Math.floor(Math.random() * 6) + 1,
          };
        }
        return item;
      });
      handleRoll();
      dispatch(updateDiceValues(newDiceValues));
    }
  }

  return (
    <div className={clsx("w-full", "md:w-[500px]")}>
      <header
        className={clsx(
          "p-3",
          "mb-8",
          "font-bold",
          "border-b-[1px]",
          "border-[#e8e8e8]"
        )}
      >
        Yahtzee
      </header>
      <div
        className={clsx(
          "flex",
          "justify-between",
          "text-center",
          "md:text-lg",
          "text-xs",
          "w-full"
        )}
      >
        {diceValues.map(
          (item: { diceVal: number; rerollDice: boolean }, index: number) => (
            <Dice
              number={item.diceVal}
              rerollDice={item.rerollDice}
              index={index}
            />
          )
        )}
      </div>

      <div className={clsx("w-full", "h-2", "bg-gray-300", "mt-5")}>
        <div
          className={clsx("h-2", "bg-green-300")}
          style={{ width: `${Math.min(score / 2, 100)}%` }}
        />
      </div>

      <div
        className={clsx(
          "p-5",
          "text-center",
          "bg-sky-500",
          "text-white",
          "my-5",
          "rounded-lg",
          "cursor-pointer",
          rollCount === 2 && "!cursor-not-allowed !bg-gray-400"
        )}
        style={{ boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px" }}
        onClick={Roll}
      >
        Roll againㅤ
        {rollCount + 1} / 3
      </div>
    </div>
  );
}
