"use client";

import { useState, useEffect, useRef } from "react";
import { useInView } from "framer-motion";

interface UseCountUpProps {
  end: number;
  duration?: number;
  delay?: number;
  startOnView?: boolean;
}

export function useCountUp({
  end,
  duration = 2000,
  delay = 0,
  startOnView = true,
}: UseCountUpProps) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(elementRef, { once: true, margin: "-50px" });
  const hasStarted = useRef(false);

  useEffect(() => {
    if (startOnView && !isInView) return;
    if (hasStarted.current) return;

    let startTime: number | null = null;
    let animationFrameId: number;

    const timeoutId = setTimeout(() => {
      hasStarted.current = true;

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = timestamp - startTime;
        const percentage = Math.min(progress / duration, 1);

        // Ease out expo
        const easeProgress = percentage === 1 ? 1 : 1 - Math.pow(2, -10 * percentage);
        
        setCount(Math.floor(end * easeProgress));

        if (percentage < 1) {
          animationFrameId = requestAnimationFrame(animate);
        }
      };

      animationFrameId = requestAnimationFrame(animate);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [end, duration, delay, startOnView, isInView]);

  return { count, elementRef };
}
