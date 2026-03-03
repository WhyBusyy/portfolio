# WhyBusyy Portfolio

Next.js, TypeScript, React 기반의 프론트엔드 개발자 포트폴리오 웹사이트입니다.
단순한 이력 나열이 아닌, 프로젝트 케이스 스터디와 스토리텔링 중심의 포트폴리오를 지향합니다.

## 기술 스택

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **Font**: Pretendard (한글 웹폰트)
- **Deployment**: Vercel (권장)

## 주요 기능

- **반응형 디자인**: 모바일, 태블릿, 데스크톱 모든 기기에서 최적화
- **다크 모드**: 라이트/다크 테마 전환 지원 (로컬 스토리지 저장)
- **프로젝트 케이스 스터디**: `/projects/[slug]` 동적 라우트를 통한 프로젝트 상세 페이지 (도전과제, 해결방안, 성과 지표 포함)
- **스킬 숙련도 시각화**: core / proficient / familiar 3단계 시각적 구분
- **이력서 다운로드**: Navigation, Hero, Contact 3곳에서 PDF 이력서 다운로드 가능
- **스크롤 애니메이션**: Framer Motion 기반 fade-in + slide-up 인터랙션
- **SEO 최적화**: Open Graph, Twitter Card 메타데이터 및 정적 생성(SSG) 적용

## 섹션 구성

```
Navigation ─ 상단 네비게이션 (이력서 다운로드 버튼 포함)
Hero ─────── 자기소개 및 CTA (프로젝트 보기, 연락하기, 이력서)
About ────── 프로필 사진 + 스토리텔링 서사 + 개인 정보/학력/자격증
Work ─────── 회사 프로젝트 (클릭 시 /projects/[slug] 상세 페이지 이동)
SideProjects  개인 프로젝트 (GitHub/Demo 링크, 호버 오버레이)
Skills ────── 기술 스택 (숙련도별 시각 구분 + 범례)
Beyond Code ─ 비개발 경험과 개발자 강점 연결
HowIWork ──── 업무 철학 및 가치관
Contact ───── 연락처 + 이력서 다운로드 버튼
```

## 프로젝트 구조

```
portfolio/
├── src/
│   ├── app/
│   │   ├── globals.css                # 전역 스타일
│   │   ├── layout.tsx                 # 루트 레이아웃 (Pretendard 폰트)
│   │   ├── page.tsx                   # 메인 페이지
│   │   └── projects/
│   │       └── [slug]/
│   │           ├── page.tsx           # 프로젝트 상세 (서버 컴포넌트, SSG)
│   │           └── ProjectDetailClient.tsx  # 상세 페이지 클라이언트 컴포넌트
│   ├── components/
│   │   ├── Navigation.tsx             # 네비게이션 바 (이력서 버튼 포함)
│   │   ├── Hero.tsx                   # 히어로 섹션
│   │   ├── About.tsx                  # About (프로필 사진 + 스토리텔링 + 정보)
│   │   ├── Work.tsx                   # 회사 프로젝트 (상세 페이지 링크)
│   │   ├── SideProjects.tsx           # 개인 프로젝트
│   │   ├── Skills.tsx                 # 기술 스택 (숙련도 구분)
│   │   ├── Experience.tsx             # Beyond Code (비개발 경험)
│   │   ├── HowIWork.tsx              # 업무 철학
│   │   └── Contact.tsx               # 연락처 (이력서 버튼 포함)
│   ├── data/
│   │   └── projects.ts               # 프로젝트 데이터 (케이스 스터디)
│   └── types/
│       └── project.ts                 # 프로젝트 타입 정의
├── public/
│   ├── resume.pdf                     # 이력서 파일
│   └── profile.jpg                    # 프로필 사진
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
- **About.tsx**: 프로필 사진, 스토리텔링 서사, 개인 정보, 학력, 자격증
- **Hero.tsx**: 자기소개 멘트 및 CTA 링크
- **Work.tsx**: 회사 프로젝트 목록 및 상세 페이지 연결
- **SideProjects.tsx**: 개인 프로젝트 목록 (GitHub/Demo 링크)
- **Skills.tsx**: 기술 스택 카테고리 및 숙련도 (core/proficient/familiar)
- **Experience.tsx**: 비개발 경험 및 개발자 강점 연결 텍스트
- **HowIWork.tsx**: 업무 철학 및 가치관
- **Contact.tsx**: 연락처 정보

### 디자인 토큰

- **포인트 색상**: `blue-600` / `dark:blue-400`
- **배경 색상**: `bg-white` / `dark:bg-dark-bg` (#0a0a0a)
- **카드 스타일**: `rounded-2xl` + `border border-slate-100 dark:border-white/[0.04]`
- **그래디언트 텍스트**: `globals.css`의 `.gradient-text` 클래스

### 프로젝트 상세 페이지 추가

`src/data/projects.ts`에 새 프로젝트 데이터를 추가하고, `slug` 값을 지정하면 `/projects/[slug]` 경로로 자동 생성됩니다.

## 배포

### Vercel (권장)

1. GitHub에 코드 푸시
2. [Vercel](https://vercel.com)에서 프로젝트 연결
3. 자동 배포 완료

## 디자인 특징

- **Apple 미니멀리즘**: 절제된 색상과 여백, 깔끔한 타이포그래피
- **타이포그래피**: Pretendard 웹폰트로 한글 가독성 향상
- **카드 디자인**: 라운드 코너 + 미세 보더, 호버 시 자연스러운 인터랙션
- **스킬 숙련도**: 색상 농도로 core/proficient/familiar 시각적 위계 표현
- **케이스 스터디**: Before/After 비교 카드, 성과 지표 그리드
- **반응형 레이아웃**: 모바일 우선 설계, 터치 디바이스 대응 (호버 오버레이 → 하단 링크)

## 라이선스

이 프로젝트는 개인 포트폴리오 용도로 제작되었습니다.

## 연락처

- **이메일**: ybg6152@naver.com
- **GitHub**: [github.com/WhyBusyy](https://github.com/WhyBusyy)
- **위치**: 서울 서대문구

---

Copyright. WhyBusyy all rights reserved.
