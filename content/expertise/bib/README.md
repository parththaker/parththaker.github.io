# Reference lists

One BibTeX file per published paper, named after the paper's file in `content/papers/`:

    content/papers/maximizing-satisficing-bandits-graph.md
    content/expertise/bib/maximizing-satisficing-bandits-graph.bib

Every entry in the file becomes a *cited* entry in the map, tagged with that paper's `fields:`.
The same reference in two papers' files is one entry, shared by both papers' fields; that is what
makes a cited saddle between two mesas. References to my own papers are ignored.

Export from Overleaf: Menu, then Download, then the `.bib` file of the project; or copy the
project's `references.bib`. Entries need at least a `title`. `doi`, `eprint` (arXiv) and `year`
help matching and dating. Nothing else is read.

Then run `python3 scripts/build-landscape.py` and commit `src/data/expertise-landscape.json`.
