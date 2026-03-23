"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, motion, useMotionValueEvent } from "framer-motion";

const FRAME_COUNT = 192; // 000 to 191

export default function ScrollyCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Preload images
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;
    
    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      const frameNumber = i.toString().padStart(3, '0');
      img.src = `/sequence/frame_${frameNumber}_delay-0.041s.png`;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === FRAME_COUNT) {
          setImages(loadedImages);
          setIsLoaded(true);
        }
      };
      loadedImages.push(img);
    }
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);

  useMotionValueEvent(frameIndex, "change", (latest) => {
    if (isLoaded && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const index = Math.min(FRAME_COUNT - 1, Math.max(0, Math.floor(latest)));
        const img = images[index];
        if (img && img.complete) {
          // Object fit cover logic
          const canvasRatio = canvas.width / canvas.height;
          const imgRatio = img.width / img.height;
          let drawWidth = canvas.width;
          let drawHeight = canvas.height;
          let offsetX = 0;
          let offsetY = 0;

          if (canvasRatio > imgRatio) {
            drawHeight = canvas.width / imgRatio;
            offsetY = (canvas.height - drawHeight) / 2;
          } else {
            drawWidth = canvas.height * imgRatio;
            offsetX = (canvas.width - drawWidth) / 2;
          }

          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
        }
      }
    }
  });

  // Handle Resize and Initial Draw
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        // Trigger a re-draw for the current frame
        if (isLoaded) {
           const currentFrame = Math.min(FRAME_COUNT - 1, Math.max(0, Math.floor(frameIndex.get())));
           const ctx = canvasRef.current.getContext("2d");
           const img = images[currentFrame];
           if (ctx && img && img.complete) {
             const canvasRatio = canvasRef.current.width / canvasRef.current.height;
             const imgRatio = img.width / img.height;
             let drawWidth = canvasRef.current.width;
             let drawHeight = canvasRef.current.height;
             let offsetX = 0;
             let offsetY = 0;
             if (canvasRatio > imgRatio) {
               drawHeight = canvasRef.current.width / imgRatio;
               offsetY = (canvasRef.current.height - drawHeight) / 2;
             } else {
               drawWidth = canvasRef.current.height * imgRatio;
               offsetX = (canvasRef.current.width - drawWidth) / 2;
             }
             ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
             ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
           }
        }
      }
    };
    
    window.addEventListener("resize", handleResize);
    handleResize(); // Initial size
    
    return () => window.removeEventListener("resize", handleResize);
  }, [isLoaded, images, frameIndex]);

  return (
    <div ref={containerRef} className="absolute top-0 left-0 h-[500vh] w-full z-0">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas
          ref={canvasRef}
          className="block w-full h-full object-cover"
        />
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#121212]">
            <p className="text-white/50 font-mono text-sm tracking-widest uppercase animate-pulse">Loading Assets...</p>
          </div>
        )}
      </div>
    </div>
  );
}
