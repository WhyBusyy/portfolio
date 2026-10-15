"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import HeroMedia from "./HeroMedia";

/**
 * 히어로 첫 화면: 파란 바탕에 왼쪽 문구, 가운데 사원증 카드(3D 캐릭터), 오른쪽 섹션 폴더.
 * 등장 연출: 목걸이 줄에 매달린 카드가 위에서 툭 떨어져 좌우로 흔들리다 멈추고(사원증 발급),
 * 컴퓨터가 켜지듯 커서가 깜빡인 뒤 문구가 타이핑되고, 끝나면 폴더가 바탕화면 아이콘처럼 하나씩 생긴다.
 * 동작 줄이기 설정이면 연출 없이 바로 최종 화면을 보여 준다.
 */
const FOLDERS = [
  { label: "Selected Work", href: "#featured" },
  { label: "How I Work", href: "#how-i-work" },
  { label: "Projects", href: "#work" },
  { label: "Skills", href: "#skills" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

/** 카드 낙하: 살짝 튀었다 자리 잡는 스프링 */
const DROP = { duration: 1.3, ease: [0.22, 1, 0.36, 1] } as const;
/** 내려오는 끝무렵부터 줄 끝을 축으로 아주 작게 흔들리다 멈춘다 (각도, 도) */
const SWING = [0, 1.1, -0.7, 0.35, 0];
const SWING_S = 2.4;
const SWING_AT = 0.75;
const CARD_DELAY = 0.1;
/** 커서 쪽으로 줄째 기우는 각도(도)와, 집게가 카드를 따라 도는 비율 */
const LEAN = 1.4;
const CLIP_TURN = 16;
/** 줄 휨 스프링: 미는 세기, 되돌아오는 힘, 감쇠, 최대 휨(px) */
const BEND_PUSH = 180;
const BEND_SPRING = 0.07;
const BEND_DAMP = 0.16;
const BEND_MAX = 26;
/** 커서가 깜빡이기 시작하는 시점, 타이핑 시작 시점(ms)과 글자당 간격(ms) */
const TYPE_AT = 2300;
const CURSOR_AT = TYPE_AT - 400;
const TYPE_MS = 28;
/** 타이핑이 끝난 뒤 커서를 남겨 두는 시간(ms) */
const CURSOR_LINGER = 1400;
const FOLDER_STAGGER = 0.07;
const POP = { type: "spring", stiffness: 260, damping: 16 } as const;

const LINES = [
  { text: "문제를 먼저 찾아,", dim: true },
  { text: "실제로 쓰이는 해결책을 만듭니다.", dim: false },
];
const TOTAL_CHARS = LINES.reduce((n, l) => n + l.text.length, 0);
const TYPE_END = TYPE_AT + TOTAL_CHARS * TYPE_MS;
/** 폴더는 타이핑이 끝날 즈음 나타난다 (초) */
const FOLDER_DELAY = TYPE_END / 1000 - 0.1;

/**
 * 타이핑 제목. 전체 문장을 투명하게 깔아 자리를 미리 잡아 두고(레이아웃 흔들림 없음),
 * 그 위에 지금까지 친 글자만 겹쳐 그린다. 스크린 리더는 처음부터 전체 문장을 읽는다.
 */
function TypedHeading({ animate }: { animate: boolean }) {
  const [count, setCount] = useState(animate ? 0 : TOTAL_CHARS);
  const [cursor, setCursor] = useState(false);

  useEffect(() => {
    const timers: number[] = [];
    // 동작 줄이기 설정이면 바로 전체 문장을 보여 준다 (서버 렌더 시점엔 설정을 몰라 0자로 시작한다)
    if (!animate) {
      timers.push(window.setTimeout(() => setCount(TOTAL_CHARS), 0));
      return () => timers.forEach(clearTimeout);
    }
    timers.push(window.setTimeout(() => setCursor(true), CURSOR_AT));
    for (let i = 1; i <= TOTAL_CHARS; i++) {
      timers.push(window.setTimeout(() => setCount(i), TYPE_AT + i * TYPE_MS));
    }
    timers.push(
      window.setTimeout(() => setCursor(false), TYPE_END + CURSOR_LINGER),
    );
    return () => timers.forEach(clearTimeout);
  }, [animate]);

  let left = count;
  return (
    <h1 className="break-keep text-[2rem] font-semibold leading-[1.3] tracking-[-0.02em] lg:text-[2.75rem]">
      <span className="sr-only">{LINES.map((l) => l.text).join(" ")}</span>
      <span aria-hidden="true" className="grid">
        {/* 자리 잡기용 전체 문장 */}
        <span className="invisible col-start-1 row-start-1">
          {LINES.map((l) => (
            <span key={l.text} className="block">
              {l.text}
            </span>
          ))}
        </span>
        {/* 실제로 보이는 타이핑 문장 */}
        <span className="col-start-1 row-start-1">
          {LINES.map((l, i) => {
            const shown = l.text.slice(
              0,
              Math.max(0, Math.min(l.text.length, left)),
            );
            const typingHere =
              left >= 0 &&
              left <= l.text.length &&
              (left < l.text.length || i === LINES.length - 1);
            left -= l.text.length;
            return (
              <span
                key={l.text}
                className={`block ${l.dim ? "text-blue-100" : ""}`}
              >
                {shown}
                {cursor && typingHere && (
                  <span className="ml-0.5 inline-block h-[0.9em] w-[0.08em] translate-y-[0.12em] animate-[blink_1s_steps(1)_infinite] bg-white align-baseline" />
                )}
              </span>
            );
          })}
        </span>
      </span>
    </h1>
  );
}

function scrollTo(href: string) {
  const el = document.querySelector(href);
  if (!el) return;
  window.scrollTo({
    top: el.getBoundingClientRect().top + window.scrollY - 48,
    behavior: "smooth",
  });
}

/** 폴더: 기본은 파란 면 + 흰 테두리, 마우스를 올리면 흰 면 + 파란 테두리. 앞판이 살짝 열리며 떠오른다 */
function Folder({ label, href }: { label: string; href: string }) {
  const w = "w-[5.5rem] lg:w-[4.75rem]";
  return (
    <a
      href={href}
      onClick={(e) => {
        e.preventDefault();
        scrollTo(href);
      }}
      className="group flex flex-col items-center gap-2 rounded-xl p-2 outline-none focus-visible:ring-2 focus-visible:ring-white"
    >
      <svg
        viewBox="0 0 120 96"
        aria-hidden="true"
        className={`${w} overflow-visible transition-transform duration-300 ease-out group-hover:-translate-y-1.5 group-focus-visible:-translate-y-1.5`}
      >
        {/* 뒤판 (탭 포함) */}
        <path
          d="M6 12a6 6 0 0 1 6-6h28l10 10h58a6 6 0 0 1 6 6v62a6 6 0 0 1-6 6H12a6 6 0 0 1-6-6z"
          className="fill-blue-500 stroke-white transition-colors duration-200 group-hover:fill-white group-hover:stroke-blue-600 group-focus-visible:fill-white group-focus-visible:stroke-blue-600 dark:fill-blue-600"
          strokeWidth={3}
          strokeLinejoin="round"
        />
        {/* 안에 든 종이: 앞판이 열리면 보인다 */}
        <rect
          x={16}
          y={22}
          width={88}
          height={48}
          rx={3}
          className="fill-blue-100 transition-transform duration-300 ease-out group-hover:-translate-y-2 group-focus-visible:-translate-y-2"
        />
        {/* 앞판: 아래쪽을 축으로 앞으로 젖혀진다 */}
        <g className="origin-[60px_90px] transition-transform duration-300 ease-out [transform:perspective(300px)_rotateX(0deg)] group-hover:[transform:perspective(300px)_rotateX(-30deg)] group-focus-visible:[transform:perspective(300px)_rotateX(-30deg)]">
          <rect
            x={6}
            y={32}
            width={108}
            height={58}
            rx={6}
            className="fill-blue-500 stroke-white transition-colors duration-200 group-hover:fill-white group-hover:stroke-blue-600 group-focus-visible:fill-white group-focus-visible:stroke-blue-600 dark:fill-blue-600"
            strokeWidth={3}
          />
        </g>
      </svg>
      <span className="text-center text-sm font-semibold leading-tight text-white">
        {label}
      </span>
    </a>
  );
}

function Badge({ onTilt }: { onTilt: (x: number, y: number) => void }) {
  return (
    <HeroMedia
      onTilt={onTilt}
      className="relative w-[15rem] rounded-2xl bg-white p-3 pt-8 shadow-[0_30px_60px_-24px_rgba(10,30,110,0.65)] lg:w-[17.5rem]"
    >
      {/* 줄을 거는 구멍: 뒤 배경(파랑)이 비쳐 보이게 */}
      <span
        aria-hidden="true"
        className="absolute left-1/2 top-3 h-2.5 w-12 -translate-x-1/2 rounded-full bg-blue-600 shadow-[inset_0_1px_2px_rgba(0,0,0,0.35)] dark:bg-blue-700"
      />
      <div className="px-2 pb-2 pt-1 text-left">
        <p className="text-lg font-bold tracking-[-0.02em] text-slate-900">
          유병규
        </p>
        <p className="text-sm text-slate-500">프로덕트 엔지니어(프론트엔드)</p>
      </div>
    </HeroMedia>
  );
}

/**
 * 목걸이 줄: 위에서 내려온 두 가닥 천 줄이 V 자로 모여 금속 고리와 집게로 카드 구멍에 걸린다.
 * 줄은 화면 위 끝까지 이어지고, 히어로의 overflow-hidden 에 잘린다.
 */
/** 두 가닥 줄의 중심선: 위(x, 0) → 아래(x, 1000). 아래로 갈수록 가운데로 모인다(V 자) */
const STRAPS = [
  { top: 13, bottom: 33 },
  { top: 59, bottom: 39 },
];
/** 박음질선은 줄 중심에서 좌우로 이만큼 떨어진다 (px) */
const STITCH = 4;

/** bow: 줄 가운데가 옆으로 휘는 정도(px). 0이면 곧은 줄 */
function strapPath(top: number, bottom: number, bow: number) {
  const cx = (top + bottom) / 2 + bow;
  return `M${top} 0 Q${cx} 560 ${bottom} 1000`;
}

type Bend = { bow: number; vel: number; lastX: number; raf: number };

function drawBow(paths: (SVGPathElement | null)[], bow: number) {
  for (const el of paths) {
    if (!el) continue;
    el.setAttribute(
      "d",
      strapPath(Number(el.dataset.top), Number(el.dataset.bottom), bow),
    );
  }
}

/** 휨이 0으로 돌아올 때까지 매 프레임 스프링을 진행한다 */
function runBend(b: Bend, paths: (SVGPathElement | null)[]) {
  const tick = () => {
    b.vel += -b.bow * BEND_SPRING - b.vel * BEND_DAMP;
    b.bow = Math.max(-BEND_MAX, Math.min(BEND_MAX, b.bow + b.vel));
    drawBow(paths, b.bow);
    if (Math.abs(b.bow) + Math.abs(b.vel) > 0.02) {
      b.raf = requestAnimationFrame(tick);
    } else {
      b.bow = b.vel = 0;
      b.raf = 0;
      drawBow(paths, 0);
    }
  };
  b.raf = requestAnimationFrame(tick);
}

function Lanyard({
  clipRef,
  pathRefs,
}: {
  clipRef: React.Ref<HTMLDivElement>;
  pathRefs: React.RefObject<(SVGPathElement | null)[]>;
}) {
  // 줄 1개당 [천, 박음질 왼쪽, 박음질 오른쪽] 3개의 path 를 쓴다
  const parts = STRAPS.flatMap((st) => [
    { ...st, dx: 0, kind: "strap" as const },
    { ...st, dx: -STITCH, kind: "stitch" as const },
    { ...st, dx: STITCH, kind: "stitch" as const },
  ]);
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute bottom-[calc(100%-1.1rem)] left-1/2 z-10 flex -translate-x-1/2 flex-col items-center"
    >
      <svg
        viewBox="0 0 72 1000"
        preserveAspectRatio="none"
        className="h-[100vh] w-[4.5rem] overflow-visible"
      >
        {parts.map((pt, i) => (
          <path
            key={i}
            ref={(el) => {
              pathRefs.current[i] = el;
            }}
            data-top={pt.top + pt.dx}
            data-bottom={pt.bottom + pt.dx}
            d={strapPath(pt.top + pt.dx, pt.bottom + pt.dx, 0)}
            fill="none"
            vectorEffect="non-scaling-stroke"
            {...(pt.kind === "strap"
              ? {
                  strokeWidth: 13,
                  className: "stroke-[#22378a] dark:stroke-[#182c6e]",
                }
              : {
                  strokeWidth: 1,
                  stroke: "rgba(255,255,255,0.28)",
                  strokeDasharray: "3 3",
                })}
          />
        ))}
      </svg>
      {/* 금속 고리 + 집게: 카드가 돌면 같은 방향으로 돈다 */}
      <div
        ref={clipRef}
        className="-mt-2 flex flex-col items-center will-change-transform"
      >
        <div className="h-5 w-5 rounded-full border-[3px] border-slate-300 bg-transparent shadow-sm" />
        <div className="-mt-1 h-6 w-3.5 rounded-[5px] bg-gradient-to-b from-slate-100 to-slate-400 shadow" />
      </div>
    </div>
  );
}

export default function HeroStage() {
  const reduce = useReducedMotion();
  const hangRef = useRef<HTMLDivElement>(null);
  const clipRef = useRef<HTMLDivElement>(null);
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);
  // 줄 휨: 카드가 움직인 반대쪽으로 줄 가운데가 늦게 따라오며 휘었다가, 스프링처럼 곧게 돌아온다
  const bend = useRef<Bend>({ bow: 0, vel: 0, lastX: 0, raf: 0 });

  useEffect(() => () => cancelAnimationFrame(bend.current.raf), []);

  // 카드가 커서 쪽으로 돌면, 줄째 그쪽으로 살짝 기울고 집게도 카드를 따라 돈다
  const onTilt = useCallback((x: number) => {
    if (hangRef.current)
      hangRef.current.style.transform = `rotate(${-x * LEAN}deg)`;
    if (clipRef.current)
      clipRef.current.style.transform = `perspective(400px) rotateY(${x * CLIP_TURN}deg)`;
    const b = bend.current;
    b.vel += (x - b.lastX) * BEND_PUSH;
    b.lastX = x;
    if (!b.raf) runBend(b, pathRefs.current);
  }, []);

  return (
    <div className="relative overflow-hidden bg-blue-600 text-white dark:bg-blue-700">
      <div className="container-max-width section-padding grid min-h-[100dvh] items-center gap-10 pb-16 pt-24 lg:grid-cols-[1fr_auto_1fr] lg:gap-14">
        {/* 왼쪽(모바일은 카드 아래): 한 줄 소개. 커서가 깜빡인 뒤 타이핑된다 */}
        <div className="order-2 text-center lg:order-1 lg:text-left">
          {/* 한국어 제목: 단어 중간에서 끊지 않고(keep-all), 굵기·자간을 한 단계 풀어 답답하지 않게 */}
          <TypedHeading animate={!reduce} />
        </div>

        {/* 가운데: 목걸이 줄에 매달린 사원증 카드 */}
        <div className="order-1 flex justify-center lg:order-2">
          <motion.div
            className="relative"
            // 흔들림 축은 줄의 맨 위(카드 위쪽 화면 끝)
            style={{ transformOrigin: "50% -100vh" }}
            initial={reduce ? false : { y: "-110vh", rotate: 0 }}
            animate={{ y: 0, rotate: SWING }}
            transition={
              reduce
                ? undefined
                : {
                    y: { ...DROP, delay: CARD_DELAY },
                    rotate: {
                      duration: SWING_S,
                      ease: "easeInOut",
                      delay: CARD_DELAY + SWING_AT,
                    },
                  }
            }
          >
            {/* 커서 기울기용 층: 등장 흔들림(바깥 motion.div)과 따로 움직인다. 축은 줄의 맨 위 */}
            <div
              ref={hangRef}
              className="relative will-change-transform"
              style={{ transformOrigin: "50% -100vh" }}
            >
              <Lanyard clipRef={clipRef} pathRefs={pathRefs} />
              <Badge onTilt={onTilt} />
            </div>
          </motion.div>
        </div>

        {/* 오른쪽(모바일은 맨 아래): 섹션으로 가는 폴더. 바탕화면 아이콘처럼 하나씩 생긴다 */}
        <nav aria-label="섹션 바로가기" className="order-3 lg:justify-self-end">
          <ul className="grid grid-cols-3 gap-x-2 gap-y-4 lg:grid-cols-2 lg:gap-x-3 lg:gap-y-2">
            {FOLDERS.map((f, i) => (
              <motion.li
                key={f.href}
                initial={reduce ? false : { scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={
                  reduce
                    ? undefined
                    : { ...POP, delay: FOLDER_DELAY + i * FOLDER_STAGGER }
                }
              >
                <Folder label={f.label} href={f.href} />
              </motion.li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
