"use client"

import React, { createContext, useContext, useEffect, useRef } from 'react'

export interface DiceRollData {
  dieType: string;
  value: number;
}
interface DiceRollResult {
  results: DiceRollData[],
  total: number
}

interface DiceContextType {
  rollDice: (notation: string) => Promise<DiceRollResult>
  clearDice: () => void
}

const DiceContext = createContext<DiceContextType | undefined>(undefined)

export const DiceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const diceBoxInstance = useRef<any>(null)
  const diceboxConfig = {
    id: "dice-canvas",
    assetPath: '/assets/', // Ensure the correct asset path
    startingHeight: 8,
    throwForce: 6,
    spinForce: 5,
    lightIntensity: 0.9
  }

  useEffect(() => {
    import('@3d-dice/dice-box').then((DiceBoxModule) => {
      const DiceBox = DiceBoxModule.default
      diceBoxInstance.current = new DiceBox('#dice-box', diceboxConfig)

      diceBoxInstance.current.init().then(() => {
        console.log("DiceBox initialized!")
      })

      return () => {
        diceBoxInstance.current?.destroy() // Clean up
      }
    })
  }, [])

  const rollDice = async (notation: string): Promise<DiceRollResult> => {
    if (!diceBoxInstance.current) {
      console.error("DiceBox is not initialized")
      throw new Error("DiceBox is not initialized");
    }

    const result = await diceBoxInstance.current.roll(notation);

    // Wait for the roll to complete, then attach click listener
    const handleClick = () => {
      clearDice();
      document.removeEventListener("click", handleClick); // Cleanup
    };
    document.addEventListener("click", handleClick);

    const dieRollResults: DiceRollData[] = []
    console.log("result", result)
    const total = result?.total ?? result?.reduce((sum: number, roll: any) => {
      const data = {
        dieType: roll.dieType,
        value: roll.value
      }
      dieRollResults.push(data)

      return sum + roll.value
    }, 0);

    if (total === undefined) {
      throw new Error("Invalid roll result structure");
    }

    const finalResults: DiceRollResult = {
      results: dieRollResults,
      total: total
    }
    return finalResults;
  }

  const clearDice = () => {
    if (diceBoxInstance.current) {
      diceBoxInstance.current.clear(); // Clears dice from the screen
    }
  }

  return (
    <DiceContext.Provider value={{ rollDice, clearDice }}>
      {/* Invisible DiceBox container */}
      <div id="dice-box" />
      {children}
    </DiceContext.Provider>
  )
}

export const useDice = (): DiceContextType => {
  const context = useContext(DiceContext)
  if (!context) {
    throw new Error("useDice must be used within a DiceProvider")
  }
  return context
}
