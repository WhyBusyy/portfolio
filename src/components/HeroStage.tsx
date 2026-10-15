"use client";

import { motion, useReducedMotion } from "framer-motion";
import HeroMedia from "./HeroMedia";

/**
 * 히어로 첫 화면: 파란 바탕 가운데 사원증 카드(3D 캐릭터)와, 그 둘레에 섹션으로 가는 폴더.
 * 등장 연출: 카드가 오른쪽 위 모서리에서 기울어진 채 날아와 착지하고, 폴더가 카드 뒤에서 펼쳐져 제자리로 간다.
 * 동작 줄이기 설정이면 연출 없이 바로 최종 화면을 보여 준다.
 */
const FOLDERS = [
  { label: "Selected Work", href: "#featured", left: 22, top: 16 },
  { label: "How I Work", href: "#how-i-work", left: 78, top: 14 },
  { label: "Projects", href: "#work", left: 8, top: 52 },
  { label: "Skills", href: "#skills", left: 92, top: 50 },
  { label: "About", href: "#about", left: 20, top: 88 },
  { label: "Contact", href: "#contact", left: 80, top: 86 },
];

/** 데스크톱 원형 배치 영역의 크기(px). 폴더가 카드 뒤에서 출발할 거리 계산에 쓴다 */
const STAGE_W = 1040;
const STAGE_H = 560;

const SPRING = { type: "spring", stiffness: 70, damping: 15, mass: 1 } as const;
const CARD_DELAY = 0.15;
const FOLDER_DELAY = 0.75;
const TEXT_DELAY = 1.15;

function scrollTo(href: string) {
  const el = document.querySelector(href);
  if (!el) return;
  window.scrollTo({
    top: el.getBoundingClientRect().top + window.scrollY - 48,
    behavior: "smooth",
  });
}

/** 폴더: 기본은 파란 면 + 흰 테두리, 마우스를 올리면 흰 면 + 파란 테두리. 앞판이 살짝 열리며 떠오른다 */
function Folder({
  label,
  href,
  size = "lg",
}: {
  label: string;
  href: string;
  size?: "lg" | "sm";
}) {
  const w = size === "lg" ? "w-[7.5rem]" : "w-[5.5rem]";
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

function Badge({ small = false }: { small?: boolean }) {
  return (
    <HeroMedia
      className={`rounded-2xl bg-white p-3 shadow-[0_30px_60px_-24px_rgba(10,30,110,0.65)] ${
        small ? "w-[15rem]" : "w-[17.5rem]"
      }`}
    >
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
      <div className="container-max-width section-padding flex min-h-[100dvh] flex-col items-center justify-center pb-16 pt-20">
        {/* 데스크톱: 카드 둘레에 폴더 원형 배치 */}
        <div
          className="relative hidden lg:block"
          style={{
            width: STAGE_W,
            height: `min(${STAGE_H}px, calc(100dvh - 19rem))`,
            maxWidth: "100%",
          }}
        >
          {/* 위치(가운데 정렬)는 바깥 div, 등장 움직임은 안쪽 motion.div 가 맡는다. 둘 다 transform 을 쓰기 때문 */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <motion.div
              initial={
                reduce
                  ? false
                  : { x: "70vw", y: "-75vh", rotate: 32, opacity: 0 }
              }
              animate={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
              {...enter(CARD_DELAY)}
            >
              <Badge />
            </motion.div>
          </div>
          {FOLDERS.map((f, i) => (
            <div
              key={f.href}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${f.left}%`, top: `${f.top}%` }}
            >
              <motion.div
                initial={
                  reduce
                    ? false
                    : {
                        x: ((50 - f.left) / 100) * STAGE_W,
                        y: ((50 - f.top) / 100) * STAGE_H,
                        scale: 0.4,
                        opacity: 0,
                      }
                }
                animate={{ x: 0, y: 0, scale: 1, opacity: 1 }}
                {...enter(FOLDER_DELAY + i * 0.06)}
              >
                <Folder label={f.label} href={f.href} />
              </motion.div>
            </div>
          ))}
        </div>

        {/* 모바일·태블릿: 카드 아래에 문구, 그 아래 폴더 격자 */}
        <motion.div
          className="lg:hidden"
          initial={
            reduce ? false : { x: "60vw", y: "-60vh", rotate: 28, opacity: 0 }
          }
          animate={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
          {...enter(CARD_DELAY)}
        >
          <Badge small />
        </motion.div>

        <motion.div
          className="mt-10 text-center lg:mt-4"
          initial={reduce ? false : { y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={
            reduce
              ? undefined
              : { duration: 0.6, delay: TEXT_DELAY, ease: [0.16, 1, 0.3, 1] }
          }
        >
          <h1 className="text-balance text-[2rem] font-bold leading-[1.2] tracking-[-0.035em] sm:text-[2.6rem]">
            문제를 먼저 찾아, 실제로 쓰이는 해결책을 만듭니다.
          </h1>
          <p className="mt-3 text-balance text-base text-blue-100 sm:text-lg">
            직접 제안해 만든 QA 봇과 자체 CMS는 지금도 팀이 쓰고 있습니다.
          </p>
          {/* 히어로의 주 행동: 폴더(섹션 이동)보다 먼저 눈에 들어오게 버튼 두 개만 둔다 */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#featured"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("#featured");
              }}
              className="rounded-md bg-white px-5 py-3 text-sm font-semibold text-blue-700 transition-transform hover:bg-blue-50 active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              작업 사례 보기
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("#contact");
              }}
              className="rounded-md px-5 py-3 text-sm font-semibold text-white ring-1 ring-inset ring-white/70 transition-colors hover:bg-white/10 active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              연락하기
            </a>
          </div>
        </motion.div>

        <ul className="mt-10 grid grid-cols-3 gap-x-2 gap-y-4 sm:grid-cols-6 lg:hidden">
          {FOLDERS.map((f, i) => (
            <motion.li
              key={f.href}
              initial={reduce ? false : { y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              {...enter(FOLDER_DELAY + i * 0.06)}
            >
              <Folder label={f.label} href={f.href} size="sm" />
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
}
