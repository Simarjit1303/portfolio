# Interactive WebGL Data Science Portfolio

This repository contains the source code for a high-performance, strictly typed Next.js (App Router) portfolio. It utilizes a raw WebGL pipeline and Skeletal Physics to create an immersive, GPU-accelerated interactive experience, specifically engineered for deployment on Vercel.

## ⚡ Core Architecture

* **Framework:** Next.js 14+ (App Router, Turbopack)
* **3D Engine:** React Three Fiber (`@react-three/fiber`), `three.js`
* **Post-Processing:** `@react-three/postprocessing` (Real-time Cinematic Bloom, Vignetting)
* **Physics & Animations:** `framer-motion` (Spring physics, Magnetic UI)
* **Styling:** Tailwind CSS (Strict UI utility layers)
* **Audio:** `use-sound` (Tactile UI Haptics)

## 📁 Project Structure

The codebase is cleanly mapped into massive functional boundaries:

```text
portfolio/
├── public/                  (Raw Assets)
│   ├── robot.glb            (WebGL Geometry)
│   └── Resume_Photo.png     (Static Profile Image)
│
└── src/
    ├── app/                 (Next.js App Router)
    │   ├── globals.css      (Tailwind Directives)
    │   ├── layout.tsx       (Server DOM Wrapper)
    │   └── page.tsx         (Main Component Pipeline)
    │
    ├── components/          (Strict React Domains)
    │   ├── webgl/           (3D Render Layer & R3F Scene)
    │   ├── sections/        (Macroscopic Layouts like About/Contact)
    │   └── ui/              (Atomic Interface Elements)
    │
    ├── data/                (Centralized Content Hub)
    │   └── portfolio.ts     (All text strings and data arrays)
    │
    ├── hooks/               (Custom React Hooks)
    │   └── useCountUp.ts
    │
    └── lib/                 (Global Utilities)
        └── animations.ts    (Framer Motion transition variants)
```

## 🚀 Getting Started

If you wish to spin up the local development server:

1. Clone this repository locally.
2. Install the necessary dependencies via npm:

   ```bash
   npm install
   ```

3. Run the Turbopack compiler:

   ```bash
   npm run dev
   ```

4. Navigate to `http://localhost:3000` in your Chromium or Webkit browser.

## 🖥 Deployment

This complex architecture is natively optimized for instantaneous deployment on [Vercel](https://vercel.com).
The `next/dynamic` barriers in `page.tsx` guarantee that the Node.js SSR pipeline safely bypasses the GPU layers during static generation, allowing seamless pushed to production workflows.

1. Connect your GitHub repository to Vercel.
2. Select standard Next.js preset.
3. Deploy!
