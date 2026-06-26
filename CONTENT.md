# Adding content

The whole site is driven by Markdown files in `content/`. **To publish
something, drop a `.md` file in the right folder and push.** No code changes.

```
content/
├── papers/     research publications      (PaperMetadata)
├── blogs/      long-form writing          (BlogMetadata)
├── projects/   applied/engineering case studies (ProjectMetadata)
└── ideas/      knowledge-garden notes     (IdeaMetadata)
```

## How to add an item

1. Copy the `_template.md` in the relevant folder to a new file.
2. Name the file with a URL-friendly slug, e.g. `aws-llm-cost-guardrails.md`
   → lives at `/projects/aws-llm-cost-guardrails/`.
3. Fill in the frontmatter (between the `---` lines) and the body.
4. Set `draft: false` (or remove it) when it's ready to go live.
5. Commit and push.

## Conventions

- **`draft: true`** keeps a file out of the published site — use it for
  work-in-progress.
- **Files starting with `_`** (like `_template.md`) are never published.
- **`featured: true`** surfaces an item in the homepage rails.
- **`date`** sorts everything newest-first; use `YYYY-MM-DD`.
- Math (`$...$`, `$$...$$`), GitHub-flavored Markdown, and syntax-highlighted
  code blocks all render automatically.

## Field reference

Exact fields per collection live in `src/lib/markdown.ts` (the `*Metadata`
interfaces). The `_template.md` in each folder is always a working example.
