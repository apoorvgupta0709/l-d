# AI Engineering, Visualized

A visual learning website that teaches the core skills of AI engineering through simple,
interactive diagrams — an unofficial study companion inspired by *AI Engineering* by
Chip Huyen (O'Reilly, 2025).

## What's inside

- **10 chapters** mirroring the book's arc: foundation models → evaluation → prompt
  engineering → RAG & agents → finetuning → data → inference → architecture.
- **Interactive SVG diagrams** — click any block in a diagram to open a plain-language
  explanation of that concept. Keyboard accessible (Tab + Enter).
- **Key takeaway cards** per chapter — the "if you remember one thing" distillation.
- **Self-check quizzes** with instant feedback and explanations.
- **Progress tracking** — mark chapters complete; progress is stored in your browser
  (localStorage) and shown on the home page.
- **Light & dark mode** via `prefers-color-scheme`.

## Running it

No build step, no dependencies — it's plain HTML/CSS/JS.

```bash
# any static server works:
python3 -m http.server
# then open http://localhost:8000
```

Opening `index.html` directly in a browser also works.

## Deploying to GitHub Pages

The site is fully static with relative paths, so it deploys as-is — no build step,
no workflow file needed:

1. On GitHub, open **Settings → Pages** for this repository.
2. Under **Build and deployment**, set Source to **Deploy from a branch**.
3. Pick branch **`main`**, folder **`/ (root)`**, and click **Save**.
4. Wait a minute or two, then visit **https://apoorvgupta0709.github.io/l-d/**.

Every future push to `main` redeploys automatically. (Netlify, Vercel, or any other
static host works too — just point it at the repo root.)

## Structure

```
index.html          home: learning path + progress
chapters/ch01–10    one page per chapter
css/style.css       design tokens, light/dark themes, all components
js/app.js           progress tracking (localStorage)
js/diagram.js       interactive-SVG behavior (click a node → detail panel)
js/quiz.js          quiz engine (questions live as JSON inside each page)
```

To add a diagram: draw an inline SVG, give clickable groups
`class="node" data-node="some-id" tabindex="0"`, and add matching entries to the
figure's `<script type="application/json" class="diagram-data">` block.
