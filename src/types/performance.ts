
export interface Performance {
  id: string;
  performer_name: string; // Changed to match database schema
  performance_title: string; // Changed to match database schema
  performance_description?: string; // Changed to match database schema
  video_url: string; // Changed to match database schema
  email: string;
  feedback_type: 'FREE' | 'PAID'; // App uses uppercase, converts to lowercase for DB
  status: 'PENDING' | 'REVIEWED' | 'IN_PROGRESS'; // App uses uppercase, converts to lowercase for DB
  submitted_at?: string; // Changed to match database schema
  feedback?: PerformanceFeedback;
  // New fields for smart allocation system
  assigned_judge_id?: string; // Changed to match database schema
  assigned_judge_name?: string; // Changed to match database schema
  country: string;
  language: string;
  dance_genre: string; // Changed to match database schema
  platinum_upgrade?: boolean; // Changed to match database schema
  platinum_judge_id?: string; // Changed to match database schema
  global_scoring?: boolean; // Changed to match database schema
  global_entry?: boolean; // Changed to match database schema
  teacher_recommendations_shown?: boolean; // Changed to match database schema
  created_at?: string;
  updated_at?: string;
}

export interface PerformanceFeedback {
  id: string;
  performance_id: string; // Changed to match database schema
  judge_id: string; // Changed to match database schema
  judge_name: string; // Changed to match database schema
  text_feedback: string; // Changed to match database schema
  video_feedback_url?: string; // Changed to match database schema
  qualityPoints?: QualityPoints;
  submitted_at?: string; // Changed to match database schema
  timing?: number;
  reflex?: number;
  smoothness?: number;
  creativity?: number;
  technique?: number;
  overall?: number;
  created_at?: string;
  updated_at?: string;
}

export interface QualityPoints {
  timing: number;
  reflex: number;
  smoothness: number;
  creativity: number;
  technique: number;
  overall: number;
}

export interface Judge {
  id: string;
  name: string;
  email: string;
  role?: string; // Made optional to match database
  country?: string;
  languages: string[];
  dance_genres: string[]; // Changed to match database schema
  is_platinum?: boolean; // Changed to match database schema
  bio?: string;
  hourly_rate?: number; // Changed to match database schema
  available_for_hire?: boolean; // Changed to match database schema
  rating?: number;
  review_count?: number; // Changed to match database schema
  profile_image?: string; // Changed to match database schema
  username?: string;
  password?: string;
  created_at?: string;
  updated_at?: string;
  credentials?: {
    username: string;
    password: string;
  };
}

export interface Teacher {
  id: string;
  name: string;
  image: string;
  price: string;
  rating: number;
  danceGenres: string[];
  description: string;
}

export interface GlobalPrize {
  level: 'national' | 'global';
  title: string;
  description: string;
  location: string;
}

export interface FeedbackRequest {
  id: string;
  judgeId: string;
  judgeName: string;
  performerName: string;
  performerEmail: string;
  performanceTitle: string;
  performanceDescription: string;
  videoUrl: string;
  message: string;
  requestedAt: string;
  status: 'pending' | 'accepted' | 'declined';
}
