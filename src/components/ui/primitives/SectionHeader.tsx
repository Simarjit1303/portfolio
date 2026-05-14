"use client";
import { motion } from "framer-motion";

interface SectionHeaderProps {
  label: string;
  right?: string;
}

export function SectionHeader({ label, right }: SectionHeaderProps) {
  return (
    <motion.div
      className="flex items-center justify-between border-t border-white/10 pt-5 mb-8 md:mb-10"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <span className="text-[11px] font-mono tracking-[0.2em] text-white/60 uppercase">■ {label}</span>
      {right && <span className="text-[11px] font-mono tracking-[0.2em] text-white/60 uppercase">{right}</span>}
    </motion.div>
  );
}
