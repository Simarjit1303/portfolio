"use client";
import { ReactNode, MouseEventHandler } from "react";

interface AccentButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  variant?: "primary" | "ghost";
  className?: string;
  target?: string;
  rel?: string;
}

export function AccentButton({
  children, href, onClick, variant = "primary", className = "", target, rel
}: AccentButtonProps) {
  const base = "inline-flex items-center justify-center gap-2 text-[11px] font-mono tracking-widest uppercase px-5 py-3 rounded-xl border transition-all duration-300";
  const variants = {
    primary: "border-[#00D9FF]/30 text-[#00D9FF] bg-[#00D9FF]/[0.05] hover:bg-[#00D9FF]/[0.12] hover:border-[#00D9FF]/50",
    ghost: "border-white/10 text-white/50 bg-transparent hover:border-white/20 hover:text-white/75",
  };
  const cls = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return <a href={href} onClick={onClick as MouseEventHandler<HTMLAnchorElement>} className={cls} target={target} rel={rel}>{children}</a>;
  }
  return <button onClick={onClick as MouseEventHandler<HTMLButtonElement>} className={cls}>{children}</button>;
}
