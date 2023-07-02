"use client";

import clsx from "clsx";
import { useEffect, useState } from "react";

interface ITableRow {
  title: string;
  score: number | null;
  guess: number;
}

export default function Table() {
  const [diceVal, setDiceVal] = useState([1, 4, 3, 4, 5]);

  const [tableRows, setTableRows] = useState<ITableRow[]>([
    { title: "Aces", score: null, guess: 0 },
    { title: "Twos", score: null, guess: 0 },
    { title: "Threes", score: null, guess: 0 },
    { title: "Fours", score: null, guess: 0 },
    { title: "Fives", score: null, guess: 0 },
    { title: "Sixes", score: null, guess: 0 },
    { title: "Three-Of-A-Kind", score: null, guess: 0 },
    { title: "Four-Of-A-Kind", score: null, guess: 0 },
    { title: "Full House", score: null, guess: 0 },
    { title: "Small Straight", score: null, guess: 0 },
    { title: "Large Straight", score: null, guess: 0 },
    { title: "Chance", score: null, guess: 0 },
    { title: "Yahtzee", score: null, guess: 0 },
    { title: "Yahtzee 보너스", score: null, guess: 0 },
  ]);

  const countDiceEyes = (eyes: number) => {
    const val = diceVal.reduce((acc, curr) => {
      if (curr === eyes) {
        return acc + 1;
      }
      return acc;
    }, 0);
    return val;
  };

  useEffect(() => {
    setTableRows((prevItems) => {
      const newItems = [...prevItems];

      newItems.map((item, index) => {
        let updatedValue = 0;

        if (item.title === "Aces") {
          // "1이 나온 주사위 눈의 합"
          updatedValue = countDiceEyes(1);
          newItems[index].guess = updatedValue * 1;
        } else if (item.title === "Twos") {
          // "2가 나온 주사위 눈의 합"
          updatedValue = countDiceEyes(2);
          newItems[index].guess = updatedValue * 2;
        } else if (item.title === "Threes") {
          // "3이 나온 주사위 눈의 합"
          updatedValue = countDiceEyes(3);
          newItems[index].guess = updatedValue * 3;
        } else if (item.title === "Fours") {
          // "4가 나온 주사위 눈의 합"
          updatedValue = countDiceEyes(4);
          newItems[index].guess = updatedValue * 4;
        } else if (item.title === "Fives") {
          // "5가 나온 주사위 눈의 합"
          updatedValue = countDiceEyes(5);
          newItems[index].guess = updatedValue * 5;
        } else if (item.title === "Sixes") {
          // "6이 나온 주사위 눈의 합"
          updatedValue = countDiceEyes(6);
          newItems[index].guess = updatedValue * 6;
        } else if (item.title === "Three-Of-A-Kind") {
        } else if (item.title === "Four-Of-A-Kind") {
        } else if (item.title === "Full House") {
        } else if (item.title === "Small Straight") {
        } else if (item.title === "Large Straight") {
        } else if (item.title === "Chance") {
        } else if (item.title === "Yahtzee") {
        } else if (item.title === "Yahtzee 보너스") {
        }
      });
      return newItems;
    });
  }, [diceVal]);

  return (
    <div className={clsx("mt-10", "w-full", "border", "md:px-20")}>
      <div className={clsx("flex")}>
        {diceVal.map((item, index) => (
          <div className="m-2" key={index}>
            {item}
          </div>
        ))}
        <div
          onClick={() =>
            setDiceVal((prevItems) => {
              const newItems = [...prevItems];
              prevItems.map(
                (item, index) =>
                  (newItems[index] = Math.floor(Math.random() * 6) + 1)
              );
              return newItems;
            })
          }
        >
          Roll
        </div>
      </div>
      {tableRows.map((item, index) => (
        <div
          key={item.title}
          className={clsx("flex", "w-full", "text-center", "border-b", "p-3")}
        >
          <div className={clsx("w-2/5")}>{item.title}</div>

          {/* 스코어 */}
          <div className={clsx("w-3/5")}>
            {item.score !== null ? (
              <div className={clsx()}>{item.score}</div>
            ) : (
              <div
                className={clsx("text-gray-300", "cursor-pointer")}
                onClick={() => {
                  setTableRows((prevItems) => {
                    const newItems = [...prevItems];
                    newItems[index].score = item.guess;
                    return newItems;
                  });
                }}
              >
                {item.guess}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
