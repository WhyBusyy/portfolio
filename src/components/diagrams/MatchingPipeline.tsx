import { Arrow, Eyebrow, Figure, Node, Txt } from "./primitives";

/** 자동매칭: 비정형 지역 데이터를 정규화해 기준 데이터를 만들고, 주소 기반으로 담당자를 배정 */
export default function MatchingPipeline() {
  const W = 170;
  const H = 56;
  const GAP = 30;
  const x = (i: number) => 16 + i * (W + GAP);
  const y1 = 54;
  const yMid = 146;
  const y2 = 228;
  const midW = 220;
  const midX = (796 - midW) / 2;

  return (
    <Figure
      title="담당자 자동매칭: 지역 데이터 정규화로 기준을 만들고, 주소 기반으로 담당자를 배정"
      caption="벤더마다 지역 구분 체계가 달라 그대로는 매칭할 수 없었다. 정확 매칭으로 걸러지지 않는 값만 유사도 매칭으로 넘겨 단계적으로 정규화했다."
      viewBox="0 0 796 336"
    >
      {/* 1단계 — 정규화 */}
      <Eyebrow x={16} y={34}>
        1단계 — 지역 데이터 정규화
      </Eyebrow>

      <Node x={x(0)} y={y1} w={W} h={H} label="비정형 입력" sub="벤더별 상이한 표기" muted />
      <Node x={x(1)} y={y1} w={W} h={H} label="주소 파싱" sub="표기를 단위로 분해" />
      <Node x={x(2)} y={y1} w={W} h={H} label="정확 매칭" sub="기준과 1:1 대조" />
      <Node x={x(3)} y={y1} w={W} h={H} label="유사도 매칭" sub="남은 값만 처리" />

      {[0, 1, 2].map((i) => (
        <Arrow
          key={i}
          x1={x(i) + W}
          y1={y1 + H / 2}
          x2={x(i + 1)}
          y2={y1 + H / 2}
        />
      ))}
      <Txt x={x(2) + W + GAP / 2} y={y1 - 6} anchor="middle" muted size={10}>
        미해결분만
      </Txt>

      {/* 정규화 결과가 기준 데이터로 수렴 */}
      <path
        d={`M ${x(3) + W / 2} ${y1 + H} V ${y1 + H + 16} H ${midX + midW / 2} V ${yMid - 6}`}
        className="fill-none stroke-blue-400 dark:stroke-blue-400/70"
        strokeWidth={1.4}
      />
      <path
        d={`M ${midX + midW / 2} ${yMid} l -3.5 -7 l 7 0 z`}
        className="fill-blue-400"
      />

      <Node
        x={midX}
        y={yMid}
        w={midW}
        h={H}
        label="지역 마스터"
        sub="통일된 기준 데이터"
        accent
      />

      {/* 기준 데이터를 매칭 단계가 참조 */}
      <path
        d={`M ${midX + midW / 2} ${yMid + H} V ${y2 - 24} H ${x(2) + W / 2} V ${y2 - 6}`}
        className="fill-none stroke-blue-400 dark:stroke-blue-400/70"
        strokeWidth={1.4}
        strokeDasharray="4 3"
      />
      <path
        d={`M ${x(2) + W / 2} ${y2} l -3.5 -7 l 7 0 z`}
        className="fill-blue-400"
      />

      {/* 2단계 — 배정 */}
      <Eyebrow x={16} y={210}>
        2단계 — 주소 기반 담당자 배정
      </Eyebrow>

      <Node x={x(0)} y={y2} w={W} h={H} label="거래 신청" sub="약국 주소 입력" />
      <Node x={x(1)} y={y2} w={W} h={H} label="주소 → 지역" sub="공공 주소 API" />
      <Node x={x(2)} y={y2} w={W} h={H} label="담당 구역 조회" sub="기준 데이터 참조" />
      <Node x={x(3)} y={y2} w={W} h={H} label="담당자 배정" sub="자동" accent />

      {[0, 1].map((i) => (
        <Arrow
          key={i}
          x1={x(i) + W}
          y1={y2 + H / 2}
          x2={x(i + 1)}
          y2={y2 + H / 2}
        />
      ))}
      <Arrow x1={x(2) + W} y1={y2 + H / 2} x2={x(3)} y2={y2 + H / 2} accent />

      <Txt x={16} y={318} muted size={10.5}>
        정규화된 기준 데이터를 배정 단계가 참조 · 자동 배정되지 않는 건만 수동으로 남김
      </Txt>
    </Figure>
  );
}
