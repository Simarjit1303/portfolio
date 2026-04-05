# Interactive WebGL Data Science Portfolio

> 🌐 **Live at [simarjit.de](https://www.simarjit.de)**

A high-performance, immersive 3D portfolio built with React Three Fiber, Framer Motion, and Next.js 16 (App Router). Features a GPU-accelerated WebGL pipeline with a skeletal-animated robot, cinematic post-processing, magnetic UI physics, and scroll-driven storytelling.

---

## ⚡ Core Architecture

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| 3D Engine | React Three Fiber + three.js |
| Post-Processing | `@react-three/postprocessing` — Bloom, Vignette |
| Physics & Animations | Framer Motion (spring physics, magnetic UI) |
| Styling | Tailwind CSS v4 |
| Audio | `use-sound` (tactile UI haptics) |
| Analytics | Vercel Speed Insights + Web Analytics |
| DNS | Cloudflare (DDoS protection, global CDN) |
| Deployment | Vercel (auto-deploy on push) |

---

## 📁 Project Structure

```text
portfolio/
├── public/                  (Raw Assets)
│   ├── robot.glb            (WebGL Skeletal Model)
│   └── Resume_Photo.png     (Static Profile Image)
│
└── src/
    ├── app/                 (Next.js App Router)
    │   ├── globals.css      (Tailwind Directives & CSS Variables)
    │   ├── layout.tsx       (Server DOM Wrapper + SEO Meta)
    │   └── page.tsx         (Main Component Pipeline)
    │
    ├── components/          (Strict React Domains)
    │   ├── Dynamics.tsx     (SSR-safe barrel — next/dynamic boundaries)
    │   ├── webgl/           (3D Render Layer)
    │   │   ├── Scene.tsx    (Canvas, Lighting, Post-Processing)
    │   │   └── Model.tsx    (glTF Skeletal Binding & Mouse Physics)
    │   ├── sections/        (Macroscopic Page Sections)
    │   │   ├── Overlay.tsx  (Scroll-driven Hero Storytelling)
    │   │   ├── About.tsx
    │   │   ├── Projects.tsx
    │   │   ├── Experience.tsx
    │   │   ├── Education.tsx
    │   │   ├── Skills.tsx
    │   │   └── Contact.tsx
    │   └── ui/              (Atomic Interface Elements)
    │       ├── NavPill.tsx
    │       ├── MagneticWrapper.tsx
    │       ├── AnimatedText.tsx
    │       ├── ScrambleText.tsx
    │       ├── BerlinClock.tsx
    │       └── ScrollReset.tsx
    │
    ├── data/                (Centralized Content Hub)
    │   └── portfolio.ts     (All projects, experience & skills data)
    │
    ├── hooks/               (Custom React Hooks)
    │   └── useCountUp.ts    (Animated number counter)
    │
    └── lib/                 (Global Utilities)
        └── animations.ts    (Framer Motion transition variants)
```

---

## 🚀 Getting Started

1. Clone this repository:

   ```bash
   git clone https://github.com/Simarjit1303/portfolio.git
   cd portfolio
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open `http://localhost:3000` in your browser.

---

## 🖥 Deployment

The site is deployed on **Vercel** with auto-deployment configured on every push to the `portfolio-website` branch.

- **Domain:** [simarjit.de](https://www.simarjit.de)
- **DNS/CDN:** Cloudflare (proxied for security and performance)
- **Branch:** `portfolio-website` → production
- **SSR Safety:** All WebGL and scroll components are wrapped in `next/dynamic` with `{ ssr: false }` via `Dynamics.tsx`, ensuring the Node.js server never attempts to render GPU-bound code.

To deploy your own fork:
1. Push to GitHub → connect to Vercel → select Next.js preset → deploy.

---

## 📬 Contact

**Simarjit Singh** — MSc Data Science & AI, Berlin  
[simarjit.de](https://www.simarjit.de) · [GitHub](https://github.com/Simarjit1303) · [LinkedIn](https://linkedin.com/in/simarjit-singh)
