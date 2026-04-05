"use client";

import { useEffect, useRef, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";

interface Props {
  text: string;
  trigger?: boolean;
  className?: string;
  speed?: number;
}

export default function ScrambleText({
  text,
  trigger = true,
  className,
  speed = 60,
}: Props) {
  const [display, setDisplay] = useState(text);
  const frameRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const iterRef = useRef(0);

  useEffect(() => {
    if (!trigger) {
      setTimeout(() => setDisplay(text), 0);
      if (frameRef.current) clearInterval(frameRef.current);
      return;
    }
    iterRef.current = 0;
    if (frameRef.current) clearInterval(frameRef.current);

    frameRef.current = setInterval(() => {
      setDisplay(
        text
          .split("")
          .map((char, i) => {
            if (char === " ") return " ";
            if (i < iterRef.current) return char;
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );
      iterRef.current += 0.28;
      if (iterRef.current >= text.length) {
        clearInterval(frameRef.current!);
        setDisplay(text);
      }
    }, speed);

    return () => {
      if (frameRef.current) clearInterval(frameRef.current);
    };
  }, [trigger, text, speed]);

  return <span className={className}>{display}</span>;
}
