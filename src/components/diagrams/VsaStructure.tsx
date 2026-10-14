"use client";

import { useState } from "react";
import DetailPanel from "./DetailPanel";
import {
  Eyebrow,
  Figure,
  Node,
  Txt,
  FILL_ACCENT,
  FILL_MUTED,
  STROKE_ACCENT,
  STROKE_BOX,
} from "./primitives";

type Dest = "route" | "components" | "common";

/** 폴더마다 옮겨 간 자리와 이유. 프로젝트 상세에 공개된 사실만 쓴다. */
const FOLDERS: { name: string; dest: Dest; survey?: number; detail: string }[] = [
  {
    name: "app/",
    dest: "route",
    detail: "라우트 폴더가 기능 단위의 기준이 됩니다. 화면 전용 코드는 이 아래로 모읍니다.",
  },
  {
    name: "components/",
    dest: "components",
    detail: "라우트에서만 쓰는 컴포넌트는 app/[route]/_components/로 옮겼습니다.",
  },
  {
    name: "containers/",
    dest: "components",
    detail: "데이터를 다루는 컨테이너 컴포넌트도 라우트의 _components/로 단계적으로 옮겼습니다.",
  },
  {
    name: "hooks/",
    dest: "common",
    survey: 0,
    detail: "훅의 65%가 여러 라우트를 가로질러 공통 레벨에 두고, 단일 라우트 전용만 선택적으로 옮겼습니다.",
  },
  {
    name: "types/",
    dest: "common",
    survey: 1,
    detail: "타입은 100%가 전역 선언이라 물리적으로 옮길 수 없어 공통 레벨에 남겼습니다.",
  },
  {
    name: "api/",
    dest: "common",
    survey: 2,
    detail: "API 대부분이 여러 라우트에서 직접 쓰여 공통 레벨에 남겼습니다.",
  },
];

/** 전수조사: 라우트로 옮길 수 있는 비율 */
const SURVEY = [
  { name: "hooks", movable: 35 },
  { name: "types", movable: 0 },
  { name: "api", movable: 20 },
];

/** VSA: 레이어별 분산 → 하이브리드(컴포넌트만 코로케이션) + 전수조사 근거 */
export default function VsaStructure() {
  const [active, setActive] = useState<number | null>(null);
  const cur = active === null ? null : FOLDERS[active];

  const folderState = (i: number) =>
    active === null ? "default" : i === active ? "active" : "dim";
  const destState = (d: Dest) =>
    cur === null ? "default" : cur.dest === d ? "active" : "dim";
  const surveyOn = (i: number) => cur === null || cur.survey === i;

  /** 전·후·전수조사를 원점(ox, oy)과 폭에 맞춰 그린다. 넓은 화면은 좌우, 좁은 화면은 위아래로 배치 */
  const before = (ox: number, oy: number, w: number) => (
    <g>
      <Eyebrow x={ox} y={oy - 12}>
        전: 레이어별로 분산
      </Eyebrow>
      <rect x={ox} y={oy} width={w} height={130} rx={10} className={`${FILL_MUTED} ${STROKE_BOX}`} strokeWidth={1} />
      {FOLDERS.map((f, i) => (
        <Node
          key={f.name}
          x={ox + 14 + (i % 3) * 108}
          y={oy + 14 + Math.floor(i / 3) * 56}
          w={96}
          h={44}
          label={f.name}
          state={folderState(i)}
          onSelect={() => setActive(i)}
          selectLabel={`${f.name} 폴더가 옮겨 간 자리 보기`}
        />
      ))}
      <Txt x={ox} y={oy + 150} muted size={10.5}>
        한 기능의 파일이 여섯 폴더에 흩어짐
      </Txt>
    </g>
  );

  const after = (ox: number, oy: number, w: number) => (
    <g>
      <Eyebrow x={ox} y={oy - 12} accent>
        후: 하이브리드
      </Eyebrow>
      <rect
        x={ox}
        y={oy}
        width={w}
        height={130}
        rx={10}
        className={`${FILL_ACCENT} ${STROKE_ACCENT}`}
        strokeWidth={destState("route") === "active" ? 2 : 1}
      />
      <Txt x={ox + 14} y={oy + 20} size={11} bold accent>
        app/[route]/
      </Txt>
      <Node x={ox + 24} y={oy + 28} w={144} h={38} label="_components/" sub="라우트 전용" state={destState("components")} />
      <Txt x={ox + 14} y={oy + 88} size={11} bold>
        공통 레벨 유지
      </Txt>
      <Node x={ox + 24} y={oy + 94} w={144} h={28} label="hooks · types · api" muted state={destState("common")} />
      <Txt x={ox} y={oy + 150} accent size={10.5}>
        컴포넌트만 라우트로 이동, 나머지는 공통 레벨
      </Txt>
    </g>
  );

  const survey = (ox: number, oy: number, barX: number, barW: number) => (
    <g>
      <Eyebrow x={ox} y={oy}>
        판단 근거: 의존성 전수조사
      </Eyebrow>
      {SURVEY.map((s, i) => {
        const y = oy + 22 + i * 40;
        const mw = (barW * s.movable) / 100;
        const folderIndex = FOLDERS.findIndex((f) => f.survey === i);
        return (
          <g
            key={s.name}
            opacity={surveyOn(i) ? 1 : 0.35}
            style={{ transition: "opacity 300ms", cursor: "pointer" }}
            onMouseEnter={() => setActive(folderIndex)}
            onClick={() => setActive(folderIndex)}
          >
            <Txt x={barX - 14} y={y + 15} anchor="end" size={11} bold>
              {s.name}
            </Txt>
            <rect x={barX} y={y} width={barW} height={22} rx={4} className={`${FILL_MUTED} ${STROKE_BOX}`} strokeWidth={1} />
            {mw > 0 && (
              <rect x={barX} y={y} width={mw} height={22} rx={4} className={`${FILL_ACCENT} ${STROKE_ACCENT}`} strokeWidth={1} />
            )}
            {s.movable > 0 && (
              <Txt x={barX + 8} y={y + 15} accent size={10.5} bold>
                {`${s.movable}%`}
              </Txt>
            )}
            <Txt x={barX + barW + 10} y={y + 15} muted size={10.5}>
              {`공유 ${100 - s.movable}%`}
            </Txt>
          </g>
        );
      })}
    </g>
  );

  const title = "VSA 하이브리드: 레이어별 분산 구조와 채택한 구조, 그리고 판단 근거가 된 의존성 전수조사";

  return (
    <div className="my-8">
      {/* 넓은 화면: 전·후 좌우 + 아래 전수조사 */}
      <Figure title={title} viewBox="0 0 796 420" interactive className="!my-0 hidden sm:block">
        {before(30, 38, 342)}
        {after(424, 38, 342)}
        {survey(30, 236, 120, 520)}
        <Txt x={120} y={404} accent size={10.5}>
          옮길 수 있는 비율(파랑)이 낮아 완전한 Colocation은 채택하지 않음
        </Txt>
      </Figure>

      {/* 좁은 화면: 전 → 후 → 전수조사 세로 */}
      <Figure title={title} viewBox="0 0 350 600" interactive fluid className="!my-0 sm:hidden">
        {before(7, 26, 336)}
        {after(7, 222, 336)}
        {survey(7, 416, 60, 210)}
        <Txt x={7} y={572} accent size={10.5}>
          옮길 수 있는 비율(파랑)이 낮아
        </Txt>
        <Txt x={7} y={588} accent size={10.5}>
          완전한 Colocation은 채택하지 않음
        </Txt>
      </Figure>

      <DetailPanel
        items={FOLDERS.map((f) => ({ label: f.name, detail: f.detail }))}
        active={active}
        onChange={setActive}
        hint="폴더나 전수조사 막대에 마우스를 올리거나 누르면, 그 폴더가 어디로 갔고 왜인지 볼 수 있습니다."
        countLabel={`폴더 ${FOLDERS.length}개`}
      />
    </div>
  );
}
