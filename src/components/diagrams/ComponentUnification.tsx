import { Arrow, Eyebrow, Figure, Node, Txt } from "./primitives";

/** 디자인 시스템: 화면마다 따로 마크업 → 공용 컴포넌트 호출로 대체 */
const screens = ["화면 A", "화면 B", "화면 C"];
const sw = 120;
const sh = 44;

/** 전: 원점(L, oy) 기준 */
function before(L: number, oy: number) {
  const sy = (i: number) => oy + 62 + i * 62;
  return (
    <g>
      <Eyebrow x={L} y={oy + 30}>
        전: 화면마다 따로 마크업
      </Eyebrow>
      {screens.map((s, i) => (
        <g key={s}>
          <Node x={L} y={sy(i)} w={sw} h={sh} label={s} />
          <Arrow x1={L + sw} y1={sy(i) + sh / 2} x2={L + sw + 34} y2={sy(i) + sh / 2} />
          <Node x={L + sw + 34} y={sy(i)} w={148} h={sh} label="버튼 마크업" sub={`화면 ${"ABC"[i]} 전용`} muted />
        </g>
      ))}
      <Txt x={L} y={oy + 254} muted size={10.5}>
        같은 요소가 세 벌이라 한 곳을 고쳐도 나머지는 그대로
      </Txt>
    </g>
  );
}

/** 후: 원점(R, oy) 기준 */
function after(R: number, oy: number) {
  const sy = (i: number) => oy + 62 + i * 62;
  return (
    <g>
      <Eyebrow x={R} y={oy + 30} accent>
        후: 단일 컴포넌트 호출
      </Eyebrow>
      {screens.map((s, i) => (
        <g key={s}>
          <Node x={R} y={sy(i)} w={sw} h={sh} label={s} />
          <Arrow x1={R + sw} y1={sy(i) + sh / 2} x2={R + sw + 44} y2={sy(1) + sh / 2} accent />
        </g>
      ))}
      <Node x={R + sw + 44} y={sy(1)} w={148} h={sh} label="공용 Button" sub="변형은 props 로" accent />
      <Txt x={R} y={oy + 254} accent size={10.5}>
        한 곳을 고치면 모든 화면에 반영
      </Txt>
    </g>
  );
}

const title = "공용 컴포넌트 대체 전후: 화면별 개별 마크업에서 단일 컴포넌트 호출로";
const caption =
  "공용 컴포넌트가 있었지만 일부 화면만 사용하고 나머지는 같은 요소를 따로 마크업해 두어, 한 곳을 고쳐도 나머지가 남았다.";

export default function ComponentUnification() {
  return (
    <>
      {/* 넓은 화면: 전·후 좌우 */}
      <Figure title={title} caption={caption} viewBox="0 0 796 268" className="hidden sm:block">
        {before(30, 0)}
        {after(440, 0)}
      </Figure>
      {/* 좁은 화면: 전 위, 후 아래 */}
      <Figure title={title} caption={caption} viewBox="0 0 340 540" fluid className="sm:hidden">
        {before(14, 0)}
        {after(14, 270)}
      </Figure>
    </>
  );
}
