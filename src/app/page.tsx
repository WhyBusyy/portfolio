import { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Work from "@/components/Work";
import SideProjects from "@/components/SideProjects";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import HowIWork from "@/components/HowIWork";
import Contact from "@/components/Contact";
import { SITE_URL } from "@/constants/site";

export const metadata: Metadata = {
  title: "WhyBusyy | 프론트엔드 개발자 포트폴리오",
  description:
    "Next.js, TypeScript, React 기반으로 웹 서비스를 개발해 온 프론트엔드 개발자입니다.",
  keywords: [
    "프론트엔드",
    "개발자",
    "React",
    "Next.js",
    "TypeScript",
    "포트폴리오",
  ],
  authors: [{ name: "WhyBusyy" }],
  openGraph: {
    title: "WhyBusyy | 프론트엔드 개발자 포트폴리오",
    description:
      "Next.js, TypeScript, React 기반으로 웹 서비스를 개발해 온 프론트엔드 개발자입니다.",
    type: "website",
    locale: "ko_KR",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "WhyBusyy 포트폴리오",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "WhyBusyy | 프론트엔드 개발자 포트폴리오",
    description:
      "Next.js, TypeScript, React 기반으로 웹 서비스를 개발해 온 프론트엔드 개발자입니다.",
    images: ["/og-image.png"],
  },
};

const profileJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  mainEntity: {
    "@type": "Person",
    name: "유병규",
    alternateName: "WhyBusyy",
    jobTitle: "프론트엔드 개발자",
    description:
      "Next.js, TypeScript, React 기반으로 웹 서비스를 개발해 온 프론트엔드 개발자.",
    url: SITE_URL,
    email: "ybg6152@naver.com",
    sameAs: ["https://github.com/WhyBusyy"],
    worksFor: {
      "@type": "Organization",
      name: "주식회사 루멘테라",
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "한국해양대학교",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "서대문구",
      addressRegion: "서울",
      addressCountry: "KR",
    },
    knowsAbout: [
      "TypeScript",
      "JavaScript",
      "Next.js",
      "React",
      "Node.js",
      "NestJS",
      "Tailwind CSS",
      "Zustand",
      "TanStack Query",
      "Frontend Performance Optimization",
    ],
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profileJsonLd) }}
      />
      <a href="#main-content" className="skip-link">
        본문으로 바로가기
      </a>
      <Navigation />
      <main id="main-content" tabIndex={-1} className="min-h-screen focus:outline-none">
        <Hero />
        <About />
        <Work />
        <SideProjects />
        <Skills />
        <Experience />
        <HowIWork />
        <Contact />
      </main>
    </>
  );
}
