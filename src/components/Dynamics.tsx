"use client";

import dynamic from "next/dynamic";

export const Scene = dynamic(() => import("./webgl/Scene"), { ssr: false });
export const NavPill = dynamic(() => import("./ui/NavPill"), { ssr: false });
export const Overlay = dynamic(() => import("./sections/Overlay"), { ssr: false });
