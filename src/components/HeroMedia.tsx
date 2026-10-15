"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * 히어로 가운데 캐릭터: 커서 쪽으로 기울고 눈동자가 따라간다.
 * 3D 캐릭터 이미지에서 눈동자를 지우고 피부로 메운 얼굴(character.webp) 위에
 * 눈동자 조각(pupil-*.webp)을 눈자위 안에서 움직이고, 그 위를 눈꺼풀 선(lid-*.webp)이 덮는다.
 * 좌표는 모두 그림(720×720) 기준이다.
 */
const EYES = [
  {
    id: "l",
    cx: 287.7,
    cy: 318.3,
    pupil: [267.6, 297.6, 40, 41],
    lid: [255, 289.2, 66, 29],
  },
  {
    id: "r",
    cx: 419.1,
    cy: 314.4,
    pupil: [399, 294, 40, 41],
    lid: [387, 284.4, 66, 27],
  },
] as const;

/** 눈동자가 움직이는 최대 폭 (그림 좌표) */
const MAX_X = 6;
const MAX_Y = 4;
/** 캐릭터 전체가 커서 쪽으로 돌아보는 3D 기울기 (도) */
const TILT_Y = 16;
const TILT_X = 10;
/** 커서가 이 거리(px)만큼 떨어지면 끝까지 본다 */
const REACH = 280;
const EASE = 0.12;
/** 깜빡임: 눈동자를 위로 접었다 편다 */
const BLINK_MS = 170;
const blinkGap = () => 2600 + Math.random() * 3200;
/** 터치 기기에서는 커서가 없으니 가끔 다른 곳을 둘러본다 */
const WANDER_MS = 2200;

/**
 * children 은 캐릭터와 함께 기울어지는 영역(사원증 카드의 이름 등)에 들어간다.
 * onTilt 는 매 프레임 현재 기울기 방향(-1~1)을 알려 준다. 카드에 걸린 목걸이 줄을 함께 움직일 때 쓴다.
 */
export default function HeroMedia({
  className = "",
  children,
  onTilt,
}: {
  className?: string;
  children?: ReactNode;
  onTilt?: (x: number, y: number) => void;
}) {
  const reduce = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  // 효과를 다시 걸지 않도록 최신 콜백은 ref 로 들고 있는다
  const onTiltRef = useRef(onTilt);
  useEffect(() => {
    onTiltRef.current = onTilt;
  }, [onTilt]);
  const pupilRefs = useRef<(SVGImageElement | null)[]>([]);

  useEffect(() => {
    if (reduce) return;
    const wrap = wrapRef.current;
    if (!wrap) return;

    const target = { x: 0, y: 0 };
    const cur = { x: 0, y: 0 };
    let raf = 0;
    let blinkAt = 0;

    // 목표 방향(-1~1)으로 매 프레임 조금씩 다가간다. 값이 연속이라 React 상태 대신 DOM 을 직접 바꾼다
    const tick = (now: number) => {
      cur.x += (target.x - cur.x) * EASE;
      cur.y += (target.y - cur.y) * EASE;
      const t = blinkAt ? (now - blinkAt) / BLINK_MS : 1;
      const sy = t >= 1 ? 1 : 1 - 0.9 * Math.sin(Math.PI * t);
      if (t >= 1) blinkAt = 0;

      wrap.style.transform = `perspective(1000px) rotateY(${cur.x * TILT_Y}deg) rotateX(${-cur.y * TILT_X}deg)`;
      onTiltRef.current?.(cur.x, cur.y);
      EYES.forEach((e, i) => {
        const top = e.pupil[1];
        pupilRefs.current[i]?.setAttribute(
          "transform",
          `translate(${cur.x * MAX_X} ${cur.y * MAX_Y}) translate(0 ${top}) scale(1 ${sy}) translate(0 ${-top})`,
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
    const aim = (x: number, y: number) => {
      target.x = x;
      target.y = y;
      wake();
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

    const cleanup = () => {
      clearTimeout(blinkTimer);
      cancelAnimationFrame(raf);
    };

    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      const id = setInterval(
        () => aim(Math.random() * 2 - 1, Math.random() * 1.6 - 0.6),
        WANDER_MS,
      );
      return () => {
        clearInterval(id);
        cleanup();
      };
    }

    const onMove = (e: PointerEvent) => {
      const r = wrap.getBoundingClientRect();
      // 두 눈 사이(그림의 가로 49%, 세로 44% 지점)를 기준으로 방향을 잰다
      const dx = e.clientX - (r.left + r.width * 0.49);
      const dy = e.clientY - (r.top + r.height * 0.44);
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
      cleanup();
    };
  }, [reduce]);

  return (
    <div ref={wrapRef} className={`will-change-transform ${className}`}>
      <svg
        viewBox="0 0 720 720"
        role="img"
        aria-label="유병규 3D 캐릭터"
        className="block aspect-square w-full"
      >
        <defs>
          {/* 눈자위: 눈동자가 이 타원 밖으로는 나가지 않는다 */}
          {EYES.map((e) => (
            <clipPath key={e.id} id={`socket-${e.id}`}>
              <ellipse cx={e.cx} cy={e.cy} rx={26} ry={25} />
            </clipPath>
          ))}
        </defs>
        <image href="/hero/character.webp" width="720" height="720" />
        {EYES.map((e, i) => (
          <g key={e.id}>
            <g clipPath={`url(#socket-${e.id})`}>
              <image
                ref={(el) => {
                  pupilRefs.current[i] = el;
                }}
                href={`/hero/pupil-${e.id}.webp`}
                x={e.pupil[0]}
                y={e.pupil[1]}
                width={e.pupil[2]}
                height={e.pupil[3]}
              />
            </g>
            <image
              href={`/hero/lid-${e.id}.webp`}
              x={e.lid[0]}
              y={e.lid[1]}
              width={e.lid[2]}
              height={e.lid[3]}
            />
          </g>
        ))}
      </svg>
      {children}
    </div>
  );
}
