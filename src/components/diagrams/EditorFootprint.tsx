import { Eyebrow, Figure, Txt, FILL_ACCENT, FILL_MUTED, STROKE_ACCENT, STROKE_BOX } from "./primitives";

/** 에디터 교체: 의존성 크기와 배포 시간 대비 */
export default function EditorFootprint() {
  // 2.5GB vs 3MB 는 선형 비교가 불가능(약 850배)해 로그 축으로 그린다.
  const x0 = 150;
  const maxW = 545;
  const lg = (mb: number) => Math.log10(mb);
  const scale = (mb: number) => ((lg(mb) - lg(1)) / (lg(2500) - lg(1))) * maxW;

  return (
    <Figure
      title="에디터 교체 전후: 의존성 크기와 배포 시간"
      viewBox="0 0 796 268"
    >
      <Eyebrow x={20} y={26}>
        에디터 관련 의존성 크기
      </Eyebrow>

      {/* before */}
      <Txt x={132} y={62} anchor="end" bold>
        CKEditor
      </Txt>
      <rect
        x={x0}
        y={46}
        width={scale(2500)}
        height={22}
        rx={4}
        className={`${FILL_MUTED} ${STROKE_BOX}`}
        strokeWidth={1}
      />
      <Txt x={x0 + scale(2500) + 10} y={62} muted bold>
        2.5GB
      </Txt>

      {/* after */}
      <Txt x={132} y={104} anchor="end" bold>
        Tiptap
      </Txt>
      <rect
        x={x0}
        y={88}
        width={Math.max(scale(3), 6)}
        height={22}
        rx={4}
        className={`${FILL_ACCENT} ${STROKE_ACCENT}`}
        strokeWidth={1}
      />
      <Txt x={x0 + Math.max(scale(3), 6) + 10} y={104} accent bold>
        3MB
      </Txt>

      {/* 축 */}
      <line
        x1={x0}
        y1={124}
        x2={x0 + maxW}
        y2={124}
        className="stroke-slate-200 dark:stroke-white/[0.14]"
        strokeWidth={1}
      />
      {[1, 10, 100, 1000].map((mb) => (
        <g key={mb}>
          <line
            x1={x0 + scale(mb)}
            y1={124}
            x2={x0 + scale(mb)}
            y2={129}
            className="stroke-slate-200 dark:stroke-white/[0.14]"
            strokeWidth={1}
          />
          <Txt x={x0 + scale(mb)} y={142} anchor="middle" muted size={9.5}>
            {mb >= 1000 ? `${mb / 1000}GB` : `${mb}MB`}
          </Txt>
        </g>
      ))}
      <Txt x={x0 + maxW} y={142} anchor="end" muted size={9.5}>
        로그 축
      </Txt>

      <Eyebrow x={20} y={182}>
        운영 배포 시간
      </Eyebrow>

      <Txt x={132} y={214} anchor="end" bold>
        교체 전
      </Txt>
      <rect
        x={x0}
        y={198}
        width={360}
        height={20}
        rx={4}
        className={`${FILL_MUTED} ${STROKE_BOX}`}
        strokeWidth={1}
      />
      <Txt x={x0 + 370} y={213} muted bold>
        12분
      </Txt>

      <Txt x={132} y={242} anchor="end" bold>
        교체 후
      </Txt>
      <rect
        x={x0}
        y={226}
        width={180}
        height={20}
        rx={4}
        className={`${FILL_ACCENT} ${STROKE_ACCENT}`}
        strokeWidth={1}
      />
      <Txt x={x0 + 190} y={241} accent bold>
        6분
      </Txt>
    </Figure>
  );
}
