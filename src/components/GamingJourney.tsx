'use client'
import { useState } from 'react'

export default function GamingJourney() {
  const [expandedStep, setExpandedStep] = useState<number | null>(null)

  const journeySteps = [
    {
      age: "Age 8-9",
      title: "The Chess Apprentice",
      icon: "♟️",
      description: "Dad's patient chess lessons ignited a lifelong love for strategic thinking",
      fullStory: "My dad would spend hours teaching me chess, finding creative ways to show the power of each piece. A knight's L-shaped dance, a bishop's diagonal dominance, a queen's royal authority - each piece had personality and purpose. While I didn't pursue chess mastery, those early lessons planted something deeper: the fascination with worlds on a board, complete with their own rules and possibilities. Little did I know this was the beginning of a strategic gaming journey that would span decades.",
      color: "from-amber-500 to-yellow-500",
      bgColor: "from-amber-500/20 to-yellow-500/20",
      borderColor: "border-amber-400/30"
    },
    {
      age: "Undergrad",
      title: "The Catan Awakening",
      icon: "🌾",
      description: "Die Siedler von Catan became the gateway drug to modern board gaming",
      fullStory: "A close friend brought 'Die Siedler von Catan' to our dorm, and suddenly our entire friend group was hooked. We'd form queues to play this 4-player masterpiece, waiting hours for our turn at the table. The thrill of rolling dice, the satisfaction of building settlements, the art of negotiation - Catan showed me that games could be social experiences that brought people together. Those late-night trading sessions and heated disputes over who blocked whom were pure magic.",
      color: "from-orange-500 to-red-500",
      bgColor: "from-orange-500/20 to-red-500/20",
      borderColor: "border-orange-400/30"
    },
    {
      age: "Graduate School",
      title: "The Luck Rebellion",
      icon: "🎲",
      description: "Frustration with Catan's randomness led to a quest for pure strategy",
      fullStory: "The honeymoon with Catan ended abruptly. After building the perfect strategy around 6s and 8s, watching the dice mock me with seven consecutive 5s was the last straw. Why should random chance undermine hours of careful planning? This frustration sparked a quest for games where skill, not luck, determined victory. I needed games that rewarded strategic thinking, not dice worship. The search for 'true' strategy games had begun.",
      color: "from-red-500 to-pink-500",
      bgColor: "from-red-500/20 to-pink-500/20",
      borderColor: "border-red-400/30"
    },
    {
      age: "Graduate School",
      title: "The Terra Mystica Revelation",
      icon: "🏛️",
      description: "Discovering Terra Mystica changed everything - this was strategic perfection",
      fullStory: "Then came Terra Mystica, and everything clicked. No dice. No cards. Pure strategy. Every decision mattered, every resource counted, every move rippled through future possibilities. The asymmetric factions meant each game felt completely different, yet every outcome was earned through skill. I dove deep, studying faction guides, analyzing optimal plays, watching tournament videos. This wasn't just a game - it was a strategic sandbox that rewarded mastery.",
      color: "from-emerald-500 to-green-500",
      bgColor: "from-emerald-500/20 to-green-500/20",
      borderColor: "border-emerald-400/30"
    },
    {
      age: "Present",
      title: "The Strategic Evangelist",
      icon: "👑",
      description: "Now I'm the one introducing friends to the magic of strategic board gaming",
      fullStory: "The student became the teacher. Now I'm constantly introducing friends to the wonderful world of strategic Euro games. From Terra Mystica championships (yes, I made it to the semis!) to late-night Brass: Birmingham sessions, every game is an opportunity to share the joy of strategic thinking. My wife loves Viticulture, my PhD colleagues got hooked on Gaia Project, and I always have multiple games running on Board Game Arena. The journey continues, one perfectly planned turn at a time.",
      color: "from-purple-500 to-indigo-500",
      bgColor: "from-purple-500/20 to-indigo-500/20",
      borderColor: "border-purple-400/30"
    }
  ]

  return (
    <div className="py-20">
      <div className="text-center mb-16">
        <h2 className="text-5xl font-bold text-slate-800 mb-6">
          The Strategic <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">Evolution</span>
        </h2>
        <p className="text-xl text-slate-700 max-w-3xl mx-auto">
          From chess lessons with Dad to Terra Mystica mastery - a journey through the worlds that shaped my strategic thinking
        </p>
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-amber-500 via-orange-500 to-red-500 rounded-full hidden md:block"></div>
        
        <div className="space-y-12">
          {journeySteps.map((step, index) => (
            <div 
              key={index}
              className="relative flex items-start gap-8 group"
            >
              {/* Timeline node */}
              <div className="relative z-10 hidden md:block">
                <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${step.color} border-4 border-white shadow-xl flex items-center justify-center text-2xl`}>
                  {step.icon}
                </div>
              </div>

              {/* Content card */}
              <div 
                className={`flex-1 cursor-pointer transition-all duration-500 ${
                  expandedStep === index ? 'transform scale-105' : 'hover:transform hover:scale-102'
                }`}
                onClick={() => setExpandedStep(expandedStep === index ? null : index)}
              >
                <div className={`
                  relative bg-gradient-to-br ${step.bgColor} backdrop-blur-sm 
                  border ${step.borderColor} rounded-2xl p-8 shadow-xl
                  hover:shadow-2xl transition-all duration-500
                `}>
                  {/* Mobile icon */}
                  <div className="md:hidden text-4xl mb-4">{step.icon}</div>
                  
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="text-sm font-medium text-slate-600 mb-2">{step.age}</div>
                      <h3 className="text-2xl font-bold text-slate-800 mb-2">{step.title}</h3>
                    </div>
                    <div className="text-slate-600 text-sm">
                      {expandedStep === index ? '← Click to collapse' : 'Click to expand →'}
                    </div>
                  </div>
                  
                  <p className="text-slate-700 text-lg leading-relaxed mb-4">
                    {step.description}
                  </p>

                  {/* Expanded content */}
                  {expandedStep === index && (
                    <div className="mt-6 pt-6 border-t border-slate-300/50">
                      <p className="text-slate-700 text-lg leading-relaxed italic">
                        {step.fullStory}
                      </p>
                    </div>
                  )}

                  {/* Hover glow effect */}
                  <div className="absolute inset-0 bg-white/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fun fact callout */}
      <div className="mt-16 text-center">
        <div className="inline-flex items-center space-x-4 bg-gradient-to-r from-amber-200/80 to-orange-200/80 backdrop-blur-sm border border-amber-300/50 rounded-2xl px-8 py-4">
          <span className="text-3xl">🏆</span>
          <div className="text-left">
            <div className="text-slate-800 font-bold">Fun Fact</div>
            <div className="text-slate-700 text-sm">Made it to the semifinals in a Terra Mystica championship!</div>
          </div>
          <a 
            href="https://www.youtube.com/watch?v=vNj7M6bjSeA&t=1s" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-amber-700 hover:text-amber-600 transition-colors font-medium"
          >
            Watch the match →
          </a>
        </div>
      </div>
    </div>
  )
}