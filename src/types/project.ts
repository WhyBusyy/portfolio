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
  challenges: ProjectChallenge[];
  metrics: ProjectMetric[];
}
