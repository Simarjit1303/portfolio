# Agent 1 Debug Report

**Branch:** fix/canvas-scroll-lag
**Date:** 2026-04-15
**Agent:** Agent 1 (Debugger)

---

## Summary

Two issues investigated: canvas scroll lag (slow filesystem) and THREE.Clock deprecation. One fix applied (next.config.ts). One issue is upstream-only and documented in HANDOFFS.

---

## Issue 1: Canvas Scroll Lag — Slow Filesystem

### Root Cause

The `.next/dev` Turbopack filesystem cache is on the F: drive, a slow HDD. Next.js 16 benchmarked the drive at **766ms–972ms** (threshold is ~50ms for fast drives). The cache grew to **738MB**, causing:

- Write stalls of 10–19s after each compile
- One GET request that took **2.3 minutes** (next.js portion: 2.3min)
- `application-code` time reaching 37s on some requests
- Server restarted from memory pressure (`Server is approaching the used memory threshold, restarting...`)
- Ready time on restart: **15.2s** (cold start on slow FS)

The canvas animation and scroll code are NOT the bottleneck. The lag is entirely in the dev-server compile/cache pipeline writing to a slow drive.

### Evidence

From `dev.log`:
```
Slow filesystem detected. The benchmark took 766ms.
Slow filesystem detected. The benchmark took 972ms.
Finished writing to filesystem cache in 10.4s
Finished writing to filesystem cache in 11.2s
Finished filesystem cache database compaction in 113s
Finished writing to filesystem cache in 12.9s
Finished writing to filesystem cache in 18.8s
GET / 200 in 2.4min (next.js: 2.3min, application-code: 8.6s)
Server is approaching the used memory threshold, restarting...
```

### Fix Applied

**File:** `next.config.ts`

Disabled Turbopack filesystem cache for dev by setting `experimental.turbopackFileSystemCacheForDev: false`. This stops all cache writes to the slow F: drive. Every compile starts cold but never stalls on disk I/O.

```ts
experimental: {
  turbopackFileSystemCacheForDev: false,
}
```

**Trade-off:** Warm restarts will be slower (no cache warmup). Re-enable this flag if the project is moved to an SSD or a symlink/junction is created from `.next/dev` to a temp folder on a faster drive (e.g., `C:\Temp\portfolio-next`).

**Alternative (longer-term):** Add the project folder to Windows Defender exclusion list — Next.js docs explicitly recommend this for Windows (ref: `node_modules/next/dist/docs/01-app/02-guides/local-development.md`, section 1).

---

## Issue 2: THREE.Clock Deprecation

### Root Cause

`THREE.Clock` was deprecated in THREE.js r0.175+ in favour of `THREE.Timer`. The warning:

```
THREE.THREE.Clock: This module has been deprecated. Please use THREE.Timer instead.
```

comes from `@react-three/fiber` v9.5.0 internals — specifically line 972 of `events-5a94e5eb.esm.js`:

```js
clock: new THREE.Clock(),
```

This is inside r3f's store initialisation. **Our source code (`Model.tsx`, `Scene.tsx`) does NOT use `THREE.Clock` directly.**

### Why We Cannot Fix This Here

`THREE.Timer` has an incompatible API with `THREE.Clock`. The r3f render loop accesses `.elapsedTime`, `.oldTime`, `.getDelta()`, `.start()`, and `.stop()` — none of which exist on `THREE.Timer`. Dropping in `Timer` via the `onCreated` callback would break the render loop entirely.

The fix must come from `@react-three/fiber` upgrading to use `THREE.Timer`. This is tracked upstream. See HANDOFFS.md for the recommended action.

### Verified: Model.tsx is clean

`Model.tsx` uses `useFrame((_, delta) => { ... })` — the `delta` comes from r3f's internal clock, not a `THREE.Clock` we instantiate. No changes needed in `Model.tsx`.

---

## Issue 3: `ssr: false` in Server Component (Already Fixed)

`dev.log` shows historical errors:

```
`ssr: false` is not allowed with `next/dynamic` in Server Components.
```

These were from an earlier state of `src/app/page.tsx` that used `dynamic()` directly in a Server Component. The fix is already applied — `page.tsx` now imports from `src/components/Dynamics.tsx`, a `"use client"` barrel that holds all `dynamic()` calls. The log shows the error resolved (subsequent GETs return 200).

No action needed.

---

## Files Changed

| File | Change |
|------|--------|
| `next.config.ts` | Added `experimental.turbopackFileSystemCacheForDev: false` |

---

## Remaining Action Items

See `HANDOFFS.md` for items assigned to other agents.
