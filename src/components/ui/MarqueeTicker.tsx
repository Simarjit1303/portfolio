"use client";

const ITEMS = [
  "Python", "PyTorch", "TensorFlow", "scikit-learn", "LangChain",
  "HuggingFace", "OpenCV", "FastAPI", "Docker", "AWS EC2",
  "SQL", "Power BI", "Plotly", "Pandas", "NumPy",
  "Next.js", "TypeScript", "Machine Learning", "GenAI", "NLP",
];

export default function MarqueeTicker() {
  const doubled = [...ITEMS, ...ITEMS];

  return (
    <div
      className="relative z-20 overflow-hidden border-t border-b border-white/[0.06] py-3.5 select-none"
      style={{ background: "rgba(8,8,12,0.72)" }}
    >
      <div
        className="flex gap-10 whitespace-nowrap will-change-transform hover:[animation-play-state:paused]"
        style={{ animation: "marquee 35s linear infinite" }}
      >
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center gap-10 flex-shrink-0">
            <span
              className="text-[10px] tracking-[0.22em] uppercase"
              style={{ fontFamily: "var(--font-code)", color: "rgba(255,255,255,0.28)" }}
            >
              {item}
            </span>
            <span style={{ color: "rgba(0,217,255,0.22)", fontSize: "8px" }}>◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
