import { ProjectData } from "@/types/project";

export const projects: ProjectData[] = [
  {
    slug: "performance-optimization",
    title: "프론트엔드 성능 최적화",
    company: "주식회사 루멘테라",
    period: "2025년 상반기",
    role: "Frontend Developer",
    techStack: [
      "Next.js",
      "React",
      "TypeScript",
      "Webpack",
      "Chrome DevTools",
      "Lighthouse",
    ],
    overview: {
      lead: "Lighthouse 성능 점수 13점 → 78점. 번들 분석부터 렌더링 최적화까지 단독으로 수행했습니다.",
      detail:
        "플랫팜 서비스의 초기 로딩이 8초 이상 걸리며 사용자 이탈의 원인이 되고 있었습니다. 번들 분석 → 코드 스플리팅 → 이미지 최적화 → 메모이제이션 순서로 체계적으로 접근하여, 측정 가능한 성과를 만들었습니다.",
    },
    screenshots: [],
    challenges: [
      {
        title: "거대한 초기 번들",
        before:
          "모든 페이지가 단일 번들로 로드되어 초기 로딩 8초 이상",
        after:
          "라우트 기반 코드 스플리팅과 dynamic import로 초기 번들 60% 이상 감소",
      },
      {
        title: "불필요한 리렌더링",
        before:
          "상태 변경 시 무관한 컴포넌트까지 리렌더링되어 인터랙션 지연",
        after:
          "React.memo, useMemo, useCallback 적용 및 상태 구조 재설계로 렌더링 횟수 대폭 감소",
      },
      {
        title: "최적화되지 않은 이미지",
        before:
          "원본 사이즈 이미지가 그대로 로드되어 LCP 점수 저하",
        after:
          "Next.js Image + WebP 변환 + lazy loading 적용으로 LCP 개선",
      },
    ],
    metrics: [
      {
        value: "78",
        change: "13 → 78",
        label: "Lighthouse 성능 점수",
      },
      { value: "60%+", change: null, label: "초기 번들 사이즈 감소" },
      { value: "단독", change: null, label: "성능 최적화 전 과정 수행" },
    ],
  },
  {
    slug: "cms-development",
    title: "자체 CMS 구축",
    company: "주식회사 루멘테라",
    period: "2026년 1월",
    role: "Fullstack Developer",
    techStack: [
      "Next.js",
      "React",
      "TypeScript",
      "Node.js",
      "NestJS",
      "REST API",
      "Tailwind CSS",
      "AWS S3",
    ],
    overview: {
      lead: "콘텐츠 수정 요청 3일 1회 → 2주 1회. 자체 CMS를 1개월 만에 풀스택 단독 개발했습니다.",
      detail:
        "벤더사별 커스텀 요구를 빠르게 반영하다 보니 하드코딩이 많았고, 콘텐츠 수정마다 개발자가 코드를 직접 고치고 배포해야 했습니다. 운영팀이 직접 관리할 수 있는 CMS를 설계하고, 프론트엔드 UI부터 백엔드 API까지 전체 스택을 단독으로 구축하여 이 병목을 해소했습니다.",
    },
    screenshots: [],
    challenges: [
      {
        title: "하드코딩된 콘텐츠의 수정 병목",
        before:
          "벤더사별 커스텀 대응으로 하드코딩이 많아, 콘텐츠 수정마다 개발자가 코드를 고치고 배포해야 하는 구조",
        after:
          "WYSIWYG 에디터와 드래그앤드롭 UI로 운영팀이 직접 콘텐츠를 수정·배포할 수 있는 환경 구축",
      },
      {
        title: "제한된 백엔드 리소스에서 풀스택 개발",
        before: "백엔드 인력이 부족한 환경에서 CMS 전체를 구축해야 하는 상황",
        after:
          "NestJS 기반 RESTful API를 직접 설계·구현하여 프론트엔드와 백엔드를 1개월 내 완성",
      },
    ],
    metrics: [
      { value: "100%", change: null, label: "풀스택 단독 개발" },
      {
        value: "80%+",
        change: "3일 1회 → 2주 1회",
        label: "콘텐츠 관련 개발 요청 감소",
      },
      { value: "1개월", change: null, label: "설계부터 운영까지" },
    ],
  },
  {
    slug: "frontend-architecture",
    title: "서비스 초기 설계 및 프론트엔드 구조 설계",
    company: "주식회사 루멘테라",
    period: "2024년 하반기",
    role: "Frontend Developer",
    techStack: [
      "Next.js",
      "React",
      "TypeScript",
      "Zustand",
      "TanStack Query",
      "Tailwind CSS",
      "Emotion",
      "MUI",
    ],
    overview: {
      lead: "B2B 직거래 플랫폼 '플랫팜'의 초기 설계부터 참여하여, 70개 이상 벤더사를 수용하는 프론트엔드 아키텍처를 구축했습니다.",
      detail:
        "벤더사마다 다른 요구사항을 유연하게 수용할 수 있는 구조가 핵심이었습니다. 컴포넌트 설계, 상태 관리 전략, API 연동 구조, 폴더 체계 등 프론트엔드 전반의 아키텍처를 설계하고 기능 고도화를 주도했습니다.",
    },
    screenshots: [],
    challenges: [
      {
        title: "벤더사별 다른 요구사항",
        before:
          "벤더사마다 다른 UI/UX 요구사항으로 코드 중복과 유지보수 비용 증가 예상",
        after:
          "컴포지션 패턴과 설정 기반 렌더링으로 벤더별 커스터마이징이 가능한 유연한 구조 설계",
      },
      {
        title: "복잡한 상태 관리",
        before:
          "복잡한 폼, 주문 플로우, 실시간 데이터 동기화가 뒤섞여 상태 추적이 어려운 구조",
        after:
          "Zustand(클라이언트)와 TanStack Query(서버)로 상태를 분리하여 예측 가능한 데이터 흐름 구축",
      },
      {
        title: "출시 속도와 코드 품질의 균형",
        before: "빠른 출시가 필요하지만 기술 부채를 최소화해야 하는 상황",
        after:
          "공통 컴포넌트와 코드 컨벤션을 먼저 확립하여 초기 개발 속도와 장기 유지보수성 모두 확보",
      },
    ],
    metrics: [
      { value: "1년+", change: null, label: "서비스 운영 및 유지보수" },
      { value: "70%", change: null, label: "프론트엔드 초기 구조 설계 기여" },
      { value: "70+", change: null, label: "대응 가능한 벤더사 수" },
    ],
  },
  {
    slug: "editor-migration",
    title: "WYSIWYG 에디터 마이그레이션",
    company: "주식회사 루멘테라",
    period: "2026년 3월",
    role: "Frontend Developer",
    techStack: [
      "Tiptap",
      "ProseMirror",
      "React",
      "TypeScript",
      "Tailwind CSS",
    ],
    overview: {
      lead: "CKEditor에서 Tiptap으로 WYSIWYG 에디터를 마이그레이션하여 패키지 크기를 2.5GB에서 3MB로 줄이고, 운영 배포 시간을 약 50% 단축했습니다.",
      detail:
        "기존 CKEditor는 node_modules 기준 약 2.5GB에 달하는 거대한 의존성을 가지고 있어 CI/CD 파이프라인의 병목이 되고 있었습니다. Tiptap(ProseMirror 기반)으로 전환하면서 동일한 편집 기능을 유지하되, 커스텀 툴바와 이미지 업로드 핸들러를 직접 구현하여 프로젝트 요구사항에 최적화된 에디터를 구축했습니다. 이후 에디터를 독립 npm 패키지(tiptap-editor-kit)로 분리하여 오픈소스로 배포했습니다.",
    },
    screenshots: [],
    challenges: [
      {
        title: "거대한 CKEditor 의존성",
        before:
          "CKEditor 관련 패키지가 node_modules 기준 약 2.5GB를 차지하여 설치 및 빌드 시간 증가",
        after:
          "Tiptap 기반으로 전환하여 에디터 관련 패키지를 약 3MB로 축소, 운영 배포 시간 12분 → 6분으로 약 50% 단축",
      },
      {
        title: "커스텀 툴바 구현",
        before:
          "CKEditor의 내장 툴바에 의존하여 UI 커스터마이징에 제약이 있었음",
        after:
          "SVG 아이콘 기반의 커스텀 툴바를 직접 구현하여 프로젝트 디자인 시스템에 완전히 통합",
      },
      {
        title: "재사용 가능한 패키지 설계",
        before:
          "프로젝트에 종속된 에디터 코드로, 다른 프로젝트에서 재사용이 불가능한 구조",
        after:
          "프로젝트 의존성을 props 주입 방식으로 분리하고, React와 Vanilla JS 두 가지 entry point를 제공하는 독립 npm 패키지(tiptap-editor-kit)로 오픈소스 배포",
      },
    ],
    metrics: [
      {
        value: "99.8%",
        change: "2.5GB → 3MB",
        label: "패키지 크기 감소",
      },
      {
        value: "50%",
        change: "12분 → 6분",
        label: "운영 배포 시간 단축",
      },
      { value: "npm", change: null, label: "오픈소스 패키지 배포 (tiptap-editor-kit)" },
    ],
  },
];

export function getProjectBySlug(slug: string): ProjectData | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAdjacentProjects(slug: string) {
  const index = projects.findIndex((p) => p.slug === slug);
  return {
    prev: index > 0 ? projects[index - 1] : null,
    next: index < projects.length - 1 ? projects[index + 1] : null,
  };
}
