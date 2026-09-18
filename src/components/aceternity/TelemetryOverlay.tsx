import React from 'react';

type Metrics = {
  latency?: string;
  throughput?: string;
  errorRate?: string;
};

interface TelemetryOverlayProps {
  metrics: Metrics;
}

export function TelemetryOverlay({ metrics }: TelemetryOverlayProps) {
  return (
    <div className="absolute top-2 right-2 bg-black/60 text-xs text-white rounded-md px-2 py-1 z-20">
      {metrics.latency && <div>Latency: {metrics.latency}</div>}
      {metrics.throughput && <div>Throughput: {metrics.throughput}</div>}
      {metrics.errorRate && <div>Error: {metrics.errorRate}</div>}
    </div>
  );
}
