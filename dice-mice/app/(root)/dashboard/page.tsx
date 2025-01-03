"use client"

import CharacterSheet from '@/app/components/CharacterSheet'
import { Button } from 'flowbite-react'
import React from 'react'

const Page = () => {
  return (
    <div className="py-10">
      <header>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          {/* Your content */}
          <Button color="blue">+ Create New Mouse</Button>

          <CharacterSheet />
        </div>
      </main>
    </div>
  )
}

export default Page