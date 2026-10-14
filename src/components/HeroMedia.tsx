"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * 히어로 오른쪽 캐릭터: 눈동자가 커서를 따라간다.
 * 원본 그림에서 눈동자만 지운 얼굴(face.webp) 위에 눈동자 조각(pupil-*.webp)을 올려 움직인다.
 * 눈동자 조각은 눈꺼풀 윗선부터 잘라 두었고, 윗선 위로는 clipPath 로 가려 눈꺼풀 밖으로 삐져나오지 않는다.
 * 좌표는 모두 face.webp(720×720) 기준이다.
 */
const EYES = [
  {
    id: "l",
    src: "/hero/pupil-l.webp",
    x: 227,
    y: 431,
    w: 53,
    h: 61,
    clip: "197,447 205,442 213,439 221,436 229,434 237,432 245,432 253,432 261,433 269,436 277,439 283,443 287,447 287,520 197,520",
  },
  {
    id: "r",
    src: "/hero/pupil-r.webp",
    x: 417,
    y: 407,
    w: 53,
    h: 63,
    clip: "389,429 397,423 405,419 413,415 421,413 429,410 437,409 445,408 453,408 461,408 469,409 477,410 485,411 493,413 501,417 501,500 389,500",
  },
] as const;

/** 눈동자가 움직이는 최대 폭 (그림 좌표). 왼쪽 눈은 눈꺼풀 선이 오른쪽으로 짧아 그 이상 가면 잘려 보인다 */
const MAX_X = 12;
const MAX_UP = 5;
const MAX_DOWN = 9;
/** 얼굴 전체가 커서 쪽으로 돌아보는 정도: 위치 이동(그림 좌표)과 3D 기울기(도) */
const HEAD = 0.6;
const TILT_Y = 14;
const TILT_X = 10;
/** 커서가 이 거리(px)만큼 떨어지면 끝까지 본다 */
const REACH = 260;
const EASE = 0.12;
/** 깜빡임: 눈동자를 눈꺼풀 쪽으로 접었다 편다 */
const BLINK_MS = 160;
const blinkGap = () => 2600 + Math.random() * 3200;

/** 터치 기기에서는 커서가 없으니 가끔 다른 곳을 둘러본다 */
const WANDER_MS = 2200;

export default function HeroMedia() {
  const reduce = useReducedMotion();
  const svgRef = useRef<SVGSVGElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<SVGGElement>(null);
  const pupilRefs = useRef<(SVGImageElement | null)[]>([]);

  useEffect(() => {
    if (reduce) return;
    const svg = svgRef.current;
    if (!svg) return;

    const target = { x: 0, y: 0 };
    const cur = { x: 0, y: 0 };
    let raf = 0;
    let blinkAt = 0;

    // 목표 방향(-1~1)으로 매 프레임 조금씩 다가간다. 값이 연속이라 React 상태 대신 DOM 속성을 직접 바꾼다
    const tick = (now: number) => {
      cur.x += (target.x - cur.x) * EASE;
      cur.y += (target.y - cur.y) * EASE;
      const px = cur.x * MAX_X;
      const py = cur.y * (cur.y < 0 ? MAX_UP : MAX_DOWN);
      // 깜빡이는 동안 세로 배율 1 → 0.08 → 1
      const t = blinkAt ? (now - blinkAt) / BLINK_MS : 1;
      const sy = t >= 1 ? 1 : 1 - 0.92 * Math.sin(Math.PI * t);
      if (t >= 1) blinkAt = 0;

      if (wrapRef.current)
        wrapRef.current.style.transform = `perspective(900px) rotateY(${cur.x * TILT_Y}deg) rotateX(${-cur.y * TILT_X}deg)`;
      headRef.current?.setAttribute(
        "transform",
        `translate(${px * HEAD} ${py * HEAD})`,
      );
      EYES.forEach((e, i) => {
        const top = e.y;
        pupilRefs.current[i]?.setAttribute(
          "transform",
          `translate(${px} ${py}) translate(0 ${top}) scale(1 ${sy}) translate(0 ${-top})`,
        );
      });
      if (
        blinkAt ||
        Math.abs(target.x - cur.x) + Math.abs(target.y - cur.y) > 0.001
      )
        raf = requestAnimationFrame(tick);
      else raf = 0;
    };
    const wake = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    let blinkTimer = 0;
    const scheduleBlink = () => {
      blinkTimer = window.setTimeout(() => {
        blinkAt = performance.now();
        wake();
        scheduleBlink();
      }, blinkGap());
    };
    scheduleBlink();
    const aim = (x: number, y: number) => {
      target.x = x;
      target.y = y;
      wake();
    };

    const fine = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches;
    if (!fine) {
      const id = setInterval(
        () => aim(Math.random() * 2 - 1, Math.random() * 1.6 - 0.6),
        WANDER_MS,
      );
      return () => {
        clearInterval(id);
        clearTimeout(blinkTimer);
        cancelAnimationFrame(raf);
      };
    }

    const onMove = (e: PointerEvent) => {
      const r = svg.getBoundingClientRect();
      // 두 눈 사이(그림의 가로 48%, 세로 62% 지점)를 기준으로 방향을 잰다
      const dx = e.clientX - (r.left + r.width * 0.48);
      const dy = e.clientY - (r.top + r.height * 0.62);
      const dist = Math.hypot(dx, dy) || 1;
      const k = Math.min(1, dist / REACH) / dist;
      aim(dx * k, dy * k);
    };
    const onLeave = () => aim(0, 0);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      clearTimeout(blinkTimer);
      cancelAnimationFrame(raf);
    };
  }, [reduce]);

  return (
    <div
      ref={wrapRef}
      className="mx-auto w-full max-w-[26rem] will-change-transform lg:mr-0"
    >
      <svg
        ref={svgRef}
        viewBox="0 0 720 720"
        role="img"
        aria-label="유병규 캐릭터 일러스트"
        className="w-full dark:invert"
      >
        <defs>
          {EYES.map((e) => (
            <clipPath key={e.id} id={`eye-${e.id}`}>
              <polygon points={e.clip} />
            </clipPath>
          ))}
        </defs>
        <g ref={headRef}>
          <image href="/hero/face.webp" width="720" height="720" />
          {EYES.map((e, i) => (
            <g key={e.id} clipPath={`url(#eye-${e.id})`}>
              <image
                ref={(el) => {
                  pupilRefs.current[i] = el;
                }}
                href={e.src}
                x={e.x}
                y={e.y}
                width={e.w}
                height={e.h}
              />
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}
