"use client"

const Page = () => {

  return (
    <div className="bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">Welcome to Squeakshire County</h2>
        <p className="mt-8 text-pretty text-lg font-medium text-gray-700 sm:text-xl/8">
          For each region you gain the following benefits:
        </p>
        <p className='my-3 text-pretty text-lg font-medium text-gray-700 sm:text-xl/8'>
          Associated Stat: Roll 4d6 and keep the best 3 dice for that stat during character creation instead of just 3d6.
        </p>
        <p>
          Associated Skill: Once an Adventure you can reroll a single listed D20 roll.
        </p>
      </div>
    </div>
  )
}

export default Page