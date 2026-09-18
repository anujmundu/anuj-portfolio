"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "@/components/ui/navbar-menu";
import { cn } from "@/lib/utils";

export default function NavbarDemo() {
  return (
    <div className="relative flex min-h-60 w-full translate-z-0 items-center justify-center p-4">
      <NavbarMenuFloating className="top-2" />
      <p className="text-neutral-400 font-mono text-xs">
        Hover over the dynamic navigation bar to reveal architecture routes
      </p>
    </div>
  );
}

function NavbarMenuFloating({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div
      className={cn("fixed inset-x-0 top-10 z-50 mx-auto max-w-2xl", className)}
    >
      <Menu setActive={setActive}>
        <MenuItem setActive={setActive} active={active} item="AI Specializations">
          <div className="flex flex-col space-y-3 text-sm p-1">
            <HoveredLink href="/#projects">Computer Vision (YOLO & 3D UNet)</HoveredLink>
            <HoveredLink href="/#projects">Autonomous Multi-Agent RAG</HoveredLink>
            <HoveredLink href="/#projects">Distributed MLOps Infrastructure</HoveredLink>
            <HoveredLink href="/#lab">Interactive Grad-CAM Simulator</HoveredLink>
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Key Projects">
          <div className="grid grid-cols-2 gap-6 p-2 text-sm">
            <ProductItem
              title="OmniForge Multi-Agent"
              href="/#projects"
              src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop"
              description="Self-healing cognitive agent orchestration swarm."
            />
            <ProductItem
              title="PulmoVision 3D"
              href="/#projects"
              src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=600&auto=format&fit=crop"
              description="Sub-millimeter pulmonary nodule CT segmentation."
            />
            <ProductItem
              title="AuraCommerce Engine"
              href="/#projects"
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop"
              description="Real-time hybrid recommendations with vector search."
            />
            <ProductItem
              title="SpectralSentinel SAR"
              href="/#projects"
              src="https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=600&auto=format&fit=crop"
              description="Satellite radar anomaly detection at 10m resolution."
            />
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Credentials">
          <div className="flex flex-col space-y-3 text-sm p-1">
            <HoveredLink href="/resume">MCA Degree (Gold Medalist)</HoveredLink>
            <HoveredLink href="/#metrics">Model Precision & Latency Stats</HoveredLink>
            <HoveredLink href="https://github.com/anujtiwari">GitHub Contributions</HoveredLink>
            <HoveredLink href="/#contact">Book Strategy Call</HoveredLink>
          </div>
        </MenuItem>
      </Menu>
    </div>
  );
}
