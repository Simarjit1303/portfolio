"use client";

import { motion, Variants } from "framer-motion";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

export default function Skills() {
  const categories = [
    { name: "Programming",           accent: "#00D9FF", skills: "Python, SQL, R, C++, Google BigQuery, DAX" },
    { name: "AI & Machine Learning", accent: "#B794F6", skills: "Pandas, NumPy, Scikit-learn, TensorFlow, Keras, PyTorch, HuggingFace Transformers, OpenCV, XGBoost, NLP, Text Classification, ANN, CNN, RNN" },
    { name: "LLMs & Generative AI",  accent: "#00D9FF", skills: "OpenAI API, LangChain, LlamaIndex, RAG Architecture, Streamlit, FastAPI" },
    { name: "Cloud & DevOps",        accent: "#B794F6", skills: "AWS EC2, Google Cloud, Docker, Linux, Git, CI/CD, GitHub Actions, Cloudflare, Nginx" },
    { name: "Data Engineering",      accent: "#00D9FF", skills: "ETL pipeline design, Feature engineering, EDA, Time-series analysis, Data validation, Hyperparameter tuning, Cross-validation" },
    { name: "Business Intelligence", accent: "#B794F6", skills: "Power BI, Tableau, Matplotlib, Seaborn, Plotly, Excel, Google Sheets" },
    { name: "Databases",             accent: "#00D9FF", skills: "MySQL, SQLite, MongoDB, BigQuery" },
  ];

  const certifications = [
    { name: "Google AI Essentials",                               url: "https://www.coursera.org/account/accomplishments/specialization/HOM2AMDIQHE4" },
    { name: "Google AI",                                          url: "https://www.coursera.org/account/accomplishments/professional-cert/LUSNVR4VN7UW" },
    { name: "Google Gen AI Leader",                               url: "https://www.skills.google/public_profiles/814efbb9-3247-4f4f-b9bc-bcfbc646c2a9" },
    { name: "Google Prompting Essentials",                        url: "https://www.coursera.org/account/accomplishments/specialization/ZBMF3YY1VWOU" },
    { name: "Google Data Analytics",                              url: "https://www.coursera.org/account/accomplishments/professional-cert/U5LCGZHJT634" },
    { name: "100 Days of Code: The Complete Python Pro Bootcamp", url: "https://ude.my/UC-87e954c7-f3f1-47fc-b0d0-64b556c801d5" },
    { name: "Google Advanced Data Analytics",                     url: "https://www.coursera.org/professional-certificates/google-advanced-data-analytics", pending: true },
    { name: "Google Cloud Data Analytics",                        url: "https://www.coursera.org/professional-certificates/google-cloud-data-analytics-certificate", pending: true },
    { name: "Data Analyst in Power BI",                           url: "https://app.datacamp.com/learn/career-tracks/data-analyst-in-power-bi", pending: true },
  ];

  const currentlyLearning = [
    "LangChain & LlamaIndex",
    "Vector Databases (ChromaDB, Pinecone)",
    "MLflow & Experiment Tracking",
    "GitHub Actions & CI/CD",
    "Power BI (DataCamp Professional Path)",
    "Google Cloud Data Analytics",
  ];

  return (
    <section id="skills" className="relative z-20 py-28 px-8 md:px-24 overflow-hidden"
      style={{ background: "transparent" }}
    >
      {/* Top / bottom fades */}
      <div className="absolute inset-x-0 top-0 h-48 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, #121212 0%, transparent 100%)" }} />
      <div className="absolute inset-x-0 bottom-0 h-48 pointer-events-none"
        style={{ background: "linear-gradient(to top, #121212 0%, transparent 100%)" }} />

      {/* Decorative background number */}
      <div className="absolute top-8 right-8 text-[180px] font-black text-white/[0.025] leading-none select-none pointer-events-none">
        05
      </div>

      <div className="max-w-7xl mx-auto relative">

        <motion.div
          className="flex items-center justify-between border-t border-white/10 pt-5 mb-16"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <span className="text-[11px] font-mono tracking-[0.2em] text-white/60 uppercase">Skills & Certifications</span>
          <span className="text-[11px] font-mono tracking-[0.2em] text-white/60 uppercase">{categories.length} Categories</span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">

          {/* Tech Stack */}
          <div className="lg:col-span-2">
            <motion.h4
              className="text-xs font-mono tracking-[0.2em] uppercase mb-8"
              style={{ background: "linear-gradient(90deg, #ffffff, #00D9FF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            >
              Technical Stack
            </motion.h4>
            <motion.div
              className="space-y-7"
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
            >
              {categories.map((cat, i) => (
                <motion.div key={i} variants={fadeUp} className="group">
                  <h5 className="text-[10px] font-mono uppercase tracking-[0.18em] mb-3"
                    style={{ color: cat.accent, opacity: 0.7 }}>
                    {cat.name}
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.split(", ").map((skill, j) => (
                      <span
                        key={j}
                        className="text-xs text-white/65 bg-white/[0.04] border border-white/[0.07] rounded-full px-3.5 py-1.5 transition-all duration-300 font-mono hover:text-white"
                        onMouseEnter={e => (e.currentTarget.style.borderColor = `${cat.accent}40`)}
                        onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)")}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right column */}
          <motion.div
            className="space-y-12"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
          >

            {/* Certifications */}
            <motion.div
              variants={fadeUp}
              className="rounded-2xl border border-white/[0.07] p-6"
              style={{ backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)", background: "rgba(10,10,16,0.65)" }}
            >
              <h4 className="text-xs font-mono tracking-[0.2em] uppercase mb-5"
                style={{ background: "linear-gradient(90deg, #ffffff, #00D9FF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Certifications
              </h4>
              <ul className="space-y-3">
                {certifications.map((cert, i) => (
                  <li key={i} className="flex items-start gap-3 leading-relaxed">
                    <span className="shrink-0 mt-1.5 w-1 h-1 rounded-full bg-[#B794F6]/60" />
                    <div className="flex items-center gap-2 flex-wrap min-w-0">
                      <a
                        href={cert.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/55 text-xs font-mono hover:text-[#B794F6] transition-colors duration-200 leading-relaxed"
                      >
                        {cert.name} ↗
                      </a>
                      {cert.pending && (
                        <span className="text-[9px] font-mono tracking-[0.12em] uppercase px-2 py-0.5 rounded-full border border-[#FFB800]/30 text-[#FFB800]/70 bg-[#FFB800]/[0.05] shrink-0">
                          In Progress
                        </span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Currently Learning */}
            <motion.div
              variants={fadeUp}
              className="rounded-2xl border border-[#00D9FF]/10 p-6"
              style={{ backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)", background: "rgba(10,10,16,0.65)" }}
            >
              <h4 className="text-xs font-mono tracking-[0.2em] uppercase mb-5"
                style={{ background: "linear-gradient(90deg, #ffffff, #00D9FF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Currently Learning
              </h4>
              <ul className="space-y-3">
                {currentlyLearning.map((item, i) => (
                  <li key={i} className="text-white/55 text-xs flex items-start gap-3 leading-relaxed font-mono hover:text-white/80 transition-colors duration-200">
                    <span className="text-[#00D9FF]/60 mt-0.5 shrink-0 text-[10px]">→</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Languages */}
            <motion.div
              variants={fadeUp}
              className="rounded-2xl border border-white/[0.07] p-6"
              style={{ backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)", background: "rgba(10,10,16,0.65)" }}
            >
              <h4 className="text-xs font-mono tracking-[0.2em] text-white/55 uppercase mb-5">Languages</h4>
              <div className="space-y-0">
                {[
                  { lang: "English", badge: "C1", sub: "Professional" },
                  { lang: "German",  badge: "A2", sub: "B1 In Progress" },
                  { lang: "Hindi",   badge: null, sub: "Native" },
                  { lang: "Punjabi", badge: null, sub: "Native" },
                ].map(({ lang, badge, sub }) => (
                  <div key={lang} className="flex items-center justify-between py-3.5 border-b border-white/[0.05] last:border-0">
                    <span className="text-white/75 font-mono text-xs">{lang}</span>
                    <div className="flex items-center gap-2">
                      {badge && (
                        <span className="text-[9px] font-mono tracking-[0.12em] uppercase px-2 py-0.5 rounded-full border border-[#00D9FF]/30 text-[#00D9FF]/70 bg-[#00D9FF]/[0.05]">
                          {badge}
                        </span>
                      )}
                      <span className="text-white/40 text-[10px] font-mono tracking-[0.12em] uppercase">{sub}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}
