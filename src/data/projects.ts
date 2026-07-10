import { ProjectData } from "@/types/project";

export const projects: ProjectData[] = [
  {
    slug: "dx-automation",
    title: "개발·운영 자동화 (DX)",
    company: "주식회사 루멘테라",
    period: "2026년 상반기",
    role: "Frontend Developer",
    techStack: [
      "GitHub Actions",
      "Composite Action",
      "Slack API",
      "Notion API",
      "Node.js",
      "Bash",
    ],
    overview: {
      lead: "상시 배포의 변경점 파악과 아키텍처 일관성 유지를 자동화로 해결했습니다. 요청받은 일이 아니라 팀의 반복 병목을 직접 찾아 공용 CI 도구로 만들었습니다.",
      detail:
        "하루에도 여러 번 배포가 일어나는데 무엇이·왜 배포됐는지 파악하기 어려웠고, 배포 알림은 단일 서비스에 이메일로만 전달됐습니다. 또 프론트엔드 규모가 커지며 아키텍처 컨벤션이 코드리뷰만으로는 일관되게 지켜지기 어려웠습니다. 배포 알림·기록 자동화와 아키텍처 검증 CI를 직접 설계·구축해 팀 전체가 쓰는 공용 도구로 정착시켰습니다.",
    },
    screenshots: [],
    challenges: [
      {
        title: "상시 배포되지만 변경점을 알 수 없던 문제",
        before: [
          "하루에도 여러 번 배포가 일어나지만 무엇이·왜 배포됐는지 파악이 어려움",
          "배포 알림이 단일 서비스에, 그것도 이메일(SES→Teams) 형태로만 전달돼 가독성 낮음",
        ],
        after: [
          "직전 성공 배포 SHA를 GitHub API로 조회해, 그 사이 커밋을 티켓별로 그룹핑해 Slack으로 발송하는 Composite Action 구축",
          "클라이언트·서버·어드민 등 다중 서비스에 통합, 새 서비스도 설정 한 줄로 동일 알림 적용",
          "본문 길이 컷·API 타임아웃·HTTP 응답 검증 등 안전 가드까지 반영",
        ],
      },
      {
        title: "배포 이력이 흩어져 사후 추적이 어려움",
        before:
          "배포 내역이 자동으로 남지 않아 언제 무엇이 배포됐는지 사후에 추적하기 어려움",
        after:
          "운영 배포 워크플로 9곳에 Notion 배포 기록을 자동 생성하는 액션을 배선하고, 기존 Teams 이메일 알림은 정리",
      },
      {
        title: "코드리뷰만으로는 지키기 어려운 아키텍처 컨벤션",
        before:
          "프론트엔드 규모가 커지며 폴더 구조·의존 방향 규칙이 코드리뷰만으로는 일관되게 지켜지기 어려움",
        after:
          "VSA(Vertical Slice Architecture) 컨벤션 7개 규칙을 검증하는 CLI를 직접 구현하고, pre-commit과 GitHub Actions PR 검사로 자동화",
      },
    ],
    metrics: [
      {
        value: "티켓별 그룹핑",
        change: null,
        label: "배포 커밋 자동 정리 → Slack 발송",
      },
      { value: "9곳", change: null, label: "배포 워크플로 Notion 기록 자동화 배선" },
      { value: "VSA 7규칙", change: null, label: "아키텍처 컨벤션 CI 자동 검증" },
    ],
  },
  {
    slug: "meeting-notifier-bot",
    title: "사내 회의 알림 봇",
    company: "주식회사 루멘테라",
    period: "2026년 상반기",
    role: "Developer",
    techStack: ["Node.js", "Slack Web API", "node-cron", "Luxon", "PM2"],
    overview: {
      lead: "잦은 내부 회의에서 참여 여부를 매번 수동으로 확인해야 하던 불편을, 전 구성원 대상 자동 알림 봇으로 해결했습니다.",
      detail:
        "노션 연동이 Slack 채널에 올리는 회의 요청 메시지를 파싱해, 참여자 이름을 Slack 사용자와 매칭하고, 회의 10분 전·시작 시점에 참여자에게 개인 DM을 보냅니다. 평일 오전 9시에는 당일 회의 일정을 채널에 일괄 안내합니다. 개발 대상이 아닌 전사 구성원의 회의 참여 경험을 개선한 사내 편의 자동화입니다.",
    },
    screenshots: [],
    challenges: [
      {
        title: "참여 여부를 매번 수동으로 확인해야 하던 문제",
        before: [
          "회의가 잦고 Slack에 게시되지만 건수가 많아 당일 회의·참여자를 한눈에 파악하기 어려움",
          "확인이 개인 책임에 의존해 회의 누락·지각 발생",
        ],
        after: [
          "노션이 올린 회의 메시지를 파싱해 참여자 이름을 Slack ID로 매칭 (별칭·부분일치·멘션 토큰 대응)",
          "회의 10분 전·시작 시점에 참여자 개인 DM 자동 발송, 평일 09시엔 당일 일정 채널 일괄 안내",
        ],
      },
      {
        title: "무인 상시 운영의 안정성 확보",
        before:
          "일회성 스크립트로는 회의 일정 변경·중복이나 장시간 구동 시 신뢰성을 확보하기 어려움",
        after: [
          "상태 영속화 + 제목·시간 기준 dedup, 시간 변경 시 최신 메시지로 자동 교체",
          "공휴일 스킵(공공 API), 매칭 실패 시 관리자 알림, 헬스체크 HTTP 엔드포인트, PM2 상시 구동",
        ],
      },
    ],
    metrics: [
      { value: "전사", change: null, label: "구성원 회의 참여 알림 자동화" },
      {
        value: "10분 전·시작",
        change: null,
        label: "참여자 개인 DM 자동 발송",
      },
      { value: "무인 상시", change: null, label: "dedup·공휴일·헬스체크 + PM2 구동" },
    ],
  },
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
        before: "모든 페이지가 단일 번들로 로드되어 초기 로딩 8초 이상",
        after:
          "라우트 기반 코드 스플리팅과 dynamic import로 초기 번들 60% 이상 감소",
      },
      {
        title: "불필요한 리렌더링",
        before: "상태 변경 시 무관한 컴포넌트까지 리렌더링되어 인터랙션 지연",
        after:
          "React.memo, useMemo, useCallback 적용 및 상태 구조 재설계로 렌더링 횟수 대폭 감소",
      },
      {
        title: "최적화되지 않은 이미지",
        before: "원본 사이즈 이미지가 그대로 로드되어 LCP 점수 저하",
        after: "Next.js Image + WebP 변환 + lazy loading 적용으로 LCP 개선",
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
      "Next.js (App Router)",
      "React",
      "TypeScript",
      "SSR / RSC",
      "Zustand",
      "TanStack Query",
      "Tailwind CSS",
      "Emotion",
      "MUI",
    ],
    overview: {
      lead: "B2B 직거래 플랫폼 '플랫팜'의 초기 설계부터 참여하여, 70개 이상 벤더사를 수용하는 프론트엔드 아키텍처를 구축했습니다.",
      detail:
        "벤더사마다 다른 요구사항을 유연하게 수용할 수 있는 구조가 핵심이었습니다. Next.js App Router 기반의 SSR/RSC(서버 컴포넌트)로 초기 로딩과 SEO를 확보하고, 컴포넌트 설계, 상태 관리 전략, API 연동 구조, 폴더 체계 등 프론트엔드 전반의 아키텍처를 설계하고 기능 고도화를 주도했습니다.",
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
    slug: "vendor-matching",
    title: "영업 담당자 자동매칭 시스템 구축 및 DB 마이그레이션",
    company: "주식회사 루멘테라",
    period: "2025년 8월 ~ 2026년 3월",
    role: "Fullstack Developer",
    techStack: [
      "Next.js",
      "React",
      "TypeScript",
      "NestJS",
      "Node.js",
      "PostgreSQL",
      "Python",
      "Claude Code",
    ],
    overview: {
      lead: "주요 벤더사의 비정형 지역 데이터를 표준화하고, 약국 주소 기반 담당자 자동매칭 시스템을 구축하여 수동 매칭으로 인한 거래 지연 문제를 해결했습니다.",
      detail:
        "벤더사마다 완전히 다른 지역 구분 체계를 통일된 데이터로 정규화한 뒤, 행정안전부 도로명주소 API를 활용한 자동매칭 시스템을 구축했습니다. 이후 정적 JSON 158,000줄을 DB로 마이그레이션하고 매칭 로직을 서버로 전면 이관하여, 벤더사 관리자가 직접 데이터를 관리할 수 있는 환경까지 완성했습니다.",
    },
    screenshots: [],
    challenges: [
      {
        title: "비정형 벤더 데이터 → 통일된 JSON 데이터로 변환",
        before: [
          "벤더사마다 완전히 다른 지역 구분 체계",
          "A 벤더는 전국 2,000여 개 세분화, B 벤더는 20여 개로 구분",
          "\"부산,대구 = 영업사원1\" 수준의 비정형 데이터 존재",
        ],
        after: [
          "가장 세분화된 벤더 데이터 기준으로 타 벤더사 대조, 전국 2,705개 지역 마스터 데이터(Brick Form) 설계",
          "Python 매핑 도구로 주소 파싱 → 정확 매칭 → 유사도 매칭 3단계 정규화",
          "벤더별 비정형 데이터를 통일된 JSON 구조로 변환",
        ],
      },
      {
        title: "수동 매칭 → 자동매칭 시스템 구축",
        before: [
          "벤더사 관리자가 거래신청 건마다 담당 영업사원을 직접 확인·수동 매칭하는 구조",
          "입점 초기 하루 수백 건 이상의 거래신청을 벤더 측에서 일일이 처리",
          "승인 지연으로 거래 미성사 및 약국의 거래신청 취소 발생",
          "플랫폼 거래 수수료 손실 및 벤더·약국 양측의 신뢰도 하락",
        ],
        after: [
          "정규화된 JSON + 행정안전부 도로명주소 API 활용, 약국 주소 기반 담당자 자동매칭 시스템 구축",
          "자동 매칭 성공률 80% 이상 달성",
          "예외 케이스 점진적 처리로 90% 이상까지 개선",
        ],
      },
      {
        title: "JSON 하드코딩 → DB + 서버 전면 이관",
        before: [
          "영업사원 인사이동·담당지역 변경 시 개발자가 JSON 직접 수정 후 배포 필요",
          "반영까지 수일 소요, 잘못된 담당자 배정 또는 미배정으로 거래 승인 지연",
          "변경 이력 추적 불가",
          "프론트엔드에 매칭 로직 산재",
          "동일 JSON이 두 프로젝트에 복제, 한쪽만 수정될 리스크",
        ],
        after: [
          "DB 4개 테이블 설계 + 데이터 마이그레이션",
          "매칭 로직 서버 전면 이관 (프론트 코드 ~700줄 삭제, JSON 158,000줄 제거)",
          "벤더사 관리자가 개별 CRUD + 엑셀 업로드 → diff 확인 → 승인 워크플로우로 직접 관리",
          "표준화된 데이터 구조 + 검증된 매칭 로직 기반, Claude Code 활용 고도화로 DB 설계~QA 1주일 내 완료",
        ],
      },
    ],
    metrics: [
      { value: "90%+", change: null, label: "담당자 자동매칭 성공률" },
      {
        value: "0",
        change: "158,000줄 → 0",
        label: "정적 JSON 완전 제거",
      },
      { value: "1주일", change: null, label: "DB 마이그레이션 ~ QA" },
    ],
  },
  {
    slug: "editor-migration",
    title: "WYSIWYG 에디터 마이그레이션",
    company: "주식회사 루멘테라",
    period: "2026년 3월",
    role: "Frontend Developer",
    techStack: ["Tiptap", "ProseMirror", "React", "TypeScript", "Tailwind CSS"],
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
      {
        value: "npm",
        change: null,
        label: "오픈소스 패키지 배포 (tiptap-editor-kit)",
      },
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
