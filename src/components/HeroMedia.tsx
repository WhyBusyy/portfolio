"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";

/**
 * 히어로 오른쪽 AI 영상.
 * 파일을 public/hero/ 에 넣고 경로를 채우면 자리 표시 박스 대신 실제 영상이 나온다.
 * - 첫 화면에는 정지 이미지(poster)만 그려 LCP 를 영상이 잡아먹지 않게 한다.
 * - 영상은 페이지 로드가 끝난 뒤에 불러오고, 재생이 시작되면 이미지 위로 서서히 겹친다.
 * - 동작 줄이기 설정이면 영상을 불러오지 않고 정지 이미지만 보여 준다.
 */
const POSTER: string | null = null; // 예: "/hero/avatar-poster.webp"
const VIDEO: { webm?: string; mp4?: string } | null = null; // 예: { webm: "/hero/avatar.webm", mp4: "/hero/avatar.mp4" }

const ALT = "유병규 AI 아바타";

export default function HeroMedia() {
  const reduce = useReducedMotion();
  const [load, setLoad] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!VIDEO || reduce) return;
    const start = () => setLoad(true);
    if (document.readyState === "complete") {
      const id = setTimeout(start, 0);
      return () => clearTimeout(id);
    }
    window.addEventListener("load", start, { once: true });
    return () => window.removeEventListener("load", start);
  }, [reduce]);

  return (
    <div className="relative mx-auto aspect-[4/5] w-full max-w-[26rem] overflow-hidden rounded-xl bg-slate-100 dark:bg-white/[0.05] lg:mr-0">
      {POSTER ? (
        <Image src={POSTER} alt={ALT} fill priority sizes="(min-width: 1024px) 26rem, 100vw" className="object-cover" />
      ) : (
        // ponytail: 파일이 오기 전 자리 표시. 영상·이미지 경로를 채우면 이 분기는 지운다
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 border border-dashed border-slate-300 text-center dark:border-white/20 rounded-xl">
          <p className="text-sm font-medium text-slate-600 dark:text-slate-300">AI 영상 자리</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">4:5 · public/hero/</p>
        </div>
      )}

      {VIDEO && load && (
        <video
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
            playing ? "opacity-100" : "opacity-0"
          }`}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={POSTER ?? undefined}
          aria-hidden="true"
          onPlaying={() => setPlaying(true)}
        >
          {VIDEO.webm && <source src={VIDEO.webm} type="video/webm" />}
          {VIDEO.mp4 && <source src={VIDEO.mp4} type="video/mp4" />}
        </video>
      )}
    </div>
  );
}
