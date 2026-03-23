export default function Experience() {
  const experiences = [
    {
      role: "Junior Data Analyst & Python Instructor",
      company: "AISECT",
      location: "Chhattisgarh, India",
      duration: "July 2023 – September 2024",
      bullets: [
        "Delivered 200+ hours of Python training (Pandas, NumPy, SQL, data visualization) to 50+ students",
        "Built Python scripts and Jupyter Notebooks for data cleaning, EDA, and predictive modelling across 5+ ML pilot projects",
        "Designed analytics curriculum covering ETL pipelines, feature engineering, statistical analysis, and SQL",
        "Built Excel and Google Sheets dashboards to track student performance, generating insights that improved pass rates",
        "Managed Git-based curriculum workflows for 50+ students, improving version control and reproducibility"
      ]
    },
    {
      role: "Python Intern",
      company: "AISECT",
      location: "Chhattisgarh, India",
      duration: "July 2022 – December 2022",
      bullets: [
        "Assisted in Python lab sessions: debugging scripts and mentoring students",
        "Built automated grading scripts and reporting pipelines — saved instructors 10+ hours/week",
        "Contributed Python examples, data analysis case studies, and visualization workflows"
      ]
    }
  ];

  return (
    <section className="relative z-20 bg-[#121212] py-24 px-8 md:px-24">
      <div className="max-w-7xl mx-auto border-t border-white/10 pt-16">
        <h3 className="text-sm font-mono tracking-widest text-white/50 uppercase mb-16">
          Experience
        </h3>
        
        <div className="space-y-12">
          {experiences.map((exp, i) => (
            <div key={i} className="flex flex-col md:flex-row gap-4 md:gap-16 group">
              <div className="md:w-1/4 shrink-0">
                <p className="text-white/40 font-mono text-sm">{exp.duration}</p>
              </div>
              <div className="md:w-3/4 relative pb-8 md:pb-0 md:pl-8 md:border-l border-white/10 group-last:border-transparent">
                 <div className="hidden md:block absolute left-[-5px] top-1.5 w-2 h-2 rounded-full bg-white/20 group-hover:bg-white/60 transition-colors" />
                 <h4 className="text-2xl font-semibold text-white mb-1">{exp.role}</h4>
                 <p className="text-white/60 text-lg mb-6">{exp.company} — {exp.location}</p>
                 <ul className="space-y-3">
                   {exp.bullets.map((bullet, j) => (
                     <li key={j} className="text-white/70 leading-relaxed flex items-start gap-3">
                       <span className="text-white/30 mt-1.5 text-xs">▹</span>
                       <span>{bullet}</span>
                     </li>
                   ))}
                 </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
