
'use client';

import clsx from "clsx"
import Dice from "./dice";
import { useState } from "react";

export default function Intro() {
  const [diceValues, setDiceValues] = useState([
    { "diceVal": 1, "rerollDice": true },
    { "diceVal": 3, "rerollDice": true },
    { "diceVal": 4, "rerollDice": true },
    { "diceVal": 5, "rerollDice": true },
    { "diceVal": 6, "rerollDice": true },
  ])

  function Roll() {
    setDiceValues((prevItems) => {
      const newItems = [...prevItems];
      for (let i = 0; i < newItems.length; i++) {
        if (newItems[i].rerollDice === true) {
          newItems[i].diceVal = Math.floor(Math.random() * 6) + 1;
          newItems[i].rerollDice = true;
        }
      }
      return newItems;
    });
  }

  return (
    <div>
      <div className={clsx('gird', 'gap-4', 'flex', 'text-center', 'md:text-lg', 'text-xs')}>
        {
          diceValues.map((item, index) =>
            <Dice
              key={index}
              number={item.diceVal}
              rerollDice={item.rerollDice}
              index={index}
              setDiceValues={setDiceValues}
            />
          )
        }
      </div>

      <div
        className={clsx('p-5', 'text-center', 'bg-sky-500', 'text-white', 'my-5', 'rounded-lg', 'cursor-pointer')}
        style={{ boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px' }}
        onClick={Roll}
      >
        Roll again
      </div>
    </div >
  )
}