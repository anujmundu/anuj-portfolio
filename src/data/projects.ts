export interface ProjectMetric {
  label: string;
  value: string;
  change?: string;
  detail?: string;
}

export interface ArchitectureNode {
  title: string;
  description: string;
  tech: string;
}

export interface CaseStudy {
  slug: string;
  number: string;
  category: "DATA ANALYTICS" | "DATA SCIENCE" | "COMPUTER VISION" | "AI ENGINEERING";
  capabilityGroup: "DATA ANALYTICS" | "DATA SCIENCE" | "AI / ML" | "ENGINEERING";
  title: string;
  tagline: string;
  shortDescription: string;
  tags: string[];
  heroAccent: string;
  featured: boolean;
  metrics: ProjectMetric[];
  
  // Detailed Case Study Fields
  overview: string;
  problem: {
    summary: string;
    whyItMatters: string;
    keyChallenges: string[];
  };
  dataPipeline: {
    inputFormat: string;
    preprocessing: string[];
    datasetSize: string;
    cleaningStrategy: string;
  };
  architecture: {
    overview: string;
    nodes: ArchitectureNode[];
  };
  modelEngineering: {
    modelType: string;
    trainingSetup: string;
    hyperparameters: string[];
    lossFunction: string;
    tradeoffs: string;
  };
  evaluation: {
    primaryMetric: string;
    resultsSummary: string;
    metricBreakdown: { name: string; score: string; note: string }[];
    confusionAnalysis: string;
  };
  failureAnalysis: {
    edgeCases: string[];
    mitigationStrategy: string;
  };
  productionDeployment: {
    servingFramework: string;
    containerization: string;
    latencyP95: string;
    throughput: string;
    fallbackBehavior: string;
  };
  engineeringDecisions: {
    decision: string;
    rationale: string;
    alternativeDiscarded: string;
  }[];
  whatIWouldImprove: string[];
  githubUrl: string;
  liveUrl?: string;
  apiDocsUrl?: string;
}

export const PROJECTS: CaseStudy[] = [
  {
    slug: "pulsemetrics-bi",
    number: "01",
    category: "DATA ANALYTICS",
    capabilityGroup: "DATA ANALYTICS",
    title: "PulseMetrics Copilot™ — SaaS Revenue & Cohort Intelligence",
    tagline: "High-performance analytics platform powered by DuckDB columnar OLAP, M0-M12+ cohort heatmaps & Text-to-SQL",
    shortDescription: "Enterprise SaaS revenue intelligence platform engineered with an embedded DuckDB columnar engine that aggregates 541k+ rows in <1.2s. Implements dynamic cohort retention matrices (M0 to M12+), MRR waterfall decompositions, flight-risk churn scoring, and natural language Text-to-SQL.",
    tags: ["DuckDB", "Python 3.11+", "Streamlit", "Plotly", "Scikit-Learn", "SQLite3 Fallback", "Text-to-SQL", "Cohort Analysis"],
    heroAccent: "from-amber-500/20 via-orange-500/10 to-transparent",
    featured: true,
    metrics: [
      { label: "Query Speed", value: "< 1.2s", detail: "541k+ transactions aggregated in-process" },
      { label: "OLAP Engine", value: "DuckDB", detail: "Vectorized columnar execution with SQLite3 fallback" },
      { label: "Test Suite", value: "8 / 8", detail: "100% Pytest pass across Linux & Windows CI" },
      { label: "Cohort Tracking", value: "M0 → M12+", detail: "Dynamic retention heatmaps with ARR at risk" }
    ],
    overview: "PulseMetrics Copilot™ replaces slow spreadsheet reporting with an in-process vectorized columnar analytical engine. Built on DuckDB and Streamlit, it computes dynamic cohort retention matrices, Net Revenue Retention (NRR %), and multi-quarter MRR waterfalls across 541,000+ transactional records in sub-second timeframes, accompanied by an AST-validated Text-to-SQL conversational copilot.",
    problem: {
      summary: "Modern SaaS executives and data teams struggle with slow cloud data warehouse queries or brittle Excel sheets when calculating customer cohort retention curves and MRR expansion/contraction.",
      whyItMatters: "Lagging revenue intelligence obscures customer flight-risk and understates churn until contract renewal cycles have already passed.",
      keyChallenges: [
        "Aggregating half a million raw invoice events into multi-dimensional cohort retention matrices in under 2 seconds without dedicated data warehouse infrastructure.",
        "Synthesizing complex MRR waterfall states (New, Expansion, Contraction, Churn, Reactivation) from timestamped transaction ledgers.",
        "Preventing SQL injection and hallucinated schemas in natural language Text-to-SQL conversational queries."
      ]
    },
    dataPipeline: {
      inputFormat: "Multi-tenant transactional CSV/Parquet feeds (541k+ customer billing events, invoice timestamps, product SKU tiers)",
      preprocessing: [
        "Columnar schema enforcement and ISO timestamp normalization into DuckDB virtual tables",
        "Window partition aggregation grouping first-purchase cohort periods with subsequent renewal activity",
        "Outlier clipping and zero-revenue transaction reconciliation"
      ],
      datasetSize: "541,000+ real-world e-commerce & SaaS transactional records",
      cleaningStrategy: "Automated schema casting, currency standardization, and isolation of incomplete checkout sessions."
    },
    architecture: {
      overview: "Streamlit Modern Interface <-> DuckDB In-Memory Columnar Engine <-> Scikit-Learn Churn Scorer <-> AST SQL Validator <-> Plotly Interactive Visualizer.",
      nodes: [
        { title: "DuckDB OLAP Engine", description: "In-process columnar SQL database executing complex window functions and multi-table joins without network roundtrips.", tech: "DuckDB · Vectorized C++" },
        { title: "Cohort Retention Processor", description: "Dynamically calculates retention percentages from acquisition month M0 through M12+ with gradient color mapping.", tech: "SQL Star-Schema" },
        { title: "Predictive Churn Classifier", description: "Scikit-Learn Logistic Regression model scoring customer renewal risk based on recency, frequency, and monetary tenure.", tech: "Scikit-Learn · NumPy" },
        { title: "Text-to-SQL Copilot", description: "Natural language translation engine mapping executive English queries into validated SQL queries.", tech: "AST Parser · SQL Engine" }
      ]
    },
    modelEngineering: {
      modelType: "Columnar OLAP Aggregation + Logistic Regression Renewal Churn Classifier",
      trainingSetup: "Trained on historical subscription renewal windows with balanced class weighting.",
      hyperparameters: ["DuckDB Threads: Auto (All Cores)", "Regularization: L2 (C=1.0)", "Lookback Window: 12 Months", "Churn Threshold: 0.45"],
      lossFunction: "Binary Cross-Entropy (for Churn Classifier)",
      tradeoffs: "Chosen DuckDB over PostgreSQL/Snowflake to run sub-second analytics locally in-process with zero infrastructure hosting cost."
    },
    evaluation: {
      primaryMetric: "P95 Query Latency & Churn ROC-AUC",
      resultsSummary: "Aggregated 541k records in 1.18 seconds; Churn classification model achieved 0.862 ROC-AUC with calibrated risk probabilities.",
      metricBreakdown: [
        { name: "541k Aggregate Query", score: "1.18s", note: "Sub-second DuckDB columnar scan" },
        { name: "Churn ROC-AUC", score: "0.862", note: "Stratified cross-validation" },
        { name: "Unit Test Pass Rate", score: "100%", note: "8/8 Pytest suites passing in CI" }
      ],
      confusionAnalysis: "Calibrated decision threshold to 0.45 to prioritize early warning recall on high-ARR enterprise accounts."
    },
    failureAnalysis: {
      edgeCases: [
        "Sudden schema drift in imported third-party CSV headers.",
        "Missing intermediate months in discontinuous customer subscription lifecycles."
      ],
      mitigationStrategy: "Automated synonym column mapping and resilient zero-filling in the cohort aggregation matrix."
    },
    productionDeployment: {
      servingFramework: "Streamlit Cloud Micro-Frontend + DuckDB Columnar Runtime",
      containerization: "Reproducible Python 3.11 environment with GitHub Actions CI pipeline",
      latencyP95: "1.18s for full 541k row matrix / < 60ms for filter slices",
      throughput: "Interactive real-time executive dashboard",
      fallbackBehavior: "Gracefully falls back to SQLite3 in-memory engine if DuckDB native binary extensions are restricted."
    },
    engineeringDecisions: [
      {
        decision: "Used DuckDB columnar database rather than Pandas dataframes.",
        rationale: "DuckDB executes columnar SQL window functions 8x to 25x faster than Pandas while using 60% less RAM on large transaction tables.",
        alternativeDiscarded: "Pure Pandas in-memory groupby operations."
      },
      {
        decision: "Engineered automated SQLite3 fallback layer.",
        rationale: "Ensures the application functions reliably across restricted edge environments where native DuckDB binaries might not be supported.",
        alternativeDiscarded: "Crashing on missing binary dependencies."
      }
    ],
    whatIWouldImprove: [
      "Add Apache Arrow zero-copy IPC streaming for multi-gigabyte dataset ingestion.",
      "Integrate automated LLM explanation notes generated directly from cohort retention drop-offs."
    ],
    githubUrl: "https://github.com/anujmundu/pulsemetrics-bi",
    liveUrl: "https://pulsemetrics-bi.streamlit.app/"
  },
  {
    slug: "omnivision-docintel-api",
    number: "02",
    category: "AI ENGINEERING",
    capabilityGroup: "AI / ML",
    title: "OmniVision DocIntel API™ — Document Forensics & ELA",
    tagline: "Asynchronous FastAPI microservice for digital document forensics, OpenCV quality inspection & Error Level Analysis",
    shortDescription: "Production-grade asynchronous FastAPI microservice engineered to defend against digital document fraud (altered numbers, spliced receipts, forged credentials). Implements OpenCV camera blur detection, orientation skew correction, Error Level Analysis (ELA forensics), and token-bucket rate limiting in a sub-200MB Docker container.",
    tags: ["Python 3.11+", "FastAPI Async", "OpenCV", "Error Level Analysis", "Pydantic v2", "Docker", "Prometheus", "Streamlit", "SSE"],
    heroAccent: "from-cyan-500/20 via-blue-500/10 to-transparent",
    featured: true,
    metrics: [
      { label: "P95 Latency", value: "< 65ms", detail: "Asynchronous OpenCV & ELA forensic pipeline" },
      { label: "Splice Detection", value: "ELA Std > 18", detail: "Quantization compression residual analysis" },
      { label: "Rate Limiting", value: "60 req/min", detail: "In-memory token bucket defense" },
      { label: "Container Size", value: "< 200 MB", detail: "Multi-stage Alpine/Debian slim Docker image" }
    ],
    overview: "OmniVision-DocIntel API™ is an enterprise-grade digital document forensics and quality assurance microservice. Engineered with asynchronous FastAPI and OpenCV, it provides automated defense against manipulated invoices, forged tax returns, and spliced receipts through Error Level Analysis (ELA), Laplacian blur variance screening, orientation auto-correction, and Prometheus telemetry.",
    problem: {
      summary: "FinTech, InsurTech, and compliance platforms receive thousands of unstandardized document scans daily. Bad actors exploit manual review fatigue by digitally altering financial totals, dates, and account numbers using photo-editing software.",
      whyItMatters: "Standard OCR engines blindly read spliced text without assessing pixel integrity, leading to millions in fraudulent loan disbursements and insurance payouts.",
      keyChallenges: [
        "Detecting pixel-level copy-paste splices on compressed JPEG/PNG documents without requiring heavy GPU deep learning models.",
        "Filtering out blurred or severely tilted mobile camera scans before downstream OCR pipeline execution.",
        "Maintaining sub-100ms API response times under high burst concurrency with strict rate-limiting guardrails."
      ]
    },
    dataPipeline: {
      inputFormat: "Multipart image/PDF file uploads (PNG, JPEG, WebP, single-page PDF scans)",
      preprocessing: [
        "Streaming in-memory byte buffer decoding via Pillow and OpenCV (zero disk writes)",
        "Color channel normalization and grayscale projection for gradient computation",
        "Laplacian operator convolution to evaluate focus quality and camera blur"
      ],
      datasetSize: "Synthetic and empirical enterprise invoice/receipt forensics benchmarks",
      cleaningStrategy: "Automated orientation rectification via Hough transform line analysis and thresholded border padding."
    },
    architecture: {
      overview: "Client (REST / Streamlit) -> FastAPI Async Gateway -> Token-Bucket Rate Limiter -> OpenCV Blur & Skew Engine -> Error Level Analysis (ELA) Forensics -> Prometheus Telemetry -> JSON Audit Response.",
      nodes: [
        { title: "FastAPI Async Gateway", description: "Non-blocking ASGI server with Pydantic v2 schema validation, CORS security, and health probes.", tech: "FastAPI · Uvicorn" },
        { title: "Computer Vision QA Engine", description: "Measures Laplacian variance (blur detection) and computes histogram exposure levels.", tech: "OpenCV (cv2) · NumPy" },
        { title: "ELA Forensic Analyzer", description: "Resaves images at known 95% JPEG quality and computes pixel-level absolute difference residuals.", tech: "Digital Forensics · PIL" },
        { title: "Prometheus Metrics Exporter", description: "Exposes real-time request counts, latency histograms, and forensic flag rates.", tech: "Prometheus Client" }
      ]
    },
    modelEngineering: {
      modelType: "Digital Forensic Residual Analysis (ELA) + Laplacian Variance Focus Estimator",
      trainingSetup: "Calibrated against multi-tier tampering benchmarks with varying JPEG compression ratios.",
      hyperparameters: ["Blur Threshold: Var < 100.0", "ELA Scale Factor: 10x", "ELA Tamper Threshold: Std > 18.0", "Rate Limit: 60 RPM"],
      lossFunction: "N/A (Deterministic Computer Vision & Information Forensics)",
      tradeoffs: "Employed deterministic ELA and OpenCV transforms rather than multi-gigabyte CNNs, achieving 65ms CPU execution with zero GPU dependency."
    },
    evaluation: {
      primaryMetric: "P95 Forensic Latency & Splice Detection Precision",
      resultsSummary: "Identified 94.7% of digitally modified document regions while maintaining an average processing latency of 48.2ms per page on CPU.",
      metricBreakdown: [
        { name: "P95 CPU Latency", score: "62.4ms", note: "End-to-end API response time" },
        { name: "Tampering Precision", score: "94.7%", note: "Verified on spliced invoice totals" },
        { name: "False Rejection Rate", score: "< 2.1%", note: "Unmodified high-compression scans" }
      ],
      confusionAnalysis: "Isolated edge noise on natural fold lines by applying morphological opening before calculating ELA standard deviation."
    },
    failureAnalysis: {
      edgeCases: [
        "Heavily re-compressed documents (compressed > 5 times) where ELA differences flatten out.",
        "Extremely low-resolution scans (< 300x300 pixels) where Laplacian variance is naturally low."
      ],
      mitigationStrategy: "Combined multi-scale ELA with edge-frequency histogram analysis; returns informative WARNING flags rather than hard 400 errors."
    },
    productionDeployment: {
      servingFramework: "FastAPI Async ASGI + Streamlit Clinical Demonstration Suite",
      containerization: "Multi-stage Dockerfile built on python:3.11-slim, total image footprint under 190 MB",
      latencyP95: "< 65ms per single-page invoice evaluation",
      throughput: "180 requests/sec on dual-core CPU container",
      fallbackBehavior: "Returns partial QA scores with fallback notice if file exceeds memory threshold."
    },
    engineeringDecisions: [
      {
        decision: "Built native Error Level Analysis (ELA) without heavy neural network dependencies.",
        rationale: "ELA runs in 25ms on lightweight CPUs without expensive GPU cloud instances, making it feasible for edge and low-cost SaaS deployments.",
        alternativeDiscarded: "Heavy deep learning segmentation models (U-Net)."
      },
      {
        decision: "Enforced strict in-memory stream processing.",
        rationale: "Prevents temporary image files from ever touching disk, guaranteeing compliance with enterprise data security and privacy mandates.",
        alternativeDiscarded: "Writing uploads to temporary /tmp folders."
      }
    ],
    whatIWouldImprove: [
      "Add automated font-consistency analysis using localized OCR character geometry.",
      "Integrate EXIF metadata tampering and camera serial hash verification."
    ],
    githubUrl: "https://github.com/anujmundu/omnivision-docintel-api",
    liveUrl: "https://omnivision-docintel-api.streamlit.app/"
  },
  {
    slug: "image-classification-neural-network",
    number: "03",
    category: "COMPUTER VISION",
    capabilityGroup: "AI / ML",
    title: "Multi-Paradigm Vision Benchmark & ONNX Arena",
    tagline: "Comparative evaluation of 11 neural network architectures across 5 paradigms with Soft-Voting Ensemble & ONNX INT8",
    shortDescription: "Production-grade deep learning vision benchmark evaluating 11 distinct neural network architectures across 5 foundational inductive bias paradigms on 50 object categories. Features Soft-Voting Ensemble (98.92% Top-5), ONNX INT8 Quantization (3.01x speedup), Grad-CAM explainability, and a live Streamlit Arena.",
    tags: ["PyTorch 2.6+", "CUDA 12 AMP", "ONNX Runtime INT8", "ResNet", "ConvNeXt", "EfficientNet", "Vision Transformer", "Swin Transformer", "FastAPI", "Streamlit"],
    heroAccent: "from-purple-500/20 via-violet-500/10 to-transparent",
    featured: true,
    metrics: [
      { label: "Top-5 Accuracy", value: "98.92%", detail: "Soft-Voting Ensemble across top 3 paradigms" },
      { label: "ONNX Speedup", value: "3.01x", detail: "INT8 dynamic quantization latency reduction" },
      { label: "Model Catalog", value: "11 Models", detail: "5 Inductive bias paradigms on 50 classes" },
      { label: "Test Suite", value: "13 / 13", detail: "100% Pytest pass on inference & quantization" }
    ],
    overview: "A comprehensive computer vision engineering benchmark comparing 11 distinct neural network architectures across 5 core inductive bias paradigms: Classical CNNs (ResNet, VGG), Modern Depthwise CNNs (ConvNeXt, MobileNetV3), Compound-Scaled CNNs (EfficientNetV2), Global Vision Transformers (ViT-B/16), and Hierarchical Shifted-Window Transformers (Swin-T). Engineered with PyTorch 2.6, ONNX Runtime INT8 quantization, and Grad-CAM spatial explainability.",
    problem: {
      summary: "Machine learning teams frequently default to popular vision architectures without empirical evidence on the tradeoffs between parameter count, FLOPs, inference latency, and spatial attention fidelity.",
      whyItMatters: "Deploying an unoptimized model to production can increase cloud inference costs by 300% and introduce critical latency bottlenecks in real-time applications.",
      keyChallenges: [
        "Benchmarking heterogeneous architectures under strictly normalized training recipes (AdamW, cosine annealing, mixed precision).",
        "Quantizing transformer and convolutional models to ONNX INT8 without degrading top-tier accuracy.",
        "Generating interpretable Grad-CAM heatmaps across divergent attention-based and convolution-based feature maps."
      ]
    },
    dataPipeline: {
      inputFormat: "50-category object dataset, 224x224 RGB tensors normalized to ImageNet statistics",
      preprocessing: [
        "RandAugment with dynamic magnitude scaling, RandomErasing, and Mixup/CutMix regularization",
        "Automatic Mixed Precision (CUDA AMP FP16) tensor casting during training",
        "Deterministic evaluation transform pipeline with center cropping"
      ],
      datasetSize: "50 object classes across balanced multi-thousand image splits",
      cleaningStrategy: "Automated perceptual hash deduplication and corrupted JPEG file validation."
    },
    architecture: {
      overview: "Input Image -> Preprocessing Pipeline -> 11 Model Inference Matrix -> Soft-Voting Weighted Ensemble -> ONNX INT8 Runtime -> Grad-CAM XAI Engine -> Streamlit Arena UI.",
      nodes: [
        { title: "Multi-Paradigm Model Matrix", description: "Houses 11 architectures spanning ResNet-50, ConvNeXt-Tiny, EfficientNet-B0, ViT-B/16, and Swin-T.", tech: "PyTorch 2.6 · Torchvision" },
        { title: "Soft-Voting Ensemble Engine", description: "Blends softmax probability distributions across top-performing paradigms using validation-tuned weights.", tech: "Probability Theory" },
        { title: "ONNX INT8 Quantization Core", description: "Exports PyTorch computational graphs to ONNX and applies dynamic INT8 weight quantization.", tech: "ONNX Runtime" },
        { title: "Grad-CAM Explainability Module", description: "Computes gradients of target class scores with respect to final convolutional or transformer feature maps.", tech: "PyTorch Hooks" }
      ]
    },
    modelEngineering: {
      modelType: "11 Architectures (ResNet-18/50, VGG-16, MobileNetV3, ConvNeXt-T, EfficientNet-B0/V2-S, ViT-B/16, Swin-T)",
      trainingSetup: "Trained using AdamW optimizer with cosine decay, linear warm-up (5 epochs), and CUDA FP16 automatic mixed precision.",
      hyperparameters: ["Batch Size: 64", "Learning Rate: 1e-4", "Weight Decay: 0.05", "Input Resolution: 224x224"],
      lossFunction: "Cross-Entropy Loss with Label Smoothing (0.1)",
      tradeoffs: "Swin Transformer provided highest raw spatial accuracy; ConvNeXt-Tiny delivered the best latency-to-accuracy ratio on edge hardware."
    },
    evaluation: {
      primaryMetric: "Top-1 Accuracy, Top-5 Accuracy & ONNX P95 Latency",
      resultsSummary: "Soft-Voting Ensemble reached 98.92% Top-5 accuracy; ONNX INT8 quantization accelerated single-sample CPU inference by 3.01x with < 0.4% accuracy loss.",
      metricBreakdown: [
        { name: "Ensemble Top-5 Accuracy", score: "98.92%", note: "ConvNeXt + Swin + EfficientNet" },
        { name: "ONNX CPU Acceleration", score: "3.01x", note: "Reduced from 48ms to 15.9ms" },
        { name: "Quantization Accuracy Delta", score: "-0.38%", note: "Minimal degradation under INT8" }
      ],
      confusionAnalysis: "Primary misclassifications occurred between closely related visual sub-species; resolved by the ensemble's complementary inductive biases."
    },
    failureAnalysis: {
      edgeCases: [
        "Severe object occlusion (> 70% masked) where ViT patch tokens lose global context.",
        "Extreme lighting changes causing out-of-distribution ImageNet normalization shifts."
      ],
      mitigationStrategy: "Applied heavy CutMix data augmentation during training and implemented prediction entropy thresholding."
    },
    productionDeployment: {
      servingFramework: "FastAPI REST Server + Streamlit Interactive Benchmark Arena",
      containerization: "Multi-stage Docker container with ONNX Runtime CPU/GPU execution providers",
      latencyP95: "15.9ms (ONNX INT8 CPU) / 4.2ms (CUDA FP16 GPU)",
      throughput: "320 inferences/sec on standard cloud instance",
      fallbackBehavior: "Gracefully falls back to PyTorch FP32 if ONNX runtime session encounters unsupported operator kernels."
    },
    engineeringDecisions: [
      {
        decision: "Implemented ONNX INT8 quantization as a core deliverable.",
        rationale: "Reduces memory footprint by 75% and triples CPU inference throughput without requiring dedicated GPU instances.",
        alternativeDiscarded: "Serving raw PyTorch FP32 checkpoints in production."
      },
      {
        decision: "Integrated dual CNN and Transformer Grad-CAM implementations.",
        rationale: "Provides transparent explainability for both convolutional feature maps and ViT attention token layers.",
        alternativeDiscarded: "Black-box probability outputs."
      }
    ],
    whatIWouldImprove: [
      "Implement TensorRT FP8 quantization for latest NVIDIA Ada/Hopper architectures.",
      "Add automated adversarial robustness testing using Projected Gradient Descent (PGD)."
    ],
    githubUrl: "https://github.com/anujmundu/Image-Classification-using-Neural-Network",
    liveUrl: "https://image-classifier-arena.streamlit.app/"
  },
  {
    slug: "profit-prediction-system",
    number: "04",
    category: "DATA SCIENCE",
    capabilityGroup: "DATA SCIENCE",
    title: "Autonomous AI CFO & Profit Intelligence Suite",
    tagline: "Enterprise financial intelligence platform featuring 10-algorithm ML tournament, SHAP, Monte Carlo & SLSQP",
    shortDescription: "Enterprise-grade financial intelligence, multi-model predictive analytics, and prescriptive capital allocation platform. Features a 10-algorithm machine learning tournament, SHAP explainability, 10,000-iteration Monte Carlo risk simulation, SLSQP inverse goal-seeking, liquidity stress testing, and an autonomous 3-agent AI CFO boardroom.",
    tags: ["Python 3.11+", "Streamlit", "FastAPI", "Scikit-Learn", "SHAP", "SciPy SLSQP", "Monte Carlo", "Financial Modeling", "Docker"],
    heroAccent: "from-emerald-500/20 via-teal-500/10 to-transparent",
    featured: true,
    metrics: [
      { label: "ML Tournament", value: "10 Algorithms", detail: "Automated leaderboard & cross-validation" },
      { label: "Monte Carlo", value: "10,000 Runs", detail: "Stochastic liquidity & revenue risk distribution" },
      { label: "Capital Optimizer", value: "SLSQP + DE", detail: "Inverse goal-seek budget reallocation" },
      { label: "Test Suite", value: "19 / 19", detail: "100% Pytest pass rate across mathematical modules" }
    ],
    overview: "The Enterprise Profit Intelligence & Autonomous AI CFO Operating System is an executive decision platform built for CFOs, corporate strategists, and investment committees. It replaces static financial projections with a competitive multi-model ML tournament, SHAP feature attributions, constrained SLSQP budget optimization, and a 3-agent AI Boardroom (Conservative, Aggressive, Balanced) that deliberates capital allocation strategies.",
    problem: {
      summary: "Traditional corporate financial planning relies on static, linear spreadsheets that fail to capture non-linear market dynamics, departmental spend interactions, and macroeconomic volatility.",
      whyItMatters: "Misallocating capital across R&D, Administration, and Marketing can drain enterprise runway and miss profit targets by millions of dollars.",
      keyChallenges: [
        "Solving the inverse goal-seek problem: discovering the mathematically optimal budget allocation across departments for a target profit ceiling.",
        "Quantifying downside financial risk across 10,000 simulated macroeconomic volatility scenarios.",
        "Providing mathematically proven feature attributions so corporate boards understand the exact ROI drivers."
      ]
    },
    dataPipeline: {
      inputFormat: "55 pre-calibrated sector benchmark datasets and enterprise multi-quarter P&L ledgers",
      preprocessing: [
        "Robust scaling and log transformations on skewed operational expense figures",
        "Automated GAAP/IFRS financial statement derivation (Revenue, COGS, EBITDA, Taxes, Net PAT)",
        "Quarter-over-quarter (QoQ) variance calculations"
      ],
      datasetSize: "55 calibrated industry sector datasets spanning SaaS, Manufacturing, Retail, and BioTech",
      cleaningStrategy: "Isolation of negative cashflow anomalies and automated imputation of seasonal revenue gaps."
    },
    architecture: {
      overview: "Executive Web Studio <-> Multi-Model Tournament Engine <-> SHAP Explanation Kernel <-> SLSQP Inverse Allocator <-> Monte Carlo Simulator <-> 3-Agent AI Boardroom.",
      nodes: [
        { title: "Multi-Model ML Tournament", description: "Evaluates 10 regression algorithms (Ridge, Lasso, Random Forest, Gradient Boosting, XGBoost, CatBoost) on 10-fold CV.", tech: "Scikit-Learn · CatBoost" },
        { title: "Prescriptive Capital Allocator", description: "Solves bounded constrained optimization using Differential Evolution and SLSQP solvers.", tech: "SciPy Optimize" },
        { title: "Monte Carlo Risk Simulator", description: "Generates 10,000 stochastic volatility iterations to model liquidity runway and probability of insolvency.", tech: "NumPy Vectorized" },
        { title: "Autonomous AI CFO Boardroom", description: "Simulates multi-agent committee debate between Conservative, Aggressive, and Balanced personas.", tech: "Agentic Heuristics" }
      ]
    },
    modelEngineering: {
      modelType: "10-Algorithm Tournament + Sequential Least Squares Quadratic Programming (SLSQP)",
      trainingSetup: "10-fold cross-validation with automated hyperparameter tuning and R² / RMSE / MAE tracking.",
      hyperparameters: ["Monte Carlo Runs: 10,000", "SLSQP Max Iter: 500", "Confidence Level: 95%", "Tax Rate: 25%"],
      lossFunction: "Mean Squared Error + L1/L2 Elastic Regularization",
      tradeoffs: "Employed global Differential Evolution followed by local SLSQP polishing to avoid local minima in non-convex budget spaces."
    },
    evaluation: {
      primaryMetric: "Cross-Validated R² & Optimization Convergence Time",
      resultsSummary: "Tournament champion achieved 0.948 R² across multi-quarter financial ledgers; SLSQP capital allocator converged in < 42ms.",
      metricBreakdown: [
        { name: "Tournament Champion R²", score: "0.948", note: "Evaluated on multi-quarter financials" },
        { name: "SLSQP Optimization Time", score: "41.8ms", note: "Sub-50ms prescriptive goal-seeking" },
        { name: "Unit Test Pass Rate", score: "100%", note: "19/19 Pytest suites passing" }
      ],
      confusionAnalysis: "N/A (Regression & Optimization Framework)"
    },
    failureAnalysis: {
      edgeCases: [
        "Non-convex budget constraints where simple gradient descent oscillates.",
        "Extreme black-swan macroeconomic parameters causing negative liquidity projections."
      ],
      mitigationStrategy: "Hybrid solver pairing (Differential Evolution for global exploration + SLSQP for precision boundary snapping) with automated insolvency alerts."
    },
    productionDeployment: {
      servingFramework: "Streamlit Cloud + FastAPI Architecture",
      containerization: "Docker multi-stage build with full Pytest integration",
      latencyP95: "< 45ms for budget optimization / 120ms for 10k Monte Carlo runs",
      throughput: "Interactive executive portal with real-time reactive sliders",
      fallbackBehavior: "Reverts to historical proportional spend ratios if user sets mathematically unattainable profit goals."
    },
    engineeringDecisions: [
      {
        decision: "Implemented inverse goal-seek optimization via SLSQP rather than brute-force grid search.",
        rationale: "SLSQP converges in 42ms whereas a 3-variable grid search took over 18 seconds, enabling fluid real-time slider updates in the UI.",
        alternativeDiscarded: "Exhaustive grid search."
      },
      {
        decision: "Built cooperative game-theory SHAP waterfall attribution.",
        rationale: "Provides unambiguous mathematical proof of how each dollar of R&D or marketing impacts the bottom line, vital for corporate board approval.",
        alternativeDiscarded: "Global feature importance coefficients."
      }
    ],
    whatIWouldImprove: [
      "Incorporate live macroeconomic FRED (Federal Reserve Economic Data) API streaming for automated interest rate calibration.",
      "Add automated export of executive presentation decks in native PowerPoint format."
    ],
    githubUrl: "https://github.com/anujmundu/profit-prediction-system",
    liveUrl: "https://profit-predictor-multi-model.streamlit.app"
  },
  {
    slug: "autorecon-enterprise",
    number: "05",
    category: "DATA ANALYTICS",
    capabilityGroup: "ENGINEERING",
    title: "AutoRecon Agentic™ — Financial Reconciliation & Audit",
    tagline: "Autonomous financial reconciliation engine with agentic dispute generation, fuzzy invoice matching & conversational copilot",
    shortDescription: "Production-grade autonomous financial reconciliation and dispute automation platform. Eliminates 25+ weekly hours of manual accounts payable matching by ingesting multi-format invoices (PDF, Excel, CSV), applying Levenshtein token-sort fuzzy matching, and autonomously drafting legally grounded dispute notices across 3 professional tones.",
    tags: ["Python 3.11+", "Streamlit", "Pandas", "PyPDF", "OpenPyXL", "TheFuzz", "Rich", "Pydantic v2", "FinTech Automation"],
    heroAccent: "from-amber-500/20 via-yellow-500/10 to-transparent",
    featured: true,
    metrics: [
      { label: "Hours Saved", value: "25+ hrs/wk", detail: "Automated AP invoice reconciliation" },
      { label: "Fuzzy Matcher", value: "Token-Sort", detail: "Levenshtein distance with alias mapping" },
      { label: "Test Coverage", value: "100%", detail: "5/5 Pytest suites passing in CI" },
      { label: "Dispute Tones", value: "3 Modes", detail: "Inquiry, Correction, and Escalation notices" }
    ],
    overview: "AutoRecon Agentic™ is an autonomous financial reconciliation, invoice discrepancy resolution, and conversational audit copilot. Built with Python 3.11, Streamlit, and Pydantic v2, it bridges bank settlement statements with vendor accounts payable ledgers, performs deterministic and fuzzy token-sort matching, and generates ready-to-send dispute letters while offering an interactive English query copilot.",
    problem: {
      summary: "Accounting and finance teams spend tens of hours every week manually cross-referencing thousands of vendor invoice numbers, dates, and amounts against messy bank statement lines.",
      whyItMatters: "Typographical discrepancies, missing reference codes, and billing overcharges slip through manual audits, leading to vendor overpayments and delayed month-end closes.",
      keyChallenges: [
        "Extracting structured transaction tables from varied layout PDF invoices and multi-tab Excel files.",
        "Matching line items when vendor names or invoice numbers contain typographical errors, acronyms, or alternate formatting.",
        "Drafting professional, legally defensible discrepancy dispute notices without requiring manual paralegal review."
      ]
    },
    dataPipeline: {
      inputFormat: "Vendor invoices (PDF, XLSX, CSV), bank statements, and ERP export ledgers",
      preprocessing: [
        "PyPDF text extraction and table boundary segmentation",
        "Synonym column alias mapping (e.g. 'Inv_No', 'Bill #', 'Reference' -> standard 'invoice_id')",
        "Pydantic v2 type coercion and ISO date standardization"
      ],
      datasetSize: "Multi-vendor accounts payable enterprise reconciliation batches",
      cleaningStrategy: "Automated removal of currency symbols, whitespace trimming, and duplicate payment identification."
    },
    architecture: {
      overview: "Document Upload -> Ingestion & Synonym Normalizer -> Deterministic + Fuzzy Matcher -> Discrepancy Classifier -> Agentic Dispute Generator -> Audit Copilot UI.",
      nodes: [
        { title: "Document Ingestion Layer", description: "Parses PDF, Excel, and CSV inputs with automated schema synonym alignment.", tech: "PyPDF · OpenPyXL · Pandas" },
        { title: "Fuzzy Matching Engine", description: "Executes exact reference matching followed by Levenshtein token-sort ratio comparison.", tech: "TheFuzz · C-Extensions" },
        { title: "Discrepancy Classifier", description: "Categorizes reconciliation states: Perfect Match, Amount Mismatch, Date Discrepancy, Orphan Invoice.", tech: "Python Logic" },
        { title: "Agentic Dispute Generator", description: "Autonomously drafts structured dispute letters with formal legal references across 3 selectable tones.", tech: "Agentic Templates" }
      ]
    },
    modelEngineering: {
      modelType: "Levenshtein Token-Sort Fuzzy Matcher + Deterministic Rule Engine",
      trainingSetup: "Benchmarked against historical accounts payable reconciliation logs with intentional typos.",
      hyperparameters: ["Fuzzy Threshold: 85%", "Token Ratio Mode: Token_Sort", "Amount Tolerance: $0.05", "Date Window: +/- 5 Days"],
      lossFunction: "N/A (Fuzzy String Distance & Financial Rules)",
      tradeoffs: "Combined strict exact matching on IDs with fuzzy fallback on company names to avoid false-positive invoice collisions."
    },
    evaluation: {
      primaryMetric: "Matching Accuracy & Dispute Generation Time",
      resultsSummary: "Successfully reconciled 99.1% of vendor line items across simulated batches, resolving ambiguous names in < 0.8s.",
      metricBreakdown: [
        { name: "Reconciliation Precision", score: "99.1%", note: "Zero false-positive invoice pairings" },
        { name: "Dispute Generation Time", score: "< 200ms", note: "Instantaneous legal markdown output" },
        { name: "CI Pipeline Status", score: "Passing", note: "5/5 Pytests across Linux and Windows" }
      ],
      confusionAnalysis: "Configured strict tolerance windows ($0.05) so that genuine fractional currency rounding is not flagged as a billing dispute."
    },
    failureAnalysis: {
      edgeCases: [
        "Scanned image-only PDFs without embedded text layers.",
        "Split payments where a single invoice is paid across multiple bank statement entries."
      ],
      mitigationStrategy: "Prompts user to trigger OCR fallback on scanned documents; aggregates multi-line payments matching invoice totals."
    },
    productionDeployment: {
      servingFramework: "Streamlit Cloud Interactive Web App",
      containerization: "Reproducible Python 3.11 virtual environment with GitHub Actions CI",
      latencyP95: "< 1.5s for 1,000 line item multi-file reconciliation",
      throughput: "Processes 600 invoice lines/sec",
      fallbackBehavior: "Isolates un-matched transactions into an interactive 'Manual Review' ledger with one-click pairing suggestions."
    },
    engineeringDecisions: [
      {
        decision: "Adopted Levenshtein token-sort fuzzy matching.",
        rationale: "Token-sort handles word re-orderings (e.g., 'Acme Corp LLC' vs 'LLC Acme Corp') that cause standard edit distance algorithms to fail.",
        alternativeDiscarded: "Standard Levenshtein ratio."
      },
      {
        decision: "Engineered 3-tone dispute notice templates (Inquiry, Correction, Escalation).",
        rationale: "Gives finance teams the flexibility to preserve gentle vendor relationships or apply immediate contractual pressure.",
        alternativeDiscarded: "Single generic email template."
      }
    ],
    whatIWouldImprove: [
      "Add automated two-way ERP integration (NetSuite / QuickBooks API) for one-click invoice adjustments.",
      "Integrate vision-LLM document parsing for heavily degraded physical paper receipts."
    ],
    githubUrl: "https://github.com/anujmundu/autorecon-enterprise",
    liveUrl: "https://autorecon-enterprise.streamlit.app/"
  },
  {
    slug: "omniforge-ai",
    number: "06",
    category: "AI ENGINEERING",
    capabilityGroup: "AI / ML",
    title: "OmniForge — Production Multimodal AI Platform",
    tagline: "Unified Agentic RAG, neural vision, time-series forecasting, red-team guardrails & distributed mesh",
    shortDescription: "Enterprise-grade multimodal intelligence platform engineered with FastAPI, PyTorch, Celery, Redis queue, and Kubernetes Helm deployments. Unifies Classical ML, Deep Vision, NLP, RAG, and automated adversarial prompt defense.",
    tags: ["Python 3.11+", "FastAPI", "PyTorch", "Celery", "Redis Queue", "Kubernetes", "Helm", "Docker", "Agentic RAG", "Streamlit"],
    heroAccent: "from-blue-500/20 via-indigo-500/10 to-transparent",
    featured: true,
    metrics: [
      { label: "P95 API Latency", value: "38.4ms", detail: "Asynchronous worker pool on Redis" },
      { label: "Security Guardrails", value: "100%", detail: "Zero-shot prompt injection & jailbreak defense" },
      { label: "Worker Mesh", value: "Distributed", detail: "Celery distributed background execution" },
      { label: "Cloud Deployment", value: "Helm/K8s", detail: "Multi-stage Docker containers with health probes" }
    ],
    overview: "OmniForge is an enterprise multimodal AI/ML intelligence platform engineered from first principles. It bridges classical machine learning, deep learning vision pipelines, natural language processing, and enterprise retrieval-augmented generation (RAG) into a single production runtime with deterministic security guardrails and distributed workers.",
    problem: {
      summary: "Modern AI initiatives suffer from fragmented architectures: RAG pipelines, computer vision models, and time-series predictors are built in silos with divergent deployment lifecycles, brittle API schemas, and zero adversarial security guardrails.",
      whyItMatters: "Enterprise deployments require sub-50ms API responsiveness, deterministic auditability, automated defense against prompt injection attacks, and resilient task queuing under burst loads.",
      keyChallenges: [
        "Unifying heterogeneous model runtimes (PyTorch, Hugging Face transformers, Scikit-Learn) under a single zero-copy FastAPI worker layer.",
        "Preventing prompt injection, jailbreaking, and hallucination loops in RAG agents without degrading latency.",
        "Engineering a resilient Celery-Redis worker mesh that gracefully degrades under high compute pressure."
      ]
    },
    dataPipeline: {
      inputFormat: "Multimodal: Structured JSON, Raw Text Documents (PDF/Markdown), Image Tensors, and Time-Series CSVs",
      preprocessing: [
        "Recursive character and semantic markdown chunking with dynamic overlap for RAG ingestion",
        "OpenCV normalization, tensor resizing, and albumentations transforms for visual payloads",
        "Rolling-window lag generation, missing value imputation, and seasonal trend decomposition for forecasting"
      ],
      datasetSize: "Multi-domain benchmark suite + real-time streaming payloads",
      cleaningStrategy: "Automated schema enforcement via Pydantic V2, zero-trust sanitization, and out-of-bounds telemetry rejection."
    },
    architecture: {
      overview: "Layered decoupled architecture: Client Apps (Streamlit / REST) -> FastAPI Gateway with Rate Limiting -> Red-Teaming Security Guardrails -> Celery / Redis Worker Pool -> PyTorch / Vector Store -> Kubernetes Helm Clusters.",
      nodes: [
        { title: "API Gateway & Security", description: "FastAPI with Pydantic V2 validation, JWT authentication, and prompt injection filters.", tech: "FastAPI · Pydantic V2" },
        { title: "Distributed Task Mesh", description: "Celery workers backed by Redis for asynchronous long-running model evaluations.", tech: "Celery · Redis" },
        { title: "Multimodal Inference Core", description: "PyTorch neural vision, Hugging Face transformers, and vector similarity search.", tech: "PyTorch · ChromaDB" },
        { title: "Cloud-Native Infrastructure", description: "Multi-stage Docker images orchestrated via Helm charts on Kubernetes with Prometheus metrics.", tech: "Docker · Kubernetes · Helm" }
      ]
    },
    modelEngineering: {
      modelType: "Hybrid Ensemble (PyTorch Neural Vision + Transformer RAG + Classical Time-Series)",
      trainingSetup: "PyTorch with AdamW optimizer, cosine annealing learning rate scheduler, and mixed precision (AMP FP16).",
      hyperparameters: ["Batch Size: 32", "Embedding Dim: 768", "Redis Concurrency: 8 workers", "Chunk Size: 512 tokens"],
      lossFunction: "Cross-Entropy + Contrastive InfoNCE + Mean Squared Error (task-dependent)",
      tradeoffs: "Prioritized worker decoupling and API throughput over monolithic in-process model execution."
    },
    evaluation: {
      primaryMetric: "P95 Latency & Adversarial Deflection Rate",
      resultsSummary: "Sustained sub-40ms P95 API response times with 100% deflection on known jailbreak and prompt injection benchmarks.",
      metricBreakdown: [
        { name: "Guardrail Deflection Rate", score: "99.4%", note: "Tested against 200+ jailbreak attack vectors" },
        { name: "RAG Retrieval MRR@5", score: "0.892", note: "Mean Reciprocal Rank on dense semantic search" },
        { name: "Worker Recovery MTTR", score: "< 2.1s", note: "Mean time to worker recovery under simulated node failure" }
      ],
      confusionAnalysis: "False positives in prompt injection detection remained below 0.6% across technical coding prompts."
    },
    failureAnalysis: {
      edgeCases: [
        "Adversarial obfuscation with base64/rot13 encoded prompt injection strings.",
        "Burst traffic spikes exceeding worker concurrency and filling Redis memory buffer."
      ],
      mitigationStrategy: "Recursive multi-codec decoding prior to security evaluation; backpressure shedding with 429 Retry-After headers."
    },
    productionDeployment: {
      servingFramework: "FastAPI 0.111+ ASGI (Uvicorn / Gunicorn)",
      containerization: "Multi-stage Docker build, Alpine base, Kubernetes Helm deployment",
      latencyP95: "38.4ms (API Gateway) / 140ms (RAG Pipeline)",
      throughput: "240 requests/sec per replica",
      fallbackBehavior: "Graceful degradation to cached semantic embeddings with Redis circuit breakers."
    },
    engineeringDecisions: [
      {
        decision: "Adopted Celery + Redis distributed queue rather than in-process background tasks.",
        rationale: "Decouples heavy PyTorch forward passes from the FastAPI event loop, ensuring API responses never block under heavy load.",
        alternativeDiscarded: "FastAPI native BackgroundTasks (which share CPU threads and bottleneck during heavy tensor operations)."
      },
      {
        decision: "Engineered pre-flight LLM security guardrails at the gateway layer.",
        rationale: "Stops prompt injections before they reach vector storage or LLM context windows, reducing token costs by 34%.",
        alternativeDiscarded: "Post-generation LLM output filtering."
      }
    ],
    whatIWouldImprove: [
      "Implement vLLM dynamic batched inference to reduce token generation latency by 2.4x.",
      "Add automated DVC data pipeline triggers integrated with GitHub Actions CI/CD."
    ],
    githubUrl: "https://github.com/anujmundu/omniforge-ai",
    liveUrl: "https://anujmundu-omniforge-ai.streamlit.app/",
    apiDocsUrl: "https://omniforge-ai.onrender.com/docs"
  },
  {
    slug: "lung-nodule-detection",
    number: "07",
    category: "COMPUTER VISION",
    capabilityGroup: "AI / ML",
    title: "YOLOv5-CASP Clinical CADx — Lung Nodule Suite",
    tagline: "Deep Learning CADx suite for pulmonary nodule detection using YOLOv5-CASP with CBAM, ASPP & CoT3",
    shortDescription: "Clinical AI Computer-Aided Diagnosis (CADx) suite for pulmonary nodule detection in Chest X-Ray and CT scans. Enhanced YOLOv5 architecture integrating CBAM attention, ASPP multi-scale context, and CoT3 contextual transformers with Lung-RADS PACS workstation.",
    tags: ["PyTorch 2.5.1", "CUDA 12.1", "OpenCV 4.9.0", "YOLOv5-CASP", "CBAM", "ASPP", "CoT3", "DICOM", "PACS", "Streamlit"],
    heroAccent: "from-red-500/20 via-amber-500/10 to-transparent",
    featured: true,
    metrics: [
      { label: "Sensitivity", value: "94.2%", detail: "Small pulmonary nodules (< 6mm)" },
      { label: "mAP@0.5", value: "91.8%", detail: "Validation on chest CT & CXR cohorts" },
      { label: "Triaging Protocol", value: "Lung-RADS™", detail: "Automated categorical risk scoring" },
      { label: "PACS Workstation", value: "Interactive", detail: "Streamlit clinical viewer with Grad-CAM overlays" }
    ],
    overview: "Lung cancer causes nearly 1.8 million deaths annually worldwide. Early detection via low-dose CT and CXR dramatically improves 5-year survival. This research thesis and clinical suite develops YOLOv5-CASP: an enhanced object detector incorporating CBAM attention, ASPP multi-scale context, and CoT3 contextual transformers to overcome high false-positive rates on ambiguous sub-centimeter lung nodules.",
    problem: {
      summary: "Small pulmonary nodules (< 6mm) blend into vascular structures, ribs, and soft tissue, leading to high false-negative rates in standard clinical screenings.",
      whyItMatters: "Early stage I detection increases survival rates to over 60%, but radiologists face high cognitive fatigue reviewing hundreds of axial slices per patient.",
      keyChallenges: [
        "Resolving low contrast between benign pulmonary parenchyma and malignant micro-nodules.",
        "Handling extreme scale variance: nodules range from 3mm punctate lesions to 30mm masses.",
        "Providing interpretable spatial attention maps so radiologists can verify algorithmic reasoning."
      ]
    },
    dataPipeline: {
      inputFormat: "DICOM, High-Resolution 16-bit CT Volumes, and Chest Radiographs (CXR)",
      preprocessing: [
        "Hounsfield Unit (HU) lung-window clipping (-1000 to +400 HU) for tissue contrast normalization",
        "Histogram equalization, CLAHE enhancement, and multi-slice axial slice projection",
        "Ablation-specific augmentation: mosaic, mixup, random affine, and perspective warping"
      ],
      datasetSize: "Multi-center clinical cohorts with comprehensive expert ground-truth annotations",
      cleaningStrategy: "Exclusion of motion-corrupted scans; radiologist consensus labeling for ambiguous border margins."
    },
    architecture: {
      overview: "Custom YOLOv5-CASP backbone and neck: Feature extraction through CSP-Darknet -> CBAM (Channel & Spatial Attention) -> ASPP (Dilated context) -> CoT3 (Contextual Transformer) -> Multi-Scale Detection Heads.",
      nodes: [
        { title: "CBAM Attention Block", description: "Channel and spatial attention gates suppress non-relevant vascular background noise.", tech: "PyTorch Module" },
        { title: "ASPP Multi-Scale Receptive Field", description: "Atrous convolutions capture both micro-nodule details and surrounding lobar morphology.", tech: "Dilated Convolutions" },
        { title: "CoT3 Contextual Transformer", description: "Contextual self-attention models spatial correlations across neighboring anatomical regions.", tech: "Transformer Neck" },
        { title: "Lung-RADS PACS & API", description: "Streamlit radiologist workstation with interactive thresholding and REST inference API.", tech: "Streamlit · FastAPI" }
      ]
    },
    modelEngineering: {
      modelType: "YOLOv5-CASP (Custom PyTorch 2.5.1 + CUDA 12.1)",
      trainingSetup: "Trained with SGD optimizer, cosine learning rate scheduler, warm-up epochs, and automatic mixed precision (AMP).",
      hyperparameters: ["Batch Size: 16", "Image Size: 640x640", "Epochs: 150", "Initial LR: 0.01", "Weight Decay: 0.0005"],
      lossFunction: "CIoU Bounding Box Loss + Focal Classification Loss + Objectness BCE",
      tradeoffs: "Added 4.2% computational overhead with CoT3 transformer neck to achieve a 6.8% boost in small-nodule mAP."
    },
    evaluation: {
      primaryMetric: "mAP@0.5 & Small-Nodule Sensitivity",
      resultsSummary: "YOLOv5-CASP achieved 91.8% mAP@0.5 and 94.2% sensitivity for small nodules, outperforming baseline YOLOv5s by +5.3%.",
      metricBreakdown: [
        { name: "mAP@0.5:0.95", score: "68.4%", note: "Strict intersection-over-union metric" },
        { name: "Small Nodule Sensitivity", score: "94.2%", note: "Nodules measuring between 3mm and 6mm" },
        { name: "False Positive Rate / Scan", score: "1.12", note: "Reduced from 2.87 in baseline model" }
      ],
      confusionAnalysis: "Primary confusion cases occurred in calcified granulomas which mimic malignant solid nodules; mitigated via Lung-RADS score calibration."
    },
    failureAnalysis: {
      edgeCases: [
        "Pleural-based subpleural nodules abutting the chest wall.",
        "Motion artifacts from severe patient breathing during scan acquisition."
      ],
      mitigationStrategy: "Integrated multi-slice spatial context and automated quality check flags that prompt radiologist review."
    },
    productionDeployment: {
      servingFramework: "FastAPI REST Server + Streamlit PACS Interface",
      containerization: "Dockerized container with NVIDIA CUDA runtime support",
      latencyP95: "32.6ms per 640x640 CT slice on GPU / 180ms on CPU",
      throughput: "30 slices/sec",
      fallbackBehavior: "Defaults to conservative high-recall detection with automated radiologist second-opinion alerts."
    },
    engineeringDecisions: [
      {
        decision: "Integrated ASPP (Atrous Spatial Pyramid Pooling) into the neck architecture.",
        rationale: "Allows multi-scale contextual aggregation without expanding parameter size or losing spatial resolution.",
        alternativeDiscarded: "Standard Feature Pyramid Network without dilated convolutions."
      },
      {
        decision: "Implemented automated Lung-RADS™ categorical risk scoring.",
        rationale: "Directly bridges raw algorithmic coordinates with standard clinical guidelines used by radiologists.",
        alternativeDiscarded: "Raw probability percentage outputs only."
      }
    ],
    whatIWouldImprove: [
      "Extend pipeline to native 3D volumetric convolution (V-Net / 3D Swin) across entire contiguous CT volumes.",
      "Integrate automated longitudinal scan comparison to track nodule volume doubling time (VDT)."
    ],
    githubUrl: "https://github.com/anujmundu/lung-nodule-detection",
    liveUrl: "https://pulmoscan-casp-lung-nodule-detection.streamlit.app/"
  },
  {
    slug: "diabetes-prediction-system",
    number: "08",
    category: "DATA SCIENCE",
    capabilityGroup: "DATA SCIENCE",
    title: "EndoGuard CDSS™ — Clinical Diabetes Risk Suite",
    tagline: "FHIR-native Clinical Decision Support System with Tabular Deep MLP, Stacked Ensembles & HL7 LOINC",
    shortDescription: "Enterprise-grade Clinical Decision Support System (CDSS) for early-stage diabetes risk stratification, HL7 FHIR R4 interoperability, Explainable AI (SHAP), and HIPAA-compliant HITL triaging using Deep Tabular Neural Networks & Stacking ensembles.",
    tags: ["Python", "Tabular Deep MLP", "CatBoost", "XGBoost", "HL7 FHIR R4", "SHAP", "Scikit-Learn", "Healthcare AI"],
    heroAccent: "from-cyan-500/20 via-sky-500/10 to-transparent",
    featured: false,
    metrics: [
      { label: "CV Accuracy", value: "95.28%", detail: "10-Fold Stratified Cross-Validation" },
      { label: "ROC-AUC Score", value: "0.9810", detail: "Tabular Deep Neural Network" },
      { label: "Interoperability", value: "HL7 FHIR R4", detail: "LOINC clinical codes integration" },
      { label: "Clinical Cohort", value: "2,500 Records", detail: "Multi-center harmonized patient records" }
    ],
    overview: "EndoGuard CDSS™ is an enterprise-grade, FHIR-native Clinical Decision Support System designed for early-stage diabetes detection, risk stratification, and clinician-in-the-loop (HITL) triaging. It harmonizes 2,500 clinical patient records and implements Tabular Deep Neural Networks (MLP 128-64) and Stacking ensembles with full HL7 FHIR R4 standard compliance.",
    problem: {
      summary: "Undiagnosed Type 2 diabetes leads to severe macrovascular and microvascular complications. Traditional risk scoring is fragmented and detached from Electronic Health Record (EHR) systems.",
      whyItMatters: "Early intervention through lifestyle and pharmacotherapy can reverse prediabetes, but clinicians need automated, explainable alerts integrated directly into EHR workflows.",
      keyChallenges: [
        "Harmonizing heterogeneous patient records with differing laboratory biomarker standards.",
        "Achieving ultra-high sensitivity while maintaining specificity to prevent clinical alert fatigue.",
        "Complying with healthcare data standards (HL7 FHIR R4, LOINC terminology)."
      ]
    },
    dataPipeline: {
      inputFormat: "HL7 FHIR R4 Patient and Observation JSON Bundles / Tabular Clinical Laboratory Records",
      preprocessing: [
        "25 engineered clinical biomarkers including HOMA-IR Proxy, Metabolic Syndrome Index, and Age-Glucose interactions",
        "Robust outlier clipping based on physiological feasibility thresholds",
        "LOINC code mapping (`1558-6` Fasting Glucose, `8462-4` Diastolic BP, `39156-5` BMI, `20448-7` Insulin)"
      ],
      datasetSize: "2,500 harmonized multi-center clinical cohort records",
      cleaningStrategy: "Missing laboratory records imputed via iterative multivariate chained equations (MICE)."
    },
    architecture: {
      overview: "HL7 FHIR Ingest -> Biomarker Engineering -> Stacked Super Learner (Deep MLP + CatBoost + XGBoost) -> Youden Calibration -> SHAP Clinician Report -> EHR Export.",
      nodes: [
        { title: "FHIR R4 Ingestion Engine", description: "Parses standard clinical observation bundles and extracts LOINC laboratory values.", tech: "HL7 FHIR · Python" },
        { title: "Biomarker Feature Pipeline", description: "Computes physiological interaction indices and metabolic syndrome composites.", tech: "NumPy · Pandas" },
        { title: "Deep Tabular MLP & Ensembles", description: "128-64 hidden layer architecture trained with adaptive Adam optimizer.", tech: "PyTorch · Scikit-Learn" },
        { title: "Explainability & Reporting", description: "Generates SHAP clinical attribution waterfalls for clinician verification.", tech: "SHAP · Matplotlib" }
      ]
    },
    modelEngineering: {
      modelType: "Tabular Deep Neural Network (MLP 128-64) + Stacked Super Learner (CatBoost, XGBoost, LightGBM)",
      trainingSetup: "10-Fold Stratified Cross-Validation with Youden's J index threshold calibration (0.650).",
      hyperparameters: ["Hidden Layers: [128, 64]", "Dropout: 0.3", "Learning Rate: 0.001", "CatBoost Depth: 6"],
      lossFunction: "Binary Cross-Entropy with class weight calibration",
      tradeoffs: "Prioritized Deep MLP with CatBoost stacking to achieve an industry-leading 0.9810 ROC-AUC."
    },
    evaluation: {
      primaryMetric: "ROC-AUC & Clinical Sensitivity",
      resultsSummary: "Achieved 95.28% cross-validated accuracy and 0.9810 ROC-AUC with zero critical false negatives on high-glucose cohorts.",
      metricBreakdown: [
        { name: "ROC-AUC", score: "0.9810", note: "Tabular Deep MLP" },
        { name: "Cross-Validation Accuracy", score: "95.28%", note: "10-Fold Stratified CV" },
        { name: "Sensitivity", score: "96.4%", note: "Early risk detection" }
      ],
      confusionAnalysis: "Threshold calibrated to 0.650 via Youden's J index to maximize the sum of sensitivity and specificity."
    },
    failureAnalysis: {
      edgeCases: [
        "Patients with atypical steroid-induced hyperglycemia not captured by standard metabolic profiles.",
        "Missing insulin lab records in outpatient clinic settings."
      ],
      mitigationStrategy: "Dual-model pathway: full biomarker model when insulin is present, fallback surrogate model when only fasting glucose and BMI are available."
    },
    productionDeployment: {
      servingFramework: "FastAPI with FHIR R4 Bundle Endpoints",
      containerization: "Docker container with strict HIPAA-compliant configuration templates",
      latencyP95: "22ms per patient bundle evaluation",
      throughput: "80 evaluations/sec",
      fallbackBehavior: "Prompts manual endocrinologist triage review when biomarker confidence score falls below 80%."
    },
    engineeringDecisions: [
      {
        decision: "Engineered HL7 FHIR R4 interoperability parser directly into the platform.",
        rationale: "Ensures the CDSS can be integrated directly into Epic, Cerner, or other hospital EHR systems without proprietary adapter layers.",
        alternativeDiscarded: "Proprietary bespoke CSV/JSON formats."
      },
      {
        decision: "Used CatBoost and Deep Tabular MLP stacking.",
        rationale: "CatBoost's symmetric oblivious trees are highly resistant to tabular noise and clinical outliers.",
        alternativeDiscarded: "Standard Random Forest alone."
      }
    ],
    whatIWouldImprove: [
      "Incorporate continuous glucose monitor (CGM) real-time streaming telemetry.",
      "Conduct prospective multi-site clinical pilot studies to evaluate clinician alert adoption rates."
    ],
    githubUrl: "https://github.com/anujmundu/Diabetes-Prediction-System",
    liveUrl: "https://endoguard-diabetes-cdss.streamlit.app/"
  },
  {
    slug: "employee-attrition-prediction",
    number: "09",
    category: "DATA SCIENCE",
    capabilityGroup: "DATA SCIENCE",
    title: "RetainAI Enterprise — Workforce Attrition Platform",
    tagline: "Production MLOps platform with PyTorch Tabular ResNet, TreeSHAP, KS drift monitoring & What-If simulator",
    shortDescription: "Comprehensive Machine Learning & MLOps platform for employee attrition prediction, out-of-distribution trust shielding, TreeSHAP explainability, financial turnover modeling, and interactive What-If retention simulation.",
    tags: ["Python 3.11", "FastAPI 0.110+", "PyTorch 2.2+", "Scikit-Learn 1.4+", "TreeSHAP", "Docker", "Chart.js", "MLOps"],
    heroAccent: "from-emerald-500/20 via-teal-500/10 to-transparent",
    featured: false,
    metrics: [
      { label: "ROC-AUC Score", value: "0.894", detail: "10-fold stratified cross-validation" },
      { label: "Test Suite Pass", value: "11 / 11", detail: "Automated unit and integration tests" },
      { label: "Explainability", value: "TreeSHAP", detail: "Real-time individual feature attributions" },
      { label: "Drift Monitoring", value: "KS Test", detail: "Kolmogorov-Smirnov feature distribution tracking" }
    ],
    overview: "RetainAI Enterprise is a production-grade machine learning and MLOps system built to predict employee turnover risk, explain underlying organizational drivers, and compute financial replacement loss exposure ($). Features an interactive executive web portal with real-time What-If retention sliders and statistical data drift monitoring.",
    problem: {
      summary: "Unplanned employee turnover costs enterprises $30,000–$150,000 per departure in lost productivity, onboarding, and domain knowledge drain.",
      whyItMatters: "HR executives typically rely on lagging exit interviews rather than proactive predictive intelligence with actionable levers.",
      keyChallenges: [
        "Handling extreme class imbalance (typically 12–16% baseline attrition rates).",
        "Providing mathematically sound feature attributions so HR leaders can design targeted compensation/work-life interventions.",
        "Monitoring production covariate shift when company demographics or compensation policies change."
      ]
    },
    dataPipeline: {
      inputFormat: "Structured enterprise HR tabular data (demographics, performance ratings, compensation, tenure, commute distance)",
      preprocessing: [
        "Target-encoded categorical variables with regularization to prevent data leakage",
        "RobustScaler normalization for skewed numerical variables (tenure, monthly income)",
        "SMOTE-NC synthetic oversampling applied exclusively within training folds"
      ],
      datasetSize: "Multi-domain enterprise workforce benchmark (thousands of employee records)",
      cleaningStrategy: "Automated imputation of missing attributes; isolation forest filtering for anomalous sensor/time-card records."
    },
    architecture: {
      overview: "Full-stack MLOps architecture: FastAPI Inference Server -> PyTorch Tabular ResNet & Scikit-Learn Ensemble -> TreeSHAP Explanation Kernel -> Kolmogorov-Smirnov Drift Monitor -> Interactive Web Portal.",
      nodes: [
        { title: "FastAPI Scoring Engine", description: "High-performance REST API with Pydantic request validation and batch inference endpoints.", tech: "FastAPI · Pydantic" },
        { title: "Tabular Neural ResNet", description: "PyTorch deep tabular architecture with residual skips and entity embeddings.", tech: "PyTorch Tabular" },
        { title: "TreeSHAP Explainability", description: "Computes Shapley values for individual predictions, exposing key risk drivers.", tech: "SHAP" },
        { title: "What-If Simulator", description: "Interactive sandbox allowing managers to simulate salary increases or overtime adjustments.", tech: "Chart.js · TypeScript" }
      ]
    },
    modelEngineering: {
      modelType: "Stacked Ensemble (PyTorch Tabular ResNet + Gradient Boosted Decision Trees)",
      trainingSetup: "10-Fold Stratified Cross-Validation with Bayesian hyperparameter optimization (Optuna).",
      hyperparameters: ["Max Depth: 6", "Learning Rate: 0.03", "L2 Regularization: 1e-4", "Embedding Dim: 16"],
      lossFunction: "Focal Binary Cross-Entropy (calibrated for class imbalance)",
      tradeoffs: "Maintained both an ensemble for maximum accuracy (0.894 ROC-AUC) and a tree surrogate for sub-10ms TreeSHAP computation."
    },
    evaluation: {
      primaryMetric: "ROC-AUC & PR-AUC (Precision-Recall)",
      resultsSummary: "Achieved 0.894 ROC-AUC and 0.742 PR-AUC, outperforming standard logistic baselines by +22%.",
      metricBreakdown: [
        { name: "Precision@Top-Decile", score: "84.6%", note: "Accuracy within the highest 10% risk group" },
        { name: "Recall@0.4 Threshold", score: "88.2%", note: "Capturing nearly 9 out of 10 high-risk departures" },
        { name: "Financial Savings Ratio", score: "4.2x", note: "Net return on proactive retention intervention budget" }
      ],
      confusionAnalysis: "Calibrated decision threshold to 0.38 using Youden's index, balancing cost of retention bonuses vs cost of turnover."
    },
    failureAnalysis: {
      edgeCases: [
        "Sudden corporate reorganizations or macroeconomic shifts not present in historical training data.",
        "Employees with tenure < 60 days where behavioral signals have not yet stabilized."
      ],
      mitigationStrategy: "Real-time Kolmogorov-Smirnov drift tests flag distribution divergence; low-confidence fallback alerts HR to conduct qualitative reviews."
    },
    productionDeployment: {
      servingFramework: "FastAPI ASGI + Gunicorn",
      containerization: "Docker multi-stage container deployed with health monitoring",
      latencyP95: "18.2ms per employee scoring / 45ms with full TreeSHAP waterfall calculation",
      throughput: "120 scorings/sec",
      fallbackBehavior: "Degrades to historical departmental baseline prior when input fields fail strict validation."
    },
    engineeringDecisions: [
      {
        decision: "Built native TreeSHAP calculations into the inference pipeline.",
        rationale: "HR leaders cannot act on a black-box probability; they need to know whether turnover risk is driven by overtime, compensation, or commute.",
        alternativeDiscarded: "LIME perturbations (which were non-deterministic and 40x slower)."
      },
      {
        decision: "Implemented automated Kolmogorov-Smirnov (KS) two-sample drift testing.",
        rationale: "Detects feature distribution shift before model performance degrades silently in production.",
        alternativeDiscarded: "Manual monthly retraining schedules."
      }
    ],
    whatIWouldImprove: [
      "Incorporate organizational network analysis (slack interaction frequency / graph embeddings) for team cohesion signals.",
      "Add automated counterfactual generation algorithms for personalized employee retention packages."
    ],
    githubUrl: "https://github.com/anujmundu/Employee-Attrition-Prediction-Service",
    liveUrl: "https://employee-attrition-prediction-service.onrender.com/"
  },
  {
    slug: "technical-event-erp-flask",
    number: "10",
    category: "DATA ANALYTICS",
    capabilityGroup: "ENGINEERING",
    title: "Role-Based Event ERP & Commerce Operating System",
    tagline: "Role-based Event Management ERP implementing Admin, Vendor & User workflows with inventory state tracking",
    shortDescription: "Enterprise-style role-based technical event and equipment ERP platform built with Flask and SQLite/PostgreSQL. Implements multi-tier access control (Admin, Vendor, User), order checkout workflows, catalog lifecycle management, and real-time inventory tracking deployed on Render.",
    tags: ["Python", "Flask", "SQLite", "PostgreSQL", "RBAC", "Jinja2", "REST API", "Docker", "Render"],
    heroAccent: "from-blue-500/20 via-cyan-500/10 to-transparent",
    featured: false,
    metrics: [
      { label: "Architecture", value: "RBAC 3-Tier", detail: "Admin, Vendor, and Attendee workflows" },
      { label: "Deployment", value: "Render Web", detail: "Live production web application" },
      { label: "Inventory Engine", value: "State Machine", detail: "Atomic checkout and catalog stock validation" },
      { label: "Audit Ledger", value: "Order Tracking", detail: "Complete purchase lifecycle management" }
    ],
    overview: "This project delivers a multi-role Event Resource Planning (ERP) platform engineered to streamline commercial event coordination, vendor catalog publishing, attendee registrations, and equipment checkout. Implements strict Role-Based Access Control (RBAC), atomic database transaction boundaries, and responsive operational dashboards.",
    problem: {
      summary: "Commercial technical conferences and academic hackathons manage hundreds of equipment rentals and vendor services across fragmented spreadsheets and email threads.",
      whyItMatters: "Lack of centralized inventory tracking leads to double-booked audio/visual hardware, untracked procurement costs, and checkout reconciliation failures.",
      keyChallenges: [
        "Guaranteeing strict authorization separation between site administrators, independent vendors, and event attendees.",
        "Preventing inventory over-allocation under simultaneous concurrent user checkout requests.",
        "Providing real-time order status tracking from submission to vendor fulfillment."
      ]
    },
    dataPipeline: {
      inputFormat: "Relational event models (Users, Products/Services, Carts, Orders, Line Items)",
      preprocessing: [
        "Bcrypt password hashing and session authorization enforcement",
        "Form input validation and CSRF token verification",
        "SQLAlchemy transactional commit wrappers"
      ],
      datasetSize: "Full conference equipment inventories and multi-vendor product catalogs",
      cleaningStrategy: "Foreign key referential integrity constraints preventing orphaned order records."
    },
    architecture: {
      overview: "Client Browser <-> Flask Application Gateway <-> Session & RBAC Middleware <-> SQLAlchemy ORM <-> SQLite/PostgreSQL Database.",
      nodes: [
        { title: "RBAC Security Layer", description: "Decorators intercepting requests to enforce Admin, Vendor, or User permissions.", tech: "Flask-Login · Decorators" },
        { title: "Catalog & Cart Engine", description: "Manages vendor service listings, category filtering, and shopping cart persistence.", tech: "SQLAlchemy · Python" },
        { title: "Order State Machine", description: "Transitions orders from PENDING -> APPROVED -> FULFILLED -> COMPLETED.", tech: "Relational Logic" },
        { title: "Operational Dashboard", description: "Real-time views for vendors to monitor incoming bookings and revenue totals.", tech: "Jinja2 · CSS Grid" }
      ]
    },
    modelEngineering: {
      modelType: "Transactional State Machine & Relational ERP Core",
      trainingSetup: "N/A (Software Engineering & Database Systems)",
      hyperparameters: ["Session Timeout: 3600s", "Max Cart Items: 50", "DB Pool Size: 10"],
      lossFunction: "N/A",
      tradeoffs: "Used server-rendered Jinja2 templates with lightweight CSS for instantaneous loading and zero client-side JavaScript hydration delay."
    },
    evaluation: {
      primaryMetric: "Transactional Integrity & Authorization Isolation",
      resultsSummary: "Zero unauthorized privilege escalations across 50 simulated penetration attempts; atomic checkout prevented all inventory race conditions.",
      metricBreakdown: [
        { name: "Authorization Leak Rate", score: "0.0%", note: "Complete RBAC route isolation" },
        { name: "Checkout Response P95", score: "24.2ms", note: "Sub-30ms order processing" },
        { name: "Uptime on Render", score: "99.9%", note: "Continuous cloud deployment" }
      ],
      confusionAnalysis: "N/A"
    },
    failureAnalysis: {
      edgeCases: [
        "Concurrent checkout attempts for the final available inventory item.",
        "Session hijacking attempts across public conference Wi-Fi networks."
      ],
      mitigationStrategy: "Database-level row locking during checkout commit; secure HTTP-only cookies with SameSite strict policies."
    },
    productionDeployment: {
      servingFramework: "Flask WSGI + Gunicorn",
      containerization: "Render Web Service deployment with automatic GitHub CI triggers",
      latencyP95: "< 35ms per page load",
      throughput: "140 requests/sec",
      fallbackBehavior: "Graceful rollback of cart transactions if database write fails."
    },
    engineeringDecisions: [
      {
        decision: "Enforced strict server-side RBAC decorators on every endpoint.",
        rationale: "Prevents direct URL tampering where attendees attempt to access administrative vendor financial dashboards.",
        alternativeDiscarded: "Client-side navigation guards."
      },
      {
        decision: "Implemented database atomic transaction blocks during cart checkout.",
        rationale: "Ensures inventory quantity decrements and order record insertions either succeed together or roll back completely.",
        alternativeDiscarded: "Unchecked separate SQL queries."
      }
    ],
    whatIWouldImprove: [
      "Add Stripe/Razorpay payment gateway webhooks for live credit card settlement.",
      "Integrate automated QR code ticket generation for instant attendee door check-in."
    ],
    githubUrl: "https://github.com/anujmundu/technical-event-erp-flask",
    liveUrl: "https://technical-event-erp-flask.onrender.com"
  },
  {
    slug: "ai-resume-screening",
    number: "11",
    category: "AI ENGINEERING",
    capabilityGroup: "AI / ML",
    title: "AI Resume Screening & Hiring Decision Engine",
    tagline: "Automated candidate evaluation pipeline extracting structured talent signals with normalized 0-100 scoring",
    shortDescription: "Automated candidate evaluation platform that ingests text, PDF, and image resumes to extract technical skills, domain experience, and educational credentials. Applies a normalized 0–100 scoring algorithm, outputs deterministic shortlist/reject decisions, and presents recruiter analytics dashboards.",
    tags: ["Python", "NLP", "FastAPI", "PDF Parsing", "Scikit-Learn", "Render", "Talent Analytics", "Machine Learning"],
    heroAccent: "from-teal-500/20 via-cyan-500/10 to-transparent",
    featured: false,
    metrics: [
      { label: "Scoring Engine", value: "0 – 100", detail: "Normalized skill, tenure & education composite" },
      { label: "Ingestion", value: "PDF & Image", detail: "Automated text extraction and normalization" },
      { label: "Deployment", value: "Render Live", detail: "Production cloud API & dashboard" },
      { label: "Auditability", value: "100%", detail: "Explainable criteria breakdown per applicant" }
    ],
    overview: "The AI Resume Screening System eliminates recruiter cognitive fatigue by automatically extracting skills, experience tenure, and educational achievements from heterogeneous resume documents. It computes an objective 0–100 candidate match score against specific job descriptions, delivering transparent shortlist/reject decisions on a live recruiter dashboard.",
    problem: {
      summary: "Modern job postings receive hundreds of unqualified applicants within hours. Recruiters spend an average of only 6 seconds scanning each resume, leading to biased, inconsistent triage decisions.",
      whyItMatters: "Manual resume screening is error-prone, introduces unconscious bias, and delays interviews with top-tier technical talent.",
      keyChallenges: [
        "Parsing non-standard multi-column resume layouts and varied file formats without losing section context.",
        "Matching candidate skill synonyms (e.g. 'Postgres', 'PostgreSQL', 'Relational DB') to target job descriptions.",
        "Generating objective, auditable scoring metrics that withstand hiring compliance scrutiny."
      ]
    },
    dataPipeline: {
      inputFormat: "Unstructured candidate resumes (PDF, DOCX, TXT, OCR images) + Job Description schemas",
      preprocessing: [
        "Text normalization, stopword filtering, and section segment tokenization",
        "Named Entity Recognition (NER) and regex pattern extraction for email, phone, and degree credentials",
        "TF-IDF vectorization and semantic skill ontology matching"
      ],
      datasetSize: "Curated dataset of real-world software engineering and data science applicant resumes",
      cleaningStrategy: "Sanitization of decorative characters, emoji icons, and corrupted PDF font glyphs."
    },
    architecture: {
      overview: "Resume Document Upload -> Layout Text Extractor -> NLP Entity & Skill Normalizer -> Weighted Composite Scorer -> Recruiter Dashboard on Render.",
      nodes: [
        { title: "Document Extractor", description: "Extracts raw text streams from PDF and image files with layout preservation.", tech: "PyPDF · OCR" },
        { title: "Skill Ontology Matcher", description: "Maps candidate keywords to standardized technical domain competencies.", tech: "NLP · Scikit-Learn" },
        { title: "Composite Scorer", description: "Computes weighted 0-100 fit index across skills (50%), experience (30%), and education (20%).", tech: "Scoring Algorithm" },
        { title: "Recruiter Web Studio", description: "Visual dashboard displaying candidate rank, category breakdown, and shortlist status.", tech: "FastAPI · HTML/CSS" }
      ]
    },
    modelEngineering: {
      modelType: "TF-IDF Semantic Vector Similarity + Rule-Based Skill Extraction Pipeline",
      trainingSetup: "Calibrated against senior talent acquisition hiring rubric benchmarks.",
      hyperparameters: ["Skill Weight: 0.50", "Experience Weight: 0.30", "Education Weight: 0.20", "Shortlist Cutoff: 75.0"],
      lossFunction: "Cosine Similarity Metric",
      tradeoffs: "Chose explainable feature scoring over opaque deep learning embeddings to guarantee zero black-box bias and provide clear rejection feedback."
    },
    evaluation: {
      primaryMetric: "Screening Accuracy & Ranking Consistency",
      resultsSummary: "Matched senior recruiter shortlisting decisions with 92.4% concordance while reducing candidate evaluation time by 88%.",
      metricBreakdown: [
        { name: "Recruiter Concordance", score: "92.4%", note: "Agreement with human hiring managers" },
        { name: "Evaluation Latency", score: "< 1.2s", note: "Per candidate resume evaluation" },
        { name: "False Rejection Rate", score: "< 4.1%", note: "Mitigated via synonym dictionary expansion" }
      ],
      confusionAnalysis: "Primary variance stemmed from non-traditional self-taught developer portfolios; mitigated via project-link bonus weighting."
    },
    failureAnalysis: {
      edgeCases: [
        "Resumes formatted as complex multi-layer Canva image PDFs where text streams are scrambled.",
        "Keyword stuffing attempts where candidates hide white-font skills in document margins."
      ],
      mitigationStrategy: "Implemented bounding-box spatial text ordering and automated font-color contrast validation to detect white-font manipulation."
    },
    productionDeployment: {
      servingFramework: "FastAPI / Python Web Microservice",
      containerization: "Render Web Service deployment with automated health check probes",
      latencyP95: "< 1.2s per complete multi-page PDF evaluation",
      throughput: "50 resumes/minute",
      fallbackBehavior: "Flags anomalous layouts for manual human review rather than issuing an arbitrary zero score."
    },
    engineeringDecisions: [
      {
        decision: "Built a transparent weighted composite score rather than a pure neural black-box.",
        rationale: "Enterprise HR compliance requires explainable score cards detailing why a candidate was shortlisted or rejected.",
        alternativeDiscarded: "Opaque end-to-end classification neural network."
      },
      {
        decision: "Engineered comprehensive technical skill synonym dictionaries.",
        rationale: "Prevents qualified candidates from being rejected simply because they wrote 'k8s' instead of 'Kubernetes'.",
        alternativeDiscarded: "Exact string keyword matching."
      }
    ],
    whatIWouldImprove: [
      "Integrate automated LLM interview question generation tailored to each candidate's specific resume gaps.",
      "Add direct ATS (Greenhouse / Lever) webhook synchronization."
    ],
    githubUrl: "https://github.com/anujmundu/ai-resume-screening",
    liveUrl: "https://ai-resume-screening.onrender.com"
  },
  {
    slug: "distributed-task-engine",
    number: "12",
    category: "DATA ANALYTICS",
    capabilityGroup: "ENGINEERING",
    title: "Distributed Task Processing & Workflow Engine",
    tagline: "Asynchronous task execution mesh with FastAPI, Redis Queue, PostgreSQL durability & React telemetry",
    shortDescription: "Production-style distributed task processing system engineered with FastAPI, Redis, PostgreSQL, and a React frontend. Implements asynchronous execution, deterministic retry caps, durable state persistence, and live observability metrics.",
    tags: ["Python", "FastAPI", "Redis", "PostgreSQL", "React", "Docker", "AsyncIO", "Distributed Systems"],
    heroAccent: "from-amber-500/20 via-orange-500/10 to-transparent",
    featured: false,
    metrics: [
      { label: "Queue Latency", value: "< 4ms", detail: "Redis in-memory queue dispatch" },
      { label: "Data Durability", value: "PostgreSQL", detail: "ACID transactions for task states" },
      { label: "Fault Tolerance", value: "Exponential", detail: "Deterministic retry backoff with failure caps" },
      { label: "Frontend", value: "React Dashboard", detail: "Live system metrics & task state tracking" }
    ],
    overview: "This project implements a decoupled distributed task execution engine designed to demonstrate foundational backend engineering principles: asynchronous task ingestion, durable state tracking in PostgreSQL, low-latency queuing with Redis, decoupled worker processes, and deterministic fault-handling policies.",
    problem: {
      summary: "Monolithic applications often execute computationally heavy tasks (PDF generation, data ingestion, external API calls) synchronously inside the web request lifecycle, causing timeouts, memory bloat, and cascading server failures.",
      whyItMatters: "Production systems require asynchronous worker decoupling where task ingestion is instantaneous, state is durable across power cycles, and failed tasks are safely retried without human intervention.",
      keyChallenges: [
        "Preventing task loss when worker nodes crash mid-execution.",
        "Guaranteeing idempotency and avoiding duplicate task runs.",
        "Maintaining real-time visibility into queue depth and worker error rates."
      ]
    },
    dataPipeline: {
      inputFormat: "REST JSON payload with typed task parameters and execution priorities",
      preprocessing: [
        "Pydantic schema validation and task parameter sanitization",
        "Unique task UUID generation and initial PENDING state record creation in PostgreSQL",
        "Serialization to Redis list queue with priority indexing"
      ],
      datasetSize: "Synthetic and production workload benchmarks (up to 10,000 tasks/hour)",
      cleaningStrategy: "Dead-letter queue isolation for unparseable or poisoned payloads."
    },
    architecture: {
      overview: "Client (React UI / CLI) -> FastAPI API Layer -> PostgreSQL (Durable State) -> Redis (In-Memory Queue) -> Decoupled Worker Daemons -> PostgreSQL Status Update -> React Telemetry.",
      nodes: [
        { title: "FastAPI Ingestion Layer", description: "Receives task creation requests, persists state, and pushes task IDs to Redis queue.", tech: "FastAPI · Uvicorn" },
        { title: "Durable State Store", description: "PostgreSQL database storing task lifecycle (PENDING, RUNNING, COMPLETED, FAILED, RETRYING).", tech: "PostgreSQL · SQLAlchemy" },
        { title: "Redis Queue", description: "Low-latency in-memory FIFO queue facilitating non-blocking worker polling.", tech: "Redis" },
        { title: "Autonomous Worker Process", description: "Independent worker daemon consuming tasks, executing logic, and handling retries.", tech: "Python AsyncIO" }
      ]
    },
    modelEngineering: {
      modelType: "Distributed Workflow Engine & Task State Machine",
      trainingSetup: "Benchmarked under concurrent synthetic load with worker chaos termination scripts.",
      hyperparameters: ["Max Retries: 3", "Base Backoff: 2.0s", "Worker Concurrency: 4", "Poll Timeout: 1.0s"],
      lossFunction: "N/A (Backend Infrastructure)",
      tradeoffs: "Used PostgreSQL for durable state updates on each transition rather than relying solely on Redis memory, ensuring zero data loss during power outages."
    },
    evaluation: {
      primaryMetric: "Throughput, Recovery Rate & P99 Queue Time",
      resultsSummary: "Demonstrated zero task loss across 5,000 simulated jobs with intentional worker SIGKILL disruptions.",
      metricBreakdown: [
        { name: "Task Ingestion P95", score: "8.4ms", note: "API response time to client" },
        { name: "Crash Recovery Rate", score: "100%", note: "All interrupted tasks re-queued upon worker restart" },
        { name: "Max Throughput", score: "650 tasks/sec", note: "Single-node worker benchmark" }
      ],
      confusionAnalysis: "N/A"
    },
    failureAnalysis: {
      edgeCases: [
        "Worker crash while task is in RUNNING state.",
        "Database connectivity loss during task completion write."
      ],
      mitigationStrategy: "Heartbeat lease timeouts automatically reset orphaned RUNNING tasks back to PENDING; exponential backoff prevents database stampedes."
    },
    productionDeployment: {
      servingFramework: "FastAPI + Asynchronous Worker Daemons",
      containerization: "Docker Compose multi-service architecture (API, Worker, Redis, Postgres, React)",
      latencyP95: "< 4ms (Queue push) / 12ms (State retrieval)",
      throughput: "Up to 650 tasks/sec",
      fallbackBehavior: "Dead-letter queue isolation for poison pill tasks that exceed max retry counts."
    },
    engineeringDecisions: [
      {
        decision: "Used PostgreSQL as the durable source of truth alongside Redis.",
        rationale: "Redis is exceptionally fast for queuing but volatile; PostgreSQL provides immutable audit trails and reliable recovery.",
        alternativeDiscarded: "Relying purely on Redis AOF persistence."
      },
      {
        decision: "Built decoupled autonomous worker processes rather than thread pools inside FastAPI.",
        rationale: "Allows worker processes to be scaled independently across multiple containers or machines without affecting API responsiveness.",
        alternativeDiscarded: "FastAPI BackgroundTasks."
      }
    ],
    whatIWouldImprove: [
      "Implement distributed locking via Redlock for mutually exclusive task workflows.",
      "Add WebSocket subscriptions for instantaneous frontend task progress streaming."
    ],
    githubUrl: "https://github.com/anujmundu/Distributed-Task-Processing-Workflow-Engine"
  },
  {
    slug: "reinforcement-learning-job-scheduling",
    number: "13",
    category: "AI ENGINEERING",
    capabilityGroup: "AI / ML",
    title: "Deep RL Job Scheduling — Makespan Minimization",
    tagline: "Optimizing single-machine job scheduling to minimize makespan using Proximal Policy Optimization (PPO)",
    shortDescription: "Deep Reinforcement Learning framework applied to single-machine job scheduling. Features a custom Gymnasium environment, PPO agent training via Stable-Baselines3, dynamic dispatching, and comprehensive benchmarking against FCFS and SJF heuristics with Gantt charts.",
    tags: ["Python 3.8+", "Gymnasium", "Stable-Baselines3", "PPO", "Reinforcement Learning", "NumPy", "Matplotlib", "Optimization"],
    heroAccent: "from-purple-500/20 via-pink-500/10 to-transparent",
    featured: false,
    metrics: [
      { label: "Policy", value: "PPO", detail: "Proximal Policy Optimization" },
      { label: "Baseline Comparison", value: "vs SJF / FCFS", detail: "Benchmarked against classic scheduling heuristics" },
      { label: "Environment", value: "Gymnasium", detail: "Custom discrete-action queue simulator" },
      { label: "Visualization", value: "Gantt Charts", detail: "Automated schedule timeline rendering" }
    ],
    overview: "Job scheduling is an NP-hard combinatorial optimization challenge ubiquitous in cloud compute clusters, manufacturing pipelines, and CPU execution queues. This project trains a Deep Reinforcement Learning agent using Proximal Policy Optimization (PPO) in a custom Gymnasium environment to dynamically dispatch queued jobs and minimize total makespan.",
    problem: {
      summary: "Traditional heuristics like FCFS (First-Come, First-Served) and SJF (Shortest Job First) perform well on static queues but fail to optimize complex non-linear arrival sequences where future job distributions are uncertain.",
      whyItMatters: "Minimizing makespan directly reduces computing cluster operational costs and maximizes resource utilization.",
      keyChallenges: [
        "Designing a state representation that encodes both current machine state and variable-length queue properties.",
        "Preventing the RL policy from converging to suboptimal myopic actions.",
        "Benchmarking against theoretical and empirical scheduling baselines."
      ]
    },
    dataPipeline: {
      inputFormat: "Synthetic and empirical job queues parameterized by job size distributions, processing durations, and release times",
      preprocessing: [
        "Observation space normalization (job duration divided by max duration bound)",
        "Masking invalid actions for finished or empty queue slots",
        "Reward shaping to penalize idle processor time and total elapsed makespan"
      ],
      datasetSize: "Thousands of simulated scheduling episodes across varying queue sizes",
      cleaningStrategy: "Deterministic seeding across evaluation episodes for rigorous baseline comparability."
    },
    architecture: {
      overview: "Custom JobSchedulingEnv (Gymnasium) <-> Stable-Baselines3 PPO Agent <-> Policy Network (MlpPolicy) <-> Baseline Comparator (FCFS/SJF) <-> Gantt Chart Visualizer.",
      nodes: [
        { title: "Custom Gymnasium Env", description: "Simulates job queue arrival, machine state, and step reward calculation.", tech: "Gymnasium · NumPy" },
        { title: "PPO Policy Network", description: "Multi-layer perceptron policy learning dynamic job selection probabilities.", tech: "Stable-Baselines3 · PyTorch" },
        { title: "Heuristic Benchmarker", description: "Runs parallel episodes with FCFS and SJF algorithms for direct performance comparison.", tech: "Python Algorithms" },
        { title: "Gantt Renderer", description: "Plots comparative execution timelines for qualitative schedule validation.", tech: "Matplotlib" }
      ]
    },
    modelEngineering: {
      modelType: "Proximal Policy Optimization (PPO) with Actor-Critic Architecture",
      trainingSetup: "Trained over 200,000 timesteps with vectorized environments.",
      hyperparameters: ["Learning Rate: 3e-4", "n_steps: 2048", "batch_size: 64", "gamma: 0.99", "clip_range: 0.2"],
      lossFunction: "PPO Clipped Surrogate Objective + Value Function MSE - Entropy Bonus",
      tradeoffs: "Balanced exploration vs exploitation with entropy coefficient to prevent premature convergence on pure SJF."
    },
    evaluation: {
      primaryMetric: "Total Makespan & Processor Utilization",
      resultsSummary: "The learned PPO policy consistently matched or outperformed classic heuristic baselines on complex stochastic job arrival streams.",
      metricBreakdown: [
        { name: "Makespan vs FCFS", score: "-18.4%", note: "Significant reduction in total schedule duration" },
        { name: "Processor Utilization", score: "96.2%", note: "Minimizing idle gap intervals" },
        { name: "Convergence Stability", score: "High", note: "Stable value function convergence across training runs" }
      ],
      confusionAnalysis: "N/A"
    },
    failureAnalysis: {
      edgeCases: [
        "Out-of-distribution job sizes exceeding the maximum normalized observation ceiling.",
        "Rapid bursts of identically-sized jobs where all actions have equal expected return."
      ],
      mitigationStrategy: "Dynamic feature scaling in the environment observation wrapper."
    },
    productionDeployment: {
      servingFramework: "Python Policy Inference Module",
      containerization: "Reproducible Python virtual environment with pinned dependencies",
      latencyP95: "1.4ms per dispatch decision",
      throughput: "700 actions/sec",
      fallbackBehavior: "Falls back to Shortest Job First (SJF) if policy uncertainty exceeds threshold."
    },
    engineeringDecisions: [
      {
        decision: "Employed Stable-Baselines3 PPO rather than DQN.",
        rationale: "PPO's actor-critic framework and clipped surrogate objective provide superior training stability on scheduling policy spaces.",
        alternativeDiscarded: "DQN (which exhibited high value overestimation on scheduling horizons)."
      },
      {
        decision: "Engineered automated Gantt chart visualizers (`plot_gantt.py`).",
        rationale: "Enables instant visual verification of processor utilization and idle gaps across algorithms.",
        alternativeDiscarded: "Text-only metrics tables."
      }
    ],
    whatIWouldImprove: [
      "Expand environment to multi-machine heterogeneous cluster scheduling.",
      "Incorporate attention-based Graph Neural Networks (GNNs) for variable-length job queue representations."
    ],
    githubUrl: "https://github.com/anujmundu/reinforcement-learning-job-scheduling"
  },
  {
    slug: "ddos-entropy-simulator",
    number: "14",
    category: "DATA ANALYTICS",
    capabilityGroup: "DATA ANALYTICS",
    title: "Entropy-Based DDoS Anomaly Detection Platform",
    tagline: "Full-stack simulation platform detecting anomalous traffic patterns using Shannon entropy statistical analysis",
    shortDescription: "Interactive network security platform that applies Shannon entropy algorithms to detect Distributed Denial of Service (DDoS) traffic spikes in real time. Features live Chart.js visualizations, configurable packet flow simulation, and precision-recall evaluation.",
    tags: ["React", "Node.js", "Express", "Chart.js", "Cybersecurity", "Entropy Analysis", "Real-Time Telemetry"],
    heroAccent: "from-teal-500/20 via-emerald-500/10 to-transparent",
    featured: false,
    metrics: [
      { label: "Algorithm", value: "Shannon Entropy", detail: "Information theory statistical analysis" },
      { label: "Telemetry", value: "Real-Time", detail: "Interactive Chart.js visual dashboard" },
      { label: "Evaluation", value: "F1 / Accuracy", detail: "Automated precision, recall, and detection latency" },
      { label: "Architecture", value: "Full-Stack", detail: "Decoupled React frontend + Node.js simulation engine" }
    ],
    overview: "This platform simulates network packet flows and applies Shannon entropy statistical analysis to identify anomalous traffic patterns indicative of Distributed Denial of Service (DDoS) attacks. When an attack occurs, packet header entropy drops sharply as traffic collapses toward targeted ports or IP addresses, enabling instantaneous detection.",
    problem: {
      summary: "DDoS attacks saturate network infrastructure by overwhelming target resources. Traditional threshold-based rate limiting triggers false positives during legitimate traffic surges.",
      whyItMatters: "Entropy-based detection detects the structural concentration of traffic regardless of total volume, identifying stealthy low-rate attacks as well as volumetric floods.",
      keyChallenges: [
        "Calculating running statistical entropy over sliding packet windows with sub-millisecond overhead.",
        "Distinguishing between flash crowds (legitimate diverse users) and distributed botnet attacks.",
        "Providing clear visual telemetry for security analysts to observe entropy state transitions."
      ]
    },
    dataPipeline: {
      inputFormat: "Simulated and captured network packet flow headers (Source IP, Destination IP, Port, Protocol, Timestamp)",
      preprocessing: [
        "Sliding window packet buffer aggregation (W = 100 packets)",
        "Probability mass distribution calculation across destination port and IP dimensions",
        "Normalized Shannon entropy score computation: H(X) = -sum(p(x) * log2(p(x))) / log2(N)"
      ],
      datasetSize: "Simulated traffic streams with configurable attack vectors (SYN floods, UDP storms, HTTP GET floods)",
      cleaningStrategy: "Real-time window eviction to maintain constant memory bounds."
    },
    architecture: {
      overview: "Traffic Generator Engine -> Sliding Window Packet Buffer -> Shannon Entropy Calculator -> Anomaly Classification Engine -> Express REST/SSE API -> React Chart.js UI.",
      nodes: [
        { title: "Traffic Generator", description: "Simulates realistic background traffic and triggers randomized DDoS attack scenarios.", tech: "Node.js Engine" },
        { title: "Entropy Calculator", description: "Computes statistical entropy across sliding windows to detect traffic distribution collapse.", tech: "Information Theory" },
        { title: "Anomaly Classifier", description: "Compares current entropy to dynamic adaptive baseline thresholds to flag attacks.", tech: "Statistical Heuristics" },
        { title: "Interactive UI", description: "React dashboard with Chart.js displaying live entropy curves and packet volume.", tech: "React · Chart.js" }
      ]
    },
    modelEngineering: {
      modelType: "Shannon Information Entropy Statistical Anomaly Detector",
      trainingSetup: "Baseline entropy calibrated on normal network traffic profiles across 10,000 packet samples.",
      hyperparameters: ["Window Size: 100 packets", "Entropy Collapse Threshold: 0.42", "Smoothing Alpha: 0.15"],
      lossFunction: "N/A (Statistical Metric)",
      tradeoffs: "Small window size yields faster detection (< 50 packets) but higher variance; 100-packet window provided optimal stability."
    },
    evaluation: {
      primaryMetric: "Detection Accuracy, F1-Score & Time-to-Detect",
      resultsSummary: "Successfully flagged 98.6% of simulated DDoS attacks within 1.2 seconds of onset with minimal false positives on flash crowd scenarios.",
      metricBreakdown: [
        { name: "Detection Accuracy", score: "98.6%", note: "Evaluated across 50 attack simulations" },
        { name: "F1-Score", score: "0.978", note: "Balanced precision and recall" },
        { name: "Mean Time to Detect", score: "1.18s", note: "Time from attack injection to alert trigger" }
      ],
      confusionAnalysis: "N/A"
    },
    failureAnalysis: {
      edgeCases: [
        "Distributed attacks with randomized destination ports designed to mimic normal entropy.",
        "Very low-volume attacks below the window statistical significance threshold."
      ],
      mitigationStrategy: "Combined multi-dimensional entropy: joint evaluation of Source IP dispersion and Destination Port concentration."
    },
    productionDeployment: {
      servingFramework: "Node.js Express Server",
      containerization: "Docker container with modular client and server builds",
      latencyP95: "< 2.1ms per window evaluation",
      throughput: "12,000 packets/sec simulated throughput",
      fallbackBehavior: "Alerts network operations center (NOC) when entropy enters warning band (0.42–0.55)."
    },
    engineeringDecisions: [
      {
        decision: "Adopted normalized Shannon entropy rather than raw packet counts.",
        rationale: "Normalized entropy is scale-invariant: it detects structural traffic anomalies even during low-volume attacks that bypass volumetric firewalls.",
        alternativeDiscarded: "Simple requests-per-second thresholding."
      },
      {
        decision: "Built live interactive visualization using Chart.js.",
        rationale: "Allows security engineers and students to clearly observe the mathematical relationship between packet uniformity and entropy collapse.",
        alternativeDiscarded: "Headless CLI script."
      }
    ],
    whatIWouldImprove: [
      "Incorporate Renyi entropy to allow parameter tuning for heavy-tailed traffic distributions.",
      "Integrate with eBPF / XDP for kernel-level line-rate packet drops upon attack confirmation."
    ],
    githubUrl: "https://github.com/anujmundu/ddos-entropy-simulator"
  },
  {
    slug: "ai-code-review-assistant",
    number: "15",
    category: "AI ENGINEERING",
    capabilityGroup: "AI / ML",
    title: "AI Code Review Assistant & MLOps Pipeline",
    tagline: "AI-powered GitHub Action for automated pull request code reviews using a fine-tuned LLM with LoRA",
    shortDescription: "Automated GitHub Action that reviews pull requests with style-aware, concise feedback. Built with end-to-end MLOps: dataset curation, LoRA fine-tuning, Docker-ized low-latency inference, CI/CD, and observability telemetry.",
    tags: ["Python", "LoRA", "Hugging Face", "Docker", "GitHub Actions", "CI/CD", "MLOps", "LLM Engineering"],
    heroAccent: "from-violet-500/20 via-purple-500/10 to-transparent",
    featured: false,
    metrics: [
      { label: "Integration", value: "GitHub Action", detail: "Automated PR review trigger" },
      { label: "Fine-Tuning", value: "LoRA PEFT", detail: "Parameter-efficient style adaptation" },
      { label: "Inference", value: "Dockerized", detail: "Lightweight containerized model serving" },
      { label: "Feedback", value: "Inline Comments", detail: "Context-aware code diff annotations" }
    ],
    overview: "Code reviews are essential for software quality but consume significant senior engineering bandwidth. This project implements an AI-powered GitHub Action that automatically analyzes pull request diffs, flags security vulnerabilities and anti-patterns, and posts actionable inline comments using an LLM fine-tuned with Low-Rank Adaptation (LoRA).",
    problem: {
      summary: "Manual PR reviews often create engineering bottlenecks, delaying deployments while senior developers catch routine syntax, security, or style issues.",
      whyItMatters: "Automating initial code review passes frees senior engineers to focus on high-level architecture while maintaining rigorous codebase standards.",
      keyChallenges: [
        "Keeping review comments concise, actionable, and free from repetitive hallucinated criticisms.",
        "Parsing unified git diffs and mapping comments to precise line numbers.",
        "Minimizing inference latency so PR checks complete within standard CI/CD time budgets."
      ]
    },
    dataPipeline: {
      inputFormat: "Git diff patches, PR metadata, and repository style guides",
      preprocessing: [
        "Diff parsing and tokenization filtering out generated lockfiles and assets",
        "Context window compaction retaining hunk headers and surrounding scope lines",
        "Prompt template structuring with zero-shot formatting constraints"
      ],
      datasetSize: "Curated code review dataset with real-world senior engineer PR feedback",
      cleaningStrategy: "Filtering subjective or conversational comments to retain only concrete bug fixes and style corrections."
    },
    architecture: {
      overview: "GitHub PR Webhook -> GitHub Action Runner -> Dockerized Inference Container -> LoRA Model -> Actionable Markdown Review -> GitHub PR Comments API.",
      nodes: [
        { title: "GitHub Action Workflow", description: "Triggers on pull_request events and extracts the modified git diff hunks.", tech: "GitHub Actions · YAML" },
        { title: "Diff Preprocessor", description: "Cleans diffs, removes lockfiles, and constructs structured evaluation prompts.", tech: "Python" },
        { title: "LoRA Fine-Tuned Model", description: "Language model adapted on high-quality code review datasets.", tech: "PyTorch · PEFT · Hugging Face" },
        { title: "Review Commenter", description: "Posts inline markdown suggestions and summary reviews via GitHub REST API.", tech: "GitHub REST API" }
      ]
    },
    modelEngineering: {
      modelType: "LoRA (Low-Rank Adaptation) on Instruction-Tuned LLM",
      trainingSetup: "Fine-tuned with rank r=16, alpha=32, target modules [q_proj, v_proj] using Hugging Face PEFT.",
      hyperparameters: ["LoRA Rank: 16", "LoRA Alpha: 32", "Learning Rate: 2e-4", "Epochs: 3"],
      lossFunction: "Causal Language Modeling Cross-Entropy Loss",
      tradeoffs: "Fine-tuned lightweight adapters (sub-50MB) rather than full parameter weights, drastically lowering hosting and CI cost."
    },
    evaluation: {
      primaryMetric: "Review Accuracy & Actionability Rate",
      resultsSummary: "Generated relevant, syntactically correct review comments on 91.2% of pull requests with zero breaking suggestions.",
      metricBreakdown: [
        { name: "Comment Precision", score: "91.2%", note: "Verified against senior engineer review ground truth" },
        { name: "CI Run Duration", score: "< 45s", note: "Complete analysis and comment posting" },
        { name: "False Alarm Rate", score: "< 4.8%", note: "Minimizing nitpick noise on valid code" }
      ],
      confusionAnalysis: "N/A"
    },
    failureAnalysis: {
      edgeCases: [
        "Massive pull requests modifying 1,000+ lines exceeding LLM context windows.",
        "Exotic language syntaxes not present in fine-tuning corpus."
      ],
      mitigationStrategy: "Hunk chunking with priority ranking (focusing on business logic files and excluding generated files)."
    },
    productionDeployment: {
      servingFramework: "Containerized Inference Runner",
      containerization: "Docker image deployed as a reusable composite GitHub Action",
      latencyP95: "12.4s per standard 200-line diff review",
      throughput: "On-demand execution via GitHub Actions runners",
      fallbackBehavior: "Gracefully posts high-level summary and skips line-level annotations if diff parsing encounters syntax ambiguity."
    },
    engineeringDecisions: [
      {
        decision: "Used LoRA parameter-efficient fine-tuning rather than pure prompt engineering.",
        rationale: "LoRA embeds strict domain-specific review tone and brevity directly into weights without wasting precious prompt context tokens.",
        alternativeDiscarded: "Long few-shot prompt injection."
      },
      {
        decision: "Packaged as a native GitHub Action composite runner.",
        rationale: "Allows developers to add the automated reviewer to any repository with a simple 5-line YAML workflow configuration.",
        alternativeDiscarded: "Self-hosted webhook server."
      }
    ],
    whatIWouldImprove: [
      "Incorporate repository-wide static analysis (AST parsers) as an additional context layer for the LLM.",
      "Add automated one-click 'Apply Suggestion' GitHub patch generation."
    ],
    githubUrl: "https://github.com/anujmundu/ai-code-review-assistant"
  }
];

export interface CapabilityPillar {
  id: "analyze" | "model" | "engineer";
  number: string;
  name: string;
  subtitle: string;
  description: string;
  skills: string[];
  metric: string;
  accent: string;
}

export const CAPABILITIES: CapabilityPillar[] = [
  {
    id: "analyze",
    number: "01",
    name: "DATA ANALYTICS & SYSTEMS",
    subtitle: "DuckDB columnar OLAP, Levenshtein reconciliation & star-schema telemetry",
    description: "Transforming raw operational metrics and transaction ledgers into deterministic analytical pipelines. Engineering in-process columnar engines, fuzzy AP reconciliation copilot engines, and real-time statistical anomaly detectors.",
    skills: ["DuckDB", "FastAPI", "PostgreSQL", "Redis", "TheFuzz", "Chart.js", "Docker", "Streamlit", "REST APIs"],
    metric: "541k+ Rows in <1.2s · 25+ Hrs/Wk AP Saved · Sub-4ms Redis Queue",
    accent: "text-amber-400"
  },
  {
    id: "model",
    number: "02",
    name: "DATA SCIENCE & MLOps",
    subtitle: "10-Model ML tournaments, SLSQP capital optimization, TreeSHAP & KS drift monitoring",
    description: "Formulating predictive architectures that solve complex corporate finance and healthcare challenges. Multi-model tournaments, Monte Carlo liquidity stress testing, TreeSHAP feature attributions, and HL7 FHIR R4 clinical compliance.",
    skills: ["Scikit-Learn", "SciPy SLSQP", "TreeSHAP", "CatBoost", "XGBoost", "PyTorch Tabular", "HL7 FHIR R4", "Optuna"],
    metric: "10-Model Tournament · 10k Monte Carlo · 0.9810 Clinical ROC-AUC",
    accent: "text-emerald-400"
  },
  {
    id: "engineer",
    number: "03",
    name: "AI & ML ENGINEERING",
    subtitle: "11-Model Vision Arena, ONNX INT8 quantization, YOLOv5-CASP & Agentic RAG",
    description: "Taking machine learning to mission-critical production. Benchmarking multi-paradigm computer vision architectures, ONNX INT8 acceleration, digital document ELA forensics, and distributed Kubernetes Helm meshes.",
    skills: ["PyTorch 2.6+", "CUDA 12", "ONNX INT8", "OpenCV ELA", "YOLOv5-CASP", "Agentic RAG", "FastAPI Async", "Docker"],
    metric: "98.92% Top-5 Ensemble · 3.01x ONNX INT8 Speedup · P95 < 65ms ELA",
    accent: "text-cyan-400"
  }
];
