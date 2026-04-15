export const facts = [
  { label: "Age",        value: "24" },
  { label: "Based In",   value: "Berlin, Germany" },
  { label: "University", value: "GISMA — Potsdam" },
  { label: "Degree",     value: "MSc Data Science & AI" },
  { label: "Available",  value: "Internship / Working Student" },
];

export const stats = [
  { num: "200+",  label: "Students Trained" },
  { num: "5+",    label: "ML Projects Shipped" },
  { num: "2+yrs", label: "Industry Experience" },
  { num: "9",     label: "Certifications" },
];

export const projects = [
  {
    num: "01",
    title: "BookVault",
    type: "GenAI Application",
    year: "2024",
    techs: ["Python", "RAG", "Docker", "OCR"],
    desc: "Dual-mode book discovery across a corpus of 10,000+ titles — natural language search via a custom RAG pipeline with semantic embeddings, plus OCR-based cover recognition from photo input.",
    color: "#00D9FF",
    github: "https://github.com/Simarjit1303/Projects/tree/main/Machine%20Learning/Bookvault_Project",
  },
  {
    num: "02",
    title: "Cyber Threat Detection",
    type: "ML Pipeline",
    year: "2024",
    techs: ["PyTorch", "NLP", "FastAPI"],
    desc: "End-to-end NLP classification pipeline across 15+ threat categories — cut analyst triage time by 40% (~3h/day per analyst). Deployed as a production REST API with FastAPI.",
    color: "#B794F6",
    github: "https://github.com/Simarjit1303/Projects/blob/main/Machine%20Learning/Cyber%20Threat%20Detection/Cyber_Threat_Detection.ipynb",
  },
  {
    num: "03",
    title: "Face Recognition Attendance",
    type: "Computer Vision",
    year: "2024",
    techs: ["OpenCV", "face_recognition", "Python"],
    desc: "Real-time attendance system recognising 50+ registered faces simultaneously from a live camera feed — eliminated 100% of manual roll-call entry for a 200-student cohort.",
    color: "#FF6B6B",
    github: "https://github.com/Simarjit1303/Projects/tree/main/Machine%20Learning/Face_Recognition_Attendence_System",
  },
  {
    num: "04",
    title: "Tomato Disease Detection",
    type: "Computer Vision",
    year: "2023",
    techs: ["TensorFlow", "OpenCV", "CNN"],
    desc: "Custom CNN trained on 54,000 images across 38 classes — achieved 98% test accuracy, then pruned and quantised for mobile deployment at <10MB model size.",
    color: "#FFB800",
    github: "https://github.com/Simarjit1303/Projects/blob/main/Machine%20Learning/Tomato%20Disease%20Detection/Tomato_Disease_Detection.ipynb",
  },
  {
    num: "05",
    title: "Adani Ports Stock Prediction",
    type: "Predictive Modelling",
    year: "2024",
    techs: ["Python", "Pandas", "Time-series"],
    desc: "Time-series analysis of 5 years of daily ADANIPORTS equity data — built ARIMA and LSTM models, compared forecast accuracy (RMSE), and surfaced 3 actionable market trend signals.",
    color: "#00FF88",
    github: "https://github.com/Simarjit1303/Projects/blob/main/Data%20Analytics/Adani%20Ports%20and%20SEZ%20Market%20Analysis/Adani_Ports_SEZ_Stock_Prediction.ipynb",
  },
  {
    num: "06",
    title: "EU Fossil Fuel Subsidies",
    type: "Data Visualization",
    year: "2024",
    techs: ["Python", "Plotly", "Pandas"],
    desc: "Interactive policy dashboard across 27 EU member states — visualising €110B+ in annual fossil fuel subsidies with country-level drill-down. Built for policy researchers and journalists.",
    color: "#00D9FF",
    github: "https://github.com/Simarjit1303/Projects/blob/main/Data%20Analytics/European%20Enivironment%20Agency%20Fossil%20Fuel%20Subsidy/EEA_Fossil_Fuel_Subsidy.ipynb",
  },
];

export const experiences = [
  {
    num: "01",
    role: "Junior Data Analyst & Python Instructor",
    company: "AISECT",
    location: "Chhattisgarh, India",
    duration: "July 2023 – September 2024",
    accent: "#00D9FF",
    bullets: [
      "Delivered 200+ hours of Python training (Pandas, NumPy, SQL, data visualization) to 50+ students",
      "Built Python scripts and Jupyter Notebooks for data cleaning, EDA, and predictive modelling across 5+ ML pilot projects",
      "Designed analytics curriculum covering ETL pipelines, feature engineering, statistical analysis, and SQL",
      "Built Excel and Google Sheets dashboards to track student performance, generating insights that improved pass rates",
      "Managed Git-based curriculum workflows for 50+ students, improving version control and reproducibility",
    ],
  },
  {
    num: "02",
    role: "Python Intern",
    company: "AISECT",
    location: "Chhattisgarh, India",
    duration: "July 2022 – December 2022",
    accent: "#B794F6",
    bullets: [
      "Assisted in Python lab sessions: debugging scripts and mentoring students",
      "Built automated grading scripts and reporting pipelines — saved instructors 10+ hours/week",
      "Contributed Python examples, data analysis case studies, and visualization workflows",
    ],
  },
];
