"use client";
import React from "react";
import { FollowerPointerCard } from "@/components/ui/following-pointer";

export default function FollowingPointerDemo() {
  return (
    <div className="mx-auto w-80">
      <FollowerPointerCard
        title={
          <TitleComponent
            title={researchCard.author}
            badge="AI Lead"
          />
        }
      >
        <div className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-neutral-900 transition duration-200 hover:shadow-2xl">
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-t-2xl bg-gradient-to-tr from-cyan-950 via-slate-900 to-indigo-950 p-4 flex flex-col justify-end">
            <span className="text-cyan-400 font-mono text-[10px] font-bold">PAPER SPOTLIGHT</span>
            <p className="text-white font-bold text-sm mt-1">{researchCard.title}</p>
          </div>
          <div className="p-4">
            <p className="my-2 text-xs font-normal text-neutral-400 leading-relaxed">
              {researchCard.description}
            </p>
            <div className="mt-4 flex flex-row items-center justify-between">
              <span className="text-[11px] font-mono text-neutral-500">{researchCard.date}</span>
              <a
                href="#projects"
                className="relative z-10 block rounded-lg bg-cyan-500 hover:bg-cyan-400 px-3 py-1.5 text-xs font-semibold text-black transition"
              >
                Read Abstract
              </a>
            </div>
          </div>
        </div>
      </FollowerPointerCard>
    </div>
  );
}

const researchCard = {
  author: "Anuj Tiwari",
  date: "Production Deploy 2024",
  title: "Volumetric Lung Nodule Detection",
  description:
    "End-to-end multi-task learning combining bounding-box localization with 3D attention voxel segmentation.",
};

const TitleComponent = ({
  title,
  badge,
}: {
  title: string;
  badge: string;
}) => (
  <div className="flex items-center space-x-2">
    <div className="w-4 h-4 rounded-full bg-cyan-400 flex items-center justify-center text-[9px] text-black font-bold">
      A
    </div>
    <p className="text-xs">{title} <span className="text-cyan-400 font-mono text-[10px]">({badge})</span></p>
  </div>
);
