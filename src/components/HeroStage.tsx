"use client";

import { motion, useReducedMotion } from "framer-motion";
import HeroMedia from "./HeroMedia";

/**
 * 히어로 첫 화면: 파란 바탕에 왼쪽 문구, 가운데 사원증 카드(3D 캐릭터), 오른쪽 섹션 폴더.
 * 등장 연출: 카드가 오른쪽 위 모서리에서 기울어진 채 날아와 착지하고, 폴더가 카드 쪽에서 미끄러져 나온다.
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

const SPRING = { type: "spring", stiffness: 70, damping: 15, mass: 1 } as const;
const CARD_DELAY = 0.15;
const FOLDER_DELAY = 0.75;
const TEXT_DELAY = 0.95;

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
  const w = "w-[5.5rem] lg:w-[6.5rem]";
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
        <p className="text-sm text-slate-500">Product Engineer</p>
      </div>
    </HeroMedia>
  );
}

export default function HeroStage() {
  const reduce = useReducedMotion();
  const enter = (delay: number) =>
    reduce ? {} : { transition: { ...SPRING, delay } };

  return (
    <div className="relative overflow-hidden bg-blue-600 text-white dark:bg-blue-700">
      <div className="container-max-width section-padding grid min-h-[100dvh] items-center gap-10 pb-16 pt-24 lg:grid-cols-[1fr_auto_1fr] lg:gap-14">
        {/* 왼쪽(모바일은 카드 아래): 한 줄 소개 + 주 행동 버튼 */}
        <motion.div
          className="order-2 text-center lg:order-1 lg:text-left"
          initial={reduce ? false : { x: -24, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={
            reduce
              ? undefined
              : { duration: 0.6, delay: TEXT_DELAY, ease: [0.16, 1, 0.3, 1] }
          }
        >
          <h1 className="text-balance text-[2rem] font-bold leading-[1.25] tracking-[-0.035em] lg:text-[2.5rem]">
            문제를 먼저 찾아, 실제로 쓰이는 해결책을 만듭니다.
          </h1>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            <a
              href="#featured"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("#featured");
              }}
              className="rounded-md bg-white px-5 py-3 text-sm font-semibold text-blue-700 transition-transform hover:bg-blue-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:scale-[0.98]"
            >
              작업 사례 보기
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("#contact");
              }}
              className="rounded-md px-5 py-3 text-sm font-semibold text-white ring-1 ring-inset ring-white/70 transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:scale-[0.98]"
            >
              연락하기
            </a>
          </div>
        </motion.div>

        {/* 가운데: 사원증 카드 */}
        <div className="order-1 flex justify-center lg:order-2">
          <motion.div
            initial={
              reduce ? false : { x: "60vw", y: "-70vh", rotate: 30, opacity: 0 }
            }
            animate={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
            {...enter(CARD_DELAY)}
          >
            <Badge />
          </motion.div>
        </div>

        {/* 오른쪽(모바일은 맨 아래): 섹션으로 가는 폴더 */}
        <nav aria-label="섹션 바로가기" className="order-3 lg:justify-self-end">
          <ul className="grid grid-cols-3 gap-x-2 gap-y-4 lg:grid-cols-2 lg:gap-x-6 lg:gap-y-5">
            {FOLDERS.map((f, i) => (
              <motion.li
                key={f.href}
                initial={reduce ? false : { x: -40, scale: 0.6, opacity: 0 }}
                animate={{ x: 0, scale: 1, opacity: 1 }}
                {...enter(FOLDER_DELAY + i * 0.06)}
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
