'use client'
import { useState, useEffect } from 'react'

export default function FunFact() {
  const [currentFact, setCurrentFact] = useState(0)

  const funFacts = [
    {
      icon: "🏆",
      title: "Championship Prowess",
      fact: "Made it to the semifinals of a Terra Mystica championship",
      detail: "There's even a YouTube video of my performance!",
      color: "from-yellow-400 to-amber-500",
      bgColor: "from-yellow-200/80 to-amber-200/80",
      borderColor: "border-yellow-300/50"
    },
    {
      icon: "👨‍🏫",
      title: "Professor's Approval",
      fact: "Successfully converted my PhD advisor into a Terra Mystica player",
      detail: "Academic minds appreciate good game design!",
      color: "from-blue-400 to-indigo-500",
      bgColor: "from-blue-200/80 to-indigo-200/80",
      borderColor: "border-blue-300/50"
    },
    {
      icon: "💔",
      title: "The Great Catan Betrayal",
      fact: "Abandoned Catan after 7 consecutive rolls of 5s instead of my 6s and 8s",
      detail: "Some wounds never heal. RNG is not strategy!",
      color: "from-red-400 to-rose-500",
      bgColor: "from-red-200/80 to-rose-200/80",
      borderColor: "border-red-300/50"
    },
    {
      icon: "🐄",
      title: "Unluckiest Hand Ever",
      fact: "Drew an entire hand of level 1 cows in Great Western Trail",
      detail: "The mathematical probability was astronomically low!",
      color: "from-green-400 to-emerald-500",
      bgColor: "from-green-200/80 to-emerald-200/80",
      borderColor: "border-green-300/50"
    },
    {
      icon: "💍",
      title: "Happy Wife, Happy Gaming",
      fact: "Wife's favorite games: Splendor and Viticulture",
      detail: "She's got excellent taste in strategic wine-making!",
      color: "from-pink-400 to-rose-500",
      bgColor: "from-pink-200/80 to-rose-200/80",
      borderColor: "border-pink-300/50"
    },
    {
      icon: "🌍",
      title: "Global Gaming",
      fact: "Played board games across 3 continents",
      detail: "From Bangalore to San Diego to San Francisco!",
      color: "from-purple-400 to-violet-500",
      bgColor: "from-purple-200/80 to-violet-200/80",
      borderColor: "border-purple-300/50"
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFact((prev) => (prev + 1) % funFacts.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [funFacts.length])

  return (
    <div className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-slate-800 mb-4">
          Did You <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">Know?</span>
        </h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Some quirky facts and memorable moments from my board gaming journey
        </p>
      </div>

      {/* Rotating Fun Facts */}
      <div className="relative max-w-4xl mx-auto">
        <div className="relative h-48 overflow-hidden">
          {funFacts.map((fact, index) => (
            <div
              key={index}
              className={`
                absolute inset-0 transition-all duration-1000 ease-in-out
                ${currentFact === index ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'}
              `}
            >
              <div className={`
                bg-gradient-to-br ${fact.bgColor} backdrop-blur-sm 
                border ${fact.borderColor} rounded-3xl p-8 shadow-xl
                text-center relative overflow-hidden
              `}>
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`,
                    backgroundSize: '40px 40px'
                  }}></div>
                </div>

                <div className="relative z-10">
                  <div className="text-6xl mb-4">{fact.icon}</div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-4">{fact.title}</h3>
                  <p className="text-xl text-slate-700 mb-3 font-medium">{fact.fact}</p>
                  <p className="text-slate-600 italic">{fact.detail}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Progress indicators */}
        <div className="flex justify-center mt-8 space-x-3">
          {funFacts.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentFact(index)}
              className={`
                w-3 h-3 rounded-full transition-all duration-300
                ${currentFact === index 
                  ? 'bg-orange-500 scale-125' 
                  : 'bg-orange-200 hover:bg-orange-300'}
              `}
            />
          ))}
        </div>
      </div>

      {/* Quick Stats Row */}
      <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
        <div className="text-center p-6 bg-gradient-to-br from-amber-100/80 to-orange-100/80 rounded-2xl border border-amber-200/50">
          <div className="text-3xl mb-2">🎲</div>
          <div className="text-2xl font-bold text-amber-800">15+</div>
          <div className="text-sm text-slate-600">Different Games Mastered</div>
        </div>
        <div className="text-center p-6 bg-gradient-to-br from-green-100/80 to-emerald-100/80 rounded-2xl border border-green-200/50">
          <div className="text-3xl mb-2">👥</div>
          <div className="text-2xl font-bold text-green-800">50+</div>
          <div className="text-sm text-slate-600">Friends Converted</div>
        </div>
        <div className="text-center p-6 bg-gradient-to-br from-blue-100/80 to-indigo-100/80 rounded-2xl border border-blue-200/50">
          <div className="text-3xl mb-2">⏱️</div>
          <div className="text-2xl font-bold text-blue-800">5+</div>
          <div className="text-sm text-slate-600">Games Always Running</div>
        </div>
        <div className="text-center p-6 bg-gradient-to-br from-purple-100/80 to-violet-100/80 rounded-2xl border border-purple-200/50">
          <div className="text-3xl mb-2">🏛️</div>
          <div className="text-2xl font-bold text-purple-800">80%</div>
          <div className="text-sm text-slate-600">Terra Mystica Win Rate</div>
        </div>
      </div>
    </div>
  )
}