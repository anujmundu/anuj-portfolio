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
  title: "Anuj Mundu | AI/ML Engineer · Systems Architect · Data Scientist",
  description: "Production AI/ML Engineering & Distributed Systems. 11 live deployed cloud applications, deep learning computer vision, DuckDB OLAP, and high-assurance architectures.",
  keywords: [
    "Machine Learning Engineer Portfolio",
    "AI Systems Architect",
    "PyTorch Capstone Projects",
    "Streamlit Deployed AI Systems",
    "Full-Stack AI Developer Live Demos",
    "FastAPI Docker Microservices",
    "Computer Vision CADx DICOM",
    "DuckDB Columnar OLAP",
    "Hexagonal Architecture Python",
    "Distributed Queue Worker RabbitMQ",
    "Data Scientist Case Studies",
    "Anuj Mundu Portfolio"
  ],
  authors: [{ name: "Anuj Mundu" }],
  creator: "Anuj Mundu",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://anuj-portfolio.dev",
    title: "Anuj Mundu | AI/ML Engineer · Systems Architect · Data Scientist",
    description: "Production AI/ML engineering, 11 live cloud applications, deep learning vision, and distributed systems architecture.",
    siteName: "Anuj Mundu Portfolio"
  },
  twitter: {
    card: "summary_large_image",
    title: "Anuj Mundu | AI/ML Engineer · Systems Architect",
    description: "11 live deployed systems, 15 comprehensive architectural case studies, and empirical benchmarks."
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "name": "Anuj Mundu",
        "jobTitle": "AI/ML Engineer & Systems Architect",
        "url": "https://anuj-portfolio.dev",
        "sameAs": [
          "https://github.com/anujmundu",
          "https://linkedin.com/in/anuj-mundu"
        ],
        "knowsAbout": [
          "Deep Learning",
          "PyTorch",
          "Computer Vision",
          "FastAPI",
          "Docker",
          "DuckDB OLAP",
          "Distributed Task Queues",
          "Hexagonal Architecture",
          "Clinical Decision Support Systems",
          "Agentic RAG"
        ],
        "description": "AI/ML Systems Engineer specializing in deep neural networks, low-latency API microservices, and high-assurance architectures with 11 live deployed cloud applications."
      },
      {
        "@type": "WebSite",
        "url": "https://anuj-portfolio.dev",
        "name": "Anuj Mundu Portfolio & Systems Terminal",
        "description": "Production portfolio displaying 11 live cloud applications, 15 case studies, and empirical benchmark suites."
      }
    ]
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
