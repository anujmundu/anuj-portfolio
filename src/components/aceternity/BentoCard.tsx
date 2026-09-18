import React from "react";
import { motion } from "framer-motion";
import { BentoGridItem } from "@/components/aceternity/BentoGrid";
import { TelemetryOverlay } from "@/components/aceternity/TelemetryOverlay";

type Metrics = {
  latency?: string;
  throughput?: string;
  errorRate?: string;
};

interface BentoCardProps {
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
  badge?: string;
  glowColor?: "cyan" | "emerald" | "amber" | "purple";
  metrics?: Metrics;
  isExpanded?: boolean;
  onExpand?: () => void;
}

export function BentoCard({
  title,
  description,
  header,
  className,
  icon,
  badge,
  glowColor = "cyan",
  metrics,
  isExpanded = false,
  onExpand,
}: BentoCardProps) {
  return (
    <motion.div
      layout
      onClick={onExpand}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <BentoGridItem
        title={title}
        description={description}
        header={header}
        className={className}
        icon={icon}
        badge={badge}
        glowColor={glowColor}
      >
        {metrics && <TelemetryOverlay metrics={metrics} />}
      </BentoGridItem>

      {isExpanded && (
        <motion.pre
          className="mt-4 p-4 bg-[#080a10] rounded-md overflow-x-auto text-xs text-zinc-300"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
        >
{`// Sample implementation snippet\nexport const pipeline = async (input) => {\n  // ... your logic here\n  return await process(input);\n};`}
        </motion.pre>
      )}
    </motion.div>
  );
}
