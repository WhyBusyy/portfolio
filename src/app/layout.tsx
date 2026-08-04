import type { Metadata } from "next";
import { SITE_URL } from "@/constants/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "WhyBusyy | 프론트엔드 개발자",
    template: "%s | WhyBusyy",
  },
  description:
    "Next.js, TypeScript, React 기반으로 웹 서비스를 개발해 온 프론트엔드 개발자입니다.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body className="antialiased bg-white dark:bg-dark-bg">{children}</body>
    </html>
  );
}
