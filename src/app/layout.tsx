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

/**
 * 첫 페인트 전에 저장된 테마를 적용한다 (저장값이 없으면 시스템 설정).
 * Navigation 이 없는 상세 페이지에 바로 들어와도 같은 테마가 유지되고, 흰 화면 깜빡임이 없다.
 */
const themeInitScript = `try{var d=localStorage.getItem("darkMode");var on=d===null?window.matchMedia("(prefers-color-scheme: dark)").matches:d==="true";if(on)document.documentElement.classList.add("dark")}catch(e){}`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
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
