import { Arrow, Bracket, Eyebrow, Figure, Node, Txt } from "./primitives";

/** QA 봇: 변경 감지 → AI 생성 → 검증 게이트 → 리포트 */
export default function QaPipeline() {
  const W = 170;
  const H = 58;
  const GAP = 24;
  const x = (i: number) => 20 + i * (W + GAP);
  const R1 = 46;
  const R2 = 168;

  return (
    <Figure
      title="QA 봇 파이프라인: 변경 감지에서 리포트까지, 그리고 생성물 검증 게이트"
      caption="AI가 만든 테스트는 문법 검증과 쓰기 차단을 통과해야 실행된다. 고정 스위트만 PR 체크에 반영하고, 생성 스펙은 참고용으로 분리했다."
      viewBox="0 0 796 300"
    >
      <Eyebrow x={20} y={26}>
        변경 감지
      </Eyebrow>

      <Node x={x(0)} y={R1} w={W} h={H} label="티켓 추출" sub="브랜치 → 이슈 → PR" />
      <Node x={x(1)} y={R1} w={W} h={H} label="diff 분석" sub="base ↔ head 비교" />
      <Node x={x(2)} y={R1} w={W} h={H} label="파일 분류" sub="화면 · 컴포넌트 · API" />
      <Node
        x={x(3)}
        y={R1}
        w={W}
        h={H}
        label="셀렉터 수집"
        sub="실패 시 정적 패턴 사용"
      />

      <Arrow x1={x(0) + W} y1={R1 + H / 2} x2={x(1)} y2={R1 + H / 2} />
      <Arrow x1={x(1) + W} y1={R1 + H / 2} x2={x(2)} y2={R1 + H / 2} />
      <Arrow x1={x(2) + W} y1={R1 + H / 2} x2={x(3)} y2={R1 + H / 2} />

      {/* 줄바꿈 연결 */}
      <path
        d={`M ${x(3) + W / 2} ${R1 + H} V ${R1 + H + 26} H ${x(0) + W / 2} V ${R2 - 8}`}
        className="fill-none stroke-slate-300 dark:stroke-white/25"
        strokeWidth={1.4}
      />
      <Arrow
        x1={x(0) + W / 2}
        y1={R2 - 14}
        x2={x(0) + W / 2}
        y2={R2}
      />

      <Eyebrow x={20} y={148}>
        생성과 검증
      </Eyebrow>

      <Node x={x(0)} y={R2} w={W} h={H} label="AI 테스트 생성" sub="변경 범위로 한정" />
      <Node
        x={x(1)}
        y={R2}
        w={W}
        h={H}
        label="문법 검증"
        sub="실패 시 1회 재시도"
        accent
      />
      <Node
        x={x(2)}
        y={R2}
        w={W}
        h={H}
        label="쓰기 차단 실행"
        sub="데이터 변조 불가"
        accent
      />
      <Node x={x(3)} y={R2} w={W} h={H} label="리포트" sub="PR 코멘트 · 리포트" />

      <Arrow x1={x(0) + W} y1={R2 + H / 2} x2={x(1)} y2={R2 + H / 2} />
      <Arrow x1={x(1) + W} y1={R2 + H / 2} x2={x(2)} y2={R2 + H / 2} accent />
      <Arrow x1={x(2) + W} y1={R2 + H / 2} x2={x(3)} y2={R2 + H / 2} />

      <Bracket x={x(1) - 12} y={R2 - 14} w={W * 2 + GAP + 24} h={H + 28} label="검증 게이트" />

      <Txt x={20} y={274} muted size={10.5}>
        고정 스위트(스모크 · 단위 · E2E)는 PR 체크에 반영 · AI 생성 스펙은 참고용으로 분리
      </Txt>
    </Figure>
  );
}
