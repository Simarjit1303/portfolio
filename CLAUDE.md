@AGENTS.md

# Portfolio — Project Instructions

## What This Is
Simarjit Singh's personal portfolio. Next.js 16 single-page app with a Three.js robot, scroll-driven hero, and 7 content sections. Live at https://simarjit.de.

## Tech Stack
| Layer | Technology |
|---|---|
| Framework | Next.js 16.2 (App Router, Turbopack) |
| Language | TypeScript 5, strict mode |
| Styling | Tailwind CSS v4 |
| Animation | Framer Motion 12 |
| 3D | React Three Fiber 9 + Three.js 0.183 |
| Fonts | Geist Sans + Geist Mono (next/font) |
| Analytics | @vercel/speed-insights |

## Key Entry Points
- **Page shell**: `src/app/layout.tsx` — metadata, fonts, SpeedInsights, robot.glb preload
- **Page composition**: `src/app/page.tsx` — assembles Scene, NavPill, Overlay, and all sections
- **SSR boundary**: `src/components/Dynamics.tsx` — `next/dynamic` barrel for WebGL + NavPill
- **Content data**: `src/data/portfolio.ts` — all projects, experience, education, skills

## Directory Map
```
src/app/          → App Router shell (layout, page, globals.css)
src/components/
  sections/       → 7 full-page sections (About, Projects, Experience, Education, Skills, Contact, Overlay)
  ui/             → Atomic components (NavPill, ScrambleText, BerlinClock, MagneticWrapper, AnimatedText, ScrollReset)
  webgl/          → Three.js layer (Scene.tsx = Canvas+lighting, Model.tsx = robot GLB)
src/data/         → portfolio.ts — single source of truth for all content
src/hooks/        → useCountUp.ts
src/lib/          → animations.ts (Framer Motion variants)
public/           → robot.glb, Resume_Photo.png, sfx/click.mp3
```

## Conventions
- **File naming**: PascalCase for components, camelCase for hooks/utils
- **Imports**: `@/*` alias maps to `src/*`
- **Scroll animations**: Direct DOM style mutation in `useEffect` (not React state) for performance
- **WebGL guards**: All Three.js components wrapped in `next/dynamic({ ssr: false })` via Dynamics.tsx
- **Content changes**: Edit `src/data/portfolio.ts` — never hardcode content in section components
- **Hydration**: `suppressHydrationWarning` on `<html>` and `<body>` — Dark Reader extension causes benign mismatches

## Common Tasks
```bash
npm run dev      # dev server (Turbopack)
npm run build    # production build
npm run lint     # ESLint
```

## Where to Look
| Task | File |
|---|---|
| Add/edit a project | `src/data/portfolio.ts` → `projects` array |
| Add/edit experience | `src/data/portfolio.ts` → `experience` array |
| Change hero text | `src/components/sections/Overlay.tsx` |
| Change contact email | `src/components/sections/Contact.tsx` → `to` const in `openEmail` |
| Adjust robot size/position | `src/components/webgl/Model.tsx` → `<group scale position>` |
| Change nav sections | `src/components/ui/NavPill.tsx` → `SECTIONS` array |
| Add a section | Create in `src/components/sections/`, import in `src/app/page.tsx` |

## Performance Notes
- WebGL: `dpr={[1,1]}` (capped at 1×), `flat` prop (no tone mapping), `performance={{ min: 0.5 }}`
- Scroll handler: RAF-gated in Overlay.tsx; NavPill uses `offsetTop` (no forced reflow)
- Robot GLB is preloaded via `<link rel="preload">` in layout.tsx and `useGLTF.preload` in Model.tsx
