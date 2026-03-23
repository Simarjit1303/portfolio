export default function Projects() {
  const projects = [
    { title: "BookVault", tech: "Python, AI, Docker", desc: "GenAI Book Recommendation System offering dual-mode discovery via text or OCR." },
    { title: "EU Fossil Fuel Subsidies", tech: "Python, Plotly", desc: "Interactive policy analysis dashboard visualizing €110B+ in EU subsidies." },
    { title: "Cyber Threat Detection", tech: "PyTorch, NLP", desc: "End-to-end classification pipeline reducing analyst review time by 40%." },
    { title: "Tomato Disease Detection", tech: "TensorFlow, OpenCV", desc: "98% accuracy custom CNN optimized for mobile constraints." },
    { title: "Stock Performance Analysis", tech: "XGBoost, Tableau", desc: "EDA, time-series analysis, and predictive modelling for investment insights." }
  ];

  return (
    <section className="relative z-20 min-h-screen bg-[#121212] py-32 px-8 md:px-24">
      <div className="max-w-7xl mx-auto border-t border-white/10 pt-16">
        <h3 className="text-sm font-mono tracking-widest text-white/50 uppercase mb-16">
          Selected Works
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <div 
              key={i} 
              className="group relative p-8 rounded-2xl overflow-hidden backdrop-blur-md bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors duration-500 cursor-pointer"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                 <div className="absolute -inset-[100%] bg-gradient-to-r from-transparent via-white/5 to-transparent rotate-45 group-hover:animate-shine" />
              </div>

              <div className="h-48 md:h-64 mb-8 rounded-lg bg-black/50 border border-white/5 relative overflow-hidden flex items-center justify-center">
                 <p className="text-white/20 font-mono text-sm uppercase tracking-widest">Coming Soon</p>
              </div>

              <h4 className="text-2xl font-semibold text-white mb-2">{project.title}</h4>
              <p className="text-white/60 text-sm mb-6">{project.desc}</p>
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-white/40 border border-white/10 rounded-full px-3 py-1">
                  {project.tech}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
