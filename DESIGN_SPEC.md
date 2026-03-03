# WhyBusyy Portfolio - Design Specification v2.0
## P0 기능 디자인 설계서

---

## 현재 디자인 시스템 분석 요약

### 확인된 디자인 토큰

| 토큰 | 라이트 모드 | 다크 모드 |
|------|------------|----------|
| **배경 (기본)** | `bg-white` | `dark:bg-dark-bg` (#0a0a0a) |
| **배경 (교대)** | `bg-slate-50/50` | `dark:bg-white/[0.02]` |
| **카드 배경** | `bg-slate-50/80` 또는 `bg-white` | `dark:bg-white/[0.03]` 또는 `dark:bg-white/[0.04]` |
| **카드 보더** | `border-slate-100` | `dark:border-white/[0.04]` |
| **본문 텍스트** | `text-slate-800` | `dark:text-slate-200` |
| **보조 텍스트** | `text-slate-500` | `dark:text-slate-400` |
| **약한 텍스트** | `text-slate-400` | `dark:text-slate-500` |
| **제목 텍스트** | `text-slate-900` | `dark:text-white` |
| **포인트 색상** | `text-blue-600` | `dark:text-blue-400` |
| **그래디언트 텍스트** | `from-slate-900 to-slate-700` | `dark:from-white dark:to-slate-300` |
| **아이콘 배경** | `bg-slate-100` | `dark:bg-white/[0.06]` |
| **아이콘 색상** | `text-slate-600` | `dark:text-slate-400` |
| **태그 배경** | `bg-slate-50` 또는 `bg-slate-100` | `dark:bg-white/[0.04]` 또는 `dark:bg-white/[0.06]` |
| **디바이더** | `border-slate-200` | `dark:border-white/[0.06]` |

### 확인된 레이아웃 패턴

| 패턴 | 클래스 |
|------|--------|
| **컨테이너** | `max-w-6xl mx-auto` (container-max-width) |
| **섹션 패딩** | `px-6 sm:px-8 lg:px-12` (section-padding) |
| **섹션 수직 여백** | `py-32 lg:py-40` |
| **콘텐츠 내부 폭** | `max-w-4xl mx-auto` 또는 `max-w-5xl mx-auto` |
| **카드 둥글기** | `rounded-2xl` |
| **카드 패딩** | `p-6 sm:p-8` |
| **그리드 간격** | `gap-6` ~ `gap-8` |
| **아이콘 박스** | `w-10 h-10 rounded-xl` 또는 `w-8 h-8 rounded-lg` |

### 확인된 애니메이션 패턴

| 요소 | 초기 상태 | 최종 상태 | duration | delay |
|------|----------|----------|----------|-------|
| **섹션 타이틀** | `opacity:0, y:30` | `opacity:1, y:0` | 0.8s | 0 |
| **카드 아이템** | `opacity:0, y:20` | `opacity:1, y:0` | 0.6s | 0.1 + index*0.1 |
| **스킬 태그** | `opacity:0` | `opacity:1` | 0.4s | 0.2 + cat*0.1 + skill*0.03 |
| **Hero 텍스트** | `opacity:0, y:20~30` | `opacity:1, y:0` | 0.8s | 0.2~1.0 |
| **inView 기준** | `useInView(ref, { once: true, margin: "-100px" })` |

### 확인된 타이포그래피 스케일

| 용도 | 클래스 |
|------|--------|
| **섹션 제목** | `text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight` |
| **회사/프로젝트명** | `text-2xl sm:text-3xl font-bold tracking-tight` |
| **카드 제목** | `text-base font-semibold` |
| **카테고리 라벨** | `text-sm font-semibold tracking-wide uppercase` |
| **본문** | `text-sm leading-relaxed` |
| **메타/기간** | `text-xs text-slate-400` |
| **태그 텍스트** | `text-xs font-medium` |
| **섹션 서브타이틀** | `text-lg sm:text-xl` |

---

## 1. 프로젝트 케이스 스터디 상세 페이지 (`/projects/[slug]`)

### 1.1 개요
Work 섹션의 각 프로젝트를 클릭하면 이동하는 독립 상세 페이지. Next.js App Router 동적 라우트 사용.

### 1.2 페이지 구조 (위에서 아래 순서)

```
[A] 상단 네비게이션 (기존 Navigation 재활용, "뒤로가기" 추가)
[B] 프로젝트 헤더 영역
[C] 프로젝트 개요 (Overview)
[D] 스크린샷 갤러리
[E] 기술적 도전과 해결 (Challenge & Solution)
[F] 성과 지표 (Impact Metrics)
[G] 사용 기술 스택
[H] 하단 네비게이션 (이전/다음 프로젝트 + 목록 돌아가기)
```

### 1.3 [B] 프로젝트 헤더 영역

**레이아웃 구조:**
```
py-32 lg:py-40 (기존 섹션 여백과 동일)
  container-max-width section-padding
    [뒤로가기 링크] ← 목록으로
    [간격 mb-12]
    [프로젝트 제목] text-4xl sm:text-5xl lg:text-6xl
    [간격 mt-6]
    [메타 정보 행] 기간 | 역할 | 회사
    [간격 mt-8]
    [기술 태그 행] 가로 나열
```

**Tailwind CSS 클래스 명세:**

```tsx
{/* 뒤로가기 링크 */}
<Link
  href="/#work"
  className="inline-flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400
             hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
>
  <ArrowLeft className="w-4 h-4" />
  <span>목록으로</span>
</Link>

{/* 프로젝트 제목 */}
<h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight gradient-text mt-12">
  플랫팜
</h1>

{/* 메타 정보 */}
<div className="flex flex-wrap items-center gap-4 sm:gap-6 mt-6">
  <span className="text-sm text-slate-500 dark:text-slate-400">2024.05 ~ 현재</span>
  <span className="w-px h-3 bg-slate-200 dark:bg-white/[0.08]" /> {/* 구분선 */}
  <span className="text-sm text-slate-500 dark:text-slate-400">Frontend Developer</span>
  <span className="w-px h-3 bg-slate-200 dark:bg-white/[0.08]" />
  <span className="text-sm text-slate-500 dark:text-slate-400">주식회사 루멘테라</span>
</div>

{/* 기술 태그 */}
<div className="flex flex-wrap gap-2 mt-8">
  <span className="px-3 py-1.5 bg-slate-50 dark:bg-white/[0.04] text-slate-600
                    dark:text-slate-400 rounded-lg text-xs font-medium">
    Next.js
  </span>
  {/* ... 반복 */}
</div>
```

**애니메이션:**
```tsx
// 전체 헤더 컨테이너
initial={{ opacity: 0, y: 30 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.8 }}

// 뒤로가기 링크
initial={{ opacity: 0, x: -10 }}
animate={{ opacity: 1, x: 0 }}
transition={{ duration: 0.6 }}

// 제목
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.8, delay: 0.2 }}

// 메타 + 태그
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
transition={{ duration: 0.6, delay: 0.4 }}
```

### 1.4 [C] 프로젝트 개요 (Overview)

**레이아웃 구조:**
```
py-20
  max-w-3xl mx-auto
    [섹션 라벨] "OVERVIEW" - uppercase 소제목
    [간격 mt-6]
    [본문 텍스트] 2~3 문단
```

**클래스 명세:**
```tsx
<section className="py-20 section-padding">
  <div className="max-w-3xl mx-auto">
    <p className="text-sm font-semibold text-slate-400 dark:text-slate-500 tracking-widest uppercase mb-6">
      Overview
    </p>
    <div className="space-y-6">
      <p className="text-lg sm:text-xl text-slate-700 dark:text-slate-300 leading-relaxed">
        {/* 프로젝트 배경 첫 문단 - 큰 글씨 */}
      </p>
      <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
        {/* 상세 설명 문단 */}
      </p>
    </div>
  </div>
</section>
```

### 1.5 [D] 스크린샷 갤러리

**레이아웃:**
- 교대 배경 (`bg-slate-50/50 dark:bg-white/[0.02]`)
- 전체 폭 스크롤 갤러리 또는 2열 그리드
- 이미지는 `rounded-2xl` + 미세 보더

```tsx
<section className="py-20 section-padding bg-slate-50/50 dark:bg-white/[0.02]">
  <div className="container-max-width">
    <p className="text-sm font-semibold text-slate-400 dark:text-slate-500 tracking-widest uppercase mb-10">
      Screenshots
    </p>

    {/* 2열 그리드 (데스크톱), 1열 (모바일) */}
    <div className="grid md:grid-cols-2 gap-6">
      {screenshots.map((screenshot, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          className="group relative overflow-hidden rounded-2xl border border-slate-100 dark:border-white/[0.04]"
        >
          <img
            src={screenshot.src}
            alt={screenshot.alt}
            className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
          {screenshot.caption && (
            <p className="mt-3 text-xs text-slate-400 dark:text-slate-500 text-center">
              {screenshot.caption}
            </p>
          )}
        </motion.div>
      ))}
    </div>
  </div>
</section>
```

**호버 인터랙션:**
- 이미지: `group-hover:scale-[1.02]` + `transition-transform duration-500`
- 미세한 확대 효과만 (Apple 스타일의 절제된 인터랙션)

### 1.6 [E] 기술적 도전과 해결 (Before/After 카드)

**레이아웃:**
```
py-20
  max-w-4xl mx-auto
    [섹션 라벨] "CHALLENGES & SOLUTIONS"
    [간격 mt-10]
    [카드 목록] 세로 스택, gap-8
      각 카드:
        [카드 상단: 도전 제목]
        [2열 그리드: Before | After]
```

**클래스 명세:**
```tsx
<section className="py-20 section-padding">
  <div className="max-w-4xl mx-auto">
    <p className="text-sm font-semibold text-slate-400 dark:text-slate-500 tracking-widest uppercase mb-10">
      Challenges & Solutions
    </p>

    <div className="space-y-8">
      {challenges.map((challenge, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: index * 0.15 }}
          className="bg-white dark:bg-white/[0.03] rounded-2xl p-6 sm:p-8
                     border border-slate-100 dark:border-white/[0.04]"
        >
          {/* 도전 제목 */}
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">
            {challenge.title}
          </h3>

          {/* Before / After 2열 */}
          <div className="grid sm:grid-cols-2 gap-6">
            {/* Before */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-600" />
                <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wide">
                  Before
                </span>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed pl-4
                            border-l-2 border-slate-200 dark:border-white/[0.06]">
                {challenge.before}
              </p>
            </div>

            {/* After */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400" />
                <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide">
                  After
                </span>
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed pl-4
                            border-l-2 border-blue-600 dark:border-blue-400">
                {challenge.after}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</section>
```

**디자인 의도:**
- Before는 회색 톤으로 "과거/문제" 느낌
- After는 blue 포인트로 "해결/개선" 느낌
- 왼쪽 세로선(border-l)으로 시각적 구분 강화
- 카드 안에 Before/After를 담아 하나의 스토리로 읽히도록

### 1.7 [F] 성과 지표 (Impact Metrics)

**레이아웃:**
```
py-20 bg-slate-50/50 dark:bg-white/[0.02]
  max-w-4xl mx-auto
    [섹션 라벨] "IMPACT"
    [간격 mt-10]
    [3열 그리드 (데스크톱)] 숫자 카드
```

**클래스 명세:**
```tsx
<section className="py-20 section-padding bg-slate-50/50 dark:bg-white/[0.02]">
  <div className="max-w-4xl mx-auto">
    <p className="text-sm font-semibold text-slate-400 dark:text-slate-500 tracking-widest uppercase mb-10">
      Impact
    </p>

    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {metrics.map((metric, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          className="text-center p-8"
        >
          {/* 숫자 값 */}
          <p className="text-4xl sm:text-5xl font-bold tracking-tight gradient-text">
            {metric.value}
          </p>
          {/* Before -> After (예: "13점 -> 78점") */}
          {metric.change && (
            <p className="text-sm text-blue-600 dark:text-blue-400 font-medium mt-2">
              {metric.change}
            </p>
          )}
          {/* 지표 설명 */}
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-3">
            {metric.label}
          </p>
        </motion.div>
      ))}
    </div>
  </div>
</section>
```

**예시 데이터:**
```ts
const metrics = [
  { value: "78", change: "13 -> 78", label: "Lighthouse Performance Score" },
  { value: "100%", change: null, label: "프론트엔드 단독 개발" },
  { value: "1년+", change: null, label: "서비스 운영 및 유지보수" },
]
```

### 1.8 [G] 사용 기술 스택

기존 Skills 섹션의 카드 스타일을 그대로 재활용.

```tsx
<section className="py-20 section-padding">
  <div className="max-w-4xl mx-auto">
    <p className="text-sm font-semibold text-slate-400 dark:text-slate-500 tracking-widest uppercase mb-10">
      Tech Stack
    </p>

    <div className="flex flex-wrap gap-2">
      {techStack.map((tech, index) => (
        <motion.span
          key={tech}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.03 }}
          className="px-3 py-1.5 bg-slate-50 dark:bg-white/[0.04] text-slate-600
                     dark:text-slate-400 rounded-lg text-xs font-medium"
        >
          {tech}
        </motion.span>
      ))}
    </div>
  </div>
</section>
```

### 1.9 [H] 하단 네비게이션

```tsx
<section className="py-20 section-padding border-t border-slate-100 dark:border-white/[0.04]">
  <div className="max-w-4xl mx-auto">
    <div className="flex items-center justify-between">
      {/* 이전 프로젝트 (없으면 빈 div) */}
      {prevProject ? (
        <Link
          href={`/projects/${prevProject.slug}`}
          className="group flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400
                     hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <div>
            <p className="text-xs text-slate-400 dark:text-slate-500">이전</p>
            <p className="font-medium">{prevProject.title}</p>
          </div>
        </Link>
      ) : <div />}

      {/* 목록으로 */}
      <Link
        href="/#work"
        className="text-sm text-slate-400 dark:text-slate-500
                   hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
      >
        모든 프로젝트
      </Link>

      {/* 다음 프로젝트 */}
      {nextProject ? (
        <Link
          href={`/projects/${nextProject.slug}`}
          className="group flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400
                     hover:text-slate-900 dark:hover:text-white transition-colors text-right"
        >
          <div>
            <p className="text-xs text-slate-400 dark:text-slate-500">다음</p>
            <p className="font-medium">{nextProject.title}</p>
          </div>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      ) : <div />}
    </div>
  </div>
</section>
```

### 1.10 반응형 브레이크포인트

| 영역 | 모바일 (< 640px) | 태블릿 (640-1023px) | 데스크톱 (1024px+) |
|------|------------------|--------------------|--------------------|
| 헤더 제목 | text-4xl | text-5xl | text-6xl |
| 메타 정보 | 수직 스택 flex-wrap | 가로 나열 | 가로 나열 |
| 스크린샷 갤러리 | 1열 | 2열 | 2열 |
| Before/After | 1열 (수직) | 2열 | 2열 |
| 성과 지표 | 1열 | 2열 | 3열 |
| 하단 네비게이션 | 이전/다음만 (목록 숨김) | 전체 표시 | 전체 표시 |

### 1.11 파일 구조

```
src/
  app/
    projects/
      [slug]/
        page.tsx          // 서버 컴포넌트, generateStaticParams
  components/
    project-detail/
      ProjectHeader.tsx
      ProjectOverview.tsx
      ProjectGallery.tsx
      ProjectChallenges.tsx
      ProjectMetrics.tsx
      ProjectTechStack.tsx
      ProjectNavigation.tsx
  data/
    projects.ts           // 프로젝트 데이터 정의
```

---

## 2. Experience 섹션 재구성 -> "Beyond Code"

### 2.1 개요
기존 4열 아이콘 카드(스포츠 애호가 포함)를 3개 항목으로 축소하고, "Beyond Code"라는 섹션으로 리브랜딩. 각 항목에 "개발자 강점 연결" 서브텍스트를 추가하여 비개발 경험이 개발 역량과 어떻게 연결되는지 명시.

### 2.2 데이터 구조 변경

```ts
// 기존 (제거 대상: 스포츠 애호가)
// 새로운 3개 항목
const experiences = [
  {
    icon: ShoppingCart,
    title: "개인 쇼핑몰 운영",
    description: "개인 쇼핑몰 운영을 통해 월매출 1,000만원 이상 달성한 경험이 있습니다.",
    devConnection: "사용자 구매 여정과 전환율에 대한 실전 감각 -> UI/UX 설계에 직접 반영",
  },
  {
    icon: Users,
    title: "SNS 마케팅",
    description: "SNS 계정 팔로워 10,000명 이상 달성한 경험이 있습니다.",
    devConnection: "콘텐츠 기반 성장 전략 경험 -> 데이터 드리븐 사고와 A/B 테스트 마인드",
  },
  {
    icon: Briefcase, // Heart -> Briefcase 변경
    title: "다양한 업계 경험",
    description: "제약, 금융 회사 근무 경험이 있습니다.",
    devConnection: "도메인별 비즈니스 로직 이해 -> 요구사항 분석력과 커뮤니케이션 강점",
  },
];
```

### 2.3 레이아웃 변경

**기존:** `grid sm:grid-cols-2 lg:grid-cols-4` (4열, text-center)
**변경:** `grid sm:grid-cols-3` (3열, text-left)

```tsx
<section ref={ref} id="experience" className="py-32 lg:py-40 section-padding">
  <div className="container-max-width">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="section-title">Beyond Code</h2>
      <p className="section-subtitle">
        개발 외의 경험이 개발자로서의 강점이 됩니다.
      </p>

      <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {experiences.map((experience, index) => (
          <motion.div
            key={experience.title}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
            className="bg-white dark:bg-white/[0.03] rounded-2xl p-6
                       border border-slate-100 dark:border-white/[0.04]"
          >
            {/* 아이콘 */}
            <div className="w-10 h-10 mb-5 rounded-xl bg-slate-100 dark:bg-white/[0.06]
                            flex items-center justify-center">
              <experience.icon className="w-4 h-4 text-slate-600 dark:text-slate-400" />
            </div>

            {/* 제목 */}
            <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-2">
              {experience.title}
            </h3>

            {/* 설명 */}
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
              {experience.description}
            </p>

            {/* 개발자 강점 연결 (신규 추가) */}
            <div className="pt-4 border-t border-slate-100 dark:border-white/[0.04]">
              <p className="text-xs text-blue-600 dark:text-blue-400 leading-relaxed">
                {experience.devConnection}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  </div>
</section>
```

### 2.4 디자인 변경 요점

| 항목 | 기존 | 변경 |
|------|------|------|
| 섹션 제목 | "Experience" | "Beyond Code" |
| 서브타이틀 | "개발 외에도 다양한 경험을 쌓아왔습니다." | "개발 외의 경험이 개발자로서의 강점이 됩니다." |
| 그리드 | 4열 | 3열 |
| 정렬 | text-center | text-left |
| 카드 스타일 | 패딩만 (배경 없음) | 카드 + 보더 (Skills 카드와 동일) |
| 항목 수 | 4개 | 3개 (스포츠 애호가 제거) |
| 추가 요소 | 없음 | devConnection 서브텍스트 (파란색, 구분선 아래) |

### 2.5 반응형

| 브레이크포인트 | 레이아웃 |
|---------------|---------|
| 모바일 (< 640px) | 1열, 카드 세로 스택 |
| 태블릿+ (>= 640px) | 3열 그리드 |

### 2.6 다크모드
기존 시스템 토큰 그대로 사용. devConnection 텍스트만 `text-blue-600 dark:text-blue-400` 포인트 색상 적용.

---

## 3. 사이드 프로젝트 섹션 (SideProjects.tsx)

### 3.1 개요
GitHub 링크 + 라이브 데모가 포함된 개인 프로젝트 카드. Work 섹션(회사 프로젝트)과 분리하여 독립 섹션으로 배치.

### 3.2 페이지 배치 위치
`page.tsx`에서 Work 섹션과 Skills 섹션 사이에 배치:
```
Hero -> About -> Work -> SideProjects -> Skills -> Experience(Beyond Code) -> HowIWork -> Contact
```

### 3.3 데이터 구조

```ts
interface SideProject {
  title: string;
  description: string;
  screenshot: string;       // 스크린샷 이미지 경로
  techStack: string[];
  githubLink: string | null;
  demoLink: string | null;
}
```

### 3.4 레이아웃 및 클래스 명세

```tsx
<section
  ref={ref}
  id="side-projects"
  className="py-32 lg:py-40 section-padding bg-slate-50/50 dark:bg-white/[0.02]"
>
  <div className="container-max-width">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="section-title">Side Projects</h2>
      <p className="section-subtitle">
        개인적으로 만들어본 프로젝트들입니다.
      </p>

      <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
            className="group bg-white dark:bg-white/[0.03] rounded-2xl overflow-hidden
                       border border-slate-100 dark:border-white/[0.04]"
          >
            {/* 스크린샷 + 호버 오버레이 */}
            <div className="relative aspect-[16/10] overflow-hidden">
              <img
                src={project.screenshot}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-500
                           group-hover:scale-[1.03]"
              />

              {/* 호버 오버레이 */}
              <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/60
                              transition-all duration-300 flex items-center justify-center gap-4
                              opacity-0 group-hover:opacity-100">
                {project.githubLink && (
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm
                               rounded-lg text-white text-sm font-medium
                               hover:bg-white/20 transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    GitHub
                  </a>
                )}
                {project.demoLink && (
                  <a
                    href={project.demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm
                               rounded-lg text-white text-sm font-medium
                               hover:bg-white/20 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Demo
                  </a>
                )}
              </div>
            </div>

            {/* 카드 본문 */}
            <div className="p-6">
              <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-2">
                {project.title}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 bg-slate-50 dark:bg-white/[0.04] text-slate-500
                               dark:text-slate-400 rounded-md text-xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  </div>
</section>
```

### 3.5 호버 인터랙션 상세

1. **카드 전체**: `group` 클래스로 호버 컨텍스트 생성
2. **스크린샷 이미지**: `group-hover:scale-[1.03]` (미세 확대, 500ms transition)
3. **오버레이**: `bg-slate-900/0 -> bg-slate-900/60` (반투명 어두운 오버레이)
4. **오버레이 내 버튼**: `opacity-0 -> opacity-100` (300ms transition)
5. **개별 버튼**: `bg-white/10 backdrop-blur-sm`, hover시 `bg-white/20`

### 3.6 반응형

| 브레이크포인트 | 레이아웃 |
|---------------|---------|
| 모바일 (< 640px) | 1열, 오버레이 대신 카드 하단에 링크 항상 표시 |
| 태블릿+ (>= 640px) | 2열 그리드, 호버 오버레이 |

**모바일 대응 (터치 디바이스):**
```tsx
{/* 모바일에서는 오버레이 대신 하단에 링크 표시 */}
<div className="sm:hidden flex gap-3 mt-4 pt-4 border-t border-slate-100 dark:border-white/[0.04]">
  {project.githubLink && (
    <a href={project.githubLink} target="_blank" rel="noopener noreferrer"
       className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400
                  hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
      <Github className="w-3.5 h-3.5" />
      GitHub
    </a>
  )}
  {project.demoLink && (
    <a href={project.demoLink} target="_blank" rel="noopener noreferrer"
       className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400
                  hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
      <ExternalLink className="w-3.5 h-3.5" />
      Demo
    </a>
  )}
</div>
```

---

## 4. 이력서 다운로드 버튼

### 4.1 개요
PDF 이력서 다운로드 버튼을 3곳(Navigation, Hero, Contact)에 자연스럽게 배치. 각 위치의 맥락에 맞는 크기와 스타일로 차별화.

### 4.2 공통 아이콘
`import { Download } from "lucide-react";` -- w-4 h-4 크기

### 4.3 [A] Navigation 배치

네비게이션 우측, 다크모드 토글 왼쪽에 배치. 기존 nav 링크와 동일한 톤.

```tsx
{/* Desktop Nav - 다크모드 토글 바로 앞에 추가 */}
<motion.a
  href="/resume.pdf"
  download
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.6, delay: 0.35 }}
  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium
             text-slate-500 dark:text-slate-400
             hover:text-slate-900 dark:hover:text-white
             rounded-full border border-slate-200 dark:border-white/[0.08]
             hover:border-slate-300 dark:hover:border-white/[0.15]
             transition-all cursor-pointer"
>
  <Download className="w-3.5 h-3.5" />
  Resume
</motion.a>
```

**위치:**
```tsx
<div className="hidden md:flex items-center gap-7">
  {navItems.map(...)}

  {/* 이력서 다운로드 -- 여기에 추가 */}
  <motion.a href="/resume.pdf" download ...>Resume</motion.a>

  {/* 다크모드 토글 */}
  <motion.button onClick={toggleDarkMode} ...>
</div>
```

**모바일 메뉴에도 추가:**
```tsx
{/* 모바일 메뉴 최하단에 추가 */}
<motion.a
  href="/resume.pdf"
  download
  initial={{ opacity: 0, x: -10 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.2, delay: navItems.length * 0.05 }}
  className="flex items-center gap-2 w-full py-2.5 px-3 text-sm
             text-blue-600 dark:text-blue-400 rounded-lg transition-colors"
>
  <Download className="w-4 h-4" />
  이력서 다운로드
</motion.a>
```

### 4.4 [B] Hero 배치

기존 "프로젝트 보기" / "연락하기" 링크 옆에 3번째 CTA로 추가.

```tsx
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.8, delay: 1 }}
  className="flex items-center justify-center gap-6 pt-4"
>
  <a href="#work" className="text-sm font-medium text-blue-600 dark:text-blue-400 ...">
    프로젝트 보기 &darr;
  </a>
  <a href="#contact" className="text-sm font-medium text-slate-500 dark:text-slate-400 ...">
    연락하기
  </a>

  {/* 이력서 다운로드 -- 추가 */}
  <a
    href="/resume.pdf"
    download
    className="flex items-center gap-1.5 text-sm font-medium
               text-slate-500 dark:text-slate-400
               hover:text-slate-900 dark:hover:text-white transition-colors"
  >
    <Download className="w-3.5 h-3.5" />
    이력서
  </a>
</motion.div>
```

### 4.5 [C] Contact 배치

Contact 섹션의 연락처 정보 아래, 독립 CTA 버튼으로 배치. 이 위치에서는 가장 눈에 띄는 스타일.

```tsx
{/* Contact 섹션 - contactInfo 목록 아래에 추가 */}
<motion.div
  initial={{ opacity: 0, y: 15 }}
  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
  transition={{ duration: 0.6, delay: 0.5 }}
  className="mt-12"
>
  <a
    href="/resume.pdf"
    download
    className="inline-flex items-center gap-2 px-6 py-3
               bg-slate-900 dark:bg-white
               text-white dark:text-slate-900
               text-sm font-medium rounded-full
               hover:bg-slate-800 dark:hover:bg-slate-100
               transition-colors"
  >
    <Download className="w-4 h-4" />
    이력서 다운로드
  </a>
</motion.div>
```

**디자인 의도:**
- Navigation: 가장 미묘한 처리 (outline 버튼), 항상 접근 가능
- Hero: 텍스트 링크 스타일, 다른 CTA와 동일 톤
- Contact: 가장 강한 처리 (filled 버튼), 관심 있는 방문자에게 직접 행동 유도

### 4.6 다크모드

| 위치 | 라이트 | 다크 |
|------|--------|------|
| Navigation | `border-slate-200`, `text-slate-500` | `border-white/[0.08]`, `text-slate-400` |
| Hero | `text-slate-500` | `text-slate-400` |
| Contact | `bg-slate-900 text-white` | `bg-white text-slate-900` (반전) |

---

## 5. Skills 섹션 숙련도 시각적 구분

### 5.1 개요
현재 모든 스킬 태그가 동일한 스타일(`bg-slate-50 dark:bg-white/[0.04]`)로 표시되어 있어 숙련도 구분이 불가능. 3단계(core/proficient/familiar)를 시각적으로 구분하되, Apple 미니멀리즘을 유지.

### 5.2 데이터 구조 변경

```ts
interface Skill {
  name: string;
  level: "core" | "proficient" | "familiar";
}

const skillCategories = [
  {
    title: "Language",
    icon: Code,
    skills: [
      { name: "TypeScript", level: "core" },
      { name: "JavaScript", level: "core" },
      { name: "HTML", level: "proficient" },
      { name: "CSS", level: "proficient" },
      { name: "SQL", level: "familiar" },
    ],
  },
  // ...
];
```

### 5.3 시각적 구분 전략

**절제된 접근**: 배경색 + 왼쪽 작은 도트(또는 미세한 좌측 보더)로 구분. 파란 포인트는 core에만.

| 레벨 | 태그 스타일 | 의미 |
|------|-----------|------|
| **core** | 파란 좌측 도트 + 약간 강한 텍스트 | 핵심 기술, 가장 자신 있음 |
| **proficient** | 기존 스타일 유지 (중립) | 능숙하게 사용 |
| **familiar** | 약간 흐린 텍스트 | 경험 있음, 기초 수준 |

### 5.4 클래스 명세

```tsx
// 레벨별 스타일 함수
const getSkillStyle = (level: string) => {
  switch (level) {
    case "core":
      return "px-3 py-1.5 bg-blue-50 dark:bg-blue-500/[0.08] text-blue-700 dark:text-blue-300 rounded-lg text-xs font-medium";
    case "proficient":
      return "px-3 py-1.5 bg-slate-50 dark:bg-white/[0.04] text-slate-600 dark:text-slate-400 rounded-lg text-xs font-medium";
    case "familiar":
      return "px-3 py-1.5 bg-slate-50/50 dark:bg-white/[0.02] text-slate-400 dark:text-slate-500 rounded-lg text-xs";
    default:
      return "px-3 py-1.5 bg-slate-50 dark:bg-white/[0.04] text-slate-600 dark:text-slate-400 rounded-lg text-xs font-medium";
  }
};
```

**적용:**
```tsx
<div className="flex flex-wrap gap-2">
  {category.skills.map((skill, skillIndex) => (
    <motion.span
      key={skill.name}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{
        duration: 0.4,
        delay: 0.2 + categoryIndex * 0.1 + skillIndex * 0.03,
      }}
      className={getSkillStyle(skill.level)}
    >
      {skill.name}
    </motion.span>
  ))}
</div>
```

### 5.5 범례 (Legend) 추가

섹션 서브타이틀 아래에 작은 범례를 추가하여 사용자가 구분 기준을 이해할 수 있도록.

```tsx
{/* 범례 - section-subtitle 아래에 */}
<div className="flex items-center justify-center gap-6 mb-16">
  <div className="flex items-center gap-2">
    <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400" />
    <span className="text-xs text-slate-400 dark:text-slate-500">Core</span>
  </div>
  <div className="flex items-center gap-2">
    <span className="w-2 h-2 rounded-full bg-slate-400 dark:bg-slate-500" />
    <span className="text-xs text-slate-400 dark:text-slate-500">Proficient</span>
  </div>
  <div className="flex items-center gap-2">
    <span className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-600" />
    <span className="text-xs text-slate-400 dark:text-slate-500">Familiar</span>
  </div>
</div>
```

### 5.6 색상 스펙 정리

| 레벨 | 배경 (라이트) | 배경 (다크) | 텍스트 (라이트) | 텍스트 (다크) | font-weight |
|------|-------------|-----------|---------------|-------------|-------------|
| core | `bg-blue-50` | `bg-blue-500/[0.08]` | `text-blue-700` | `text-blue-300` | `font-medium` |
| proficient | `bg-slate-50` | `bg-white/[0.04]` | `text-slate-600` | `text-slate-400` | `font-medium` |
| familiar | `bg-slate-50/50` | `bg-white/[0.02]` | `text-slate-400` | `text-slate-500` | 기본 (normal) |

**디자인 의도:**
- core 기술은 blue 포인트를 통해 자연스럽게 눈에 띄게 함 (기존 accent-text 톤과 일치)
- proficient는 기존과 완전히 동일하여 위화감 없음
- familiar는 살짝 더 투명하게 처리하여 자연스러운 위계 형성
- 프로그레스 바, 별점 등 과도한 시각 요소 배제 (Apple 스타일 절제)

---

## 6. About 섹션 스토리텔링 영역

### 6.1 개요
현재 About 섹션은 정보 나열 형식(이름, 위치, 이메일 등). 여기에 프로필 사진 + 인트로 서사(2~3문단) 영역을 추가하여 방문자에게 개인적 인상을 전달.

### 6.2 레이아웃 변경

**기존 구조:**
```
[Section Title: About Me]
[Section Subtitle]
[Personal Info Grid 2x2]
[Divider]
[Education | Languages | Certifications 3-col]
```

**변경 구조:**
```
[Section Title: About Me]
[Section Subtitle]
[스토리텔링 영역] -- 신규 추가
  [프로필 사진 | 인트로 서사]
[간격]
[Personal Info Grid 2x2] -- 기존 유지
[Divider]
[Education | Languages | Certifications 3-col] -- 기존 유지
```

### 6.3 스토리텔링 영역 클래스 명세

```tsx
{/* 스토리텔링 영역 - Personal Info 위에 추가 */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
  transition={{ duration: 0.8, delay: 0.15 }}
  className="flex flex-col md:flex-row gap-10 md:gap-12 items-start mb-16"
>
  {/* 프로필 사진 */}
  <div className="flex-shrink-0 mx-auto md:mx-0">
    <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-3xl overflow-hidden
                    border border-slate-100 dark:border-white/[0.04]
                    bg-slate-100 dark:bg-white/[0.04]">
      <img
        src="/profile.jpg"
        alt="유병규 프로필 사진"
        className="w-full h-full object-cover"
      />
    </div>
  </div>

  {/* 인트로 서사 */}
  <div className="flex-1 space-y-5">
    <p className="text-lg sm:text-xl text-slate-700 dark:text-slate-300 leading-relaxed">
      안녕하세요, 프론트엔드 개발자 유병규입니다.
      사용자와 서비스가 만나는 접점에서 더 나은 경험을 만드는 것에 가치를 두고 있습니다.
    </p>
    <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
      B2B SaaS 플랫폼의 초기 설계부터 운영까지 전 과정을 경험했으며,
      프론트엔드를 넘어 백엔드 API 개발까지 유기적으로 수행합니다.
      성능 최적화와 사용자 경험 개선에 특히 강점을 가지고 있습니다.
    </p>
    <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
      개인 쇼핑몰 운영과 SNS 마케팅 경험은 단순한 이력이 아닌,
      사용자 관점에서 제품을 바라보는 시각과 데이터 기반 사고의 토대가 되었습니다.
    </p>
  </div>
</motion.div>
```

### 6.4 프로필 사진 스펙

| 속성 | 값 |
|------|-----|
| 크기 (모바일) | `w-40 h-40` (160px) |
| 크기 (태블릿+) | `sm:w-48 sm:h-48` (192px) |
| 둥글기 | `rounded-3xl` (24px) -- 기존 카드보다 약간 더 둥글게 |
| 보더 | `border border-slate-100 dark:border-white/[0.04]` |
| 배경 (로딩 중) | `bg-slate-100 dark:bg-white/[0.04]` |
| 오브젝트 핏 | `object-cover` |

### 6.5 반응형

| 브레이크포인트 | 레이아웃 |
|---------------|---------|
| 모바일 (< 768px) | 수직 스택 (사진 중앙 정렬 + 텍스트) |
| 태블릿+ (>= 768px) | 수평 배치 (사진 왼쪽 + 텍스트 오른쪽) |

모바일에서 프로필 사진은 `mx-auto`로 중앙 정렬, 텍스트는 전체 폭.
태블릿 이상에서는 `md:flex-row`로 수평 배치, 사진 `md:mx-0`으로 좌측 정렬.

### 6.6 애니메이션

```tsx
// 스토리텔링 영역 전체
initial={{ opacity: 0, y: 20 }}
animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
transition={{ duration: 0.8, delay: 0.15 }}
```

기존 Personal Info(`delay: 0.2`)보다 약간 먼저(0.15) 나타나도록.

### 6.7 다크모드

모든 요소가 기존 디자인 토큰을 사용하므로 추가 처리 없음.
프로필 사진 영역의 보더만 다크 모드에서 `dark:border-white/[0.04]`로 미세하게 표시.

---

## 전체 섹션 순서 변경 요약 (page.tsx)

```tsx
export default function Home() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen">
        <Hero />
        <About />           {/* About + 스토리텔링 영역 추가 */}
        <Work />             {/* 프로젝트 클릭 시 /projects/[slug] 이동 */}
        <SideProjects />     {/* 신규 추가 */}
        <Skills />           {/* 숙련도 시각 구분 추가 */}
        <Experience />       {/* "Beyond Code"로 리브랜딩 */}
        <HowIWork />
        <Contact />          {/* 이력서 다운로드 버튼 추가 */}
      </main>
    </>
  );
}
```

---

## 공유 파일 구조 (최종)

```
src/
  app/
    page.tsx                    -- 메인 페이지 (섹션 순서 변경)
    layout.tsx                  -- 기존 유지
    globals.css                 -- 기존 유지
    projects/
      [slug]/
        page.tsx                -- 프로젝트 상세 페이지 (신규)
  components/
    Navigation.tsx              -- 이력서 버튼 추가
    Hero.tsx                    -- 이력서 링크 추가
    About.tsx                   -- 스토리텔링 영역 추가
    Work.tsx                    -- 프로젝트 클릭 -> Link 추가
    SideProjects.tsx            -- 신규
    Skills.tsx                  -- 숙련도 구분 추가
    Experience.tsx              -- "Beyond Code" 리브랜딩
    HowIWork.tsx                -- 기존 유지
    Contact.tsx                 -- 이력서 버튼 추가
    project-detail/
      ProjectHeader.tsx         -- 신규
      ProjectOverview.tsx       -- 신규
      ProjectGallery.tsx        -- 신규
      ProjectChallenges.tsx     -- 신규
      ProjectMetrics.tsx        -- 신규
      ProjectTechStack.tsx      -- 신규
      ProjectNavigation.tsx     -- 신규
  data/
    projects.ts                 -- 프로젝트 데이터 (신규)
public/
  resume.pdf                    -- 이력서 파일
  profile.jpg                   -- 프로필 사진
  projects/
    platpharm/
      screenshot-01.png
      screenshot-02.png
      ...
```

---

## 디자인 원칙 체크리스트

- [x] 모든 신규 요소가 기존 디자인 토큰(색상, 타이포, 간격)을 사용하는가?
- [x] 모든 섹션에 py-32 lg:py-40 또는 py-20 여백이 적용되는가?
- [x] 다크모드 처리가 모든 요소에 적용되는가?
- [x] 반응형이 모바일/태블릿/데스크톱 3단계로 고려되는가?
- [x] Framer Motion 애니메이션이 기존 패턴(fade-in + slide-up, 0.6~0.8s)을 따르는가?
- [x] 포인트 색상이 blue-600/blue-400으로 통일되는가? (기존 Projects 컴포넌트의 red 계열은 사용하지 않음)
- [x] 아이콘은 Lucide React만 사용하는가?
- [x] 카드 스타일이 rounded-2xl + border 패턴을 따르는가?
- [x] 호버 상태가 정의되어 있는가?
- [x] 접근성: 링크에 의미 있는 텍스트, 이미지에 alt, 충분한 색상 대비?
