import {
  Arrow,
  Eyebrow,
  Figure,
  Node,
  Txt,
  FILL_MUTED,
  STROKE_BOX,
} from "./primitives";

/** 디자인 시스템: 팔레트를 직접 참조하던 구조 → 의미 토큰을 거치는 구조 */
const colW = 300;

const layer = (x: number, y: number, label: string, sub: string, accent = false) => (
  <Node x={x} y={y} w={colW} h={50} label={label} sub={sub} accent={accent} />
);

/** 전: 원점(L, oy) 기준 */
function before(L: number, oy: number) {
  return (
    <g>
      <Eyebrow x={L} y={oy + 24}>
        전
      </Eyebrow>
      <rect
        x={L - 12}
        y={oy + 34}
        width={colW + 24}
        height={252}
        rx={12}
        className={`${FILL_MUTED} ${STROKE_BOX}`}
        strokeWidth={1}
      />
      {layer(L, oy + 48, "화면", "버튼 · 카드 · 폼")}
      {layer(L, oy + 214, "팔레트", "Primitive 색상 값")}
      {/* 의미 토큰 칸은 좁게: 우회 경로가 지나갈 자리를 남긴다 */}
      <Node x={L} y={oy + 131} w={colW - 64} h={50} label="Semantic Token" sub="정의되지 않음" dashed muted />
      {/* 화면 → 팔레트 직접 참조 (의미 토큰 우회) */}
      <path
        d={`M ${L + colW - 40} ${oy + 98} C ${L + colW - 18} ${oy + 120}, ${L + colW - 18} ${oy + 158}, ${
          L + colW - 40
        } ${oy + 194}`}
        className="fill-none stroke-slate-400 dark:stroke-slate-500"
        strokeWidth={1.4}
        strokeDasharray="4 3"
      />
      <Arrow x1={L + colW - 40} y1={oy + 192} x2={L + colW - 40} y2={oy + 212} dashed />
      <Txt x={L + 8} y={oy + 306} muted size={10.5}>
        화면이 색 값을 직접 지정해 변경 지점을 특정할 수 없음
      </Txt>
    </g>
  );
}

/** 후: 원점(R, oy) 기준 */
function after(R: number, oy: number) {
  return (
    <g>
      <Eyebrow x={R} y={oy + 24} accent>
        후
      </Eyebrow>
      {layer(R, oy + 48, "화면", "공용 컴포넌트 사용")}
      {layer(R, oy + 131, "Semantic Token", "텍스트 · 배경 · 테두리 · 아이콘", true)}
      {layer(R, oy + 214, "팔레트", "Primitive 색상 값")}
      <Arrow x1={R + colW / 2} y1={oy + 98} x2={R + colW / 2} y2={oy + 129} accent />
      <Arrow x1={R + colW / 2} y1={oy + 181} x2={R + colW / 2} y2={oy + 212} accent />
      <Txt x={R + 8} y={oy + 306} accent size={10.5}>
        역할 이름으로 참조해 토큰 한 곳만 바꾸면 전체 반영
      </Txt>
    </g>
  );
}

const title = "디자인 시스템 토큰 계층: 팔레트 직접 참조에서 Semantic Token 경유로";
const caption =
  "팔레트는 Primitive 색상 값, Semantic Token은 역할 이름이다. 화면이 팔레트를 직접 참조하면 색을 바꿀 때 고칠 지점을 특정할 수 없다.";

export default function TokenLayers() {
  return (
    <>
      {/* 넓은 화면: 전·후 좌우 */}
      <Figure title={title} caption={caption} viewBox="0 0 796 320" className="hidden sm:block">
        {before(40, 0)}
        {after(456, 0)}
      </Figure>
      {/* 좁은 화면: 전 위, 후 아래 */}
      <Figure title={title} caption={caption} viewBox="0 0 348 640" fluid className="sm:hidden">
        {before(24, 0)}
        {after(24, 320)}
      </Figure>
    </>
  );
}
