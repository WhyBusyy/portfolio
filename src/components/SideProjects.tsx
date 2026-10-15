import {
  Github,
  ExternalLink,
  Globe,
  Smartphone,
  Package,
  Gamepad2,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface SideProject {
  title: string;
  description: string;
  techStack: string[];
  github: string | null;
  demo: string | null;
  demoLabel?: string;
  npm?: string | null;
  screenshot: string | null;
  imageFit?: "cover" | "contain";
  category: string;
  icon: LucideIcon;
}

const sideProjects: SideProject[] = [
  {
    title: "Make Mood - 1분 성향 테스트 모음",
    description:
      "1분 성향 테스트 사이트를 직접 기획하고 만들어 운영하고 있습니다. 프레임워크 없이 HTML·CSS·ES Modules로 만들고, 공통 CSS 인라인과 유형 페이지 자동 생성, 공유 이미지 렌더링은 Node.js 빌드 스크립트로 처리했습니다. Claude Code로 기획·카피·디자인·개발 등 역할별 에이전트 10명을 git worktree로 나눠 운영하고, 같은 테스트를 토스 미니앱(앱인토스)으로도 출시했습니다.",
    techStack: [
      "HTML",
      "CSS",
      "Vanilla JS (ES Modules)",
      "Node.js",
      "Cloudflare Workers",
      "Playwright",
      "React (앱인토스)",
      "Claude Code",
    ],
    github: null,
    demo: "https://makemood.site",
    demoLabel: "makemood.site",
    screenshot: "/makemood-v2.webp",
    category: "Web Service",
    icon: Globe,
  },
  {
    title: "루틴 체크 - 매일 습관 트래커",
    description:
      "iOS 앱스토어에 출시한 루틴 트래커. Swift WidgetKit으로 Small/Medium/Large 위젯 3종을 직접 구현하고, Skia 기반 12주 히트맵으로 지속을 시각화했습니다.",
    techStack: [
      "React Native",
      "Expo",
      "TypeScript",
      "Zustand",
      "MMKV",
      "Skia",
      "Swift",
    ],
    github: "https://github.com/WhyBusyy/routine-check-app",
    demo: "https://apps.apple.com/kr/app/%EB%A3%A8%ED%8B%B4-%EC%B2%B4%ED%81%AC-%EB%A7%A4%EC%9D%BC-%EC%8A%B5%EA%B4%80-%ED%8A%B8%EB%9E%98%EC%BB%A4/id6762101450",
    demoLabel: "App Store",
    screenshot: "/routine-check.webp",
    imageFit: "contain",
    category: "Mobile",
    icon: Smartphone,
  },
  {
    title: "tiptap-editor-kit",
    description:
      "Tiptap 기반 WYSIWYG 에디터 npm 패키지. React와 Vanilla JS 두 가지 entry point를 제공하며, Full Toolbar와 이미지 업로드를 지원합니다.",
    techStack: ["Tiptap", "ProseMirror", "TypeScript", "React", "tsup"],
    github: "https://github.com/WhyBusyy/tiptap-editor-kit",
    demo: "/demo/tiptap-editor-kit",
    npm: "https://www.npmjs.com/package/tiptap-editor-kit",
    screenshot: "/tiptap-editor-kit-demo.png",
    category: "npm Package",
    icon: Package,
  },
  {
    title: "TUI Games",
    description:
      "터미널에서 돌아가는 미니게임 4종(Snake·Tetris·Sudoku·Galaga). 의존성 없이 Node.js 표준 라이브러리만 쓰고, 변경된 셀만 다시 그리는 이중 버퍼 차분 렌더러를 직접 구현했습니다. 순수 로직을 분리해 테스트 68개를 붙였습니다.",
    techStack: [
      "Node.js",
      "JavaScript",
      "ANSI / TUI",
      "node:test",
      "Zero-dependency",
    ],
    github: "https://github.com/WhyBusyy/tui-games",
    demo: null,
    screenshot: "/tui-games.webp",
    category: "Terminal",
    icon: Gamepad2,
  },

  {
    title: "Re:Gym - 중고 헬스 기구 거래 앱",
    description:
      "중고 헬스 기구 거래 앱의 Flutter 클라이언트와 관리자 웹을 맡았습니다. 상품 등록·필터 검색·키워드 알림·찜·판매/구매 관리 화면과 STOMP 기반 실시간 채팅을 구현하고, 판매글·브랜드·부위를 관리하는 백오피스를 Next.js로 함께 만들었습니다. 단위 34개·위젯 12개 총 46개 테스트를 붙였고, MVP를 마치고 TestFlight로 테스트 중입니다.",
    techStack: [
      "Flutter",
      "Dart",
      "STOMP (WebSocket)",
      "Firebase Messaging",
      "Kakao SDK",
      "Next.js",
      "flutter_test",
    ],
    github: null,
    demo: null,
    screenshot: "/re-gym.webp",
    category: "Mobile",
    icon: Smartphone,
  },
  {
    title: "포트폴리오 사이트",
    description:
      "커서를 따라 끌려오는 3D 사원증과 스프링처럼 휘는 목걸이 줄, 스크롤에 맞춰 바뀌는 대표 작업 화면을 Framer Motion과 SVG로 직접 만들었습니다. 폰트는 동적 서브셋으로 바꿔 전송량을 3.5MB에서 653KB로 줄였습니다.",
    techStack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "SVG",
    ],
    github: "https://github.com/WhyBusyy/portfolio",
    demo: null,
    screenshot: "/portfolio.webp",
    category: "Frontend",
    icon: Globe,
  },
];

/** 링크 한 줄: 아이콘 + 이름. 내부 데모는 Link, 나머지는 새 탭 */
function ProjectLink({
  href,
  label,
  icon: Icon,
}: {
  href: string;
  label: string;
  icon: LucideIcon;
}) {
  const cls =
    "inline-flex items-center gap-1.5 text-sm font-medium text-slate-700 underline-offset-4 hover:text-blue-600 hover:underline dark:text-slate-300 dark:hover:text-blue-400";
  if (href.startsWith("/"))
    return (
      <Link href={`${href}?from=portfolio`} className={cls}>
        <Icon className="h-4 w-4" aria-hidden="true" />
        {label}
      </Link>
    );
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
      <Icon className="h-4 w-4" aria-hidden="true" />
      {label}
    </a>
  );
}

export default function SideProjects() {
  return (
    <section
      id="side-projects"
      aria-labelledby="side-projects-title"
      className="section-padding py-28 lg:py-36"
    >
      <div className="container-max-width">
        <h2 id="side-projects-title" className="section-title">
          Side Projects
        </h2>
        <p className="section-subtitle">
          업무 밖에서 직접 만든 프로젝트입니다.
        </p>

        {/* 2열 격자: 화면을 크게 보여 주고, 글은 그 아래에 짧게 */}
        <ul className="grid gap-x-10 gap-y-16 md:grid-cols-2">
          {sideProjects.map((project) => {
            const IconComponent = project.icon;
            return (
              <li key={project.title} className="group">
                <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-slate-100 ring-1 ring-inset ring-slate-200/70 dark:bg-white/[0.04] dark:ring-white/[0.06]">
                  {project.screenshot ? (
                    <Image
                      src={project.screenshot}
                      alt={`${project.title} 화면`}
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className={`transition-transform duration-500 ease-out group-hover:scale-[1.02] motion-reduce:transition-none ${
                        project.imageFit === "contain"
                          ? "object-contain"
                          : "object-cover object-top"
                      }`}
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <IconComponent
                        className="h-10 w-10 text-slate-400 dark:text-slate-500"
                        aria-hidden="true"
                      />
                    </div>
                  )}
                </div>

                <p className="mt-5 text-xs text-slate-500 dark:text-slate-400">
                  {project.category}
                </p>
                <h3 className="mt-1 text-lg font-semibold tracking-[-0.01em] text-slate-900 dark:text-white">
                  {project.title}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-slate-600 dark:text-slate-300">
                  {project.description}
                </p>
                <p className="mt-3 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                  {project.techStack.join(", ")}
                </p>

                {(project.github || project.demo || project.npm) && (
                  <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                    {project.demo && (
                      <ProjectLink
                        href={project.demo}
                        label={project.demoLabel ?? "Demo"}
                        icon={ExternalLink}
                      />
                    )}
                    {project.github && (
                      <ProjectLink
                        href={project.github}
                        label="GitHub"
                        icon={Github}
                      />
                    )}
                    {project.npm && (
                      <ProjectLink
                        href={project.npm}
                        label="npm"
                        icon={Package}
                      />
                    )}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
