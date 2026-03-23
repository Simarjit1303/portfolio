"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Overlay() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Section 1: 0% to 20%
  const opacity1 = useTransform(scrollYProgress, [0, 0.1, 0.2], [1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.2], [0, -100]);

  // Section 2: 25% to 50%
  const opacity2 = useTransform(scrollYProgress, [0.2, 0.3, 0.4, 0.5], [0, 1, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.2, 0.5], [100, -100]);

  // Section 3: 55% to 80%
  const opacity3 = useTransform(scrollYProgress, [0.55, 0.65, 0.75, 0.85], [0, 1, 1, 0]);
  const y3 = useTransform(scrollYProgress, [0.55, 0.85], [100, -100]);

  return (
    <div ref={containerRef} className="absolute top-0 left-0 w-full h-[500vh] pointer-events-none z-10">
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center px-8 md:px-24">
        
        {/* Section 1 */}
        <motion.div 
          style={{ opacity: opacity1, y: y1 }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center"
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-4">
            Simarjit Singh
          </h1>
          <p className="text-xl md:text-2xl text-white/70 font-light">
            MSc Data Science & AI Student.
          </p>
        </motion.div>

        {/* Section 2 */}
        <motion.div 
          style={{ opacity: opacity2, y: y2 }}
          className="absolute inset-0 flex flex-col items-start justify-center text-left px-8 md:px-32"
        >
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-4 max-w-xl">
            Building AI That Actually Ships.
          </h2>
          <p className="text-lg md:text-xl text-white/70 max-w-md leading-relaxed">
            Based in Berlin. Actively seeking Working Student & Internship roles in Data Science, Data Analytics, and AI.
          </p>
        </motion.div>

        {/* Section 3 */}
        <motion.div 
          style={{ opacity: opacity3, y: y3 }}
          className="absolute inset-0 flex flex-col items-end justify-center text-right px-8 md:px-32"
        >
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-4 max-w-xl">
            Machine Learning & NLP.
          </h2>
          <p className="text-lg md:text-xl text-white/70 max-w-md leading-relaxed">
            Building production-ready applications with LLMs, RAG, and custom domains. If it doesn't ship, it's not done.
          </p>
        </motion.div>

      </div>
    </div>
  );
}
