'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'

interface GameMemory {
  image: string
  title: string
  caption: string
  location: string
  game: string
  emoji: string
  funFact?: string
}

export default function GamingMemories() {
  const [selectedMemory, setSelectedMemory] = useState<GameMemory | null>(null)
  const [hoveredMemory, setHoveredMemory] = useState<string | null>(null)

  const memories: GameMemory[] = [
    {
      image: "/gaming-memories/Brass_SD_25.jpg",
      title: "Brass Bros in San Diego",
      caption: "Playing Brass with my ASU buddies in San Diego",
      location: "San Diego, CA",
      game: "Brass: Birmingham",
      emoji: "🏭",
      funFact: "First time anyone actually understood the canal system without crying"
    },
    {
      image: "/gaming-memories/Puerto_Rico_Bang_2.jpg",
      title: "Bangalore Board Game Expedition",
      caption: "Checking out the board gaming scene in Bangalore. Getting some old IIT Madras mates into Puerto Rico!",
      location: "Bangalore, India",
      game: "Puerto Rico",
      emoji: "🏝️",
      funFact: "Convinced engineering minds that shipping corn is actually fun"
    },
    {
      image: "/gaming-memories/GWT_Aniket_ASU.jpg",
      title: "PhD Colleague Conversion",
      caption: "Getting my PhD colleague Aniket into Great Western Trail!",
      location: "Arizona State University",
      game: "Great Western Trail",
      emoji: "🐄",
      funFact: "Academic researchers make surprisingly good cattle barons"
    },
    {
      image: "/gaming-memories/unlucky_hand_GWT.jpg",
      title: "The Cow Catastrophe",
      caption: "Full hand of level 1 cows!! Really!! How unlucky can one get!",
      location: "Somewhere in despair",
      game: "Great Western Trail",
      emoji: "😭",
      funFact: "Proof that even cow games can break your heart"
    },
    {
      image: "/gaming-memories/pipeline_ASU.jpg",
      title: "Pipeline Experiment",
      caption: "Exploring 'Pipelines' board game... didn't get much into it",
      location: "Arizona State University", 
      game: "Pipeline",
      emoji: "🔧",
      funFact: "Sometimes even oil can't fuel the passion"
    },
    {
      image: "/gaming-memories/TM_Lab.jpg",
      title: "Lab Mates Meet Terra Mystica",
      caption: "Trying to bring my graduate labmates into the Terra Mystica fold. My Professor enjoyed it! 😄",
      location: "Research Lab",
      game: "Terra Mystica",
      emoji: "🧙‍♂️",
      funFact: "When your professor beats you at your favorite game... awkward Monday meetings"
    },
    {
      image: "/gaming-memories/Catan_end.jpg",
      title: "Nostalgic Catan Return",
      caption: "Revitalizing my Catan bones!",
      location: "Memory Lane",
      game: "Catan",
      emoji: "🌾",
      funFact: "Going back to your gateway drug... for science"
    },
    {
      image: "/gaming-memories/Brass_SF.jpg",
      title: "San Francisco Brass Baptism",
      caption: "My first game of Brass: Birmingham. Why you take away them canals!",
      location: "San Francisco, CA",
      game: "Brass: Birmingham",
      emoji: "⚡",
      funFact: "The moment I learned that progress means destroying your own infrastructure"
    },
    {
      image: "/gaming-memories/Splendor_Mumbai.jpg",
      title: "Mumbai Gem Rush",
      caption: "My wife pushing to play her favorite game - Splendor!",
      location: "Mumbai, India",
      game: "Splendor",
      emoji: "💎",
      funFact: "Happy wife, happy gaming life"
    },
    {
      image: "/gaming-memories/ghost_stories.jpg",
      title: "Ghostly Decompression",
      caption: "Rewinding a hectic day with some light-hearted Ghost Stories!",
      location: "Home Sweet Home",
      game: "Ghost Stories",
      emoji: "👻",
      funFact: "Nothing says relaxation like battling supernatural entities"
    }
  ]

  useEffect(() => {
    if (!selectedMemory) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedMemory(null)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [selectedMemory])

  return (
    <div className="py-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
          Gaming <span className="text-gradient">Chronicles</span>
        </h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          A photographic journey through epic battles, tragic defeats, and the friends who made it all worthwhile. 
          Each photo tells a story of strategy, laughter, and the occasional existential crisis over cow cards.
        </p>
      </div>

      {/* Masonry-style photo grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {memories.map((memory, index) => (
          <div
            key={index}
            role="button"
            tabIndex={0}
            aria-label={`View memory: ${memory.title}`}
            className={`
              relative group cursor-pointer transition-all duration-500 ease-out
              ${hoveredMemory === memory.image ? 'transform scale-105 z-20' : ''}
              ${hoveredMemory && hoveredMemory !== memory.image ? 'transform scale-95 opacity-70' : ''}
            `}
            style={{
              marginTop: index % 3 === 1 ? '2rem' : index % 3 === 2 ? '4rem' : '0'
            }}
            onMouseEnter={() => setHoveredMemory(memory.image)}
            onMouseLeave={() => setHoveredMemory(null)}
            onClick={() => setSelectedMemory(memory)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                if (e.key === ' ') e.preventDefault()
                setSelectedMemory(memory)
              }
            }}
          >
            {/* Photo container */}
            <div className="relative bg-slate-800 rounded-2xl overflow-hidden shadow-2xl border border-white/10 group-hover:border-white/20 transition-all duration-500">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={memory.image}
                  alt={memory.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                
                {/* Game emoji badge */}
                <div className="absolute top-4 right-4 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-2xl border border-white/30">
                  {memory.emoji}
                </div>
              </div>

              {/* Content overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-xl font-bold text-white mb-2">{memory.title}</h3>
                <p className="text-slate-200 text-sm line-clamp-2 mb-2">{memory.caption}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-300 bg-white/10 px-2 py-1 rounded-full">{memory.game}</span>
                  <span className="text-xs text-slate-400">{memory.location}</span>
                </div>
              </div>

              {/* Hover effect */}
              {hoveredMemory === memory.image && (
                <div className="absolute inset-0 bg-white/5 rounded-2xl pointer-events-none"></div>
              )}

              {/* Click indicator */}
              <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">👁️</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Memory detail modal */}
      {selectedMemory && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedMemory(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={selectedMemory.title}
            className="bg-slate-900 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal header with image */}
            <div className="relative">
              <div className="relative aspect-[16/10] overflow-hidden rounded-t-3xl">
                <Image
                  src={selectedMemory.image}
                  alt={selectedMemory.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                
                {/* Close button */}
                <button
                  type="button"
                  aria-label="Close"
                  onClick={() => setSelectedMemory(null)}
                  className="absolute top-6 right-6 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center transition-colors text-white text-xl font-bold backdrop-blur-sm"
                >
                  <span aria-hidden="true">×</span>
                </button>

                {/* Title overlay */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <span className="text-4xl">{selectedMemory.emoji}</span>
                    <div>
                      <h2 className="text-3xl font-bold text-white">{selectedMemory.title}</h2>
                      <p className="text-slate-200">{selectedMemory.game} • {selectedMemory.location}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal content */}
            <div className="p-8">
              <blockquote className="text-xl text-slate-300 leading-relaxed italic mb-6 border-l-4 border-purple-400 pl-6">
                "{selectedMemory.caption}"
              </blockquote>

              {selectedMemory.funFact && (
                <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-purple-400/30 rounded-2xl p-6">
                  <div className="flex items-start space-x-3">
                    <span className="text-2xl">💡</span>
                    <div>
                      <h4 className="text-lg font-bold text-white mb-2">Fun Fact</h4>
                      <p className="text-slate-300">{selectedMemory.funFact}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}