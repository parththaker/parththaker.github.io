import type { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Board games · Parth K. Thaker',
  description:
    'The board games I play: my Board Game Arena record since 2020, Terra Mystica most of all, and the people at the table.',
  alternates: { canonical: '/hobbies' },
}

const BGA_PROFILE = 'https://boardgamearena.com/player?id=85701539'
const FIRE_TWO_VIDEO = 'https://www.youtube.com/watch?v=vNj7M6bjSeA'

// Ranked games and victories on Board Game Arena, every game with ten or more ranked plays.
const RECORD_READ = '9 Nov 2026'
const RECORD: [string, number, number][] = [
  ['Terra Mystica', 408, 185],
  ['7 Wonders', 60, 15],
  ['Gaia Project', 50, 15],
  ['Age of Innovation', 46, 16],
  ['Ark Nova', 30, 6],
  ['Splendor', 24, 10],
  ['Puerto Rico', 20, 7],
  ['Teotihuacan', 19, 9],
  ['Kingdomino', 17, 9],
  ['7 Wonders Duel', 12, 4],
]

type Photo = { src: string; width: number; height: number; alt: string; caption: string }

const LAB: Photo = {
  src: '/gaming-memories/TM_Lab.jpg',
  width: 1280,
  height: 960,
  alt: 'Three people at a grey lab table around a Terra Mystica board; one gives a thumbs-up.',
  caption: 'Terra Mystica · the lab at ASU · my advisor and two labmates',
}

const COWS: Photo = {
  src: '/gaming-memories/unlucky_hand_GWT.jpg',
  width: 900,
  height: 1600,
  alt: 'A hand fanning four Jersey cow cards, each worth 1, over a Great Western Trail board.',
  caption: 'Great Western Trail · four value-1 Jersey cows',
}

const TABLE: Photo[] = [
  {
    src: '/gaming-memories/Brass_SD_25.jpg',
    width: 1280,
    height: 960,
    alt: 'Three people on a patterned carpet around a Brass: Birmingham board, a television behind them.',
    caption: 'Brass: Birmingham · San Diego · friends from ASU',
  },
  {
    src: '/gaming-memories/Puerto_Rico_Bang_2.jpg',
    width: 1280,
    height: 964,
    alt: 'Two players at a wooden café table with Puerto Rico, other occupied tables behind them.',
    caption: 'Puerto Rico · a board-game café in Bangalore · friends from IIT Madras',
  },
  {
    src: '/gaming-memories/GWT_Aniket_ASU.jpg',
    width: 1280,
    height: 960,
    alt: 'One person at a grey table with a Great Western Trail board in a dim office.',
    caption: 'Great Western Trail · ASU · Aniket',
  },
  {
    src: '/gaming-memories/Splendor_Mumbai.jpg',
    width: 1280,
    height: 960,
    alt: 'A woman on a wooden floor at a low table with Splendor cards.',
    caption: 'Splendor · Mumbai · my wife',
  },
]

export default function BoardGamesPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-14">
      <header>
        <h1 className="text-4xl font-bold tracking-tight">Board games</h1>
        <p className="mt-3 font-mono text-[11px] tracking-[0.04em] text-muted-foreground">
          <a
            href={BGA_PROFILE}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground/80 underline-offset-4 hover:underline"
          >
            r_ikiri
          </a>{' '}
          on Board Game Arena · since March 2020 · 930 games
        </p>
      </header>

      <section className="prose mt-8">
        <p>My father taught me chess when I was eight or nine. I left it early and never went back.</p>
        <p>
          At IIT Madras a close friend brought Die Siedler von Catan to the dorm, and we queued to play the
          four-player game. In graduate school I built a position around the 6s and 8s and watched seven 5s
          come up in a row. I stopped playing Catan.
        </p>
        <p>
          Terra Mystica has no dice and no card luck, and each faction plays by its own rules. I learned it
          from faction guides and recorded tournament games.
        </p>
      </section>

      <Figure photo={LAB} className="mt-10" ratio="aspect-[4/3]" sizes="(min-width: 768px) 720px, 100vw" priority />

      <Section title="Board Game Arena">
        <div className="prose">
          <p>
            Most of my games are online. Terra Mystica is close to half of them. Lately it is mostly Age of
            Innovation and Ark Nova.
          </p>
        </div>

        <table className="tabular mt-6 w-full max-w-md border-collapse font-mono text-sm">
          <thead>
            <tr className="text-left text-[11px] tracking-[0.04em] text-muted-foreground">
              <th scope="col" className="pb-2 font-normal">
                game
              </th>
              <th scope="col" className="pb-2 text-right font-normal">
                ranked games
              </th>
              <th scope="col" className="pb-2 text-right font-normal">
                victories
              </th>
            </tr>
          </thead>
          <tbody>
            {RECORD.map(([game, played, won]) => (
              <tr key={game} className="border-t border-border">
                <td className="py-2 pr-4">{game}</td>
                <td className="py-2 text-right">{played}</td>
                <td className="py-2 pl-6 text-right">{won}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-3 font-mono text-[11px] leading-relaxed tracking-[0.04em] text-muted-foreground">
          games with ten or more ranked plays · training games not counted · read {RECORD_READ}
          <br />
          <a
            href={BGA_PROFILE}
            target="_blank"
            rel="noopener noreferrer"
            className="whitespace-nowrap text-foreground/80 underline-offset-4 hover:underline"
          >
            Profile on Board Game Arena
          </a>
        </p>
      </Section>

      <Section title="Terra Mystica">
        <div className="prose">
          <p>
            In November 2020 I played the round of 24 of the Fire Two Open Season 2, a live Terra Mystica
            tournament streamed on Twitch. My group match, against ChristopherHo, jesseg and firexed, is{' '}
            <a href={FIRE_TWO_VIDEO} target="_blank" rel="noopener noreferrer">
              on YouTube
            </a>{' '}
            with commentary. In Gaia Project, its successor, I usually play the Geodens.
          </p>
        </div>
      </Section>

      <Section title="At the table">
        <div className="grid gap-6 sm:grid-cols-[1fr_11rem]">
          <div className="prose">
            <p>
              My advisor, Prof. Gautam Dasarathy, played Terra Mystica with the lab and enjoyed it. Aniket, a
              PhD colleague, learned Great Western Trail from me; in that game I once held a hand of four
              value-1 Jersey cows. In one Teotihuacan game I scored 163 points. My wife&rsquo;s games are
              Splendor and Viticulture. After a long day we play Ghost Stories at home, which is cooperative.
            </p>
          </div>
          <Figure photo={COWS} className="mx-auto w-48 sm:w-auto" ratio="aspect-[3/4]" sizes="176px" position="object-[50%_40%]" />
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {TABLE.map((photo) => (
            <Figure key={photo.src} photo={photo} ratio="aspect-[4/3]" sizes="(min-width: 640px) 350px, 100vw" />
          ))}
        </div>
      </Section>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rule mt-12 pt-7">
      <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground">{title}</h2>
      {children}
    </section>
  )
}

function Figure({
  photo,
  ratio,
  sizes,
  className = '',
  position = 'object-center',
  priority = false,
}: {
  photo: Photo
  ratio: string
  sizes: string
  className?: string
  position?: string
  priority?: boolean
}) {
  return (
    <figure className={className}>
      <a href={photo.src} target="_blank" rel="noopener noreferrer" className="block">
        <div className={`relative ${ratio} overflow-hidden border border-border bg-muted`}>
          <Image src={photo.src} alt={photo.alt} fill sizes={sizes} priority={priority} className={`object-cover ${position}`} />
        </div>
      </a>
      <figcaption className="mt-2 font-mono text-[11px] leading-snug tracking-[0.04em] text-muted-foreground">
        {photo.caption}
      </figcaption>
    </figure>
  )
}
