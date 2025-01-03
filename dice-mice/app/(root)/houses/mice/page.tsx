"use client"

import Dropdown, { Option } from '@/app/components/Dropdown';
import { useDice } from '@/context/DiceContext';
import React from 'react'

const Page = () => {
  const { rollDice } = useDice()
  const options = [
    { id: "1", label: "Option 1" },
    { id: "2", label: "Option 2" },
    { id: "3", label: "Option 3" },
  ];

  const handleSelection = (selectedOption: Option) => {
    console.log("Selected option:", selectedOption);
  };

  const handleRoll = () => {
    rollDice("2d20")
  }

  return (
    <div className='flex flex-col'>
      <div className='inline-flex'>
        <Dropdown
          label="County"
          placeholder='Choose an option'
          options={options}
          defaultSelectedOption={options[0]}
          onChange={handleSelection}
        />
        <Dropdown
          label="House"
          placeholder='Choose an option'
          options={options}
          defaultSelectedOption={options[0]}
          onChange={handleSelection}
        />
        <Dropdown
          label="Class"
          placeholder='Choose an option'
          options={options}
          defaultSelectedOption={options[0]}
          onChange={handleSelection}
        />
        <button
          onClick={handleRoll}
          type="button"
          className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Roll Dice
        </button>
      </div>
    </div>
  )
}

export default Page