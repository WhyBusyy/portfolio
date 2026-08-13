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
export default function TokenLayers() {
  const colW = 300;
  const L = 40;
  const R = 456;

  const layer = (x: number, y: number, label: string, sub: string, accent = false) => (
    <Node x={x} y={y} w={colW} h={50} label={label} sub={sub} accent={accent} />
  );

  return (
    <Figure
      title="디자인 시스템 토큰 계층: 팔레트 직접 참조에서 의미 토큰 경유로"
      caption="팔레트는 원시 색 값, 의미 토큰은 역할 이름이다. 화면이 팔레트를 직접 참조하면 색을 바꿀 때 고칠 지점을 특정할 수 없다."
      viewBox="0 0 796 320"
    >
      {/* before */}
      <Eyebrow x={L} y={24}>
        전
      </Eyebrow>
      <rect
        x={L - 12}
        y={34}
        width={colW + 24}
        height={252}
        rx={12}
        className={`${FILL_MUTED} ${STROKE_BOX}`}
        strokeWidth={1}
      />
      {layer(L, 48, "화면", "버튼 · 카드 · 폼")}
      {layer(L, 214, "팔레트", "원시 색 값 목록")}
      {/* 의미 토큰 칸은 좁게 — 우회 경로가 지나갈 자리를 남긴다 */}
      <Node
        x={L}
        y={131}
        w={colW - 64}
        h={50}
        label="의미 토큰"
        sub="정의되지 않음"
        dashed
        muted
      />
      {/* 화면 → 팔레트 직접 참조 (의미 토큰 우회) */}
      <path
        d={`M ${L + colW - 40} 98 C ${L + colW - 18} 120, ${L + colW - 18} 158, ${
          L + colW - 40
        } 194`}
        className="fill-none stroke-slate-400 dark:stroke-slate-500"
        strokeWidth={1.4}
        strokeDasharray="4 3"
      />
      <Arrow x1={L + colW - 40} y1={192} x2={L + colW - 40} y2={212} dashed />
      <Txt x={L + 8} y={306} muted size={10.5}>
        화면이 색 값을 직접 지정 · 변경 지점 특정 불가
      </Txt>

      {/* after */}
      <Eyebrow x={R} y={24} accent>
        후
      </Eyebrow>
      {layer(R, 48, "화면", "공용 컴포넌트 사용")}
      {layer(R, 131, "의미 토큰", "텍스트 · 배경 · 테두리 · 아이콘", true)}
      {layer(R, 214, "팔레트", "원시 색 값 목록")}
      <Arrow x1={R + colW / 2} y1={98} x2={R + colW / 2} y2={129} accent />
      <Arrow x1={R + colW / 2} y1={181} x2={R + colW / 2} y2={212} accent />
      <Txt x={R + 8} y={306} accent size={10.5}>
        역할 이름으로 참조 · 토큰 한 곳만 바꾸면 전체 반영
      </Txt>
    </Figure>
  );
}
