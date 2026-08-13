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

/** VSA: 레이어별 분산 → 하이브리드(컴포넌트만 코로케이션) + 전수조사 근거 */
export default function VsaStructure() {
  const L = 30;
  const R = 424;
  const boxW = 342;

  // 전수조사: 코로케이션 가능 비율
  const survey = [
    { name: "hooks", movable: 35 },
    { name: "types", movable: 0 },
    { name: "api", movable: 20 },
  ];
  const barX = 120;
  const barW = 520;

  return (
    <Figure
      title="VSA 하이브리드: 레이어별 분산 구조와 채택한 구조, 그리고 판단 근거가 된 의존성 전수조사"
      caption="완전한 코로케이션이 정답처럼 보였지만, 실제 의존성을 전수조사하니 대부분이 여러 라우트를 가로질렀다. 그래서 컴포넌트만 옮기고 나머지는 공통 레벨에 두는 하이브리드를 택했다."
      viewBox="0 0 796 430"
    >
      {/* 전 */}
      <Eyebrow x={L} y={26}>
        전 — 레이어별로 분산
      </Eyebrow>
      <rect
        x={L}
        y={38}
        width={boxW}
        height={130}
        rx={10}
        className={`${FILL_MUTED} ${STROKE_BOX}`}
        strokeWidth={1}
      />
      {["app/", "components/", "containers/", "hooks/", "types/", "api/"].map((d, i) => (
        <g key={d}>
          <rect
            x={L + 14 + (i % 3) * 108}
            y={52 + Math.floor(i / 3) * 56}
            width={96}
            height={44}
            rx={6}
            className={`fill-white dark:fill-white/[0.05] ${STROKE_BOX}`}
            strokeWidth={1}
          />
          <Txt
            x={L + 14 + (i % 3) * 108 + 48}
            y={72 + Math.floor(i / 3) * 56}
            anchor="middle"
            size={11}
          >
            {d}
          </Txt>
          <circle
            cx={L + 14 + (i % 3) * 108 + 48}
            cy={84 + Math.floor(i / 3) * 56}
            r={3}
            className="fill-slate-400 dark:fill-slate-500"
          />
        </g>
      ))}
      <Txt x={L} y={188} muted size={10.5}>
        한 기능의 파일이 여섯 폴더에 흩어짐 (● 표시)
      </Txt>

      {/* 후 */}
      <Eyebrow x={R} y={26} accent>
        후 — 하이브리드
      </Eyebrow>
      <rect
        x={R}
        y={38}
        width={boxW}
        height={130}
        rx={10}
        className={`${FILL_ACCENT} ${STROKE_ACCENT}`}
        strokeWidth={1}
      />
      <Txt x={R + 14} y={58} size={11} bold accent>
        app/[route]/
      </Txt>
      <Node x={R + 24} y={66} w={144} h={38} label="_components/" sub="라우트 전용" />
      <Txt x={R + 14} y={126} size={11} bold>
        공통 레벨 유지
      </Txt>
      <Node x={R + 24} y={132} w={144} h={28} label="hooks · types · api" muted />
      <Txt x={R} y={188} accent size={10.5}>
        컴포넌트만 라우트로 이동 · 나머지는 공통 레벨
      </Txt>

      {/* 전수조사 */}
      <Eyebrow x={L} y={236}>
        판단 근거 — 의존성 전수조사
      </Eyebrow>
      {survey.map((s, i) => {
        const y = 258 + i * 40;
        const mw = (barW * s.movable) / 100;
        return (
          <g key={s.name}>
            <Txt x={barX - 14} y={y + 15} anchor="end" size={11} bold>
              {s.name}
            </Txt>
            <rect
              x={barX}
              y={y}
              width={barW}
              height={22}
              rx={4}
              className={`${FILL_MUTED} ${STROKE_BOX}`}
              strokeWidth={1}
            />
            {mw > 0 && (
              <rect
                x={barX}
                y={y}
                width={mw}
                height={22}
                rx={4}
                className={`${FILL_ACCENT} ${STROKE_ACCENT}`}
                strokeWidth={1}
              />
            )}
            <Txt x={barX + barW + 10} y={y + 15} muted size={10.5}>
              {`여러 라우트 공유 ${100 - s.movable}%`}
            </Txt>
            {s.movable > 0 && (
              <Txt x={barX + 8} y={y + 15} accent size={10.5} bold>
                {`${s.movable}%`}
              </Txt>
            )}
          </g>
        );
      })}
      <Txt x={barX} y={412} accent size={10.5}>
        옮길 수 있는 비율(파랑)이 낮아 완전한 코로케이션을 기각
      </Txt>
    </Figure>
  );
}
