"use client";

import { useEffect, useState } from "react";
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
const DROP = { type: "spring", stiffness: 110, damping: 11, mass: 1 } as const;
/** 착지 뒤 줄 끝을 축으로 좌우로 흔들리다 멈춘다 (각도, 도) */
const SWING = [0, 0, 2.4, -1.6, 0.8, -0.3, 0];
const SWING_TIMES = [0, 0.22, 0.42, 0.6, 0.76, 0.9, 1];
const SWING_S = 1.8;
const CARD_DELAY = 0.1;
/** 커서가 깜빡이기 시작하는 시점, 타이핑 시작 시점(ms)과 글자당 간격(ms) */
const CURSOR_AT = 500;
const TYPE_AT = 900;
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

function Badge() {
  return (
    <HeroMedia className="w-[15rem] rounded-2xl bg-white p-3 shadow-[0_30px_60px_-24px_rgba(10,30,110,0.65)] lg:w-[17.5rem]">
      <div className="px-2 pb-2 pt-1 text-left">
        <p className="text-lg font-bold tracking-[-0.02em] text-slate-900">
          유병규
        </p>
        <p className="text-sm text-slate-500">프로덕트 엔지니어(프론트엔드)</p>
      </div>
    </HeroMedia>
  );
}

/** 목걸이 줄 + 금속 고리. 줄은 화면 위 끝까지 이어지고, 히어로의 overflow-hidden 에 잘린다 */
function Lanyard() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2"
    >
      <div className="mx-auto h-[100vh] w-4 bg-blue-900/45 dark:bg-blue-950/60" />
      <div className="mx-auto -mt-1 h-5 w-9 rounded-md bg-slate-200 shadow-sm ring-1 ring-inset ring-slate-300" />
    </div>
  );
}

export default function HeroStage() {
  const reduce = useReducedMotion();

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
                      times: SWING_TIMES,
                      ease: "easeOut",
                      delay: CARD_DELAY,
                    },
                  }
            }
          >
            <Lanyard />
            <Badge />
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
