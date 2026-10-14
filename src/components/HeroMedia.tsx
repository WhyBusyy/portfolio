"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";

/**
 * 히어로 오른쪽 캐릭터: 커서가 있는 방향을 바라본다.
 * 포즈는 AI 영상에서 뽑은 프레임(배경 제거)이고, 영상에 없는 방향은 이미지 생성으로 채운다.
 * 아직 없는 포즈는 FALLBACK 의 가까운 포즈로 대신한다.
 */
type Pose = "ul" | "u" | "ur" | "l" | "c" | "r" | "dl" | "d" | "dr";

const SRC: Partial<Record<Pose, string>> = {
  ur: "/hero/pose-ur.webp",
  l: "/hero/pose-l.webp",
  c: "/hero/pose-c.webp",
  r: "/hero/pose-r.webp",
  dl: "/hero/pose-dl.webp",
  d: "/hero/pose-d.webp",
};

const FALLBACK: Record<Pose, Pose[]> = {
  ul: ["ul", "l", "c"],
  u: ["u", "c"],
  ur: ["ur", "r", "c"],
  l: ["l", "c"],
  c: ["c"],
  r: ["r", "c"],
  dl: ["dl", "l", "c"],
  d: ["d", "c"],
  dr: ["dr", "r", "c"],
};

const resolve = (p: Pose) => FALLBACK[p].find((q) => SRC[q]) ?? "c";

/** 오른쪽부터 시계 방향으로 45°씩 (화면 좌표라 y 가 아래로 커진다) */
const SECTORS: Pose[] = ["r", "dr", "d", "dl", "l", "ul", "u", "ur"];

/** 터치 기기에서는 커서가 없으니 천천히 둘러본다 */
const IDLE_TOUR: Pose[] = ["c", "l", "c", "r", "c", "ur"];
const IDLE_MS = 1800;

export default function HeroMedia() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [pose, setPose] = useState<Pose>("c");
  // 정면 이미지만 먼저 그리고, 나머지 포즈는 하이드레이션 뒤에 붙여 첫 화면을 가볍게 한다
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    if (reduce) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    if (!fine) {
      let i = 0;
      const id = setInterval(() => {
        i = (i + 1) % IDLE_TOUR.length;
        setPose(IDLE_TOUR[i]);
      }, IDLE_MS);
      return () => clearInterval(id);
    }

    const onMove = (e: PointerEvent) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      // 얼굴 중심: 가로 가운데, 세로 위에서 1/3 지점
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 3);
      if (Math.hypot(dx, dy) < r.width * 0.3) return setPose("c");
      const sector = Math.round(Math.atan2(dy, dx) / (Math.PI / 4));
      setPose(SECTORS[(sector + 8) % 8]);
    };
    const onLeave = () => setPose("c");

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [reduce]);

  const shown = resolve(pose);
  // 새 포즈는 위에서 나타나고, 이전 포즈는 그동안 아래에 그대로 있다가 사라진다 (둘 다 반투명해지면 배경이 비친다)
  const layer = (p: Pose) =>
    `object-cover object-bottom transition-opacity motion-reduce:transition-none ${
      shown === p ? "z-10 opacity-100 duration-150" : "opacity-0 duration-0 delay-150"
    }`;
  const extra = (Object.keys(SRC) as Pose[]).filter((p) => p !== "c");

  return (
    <div
      ref={ref}
      className="relative mx-auto aspect-[4/5] w-full max-w-[26rem] overflow-hidden rounded-xl bg-slate-100 dark:bg-white/[0.05] lg:mr-0"
    >
      <Image
        src={SRC.c!}
        alt="유병규 캐릭터"
        fill
        priority
        sizes="(min-width: 1024px) 26rem, 100vw"
        className={layer("c")}
      />
      {ready &&
        extra.map((p) => (
          <Image
            key={p}
            src={SRC[p]!}
            alt=""
            aria-hidden="true"
            fill
            sizes="(min-width: 1024px) 26rem, 100vw"
            className={layer(p)}
          />
        ))}
    </div>
  );
}
