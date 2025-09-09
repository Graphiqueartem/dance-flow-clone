
export const DATABASE_CONFIG = {
  // Database connection settings
  host: process.env.REACT_APP_DB_HOST || 'localhost',
  port: parseInt(process.env.REACT_APP_DB_PORT || '3306'),
  database: process.env.REACT_APP_DB_NAME || 'dance_competition',
  username: process.env.REACT_APP_DB_USER || 'root',
  password: process.env.REACT_APP_DB_PASSWORD || '',
  
  // API settings
  apiUrl: process.env.REACT_APP_API_URL || '/api',
  
  // File upload settings
  uploadPath: process.env.REACT_APP_UPLOAD_PATH || '/uploads',
  maxFileSize: parseInt(process.env.REACT_APP_MAX_FILE_SIZE || '50') * 1024 * 1024, // MB to bytes
  
  // Security settings
  jwtSecret: process.env.REACT_APP_JWT_SECRET || 'your-jwt-secret-key',
  sessionTimeout: parseInt(process.env.REACT_APP_SESSION_TIMEOUT || '3600'), // seconds
  
  // Application settings
  appName: process.env.REACT_APP_NAME || 'Dance Competition Platform',
  appVersion: process.env.REACT_APP_VERSION || '1.0.0',
};

export const ALLOWED_FILE_TYPES = {
  images: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  videos: ['video/mp4', 'video/avi', 'video/mov', 'video/wmv', 'video/webm'],
};

export const DATABASE_TABLES = {
  judges: 'judges',
  performances: 'performances',
  performance_feedback: 'performance_feedback',
  feedback_requests: 'feedback_requests',
  users: 'users',
  sessions: 'sessions',
};
