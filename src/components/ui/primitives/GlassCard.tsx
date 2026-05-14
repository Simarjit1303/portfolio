import { ReactNode, CSSProperties } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  accentColor?: string;
  style?: CSSProperties;
}

export function GlassCard({ children, className = "", accentColor, style }: GlassCardProps) {
  return (
    <div
      suppressHydrationWarning
      className={`rounded-2xl border p-6 ${className}`}
      style={{
        borderColor: accentColor ? `${accentColor}28` : "rgba(255,255,255,0.07)",
        background: accentColor
          ? `linear-gradient(135deg, ${accentColor}08 0%, rgba(10,10,16,0.92) 100%)`
          : "rgba(10,10,16,0.90)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
