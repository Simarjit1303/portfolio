"use client";
import { ReactNode } from "react";

interface SectionWrapperProps {
  id: string;
  children: ReactNode;
  className?: string;
  decorativeNumber?: string;
}

export function SectionWrapper({ id, children, className = "", decorativeNumber }: SectionWrapperProps) {
  return (
    <section
      id={id}
      suppressHydrationWarning
      className={`relative z-20 min-h-[100dvh] flex flex-col justify-center py-8 sm:py-12 md:py-16 px-8 md:px-24 overflow-hidden ${className}`}
      style={{ background: "rgba(18,18,18,0.88)" }}
    >
      {/* Top fade */}
      <div suppressHydrationWarning className="absolute inset-x-0 top-0 h-48 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, #121212 0%, transparent 100%)" }} />
      {/* Bottom fade */}
      <div suppressHydrationWarning className="absolute inset-x-0 bottom-0 h-48 pointer-events-none"
        style={{ background: "linear-gradient(to top, #121212 0%, transparent 100%)" }} />
      {/* Decorative background number */}
      {decorativeNumber && (
        <div className="absolute top-8 right-8 text-[180px] font-black text-white/[0.025] leading-none select-none pointer-events-none font-display">
          {decorativeNumber}
        </div>
      )}
      <div className="max-w-7xl mx-auto relative w-full">
        {children}
      </div>
    </section>
  );
}
