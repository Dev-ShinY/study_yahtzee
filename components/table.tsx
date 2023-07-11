"use client";

import clsx from "clsx";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetDiceValues, updateScore } from "@/redux/store";
import { Tooltip } from "./tooltip";

interface ITableRow {
  title: string;
  tooltip: string;
  score: number | null;
  guess: number;
}

interface DiceValuesState {
  diceValues: {
    diceVal: number;
    rerollDice: boolean;
  }[];
}

export default function Table() {
  const dispatch = useDispatch();
  const diceValues = useSelector(
    (state) => (state as DiceValuesState).diceValues
  );
  const handleDiceReset = () => {
    dispatch(resetDiceValues());
  };
  const score = useSelector((state) => (state as { score: number }).score);
  const [tableRows, setTableRows] = useState<ITableRow[]>([
    {
      title: "Aces",
      tooltip: "1이 나온 주사위 눈의 합",
      score: null,
      guess: 0,
    },
    {
      title: "Twos",
      tooltip: "2가 나온 주사위 눈의 합",
      score: null,
      guess: 0,
    },
    {
      title: "Threes",
      tooltip: "3이 나온 주사위 눈의 합",
      score: null,
      guess: 0,
    },
    {
      title: "Fours",
      tooltip: "4가 나온 주사위 눈의 합",
      score: null,
      guess: 0,
    },
    {
      title: "Fives",
      tooltip: "5가 나온 주사위 눈의 합",
      score: null,
      guess: 0,
    },
    {
      title: "Sixes",
      tooltip: "6이 나온 주사위 눈의 합",
      score: null,
      guess: 0,
    },
    {
      title: "Bonus",
      tooltip: "상단항목에서 합이 63점이 넘을 경우 35점을 추가한다.",
      score: null,
      guess: 0,
    },
    {
      title: "Three-Of-A-Kind",
      tooltip: "주사위 3개 이상의 눈이 동일할 때, 주사위 5개의 합",
      score: null,
      guess: 0,
    },
    {
      title: "Four-Of-A-Kind",
      tooltip: "주사위 4개 이상의 눈이 동일할 때, 주사위 5개의 합",
      score: null,
      guess: 0,
    },
    {
      title: "Full House",
      tooltip:
        "동일한 주사위 눈 한 종류가 3개, 다른 종류가 2개일 때, 고정 25점",
      score: null,
      guess: 0,
    },
    {
      title: "Small Straight",
      tooltip: "주사위 4개 이상의 눈이 이어지는 수일 때, 고정 30점",
      score: null,
      guess: 0,
    },
    {
      title: "Large Straight",
      tooltip: "주사위 5개의 눈이 이어지는 수일 때, 고정 40점",
      score: null,
      guess: 0,
    },
    {
      title: "Chance",
      tooltip: "주사위 5개의 눈의 총합",
      score: null,
      guess: 0,
    },
    {
      title: "Yahtzee",
      tooltip: "주사위 5개의 눈이 모두 같을 때, 고정 50점",
      score: null,
      guess: 0,
    },
  ]);

  // 특정 주사위 눈의 갯수를 카운트
  const countDiceEyes = (eyes: number) => {
    const val = diceValues.reduce((acc, curr) => {
      if (curr.diceVal === eyes) {
        return acc + 1;
      }
      return acc;
    }, 0);
    return val;
  };

  // 동일한 주사위 눈의 갯수들의 object
  const tallyCountDiceEyes = () => {
    const counts: { [key: number]: number } = {};
    diceValues.forEach((element) => {
      counts[element.diceVal] = (counts[element.diceVal] || 0) + 1;
    });
    return counts;
  };

  // 연속적인 숫자인지 체크
  const checkConsecutiveNumbers = () => {
    let newArr = diceValues
      .map((item) => item.diceVal)
      .sort()
      .filter((value, index, self) => self.indexOf(value) === index);

    let consecutiveCount = 1;
    for (let i = 0; i < newArr.length - 1; i++) {
      if (newArr[i] + 1 === newArr[i + 1]) {
        consecutiveCount++;
        if (consecutiveCount >= 4) {
          return true;
        }
      } else {
        consecutiveCount = 1;
      }
    }
    return false;
  };

  // table click시 table update
  const updateTableRows = (item: ITableRow, index: number) => {
    // talbeRows state update
    setTableRows((prevItems) => {
      const newItems = [...prevItems];
      newItems[index].score = item.guess;

      // score update
      dispatch(
        updateScore(
          tableRows.reduce(
            (total, item) => total + (item.score !== null ? item.score : 0),
            0
          )
        )
      );
      return newItems;
    });
    // roll dice
    handleDiceReset();
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
        } else if (item.title == "Bonus") {
          let bonusScore = tableRows
            .filter(
              (row) =>
                row.title === "Aces" ||
                row.title === "Twos" ||
                row.title === "Threes" ||
                row.title === "Fours" ||
                row.title === "Fives" ||
                row.title === "Sixes"
            )
            .reduce((sum, row) => sum + (row.score || 0), 0);
          bonusScore >= 63
            ? (newItems[index].score = 35)
            : (newItems[index].guess = bonusScore);
        } else if (item.title === "Three-Of-A-Kind") {
          // 주사위 3개 이상의 눈이 동일할 때, 주사위 5개의 합
          Math.max(...Object.values(tallyCountDiceEyes())) >= 3
            ? (newItems[index].guess = diceValues.reduce(
                (acc, current) => acc + current.diceVal,
                0
              ))
            : (newItems[index].guess = 0);
        } else if (item.title === "Four-Of-A-Kind") {
          // 주사위 4개 이상의 눈이 동일할 때, 주사위 5개의 합
          Math.max(...Object.values(tallyCountDiceEyes())) >= 4
            ? (newItems[index].guess = diceValues.reduce(
                (acc, current) => acc + current.diceVal,
                0
              ))
            : (newItems[index].guess = 0);
        } else if (item.title === "Full House") {
          // 동일한 주사위 눈 한 종류가 3개, 다른 종류가 2개일 때, 고정 25점
          Object.values(tallyCountDiceEyes()).sort((a, b) => b - a)[0] === 3 &&
          Object.values(tallyCountDiceEyes()).sort((a, b) => b - a)[1] === 2
            ? (newItems[index].guess = 25)
            : (newItems[index].guess = 0);
        } else if (item.title === "Small Straight") {
          // 주사위 4개 이상의 눈이 이어지는 수일 때, 고정 30점
          checkConsecutiveNumbers()
            ? (newItems[index].guess = 30)
            : (newItems[index].guess = 0);
        } else if (item.title === "Large Straight") {
          // 주사위 5개의 눈이 이어지는 수일 때, 고정 40점
          [
            [1, 2, 3, 4, 5],
            [2, 3, 4, 5, 6],
          ].find((item) => {
            return (
              JSON.stringify(item) ===
              JSON.stringify(diceValues.map((item) => item.diceVal).sort())
            );
          })
            ? (newItems[index].guess = 40)
            : (newItems[index].guess = 0);
        } else if (item.title === "Chance") {
          // 주사위 5개의 눈의 총합
          newItems[index].guess = diceValues.reduce(
            (acc, current) => acc + current.diceVal,
            0
          );
        } else if (item.title === "Yahtzee") {
          // 주사위 5개의 눈이 모두 같을 때, 고정 50점
          diceValues.every(
            (element) => element.diceVal === diceValues[0].diceVal
          )
            ? (newItems[index].guess = 50)
            : (newItems[index].guess = 0);
        }
      });
      return newItems;
    });
  }, [diceValues]);

  return (
    <div className={clsx("my-5", "md:w-[500px]", "w-full", "border")}>
      {/* table header */}
      <div
        className={clsx(
          "flex",
          "w-full",
          "text-center",
          "font-semibold",
          "border-b",
          "p-2"
        )}
      >
        <div className={clsx("w-2/5")}>Title</div>
        <div className={clsx("w-3/5")}>It's you</div>
      </div>

      {/* table contents */}
      {tableRows.map((item, index) => (
        <div
          key={item.title}
          className={clsx("flex", "w-full", "text-center", "border-b", "p-2")}
        >
          <div className={clsx("w-2/5")}>
            <Tooltip tooltip={item.tooltip}>{item.title}</Tooltip>
          </div>
          {/* 스코어 */}
          {item.title !== "Bonus" ? (
            <div className={clsx("w-3/5")}>
              {item.score !== null ? (
                <div className={clsx()}>{item.score}</div>
              ) : (
                <div
                  className={clsx("text-gray-300", "cursor-pointer")}
                  onClick={() => {
                    if (item.guess === 0) {
                      confirm("0점으로 기록 됩니다. 괜찮으신가요?")
                        ? updateTableRows(item, index)
                        : null;
                    } else {
                      updateTableRows(item, index);
                    }
                  }}
                >
                  {item.guess}
                </div>
              )}
            </div>
          ) : (
            // Bonus
            <div className={clsx("w-3/5")}>
              {item.score !== null
                ? item.score
                : "(-" + (63 - item.guess) + ")"}
            </div>
          )}
        </div>
      ))}

      {/* table score */}
      <div
        className={clsx(
          "flex",
          "w-full",
          "text-center",
          "font-semibold",
          "p-2"
        )}
      >
        <div className={clsx("w-2/5")}>Score</div>
        <div className={clsx("w-3/5")}>{score}</div>
      </div>
    </div>
  );
}
