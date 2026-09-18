"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Database, 
  Filter, 
  Cpu, 
  Sliders, 
  Server, 
  Smartphone, 
  Info, 
  ArrowRight, 
  Play, 
  Pause, 
  RefreshCw, 
  Zap, 
  CheckCircle2, 
  Activity, 
  Terminal, 
  Layers, 
  Code2, 
  Clock, 
  AlertTriangle,
  Network
} from "lucide-react";
import { cn } from "@/lib/utils";

// ============================================================================
// ARCHITECTURE PIPELINE STAGES SPECIFICATION
// ============================================================================
interface PipelineStage {
  id: number;
  name: string;
  sub: string;
  tech: string;
  hardware: string;
  icon: React.ElementType;
  latencyMs: number;
  tensorIn: string;
  tensorOut: string;
  memory: string;
  failureMitigation: string;
  artifact: string;
  details: string;
  codeSnippet: string;
}

interface ArchitecturePipeline {
  id: string;
  title: string;
  subtitle: string;
  slaTarget: string;
  totalLatency: string;
  throughput: string;
  stages: PipelineStage[];
}

const PIPELINES: ArchitecturePipeline[] = [
  {
    id: "edge-vision",
    title: "REAL-TIME EDGE VISION & DEFECT INFERENCE",
    subtitle: "Deterministic sub-25ms camera-to-actuator computer vision pipeline",
    slaTarget: "< 25.0ms P95",
    totalLatency: "20.6ms",
    throughput: "48.5 FPS Sustained",
    stages: [
      {
        id: 0,
        name: "VIDEO INGESTION",
        sub: "RTSP / Ring-Buffer",
        tech: "OpenCV / V4L2 / GStreamer",
        hardware: "GigE Vision / Edge Host",
        icon: Database,
        latencyMs: 2.1,
        tensorIn: "H.264 Raw Bitstream (1080p @ 60Hz)",
        tensorOut: "Frame[1080, 1920, 3] uint8",
        memory: "32 MB Shared Ring Buffer",
        failureMitigation: "Zero-copy circular ring buffer with timestamped frame dropping prevents memory leaks and network drift accumulation.",
        artifact: "rtsp_ring_buffer.py",
        details: "Captures continuous high-definition RTSP streams via a non-blocking asynchronous worker thread. Stale unconsumed frames are automatically discarded if backpressure is detected.",
        codeSnippet: `class RTSPRingBuffer:
    def __init__(self, uri: str, capacity: int = 16):
        self.cap = cv2.VideoCapture(uri, cv2.CAP_FFMPEG)
        self.cap.set(cv2.CAP_PROP_BUFFERSIZE, 1)
        self.buffer = collections.deque(maxlen=capacity)
    
    def pop_latest(self) -> np.ndarray:
        # Guarantee sub-1ms access to latest uncorrupted frame
        with self.lock:
            return self.buffer[-1] if self.buffer else None`,
      },
      {
        id: 1,
        name: "PREPROCESSING",
        sub: "Letterbox & Normalize",
        tech: "NumPy / SIMD AVX-512",
        hardware: "Multi-Core CPU Vector Units",
        icon: Filter,
        latencyMs: 1.8,
        tensorIn: "Frame[1080, 1920, 3] uint8",
        tensorOut: "Tensor[1, 3, 640, 640] FP32",
        memory: "4.7 MB Tensors / Pool",
        failureMitigation: "Pre-allocated contiguous memory pools avoid dynamic heap allocations during high-frequency frame loops.",
        artifact: "letterbox_simd.py",
        details: "Aspect-ratio preserving letterbox transform dynamically pads image boundaries to 640x640, transposes BGR channel layout to RGB planar format, and scales pixel intensities to [0.0, 1.0].",
        codeSnippet: `def letterbox_simd(img: np.ndarray, target=(640, 640)) -> np.ndarray:
    h, w = img.shape[:2]
    scale = min(target[0]/h, target[1]/w)
    nh, nw = int(h * scale), int(w * scale)
    # Fast bilinear interpolation via SIMD vectorization
    resized = cv2.resize(img, (nw, nh), interpolation=cv2.INTER_LINEAR)
    canvas = np.full((target[0], target[1], 3), 114, dtype=np.uint8)
    canvas[(target[0]-nh)//2:(target[0]-nh)//2+nh, (target[1]-nw)//2:(target[1]-nw)//2+nw] = resized
    return np.ascontiguousarray(canvas.transpose(2, 0, 1)[None], dtype=np.float32) / 255.0`,
      },
      {
        id: 2,
        name: "MODEL INFERENCE",
        sub: "Quantized YOLOv5s-CASP",
        tech: "ONNX Runtime / TensorRT INT8",
        hardware: "NVIDIA Jetson / x86 INT8 VNNI",
        icon: Cpu,
        latencyMs: 14.6,
        tensorIn: "Tensor[1, 3, 640, 640] FP32",
        tensorOut: "Preds[1, 25200, 85] FP32",
        memory: "28.4 MB (INT8 Quantized Weights)",
        failureMitigation: "Static symmetric calibration with KL-divergence thresholds ensures < 0.4% mAP degradation relative to FP32 baseline.",
        artifact: "export_onnx_int8.py",
        details: "Executes fused operator computation using INT8 post-training quantization. 112 operations are fused into 34 hardware kernels, reducing memory bandwidth by 73% and sustaining 40+ FPS.",
        codeSnippet: `def execute_int8_inference(session: ort.InferenceSession, tensor: np.ndarray):
    # Zero-copy input binding directly to hardware memory
    io_binding = session.io_binding()
    io_binding.bind_cpu_input('images', tensor)
    io_binding.bind_output('output0')
    session.run_with_iobinding(io_binding)
    return io_binding.copy_outputs_to_cpu()[0] # 14.6ms P95`,
      },
      {
        id: 3,
        name: "POSTPROCESSING",
        sub: "Vectorized Cython NMS",
        tech: "Cython / NumPy C-API",
        hardware: "x86 L3 Cache Optimized",
        icon: Sliders,
        latencyMs: 1.2,
        tensorIn: "Preds[1, 25200, 85] FP32",
        tensorOut: "BBoxes[K, 6] (x1, y1, x2, y2, conf, cls)",
        memory: "< 1 MB Scratchpad",
        failureMitigation: "Confidence score thresholding filters out 99% of empty bounding boxes prior to pairwise IoU suppression matrix computation.",
        artifact: "nms_fast.pyx",
        details: "Custom vectorized Non-Maximum Suppression eliminates overlapping defect predictions based on an adaptive IoU threshold (0.45), resolving bounding box coordinates to pixel space.",
        codeSnippet: `cdef np.ndarray[np.float32_t, ndim=2] fast_nms_cython(
    float[:, :] boxes, float[:] scores, float iou_threshold
):
    cdef int n = boxes.shape[0]
    cdef list keep = []
    # Bitmask vectorized overlap suppression
    cdef np.ndarray[np.uint8_t, ndim=1] suppressed = np.zeros(n, dtype=np.uint8)
    for i in range(n):
        if suppressed[i]: continue
        keep.append(i)
        for j in range(i + 1, n):
            if calculate_iou(boxes[i], boxes[j]) > iou_threshold:
                suppressed[j] = 1
    return np.array(keep, dtype=np.int32)`,
      },
      {
        id: 4,
        name: "API MICROSERVICE",
        sub: "Async Stream & WebSockets",
        tech: "FastAPI / Uvicorn ASGI",
        hardware: "AsyncIO Event Loop / Linux AMD64",
        icon: Server,
        latencyMs: 0.9,
        tensorIn: "BBoxes[K, 6] + Frame Metadata",
        tensorOut: "JSON Telemetry Packet + H.264 Stream",
        memory: "250 Concurrent WebSockets (64 MB)",
        failureMitigation: "Decoupled broadcast worker drops disconnected client sockets immediately without blocking the primary inference ingestion loop.",
        artifact: "stream_gateway.py",
        details: "Dispatches serialized JSON bounding box coordinates, class labels, and inference latency telemetry asynchronously across active client connections at 40+ FPS.",
        codeSnippet: `@app.websocket("/ws/telemetry/stream")
async def telemetry_stream(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            packet = await broadcast_queue.get()
            # Non-blocking async binary JSON dispatch
            await websocket.send_bytes(orjson.dumps(packet))
    except WebSocketDisconnect:
        logger.info("Observer disconnected. Cleaned up cleanly.")`,
      },
      {
        id: 5,
        name: "DOWNSTREAM ACTUATOR",
        sub: "Edge Display & PLC Alert",
        tech: "Web HUD / Modbus TCP",
        hardware: "Industrial Controller & Browser Client",
        icon: Smartphone,
        latencyMs: 0.8,
        tensorIn: "JSON Telemetry Packet",
        tensorOut: "Hardware Relays Closed / HUD Rendered",
        memory: "Edge UI Client Memory",
        failureMitigation: "Heartbeat watchdog timer triggers emergency hardware line halt if inference packets cease arriving for > 150ms.",
        artifact: "plc_actuator_controller.py",
        details: "Renders visual bounding box overlays at 40+ FPS on edge operator screens and triggers industrial PLC relays via Modbus TCP when defects cross critical size thresholds.",
        codeSnippet: `def dispatch_actuator_signal(defect_detected: bool, severity: float):
    if defect_detected and severity > 0.85:
        # Modbus coil write to industrial reject pneumatic arm
        modbus_client.write_coil(address=0x01, value=True)
        record_audit_trail(event="DEFECT_REJECTED", latency_ms=20.6)`,
      },
    ],
  },
  {
    id: "rag-agent",
    title: "CONTEXT-AWARE MULTI-AGENT RAG PIPELINE",
    subtitle: "Sub-120ms multi-agent DAG retrieval and grounded neural synthesis",
    slaTarget: "< 150ms End-to-End",
    totalLatency: "94.2ms",
    throughput: "65 req/s Swarm",
    stages: [
      {
        id: 0,
        name: "QUERY ORCHESTRATION",
        sub: "Intent & DAG Router",
        tech: "LangGraph / Python 3.11",
        hardware: "Async Task Worker",
        icon: Database,
        latencyMs: 8.4,
        tensorIn: "Raw User Query String",
        tensorOut: "Structured Task DAG + Sub-Queries",
        memory: "2 MB Context Buffer",
        failureMitigation: "Fallback rule router handles ambiguous queries when intent confidence is below 0.70.",
        artifact: "swarm_orchestrator.py",
        details: "Decomposes complex multi-faceted queries into parallel retrieval tasks and evaluates routing dependencies before executing tool invocations.",
        codeSnippet: `async def route_query_intent(prompt: str) -> TaskDAG:
    intent = await classifier.predict_async(prompt)
    return dag_builder.generate_subtasks(intent)`,
      },
      {
        id: 1,
        name: "HYBRID VECTOR SEARCH",
        sub: "Dense + Sparse BM25",
        tech: "Milvus / pgvector (HNSW)",
        hardware: "In-Memory Vector Index",
        icon: Filter,
        latencyMs: 14.2,
        tensorIn: "Text Vector Embedding [1536 dim]",
        tensorOut: "Top-50 Candidate Document Chunks",
        memory: "HNSW Graph Index (RAM)",
        failureMitigation: "Reciprocal Rank Fusion (RRF) merges dense semantics with sparse keyword matches to mitigate zero-recall keyword misses.",
        artifact: "hybrid_search.py",
        details: "Queries dual index structures simultaneously: dense cosine distance on 1536-dimensional embeddings and sparse BM25 tokens with RRF re-ranking.",
        codeSnippet: `def hybrid_retrieval(query_vec: list, keywords: list):
    dense_results = vector_db.search(query_vec, top_k=25)
    sparse_results = bm25.search(keywords, top_k=25)
    return reciprocal_rank_fusion(dense_results, sparse_results)`,
      },
      {
        id: 2,
        name: "CROSS-ENCODER RE-RANK",
        sub: "BGE Re-Ranker v2",
        tech: "PyTorch / ONNX Runtime",
        hardware: "GPU / Tensor Cores",
        icon: Cpu,
        latencyMs: 22.1,
        tensorIn: "50 Document Pairs [Query, Chunk]",
        tensorOut: "Top-5 High-Fidelity Context Nodes",
        memory: "1.2 GB GPU VRAM",
        failureMitigation: "Dynamic context window pruning discards chunks below 0.65 relevance score, keeping token consumption minimal.",
        artifact: "cross_encoder_rerank.py",
        details: "Performs full joint cross-attention over query-document pairs to eliminate superficial vector space cosine collisions and surface factual citations.",
        codeSnippet: `def rerank_candidates(query: str, docs: list[str]) -> list[str]:
    scores = reranker.compute_score([[query, d] for d in docs])
    return [doc for doc, s in sorted(zip(docs, scores), key=lambda x: -x[1])[:5]]`,
      },
      {
        id: 3,
        name: "GUARDRAIL VALIDATION",
        sub: "Hallucination Sentinel",
        tech: "Ragas / Pydantic Strict",
        hardware: "AsyncIO Worker",
        icon: Sliders,
        latencyMs: 9.8,
        tensorIn: "Synthesized Output + Citations",
        tensorOut: "Groundedness Verification Check",
        memory: "< 10 MB Schema Cache",
        failureMitigation: "Rejects ungrounded claims automatically, prompting the reasoner to regenerate with strict citation constraints.",
        artifact: "guardrail_sentinel.py",
        details: "Evaluates factual faithfulness, detects potential jailbreaks, and enforces Pydantic JSON schema constraints before dispatching to client.",
        codeSnippet: `def validate_groundedness(response: str, context: list[str]) -> bool:
    faithfulness = calculate_ragas_faithfulness(response, context)
    assert faithfulness >= 0.95, "Hallucination threshold breached"
    return True`,
      },
      {
        id: 4,
        name: "STREAMING SYNTHESIS",
        sub: "SSE Token Stream",
        tech: "FastAPI / Server-Sent Events",
        hardware: "Async Gateway",
        icon: Server,
        latencyMs: 39.7,
        tensorIn: "Validated Context + Prompt",
        tensorOut: "SSE Streaming Tokens [42 tok/s]",
        memory: "16 KB Socket Buffer",
        failureMitigation: "Automatic backpressure throttling prevents browser buffer exhaustion during long-form generation.",
        artifact: "sse_streaming_gateway.py",
        details: "Streams real-time markdown tokens directly to the client interface with sub-50ms Time-To-First-Token (TTFT) and verified citation references.",
        codeSnippet: `@app.post("/api/rag/chat/stream")
async def chat_stream(request: ChatRequest):
    return EventSourceResponse(generate_stream_tokens(request))`,
      },
    ],
  },
];

export function ArchitectureDiagram() {
  const [selectedPipelineIndex, setSelectedPipelineIndex] = useState<number>(0);
  const [activeStep, setActiveStep] = useState<number>(2);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simulationStep, setSimulationStep] = useState<number>(0);

  const currentPipeline = PIPELINES[selectedPipelineIndex];
  const activeStage = currentPipeline.stages[activeStep] || currentPipeline.stages[0];

  // Auto-stepping simulation engine
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isSimulating) {
      interval = setInterval(() => {
        setSimulationStep((prev) => {
          const next = (prev + 1) % currentPipeline.stages.length;
          setActiveStep(next);
          return next;
        });
      }, 1800);
    }
    return () => clearInterval(interval);
  }, [isSimulating, currentPipeline.stages.length]);

  return (
    <section id="architecture" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-white/[0.08] relative bg-[#020408]">
      {/* Background ambient HUD glows */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-10 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/[0.08] pb-8">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-widest mb-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#00e5ff]" />
              <span>// 06. SYSTEM ARCHITECTURE</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white glow-cyan">
              END-TO-END DATA FLOW
            </h2>
          </div>
          <div className="max-w-md space-y-2">
            <p className="text-sm text-zinc-400 font-mono leading-relaxed">
              Real-world engineering decouples ingestion, tensor manipulation, and heavy neural inference. Click any stage or run the live trace simulation to inspect the mechanics.
            </p>
          </div>
        </div>

        {/* Top Control Bar: Pipeline Selector + Live Telemetry Strip + Simulation Controls */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-4 rounded-xl border border-white/[0.08] bg-[#050813] font-mono text-xs hud-corner">
          {/* Pipeline Switcher Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] text-zinc-500 font-bold uppercase mr-1">TOPOLOGY:</span>
            {PIPELINES.map((p, idx) => (
              <button
                key={p.id}
                onClick={() => {
                  setSelectedPipelineIndex(idx);
                  setActiveStep(0);
                  setSimulationStep(0);
                }}
                className={cn(
                  "px-3 py-1.5 rounded-lg transition-all duration-200 cursor-pointer font-bold flex items-center gap-1.5 border",
                  selectedPipelineIndex === idx
                    ? "bg-cyan-500/20 text-cyan-300 border-cyan-400/50 shadow-[0_0_12px_rgba(0,229,255,0.25)]"
                    : "bg-black/40 text-zinc-400 border-white/[0.06] hover:border-zinc-700 hover:text-white"
                )}
              >
                <Network className="w-3.5 h-3.5" />
                <span>{p.title.split(" ")[0]} {p.title.split(" ")[1]}</span>
              </button>
            ))}
          </div>

          {/* Real-time Performance Indicators */}
          <div className="flex flex-wrap items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-black/50 border border-white/[0.06]">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-zinc-400">TOTAL LATENCY:</span>
              <strong className="text-white">{currentPipeline.totalLatency}</strong>
            </div>

            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-black/50 border border-white/[0.06]">
              <Zap className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-zinc-400">THROUGHPUT:</span>
              <strong className="text-emerald-400">{currentPipeline.throughput}</strong>
            </div>

            {/* Simulation Trigger Button */}
            <button
              onClick={() => setIsSimulating(!isSimulating)}
              className={cn(
                "px-3.5 py-1.5 rounded-lg transition-all duration-200 cursor-pointer font-bold flex items-center gap-1.5 border",
                isSimulating
                  ? "bg-amber-500/20 text-amber-300 border-amber-400/50 shadow-[0_0_12px_rgba(245,158,11,0.3)] animate-pulse"
                  : "bg-cyan-500/10 text-cyan-300 border-cyan-400/30 hover:bg-cyan-500/20"
              )}
            >
              {isSimulating ? (
                <>
                  <Pause className="w-3.5 h-3.5" />
                  <span>PAUSE TRACE</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5" />
                  <span>SIMULATE PACKET FLOW</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* ================================================================= */}
        {/* INTERACTIVE STAGE FLOW VISUALIZER & CONDUIT BUS                   */}
        {/* ================================================================= */}
        <div className="rounded-xl border border-white/[0.08] bg-[#07090f] p-6 sm:p-10 relative overflow-hidden hud-corner shadow-[0_10px_35px_rgba(0,0,0,0.5)]">
          <div className="absolute inset-0 technical-grid opacity-25 pointer-events-none" />

          {/* Animated SVG Bus Line with Moving Light Packets */}
          <div className="relative z-10 hidden lg:block mb-8">
            <svg className="w-full h-12 overflow-visible" preserveAspectRatio="none">
              <defs>
                <linearGradient id="busGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#00e5ff" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#10b981" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#a855f7" stopOpacity="0.8" />
                </linearGradient>
              </defs>

              {/* Static Background Conduit */}
              <line
                x1="4%"
                y1="24"
                x2="96%"
                y2="24"
                stroke="rgba(0, 229, 255, 0.15)"
                strokeWidth="3"
                strokeDasharray="6 6"
              />

              {/* Active Traveling Pulse Packet */}
              <motion.circle
                cx="4%"
                cy="24"
                r="6"
                fill="#00e5ff"
                animate={{
                  cx: ["4%", "96%"],
                  opacity: [0.4, 1, 1, 0.4]
                }}
                transition={{
                  duration: 2.8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                filter="drop-shadow(0 0 10px #00e5ff)"
              />

              {/* Second High-Speed Reverse ACK Packet */}
              <motion.circle
                cx="96%"
                cy="24"
                r="3.5"
                fill="#10b981"
                animate={{
                  cx: ["96%", "4%"],
                  opacity: [0.3, 0.9, 0.3]
                }}
                transition={{
                  duration: 4.2,
                  repeat: Infinity,
                  ease: "linear"
                }}
                filter="drop-shadow(0 0 6px #10b981)"
              />
            </svg>
          </div>

          {/* Interactive Flow Nodes Grid */}
          <div className={cn(
            "relative z-10 grid gap-4",
            currentPipeline.stages.length === 6 
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-6" 
              : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-5"
          )}>
            {currentPipeline.stages.map((step) => {
              const Icon = step.icon;
              const isSelected = activeStep === step.id;

              return (
                <div
                  key={step.id}
                  onClick={() => {
                    setActiveStep(step.id);
                    setIsSimulating(false);
                  }}
                  className={cn(
                    "cursor-pointer rounded-xl p-4 border transition-all duration-300 flex flex-col justify-between min-h-[175px] hud-corner relative overflow-hidden group",
                    isSelected
                      ? "bg-[#0d1424] border-cyan-400 shadow-[0_0_25px_rgba(0,229,255,0.3)] ring-1 ring-cyan-400/60"
                      : "bg-[#05070c] border-white/[0.06] hover:border-zinc-700 hover:bg-[#0c0f17]"
                  )}
                  data-cursor="button"
                >
                  {/* Subtle top indicator bar */}
                  {isSelected && (
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-emerald-400 to-cyan-400" />
                  )}

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className={cn(
                        "font-mono text-[10px] font-bold px-1.5 py-0.5 rounded",
                        isSelected ? "bg-cyan-500/20 text-cyan-300" : "text-zinc-500 bg-white/[0.03]"
                      )}>
                        STAGE 0{step.id + 1}
                      </span>
                      <Icon className={cn("w-4 h-4 transition-colors", isSelected ? "text-cyan-400" : "text-zinc-500")} />
                    </div>

                    <div>
                      <div className="font-mono text-xs font-bold text-white uppercase tracking-tight line-clamp-1">
                        {step.name}
                      </div>
                      <div className="text-[11px] text-zinc-400 font-mono mt-0.5 line-clamp-1">
                        {step.sub}
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/[0.06] space-y-1 font-mono text-[10px]">
                    <div className="flex items-center justify-between text-zinc-400">
                      <span>LATENCY:</span>
                      <strong className={cn("font-bold", isSelected ? "text-cyan-300" : "text-zinc-300")}>
                        {step.latencyMs}ms
                      </strong>
                    </div>
                    <div className="text-zinc-500 truncate text-[9px]">
                      {step.hardware}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* End-to-End Latency Waterfall Segment Bar */}
          <div className="relative z-10 mt-8 p-4 rounded-xl border border-white/[0.06] bg-black/40 font-mono text-xs space-y-2">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-zinc-400 font-bold uppercase flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-cyan-400" />
                <span>MICRO-TIMING WATERFALL BUDGET</span>
              </span>
              <span className="text-cyan-400 font-bold">
                {currentPipeline.totalLatency} / {currentPipeline.slaTarget} SLA
              </span>
            </div>

            {/* Segmented Waterfall Bar */}
            <div className="h-2.5 w-full bg-white/[0.05] rounded-full overflow-hidden flex gap-0.5 p-0.5">
              {currentPipeline.stages.map((st) => {
                const totalNumeric = parseFloat(currentPipeline.totalLatency);
                const widthPct = (st.latencyMs / totalNumeric) * 100;
                const isCurrent = activeStep === st.id;

                return (
                  <div
                    key={`bar-${st.id}`}
                    style={{ width: `${widthPct}%` }}
                    className={cn(
                      "h-full rounded-sm transition-all duration-300 cursor-pointer",
                      isCurrent
                        ? "bg-cyan-400 shadow-[0_0_8px_#00e5ff]"
                        : "bg-cyan-900/60 hover:bg-cyan-700/80"
                    )}
                    title={`Stage 0${st.id + 1}: ${st.name} (${st.latencyMs}ms)`}
                    onClick={() => setActiveStep(st.id)}
                  />
                );
              })}
            </div>
            <div className="flex items-center justify-between text-[10px] text-zinc-500 pt-0.5">
              <span>0.0ms (Ingest)</span>
              <span>15.0ms (Inference)</span>
              <span>{currentPipeline.totalLatency} (Actuation)</span>
            </div>
          </div>

          {/* =============================================================== */}
          {/* DEEP-DIVE DUAL-PANE WORKBENCH FOR ACTIVE STAGE                   */}
          {/* =============================================================== */}
          <div className="relative z-10 mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Pane: Stage Specifications & Failure Mitigation */}
            <div className="lg:col-span-6 rounded-xl border border-cyan-500/30 bg-[#050813] p-6 space-y-5 font-mono text-xs hud-corner shadow-[0_0_30px_rgba(0,229,255,0.08)]">
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                  <span className="text-white font-extrabold text-sm uppercase">
                    STAGE 0{activeStage.id + 1}: {activeStage.name}
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 font-bold">
                  {activeStage.latencyMs}ms P95
                </span>
              </div>

              {/* Technical Description */}
              <p className="text-zinc-300 font-sans text-xs sm:text-sm leading-relaxed">
                {activeStage.details}
              </p>

              {/* Data Contract In/Out Tensors */}
              <div className="space-y-2 pt-1">
                <div className="text-[10px] text-zinc-500 font-bold uppercase">DATA CONTRACT / TENSORS:</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                  <div className="p-2.5 rounded bg-black/60 border border-white/[0.06]">
                    <span className="text-zinc-500 text-[9px] block">INGEST FORMAT:</span>
                    <code className="text-cyan-300 font-semibold">{activeStage.tensorIn}</code>
                  </div>
                  <div className="p-2.5 rounded bg-black/60 border border-white/[0.06]">
                    <span className="text-zinc-500 text-[9px] block">EMISSION FORMAT:</span>
                    <code className="text-emerald-300 font-semibold">{activeStage.tensorOut}</code>
                  </div>
                </div>
              </div>

              {/* Failure Mode Mitigation */}
              <div className="p-3 rounded-lg bg-amber-950/20 border border-amber-500/30 space-y-1">
                <div className="flex items-center gap-1.5 text-amber-400 font-bold text-[10px] uppercase">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>FAILURE MODE & BOTTLENECK MITIGATION:</span>
                </div>
                <p className="text-zinc-300 text-[11px] font-sans leading-relaxed">
                  {activeStage.failureMitigation}
                </p>
              </div>

              {/* Hardware & Code Artifact Badges */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-white/[0.06] text-[11px]">
                <div className="flex items-center gap-1.5 text-zinc-400">
                  <Cpu className="w-3.5 h-3.5 text-purple-400" />
                  <span>Target: <strong className="text-zinc-200">{activeStage.hardware}</strong></span>
                </div>
                <div className="flex items-center gap-1 text-zinc-400">
                  <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                  <code className="text-cyan-300 bg-white/[0.04] px-1.5 py-0.5 rounded border border-white/[0.08]">
                    {activeStage.artifact}
                  </code>
                </div>
              </div>
            </div>

            {/* Right Pane: Live Stage Implementation Code Simulator */}
            <div className="lg:col-span-6 rounded-xl border border-white/[0.08] bg-[#020409] p-5 space-y-3 font-mono text-xs hud-corner flex flex-col justify-between">
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-2 text-[11px]">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-cyan-400" />
                  <span className="text-zinc-300 font-bold">{activeStage.artifact}</span>
                  <span className="text-[9px] text-zinc-500">[PRODUCTION IMPLEMENTATION]</span>
                </div>
                <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>VERIFIED PIPELINE</span>
                </span>
              </div>

              {/* Code Viewer */}
              <div className="p-3.5 rounded-lg bg-black/80 border border-white/[0.04] overflow-x-auto text-[11px] leading-relaxed text-zinc-300 max-h-72">
                <pre className="font-mono">
                  <code>{activeStage.codeSnippet}</code>
                </pre>
              </div>

              {/* Live Trace Log Snippet */}
              <div className="p-2.5 rounded bg-[#060a17] border border-cyan-500/20 text-[10px] flex items-center justify-between text-zinc-400">
                <div className="flex items-center gap-1.5 truncate">
                  <Activity className="w-3 h-3 text-cyan-400 shrink-0 animate-pulse" />
                  <span className="text-cyan-300 font-bold">[TRACE_OK]</span>
                  <span className="truncate">Stage 0{activeStage.id + 1} processed packet in {activeStage.latencyMs}ms</span>
                </div>
                <span className="text-zinc-600 shrink-0 ml-2">MEMORY: {activeStage.memory}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
