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
      lead: "Chrome Lighthouse 성능 점수를 13점에서 78점으로 개선하며, B2B SaaS 플랫폼의 사용자 경험을 근본적으로 향상시켰습니다.",
      detail:
        "플랫팜 서비스의 초기 로딩 속도와 인터랙션 성능이 사용자 이탈의 주요 원인으로 파악된 후, 렌더링 파이프라인 전반에 걸친 최적화를 단독으로 수행했습니다. 번들 분석부터 코드 스플리팅, 이미지 최적화, 메모이제이션 전략까지 체계적으로 접근하여 측정 가능한 성과를 달성했습니다.",
    },
    screenshots: [],
    challenges: [
      {
        title: "거대한 초기 번들 사이즈",
        before:
          "모든 페이지와 컴포넌트가 단일 번들로 로드되어 초기 로딩에 8초 이상 소요",
        after:
          "라우트 기반 코드 스플리팅과 dynamic import를 적용하여 초기 번들 크기 60% 이상 감소",
      },
      {
        title: "불필요한 리렌더링",
        before:
          "상태 변경 시 관련 없는 컴포넌트까지 리렌더링되어 인터랙션 지연 발생",
        after:
          "React.memo, useMemo, useCallback을 전략적으로 적용하고 상태 구조를 재설계하여 렌더링 횟수 대폭 감소",
      },
      {
        title: "최적화되지 않은 이미지 처리",
        before:
          "원본 사이즈의 이미지가 그대로 로드되어 LCP(Largest Contentful Paint) 점수 저하",
        after:
          "Next.js Image 컴포넌트 활용, WebP 변환, lazy loading 적용으로 이미지 로딩 성능 개선",
      },
    ],
    metrics: [
      {
        value: "78",
        change: "13 → 78",
        label: "Lighthouse Performance Score",
      },
      { value: "60%+", change: null, label: "초기 번들 사이즈 감소" },
      { value: "단독", change: null, label: "프론트엔드 성능 최적화 수행" },
    ],
  },
  {
    slug: "cms-development",
    title: "자체 CMS 구축",
    company: "주식회사 루멘테라",
    period: "2025년 하반기 ~ 2026년 상반기",
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
      lead: "프론트엔드와 백엔드 전 과정을 단독으로 개발한 자체 CMS 구축을 통해 운영 효율과 개발 생산성을 동시에 개선했습니다.",
      detail:
        "기존에는 콘텐츠 수정 시 매번 개발자가 코드를 직접 수정하고 배포해야 했습니다. 이를 해결하기 위해 운영팀이 직접 콘텐츠를 관리할 수 있는 자체 CMS를 설계하고 구축했습니다. 프론트엔드 UI부터 백엔드 API, 파일 업로드, 권한 관리까지 전체 스택을 단독으로 개발했습니다.",
    },
    screenshots: [],
    challenges: [
      {
        title: "비개발자를 위한 직관적인 편집 UI",
        before:
          "콘텐츠 수정이 필요할 때마다 개발자에게 요청해야 하는 병목 구조",
        after:
          "WYSIWYG 에디터와 드래그앤드롭 UI를 구현하여 운영팀이 직접 콘텐츠를 관리할 수 있는 환경 구축",
      },
      {
        title: "프론트엔드-백엔드 동시 개발",
        before: "백엔드 리소스가 제한된 환경에서 CMS 전체를 구축해야 하는 상황",
        after:
          "NestJS 기반 RESTful API를 직접 설계하고 구현하여 프론트엔드와 백엔드를 유기적으로 개발",
      },
      {
        title: "파일 관리 시스템",
        before: "이미지와 파일 업로드에 대한 체계적인 관리 시스템 부재",
        after:
          "AWS S3 연동 파일 업로드 시스템 구축, 이미지 리사이징 및 최적화 파이프라인 구현",
      },
    ],
    metrics: [
      { value: "100%", change: null, label: "풀스택 단독 개발" },
      {
        value: "80%+",
        change: null,
        label: "콘텐츠 수정 관련 개발 요청 감소",
      },
      { value: "6개월", change: null, label: "설계부터 운영까지" },
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
      lead: "B2B 직거래 통합관리 플랫폼 '플랫팜'의 서비스 초기 설계 단계부터 참여하여, 확장 가능한 프론트엔드 아키텍처를 구축했습니다.",
      detail:
        "다양한 벤더사의 요구사항을 수용할 수 있는 유연한 구조가 필요했습니다. 컴포넌트 설계 패턴, 상태 관리 전략, API 연동 구조, 폴더 구조 등 프론트엔드 전반의 아키텍처를 설계하고 기능 고도화를 주도했습니다.",
    },
    screenshots: [],
    challenges: [
      {
        title: "다양한 벤더사 요구사항 대응",
        before:
          "벤더사마다 다른 UI/UX 요구사항으로 인해 코드 중복과 유지보수 어려움 예상",
        after:
          "컴포넌트 컴포지션 패턴과 설정 기반 렌더링을 적용하여 벤더별 커스터마이징이 가능한 유연한 구조 설계",
      },
      {
        title: "상태 관리 복잡성",
        before:
          "B2B 플랫폼 특성상 복잡한 폼 상태, 주문 플로우, 실시간 데이터 동기화 필요",
        after:
          "Zustand로 클라이언트 상태, TanStack Query로 서버 상태를 분리 관리하여 예측 가능한 상태 흐름 구축",
      },
      {
        title: "초기 개발 속도와 코드 품질 균형",
        before: "빠른 출시가 필요하나 기술 부채를 최소화해야 하는 상충 상황",
        after:
          "공통 컴포넌트 라이브러리와 코드 컨벤션을 먼저 확립하여 개발 속도와 품질 모두 확보",
      },
    ],
    metrics: [
      { value: "1년+", change: null, label: "서비스 운영 및 유지보수" },
      { value: "70%", change: null, label: "프론트엔드 초기 구조 설계" },
      { value: "10+", change: null, label: "벤더사 대응 가능한 구조" },
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
