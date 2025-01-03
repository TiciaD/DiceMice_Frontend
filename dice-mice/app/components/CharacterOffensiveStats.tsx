"use client"

import React, { useState } from 'react'

export interface OffenseStats {
  label: string;
  hasDieRoll?: boolean;
  value: string;
}

interface CharacterOffenseStatsProps {
  offenseStats: OffenseStats[];
  onOffenseStatsChange: (newOffenseStats: OffenseStats[]) => void;
}

const CharacterOffensiveStats = ({ offenseStats, onOffenseStatsChange }: CharacterOffenseStatsProps) => {
  // const [localOffenseStats, setLocalOffenseStats] = useState<OffenseStats[]>(
  //     offenseStats.length > 0
  //       ? offenseStats
  //       : [
  //         { label: "Initiative", value: 0 },
  //         { label: "CON", isCountyAssociatedStat: false, value: 0 },
  //         { label: "DEX", isCountyAssociatedStat: false, value: 0 },
  //         { label: "INT", isCountyAssociatedStat: false, value: 0 },
  //         { label: "WIS", isCountyAssociatedStat: false, value: 0 },
  //         { label: "CHA", isCountyAssociatedStat: false, value: 0 },
  //       ]
  //   );

  return (
    <div className='flex max-w-sm gap-1'>
      CharacterOffensiveStats
    </div>
  )
}

export default CharacterOffensiveStats