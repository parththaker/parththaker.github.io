'use client'
import { useState } from 'react'

interface GameData {
  name: string
  games: number
  victories: number
  winRate: number
  mastery: 'Novice' | 'Experienced' | 'Expert' | 'Grandmaster'
  category: string
  description: string
  whyAddictive: string
  personalStory: string
  visualTheme: {
    primary: string
    secondary: string
    accent: string
    darkPrimary: string
  }
  gameElements: {
    icon: string
    pieces: string[]
    boardStyle: string
  }
}

const boardGames: GameData[] = [
  {
    name: "Terra Mystica",
    games: 378,
    victories: 176,
    winRate: 80,
    mastery: "Grandmaster",
    category: "My Absolute Favorite",
    description: "The game that changed everything. My all-time favorite across all editions - base, Fire & Ice, fan factions, and even the latest Age of Innovation. Pure strategic perfection where every decision matters.",
    whyAddictive: "No luck, no randomness, just pure skill. After Catan's dice betrayed me one too many times, Terra Mystica showed me what strategic gaming could be. 14 asymmetric factions, infinite replay value, and that perfect moment when your engine clicks into place.",
    personalStory: "Made it to the semifinals of a Terra Mystica championship (there's even a YouTube video!). This game taught me to think 15 moves ahead and showed me that mastering something complex is more rewarding than any lucky dice roll. My labmates and even my professor got hooked when I introduced them to it.",
    visualTheme: {
      primary: "from-emerald-500 to-green-600",
      secondary: "from-emerald-400 to-green-500",
      accent: "emerald-300",
      darkPrimary: "from-emerald-700 to-green-800"
    },
    gameElements: {
      icon: "🏛️",
      pieces: ["🏠", "🏭", "🏰", "⚡"],
      boardStyle: "hexagonal mystical landscape"
    }
  },
  {
    name: "Gaia Project",
    games: 27,
    victories: 11,
    winRate: 57,
    mastery: "Experienced",
    category: "Terra Mystica in Space",
    description: "Love Terra Mystica? Meet its space-age cousin! More balanced than the original with different mechanics but the same strategic depth. A perfect evolution of the formula I adore.",
    whyAddictive: "All the strategic depth of Terra Mystica but with better balance and more interesting decisions. The tech tracks add layers of complexity, and the modular board keeps every game fresh. It's like Terra Mystica 2.0.",
    personalStory: "When I introduced this to my PhD colleagues, they immediately saw why I'm obsessed with these types of games. The Geodens became my signature race - nothing beats the satisfaction of perfect planet placement while others struggle with basic terraforming.",
    visualTheme: {
      primary: "from-purple-500 to-indigo-600",
      secondary: "from-purple-400 to-indigo-500",
      accent: "purple-300",
      darkPrimary: "from-purple-700 to-indigo-800"
    },
    gameElements: {
      icon: "🚀",
      pieces: ["🌍", "🛸", "⚙️", "🔬"],
      boardStyle: "modular space sectors"
    }
  },
  {
    name: "Teotihuacan",
    games: 19,
    victories: 9,
    winRate: 59,
    mastery: "Expert",
    category: "Ancient Civilization & Worker Placement",
    description: "Build the legendary City of Gods! Manage worker dice as they age and gain power, constructing pyramids, advancing on temple tracks, and creating one of history's greatest civilizations.",
    whyAddictive: "The dice aging mechanism is pure genius. Your workers get stronger but more expensive to use, creating incredible tension. Do you cycle them early or push for maximum power? Every decision matters.",
    personalStory: "My highest scoring game (163 points) came from a perfect pyramid timing combo. Five rounds of setup culminated in a single turn where I built three pyramid levels and unlocked four temple bonuses.",
    visualTheme: {
      primary: "from-orange-500 to-red-600",
      secondary: "from-orange-400 to-red-500",
      accent: "orange-300",
      darkPrimary: "from-orange-700 to-red-800"
    },
    gameElements: {
      icon: "🏺",
      pieces: ["🎲", "🗿", "☀️", "🌽"],
      boardStyle: "ancient Mesoamerican city"
    }
  },
  {
    name: "7 Wonders",
    games: 60,
    victories: 15,
    winRate: 52,
    mastery: "Experienced",
    category: "Ancient Civilizations & Drafting",
    description: "Lead one of the seven great cities of the ancient world. Draft cards to build your civilization, gather resources, advance military might, and construct architectural marvels that will stand the test of time.",
    whyAddictive: "The simultaneous play keeps everyone engaged, and the card drafting creates delicious decisions. Each wonder offers a completely different strategy, and reading your neighbors' plans is half the battle.",
    personalStory: "The Pyramids of Giza became my fortress strategy. While others fought over resources, I'd quietly build my wonder and science cards, emerging with surprise victories from impossible positions.",
    visualTheme: {
      primary: "from-yellow-500 to-amber-600",
      secondary: "from-yellow-400 to-amber-500",
      accent: "yellow-300",
      darkPrimary: "from-yellow-700 to-amber-800"
    },
    gameElements: {
      icon: "🏛️",
      pieces: ["🏗️", "⚔️", "📜", "💎"],
      boardStyle: "ancient world map"
    }
  },
  {
    name: "Puerto Rico",
    games: 17,
    victories: 7,
    winRate: 50,
    mastery: "Expert",
    category: "Colonial Economy & Role Selection",
    description: "Establish a thriving colony in the Caribbean! Plant crops, build processing facilities, and ship goods back to Europe while managing colonists and competing for the most profitable plantation empire.",
    whyAddictive: "The role selection mechanism is masterful. Choosing a role benefits everyone, but you get the bonus. Timing when to trigger shipping versus building creates intense psychological gameplay.",
    personalStory: "I learned the hard way that Mayor timing is everything. One misplaced colonist phase cost me a 15-point victory, but taught me to count population capacity like a chess grandmaster counts pieces.",
    visualTheme: {
      primary: "from-teal-500 to-cyan-600",
      secondary: "from-teal-400 to-cyan-500",
      accent: "teal-300",
      darkPrimary: "from-teal-700 to-cyan-800"
    },
    gameElements: {
      icon: "🏝️",
      pieces: ["🌾", "🚢", "🏭", "👥"],
      boardStyle: "colonial Caribbean island"
    }
  },
  {
    name: "Viticulture",
    games: 8,
    victories: 4,
    winRate: 36,
    mastery: "Experienced",
    category: "My Wife's Favorite",
    description: "Inherit a rustic vineyard in Tuscany and transform it into a thriving winery. This beautiful pastoral strategy game won over my wife completely - now she's always pushing for 'just one more game' of Splendor and Viticulture!",
    whyAddictive: "The theme is incredibly immersive and accessible. Even non-gamers immediately understand the wine-making process, and the seasonal structure feels natural. It's strategic enough for enthusiasts but welcoming enough for newcomers.",
    personalStory: "This became our couples game of choice. My wife loves the wine theme and the satisfying progression from planting grapes to selling aged wines. Happy wife, happy gaming life - and honestly, watching her beat me at my own hobby is both humbling and adorable.",
    visualTheme: {
      primary: "from-red-500 to-rose-600",
      secondary: "from-red-400 to-rose-500",
      accent: "red-300",
      darkPrimary: "from-red-700 to-rose-800"
    },
    gameElements: {
      icon: "🍷",
      pieces: ["🍇", "🏠", "🛠️", "📋"],
      boardStyle: "Tuscan vineyard landscape"
    }
  },
  {
    name: "Brass: Birmingham",
    games: 15,
    victories: 6,
    winRate: 40,
    mastery: "Experienced",
    category: "Currently Obsessing Over",
    description: "The Industrial Revolution in board game form! Build canals and railways, establish markets, and navigate the transition from the canal era to the rail era. Why do you take away my beautiful canals?!",
    whyAddictive: "The two-era system is brilliant - just when you've perfected your canal network, the game forces you to adapt to railways. The market dynamics and beer brewing mechanics create incredible tension and tough decisions every turn.",
    personalStory: "Currently deep in the learning phase and loving every brutal defeat. My first game in San Francisco was a disaster, but I'm starting to appreciate the depth. There's something poetic about building infrastructure only to watch it become obsolete.",
    visualTheme: {
      primary: "from-amber-600 to-orange-700",
      secondary: "from-amber-500 to-orange-600",
      accent: "amber-400",
      darkPrimary: "from-amber-800 to-orange-900"
    },
    gameElements: {
      icon: "🏭",
      pieces: ["🚂", "🛤️", "🍺", "⚙️"],
      boardStyle: "Industrial Revolution England"
    }
  }
]

export default function GameGallery() {
  const [selectedGame, setSelectedGame] = useState<GameData | null>(null)
  const [hoveredGame, setHoveredGame] = useState<string | null>(null)

  const getMasteryBadge = (mastery: string) => {
    const badges = {
      'Novice': { color: 'bg-gray-500', icon: '🌱' },
      'Experienced': { color: 'bg-blue-500', icon: '⚡' },
      'Expert': { color: 'bg-purple-500', icon: '👑' },
      'Grandmaster': { color: 'bg-yellow-500', icon: '🏆' }
    }
    return badges[mastery as keyof typeof badges] || badges['Novice']
  }

  return (
    <div className="space-y-16">
      {/* Introduction */}
      <div className="text-center">
        <h2 className="text-4xl font-bold text-white mb-6">The Collection</h2>
        <p className="text-xl text-slate-300 max-w-3xl mx-auto">
          Each game represents hundreds of hours of strategic thinking, memorable victories, and lessons learned from defeats. 
          Click any game to dive deeper into what makes it special.
        </p>
      </div>

      {/* Games Grid - Staggered Layout */}
      <div className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {boardGames.map((game, index) => (
            <div
              key={game.name}
              className={`
                relative group cursor-pointer transition-all duration-500 ease-out
                ${hoveredGame === game.name ? 'transform -translate-y-4 scale-105 z-20' : ''}
                ${hoveredGame && hoveredGame !== game.name ? 'transform translate-y-2 opacity-50' : ''}
              `}
              style={{
                animationDelay: `${index * 150}ms`,
                marginTop: index % 2 === 1 ? '2rem' : '0'
              }}
              onMouseEnter={() => setHoveredGame(game.name)}
              onMouseLeave={() => setHoveredGame(null)}
              onClick={() => setSelectedGame(game)}
            >
              {/* Game Card */}
              <div className={`
                relative bg-gradient-to-br ${game.visualTheme.darkPrimary} 
                rounded-2xl border border-white/10 overflow-hidden
                shadow-2xl group-hover:shadow-3xl group-hover:border-white/20
                transition-all duration-500
              `}>
                {/* Game Visual Header */}
                <div className={`
                  relative h-48 bg-gradient-to-br ${game.visualTheme.primary}
                  flex items-center justify-center overflow-hidden
                `}>
                  {/* Animated Background Pattern */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.3),transparent_70%)]"></div>
                    <div className="absolute inset-0 bg-[conic-gradient(from_45deg,transparent_0deg,rgba(255,255,255,0.1)_60deg,transparent_120deg)]"></div>
                  </div>
                  
                  {/* Game Pieces Floating */}
                  <div className="relative z-10 flex items-center justify-center space-x-4">
                    <span className="text-6xl animate-bounce" style={{ animationDelay: '0ms' }}>
                      {game.gameElements.icon}
                    </span>
                    {game.gameElements.pieces.map((piece, i) => (
                      <span 
                        key={i}
                        className="text-2xl animate-pulse"
                        style={{ 
                          animationDelay: `${i * 200 + 500}ms`,
                          animationDuration: '2s'
                        }}
                      >
                        {piece}
                      </span>
                    ))}
                  </div>

                  {/* Mastery Badge */}
                  <div className="absolute top-4 right-4">
                    <div className={`
                      ${getMasteryBadge(game.mastery).color} 
                      rounded-full px-3 py-1 flex items-center space-x-2 shadow-lg
                    `}>
                      <span>{getMasteryBadge(game.mastery).icon}</span>
                      <span className="text-white text-sm font-bold">{game.mastery}</span>
                    </div>
                  </div>

                  {/* Win Rate Circle */}
                  <div className="absolute bottom-4 left-4">
                    <div className="relative w-16 h-16">
                      <svg className="transform -rotate-90 w-16 h-16">
                        <circle
                          cx="32"
                          cy="32"
                          r="28"
                          stroke="rgba(255,255,255,0.2)"
                          strokeWidth="4"
                          fill="transparent"
                        />
                        <circle
                          cx="32"
                          cy="32"
                          r="28"
                          stroke="white"
                          strokeWidth="4"
                          fill="transparent"
                          strokeDasharray={`${2 * Math.PI * 28}`}
                          strokeDashoffset={`${2 * Math.PI * 28 * (1 - game.winRate / 100)}`}
                          className="transition-all duration-1000 ease-out"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-white font-bold text-sm">{game.winRate}%</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Game Info */}
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">{game.name}</h3>
                    <p className={`text-${game.visualTheme.accent} font-medium text-sm`}>
                      {game.category}
                    </p>
                  </div>

                  <p className="text-slate-300 leading-relaxed line-clamp-3">
                    {game.description}
                  </p>

                  {/* Quick Stats */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <div className="text-center">
                      <div className="text-xl font-bold text-white">{game.games}</div>
                      <div className="text-xs text-slate-400">Games</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-green-400">{game.victories}</div>
                      <div className="text-xs text-slate-400">Wins</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-slate-300 font-medium">
                        Click to explore →
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hover Glow Effect */}
                {hoveredGame === game.name && (
                  <div className="absolute inset-0 bg-white/5 rounded-2xl pointer-events-none"></div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Game Detail Modal */}
      {selectedGame && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-white/10">
            {/* Modal Header */}
            <div className={`
              relative bg-gradient-to-br ${selectedGame.visualTheme.primary} 
              p-8 rounded-t-3xl
            `}>
              <button
                onClick={() => setSelectedGame(null)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors text-white text-xl font-bold"
              >
                ×
              </button>

              <div className="flex items-start space-x-6">
                <div className="text-8xl">{selectedGame.gameElements.icon}</div>
                <div className="flex-1">
                  <h2 className="text-4xl font-bold text-white mb-2">{selectedGame.name}</h2>
                  <p className="text-xl text-white/90 mb-4">{selectedGame.category}</p>
                  <div className="flex items-center space-x-4">
                    <div className={`
                      ${getMasteryBadge(selectedGame.mastery).color} 
                      rounded-full px-4 py-2 flex items-center space-x-2
                    `}>
                      <span>{getMasteryBadge(selectedGame.mastery).icon}</span>
                      <span className="text-white font-bold">{selectedGame.mastery}</span>
                    </div>
                    <div className="text-white/90">
                      {selectedGame.games} battles • {selectedGame.winRate}% victory rate
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-8 space-y-8">
              {/* Game Description */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">The World</h3>
                <p className="text-slate-300 text-lg leading-relaxed">
                  {selectedGame.description}
                </p>
              </div>

              {/* Why It's Addictive */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">Why It's Irresistible</h3>
                <p className="text-slate-300 text-lg leading-relaxed">
                  {selectedGame.whyAddictive}
                </p>
              </div>

              {/* Personal Story */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">My Journey</h3>
                <p className="text-slate-300 text-lg leading-relaxed italic">
                  "{selectedGame.personalStory}"
                </p>
              </div>

              {/* Detailed Stats */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Battle Statistics</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center p-6 bg-slate-800/50 rounded-xl border border-white/10">
                    <div className="text-3xl font-bold text-white mb-2">{selectedGame.games}</div>
                    <div className="text-slate-400">Total Battles</div>
                  </div>
                  <div className="text-center p-6 bg-slate-800/50 rounded-xl border border-white/10">
                    <div className="text-3xl font-bold text-green-400 mb-2">{selectedGame.victories}</div>
                    <div className="text-slate-400">Victories</div>
                  </div>
                  <div className="text-center p-6 bg-slate-800/50 rounded-xl border border-white/10">
                    <div className="text-3xl font-bold text-red-400 mb-2">{selectedGame.games - selectedGame.victories}</div>
                    <div className="text-slate-400">Defeats</div>
                  </div>
                  <div className="text-center p-6 bg-slate-800/50 rounded-xl border border-white/10">
                    <div className="text-3xl font-bold text-purple-400 mb-2">{selectedGame.winRate}%</div>
                    <div className="text-slate-400">Win Rate</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}