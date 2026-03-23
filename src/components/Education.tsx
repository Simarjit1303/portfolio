export default function Education() {
  const education = [
    {
      degree: "MSc Data Science, AI & Digital Business",
      institution: "GISMA University of Applied Sciences",
      location: "Potsdam, Germany",
      duration: "September 2024 – Present"
    },
    {
      degree: "Bachelor of Computer Applications",
      institution: "Kalinga University",
      location: "Raipur, India",
      duration: "July 2020 – June 2023"
    }
  ];

  return (
    <section className="relative z-20 bg-[#121212] py-24 px-8 md:px-24">
      <div className="max-w-7xl mx-auto border-t border-white/10 pt-16">
        <h3 className="text-sm font-mono tracking-widest text-white/50 uppercase mb-16">
          Education
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           {education.map((edu, i) => (
             <div key={i} className="p-8 rounded-2xl backdrop-blur-md bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors duration-500">
               <p className="text-white/40 font-mono text-sm mb-4">{edu.duration}</p>
               <h4 className="text-2xl font-semibold text-white mb-2">{edu.degree}</h4>
               <p className="text-white/70 mb-1">{edu.institution}</p>
               <p className="text-white/50 text-sm">{edu.location}</p>
             </div>
           ))}
        </div>
      </div>
    </section>
  );
}
