# WhyBusyy Portfolio

Next.js, TypeScript, React 기반으로 개발된 프론트엔드 개발자 포트폴리오 웹사이트입니다.

## 🚀 기술 스택

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **Deployment**: Vercel (권장)

## ✨ 주요 기능

- 📱 **반응형 디자인**: 모바일, 태블릿, 데스크톱 모든 기기에서 최적화된 경험
- 🌙 **다크 모드**: 라이트/다크 테마 전환 지원
- 🎨 **부드러운 애니메이션**: Framer Motion을 활용한 인터랙티브한 UI
- 🧭 **스무스 스크롤**: 섹션 간 부드러운 네비게이션
- 📊 **성능 최적화**: Next.js의 최적화 기능 활용

## 🏗️ 프로젝트 구조

```
portfolio/
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   └── components/
│       ├── Hero.tsx
│       ├── About.tsx
│       ├── Profile.tsx
│       ├── Skills.tsx
│       ├── Experience.tsx
│       ├── HowIWork.tsx
│       ├── Contact.tsx
│       └── Navigation.tsx
├── public/
├── tailwind.config.ts
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

- **Hero.tsx**: 이름, 직업, 연락처 정보
- **About.tsx**: 자기소개 내용
- **Profile.tsx**: 경력, 학력, 자격증 정보
- **Skills.tsx**: 기술 스택 및 설명
- **Experience.tsx**: 추가 경험 및 취미
- **HowIWork.tsx**: 업무 철학 및 가치관
- **Contact.tsx**: 연락처 정보

### 색상 테마 변경

`tailwind.config.ts`에서 색상 팔레트를 수정하거나, 각 컴포넌트의 `gradient-text` 클래스를 수정하여 색상을 변경할 수 있습니다.

### 애니메이션 조정

Framer Motion의 애니메이션 설정을 각 컴포넌트에서 조정할 수 있습니다.

## 🌐 배포

### Vercel (권장)

1. GitHub에 코드 푸시
2. [Vercel](https://vercel.com)에서 프로젝트 연결
3. 자동 배포 완료

### 기타 플랫폼

- **Netlify**: `npm run build` 후 `out` 폴더 배포
- **GitHub Pages**: GitHub Actions를 통한 자동 배포 설정

## 📄 라이선스

이 프로젝트는 개인 포트폴리오 용도로 제작되었습니다.

## 📞 연락처

- **이메일**: ybg6152@naver.com
- **GitHub**: [github.com/WhyBusyy](https://github.com/WhyBusyy)
- **위치**: 서울 서대문구

---

Copyright. WhyBusyy all rights reserved.