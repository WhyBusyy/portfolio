import { Arrow, Eyebrow, Figure, Node, Txt } from "./primitives";

/** 디자인 시스템: 화면마다 따로 마크업 → 공용 컴포넌트 호출로 대체 */
export default function ComponentUnification() {
  const screens = ["화면 A", "화면 B", "화면 C"];
  const L = 30;
  const R = 440;
  const sw = 120;
  const sh = 44;
  const sy = (i: number) => 62 + i * 62;

  return (
    <Figure
      title="공용 컴포넌트 대체 전후: 화면별 개별 마크업에서 단일 컴포넌트 호출로"
      caption="공용 컴포넌트가 있었지만 일부 화면만 사용하고 나머지는 같은 요소를 따로 마크업해 두어, 한 곳을 고쳐도 나머지가 남았다."
      viewBox="0 0 796 268"
    >
      {/* before */}
      <Eyebrow x={L} y={30}>
        전 — 화면마다 따로 마크업
      </Eyebrow>
      {screens.map((s, i) => (
        <g key={s}>
          <Node x={L} y={sy(i)} w={sw} h={sh} label={s} />
          <Arrow x1={L + sw} y1={sy(i) + sh / 2} x2={L + sw + 34} y2={sy(i) + sh / 2} />
          <Node
            x={L + sw + 34}
            y={sy(i)}
            w={148}
            h={sh}
            label="버튼 마크업"
            sub={`화면 ${"ABC"[i]} 전용`}
            muted
          />
        </g>
      ))}
      <Txt x={L} y={254} muted size={10.5}>
        같은 요소가 세 벌 · 한 곳을 고쳐도 나머지는 그대로
      </Txt>

      {/* after */}
      <Eyebrow x={R} y={30} accent>
        후 — 단일 컴포넌트 호출
      </Eyebrow>
      {screens.map((s, i) => (
        <g key={s}>
          <Node x={R} y={sy(i)} w={sw} h={sh} label={s} />
          <Arrow
            x1={R + sw}
            y1={sy(i) + sh / 2}
            x2={R + sw + 44}
            y2={62 + 62 + sh / 2}
            accent
          />
        </g>
      ))}
      <Node
        x={R + sw + 44}
        y={62 + 62}
        w={148}
        h={sh}
        label="공용 Button"
        sub="변형은 props 로"
        accent
      />
      <Txt x={R} y={254} accent size={10.5}>
        한 곳을 고치면 모든 화면에 반영
      </Txt>
    </Figure>
  );
}
