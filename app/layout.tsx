import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: {
    default: "Smart Seekers | AI Interview Platform",
    template: "%s | Smart Seekers",
  },
  description: "Screen and interview candidates effortlessly using an AI interview platform. Learn about how Smart Seekers can help you hire better and faster. Book a demo today.",
  keywords: ["AI Interviewer", "Recruitment Platform", "Smart Seekers", "Candidate Screening", "AI Hiring", "Automated Interviews", "Talent Acquisition"],
  authors: [{ name: "Smart Seekers" }],
  creator: "Smart Seekers",
  publisher: "Smart Seekers",
  metadataBase: new URL("https://sit.seekersplus.ai/"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sit.seekersplus.ai/",
    title: "Smart Seekers | AI Interview Platform",
    description: "AI-powered interview platform for recruiters to screen, evaluate, and hire the right candidates faster.",
    siteName: "Smart Seekers",
    images: [
      {
        url: "/logo.svg",
        width: 1200,
        height: 630,
        alt: "Smart Seekers Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Smart Seekers | AI Interview Platform",
    description: "AI-powered interview platform for recruiters to screen, evaluate, and hire the right candidates faster.",
    images: ["/logo.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport = {
  themeColor: "#0a192f",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Smart Seekers",
    url: "https://sit.seekersplus.ai/",
    logo: "https://sit.seekersplus.ai/logo.svg",
    description: "AI-powered interview platform for recruiters to screen, evaluate, and hire the right candidates faster.",
  };

  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
