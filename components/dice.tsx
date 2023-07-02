import clsx from "clsx";
import { ReactNode } from "react";

interface IDiceprops {
  number: number;
  rerollDice?: boolean;
  index?: number;
  setDiceValues?: (state: { diceVal: number; rerollDice: boolean }[]) => void;
}

interface IDiceContainerprops {
  className: Array<string | boolean> | string;
  children: ReactNode;
}

export default function Dice({ number, rerollDice, index, setDiceValues }: IDiceprops) {
  const updateDice = () => {
    if (setDiceValues && index != undefined) {
      setDiceValues((prevItems) => {
        const newItems = [...prevItems];
        newItems[index] = { diceVal: newItems[index].diceVal, rerollDice: !newItems[index].rerollDice };
        return newItems;
      });
    }
  }

  const DiceContainer = ({ className, children }: IDiceContainerprops) => {
    return (
      <div
        className={
          clsx(
            'md:h-24', 'h-14', 'md:w-24', 'w-14', 'border', 'border-black', 'select-none',
            'rounded-lg', 'flex', 'justify-center', 'items-center', 'hover:-translate-y-2', 'duration-75',
            !rerollDice && 'border-blue-300 border-2 -translate-y-2', 'cursor-pointer', className
          )
        }
        style={{ boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px' }}
        onClick={updateDice}
      >
        {children}
      </div>
    )
  };

  // 1, 2, 3, 4, 6
  if ([1, 2, 3, 4, 6].includes(number)) {
    return (
      <DiceContainer
        className={[
          'grid',
          [2, 4, 6].includes(number) && 'grid-cols-2 ',
          [1, 3].includes(number) && 'grid-flow-col',
          'gap-1',
        ]}
      >
        {
          Array(number).fill(
            <span>
              ●
            </span>
          )
        }
      </DiceContainer>
    )
  }

  // 5
  else {
    return (
      <DiceContainer className={'flex-col'}>
        <div
          className={clsx('grid', 'grid-cols-2', 'gap-1', 'w-full')}
        >
          <div> ● </div>
          <div> ● </div>
        </div>
        <div
          className={clsx('grid', 'grid-cols-1', 'w-full')}
        >
          <div> ● </div>
        </div>
        <div
          className={clsx('grid', 'grid-cols-2', 'gap-1', 'w-full')}
        >
          <div> ● </div>
          <div> ● </div>
        </div>
      </DiceContainer>
    )
  }
}