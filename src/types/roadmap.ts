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
  isOptional?: boolean;
  checkColor?: 'purple' | 'green';
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

export interface ProfessorReview {
  id: string;
  author_term: string;
  campus: string;
  grade_obtained?: string;
  comment: string;
  date: string;
  upvotes: number;
  tags: string[];
}

export interface ProfessorStats {
  rating: number;
  review_count: number;
  approval_rate_percentage: number;
  clarity_score: number;
  difficulty_level: 'Baja' | 'Media' | 'Alta' | 'Muy Exigente';
  strictness_score: number;
  responsiveness_score: number;
}

export interface CourseProfessor {
  id: string;
  full_name: string;
  title_degree: string;
  avatar_url?: string;
  is_active: boolean;
  semesters_taught: string[];
  campuses: string[];
  modalities: ('Presencial' | 'Semipresencial' | 'A Distancia')[];
  badge?: string;
  teaching_style: {
    summary: string;
    methodology: string;
    exam_style: string;
    evaluation_criteria: string;
    recommended_tools: string[];
  };
  recommendations: {
    dos: string[];
    donts: string[];
    best_practice_quote: string;
  };
  stats: ProfessorStats;
  reviews: ProfessorReview[];
}

export interface CourseRoadmap {
  subject_code: string;
  subject_name: string;
  career: string;
  term: string;
  formula: string;
  milestones: EvaluationMilestone[];
  units: AcademicUnit[];
  professors?: CourseProfessor[];
}
