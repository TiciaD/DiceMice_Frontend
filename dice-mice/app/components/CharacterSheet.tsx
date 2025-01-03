"use client"

import React, { useState } from 'react'
import { Tabs } from 'flowbite-react'

import CharacterBaseStats, { BaseStats } from './CharacterBaseStats'
import CharacterOffensiveStats from './CharacterOffensiveStats'

interface CharacterFormData {
  baseStats: { label: string; value: number, isCountyAssociatedStat: boolean }[];
  offensiveStats: any; // Replace `any` with the actual type
  defensiveStats: any; // Replace `any` with the actual type
  skills: any; // Replace `any` with the actual type
}

const CharacterSheet = () => {
  const [formData, setFormData] = useState<CharacterFormData>({
    baseStats: [],
    offensiveStats: {},
    defensiveStats: {},
    skills: {},
  });

  const handleBaseStatsChange = (newBaseStats: BaseStats[]) => {
    setFormData((prev) => ({
      ...prev,
      baseStats: newBaseStats,
    }));
  };

  return (
    <div>
      <Tabs aria-label="Default tabs" variant="pills">
        <Tabs.Item active title="Base Stats">
          <CharacterBaseStats
            baseStats={formData.baseStats}
            onBaseStatsChange={handleBaseStatsChange} />
        </Tabs.Item>
        <Tabs.Item title="Offensive Stats">
          <CharacterOffensiveStats />
        </Tabs.Item>
        <Tabs.Item title="Defensive Stats">
          <p>Defensive Stats</p>
          {/* <CharacterDefensiveStats /> */}
        </Tabs.Item>
        <Tabs.Item title="Skills">
          <p>Skills</p>
          {/* <CharacterSkills /> */}
        </Tabs.Item>
      </Tabs>
    </div>
  )
}

export default CharacterSheet