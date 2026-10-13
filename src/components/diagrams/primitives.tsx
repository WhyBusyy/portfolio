/**
 * 다이어그램 공용 시각 언어.
 * 6개 다이어그램이 한 세트로 읽히도록 박스·화살표·타이포를 여기서만 정의한다.
 * 사내 데이터·화면·고객사명은 넣지 않는다 — 구조와 흐름만 표현한다.
 */

export const FILL_BOX = "fill-white dark:fill-white/[0.04]";
export const FILL_MUTED = "fill-slate-50 dark:fill-white/[0.02]";
export const FILL_ACCENT = "fill-blue-50 dark:fill-blue-500/[0.12]";
export const STROKE_BOX = "stroke-slate-200 dark:stroke-white/[0.14]";
export const STROKE_ACCENT = "stroke-blue-400 dark:stroke-blue-400/70";
export const STROKE_LINE = "stroke-slate-300 dark:stroke-white/25";
export const TEXT = "fill-slate-700 dark:fill-slate-200";
export const TEXT_MUTED = "fill-slate-400 dark:fill-slate-500";
export const TEXT_ACCENT = "fill-blue-700 dark:fill-blue-300";

/** 다이어그램 바깥 껍데기 — 캡션과 접근성 이름을 함께 붙인다. */
export function Figure({
  title,
  caption,
  viewBox,
  children,
  interactive = false,
  footer,
  fluid = false,
  className = "",
}: {
  title: string;
  caption?: string;
  viewBox: string;
  children: React.ReactNode;
  /** 내부에 조작 가능한 노드가 있으면 img 대신 group 으로 노출한다. */
  interactive?: boolean;
  /** 다이어그램과 캡션 사이에 넣을 조작부·설명 */
  footer?: React.ReactNode;
  /** true 면 최소 폭 없이 컨테이너에 맞춰 줄어든다 (세로 배치용) */
  fluid?: boolean;
  className?: string;
}) {
  return (
    <figure className={`my-8 ${className}`}>
      <div className="overflow-x-auto">
        <svg
          viewBox={viewBox}
          role={interactive ? "group" : "img"}
          aria-label={title}
          className={`w-full h-auto ${fluid ? "" : "min-w-[560px]"}`}
        >
          <title>{title}</title>
          {children}
        </svg>
      </div>
      {footer}
      {caption && (
        <figcaption className="mt-3 text-xs text-slate-500 dark:text-slate-400 text-center">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

/** 기본 노드. accent=true 면 강조(파랑), dashed=true 면 점선 테두리. */
export function Node({
  x,
  y,
  w,
  h,
  label,
  sub,
  accent = false,
  dashed = false,
  muted = false,
  state = "default",
  onSelect,
  selectLabel,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  sub?: string;
  accent?: boolean;
  dashed?: boolean;
  muted?: boolean;
  /** active: 현재 단계 강조 · dim: 아직 오지 않은 단계 */
  state?: "default" | "active" | "dim";
  /** 있으면 호버·포커스·클릭으로 선택 가능한 노드가 된다. */
  onSelect?: () => void;
  selectLabel?: string;
}) {
  const cx = x + w / 2;
  const active = state === "active";
  const interactiveProps = onSelect
    ? {
        role: "button",
        tabIndex: 0,
        "aria-label": selectLabel ?? label,
        "aria-pressed": active,
        onClick: onSelect,
        // 마우스를 올리거나 키보드로 포커스해도 선택된다 (터치는 클릭으로)
        onMouseEnter: onSelect,
        onFocus: onSelect,
        onKeyDown: (e: React.KeyboardEvent) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onSelect();
          }
        },
      }
    : {};
  return (
    <g
      {...interactiveProps}
      opacity={state === "dim" ? 0.35 : 1}
      style={{ transition: "opacity 300ms" }}
      className={`motion-reduce:!transition-none ${
        onSelect
          ? "cursor-pointer outline-none [&:focus-visible>rect]:stroke-blue-500 [&:focus-visible>rect]:[stroke-width:2.5]"
          : ""
      }`}
    >
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={8}
        className={`${accent || active ? FILL_ACCENT : muted ? FILL_MUTED : FILL_BOX} ${
          accent || active ? STROKE_ACCENT : STROKE_BOX
        }`}
        strokeWidth={active ? 2 : 1}
        strokeDasharray={dashed ? "4 3" : undefined}
      />
      <text
        x={cx}
        y={sub ? y + h / 2 - 4 : y + h / 2 + 4}
        textAnchor="middle"
        className={`${accent || active ? TEXT_ACCENT : TEXT} text-[12px] font-semibold`}
        style={{ fontSize: 12, fontWeight: 600 }}
      >
        {label}
      </text>
      {sub && (
        <text
          x={cx}
          y={y + h / 2 + 13}
          textAnchor="middle"
          className={TEXT_MUTED}
          style={{ fontSize: 10.5 }}
        >
          {sub}
        </text>
      )}
    </g>
  );
}

/** 화살표. 화살촉은 마커 대신 path 로 직접 그려 다크모드 색을 따라가게 한다. */
export function Arrow({
  x1,
  y1,
  x2,
  y2,
  accent = false,
  dashed = false,
  dim = false,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  accent?: boolean;
  dashed?: boolean;
  dim?: boolean;
}) {
  const cls = accent ? STROKE_ACCENT : STROKE_LINE;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy) || 1;
  const ux = dx / len;
  const uy = dy / len;
  const hx = x2 - ux * 6;
  const hy = y2 - uy * 6;
  const px = -uy * 3.5;
  const py = ux * 3.5;
  return (
    <g opacity={dim ? 0.35 : 1} style={{ transition: "opacity 300ms" }} className="motion-reduce:!transition-none">
      <line
        x1={x1}
        y1={y1}
        x2={hx}
        y2={hy}
        className={cls}
        strokeWidth={1.4}
        strokeDasharray={dashed ? "4 3" : undefined}
      />
      <path
        d={`M ${x2} ${y2} L ${hx + px} ${hy + py} L ${hx - px} ${hy - py} Z`}
        className={accent ? "fill-blue-400" : "fill-slate-300 dark:fill-white/25"}
      />
    </g>
  );
}

/** 영역 라벨 (uppercase 소형 캡션) */
export function Eyebrow({
  x,
  y,
  children,
  accent = false,
}: {
  x: number;
  y: number;
  children: string;
  accent?: boolean;
}) {
  return (
    <text
      x={x}
      y={y}
      className={accent ? TEXT_ACCENT : TEXT_MUTED}
      style={{ fontSize: 10, letterSpacing: "0.12em", fontWeight: 600 }}
    >
      {children.toUpperCase()}
    </text>
  );
}

/** 일반 텍스트 */
export function Txt({
  x,
  y,
  children,
  anchor = "start",
  size = 11,
  muted = false,
  accent = false,
  bold = false,
}: {
  x: number;
  y: number;
  children: string;
  anchor?: "start" | "middle" | "end";
  size?: number;
  muted?: boolean;
  accent?: boolean;
  bold?: boolean;
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      className={accent ? TEXT_ACCENT : muted ? TEXT_MUTED : TEXT}
      style={{ fontSize: size, fontWeight: bold ? 600 : 400 }}
    >
      {children}
    </text>
  );
}

/** 점선 그룹 브래킷 — 여러 노드를 묶어 "게이트" 같은 개념을 표시 */
export function Bracket({
  x,
  y,
  w,
  h,
  label,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={10}
        className={`fill-none ${STROKE_ACCENT}`}
        strokeWidth={1}
        strokeDasharray="5 4"
      />
      <Eyebrow x={x + 10} y={y - 6} accent>
        {label}
      </Eyebrow>
    </g>
  );
}
