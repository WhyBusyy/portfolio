# WhyBusyy Portfolio

Next.js, TypeScript, React 기반으로 개발된 프론트엔드 개발자 포트폴리오 웹사이트입니다.

## 🚀 기술 스택

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **Font**: Pretendard (한글 웹폰트)
- **Deployment**: Vercel (권장)

## ✨ 주요 기능

- 📱 **반응형 디자인**: 모바일, 태블릿, 데스크톱 모든 기기에서 최적화된 경험
- 🌙 **다크 모드**: 라이트/다크 테마 전환 지원 (로컬 스토리지 저장)
- 🎨 **부드러운 애니메이션**: Framer Motion을 활용한 인터랙티브한 UI
- 🧭 **스무스 스크롤**: 섹션 간 부드러운 네비게이션
- 🖱️ **커스텀 커서**: 빨간색 포인터 스타일의 커스텀 커서 아이콘
- ✨ **호버 효과**: 카드 호버 시 그림자, 이동, border 색상 변화 효과
- 🎯 **배경 기술 스택 로고**: Hero 섹션에만 표시되는 기술 스택 로고
- 💎 **반투명 카드 디자인**: backdrop-blur를 활용한 글래스모피즘 스타일의 카드
- 📊 **성능 최적화**: Next.js의 최적화 기능 활용

## 🏗️ 프로젝트 구조

```
portfolio/
├── src/
│   ├── app/
│   │   ├── globals.css          # 전역 스타일 및 커스텀 CSS 클래스
│   │   ├── layout.tsx           # 루트 레이아웃 (Pretendard 폰트 로드)
│   │   └── page.tsx             # 메인 페이지
│   └── components/
│       ├── Navigation.tsx      # 상단 네비게이션 바
│       ├── Hero.tsx             # 히어로 섹션 (자기소개, BackgroundLogos 포함)
│       ├── BackgroundLogos.tsx  # 배경 기술 스택 로고 (Hero 섹션 전용)
│       ├── About.tsx            # About Me 섹션 (개인 정보, 학력, 외국어, 자격증)
│       ├── Profile.tsx          # Profile 섹션 (학력, 외국어, 자격증)
│       ├── Work.tsx             # Work 섹션 (경력 및 프로젝트)
│       ├── Skills.tsx           # Skills 섹션 (기술 스택)
│       ├── Experience.tsx       # Experience 섹션 (개인 경험)
│       ├── HowIWork.tsx         # How I Work 섹션 (업무 철학)
│       └── Contact.tsx          # Contact 섹션 (연락처)
├── public/
│   └── platpharm-logo.svg       # 회사 로고 이미지
├── tailwind.config.ts           # Tailwind CSS 설정
└── package.json
```

## 🚀 시작하기

### 1. 의존성 설치

```bash
npm install
```

### 2. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 결과를 확인하세요.

### 3. 프로덕션 빌드

```bash
npm run build
npm start
```

## 📝 커스터마이징

### 개인 정보 수정

각 컴포넌트 파일에서 다음 정보들을 수정할 수 있습니다:

- **Hero.tsx**: 자기소개 멘트 및 배경 기술 스택 로고
- **About.tsx**: 개인 정보 (이름, 위치, 이메일, GitHub), 학력, 외국어, 자격증
- **Profile.tsx**: 학력, 외국어, 자격증 정보
- **Work.tsx**: 경력 정보 및 프로젝트 목록
- **Skills.tsx**: 기술 스택 카테고리 및 스킬 목록
- **Experience.tsx**: 개인 경험 및 취미
- **HowIWork.tsx**: 업무 철학 및 가치관
- **Contact.tsx**: 연락처 정보

### 색상 테마 변경

- **주요 색상**: `tailwind.config.ts`에서 색상 팔레트 수정
- **강조 색상**: `globals.css`의 `.gradient-text` 클래스에서 빨간색 계열 그라데이션 수정
- **배경 색상**: `page.tsx`의 `main` 태그에서 배경색 설정 (라이트 모드 `bg-white`, 다크 모드 `dark:bg-dark-bg`)
- **카드 배경**: 각 섹션의 카드는 반투명 배경 (`bg-white/50 dark:bg-shadow-grey/30`)과 backdrop-blur 효과 사용

### 스타일링

- **호버 효과**: `globals.css`의 `.card-hover` 클래스에서 호버 효과 조정
- **커스텀 커서**: `globals.css`의 `body` 및 `.card-hover`에서 커서 아이콘 변경
- **Border 스타일**: 각 컴포넌트의 `border border-slate-200 dark:border-transparent` 클래스 수정

### 애니메이션 조정

- **스크롤 애니메이션**: Framer Motion의 `useInView` 훅을 사용하여 스크롤 시 애니메이션이 트리거됩니다.

## 🌐 배포

### Vercel (권장)

1. GitHub에 코드 푸시
2. [Vercel](https://vercel.com)에서 프로젝트 연결
3. 자동 배포 완료

Vercel은 Next.js 프로젝트를 자동으로 감지하고 최적화된 빌드를 제공합니다.

### 기타 플랫폼

- **Netlify**: `npm run build` 후 `.next` 폴더 배포
- **GitHub Pages**: GitHub Actions를 통한 자동 배포 설정 (정적 사이트 생성 필요)

## 🎨 디자인 특징

- **컬러 팔레트**: 화이트/다크 그레이 배경에 빨간색 계열 강조 색상 사용
- **타이포그래피**: Pretendard 웹폰트 사용으로 한글 가독성 향상
- **카드 디자인**: 라운드 코너, 그림자, 호버 효과를 활용한 모던한 카드 UI
- **글래스모피즘**: 반투명 배경과 backdrop-blur 효과를 활용한 카드 디자인
- **배경 로고**: Hero 섹션에만 표시되는 기술 스택 로고 (absolute 포지셔닝, 로고 순서 랜덤 배치)
- **반응형 레이아웃**: 모바일 우선 설계로 모든 기기에서 최적화된 경험 제공

## 📄 라이선스

이 프로젝트는 개인 포트폴리오 용도로 제작되었습니다.

## 📞 연락처

- **이메일**: ybg6152@naver.com
- **GitHub**: [github.com/WhyBusyy](https://github.com/WhyBusyy)
- **위치**: 서울 서대문구

---

Copyright. WhyBusyy all rights reserved.
