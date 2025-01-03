"use client"

import { DiceRollData, useDice } from '@/context/DiceContext'
import { Button, Modal, TextInput } from 'flowbite-react'
import React, { useState } from 'react'

export interface BaseStats {
  label: string;
  isCountyAssociatedStat: boolean;
  value: number;
}

interface CharacterBaseStatsProps {
  baseStats: BaseStats[];
  onBaseStatsChange: (newBaseStats: BaseStats[]) => void;
}

const CharacterBaseStats = ({ baseStats, onBaseStatsChange }: CharacterBaseStatsProps) => {
  const { rollDice, clearDice } = useDice();
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [currentRollTotal, setCurrentRollTotal] = useState(0);
  const [localBaseStats, setLocalBaseStats] = useState<BaseStats[]>(
    baseStats.length > 0
      ? baseStats
      : [
        { label: "STR", isCountyAssociatedStat: true, value: 0 },
        { label: "CON", isCountyAssociatedStat: false, value: 0 },
        { label: "DEX", isCountyAssociatedStat: false, value: 0 },
        { label: "INT", isCountyAssociatedStat: false, value: 0 },
        { label: "WIS", isCountyAssociatedStat: false, value: 0 },
        { label: "CHA", isCountyAssociatedStat: false, value: 0 },
      ]
  );

  const handleValueChange = (index: number, value: number) => {
    const updatedStats = localBaseStats.map((stat, i) =>
      i === index ? { ...stat, value } : stat
    );
    setLocalBaseStats(updatedStats);
    onBaseStatsChange(updatedStats);
  };

  const handleRoll = async (index: number, isCountyAssociatedStat: boolean) => {
    // Make sure board is clear first
    clearDice()
    setLoading(true);
    try {
      const notation = isCountyAssociatedStat ? '4d6' : '3d6'
      const rollResult = await rollDice(notation)

      if (!rollResult.results || rollResult.results.length === 0) {
        console.error("Dice roll results are empty or undefined");
        return;
      }

      const validResults = rollResult.results.filter(
        (result) => typeof result.value === "number"
      );

      if (validResults.length === 0) {
        console.error("No valid dice results to process");
        return;
      }

      console.log("rollResult", rollResult)
      const updatedStats = localBaseStats.map((stat, i) => {
        if (i === index) {
          if (stat.isCountyAssociatedStat) {
            const tempArray: DiceRollData[] = []
            rollResult.results.forEach((res) => {
              tempArray.push(res)
            })
            console.log("temp array", tempArray)

            // Sort results by value (ascending)
            const sortedResults = tempArray.sort((a, b) => a.value - b.value)
            console.log("sorted res", sortedResults)
            // Remove the lowest value
            const filteredResults = sortedResults.slice(1);
            console.log("filtered res", filteredResults)

            // Recalculate total
            const newTotal = filteredResults.reduce((sum, die) => sum + die.value, 0);
            console.log("new total", newTotal)
            setCurrentRollTotal(newTotal)
            setOpenModal(true)

            return { ...stat, value: newTotal }
          } else {
            setCurrentRollTotal(rollResult.total)
            setOpenModal(true)
            return { ...stat, value: rollResult.total }
          }
        } else {
          return stat
        }
      });
      console.log("updated Stats", updatedStats)
      setLocalBaseStats(updatedStats);
      onBaseStatsChange(updatedStats);
    } catch (error) {
      console.error("Failed to roll dice:", error)
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='flex flex-col gap-2'>
      {
        localBaseStats.map((baseStat, index) => {
          return (
            <div className='flex max-w-sm gap-1' key={index}>
              <Button className='w-16' color="light" disabled={loading} onClick={() => handleRoll(index, baseStat.isCountyAssociatedStat)}>{baseStat.label}</Button>
              <div className='max-w-16'>
                <TextInput id="strength" type="number" sizing="md" value={baseStat.value ?? 0} max={20} onChange={(e) => handleValueChange(index, parseInt(e.target.value, 10) || 0)} />
              </div>
              <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
                <Modal.Header />
                <Modal.Body>
                  <div className="text-center">
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                      You rolled: {currentRollTotal}
                    </h3>
                    <div className="flex justify-center gap-4">
                      <Button color="success" onClick={() => setOpenModal(false)}>
                        {"Confirm"}
                      </Button>
                    </div>
                  </div>
                </Modal.Body>
              </Modal>
            </div>
          )
        })
      }

    </div>
  )
}

export default CharacterBaseStats