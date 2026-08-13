import { ProjectData } from "@/types/project";

export const projects: ProjectData[] = [
  // ─── 품질 · 자동화 ───
  {
    slug: "qa-automation-bot",
    title: "QA 자동화 봇 (스모크·단위·E2E + AI 테스트 생성)",
    company: "주식회사 루멘테라",
    period: "2026년 3월 - 현재",
    role: "Developer",
    techStack: [
      "Playwright",
      "TypeScript",
      "Claude API",
      "AWS Bedrock",
      "Stagehand",
      "GitHub Actions",
      "AWS EC2",
      "Linear SDK",
    ],
    overview: {
      lead: "PR마다 스모크·단위·E2E 90개 이상의 케이스를 자동 실행하고, 변경 diff를 분석해 Playwright 테스트를 AI로 생성·검증까지 하는 QA 봇을 설계·구축했습니다. 5개월 넘게 CI에서 지속 실행되며 팀의 PR 게이트로 정착했습니다.",
      detail:
        "릴리스마다 사람이 손으로 화면을 눌러보는 QA가 병목이었습니다. 역할별 로그인 fixture를 만들고 고정 스위트를 PR 게이트로 세운 뒤, 변경된 코드에 대한 테스트는 AI가 생성하도록 파이프라인을 붙였습니다. 다만 AI가 만든 테스트를 그대로 신뢰할 수는 없기에, 문법 검증·DB 읽기 전용 강제·비용 로깅 같은 검증 장치를 함께 설계했습니다.",
    },
    screenshots: [],
    challenges: [
      {
        title: "수동 QA가 릴리스 병목",
        before: [
          "릴리스마다 역할별 주요 플로우를 사람이 직접 클릭해 확인",
          "확인 범위가 담당자마다 달라 회귀 버그가 운영까지 흘러감",
        ],
        after: [
          "역할별 로그인 fixture 기반으로 스모크·단위·E2E 3계층에 걸쳐 90개 이상의 케이스 구성",
          "main 대상 PR에서 자동 실행되는 게이트로 배선, 결과를 PR 코멘트와 HTML 리포트로 회수",
          "특정 티켓 버그를 재현하는 회귀 스펙을 따로 두어 같은 버그가 두 번 나지 않도록 고정",
        ],
      },
      {
        title: "변경마다 테스트를 사람이 새로 써야 함",
        before:
          "기능이 바뀔 때마다 어떤 화면이 영향을 받는지 판단하고 스펙을 손으로 추가해야 하는 구조",
        after: [
          "티켓 추출 → diff 분석 → 파일 분류 → 라이브 DOM 셀렉터 수집 → 프롬프트 구성 → 생성 → 검증 → 실행 → PR 코멘트 파이프라인 구축",
          "변경 코드와 사이드이펙트 예상 범위만 테스트하도록 제한 (무관한 테스트 생성 방지)",
          "셀렉터 수집에는 저비용 모델, 테스트 생성에는 고성능 모델로 역할 분리",
          "셀렉터 수집이 실패해도 정적 셀렉터 패턴으로 fallback해 파이프라인이 멈추지 않도록 설계",
        ],
      },
      {
        title: "AI가 만든 테스트를 그대로 믿을 수 없음",
        before:
          "생성된 코드가 문법적으로 깨지거나, 테스트가 실제 데이터를 건드릴 위험이 있는 상태",
        after: [
          "생성 코드 TypeScript 문법 검증 후 실패 시 에러 컨텍스트를 넣어 1회 재시도",
          "AI가 생성한 테스트가 데이터를 변조하지 못하도록 쓰기 요청을 차단",
          "AI 생성 스펙은 참고용으로 분리 — 실패해도 PR 체크에 반영되지 않게 하고, 고정 스위트만 게이트로 사용",
          "토큰 비용을 로그 prefix로 노출하고, 스펙 실행 자체는 LLM을 쓰지 않아 비용이 0임을 teardown에 기록",
        ],
      },
      {
        title: "CI 실행 시간과 운영 비용",
        before:
          "전체 스위트를 순차 실행하면 PR 피드백이 늦고, 테스트 전용 환경이 놀면서도 계속 비용을 쓰는 구조",
        after: [
          "워커 3 병렬 + 빌드 해시 스킵 + 빌드 병렬화로 웜 캐시 기준 8~12분까지 단축",
          "테스트 전용 실행 환경을 상시 가동하지 않고 필요한 시점에만 기동·종료하도록 운용",
        ],
      },
    ],
    metrics: [
      {
        value: "90+",
        change: "스모크 · 단위 · E2E 3계층",
        label: "PR마다 자동 실행되는 테스트 케이스",
      },
      {
        value: "지속 실행",
        change: "5개월+",
        label: "팀의 PR 게이트로 정착",
      },
      {
        value: "read-only",
        change: null,
        label: "AI 생성 테스트의 데이터 변조 차단",
      },
    ],
  },
  {
    slug: "dx-automation",
    title: "배포 알림·기록 자동화",
    company: "주식회사 루멘테라",
    period: "2026년 5월",
    role: "Developer",
    techStack: [
      "GitHub Actions",
      "Composite Action",
      "Slack API",
      "Notion API",
      "Node.js",
      "Bash",
    ],
    overview: {
      lead: "하루에도 여러 번 배포되지만 무엇이 왜 배포됐는지 알 수 없던 문제를, 공용 CI 액션으로 해결했습니다. 요청받은 일이 아니라 팀의 반복 병목을 직접 찾아 만든 도구입니다.",
      detail:
        "배포 알림이 단일 서비스에 이메일로만 전달돼 가독성이 낮았고, 배포 이력이 자동으로 남지 않아 사후 추적이 어려웠습니다. 직전 성공 배포 이후의 커밋을 티켓별로 묶어 Slack에 보내는 Composite Action을 만들어 여러 서비스에 공통 적용하고, 배포 기록을 Notion에 자동 생성하도록 배선했습니다.",
    },
    screenshots: [],
    challenges: [
      {
        title: "상시 배포되지만 변경점을 알 수 없던 문제",
        before: [
          "하루에도 여러 번 배포가 일어나지만 무엇이·왜 배포됐는지 파악이 어려움",
          "배포 알림이 단일 서비스에, 그것도 이메일 형태로만 전달돼 가독성 낮음",
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
          "운영 배포 워크플로 전반에 Notion 배포 기록을 자동 생성하는 액션을 배선하고, 기존 이메일 알림은 정리",
      },
    ],
    metrics: [
      {
        value: "티켓별 그룹핑",
        change: null,
        label: "배포 커밋 자동 정리 → Slack 발송",
      },
      {
        value: "자동 기록",
        change: "운영 배포 워크플로 전반",
        label: "배포 이력을 Notion에 자동 생성",
      },
      {
        value: "설정 한 줄",
        change: null,
        label: "Composite Action 단일화로 신규 서비스 확장",
      },
    ],
  },
  {
    slug: "meeting-notifier-bot",
    title: "사내 회의 알림 봇",
    company: "주식회사 루멘테라",
    period: "2026년 5월",
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

  // ─── 아키텍처 · 성능 ───
  {
    slug: "vsa-migration",
    title: "프론트엔드 아키텍처 마이그레이션 (VSA 하이브리드)",
    company: "주식회사 루멘테라",
    period: "2026년 4월",
    role: "Frontend Developer",
    techStack: [
      "Next.js (App Router)",
      "React",
      "TypeScript",
      "Node.js CLI",
      "Playwright",
      "GitHub Actions",
    ],
    overview: {
      lead: "수백 개 파일 규모의 프론트엔드 구조를 재설계했습니다. 후보 4안을 비교한 뒤 의존성을 전수조사해 교과서적인 정답(완전한 Vertical Slice)을 근거와 함께 기각하고, 하이브리드 구조를 택했습니다.",
      detail:
        "기능이 늘면서 관련 코드가 레이어별로 흩어져 변경 영향 범위를 예측하기 어려웠습니다. FSD·Screaming Architecture·Vertical Slice·점진적 하이브리드 네 가지를 비교했고, 여기서 멈추지 않고 실제 hooks·types·api가 몇 개의 라우트에서 쓰이는지 전수조사했습니다. 그 결과 '완전한 코로케이션'이 이 코드베이스에서는 불가능하다는 사실이 드러나 하이브리드로 방향을 정했고, 정한 규칙은 검증 CLI로 만들어 CI에 고정했습니다.",
    },
    screenshots: [],
    challenges: [
      {
        title: "어떤 구조를 택할 것인가 — 후보 4안 비교",
        before:
          "기능 추가마다 컴포넌트·훅·타입·API가 레이어별로 흩어져, 하나를 고칠 때 무엇이 영향을 받는지 예측하기 어려운 구조",
        after: [
          "FSD / Screaming Architecture / Vertical Slice / 점진적 하이브리드 4안을 App Router 호환성·마이그레이션 비용·현재 구조와의 거리 기준으로 비교",
          "이미 라우트 코로케이션이 적용돼 있던 웨비나 화면을 실증 사례로 삼아 Vertical Slice를 유력안으로 선정",
        ],
      },
      {
        title: "교과서적인 정답을 그대로 적용할 수 없었던 이유",
        before:
          "'모든 코드를 라우트 안으로 모은다'는 원칙을 그대로 따르면 되는 것처럼 보였던 상황",
        after: [
          "hooks·types·api가 실제로 몇 개 라우트에서 쓰이는지 전수조사 실시",
          "hooks는 65%가 여러 라우트를 가로지르고, types는 100%가 전역 선언이라 물리적으로 이동조차 불가능함을 확인",
          "→ 완전한 Vertical Slice를 근거와 함께 기각. 컴포넌트만 라우트에 코로케이션하고 hooks·types·api는 공통 레벨에 유지하는 하이브리드 채택",
        ],
      },
      {
        title: "수백 개 파일을 깨뜨리지 않고 옮기기",
        before:
          "한 번에 옮기면 회귀를 잡을 방법이 없고, 어디서 깨졌는지 특정하기도 어려운 규모",
        after: [
          "이동 전에 라우트 스모크 테스트 27개를 먼저 만들어 회귀 안전망 확보 (27/27 통과 유지)",
          "네이밍 정규화 → 단일 파일 → 다중 파일 → 도메인별 → 정리 순으로 Phase를 나눠 티켓 11개로 분할 진행",
          "컨테이너 약 92개·공통 모달 import 121곳·상대경로 27곳을 단계적으로 이관",
          "이동 과정에서 방치돼 있던 미사용 파일과 라우트를 함께 정리",
        ],
      },
      {
        title: "컨벤션을 코드리뷰에만 맡기지 않기",
        before:
          "폴더 구조와 의존 방향 규칙이 리뷰어의 기억에 의존해, 시간이 지나면 다시 무너질 수밖에 없는 상태",
        after: [
          "라우트 간 직접 import 금지·비표준 네이밍 금지·상대경로 금지 등 7개 규칙을 검증하는 CLI를 직접 구현",
          "PR마다 자동 실행되는 검사로 배선해 규칙 위반이 머지되지 않도록 고정",
          "실제 운영해 보니 일부 규칙은 정상 패턴까지 잡아내어, 해당 규칙은 ERROR에서 WARN으로 재조정",
        ],
      },
    ],
    metrics: [
      {
        value: "수백 개",
        change: "미사용 파일·라우트 정리 포함",
        label: "마이그레이션 대상 TS/TSX 파일",
      },
      {
        value: "상시 검증",
        change: "모든 PR",
        label: "아키텍처 규칙 자동 검증",
      },
      {
        value: "0 errors",
        change: "라우트 스모크 27/27 통과",
        label: "7규칙 검증 통과 상태 유지",
      },
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
      lead: "느렸던 초기 로딩을 코드 스플리팅·이미지·렌더링 최적화로 전방위 개선했습니다. 프론트엔드 성능 최적화를 단독으로 수행했고, 현재 데스크톱 실측 기준 초기 렌더 0.6s·메인스레드 블로킹 10ms 수준으로 동작합니다.",
      detail:
        "플랫팜 클라이언트의 초기 로딩이 느려 사용자 경험을 해치고 있었습니다. Next.js 내장 최적화 기반의 코드 스플리팅, next/image와 캐시를 활용한 이미지 최적화, 메모이제이션과 prefetch·Link 전환을 통한 렌더링·네비게이션 최적화를 순차적으로 적용했습니다. 그 결과 초기 렌더와 메인스레드 반응성이 뚜렷이 개선됐습니다.",
    },
    screenshots: [],
    challenges: [
      {
        title: "거대한 초기 번들",
        before: "페이지 전반이 크게 묶여 로드되어 초기 로딩이 오래 걸리는 구조",
        after:
          "Next.js 내장 최적화 기반의 코드 스플리팅과 dynamic import로 초기 로딩에 필요한 코드만 우선 로드",
      },
      {
        title: "불필요한 리렌더링",
        before:
          "상태 변경 시 무관한 컴포넌트까지 리렌더링되며, 인터랙션이 수 초간 멈출 만큼 메인스레드 블로킹이 심했음",
        after:
          "React.memo, useMemo, useCallback 적용 및 상태 구조 재설계로 렌더링 횟수를 대폭 줄여, 현재 데스크톱 실측 기준 메인스레드 블로킹(TBT) 10ms 수준",
      },
      {
        title: "최적화되지 않은 이미지",
        before: "원본 사이즈 이미지가 그대로 로드되어 LCP 점수 저하",
        after: "Next.js Image + WebP 변환 + lazy loading 적용으로 LCP 개선",
      },
    ],
    metrics: [
      {
        value: "TBT 10ms",
        change: null,
        label: "메인스레드 블로킹 최소화 (데스크톱 실측)",
      },
      {
        value: "FCP 0.6s",
        change: null,
        label: "초기 콘텐츠 렌더 (데스크톱 실측)",
      },
      { value: "단독", change: null, label: "프론트엔드 성능 최적화 전 과정 수행" },
    ],
  },

  // ─── 제품 개발 ───
  {
    slug: "design-system",
    title: "디자인 시스템 구현 및 전면 적용",
    company: "주식회사 루멘테라",
    period: "2026년 3월 ~ 7월",
    role: "Frontend Developer",
    techStack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "CSS Variables",
      "Figma",
    ],
    overview: {
      lead: "스타일 기준이 갱신되는 동안 적용이 일부 화면에만 이뤄져, 레거시 스타일과 현행 스타일이 한 화면에 섞여 있었습니다. 디자인 측이 정의한 토큰 체계를 코드로 구현하고 공용 컴포넌트로 화면 전반을 통일한 뒤, 정합 규칙을 만들어 이후에도 디자인 시스템을 지키며 유지보수할 수 있게 했습니다.",
      detail:
        "3가지 문제가 있었습니다. 레거시 스타일과 현행 스타일이 한 화면에 섞여 있었고, 공용 컴포넌트는 일부 화면에서만 쓰였고, 색은 의미 토큰 대신 프리미티브 팔레트를 직접 참조하고 있었습니다. 스타일 기준이 갱신되는 동안 적용이 일부 화면에만 이뤄져 누적된 상태였습니다. 디자인 측이 정리한 역할 기반 토큰 체계를 코드로 구현해 화면 전반에 적용하고, 남아 있던 직접 마크업을 공용 컴포넌트로 대체했습니다. 이후에도 기준을 따라갈 수 있도록 정합 규칙을 만들어 코드베이스에 남겼습니다.",
    },
    screenshots: [],
    challenges: [
      {
        title: "레거시와 현행 스타일이 한 화면에 섞여 있음",
        before: [
          "스타일 기준이 갱신되면서 이전 기준과 새 기준이 코드에 함께 남음",
          "새 기준이 적용된 페이지와 그대로인 페이지가 섞여, 같은 버튼이 화면마다 다르게 보이는 상태",
        ],
        after: [
          "현행 기준을 단일 기준으로 확정하고, 남아 있던 레거시 스타일 호출부를 화면 전반에서 정리",
          "약국 화면과 벤더 관리자 화면을 같은 기준으로 맞춰 서비스 전체의 시각적 일관성 확보",
        ],
      },
      {
        title: "색을 팔레트에서 직접 가져다 쓰고 있었음",
        before: [
          "색상 팔레트 목록은 있었지만 역할별 의미 토큰이 코드에 반영돼 있지 않은 상태였음",
          "화면에서는 팔레트 값이나 색상 코드를 직접 지정했고, 같은 의미의 색이 화면마다 다른 값으로 들어감",
          "디자인 변경 요청이 오면 어디를 고쳐야 하는지 특정할 수 없는 구조",
        ],
        after: [
          "디자인 측이 정의한 역할별 토큰 체계를 CSS 변수로 구현하고 Tailwind에 매핑",
          "투명도 조합까지 지원하도록 채널 포맷으로 구성해, 같은 토큰으로 옅은 배경까지 처리",
          "화면에 남아 있던 팔레트 값과 색상 코드 직접 지정을 걷어내고 의미 토큰 호출로 전환",
          "타이포도 정해진 체계로 맞춰 임의 클래스 사용을 대체",
        ],
      },
      {
        title: "공용 컴포넌트가 일부 화면에서만 쓰이고 있었음",
        before:
          "버튼·탭·입력·체크박스·뱃지 공용 컴포넌트가 있었지만 일부 화면만 사용하고, 나머지는 각자 직접 마크업해 한 곳을 고쳐도 나머지가 그대로 남는 구조",
        after: [
          "직접 마크업으로 남아 있던 곳을 공용 컴포넌트 호출로 대체",
          "상품 카드는 크기 × 방향 × 상태 조합을 하나의 컴포넌트로 묶고, 상태 판정 로직을 분리해 단위 테스트로 고정",
        ],
      },
      {
        title: "적용 이후 따라갈 유지보수 기준이 없었음",
        before:
          "이번에 화면을 다 맞춰도, 다음 기능 개발에서 어떤 컴포넌트와 어떤 토큰을 써야 하는지 기준이 없어 각자 판단에 맡겨지는 상태",
        after: [
          "UI 수정 시 따라야 할 정합 규칙을 코드베이스 문서에 명시 — 공용 컴포넌트 우선 재사용, 의미 토큰 우선, 팔레트·색상 코드 직접 지정 금지, 타이포는 정해진 체계 사용",
          "토큰 정의 위치와 매핑 위치를 함께 적어, 이후 작업자가 기준을 찾아보고 따를 수 있게 함",
        ],
      },
    ],
    metrics: [
      {
        value: "토큰 전환",
        change: "팔레트 직접 참조 → 의미 토큰",
        label: "디자인 측이 정의한 토큰 체계를 CSS 변수·Tailwind로 구현",
      },
      {
        value: "전면 적용",
        change: "일부 페이지 → 약국 · 벤더 관리자 화면 전반",
        label: "부분 리뉴얼로 생긴 스타일 불일치 해소",
      },
      {
        value: "유지보수 기준",
        change: "정합 규칙 문서화",
        label: "이후 UI 수정도 디자인 시스템을 지키며 진행 가능",
      },
    ],
  },
  {
    slug: "webinar-live",
    title: "웨비나 라이브 스트리밍 페이지",
    company: "주식회사 루멘테라",
    period: "2026년 2월",
    role: "Frontend Developer",
    techStack: [
      "Next.js (App Router)",
      "React",
      "TypeScript",
      "Naver Cloud Player",
      "TanStack Query",
    ],
    overview: {
      lead: "약국 대상 웨비나를 위해 라이브 스트리밍 시청 페이지와 사전예약·시청 현황 기능을 구현했습니다. 이 화면에서 처음 적용한 라우트 코로케이션 구조가 이후 전사 아키텍처 마이그레이션의 실증 사례가 됐습니다.",
      detail:
        "제약사가 약국을 대상으로 진행하는 웨비나를 서비스 안에서 직접 시청할 수 있도록, 외부 스트리밍 플레이어를 연동한 시청 페이지를 만들었습니다. 사전예약 신청과 실시간 참여 현황을 함께 제공하고, 시청 이력과 연관 상품을 연결해 웨비나에서 상품 구매로 이어지도록 구성했습니다.",
    },
    screenshots: [],
    challenges: [
      {
        title: "외부 스트리밍 플레이어 연동",
        before:
          "서비스 내에 라이브 영상 송출 수단이 없어, 웨비나가 외부 플랫폼에서 따로 진행되던 상황",
        after:
          "Naver Cloud Player를 연동한 시청 페이지를 구현해 서비스 안에서 라이브 시청이 가능하도록 하고, 시청 이력과 연관 상품을 연결",
      },
      {
        title: "사전예약과 참여 현황 파악",
        before: "누가 신청했고 실제로 몇 명이 보고 있는지 확인할 방법이 없음",
        after:
          "사전예약 신청 기능과 실시간 참여 현황 확인 기능을 함께 구현해 운영 측에서 바로 파악 가능하도록 구성",
      },
      {
        title: "기능 단위로 코드를 모아본 첫 시도",
        before:
          "기존 구조에서는 한 기능의 컴포넌트·훅·타입이 레이어별 폴더에 흩어져 있어 변경 범위를 짚기 어려움",
        after:
          "웨비나 관련 컴포넌트를 라우트 폴더 안에 모아두는 방식으로 구현했고, 이 구조가 이후 전사 아키텍처 마이그레이션에서 채택 근거로 인용됨",
      },
    ],
    metrics: [
      {
        value: "라이브",
        change: null,
        label: "Naver Cloud Player 기반 스트리밍 송출",
      },
      {
        value: "사전예약",
        change: null,
        label: "신청 접수 + 실시간 참여 현황",
      },
      {
        value: "구조 실증",
        change: null,
        label: "라우트 코로케이션 첫 적용 → 전사 마이그레이션 근거",
      },
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
          '"부산,대구 = 영업사원1" 수준의 비정형 데이터 존재',
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
