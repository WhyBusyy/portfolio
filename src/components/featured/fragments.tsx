/**
 * 대표 작업 섹션의 "다시 그린 UI 조각".
 * 사내 화면을 실을 수 없어서, 구조를 설명하는 예시 UI를 더미 데이터로 직접 그린다.
 * 수치는 프로젝트 상세(projects.ts)에 공개된 값만 쓴다.
 */
import { Check, Bot, Folder, FileCode2, ShieldCheck } from "lucide-react";

/**
 * 조각 틀. 창 모양(점 + 제목 줄)과 큰 그림자는 쓰지 않는다 — 전형적인 AI 목업처럼 보인다.
 * 옅은 면 하나 위에 작은 캡션만 두고, 내용이 화면 역할을 하게 한다.
 */
function Window({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <figure className="w-full">
      <figcaption className="mb-3 text-xs text-slate-600 dark:text-slate-400">{title}</figcaption>
      <div className="rounded-xl bg-slate-50 dark:bg-white/[0.035] p-5 sm:p-6">{children}</div>
    </figure>
  );
}

/** active 일 때만 순서대로 나타나는 줄 (동작 줄이기 설정이면 바로 보임) */
function Reveal({
  show,
  index,
  children,
}: {
  show: boolean;
  index: number;
  children: React.ReactNode;
}) {
  return (
    <div
      className="motion-safe:transition-all motion-safe:duration-500"
      style={{
        opacity: show ? 1 : 0,
        transform: show ? "none" : "translateY(6px)",
        transitionDelay: show ? `${index * 90}ms` : "0ms",
      }}
    >
      {children}
    </div>
  );
}

function PassRow({ label, note }: { label: string; note?: string }) {
  return (
    <div className="flex items-center justify-between py-2 text-sm">
      <span className="flex items-center gap-2 text-slate-700 dark:text-slate-200">
        <Check className="h-4 w-4 text-slate-600 dark:text-slate-400" aria-hidden="true" />
        {label}
      </span>
      {note && <span className="text-xs text-slate-600 dark:text-slate-400">{note}</span>}
    </div>
  );
}

/* ─── 1. QA 봇: PR 코멘트 ─── */
export function QaFragment({ active }: { active: boolean }) {
  return (
    <Window title="Pull Request · QA Bot 코멘트">
      <div className="flex items-center gap-2.5">
        <span className="flex h-8 w-8 items-center justify-center rounded-md bg-slate-900 dark:bg-white">
          <Bot className="h-4 w-4 text-white dark:text-slate-900" aria-hidden="true" />
        </span>
        <div>
          <p className="text-sm font-semibold text-slate-900 dark:text-white">QA Bot</p>
          <p className="text-[11px] text-slate-600 dark:text-slate-400">PR이 열릴 때마다 자동 실행</p>
        </div>
      </div>

      <p className="mt-5 text-xs text-slate-600 dark:text-slate-400">
        고정 테스트 · PR Check에 반영
      </p>
      <div className="divide-y divide-slate-100 dark:divide-white/[0.06]">
        <Reveal show={active} index={0}><PassRow label="Smoke" /></Reveal>
        <Reveal show={active} index={1}><PassRow label="Unit" /></Reveal>
        <Reveal show={active} index={2}><PassRow label="E2E" note="합계 90+ 케이스" /></Reveal>
      </div>

      <Reveal show={active} index={3}>
        <div className="mt-4 border-l-2 border-slate-900 dark:border-white pl-4 py-1">
          <p className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-900 dark:text-white">
            <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
            AI 생성 스펙 · 참고용 (PR Check 미반영)
          </p>
          <div className="mt-1">
            <PassRow label="Syntax Check" note="실패 시 1회 재시도" />
            <PassRow label="Read-only로 실행" note="데이터 변조 불가" />
          </div>
        </div>
      </Reveal>
    </Window>
  );
}

/* ─── 2. VSA: 폴더 구조 ─── */
function TreeRow({
  depth,
  name,
  file = false,
  tag,
  tone = "default",
}: {
  depth: number;
  name: string;
  file?: boolean;
  tag?: string;
  tone?: "default" | "accent" | "muted";
}) {
  const Icon = file ? FileCode2 : Folder;
  const color =
    tone === "accent"
      ? "text-blue-700 dark:text-blue-300"
      : tone === "muted"
        ? "text-slate-600 dark:text-slate-400"
        : "text-slate-700 dark:text-slate-200";
  return (
    <div className="flex items-center justify-between py-1.5" style={{ paddingLeft: depth * 18 }}>
      <span className={`flex items-center gap-2 font-mono text-[13px] ${color}`}>
        <Icon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
        {name}
      </span>
      {tag && (
        <span
          className={`rounded px-1.5 py-0.5 text-[10px] font-semibold ${
            tone === "accent"
              ? "bg-blue-50 text-blue-700 dark:bg-blue-400/10 dark:text-blue-300"
              : "bg-slate-200/70 text-slate-700 dark:bg-white/[0.08] dark:text-slate-300"
          }`}
        >
          {tag}
        </span>
      )}
    </div>
  );
}

export function VsaFragment({ active }: { active: boolean }) {
  return (
    <Window title="프론트엔드 구조 · 하이브리드">
      <Reveal show={active} index={0}><TreeRow depth={0} name="app/" /></Reveal>
      <Reveal show={active} index={1}><TreeRow depth={1} name="[route]/" /></Reveal>
      <Reveal show={active} index={2}>
        <TreeRow depth={2} name="_components/" tag="라우트로 이동" tone="accent" />
      </Reveal>
      <Reveal show={active} index={3}><TreeRow depth={2} name="page.tsx" file /></Reveal>
      <Reveal show={active} index={4}><TreeRow depth={0} name="hooks/" tag="공통 유지" tone="muted" /></Reveal>
      <Reveal show={active} index={5}>
        <TreeRow depth={0} name="types/" tag="전역 선언 · 이동 불가" tone="muted" />
      </Reveal>
      <Reveal show={active} index={6}><TreeRow depth={0} name="api/" tag="공통 유지" tone="muted" /></Reveal>

      <Reveal show={active} index={7}>
        <div className="mt-4 rounded-lg bg-slate-900 dark:bg-black px-3.5 py-2.5 font-mono text-[12px] text-slate-300">
          <span className="text-slate-400">$</span> 아키텍처 규칙 검사{" "}
          <span className="text-slate-500">· 모든 PR</span>
          <div className="mt-1 text-emerald-400">✓ 7 rules · 0 errors</div>
        </div>
      </Reveal>
    </Window>
  );
}

/* ─── 3. 에디터: 의존성 크기 ─── */
function Bar({
  label,
  value,
  percent,
  accent = false,
  show,
  index,
}: {
  label: string;
  value: string;
  percent: number;
  accent?: boolean;
  show: boolean;
  index: number;
}) {
  return (
    <div className="py-2">
      <div className="flex items-baseline justify-between text-sm">
        <span className="text-slate-600 dark:text-slate-300">{label}</span>
        <span
          className={`font-semibold tabular-nums ${
            accent ? "text-blue-700 dark:text-blue-300" : "text-slate-900 dark:text-white"
          }`}
        >
          {value}
        </span>
      </div>
      {/* 배경 트랙 없이 막대만: 길이 차이 자체가 정보다 */}
      <div className="mt-1.5 h-2">
        <div
          className={`h-full rounded-sm origin-left motion-safe:transition-transform motion-safe:duration-700 ${
            accent ? "bg-blue-600 dark:bg-blue-400" : "bg-slate-300 dark:bg-white/20"
          }`}
          style={{
            width: `${Math.max(percent, 0.8)}%`,
            transform: show ? "scaleX(1)" : "scaleX(0)",
            transitionDelay: show ? `${index * 150}ms` : "0ms",
          }}
        />
      </div>
    </div>
  );
}

export function EditorFragment({ active }: { active: boolean }) {
  return (
    <Window title="에디터 의존성 · 배포 시간">
      <p className="text-xs text-slate-600 dark:text-slate-400">
        에디터 패키지 (node_modules 기준)
      </p>
      <Bar label="CKEditor" value="2.5GB" percent={100} show={active} index={0} />
      <Bar label="Tiptap + Custom Toolbar" value="3MB" percent={0.12} accent show={active} index={1} />

      <p className="mt-5 text-xs text-slate-600 dark:text-slate-400">
        운영 배포 시간
      </p>
      <Bar label="교체 전" value="12분" percent={100} show={active} index={2} />
      <Bar label="교체 후" value="6분" percent={50} accent show={active} index={3} />
    </Window>
  );
}

/* ─── 4. CMS: 운영팀 편집 화면 ─── */
export function CmsFragment({ active }: { active: boolean }) {
  const menus = ["메인 배너", "공지", "이벤트", "안내 문구"];
  return (
    <Window title="자체 CMS · 운영팀 편집 화면">
      <div className="grid grid-cols-[96px_1fr] gap-4">
        <ul className="space-y-1 text-[13px]">
          {menus.map((m, i) => (
            <li
              key={m}
              className={`rounded-md px-2.5 py-1.5 ${
                i === 0
                  ? "bg-blue-50 font-semibold text-blue-700 dark:bg-blue-400/10 dark:text-blue-300"
                  : "text-slate-600 dark:text-slate-400"
              }`}
            >
              {m}
            </li>
          ))}
        </ul>
        <div className="space-y-3">
          <Reveal show={active} index={0}>
            <div className="h-8 rounded-md border border-slate-200 dark:border-white/[0.08] px-2.5 text-[13px] leading-8 text-slate-700 dark:text-slate-200">
              시즌 프로모션 안내
            </div>
          </Reveal>
          <Reveal show={active} index={1}>
            <div className="space-y-1.5 rounded-md border border-slate-200 dark:border-white/[0.08] p-2.5">
              <div className="h-2 w-11/12 rounded bg-slate-200 dark:bg-white/[0.1]" />
              <div className="h-2 w-9/12 rounded bg-slate-200 dark:bg-white/[0.1]" />
              <div className="h-2 w-10/12 rounded bg-slate-200 dark:bg-white/[0.1]" />
            </div>
          </Reveal>
          <Reveal show={active} index={2}>
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-slate-600 dark:text-slate-400">개발자 배포 없이 반영</span>
              <span className="rounded-md bg-blue-600 px-3 py-1 text-[12px] font-semibold text-white">게시</span>
            </div>
          </Reveal>
        </div>
      </div>
      <Reveal show={active} index={3}>
        <div className="mt-5 flex items-baseline justify-between border-t border-slate-100 dark:border-white/[0.06] pt-4">
          <span className="text-sm text-slate-600 dark:text-slate-300">콘텐츠 관련 개발 요청</span>
          <span className="text-sm font-semibold tabular-nums text-slate-900 dark:text-white">
            3일 1회 <span className="text-slate-400">→</span>{" "}
            <span className="text-blue-700 dark:text-blue-300">2주 1회</span>
          </span>
        </div>
      </Reveal>
    </Window>
  );
}
