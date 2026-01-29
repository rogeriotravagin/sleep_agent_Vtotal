
export type Phase = 'ideation' | 'structure' | 'production' | 'finalization';

export interface CourseData {
  // Phase 1: Structuring
  brief: string;                 // 8 sections: Info, ICP, Pedagogia, Voz, etc.
  briefValidation: string;       // QA Checkpoint 1
  research: string;              // Market Analysis, Gaps, Sources
  briefRefinement: string;       // Integrated insights
  refinementValidation: string;  // QA Checkpoint 2
  curriculum: string;            // Curriculum Structure
  curriculumApproval: string;    // Manual Checkpoint

  // Phase 2: Production
  modules: string;               // Modules list
  lessons: string;               // Lessons content
  assessments: string;           // Quizzes & Projects
  reports: string;               // Quality Validation (GPS, DL, Voice Scores)

  // Phase 3: Finalization (Was Launch)
  finalReview: string;           // Manual Review
  publication: string;           // Final Status (Concluir fica aqui)
}

export interface Project {
  id: string;
  name: string;
  type: 'course';
  createdAt: Date;
  updatedAt: Date;
  currentPhase: Phase;
  data: CourseData;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  isTyping?: boolean;
}

export interface SectionStatus {
  id: keyof CourseData;
  label: string;
  filled: number; // 0 to 5
  locked: boolean;
  subLabel?: string;
}
