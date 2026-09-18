export interface SkillItem {
  name: string;
  level: "Advanced" | "Proficient" | "Working";
  description: string;
  tools?: string[];
}

export interface SkillCategory {
  number: string;
  title: string;
  tagline: string;
  accentColor: string;
  skills: SkillItem[];
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    number: "01",
    title: "DATA ANALYTICS",
    tagline: "Exploration, normalization, and business intelligence",
    accentColor: "from-amber-500/20 to-orange-500/5",
    skills: [
      {
        name: "SQL & Query Optimization",
        level: "Advanced",
        description: "Complex CTEs, window functions (RANK, LAG/LEAD, SUM OVER), indexing strategies, and query plan profiling (EXPLAIN ANALYZE).",
        tools: ["PostgreSQL", "MySQL", "SQLite", "Star Schema"]
      },
      {
        name: "Python Data Wrangling",
        level: "Advanced",
        description: "High-throughput data manipulation, vectorization, handling ragged data, and memory-efficient chunking.",
        tools: ["Pandas", "NumPy", "Polars"]
      },
      {
        name: "Exploratory Data Analysis (EDA)",
        level: "Advanced",
        description: "Distribution inspection, missingness patterns, skewness correction, and correlation matrix analysis.",
        tools: ["Matplotlib", "Seaborn", "Plotly", "SciPy"]
      },
      {
        name: "Business Intelligence & KPIs",
        level: "Proficient",
        description: "Synthesizing raw event logs into retention cohorts, churn hazard rates, LTV matrices, and executive KPI summaries.",
        tools: ["Cohort Analysis", "RFM Segmentation", "A/B Testing"]
      }
    ]
  },
  {
    number: "02",
    title: "DATA SCIENCE",
    tagline: "Statistical modeling, feature engineering, and inference",
    accentColor: "from-emerald-500/20 to-teal-500/5",
    skills: [
      {
        name: "Feature Engineering & Preprocessing",
        level: "Advanced",
        description: "Target encoding with additive smoothing, rolling temporal windows, interaction terms, and dimensionality reduction.",
        tools: ["Scikit-Learn Pipelines", "PCA", "IQR Clipping"]
      },
      {
        name: "Predictive Machine Learning",
        level: "Advanced",
        description: "Formulating supervised learning pipelines: gradient boosted trees, calibrated probability estimators, and ensemble techniques.",
        tools: ["XGBoost", "LightGBM", "Random Forest", "Logistic Regression"]
      },
      {
        name: "Model Evaluation & Validation",
        level: "Advanced",
        description: "Stratified k-fold cross-validation, time-series split to prevent lookahead leakage, PR-AUC, ROC-AUC, Brier score calibration.",
        tools: ["Scikit-Learn Metrics", "Cross-Validation", "Optuna"]
      },
      {
        name: "Model Explainability (XAI)",
        level: "Proficient",
        description: "Local and global feature attribution using TreeSHAP and Partial Dependence Plots to explain 'black-box' decisions to stakeholders.",
        tools: ["SHAP", "Feature Permutation", "PDP"]
      }
    ]
  },
  {
    number: "03",
    title: "AI & COMPUTER VISION",
    tagline: "Deep neural networks, vision systems, and edge models",
    accentColor: "from-cyan-500/20 to-blue-500/5",
    skills: [
      {
        name: "PyTorch & Deep Learning",
        level: "Advanced",
        description: "Custom Dataset & DataLoader classes, modular nn.Module architectures, AMP FP16 mixed precision, and cosine learning rate schedules.",
        tools: ["PyTorch 2.x", "Torchvision", "CUDA"]
      },
      {
        name: "Computer Vision & Detection",
        level: "Advanced",
        description: "Real-time object detection (YOLOv5/v8 architectures), multi-scale feature pyramids (FPN/PANet), and spatial boundary regression.",
        tools: ["OpenCV", "YOLOv5", "Albumentations", "NMS"]
      },
      {
        name: "Transfer Learning & Fine-Tuning",
        level: "Proficient",
        description: "Discriminative layer-wise learning rates, backbone freezing, Grad-CAM spatial activation mapping, and Focal Loss calibration.",
        tools: ["ResNet-50", "EfficientNet", "Vision Transformers"]
      },
      {
        name: "Edge Model Optimization",
        level: "Proficient",
        description: "Post-training INT8/FP16 quantization, ONNX graph export, and runtime CPU/GPU latency optimization.",
        tools: ["ONNX Runtime", "TorchScript", "Quantization"]
      }
    ]
  },
  {
    number: "04",
    title: "ENGINEERING & DEPLOYMENT",
    tagline: "Microservices, containerization, and production APIs",
    accentColor: "from-purple-500/20 to-pink-500/5",
    skills: [
      {
        name: "FastAPI & REST Microservices",
        level: "Advanced",
        description: "Asynchronous async/await request handlers, Pydantic data contract validation, streaming responses, and WebSocket feeds.",
        tools: ["FastAPI", "Uvicorn", "Pydantic", "Flask"]
      },
      {
        name: "Docker & Containerization",
        level: "Proficient",
        description: "Multi-stage Docker builds, minimal non-root security contexts, Alpine/Distroless base images, and docker-compose configurations.",
        tools: ["Docker", "Docker Compose", "Multi-stage Builds"]
      },
      {
        name: "Model Serving & Queueing",
        level: "Proficient",
        description: "Decoupling high-frequency ingest from compute-heavy inference using in-memory queues and background thread workers.",
        tools: ["Redis", "Background Tasks", "Thread Pools"]
      },
      {
        name: "Developer Tooling & Environments",
        level: "Advanced",
        description: "Git version control, Linux CLI automation, bash scripting, virtual environments, and continuous code quality workflows.",
        tools: ["Git / GitHub", "Linux", "Bash", "VS Code / Antigravity"]
      }
    ]
  }
];
