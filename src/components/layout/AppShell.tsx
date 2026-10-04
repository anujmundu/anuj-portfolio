"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Preloader } from "@/components/ui/Preloader";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { TerminalModal } from "@/components/lab/TerminalModal";
import { RecruiterDrawer } from "@/components/ui/RecruiterDrawer";

import { FloatingDock } from "@/components/animaster/FloatingDock";
import { Notch } from "@/components/aceternity/Notch";
import { ShaderCanvas } from "@/components/ui/ShaderCanvas";
import { PageTransition } from "@/components/layout/PageTransition";
import { ScrollProgressLaser } from "@/components/ui/ScrollProgressLaser";
import { DeviceSimulator } from "@/components/ui/DeviceSimulator";

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [recruiterOpen, setRecruiterOpen] = useState(false);

  React.useEffect(() => {
    const handleOpenRecruiter = () => setRecruiterOpen(true);
    window.addEventListener("open-recruiter-drawer", handleOpenRecruiter);
    return () => window.removeEventListener("open-recruiter-drawer", handleOpenRecruiter);
  }, []);

  return (
    <>
      <Preloader />
      <ScrollProgressLaser />
      <CustomCursor />
      <ShaderCanvas opacity={0.25} />
      <Notch onOpenRecruiter={() => setRecruiterOpen(true)} />
      <Navbar
        onOpenTerminal={() => setTerminalOpen(true)}
        onOpenRecruiter={() => setRecruiterOpen(true)}
      />
      <main className="min-h-screen relative z-10">
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
      <FloatingDock onOpenRecruiter={() => setRecruiterOpen(true)} />
      <TerminalModal
        isOpen={terminalOpen}
        onClose={() => setTerminalOpen(false)}
      />
      <RecruiterDrawer
        isOpen={recruiterOpen}
        onClose={() => setRecruiterOpen(false)}
      />
      <DeviceSimulator />
    </>
  );
}
