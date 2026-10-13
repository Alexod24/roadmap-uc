export interface CommunityResource {
  id: string;
  title: string;
  type: 'Video' | 'Artículo' | 'Guía' | 'CheatSheet' | 'Ejercicios';
  url: string;
  author: string;
  upvotes: number;
  duration?: string;
  isVerified?: boolean;
}

export interface RoadmapNode {
  id: string;
  title: string;
  importance: 'Crítico' | 'Alto' | 'Medio';
  prerequisites: string[];
  first_principles: string;
  exam_80_20: string;
  common_pitfall: string;
  tools: string[];
  action_challenge: string;
  community_resources?: CommunityResource[];
}

export interface AcademicUnit {
  id: string;
  unit_number: number;
  title: string;
  duration_hours: number;
  exam_target: string;
  nodes: RoadmapNode[];
}

export interface EvaluationMilestone {
  code: 'C1' | 'EP' | 'C2' | 'EF' | 'SUB';
  name: string;
  week: number;
  weight_percentage: number;
  target_units: string[];
  description?: string;
  community_resources?: CommunityResource[];
}

export interface CourseRoadmap {
  subject_code: string;
  subject_name: string;
  career: string;
  term: string;
  formula: string;
  milestones: EvaluationMilestone[];
  units: AcademicUnit[];
}
