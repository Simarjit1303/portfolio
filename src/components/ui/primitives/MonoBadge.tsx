import { ReactNode } from "react";

interface MonoBadgeProps {
  children: ReactNode;
  color?: string;
  variant?: "default" | "accent" | "warning";
}

export function MonoBadge({ children, color, variant = "default" }: MonoBadgeProps) {
  const styles = {
    default: {
      color: color ? `${color}bb` : "rgba(255,255,255,0.5)",
      borderColor: color ? `${color}28` : "rgba(255,255,255,0.08)",
      background: color ? `${color}08` : "rgba(255,255,255,0.03)",
    },
    accent: {
      color: "#00D9FF",
      borderColor: "rgba(0,217,255,0.30)",
      background: "rgba(0,217,255,0.05)",
    },
    warning: {
      color: "rgba(255,184,0,0.70)",
      borderColor: "rgba(255,184,0,0.30)",
      background: "rgba(255,184,0,0.05)",
    },
  };

  return (
    <span
      className="text-[10px] font-mono px-2 py-0.5 rounded-full border tracking-[0.12em] uppercase"
      style={styles[variant]}
    >
      {children}
    </span>
  );
}
