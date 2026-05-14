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
      className={`rounded-2xl border p-6 ${className}`}
      style={{
        borderColor: accentColor ? `${accentColor}28` : "rgba(255,255,255,0.07)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        background: accentColor
          ? `linear-gradient(135deg, ${accentColor}06 0%, rgba(10,10,16,0.72) 100%)`
          : "rgba(10,10,16,0.65)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
