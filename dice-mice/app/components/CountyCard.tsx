"use client"

import Link from 'next/link';
import React from 'react'

interface CountyCardProps {
  title: string;
  description: string;
  associatedStatText: string;
  associatedSkillsText: string;
  houses: string[];
}

const CountyCard = (props: CountyCardProps) => {
  return (
    <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow my-4">
      <div className="px-4 py-5 sm:px-6">
        {/* Content goes here */}
        {/* We use less vertical padding on card headers on desktop than on body sections */}
        {props.title}
      </div>
      <div className="px-4 py-5 sm:p-6">{/* Content goes here */} {props.description}</div>
      <div className="px-4 py-4 sm:px-6">
        {/* Content goes here */}
        {/* We use less vertical padding on card footers at all sizes than on headers or body sections */}
        <Link href="/">More Houses</Link>
      </div>
    </div>
  )
}

export default CountyCard