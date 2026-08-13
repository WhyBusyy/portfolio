import ComponentUnification from "./ComponentUnification";
import EditorFootprint from "./EditorFootprint";
import MatchingPipeline from "./MatchingPipeline";
import QaPipeline from "./QaPipeline";
import TokenLayers from "./TokenLayers";
import VsaStructure from "./VsaStructure";

/**
 * 프로젝트 slug → 다이어그램 목록.
 * 사내 화면을 게재할 수 없으므로 구조와 흐름을 직접 그려 대체한다.
 */
export const projectDiagrams: Record<string, React.ComponentType[]> = {
  "qa-automation-bot": [QaPipeline],
  "vsa-migration": [VsaStructure],
  "design-system": [TokenLayers, ComponentUnification],
  "vendor-matching": [MatchingPipeline],
  "editor-migration": [EditorFootprint],
};

export function getProjectDiagrams(slug: string): React.ComponentType[] {
  return projectDiagrams[slug] ?? [];
}
