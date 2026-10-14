"use client";

import { useState } from "react";
import DetailPanel from "./DetailPanel";
import { Arrow, Bracket, Eyebrow, Figure, Node, Txt } from "./primitives";

/** 단계 설명은 프로젝트 상세(projects.ts)에 공개된 사실만 옮긴다. */
const STEPS = [
  {
    label: "티켓 추출",
    sub: "브랜치 → 이슈 → PR",
    detail: "브랜치에서 티켓을 찾아 PR과 연결합니다. 어떤 요구사항 때문에 바뀐 코드인지부터 파악합니다.",
  },
  {
    label: "diff 분석",
    sub: "base ↔ head 비교",
    detail: "base와 head를 비교해 이번 PR에서 바뀐 코드만 골라냅니다.",
  },
  {
    label: "파일 분류",
    sub: "화면 · 컴포넌트 · API",
    detail:
      "바뀐 파일을 화면·컴포넌트·API로 나눕니다. 변경 코드와 사이드이펙트 예상 범위만 테스트 대상으로 잡아, 무관한 테스트가 생기지 않게 합니다.",
  },
  {
    label: "셀렉터 수집",
    sub: "실패 시 정적 패턴 사용",
    detail:
      "실제 화면에서 셀렉터를 모읍니다. 이 단계는 저비용 모델이 맡고, 수집에 실패해도 정적 셀렉터 패턴으로 넘어가 파이프라인이 멈추지 않습니다.",
  },
  {
    label: "AI 테스트 생성",
    sub: "변경 범위로 한정",
    detail: "고성능 모델이 앞에서 정한 변경 범위 안에서만 Playwright 테스트를 생성합니다.",
  },
  {
    label: "Syntax Check",
    sub: "실패 시 1회 재시도",
    detail:
      "생성된 코드의 TypeScript 문법을 검증합니다. 실패하면 에러 내용을 넣어 한 번 더 생성합니다.",
    gate: true,
  },
  {
    label: "Read-only 실행",
    sub: "데이터 변조 불가",
    detail: "쓰기 요청을 막은 상태로 실행해, AI가 만든 테스트가 데이터를 바꾸지 못하게 합니다.",
    gate: true,
  },
  {
    label: "리포트",
    sub: "PR 코멘트 · 리포트",
    detail:
      "결과를 PR 코멘트와 HTML 리포트로 남깁니다. AI 생성 스펙은 참고용이라 실패해도 PR 체크에는 반영되지 않습니다.",
  },
];

/** QA 봇: 변경 감지 → AI 생성 → 검증 게이트 → 리포트 */
export default function QaPipeline() {
  const [active, setActive] = useState<number | null>(null);
  const select = (i: number) => setActive(i);

  const stateOf = (i: number) =>
    active === null ? "default" : i === active ? "active" : i > active ? "dim" : "default";
  /** i 번째 단계로 들어오는 화살표는 그 단계에 도달했을 때만 진하게 */
  const arrowDim = (i: number) => active !== null && i > active;

  const W = 170;
  const H = 58;
  const GAP = 24;
  const x = (i: number) => 20 + i * (W + GAP);
  const R1 = 46;
  const R2 = 168;
  const pos = (i: number) => (i < 4 ? { x: x(i), y: R1 } : { x: x(i - 4), y: R2 });


  const footer = (
    <DetailPanel
      items={STEPS.map((st) => ({ label: st.label, detail: st.detail, badge: st.gate ? "Validation Gate" : undefined }))}
      active={active}
      onChange={setActive}
      hint="단계에 마우스를 올리거나 누르면, 각 단계에서 무엇을 하는지 볼 수 있습니다."
      countLabel={`${STEPS.length}단계`}
    />
  );

  const nodes = (place: (i: number) => { x: number; y: number }, w: number, h: number) =>
    STEPS.map((s, i) => (
      <Node
        key={s.label}
        {...place(i)}
        w={w}
        h={h}
        label={s.label}
        sub={s.sub}
        accent={s.gate}
        state={stateOf(i)}
        onSelect={() => select(i)}
        selectLabel={`${i + 1}단계 ${s.label}: ${s.sub}`}
      />
    ));

  /*
    좁은 화면: 2열로 접는다. 왼쪽 열 = 변경 감지(1~4), 오른쪽 열 = 생성과 검증(5~8).
    원래 두 묶음과 열이 일치해 읽는 순서가 유지되고, 높이가 낮아 설명 칸까지 한 화면에 들어온다.
  */
  const NW = 150;
  const NH = 48;
  const NCOL = [12, 178];
  const NROW = [44, 112, 180, 248];
  const npos = (i: number) => ({ x: NCOL[i < 4 ? 0 : 1], y: NROW[i % 4] });

  return (
    <div className="my-8">
      <Figure
        title="QA 봇 파이프라인: 변경 감지에서 리포트까지, 그리고 생성물 Validation Gate"
        viewBox="0 0 796 300"
        interactive
        className="!my-0 hidden sm:block"
      >
        <Eyebrow x={20} y={26}>
          변경 감지
        </Eyebrow>
        <Eyebrow x={20} y={148}>
          생성과 검증
        </Eyebrow>

        {/* 1행 화살표 */}
        {[1, 2, 3].map((i) => (
          <Arrow
            key={`a${i}`}
            x1={x(i - 1) + W}
            y1={R1 + H / 2}
            x2={x(i)}
            y2={R1 + H / 2}
            dim={arrowDim(i)}
          />
        ))}

        {/* 줄바꿈 연결 (4 → 5) */}
        <g opacity={arrowDim(4) ? 0.35 : 1} style={{ transition: "opacity 300ms" }}>
          <path
            d={`M ${x(3) + W / 2} ${R1 + H} V ${R1 + H + 26} H ${x(0) + W / 2} V ${R2 - 8}`}
            className="fill-none stroke-slate-300 dark:stroke-white/25"
            strokeWidth={1.4}
          />
        </g>
        <Arrow x1={x(0) + W / 2} y1={R2 - 14} x2={x(0) + W / 2} y2={R2} dim={arrowDim(4)} />

        {/* 2행 화살표 */}
        {[5, 6, 7].map((i) => (
          <Arrow
            key={`b${i}`}
            x1={x(i - 5) + W}
            y1={R2 + H / 2}
            x2={x(i - 4)}
            y2={R2 + H / 2}
            accent={i === 6}
            dim={arrowDim(i)}
          />
        ))}

        <Bracket x={x(1) - 12} y={R2 - 14} w={W * 2 + GAP + 24} h={H + 28} label="Validation Gate" />

        {nodes(pos, W, H)}

        <Txt x={20} y={274} muted size={10.5}>
          고정 테스트(Smoke · Unit · E2E)는 PR Check에 반영 · AI 생성 스펙은 참고용으로 분리
        </Txt>
      </Figure>

      <Figure
        title="QA 봇 파이프라인: 변경 감지에서 리포트까지, 그리고 생성물 Validation Gate"
        viewBox="0 0 340 350"
        interactive
        fluid
        className="!my-0 sm:hidden"
      >
        <Eyebrow x={NCOL[0]} y={16}>
          변경 감지
        </Eyebrow>
        <Eyebrow x={NCOL[1]} y={16}>
          생성과 검증
        </Eyebrow>

        {/* 열 안의 화살표 (1→2→3→4, 5→6→7→8) */}
        {[1, 2, 3, 5, 6, 7].map((i) => {
          const from = npos(i - 1);
          const to = npos(i);
          return (
            <Arrow
              key={`n${i}`}
              x1={from.x + NW / 2}
              y1={from.y + NH}
              x2={to.x + NW / 2}
              y2={to.y}
              accent={i === 6}
              dim={arrowDim(i)}
            />
          );
        })}

        {/* 열 넘김 연결 (4 → 5): 4의 오른쪽에서 열 사이로 올라가 5의 위로 들어간다 */}
        <g opacity={arrowDim(4) ? 0.35 : 1} style={{ transition: "opacity 300ms" }}>
          <path
            d={`M ${NCOL[0] + NW} ${NROW[3] + NH / 2} H 170 V 30 H ${NCOL[1] + NW / 2} V ${NROW[0] - 8}`}
            className="fill-none stroke-slate-300 dark:stroke-white/25"
            strokeWidth={1.4}
          />
        </g>
        <Arrow
          x1={NCOL[1] + NW / 2}
          y1={NROW[0] - 10}
          x2={NCOL[1] + NW / 2}
          y2={NROW[0]}
          dim={arrowDim(4)}
        />

        <Bracket
          x={NCOL[1] - 6}
          y={NROW[1] - 8}
          w={NW + 12}
          h={NROW[2] + NH - NROW[1] + 16}
          label="Validation Gate"
        />

        {nodes(npos, NW, NH)}

        <Txt x={NCOL[0]} y={322} muted size={10.5}>
          고정 테스트(Smoke · Unit · E2E)는 PR Check에 반영
        </Txt>
        <Txt x={NCOL[0]} y={338} muted size={10.5}>
          AI 생성 스펙은 참고용으로 분리
        </Txt>
      </Figure>

      {footer}
    </div>
  );
}
