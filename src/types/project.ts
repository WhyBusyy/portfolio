export interface ProjectChallenge {
  title: string;
  before: string | string[];
  after: string | string[];
}

export interface ProjectMetric {
  value: string;
  change: string | null;
  label: string;
}

export interface ProjectScreenshot {
  src: string;
  alt: string;
  caption?: string;
}

export interface ProjectDecisionOption {
  label: string;
  verdict: "채택" | "기각";
  reason: string;
}

export interface ProjectDecision {
  question: string;
  basis: string;
  options: ProjectDecisionOption[];
  outcome: string;
}

export interface ProjectData {
  slug: string;
  title: string;
  company: string;
  period: string;
  role: string;
  techStack: string[];
  overview: {
    lead: string;
    detail: string;
  };
  screenshots: ProjectScreenshot[];
  /** 여러 후보를 비교해 방향을 정한 기록이 남아 있는 프로젝트에만 존재 */
  decisions?: ProjectDecision[];
  challenges: ProjectChallenge[];
  metrics: ProjectMetric[];
}
