"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const LEFT_TEXT =
  "Autonomous Multi-Agent Networks · 3D Pulmonary Nodule CT Segmentation with Res-UNet · Triton Inference Server Latency 14.2ms · Ray Distributed Hyperparameter Tuning · PyTorch Foundation Models · Explainable AI with Grad-CAM Activation Heatmaps · Gold Medalist MCA Systems Architecture";

const VIEW_W = 1048;
const VIEW_H = 594;

type Point = { x: number; y: number };
type Cubic = { p0: Point; p1: Point; p2: Point; p3: Point };
type Segment = { c1: Point; c2: Point; end: Point };
type PathState = { start: Point; segments: Segment[] };

const round = (n: number) => Math.round(n * 1000) / 1000;
const rp = (p: Point): Point => ({ x: round(p.x), y: round(p.y) });
const lerp = (a: Point, b: Point, t: number): Point => ({
  x: a.x + (b.x - a.x) * t,
  y: a.y + (b.y - a.y) * t,
});

const ORIGINAL_SEGMENTS: Cubic[] = [
  {
    p0: { x: 0.597656, y: 50.924805 },
    p1: { x: 17.4612, y: 143.2965 },
    p2: { x: 97.8522, y: 293.141 },
    p3: { x: 284.508, y: 353.548 },
  },
  {
    p0: { x: 284.508, y: 353.548 },
    p1: { x: 440.828, y: 399.056 },
    p2: { x: 583.839, y: 294.067 },
    p3: { x: 500.618, y: 184.7492 },
  },
  {
    p0: { x: 500.618, y: 184.7492 },
    p1: { x: 417.397, y: 75.4309 },
    p2: { x: 238.217, y: 282.098 },
    p3: { x: 499.258, y: 441.668 },
  },
  {
    p0: { x: 499.258, y: 441.668 },
    p1: { x: 551.913, y: 477.802 },
    p2: { x: 817.468, y: 561.26 },
    p3: { x: 1046.43, y: 565.235 },
  },
];

const SPLITS_PER_SEGMENT = 2;

function splitCubic(b: Cubic, t: number): { left: Cubic; right: Cubic } {
  const a1 = lerp(b.p0, b.p1, t);
  const a2 = lerp(b.p1, b.p2, t);
  const a3 = lerp(b.p2, b.p3, t);
  const b1 = lerp(a1, a2, t);
  const b2 = lerp(a2, a3, t);
  const mid = lerp(b1, b2, t);
  return {
    left: { p0: b.p0, p1: a1, p2: b1, p3: mid },
    right: { p0: mid, p1: b2, p2: a3, p3: b.p3 },
  };
}

function subCubic(b: Cubic, t0: number, t1: number): Cubic {
  const right = splitCubic(b, t0).right;
  const t = (t1 - t0) / (1 - t0);
  return splitCubic(right, t).left;
}

const DEFAULT_PATH: PathState = {
  start: rp(ORIGINAL_SEGMENTS[0].p0),
  segments: ORIGINAL_SEGMENTS.flatMap((cubic) => {
    const segs: Segment[] = [];
    for (let i = 0; i < SPLITS_PER_SEGMENT; i++) {
      const sub = subCubic(
        cubic,
        i / SPLITS_PER_SEGMENT,
        (i + 1) / SPLITS_PER_SEGMENT,
      );
      segs.push({ c1: rp(sub.p1), c2: rp(sub.p2), end: rp(sub.p3) });
    }
    return segs;
  }),
};

type HandleId =
  | { type: "start" }
  | { type: "c1"; seg: number }
  | { type: "c2"; seg: number }
  | { type: "end"; seg: number };

const handleKey = (id: HandleId) =>
  id.type === "start" ? "start" : `${id.type}-${id.seg}`;

function getPoint(state: PathState, id: HandleId): Point {
  if (id.type === "start") return state.start;
  return state.segments[id.seg][id.type];
}

function setPoint(state: PathState, id: HandleId, p: Point): PathState {
  if (id.type === "start") return { ...state, start: p };
  return {
    ...state,
    segments: state.segments.map((seg, i) =>
      i === id.seg ? { ...seg, [id.type]: p } : seg,
    ),
  };
}

const shift = (p: Point, dx: number, dy: number): Point => ({
  x: p.x + dx,
  y: p.y + dy,
});

function moveAnchor(state: PathState, id: HandleId, p: Point): PathState {
  const old = getPoint(state, id);
  const dx = p.x - old.x;
  const dy = p.y - old.y;
  let next = setPoint(state, id, p);
  if (id.type === "start") {
    next = setPoint(
      next,
      { type: "c1", seg: 0 },
      shift(state.segments[0].c1, dx, dy),
    );
  } else if (id.type === "end") {
    const i = id.seg;
    next = setPoint(
      next,
      { type: "c2", seg: i },
      shift(state.segments[i].c2, dx, dy),
    );
    if (i < state.segments.length - 1) {
      next = setPoint(
        next,
        { type: "c1", seg: i + 1 },
        shift(state.segments[i + 1].c1, dx, dy),
      );
    }
  }
  return next;
}

function toPathD({ start, segments }: PathState): string {
  let d = `M${round(start.x)} ${round(start.y)}`;
  for (const s of segments) {
    d += `C${round(s.c1.x)} ${round(s.c1.y)} ${round(s.c2.x)} ${round(s.c2.y)} ${round(s.end.x)} ${round(s.end.y)}`;
  }
  return d;
}

function clientToSvg(
  svg: SVGSVGElement,
  clientX: number,
  clientY: number,
): Point {
  const ctm = svg.getScreenCTM();
  if (ctm) {
    const local = new DOMPoint(clientX, clientY).matrixTransform(ctm.inverse());
    return { x: local.x, y: local.y };
  }
  const r = svg.getBoundingClientRect();
  return {
    x: ((clientX - r.left) / r.width) * VIEW_W,
    y: ((clientY - r.top) / r.height) * VIEW_H,
  };
}

export interface SvgCurveHeroProps {
  speed?: number;
  fontSize?: number;
  textOpacity?: number;
  textColor?: string;
  strokeColor?: string;
}

export const SvgCurveHero = ({
  speed = 25,
  fontSize = 14,
  textOpacity = 0.75,
  textColor = "#00e5ff",
  strokeColor = "rgba(0, 229, 255, 0.2)",
}: SvgCurveHeroProps) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const draggingRef = useRef<HandleId | null>(null);
  const [editing, setEditing] = useState(false);
  const [path, setPath] = useState<PathState>(DEFAULT_PATH);

  const d = useMemo(() => toPathD(path), [path]);

  const anchors = useMemo<HandleId[]>(
    () => [
      { type: "start" },
      ...path.segments.map((_, i) => ({ type: "end", seg: i }) as HandleId),
    ],
    [path.segments],
  );

  const controlPoints = useMemo<HandleId[]>(
    () =>
      path.segments.flatMap(
        (_, i) =>
          [
            { type: "c1", seg: i },
            { type: "c2", seg: i },
          ] as HandleId[],
      ),
    [path.segments],
  );

  const guides = useMemo(
    () =>
      path.segments.flatMap((s, i) => {
        const prevAnchor = i === 0 ? path.start : path.segments[i - 1].end;
        return [
          { a: prevAnchor, b: s.c1 },
          { a: s.end, b: s.c2 },
        ];
      }),
    [path],
  );

  const handlePointerDown = useCallback(
    (e: React.PointerEvent<SVGCircleElement>, id: HandleId) => {
      e.preventDefault();
      e.stopPropagation();
      e.currentTarget.setPointerCapture(e.pointerId);
      draggingRef.current = id;
    },
    [],
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<SVGCircleElement>) => {
      const id = draggingRef.current;
      if (!id || !svgRef.current) return;
      const p = clientToSvg(svgRef.current, e.clientX, e.clientY);
      setPath((prev) =>
        id.type === "c1" || id.type === "c2"
          ? setPoint(prev, id, p)
          : moveAnchor(prev, id, p),
      );
    },
    [],
  );

  const handlePointerUp = useCallback(
    (e: React.PointerEvent<SVGCircleElement>) => {
      draggingRef.current = null;
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {}
    },
    [],
  );

  return (
    <div className="flex w-full flex-col items-center justify-center gap-4 bg-transparent px-2 py-4 relative">
      <div className="mx-auto flex w-full items-center justify-center">
        <svg
          ref={svgRef}
          id="hero-svg"
          className="h-full w-full max-h-[420px]"
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ display: "block", touchAction: editing ? "none" : "auto" }}
        >
          <path
            id="first-curve"
            fill="transparent"
            stroke={strokeColor}
            strokeWidth={1.5}
            d={d}
          />

          <text x="0" style={{ fontSize, fontFamily: "var(--font-mono, monospace)" }}>
            <textPath
              id="marquee-text-first"
              href="#first-curve"
              className="font-mono uppercase tracking-wider"
              style={{ fill: textColor, opacity: textOpacity }}
            >
              {LEFT_TEXT}
            </textPath>
            <animate
              id="marquee-anim-first"
              attributeName="x"
              dur={`${65 - speed}s`}
              values="-2000;0"
              repeatCount="indefinite"
            />
          </text>

          {editing && (
            <g>
              <path
                d={d}
                fill="none"
                stroke="#0ea5e9"
                strokeWidth={1.5}
                strokeDasharray="3 5"
                strokeOpacity={0.6}
                style={{ pointerEvents: "none" }}
              />

              {guides.map((g, i) => (
                <line
                  key={`guide-${i}`}
                  x1={g.a.x}
                  y1={g.a.y}
                  x2={g.b.x}
                  y2={g.b.y}
                  stroke="#0ea5e9"
                  strokeWidth={1}
                  strokeDasharray="3 4"
                  strokeOpacity={0.5}
                  style={{ pointerEvents: "none" }}
                />
              ))}

              {controlPoints.map((id) => {
                const p = getPoint(path, id);
                return (
                  <circle
                    key={handleKey(id)}
                    cx={p.x}
                    cy={p.y}
                    r={4}
                    fill="#ffffff"
                    stroke="#0ea5e9"
                    strokeWidth={1.5}
                    style={{ cursor: "grab", touchAction: "none" }}
                    onPointerDown={(e) => handlePointerDown(e, id)}
                    onPointerMove={handlePointerMove}
                    onPointerUp={handlePointerUp}
                  />
                );
              })}

              {anchors.map((id) => {
                const p = getPoint(path, id);
                return (
                  <circle
                    key={handleKey(id)}
                    cx={p.x}
                    cy={p.y}
                    r={5}
                    fill="#00e5ff"
                    stroke="#ffffff"
                    strokeWidth={1.5}
                    style={{ cursor: "grab", touchAction: "none" }}
                    onPointerDown={(e) => handlePointerDown(e, id)}
                    onPointerMove={handlePointerMove}
                    onPointerUp={handlePointerUp}
                  />
                );
              })}
            </g>
          )}
        </svg>
      </div>

      <AnimatePresence mode="popLayout" initial={false}>
        {editing ? (
          <motion.button
            key="done"
            type="button"
            onClick={() => setEditing(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="rounded-full bg-cyan-500 px-4 py-1.5 text-xs font-mono font-medium text-black hover:bg-cyan-400 transition cursor-pointer"
          >
            ✓ Done editing Bezier trajectory
          </motion.button>
        ) : (
          <motion.button
            key="edit"
            type="button"
            onClick={() => setEditing(true)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="rounded-full bg-white/10 px-4 py-1.5 text-xs font-mono text-cyan-300 hover:bg-white/20 transition cursor-pointer border border-cyan-500/30"
          >
            ✎ Interactive Bezier Vector Trajectory (Drag Anchors)
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SvgCurveHero;
