'use client'
import { useState } from 'react'

interface GameData {
  name: string
  rating: number
  games: number
  victories: number
  winRate: number
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'
  category: string
  description: string
  spine_color: string
  text_color: string
  bgg_id: number
}

const boardGames: GameData[] = [
  {
    name: "Terra Mystica",
    rating: 438,
    games: 378,
    victories: 176,
    winRate: 80,
    difficulty: "Expert",
    category: "My Absolute Favorite",
    description: "The game that changed everything. My all-time favorite across all editions - base, Fire & Ice, fan factions, and even the latest Age of Innovation. Made it to the semifinals of a championship!",
    spine_color: "from-emerald-600 to-green-700",
    text_color: "text-emerald-100",
    bgg_id: 120677
  },
  {
    name: "Gaia Project",
    rating: 244,
    games: 27,
    victories: 11,
    winRate: 57,
    difficulty: "Expert",
    category: "Space Exploration",
    description: "The spiritual successor to Terra Mystica, set in space where players control alien species terraforming planets.",
    spine_color: "from-purple-600 to-indigo-700",
    text_color: "text-purple-100",
    bgg_id: 220308
  },
  {
    name: "Age of Innovation",
    rating: 238,
    games: 33,
    victories: 11,
    winRate: 41,
    difficulty: "Expert",
    category: "Innovation",
    description: "A Terra Mystica game focusing on technological advancement and innovation in a fantasy setting.",
    spine_color: "from-blue-600 to-cyan-700",
    text_color: "text-blue-100",
    bgg_id: 383179
  },
  {
    name: "7 Wonders",
    rating: 202,
    games: 60,
    victories: 15,
    winRate: 52,
    difficulty: "Intermediate",
    category: "Civilization",
    description: "Build one of the seven great cities of the ancient world and gather resources, develop commercial routes and affirm your military supremacy.",
    spine_color: "from-yellow-600 to-amber-700",
    text_color: "text-yellow-100",
    bgg_id: 68448
  },
  {
    name: "Kingdomino",
    rating: 197,
    games: 17,
    victories: 9,
    winRate: 71,
    difficulty: "Beginner",
    category: "Tile Placement",
    description: "A domino-based kingdom building game where players create their realm by connecting landscapes.",
    spine_color: "from-green-500 to-emerald-600",
    text_color: "text-green-100",
    bgg_id: 204583
  },
  {
    name: "Teotihuacan",
    rating: 176,
    games: 19,
    victories: 9,
    winRate: 59,
    difficulty: "Advanced",
    category: "Worker Placement",
    description: "Manage a team of worker dice in the ancient Mexican city, contributing to its construction and glory.",
    spine_color: "from-orange-600 to-red-700",
    text_color: "text-orange-100",
    bgg_id: 229853
  },
  {
    name: "Puerto Rico",
    rating: 162,
    games: 17,
    victories: 7,
    winRate: 50,
    difficulty: "Advanced",
    category: "Role Selection",
    description: "Classic game of plantation management and shipping goods in colonial Puerto Rico.",
    spine_color: "from-teal-600 to-cyan-700",
    text_color: "text-teal-100",
    bgg_id: 3076
  },
  {
    name: "Viticulture",
    rating: 141,
    games: 8,
    victories: 4,
    winRate: 36,
    difficulty: "Intermediate",
    category: "My Wife's Favorite",
    description: "My wife's absolute favorite! This beautiful wine-making game won her over completely. Happy wife, happy gaming life!",
    spine_color: "from-red-600 to-rose-700",
    text_color: "text-red-100",
    bgg_id: 183394
  },
  {
    name: "7 Wonders Duel",
    rating: 115,
    games: 12,
    victories: 4,
    winRate: 36,
    difficulty: "Intermediate",
    category: "Civilization",
    description: "Two-player version of 7 Wonders with direct confrontation and multiple victory conditions.",
    spine_color: "from-amber-600 to-yellow-700",
    text_color: "text-amber-100",
    bgg_id: 173346
  },
  {
    name: "Splendor",
    rating: 100,
    games: 23,
    victories: 10,
    winRate: 31,
    difficulty: "Beginner",
    category: "Engine Building",
    description: "Collect gems to purchase cards that provide permanent gem bonuses and prestige points.",
    spine_color: "from-pink-600 to-rose-700",
    text_color: "text-pink-100",
    bgg_id: 148228
  },
  {
    name: "Brass: Birmingham",
    rating: 50,
    games: 15,
    victories: 6,
    winRate: 40,
    difficulty: "Expert",
    category: "Currently Obsessing Over",
    description: "The Industrial Revolution in board game form! Why do you take away my beautiful canals?!",
    spine_color: "from-amber-600 to-orange-700",
    text_color: "text-amber-100",
    bgg_id: 224517
  }
]

export default function GameShelf() {
  const [selectedGame, setSelectedGame] = useState<GameData | null>(null)
  const [hoveredGame, setHoveredGame] = useState<string | null>(null)

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-500'
      case 'Intermediate': return 'bg-yellow-500'
      case 'Advanced': return 'bg-orange-500'
      case 'Expert': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const getWinRateColor = (winRate: number) => {
    if (winRate >= 70) return 'text-green-600 bg-green-50'
    if (winRate >= 50) return 'text-yellow-600 bg-yellow-50'
    return 'text-red-600 bg-red-50'
  }

  return (
    <div className="space-y-8">
      {/* Shelf Header */}
      <div className="text-center">
        <h2 className="text-5xl font-bold text-slate-800 mb-6">
          The <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">Collection</span>
        </h2>
        <p className="text-xl text-slate-700 max-w-3xl mx-auto">
          Each spine represents countless hours of strategic thinking, memorable victories, and lessons learned from defeats. 
          Click any game to dive deeper into what makes it special.
        </p>
      </div>

      {/* Game Shelf - Bookshelf Style */}
      <div className="relative">
        {/* Shelf Background */}
        <div className="bg-gradient-to-b from-amber-100 to-amber-200 rounded-lg p-6 shadow-lg border-2 border-amber-300">
          {/* Wood grain effect */}
          <div className="absolute inset-0 opacity-20 bg-[linear-gradient(90deg,transparent_0%,rgba(0,0,0,0.1)_50%,transparent_100%)] bg-[length:4px_100%] rounded-lg"></div>
          
          {/* Game Spines */}
          <div className="relative flex items-end justify-center gap-1 min-h-[300px]">
            {boardGames.map((game, index) => (
              <div
                key={game.name}
                className={`
                  relative cursor-pointer transition-all duration-300 ease-out
                  ${hoveredGame === game.name ? 'transform -translate-y-4 shadow-2xl scale-105 z-20' : 'shadow-lg'}
                  ${hoveredGame && hoveredGame !== game.name ? 'transform translate-y-1 opacity-70' : ''}
                `}
                style={{
                  height: `${200 + (game.rating / 10)}px`,
                  width: '45px',
                  animationDelay: `${index * 100}ms`
                }}
                onMouseEnter={() => setHoveredGame(game.name)}
                onMouseLeave={() => setHoveredGame(null)}
                onClick={(e) => {
                  e.preventDefault()
                  if (e.shiftKey || e.ctrlKey || e.metaKey) {
                    // Open BGG link if modifier key is held
                    window.open(`https://boardgamegeek.com/boardgame/${game.bgg_id}`, '_blank')
                  } else {
                    // Open game details modal
                    setSelectedGame(game)
                  }
                }}
              >
                {/* Game Spine */}
                <div className={`
                  h-full w-full rounded-t-sm bg-gradient-to-b ${game.spine_color}
                  border-l-2 border-r border-t border-amber-900/20
                  flex flex-col justify-between p-2 relative overflow-hidden
                `}>
                  {/* Spine Text */}
                  <div className="flex-1 flex items-center justify-center">
                    <div className="transform -rotate-90 whitespace-nowrap">
                      <div className={`font-bold text-xs ${game.text_color} tracking-wider`}>
                        {game.name.toUpperCase()}
                      </div>
                    </div>
                  </div>
                  
                  {/* Rating Badge */}
                  <div className="absolute top-2 left-0 right-0 flex justify-center">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full px-2 py-1">
                      <span className={`text-xs font-bold ${game.text_color}`}>
                        {game.rating}
                      </span>
                    </div>
                  </div>

                  {/* Win Rate Indicator */}
                  <div className="absolute bottom-2 left-0 right-0 flex justify-center">
                    <div className={`w-6 h-6 rounded-full border-2 border-white/50 flex items-center justify-center
                      ${game.winRate >= 70 ? 'bg-green-400' : 
                        game.winRate >= 50 ? 'bg-yellow-400' : 'bg-red-400'}`}>
                      <span className="text-xs font-bold text-white">
                        {Math.round(game.winRate)}
                      </span>
                    </div>
                  </div>

                  {/* Hover glow effect */}
                  {hoveredGame === game.name && (
                    <div className="absolute inset-0 bg-white/10 rounded-t-sm"></div>
                  )}
                </div>

                {/* Hover Tooltip */}
                {hoveredGame === game.name && (
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-30">
                    <div className="bg-slate-800 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap shadow-xl">
                      <div className="font-semibold">{game.name}</div>
                      <div className="text-slate-300 text-xs">
                        {game.games} games • {game.winRate}% wins
                      </div>
                      <div className="text-slate-400 text-xs mt-1">
                        Click for details • Cmd+Click for BGG
                      </div>
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-800"></div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Shelf Base */}
        <div className="h-4 bg-gradient-to-b from-amber-200 to-amber-300 border-t border-amber-400 shadow-md"></div>
      </div>

      {/* Game Details Modal */}
      {selectedGame && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className={`bg-gradient-to-r ${selectedGame.spine_color} p-6 rounded-t-2xl ${selectedGame.text_color}`}>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-3xl font-bold mb-2">{selectedGame.name}</h3>
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(selectedGame.difficulty)} text-white`}>
                      {selectedGame.difficulty}
                    </span>
                    <span className="text-sm opacity-90">{selectedGame.category}</span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedGame(null)}
                  className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                >
                  <span className="text-white text-lg">×</span>
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <p className="text-slate-700 leading-relaxed">{selectedGame.description}</p>

              {/* BGG Link */}
              <div className="text-center">
                <a
                  href={`https://boardgamegeek.com/boardgame/${selectedGame.bgg_id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  <span>View on BoardGameGeek</span>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-slate-50 rounded-lg">
                  <div className="text-2xl font-bold text-slate-800">{selectedGame.rating}</div>
                  <div className="text-sm text-slate-600">BGA Rating</div>
                </div>
                <div className="text-center p-4 bg-slate-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{selectedGame.games}</div>
                  <div className="text-sm text-slate-600">Games Played</div>
                </div>
                <div className="text-center p-4 bg-slate-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{selectedGame.victories}</div>
                  <div className="text-sm text-slate-600">Victories</div>
                </div>
                <div className="text-center p-4 bg-slate-50 rounded-lg">
                  <div className={`text-2xl font-bold inline-flex items-center px-2 py-1 rounded ${getWinRateColor(selectedGame.winRate)}`}>
                    {selectedGame.winRate}%
                  </div>
                  <div className="text-sm text-slate-600 mt-1">Win Rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}