"use client";

import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { useState } from "react";

export default function PlaceholdersAndVanishInputDemo() {
  const placeholders = [
    "Ask anything about Anuj's AI/ML architecture...",
    "What is the mAP@50 score on the YOLOv8 nodule model?",
    "How does the OmniForge multi-agent consensus work?",
    "What hyperparameters were tuned using Ray on Triton?",
    "Which PACS DICOM protocols are supported?",
  ];

  const [lastQuery, setLastQuery] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // track input change
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLastQuery("Query dispatched to neural knowledge base.");
  };
  return (
    <div className="h-[24rem] md:h-[30rem] flex flex-col justify-center items-center px-4 text-center">
      <h2 className="mb-6 sm:mb-10 text-2xl sm:text-4xl font-bold dark:text-white text-black tracking-tight">
        Query AI Architecture Knowledge Base
      </h2>
      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={handleChange}
        onSubmit={onSubmit}
      />
      {lastQuery && (
        <p className="mt-4 font-mono text-xs text-cyan-400 animate-pulse">
          {lastQuery}
        </p>
      )}
    </div>
  );
}
