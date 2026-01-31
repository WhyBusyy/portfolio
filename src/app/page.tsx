import { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Work from "@/components/Work";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import HowIWork from "@/components/HowIWork";
import Contact from "@/components/Contact";

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
  },
};

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-white dark:bg-dark-bg">
        <Hero />
        <About />
        <Work />
        <Skills />
        <Experience />
        <HowIWork />
        <Contact />
      </main>
    </>
  );
}
