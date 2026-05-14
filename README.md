# Simarjit Singh — Portfolio

Personal portfolio website. Built with Next.js 16, Three.js, and Framer Motion.

**Live:** https://simarjit.de

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16.2 (App Router, Turbopack) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 |
| Animation | Framer Motion 12 |
| 3D | React Three Fiber 9 + Three.js 0.183 |
| Fonts | Outfit, Exo 2, Space Mono (next/font) |
| Analytics | @vercel/speed-insights |

## Features

- Scroll-driven hero with interactive 3D robot (mouse-tracking, wave on contact click)
- Name scramble animation on load
- 7 full-page sections: About, Projects, Experience, Education, Skills, Contact
- Project cards with SVG thumbnails and category filter tabs
- Contact form with email app picker (Gmail / Outlook / native mailto)
- Berlin clock showing live CET/CEST time
- Animated stat counters (count-up on scroll into view)
- Fully responsive — mobile, tablet, desktop
- NavPill with magnetic hover and sound effect
- Custom cursor, smooth scroll, view transitions

## Performance

- WebGL canvas capped at `dpr={[1, 1.5]}`, antialias off, `performance={{ min: 0.5 }}`
- Framer Motion `layout` removed from animated grids — no DOM measurement on filter
- MagneticWrapper uses `useMotionValue` (zero React re-renders on mousemove)
- All `backdropFilter` removed from text-containing cards — eliminates GPU layer blur
- `suppressHydrationWarning` on every inline-styled element (Dark Reader compatibility)
- Robot GLB preloaded via `<link rel="preload">` and `useGLTF.preload`
- Scroll handler RAF-gated in Overlay.tsx; NavPill scroll listener is passive

## Project Structure

```
src/
  app/              # Layout, page, globals.css
  components/
    sections/       # About, Projects, Experience, Education, Skills, Contact, Overlay
    ui/             # NavPill, ScrambleText, BerlinClock, MagneticWrapper, Cursor
    ui/primitives/  # SectionWrapper, SectionHeader, GlassCard
    webgl/          # Scene.tsx (Canvas + lighting), Model.tsx (robot GLB)
  data/             # portfolio.ts — single source of truth for all content
  hooks/            # useCountUp
  lib/              # animations.ts (Framer Motion variants)
public/
  thumbnails/       # SVG project thumbnails (01–09.svg)
  robot.glb         # 3D robot model
  Resume_Photo.png  # Contact section photo
  sfx/click.mp3     # NavPill click sound
```

## Content

All editable content lives in `src/data/portfolio.ts`:

- `projects` — project cards (title, desc, tech, GitHub, thumbnail num, color)
- `experiences` — work history with role, company, bullets
- `skillCategories` — technical stack grouped by category
- `certifications` — certification list with URLs
- `facts` / `stats` — About section quick facts and animated counters
- `languages` — language proficiency

## Development

```bash
npm install
npm run dev      # http://localhost:3000 (Turbopack)
npm run build    # production build
npm run lint     # ESLint
npx tsc --noEmit # TypeScript check
```

## Branch

Active development branch: `portfolio-website`
