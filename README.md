# drift

The marketing site for **Drift** — an eight-week residency in San Francisco for storyteller-founders.
Cohort 01 runs **June 1 – July 31, 2026**.

Live: <https://drifthouse.sf> *(coming soon)*

## Stack

- **Vite** + **React 18** + **TypeScript**
- **Tailwind CSS** v3.4 with a small custom theme (`tailwind.config.ts`)
- **Framer Motion** for section entrances and CTA hover
- **Wouter** for routing (one page + a terminal 404)
- Self-hosted **Lacquer** (display) and **Instrument Serif** (tagline italic) via Google Fonts

## Local development

```bash
npm install
npm run dev    # http://127.0.0.1:5173
```

## Build

```bash
npm run build      # outputs to dist/
npm run preview    # serve the production build
```

## Project layout

```
.
├── index.html              # SPA shell + Google Fonts + view-source easter egg
├── public/
│   └── drift-logo.png      # Chroma-keyed transparent logo
├── src/
│   ├── main.tsx            # Wouter router (App + NotFound)
│   ├── App.tsx             # Whole one-pager + components inline
│   ├── NotFound.tsx        # Terminal-style 404 with `help`, `ls`, `cat`, ...
│   ├── easterEggs.ts       # Console banner, Konami, rave-mode flash
│   └── index.css           # Tailwind layers + body + Lacquer face
├── tailwind.config.ts      # Theme: page/ink/drift colors, three font families
└── scripts/
    └── key_drift_logo.py   # Background-removes the original DRIFT LOGO.png
```

## Easter eggs

| Trigger | Effect |
|---|---|
| Open devtools | ASCII banner; try `drift.help()`, `drift.story()`, `drift.cohort()`, `drift.apply()` |
| Konami code (↑↑↓↓←→←→BA) | Page colour-inverts for ~1.5s |
| Triple-click the logo | Same invert flash |
| `view-source:` on the homepage | A block comment with the apply email |
| Visit any unknown URL (e.g. `/lol`) | Interactive shell — `help`, `ls`, `cat manifesto.txt`, `apply`, `cd /`, `clear` |

## Logo background removal

The shipped logo arrives on a black background. `scripts/key_drift_logo.py`
chroma-keys it to transparent (`alpha = max(R, G, B)` with a smooth ramp from
18→200) and crops to the alpha bounding box.

```bash
python3 scripts/key_drift_logo.py
```

Source path is hardcoded — edit it if your logo lives elsewhere.

## Deploy

The built `dist/` is a static SPA — drop it on Vercel, Netlify, Cloudflare Pages,
or any static host.

```bash
npm run build
# Vercel:    vercel deploy --prebuilt
# Netlify:   netlify deploy --dir=dist
```

Routing relies on Wouter; for a static host you'll need a SPA fallback to
`index.html` for 404s so the terminal page renders.

## License

MIT — see [`LICENSE`](./LICENSE).
