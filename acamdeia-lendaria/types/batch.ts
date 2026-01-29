
export interface BatchBook {
  title: string;
  slug: string;
  author: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  current_phase?: number;
  phases_completed?: string;
  next_action?: string;
  score?: number | null;
  started_at?: string | null;
  completed_at?: string | null;
  paused_at?: string | null;
  last_error?: string;
  output_files?: string[];
}

export interface BatchSummary {
  total: number;
  pending: number;
  in_progress: number;
  completed: number;
  failed: number;
}

export interface BatchProgress {
  books: BatchBook[];
  metadata: { 
    description: string; 
    last_updated: string; 
    pipeline_version: string 
  };
  summary: BatchSummary;
  sync_timestamp: string;
}
