# Portfolio Content Management Instructions

## Overview

This Next.js portfolio consists of three main sections: Papers, Blog, and Hobbies. To add new content (papers or blog posts), you need to follow a local development → build → deploy workflow since the site uses markdown processing, math rendering, and static generation.

## Directory Structure

```
portfolio/
├── content/
│   ├── papers/          # Paper markdown files
│   └── blogs/           # Blog markdown files
├── public/
│   ├── images/          # Blog images
│   ├── gaming-memories/ # Hobbies section images
│   └── simulations/     # Paper simulation files
└── out/                 # Built static files (after npm run build)
```

## Adding New Content

### Option 1: Local Development Workflow (Recommended)

This is the proper way to add new content since GitHub Pages only serves static files.

**Steps:**

1. **Add new markdown file**
   - For papers: `/home/pkt/ParthPersonal/portfolio/content/papers/your-paper-slug.md`
   - For blogs: `/home/pkt/ParthPersonal/portfolio/content/blogs/your-blog-slug.md`

2. **Build the site**
   ```bash
   cd /home/pkt/ParthPersonal/portfolio
   npm run build
   ```

3. **Copy built files to deployment repository**
   ```bash
   cp -r out/* /home/pkt/ParthPersonal/temp-repo/
   ```

4. **Commit and push changes**
   ```bash
   cd /home/pkt/ParthPersonal/temp-repo
   git add .
   git commit -m "Add new blog/paper post"
   git push origin master
   ```

5. **Wait for GitHub Pages to update** (usually 2-5 minutes)

### Option 2: Direct GitHub Commits (NOT Recommended)

❌ **Do NOT commit `.md` files directly to the GitHub Pages repository** because:
- The GitHub Pages repo only contains built static files (HTML, CSS, JS)
- Your `.md` files need to be processed by Next.js to become HTML
- GitHub Pages serves static files, not a Next.js application

## Content Templates

### Paper Template

Create: `/content/papers/your-paper-slug.md`

```yaml
---
title: "Your Paper Title"
authors: "Author Names"
date: "2024-01-01"
tags: ["machine-learning", "optimization"]
abstract: "Your paper abstract goes here"
excitement: "What excited you about this research"
venue: "Conference/Journal Name (optional)"
arxivId: "2401.12345 (optional)"
doi: "10.1000/xyz123 (optional)"
videoUrl: "https://youtube.com/watch?v=... (optional)"
posterUrl: "https://example.com/poster.pdf (optional)"
slideUrl: "https://example.com/slides.pdf (optional)"
conferenceUrl: "https://conference-website.com (optional)"
images: ["figure1.png", "figure2.png"] # optional, place in /public/content/images/
simulations: ["sim1.gif", "sim2.mp4"] # optional, place in /public/simulations/
---

Your paper content goes here. You can use:

- Regular markdown syntax
- LaTeX math: $\mathbf{x} = \arg\min_x f(x)$
- Display math: $$\nabla f(x) = 0$$
- Images: ![Description](figure1.png)
```

### Blog Template

Create: `/content/blogs/your-blog-slug.md`

```yaml
---
title: "Your Blog Post Title"
date: "2024-01-01"
tags: ["programming", "tutorial"]
description: "Brief description of your blog post"
readTime: 5
---

Your blog content goes here. You can use:

- Regular markdown syntax
- LaTeX math: $E = mc^2$
- Display math: $$\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}$$
- Code blocks:

```python
def hello_world():
    print("Hello, World!")
```

- Images: ![Description](/images/your-image.png)
```

## Adding Images

### For Blog Posts
Place images in: `/public/images/your-image.png`
Reference in markdown: `![Description](/images/your-image.png)`

### For Papers
Place images in: `/public/content/images/your-image.png`
Add to frontmatter: `images: ["your-image.png"]`

### For Simulations
Place files in: `/public/simulations/your-simulation.gif`
Add to frontmatter: `simulations: ["your-simulation.gif"]`

## Math Rendering

The site supports LaTeX math rendering using KaTeX:

- Inline math: `$\alpha + \beta = \gamma$`
- Display math: `$$\sum_{i=1}^{n} x_i = \mu$$`
- Complex expressions: `$$\mathbf{A} = \begin{pmatrix} a & b \\ c & d \end{pmatrix}$$`

## Git Configuration

If you encounter SSH key issues when pushing:

```bash
cd /home/pkt/ParthPersonal/temp-repo
git config core.sshCommand "ssh -i ~/.ssh/id_ed25519_github_new"
git config user.email "parneh@gmail.com"
git config user.name "parththaker"
```

## Troubleshooting

### Build Errors
- Run `npm run lint` to check for syntax errors
- Run `npm run build` to see detailed error messages

### Math Not Rendering
- Ensure you're using proper LaTeX syntax
- Check that KaTeX supports your specific commands

### Images Not Loading
- Verify image paths are correct
- Ensure images are in the proper `/public/` subdirectories
- Check file extensions match exactly

### Changes Not Appearing
- Wait 2-5 minutes for GitHub Pages to update
- Clear browser cache
- Check that you pushed to the correct repository

## Repository Structure

- **Source Code**: `/home/pkt/ParthPersonal/portfolio/` (Next.js application)
- **Deployment**: `/home/pkt/ParthPersonal/temp-repo/` (GitHub Pages static files)
- **Live Site**: https://parththaker.github.io

Remember: Always edit in the source directory, build, then deploy to the GitHub Pages repository!