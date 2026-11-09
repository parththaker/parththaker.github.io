import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'How this map is made · Parth K. Thaker',
  description: 'The rules behind the map of work: a ledger of what I have read and written, five layers, widths from counts, spans where fields share entries.',
}

export default function MethodPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 pt-10 pb-20 font-serif text-[17px] leading-relaxed">
      <h1 className="font-sans text-3xl font-bold tracking-tight">How this map is made</h1>
      <p className="mt-4">
        Every shape on the <Link href="/expertise/" className="underline underline-offset-4">map</Link> comes from a record, and no step is drawn by hand. A taller mesa means I went further into that field. It says nothing about how much the field matters.
      </p>
      <h2 className="mt-10 font-sans text-xl font-semibold tracking-tight">The ledger</h2>
      <p className="mt-3">
        Each entry is a paper, patent, project, post or note, tagged with the fields it belongs to. It sits at the highest of five layers it has reached: on my reading list, cited in one of my papers, read, written by me, or published by me. A cited paper I later read moves up to read. An entry is counted once in every field it is tagged with, at that one layer, and nowhere else.
      </p>
      <h2 className="mt-10 font-sans text-xl font-semibold tracking-tight">The land</h2>
      <p className="mt-3">
        Each field is a mesa built from its own counts alone. Its terraces are the five layers, lowest to highest, and each step is as wide as the logarithm of the number of entries at that layer. The reading list is drawn under water, as a pale shelf, because a list of intentions is not evidence. Projects I shipped stand with posts on the written terrace; papers and patents make the summit. Each stands on its bench as a numbered mark.
      </p>
      <h2 className="mt-10 font-sans text-xl font-semibold tracking-tight">Spans</h2>
      <p className="mt-3">
        Each field keeps its whole stack. Where two fields share entries at a layer, a span joins them at that layer and nowhere else, as wide as the shared fraction of the smaller field&rsquo;s entries there. A joint paper with no shared reading is therefore an arch: connected at the summit, open beneath. Sharing at several layers stacks into a wall, and a layer that is not shared leaves a window in it. A shared item is counted once in each field it belongs to; the span marks it as one item, not two. Shares too thin to draw are listed under the field instead.
      </p>
      <p className="mt-3">
        Fields that share entries sit shore to shore; fields that share nothing sit apart. No span means no shared entry in the ledger, not that the fields are unrelated. The length of a span means nothing; it is set by where the fields sit. Positions are fixed once and never move; only the shapes change as the ledger grows.
      </p>
      <h2 className="mt-10 font-sans text-xl font-semibold tracking-tight">What is left out</h2>
      <p className="mt-3">
        Citation counts, venues as a measure of worth, and any rating of my own. Titles on the reading layers are counted but not listed. Work I cannot show publicly is counted in the shape but carries no link.
      </p>
    </div>
  )
}
