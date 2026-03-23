export default function Skills() {
  const categories = [
    { name: "Programming", skills: "Python, SQL, R, C++, Google BigQuery, DAX" },
    { name: "AI & Machine Learning", skills: "Pandas, NumPy, Scikit-learn, TensorFlow, Keras, PyTorch, HuggingFace Transformers, OpenCV, XGBoost, NLP, Text Classification, ANN, CNN, RNN" },
    { name: "LLMs & Generative AI", skills: "OpenAI API, LangChain, LlamaIndex, RAG Architecture, Streamlit, FastAPI" },
    { name: "Cloud & DevOps", skills: "AWS EC2, Google Cloud, Docker, Linux, Git, CI/CD, GitHub Actions, Cloudflare, Nginx" },
    { name: "Data Engineering", skills: "ETL pipeline design, Feature engineering, EDA, Time-series analysis, Data validation, Hyperparameter tuning, Cross-validation" },
    { name: "Business Intelligence", skills: "Power BI, Tableau, Matplotlib, Seaborn, Plotly, Excel, Google Sheets" },
    { name: "Databases", skills: "MySQL, SQLite, MongoDB, BigQuery" },
  ];

  const certifications = [
    "PL-300: Microsoft Power BI Data Analyst (Microsoft)",
    "Google Advanced Data Analytics (Google)",
    "Google AI Professional Certificate (Google)",
    "Google Prompting Essentials (Google)",
    "Google Cloud Data Analytics (Google)",
    "Data Analyst in Power BI (DataCamp - In Progress)",
    "R Programming (Udemy)",
    "Introduction to Programming Using Python (Udemy)",
    "Google Data Analysis (Google Career Certificates)"
  ];

  const currentlyLearning = [
    "LangChain & LlamaIndex",
    "Vector Databases (ChromaDB, Pinecone)",
    "MLflow & Experiment Tracking",
    "GitHub Actions & CI/CD",
    "Power BI (DataCamp Professional Path)",
    "Google Cloud Data Analytics"
  ];

  return (
    <section className="relative z-20 bg-[#121212] py-24 px-8 md:px-24">
      <div className="max-w-7xl mx-auto border-t border-white/10 pt-16">
        <h3 className="text-sm font-mono tracking-widest text-white/50 uppercase mb-16">
          Skills & Certifications
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          
          {/* Tech Stack */}
          <div className="lg:col-span-2">
            <h4 className="text-xl font-semibold text-white mb-8">Technical Output</h4>
            <div className="space-y-8">
              {categories.map((cat, i) => (
                <div key={i}>
                  <h5 className="text-white/60 text-sm font-mono uppercase tracking-wider mb-3">{cat.name}</h5>
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.split(', ').map((skill, j) => (
                      <span key={j} className="text-sm text-white/80 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 hover:bg-white/10 transition-colors">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-16">
            
            {/* Certifications */}
            <div>
              <h4 className="text-xl font-semibold text-white mb-8">Certifications</h4>
              <ul className="space-y-3">
                {certifications.map((cert, i) => (
                  <li key={i} className="text-white/70 text-sm flex items-start gap-3 leading-relaxed">
                     <span className="text-white/30 mt-1 text-xs">▹</span>
                     <span>{cert}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Currently Learning */}
            <div>
              <h4 className="text-xl font-semibold text-white mb-8">Currently Learning</h4>
              <ul className="space-y-3">
                {currentlyLearning.map((item, i) => (
                  <li key={i} className="text-white/70 text-sm flex items-start gap-3 leading-relaxed">
                     <span className="text-white/30 mt-1 text-xs">▹</span>
                     <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Languages */}
            <div>
              <h4 className="text-xl font-semibold text-white mb-8">Languages</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                  <span className="text-white/80">English</span>
                  <span className="text-white/40 text-sm font-mono tracking-widest uppercase">Professional</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                  <span className="text-white/80">German</span>
                  <span className="text-white/40 text-sm font-mono tracking-widest uppercase">Basic</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
