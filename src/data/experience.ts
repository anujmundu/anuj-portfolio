export interface TimelineItem {
  period: string;
  role: string;
  organization: string;
  location: string;
  description: string[];
  technologies: string[];
  type: "Work" | "Education" | "Project Milestone";
}

export const TIMELINE: TimelineItem[] = [
  {
    period: "2023 — Present",
    role: "Python Backend & AI/ML Systems Engineer",
    organization: "Open-Source AI Engineering & Systems Development",
    location: "Bhopal, India",
    description: [
      "Architected production multimodal platforms (OmniForge) integrating Agentic RAG, neural vision, Celery-Redis distributed queues, and Kubernetes Helm deployments.",
      "Engineered clinical CADx suites (YOLOv5-CASP) with CBAM attention, ASPP context, and CoT3 transformers for automated pulmonary nodule localization.",
      "Built production workforce MLOps platforms (RetainAI) using FastAPI, PyTorch Tabular ResNet/VAE, TreeSHAP explainability, and Kolmogorov-Smirnov statistical drift detection.",
      "Developed high-reliability distributed task engines with decoupled worker daemons, Redis queues, and durable PostgreSQL state machines."
    ],
    technologies: ["Python", "FastAPI", "PyTorch", "Celery", "Redis", "PostgreSQL", "Docker", "Kubernetes", "TreeSHAP", "OpenCV"],
    type: "Work"
  },
  {
    period: "2023 — 2026",
    role: "Master of Computer Applications (MCA)",
    organization: "Maulana Azad National Institute of Technology (MANIT)",
    location: "Bhopal, Madhya Pradesh, India",
    description: [
      "Premier National Institute of Technology (NIT) curriculum covering Advanced Data Structures & Algorithms, Distributed Systems, Cloud Computing, Database Management Systems, Machine Learning, and Computer Vision.",
      "Authored research and engineering projects on Automated Multi-Modal Lung Nodule Detection using YOLOv5-CASP with attention mechanisms and real-time medical imaging workstations.",
      "Engineered end-to-end full-stack AI/ML systems including distributed worker queues, agentic reasoning microservices, and statistical diagnostic pipelines."
    ],
    technologies: ["Data Structures & Algorithms", "Distributed Systems", "Database Systems", "Machine Learning", "Deep Learning", "Python", "SQL", "Cloud Computing"],
    type: "Education"
  },
  {
    period: "2020 — 2023",
    role: "Bachelor of Science (Honours) in Computer Science",
    organization: "Guru Ghasidas Vishwavidyalaya (Central University)",
    location: "Bilaspur, Chhattisgarh, India",
    description: [
      "Graduated with First-Class Honours with core focus on Computer Science fundamentals, Object-Oriented Programming, Discrete Mathematics, and Relational Databases.",
      "Developed foundational algorithmic problem-solving capabilities, database schema design, and Linux systems administration.",
      "Implemented statistical data analysis, scientific computation, and machine learning models for academic research projects."
    ],
    technologies: ["Computer Science Fundamentals", "Data Structures", "C++", "Python", "SQL", "DBMS", "Operating Systems", "Discrete Mathematics"],
    type: "Education"
  }
];

export const PHILOSOPHY = [
  {
    number: "01",
    title: "Respect the Raw Data",
    description: "No model outperforms bad data. We invest 70% of engineering effort in rigorous cleaning, temporal integrity, and domain-informed feature transformations before touching neural weights."
  },
  {
    number: "02",
    title: "Occam's Razor in Modeling",
    description: "Start with strong, interpretable statistical baselines. Only introduce deep neural architectures when the complexity genuinely yields measurable, non-marginal real-world gains."
  },
  {
    number: "03",
    title: "Code Beyond the Notebook",
    description: "A model trapped in a Jupyter notebook is an experiment, not a system. Production excellence means low latency, strict API contracts, Docker isolation, and deterministic failure recovery."
  },
  {
    number: "04",
    title: "Explainability is Non-Negotiable",
    description: "Stakeholders and operators cannot trust what they cannot inspect. Every predictive decision should be accompanied by calibrated confidence intervals and attribution vectors."
  }
];
