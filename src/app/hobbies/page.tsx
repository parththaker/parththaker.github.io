import Link from 'next/link'
import CursorTracker from '@/components/CursorTracker'
import NetworkBackground from '@/components/NetworkBackground'
import GameShelf from '@/components/GameShelf'
import GamingJourney from '@/components/GamingJourney'
import GamingMemories from '@/components/GamingMemories'
import FunFact from '@/components/FunFact'

export default function HobbiesPage() {
  return (
    <div className="min-h-screen relative bg-gradient-to-br from-slate-50 via-green-50 to-emerald-50">
      <CursorTracker />
      <NetworkBackground />
      
      <nav className="relative z-50 border-b border-slate-200/50 bg-white/80 backdrop-blur-md sticky top-0">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold gradient-text">
              Parth K. Thaker
            </Link>
            <div className="flex gap-8">
              <Link href="/papers" className="relative group">
                <span className="text-slate-700 hover:text-blue-600 transition-colors duration-300 font-medium">
                  Papers
                </span>
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 group-hover:w-full transition-all duration-300"></div>
              </Link>
              <Link href="/blogs" className="relative group">
                <span className="text-slate-700 hover:text-orange-600 transition-colors duration-300 font-medium">
                  Blog
                </span>
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-red-500 group-hover:w-full transition-all duration-300"></div>
              </Link>
              <Link href="/hobbies" className="relative group">
                <span className="text-green-600 font-medium">
                  Hobbies
                </span>
                <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-green-500 to-emerald-500"></div>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-16">
          {/* Header Section */}
          <div className="text-center mb-20">
            <h1 className="text-6xl lg:text-8xl font-bold mb-8">
              <span className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Strategic
              </span>
              <br />
              <span className="bg-gradient-to-r from-teal-600 via-emerald-600 to-green-600 bg-clip-text text-transparent">
                Board Games
              </span>
            </h1>
            <p className="text-xl text-slate-700 max-w-4xl mx-auto mb-8 leading-relaxed">
              Welcome to my digital game table! What started as chess lessons with my dad evolved into a passion for 
              strategic Euro games. Every game is a story, every victory hard-earned, and every defeat a lesson learned. 
              Come explore the worlds that have captured my imagination for over a decade.
            </p>

            {/* BGA Profile Link */}
            <div className="mb-12">
              <a 
                href="https://boardgamearena.com/player?id=85701539" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-2xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <span className="text-2xl">🎲</span>
                <div className="text-left">
                  <div className="font-bold text-lg">View My Board Game Arena Profile</div>
                  <div className="text-sm opacity-90">All stats verified and updated live!</div>
                </div>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
            
            {/* Epic Stats Display */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-green-200/80 to-emerald-200/80 backdrop-blur-sm border border-green-300/50 rounded-2xl p-6">
                <div className="text-4xl font-bold text-green-800 mb-2">794</div>
                <div className="text-slate-700 font-medium">Epic Battles Fought</div>
                <div className="text-sm text-slate-600 mt-1">Each one a masterclass in strategy</div>
              </div>
              <div className="bg-gradient-to-br from-emerald-200/80 to-teal-200/80 backdrop-blur-sm border border-emerald-300/50 rounded-2xl p-6">
                <div className="text-4xl font-bold text-emerald-800 mb-2">11k+</div>
                <div className="text-slate-700 font-medium">Mastery Points Earned</div>
                <div className="text-sm text-slate-600 mt-1">Recognition for strategic excellence</div>
              </div>
              <div className="bg-gradient-to-br from-teal-200/80 to-cyan-200/80 backdrop-blur-sm border border-teal-300/50 rounded-2xl p-6">
                <div className="text-4xl font-bold text-teal-800 mb-2">133</div>
                <div className="text-slate-700 font-medium">Legendary Achievements</div>
                <div className="text-sm text-slate-600 mt-1">Milestones in gaming excellence</div>
              </div>
            </div>
          </div>

          {/* Gaming Chronicles Gallery */}
          <GamingMemories />

          {/* Fun Fact Section */}
          <FunFact />

          {/* Game Shelf Component */}
          <GameShelf />

          {/* Gaming Journey Timeline */}
          <GamingJourney />

          {/* Call to Action */}
          <div className="text-center py-20">
            <div className="bg-gradient-to-br from-green-200/80 to-emerald-200/80 backdrop-blur-sm border border-green-300/50 rounded-3xl p-12 max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold text-green-800 mb-6">Ready for Battle?</h2>
              <p className="text-xl text-slate-700 mb-8 leading-relaxed">
                Always looking for worthy opponents in Terra Mystica or Gaia Project! Whether you&apos;re a seasoned strategist 
                or curious newcomer, I&apos;m always up for a game that&apos;ll make us both think three moves ahead.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <div className="flex items-center space-x-3 text-green-700">
                  <span className="text-2xl">🎲</span>
                  <span className="font-medium">Find me on Board Game Arena</span>
                </div>
                <div className="text-slate-600">•</div>
                <div className="flex items-center space-x-3 text-green-700">
                  <span className="text-2xl">⚡</span>
                  <span className="font-medium">Always have active games running</span>
                </div>
              </div>
              <div className="mt-8">
                <p className="text-lg text-slate-600 italic">
                  &ldquo;A game is worth a thousand words... and a thousand strategic decisions.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}