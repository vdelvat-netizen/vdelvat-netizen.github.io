# Victor Delvat — Portfolio

An interactive personal portfolio telling one story: a Global BBA spread across
three continents (EDHEC Nice → UCLA Los Angeles → NTU Singapore), built around a
single driver — **connection**.

Editorial-minimal design, warm ink-and-burgundy palette, an animated world-map
"journey", and cinematic page-to-page transitions. Pure HTML/CSS/JS — no build
step, no framework, no external runtime dependencies.

## Pages

| File | Section |
|------|---------|
| `index.html` | Home / hero |
| `about.html` | About — the driver |
| `journey.html` | The Path — animated world map + timeline |
| `work.html` | Work Experience |
| `contact.html` | Contact (Web3Forms form) |

Shared styles live in `assets/styles.css` and behaviour in `assets/main.js`.

## Run locally

It's static, so any local web server works. For example:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

(Opening `index.html` directly by double-click also works for most things.)

## Adding your photo and logos

See [`assets/README.txt`](assets/README.txt). Drop files into `assets/` and they
appear automatically — no code changes.

## Deploying (GitHub Pages)

This repo is ready for GitHub Pages. In the repo: **Settings → Pages → Build and
deployment → Source: Deploy from a branch → `main` / `(root)`**. The site goes
live at `https://<username>.github.io/<repo>/` (or the repo root if the repo is
named `<username>.github.io`). A custom domain can be attached later under the
same Pages settings.

---

Designed and built with [Claude Code](https://claude.com/claude-code).
