# Simarjit Singh — Portfolio

Personal portfolio website for Simarjit Singh, MSc Data Science student at GISMA University, Berlin.

**Live:** https://simarjit.de

## Tech Stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **Styling:** Tailwind CSS v4
- **Animation:** Framer Motion, custom scroll-driven DOM animations
- **3D:** React Three Fiber + Three.js (robot GLB with skeletal animations)
- **Language:** TypeScript

## Features

- Scroll-driven hero with 3D robot and animated name scramble
- Interactive 3D robot (mouse-tracking rotation, wave animation)
- NavPill navigation (7 sections, smooth scroll, accessibility compliant)
- Projects, Experience, Education, Skills, Contact sections
- Contact form with email app picker (Gmail / Outlook / native mailto)
- Fully responsive (mobile / tablet / desktop)

## Build

```bash
npm run build
npm start
```

## Project Structure

```
src/
  app/          # Next.js App Router (layout, page)
  components/
    sections/   # About, Projects, Experience, Education, Skills, Contact, Overlay
    ui/         # NavPill, ScrambleText, AnimatedText, BerlinClock, MagneticWrapper
    webgl/      # Scene, Model (Three.js robot)
  data/         # portfolio.ts (projects, experience, education data)
  hooks/        # useCountUp
  lib/          # animations
```
