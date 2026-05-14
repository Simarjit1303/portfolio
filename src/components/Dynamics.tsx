"use client";

import dynamic from "next/dynamic";

export const Scene = dynamic(() => import("./webgl/Scene"), {
  ssr: false,
  loading: () => (
    <div
      className="fixed inset-0 flex items-center justify-center bg-[#0d1117]"
      style={{ zIndex: 50 }}
    >
      <div className="flex flex-col items-center gap-4">
        <span className="w-10 h-10 rounded-full border-4 border-[#00D9FF]/20 border-t-[#00D9FF] animate-spin" />
        <p className="text-white/60 font-mono text-xs tracking-widest uppercase">
          Loading Experience...
        </p>
      </div>
    </div>
  ),
});
export const NavPill = dynamic(() => import("./ui/NavPill"), { ssr: false });
export const Overlay = dynamic(() => import("./sections/Overlay"), { ssr: false });
