import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppShell } from "@/components/layout/AppShell";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Anuj | AI/ML Engineer · Data Scientist · Data Analyst",
  description: "I turn data into intelligent systems. Applied AI/ML engineering, predictive modeling, statistical data analytics, and real-time edge computer vision.",
  keywords: [
    "AI Engineer",
    "Machine Learning Engineer",
    "Data Scientist",
    "Data Analyst",
    "Computer Vision",
    "PyTorch",
    "YOLOv5",
    "FastAPI",
    "SQL",
    "Docker"
  ],
  authors: [{ name: "Anuj" }],
  creator: "Anuj",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://anuj-portfolio.dev",
    title: "Anuj | AI/ML Engineer · Data Scientist · Data Analyst",
    description: "I turn data into intelligent systems. Applied AI/ML engineering, predictive modeling, and real-time edge computer vision.",
    siteName: "Anuj Portfolio"
  },
  twitter: {
    card: "summary_large_image",
    title: "Anuj | AI/ML Engineer · Data Scientist · Data Analyst",
    description: "I turn data into intelligent systems."
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Anuj",
    jobTitle: "AI/ML Engineer & Data Scientist",
    knowsAbout: [
      "Machine Learning",
      "Computer Vision",
      "Data Analytics",
      "Statistical Modeling",
      "PyTorch",
      "FastAPI",
      "SQL",
      "Docker"
    ],
    description: "I turn data into intelligent systems. Full lifecycle from raw telemetry to low-latency edge inference."
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#07080a] text-[#f3f4f6]">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
