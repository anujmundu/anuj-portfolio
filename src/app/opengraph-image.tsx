import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Anuj Mundu | AI/ML Engineer · Systems Architect";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#050711",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 80px",
          fontFamily: "monospace",
          border: "2px solid rgba(0, 229, 255, 0.4)",
          position: "relative",
        }}
      >
        {/* Top Tag & Status */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div
            style={{
              fontSize: 18,
              color: "#00e5ff",
              letterSpacing: "0.2em",
              fontWeight: 800,
            }}
          >
            SYS_TERMINAL // ANUJ MUNDU
          </div>
          <div
            style={{
              padding: "6px 16px",
              borderRadius: "9999px",
              background: "rgba(16, 185, 129, 0.15)",
              border: "1px solid rgba(16, 185, 129, 0.5)",
              color: "#10b981",
              fontSize: 16,
              fontWeight: 700,
            }}
          >
            11 LIVE CLOUD SYSTEMS
          </div>
        </div>

        {/* Center Title & Positioning */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              fontSize: 54,
              fontWeight: 900,
              color: "#ffffff",
              letterSpacing: "-0.02em",
              textTransform: "uppercase",
              lineHeight: 1.1,
            }}
          >
            AI/ML Engineer &amp; Systems Architect
          </div>
          <div
            style={{
              fontSize: 24,
              color: "#94a3b8",
              lineHeight: 1.4,
              maxWidth: 950,
            }}
          >
            Deep Neural CADx Vision · DuckDB OLAP · FastAPI Microservices · Distributed RabbitMQ Mesh
          </div>
        </div>

        {/* Bottom Metrics Bar */}
        <div
          style={{
            display: "flex",
            gap: 40,
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            paddingTop: 24,
          }}
        >
          <div>
            <div style={{ fontSize: 13, color: "#64748b" }}>EMPIRICAL RIGOR</div>
            <div style={{ fontSize: 28, fontWeight: 900, color: "#00e5ff" }}>419 Unit Tests</div>
          </div>
          <div>
            <div style={{ fontSize: 13, color: "#64748b" }}>CADX RECALL</div>
            <div style={{ fontSize: 28, fontWeight: 900, color: "#10b981" }}>94.2% mAP</div>
          </div>
          <div>
            <div style={{ fontSize: 13, color: "#64748b" }}>OLAP THROUGHPUT</div>
            <div style={{ fontSize: 28, fontWeight: 900, color: "#fbbf24" }}>541k+ Rows &lt;1.2s</div>
          </div>
          <div>
            <div style={{ fontSize: 13, color: "#64748b" }}>AVAILABILITY</div>
            <div style={{ fontSize: 28, fontWeight: 900, color: "#ffffff" }}>Immediate / Remote</div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
