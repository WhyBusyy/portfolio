# WhyBusyy Portfolio

Next.js, TypeScript, React 기반의 프론트엔드 개발자 포트폴리오 웹사이트입니다.
단순한 이력 나열이 아닌, 프로젝트 케이스 스터디와 스토리텔링 중심의 포트폴리오를 지향합니다.

🌐 https://whybusyy.vercel.app

## 기술 스택

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS 3
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **Font**: Pretendard (variable dynamic subset)
- **Deployment**: Vercel

## 주요 기능

- **반응형 디자인**: 모바일, 태블릿, 데스크톱 모든 기기에서 최적화
- **다크 모드**: 라이트/다크 테마 전환 지원 (로컬 스토리지 저장)
- **프로젝트 케이스 스터디**: `/projects/[slug]` 동적 라우트를 통한 프로젝트 상세 페이지 (도전과제, 해결방안, 성과 지표 포함)
- **구조 다이어그램**: 프로젝트별 구조·흐름을 인라인 SVG 로 직접 작성 (외부 의존성 없음, 라이트/다크 대응)
- **의사결정 기록**: 후보를 비교해 방향을 정한 프로젝트에 채택·기각 사유와 판단 기준을 함께 표기
- **스킬 숙련도 시각화**: core / proficient / familiar 3단계 시각적 구분
- **스크롤 애니메이션**: Framer Motion 기반 fade-in + slide-up 인터랙션
- **접근성**: skip navigation, 섹션별 aria-labelledby, `prefers-reduced-motion` 대응 (Lighthouse 접근성 100)
- **성능**: 폰트 동적 서브셋으로 전송량 감축, 이미지 `next/image` 최적화 (Lighthouse 성능 98)
- **SEO**: Open Graph, Twitter Card, JSON-LD, sitemap/robots, 정적 생성(SSG)

## 섹션 구성

```
Navigation ─ 상단 네비게이션 (섹션 앵커, 다크모드 토글)
Hero ─────── 핵심 지표 3종 + CTA (프로젝트 보기, 연락하기)
About ────── 개인 정보 / 학력 / 외국어 / 자격증
HowIWork ──── 일할 때 지키는 기준 (각 항목에서 근거가 되는 프로젝트로 이동)
Work ─────── 회사 프로젝트 (트랙별 그룹 · 클릭 시 /projects/[slug] 이동)
SideProjects  개인 프로젝트 (가로 스크롤 캐러셀, GitHub/Demo/npm 링크)
Skills ────── 기술 스택 (숙련도별 시각 구분 + 범례)
Beyond Code ─ 비개발 경험과 개발자 강점 연결
Contact ───── 연락처
```

프로젝트 상세 페이지는 `Overview → Decisions → Structure(다이어그램) → Challenges & Solutions → Impact` 순으로 구성됩니다.
`Decisions` 는 후보 비교 기록이 남아 있는 프로젝트에만 렌더링됩니다 (`projects.ts` 의 `decisions` 필드).

## 프로젝트 구조

```
portfolio/
├── src/
│   ├── app/
│   │   ├── globals.css                # 전역 스타일 · 디자인 토큰
│   │   ├── layout.tsx                 # 루트 레이아웃 (Pretendard 폰트)
│   │   ├── page.tsx                   # 메인 페이지 (JSON-LD 포함)
│   │   ├── sitemap.ts                 # 사이트맵 생성
│   │   ├── robots.ts                  # robots.txt 생성
│   │   ├── demo/
│   │   │   └── tiptap-editor-kit/     # npm 패키지 데모 페이지
│   │   └── projects/
│   │       └── [slug]/
│   │           ├── page.tsx           # 프로젝트 상세 (서버 컴포넌트, SSG)
│   │           └── ProjectDetailClient.tsx
│   ├── components/
│   │   ├── Navigation.tsx             # 네비게이션 바 (다크모드 토글)
│   │   ├── Hero.tsx                   # 히어로 섹션 (핵심 지표)
│   │   ├── About.tsx                  # 개인 정보 / 학력 / 자격증
│   │   ├── Work.tsx                   # 회사 프로젝트 (트랙별 그룹)
│   │   ├── SideProjects.tsx           # 개인 프로젝트 캐러셀
│   │   ├── Skills.tsx                 # 기술 스택 (숙련도 구분)
│   │   ├── Experience.tsx             # Beyond Code (비개발 경험)
│   │   ├── HowIWork.tsx               # 일하는 방식
│   │   ├── Contact.tsx                # 연락처
│   │   └── diagrams/
│   │       ├── primitives.tsx         # 다이어그램 공용 시각 언어
│   │       ├── index.tsx              # slug → 다이어그램 매핑
│   │       └── *.tsx                  # 프로젝트별 다이어그램
│   ├── constants/
│   │   └── site.ts                    # SITE_URL (메타데이터 기준)
│   ├── data/
│   │   └── projects.ts                # 프로젝트 데이터 (케이스 스터디)
│   └── types/
│       └── project.ts                 # 프로젝트 타입 정의
├── public/                            # 이미지 · 로고 · OG 이미지
├── tailwind.config.ts
└── package.json
```

## 시작하기

### 의존성 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 결과를 확인하세요.

### 프로덕션 빌드

```bash
npm run build
npm start
```

## 커스터마이징

### 데이터 수정

- **src/data/projects.ts**: 프로젝트 데이터 (개요, 도전과제, 성과 지표, 기술 스택)
- **src/constants/site.ts**: 배포 URL (OG 이미지 · JSON-LD · sitemap · robots 에 전파)
- **Hero.tsx**: 핵심 지표 3종 및 CTA 링크
- **About.tsx**: 개인 정보, 학력, 외국어, 자격증
- **Work.tsx**: 회사 프로젝트 목록 (트랙 구성) 및 상세 페이지 연결
- **SideProjects.tsx**: 개인 프로젝트 목록 (GitHub/Demo/npm 링크)
- **Skills.tsx**: 기술 스택 카테고리 및 숙련도 (core/proficient/familiar)
- **Experience.tsx**: 비개발 경험 및 개발자 강점 연결 텍스트
- **HowIWork.tsx**: 일하는 방식과 근거가 되는 프로젝트 링크
- **Contact.tsx**: 연락처 정보

### 디자인 토큰

- **포인트 색상**: `blue-600` / `dark:blue-400`
- **배경 색상**: `bg-white` / `dark:bg-dark-bg` (#0a0a0a)
- **카드 스타일**: `rounded-2xl` + `border border-slate-100 dark:border-white/[0.04]`
- **그래디언트 텍스트**: `globals.css`의 `.gradient-text` 클래스

### 프로젝트 상세 페이지 추가

`src/data/projects.ts`에 새 프로젝트 데이터를 추가하고 `slug` 값을 지정하면 `/projects/[slug]` 경로로 자동 생성됩니다.

### 다이어그램 추가

`src/components/diagrams/` 에 컴포넌트를 만들고 `primitives.tsx` 의 `Figure`/`Node`/`Arrow` 로 구성한 뒤,
`diagrams/index.tsx` 의 매핑에 slug 를 등록하면 해당 상세 페이지의 `Structure` 섹션에 렌더링됩니다.

## 배포

### Vercel

1. GitHub에 코드 푸시
2. [Vercel](https://vercel.com)에서 프로젝트 연결
3. 자동 배포 완료

배포 주소를 바꾸면 `src/constants/site.ts` 의 `SITE_URL` 도 함께 수정해야 합니다.
OG 이미지·JSON-LD·sitemap·robots 가 모두 이 값을 기준으로 생성됩니다.

## 디자인 특징

- **미니멀리즘**: 절제된 색상과 여백, 깔끔한 타이포그래피
- **타이포그래피**: Pretendard 웹폰트로 한글 가독성 향상
- **카드 디자인**: 라운드 코너 + 미세 보더, 호버 시 자연스러운 인터랙션
- **스킬 숙련도**: 색상 농도로 core/proficient/familiar 시각적 위계 표현
- **케이스 스터디**: Before/After 비교 카드, 성과 지표 그리드, 구조 다이어그램
- **반응형 레이아웃**: 모바일 우선 설계, 좁은 화면에서는 다이어그램 가로 스크롤

## 라이선스

이 프로젝트는 개인 포트폴리오 용도로 제작되었습니다.

## 연락처

- **이메일**: ybg6152@naver.com
- **GitHub**: [github.com/WhyBusyy](https://github.com/WhyBusyy)
- **위치**: 서울 서대문구

---

Copyright. WhyBusyy all rights reserved.
