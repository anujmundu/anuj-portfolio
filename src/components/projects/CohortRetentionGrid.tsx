"use client";

import React, { useState } from "react";
import { Table, Calendar, TrendingUp } from "lucide-react";

interface CohortRow {
  cohort: string;
  users: string;
  m0: number;
  m1: number;
  m2: number;
  m3: number;
  m6: number;
  m12: number;
}

export function CohortRetentionGrid() {
  const [hoveredCell, setHoveredCell] = useState<{ cohort: string; month: string; rate: number } | null>(null);

  const cohorts: CohortRow[] = [
    { cohort: "2023-Q1", users: "124,500", m0: 100, m1: 34.2, m2: 28.6, m3: 24.1, m6: 18.6, m12: 14.8 },
    { cohort: "2023-Q2", users: "148,200", m0: 100, m1: 36.8, m2: 30.2, m3: 25.4, m6: 19.8, m12: 15.6 },
    { cohort: "2023-Q3", users: "162,100", m0: 100, m1: 38.4, m2: 31.8, m3: 27.2, m6: 21.4, m12: 16.9 },
    { cohort: "2023-Q4", users: "189,400", m0: 100, m1: 41.2, m2: 34.6, m3: 29.8, m6: 23.1, m12: 18.2 }
  ];

  const getIntensityColor = (val: number) => {
    if (val === 100) return "bg-amber-500/25 text-amber-200 border-amber-500/40";
    if (val >= 35) return "bg-emerald-500/25 text-emerald-200 border-emerald-500/40";
    if (val >= 25) return "bg-teal-500/20 text-teal-300 border-teal-500/30";
    if (val >= 18) return "bg-cyan-500/15 text-cyan-300 border-cyan-500/25";
    return "bg-white/[0.04] text-zinc-400 border-white/[0.05]";
  };

  return (
    <div className="rounded-lg border border-amber-500/30 bg-[#06080d] p-3 font-mono text-[11px] space-y-2.5">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/[0.06] pb-2 text-zinc-400">
        <div className="flex items-center gap-1.5 text-amber-400 font-bold">
          <Table className="w-3.5 h-3.5" />
          <span>COHORT RETENTION MATRIX [1.4M ROWS]</span>
        </div>
        <div className="text-[10px] text-zinc-500">
          SQL STAR SCHEMA // MATERIALIZED VIEW
        </div>
      </div>

      {/* Grid */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-[9px] text-zinc-500 uppercase border-b border-white/[0.04]">
              <th className="py-1 px-1.5">Cohort</th>
              <th className="py-1 px-1.5">Acquired</th>
              <th className="py-1 px-1.5 text-center">M0</th>
              <th className="py-1 px-1.5 text-center">M1</th>
              <th className="py-1 px-1.5 text-center">M2</th>
              <th className="py-1 px-1.5 text-center">M3</th>
              <th className="py-1 px-1.5 text-center">M6</th>
              <th className="py-1 px-1.5 text-center">M12</th>
            </tr>
          </thead>
          <tbody className="text-[10px]">
            {cohorts.map((row) => (
              <tr key={row.cohort} className="border-b border-white/[0.02]">
                <td className="py-1 px-1.5 text-white font-bold">{row.cohort}</td>
                <td className="py-1 px-1.5 text-zinc-400">{row.users}</td>
                {[row.m0, row.m1, row.m2, row.m3, row.m6, row.m12].map((val, colIdx) => {
                  const months = ["M0", "M1", "M2", "M3", "M6", "M12"];
                  return (
                    <td
                      key={colIdx}
                      onMouseEnter={() =>
                        setHoveredCell({ cohort: row.cohort, month: months[colIdx], rate: val })
                      }
                      onMouseLeave={() => setHoveredCell(null)}
                      className="py-1 px-1 text-center"
                    >
                      <span
                        className={`inline-block w-full py-0.5 rounded border ${getIntensityColor(
                          val
                        )} text-[9px] font-semibold cursor-default`}
                      >
                        {val}%
                      </span>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer Info HUD */}
      <div className="flex items-center justify-between text-[9px] text-zinc-500 pt-1 border-t border-white/[0.04]">
        {hoveredCell ? (
          <span className="text-amber-300 font-bold">
            {hoveredCell.cohort} at {hoveredCell.month}: {hoveredCell.rate}% active buyers
          </span>
        ) : (
          <span>Hover cells to inspect cohort decay retention rate</span>
        )}
        <span className="text-emerald-400 flex items-center gap-1 font-semibold">
          <TrendingUp className="w-3 h-3" />
          +3.8x LTV at M12
        </span>
      </div>
    </div>
  );
}
