
-- Dance Competition Platform Database Schema
-- Run this on your GoDaddy MySQL database

CREATE DATABASE IF NOT EXISTS dance_competition CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE dance_competition;

-- Users table for authentication
CREATE TABLE users (
    id VARCHAR(36) PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    role ENUM('judge', 'performer', 'admin') DEFAULT 'judge',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_role (role)
);

-- Judges table
CREATE TABLE judges (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    username VARCHAR(100),
    country VARCHAR(100),
    languages JSON,
    dance_genres JSON,
    is_platinum BOOLEAN DEFAULT FALSE,
    bio TEXT,
    hourly_rate DECIMAL(10,2),
    available_for_hire BOOLEAN DEFAULT FALSE,
    rating DECIMAL(3,2) DEFAULT 5.0,
    review_count INT DEFAULT 0,
    profile_image VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_country (country),
    INDEX idx_is_platinum (is_platinum),
    INDEX idx_available (available_for_hire)
);

-- Performances table
CREATE TABLE performances (
    id VARCHAR(36) PRIMARY KEY,
    performer_name VARCHAR(255) NOT NULL,
    performance_title VARCHAR(255) NOT NULL,
    performance_description TEXT,
    video_url VARCHAR(500) NOT NULL,
    email VARCHAR(255) NOT NULL,
    feedback_type ENUM('FREE', 'PAID') DEFAULT 'FREE',
    status ENUM('PENDING', 'REVIEWED', 'IN_PROGRESS') DEFAULT 'PENDING',
    country VARCHAR(100) NOT NULL,
    language VARCHAR(50) NOT NULL,
    dance_genre VARCHAR(100) NOT NULL,
    platinum_upgrade BOOLEAN DEFAULT FALSE,
    global_scoring BOOLEAN DEFAULT FALSE,
    global_entry BOOLEAN DEFAULT FALSE,
    teacher_recommendations_shown BOOLEAN DEFAULT FALSE,
    assigned_judge_id VARCHAR(36),
    assigned_judge_name VARCHAR(255),
    platinum_judge_id VARCHAR(36),
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (assigned_judge_id) REFERENCES judges(id) ON DELETE SET NULL,
    FOREIGN KEY (platinum_judge_id) REFERENCES judges(id) ON DELETE SET NULL,
    INDEX idx_status (status),
    INDEX idx_dance_genre (dance_genre),
    INDEX idx_assigned_judge (assigned_judge_id),
    INDEX idx_submitted_at (submitted_at)
);

-- Performance feedback table
CREATE TABLE performance_feedback (
    id VARCHAR(36) PRIMARY KEY,
    performance_id VARCHAR(36) NOT NULL,
    judge_id VARCHAR(36) NOT NULL,
    judge_name VARCHAR(255) NOT NULL,
    text_feedback TEXT NOT NULL,
    video_feedback_url VARCHAR(500),
    timing INT CHECK (timing >= 0 AND timing <= 100),
    reflex INT CHECK (reflex >= 0 AND reflex <= 100),
    smoothness INT CHECK (smoothness >= 0 AND smoothness <= 100),
    creativity INT CHECK (creativity >= 0 AND creativity <= 100),
    technique INT CHECK (technique >= 0 AND technique <= 100),
    overall INT CHECK (overall >= 0 AND overall <= 100),
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (performance_id) REFERENCES performances(id) ON DELETE CASCADE,
    FOREIGN KEY (judge_id) REFERENCES judges(id) ON DELETE CASCADE,
    INDEX idx_performance (performance_id),
    INDEX idx_judge (judge_id),
    INDEX idx_submitted_at (submitted_at)
);

-- Feedback requests table
CREATE TABLE feedback_requests (
    id VARCHAR(36) PRIMARY KEY,
    judge_id VARCHAR(36) NOT NULL,
    judge_name VARCHAR(255) NOT NULL,
    performer_name VARCHAR(255) NOT NULL,
    performer_email VARCHAR(255) NOT NULL,
    performance_title VARCHAR(255) NOT NULL,
    performance_description TEXT,
    video_url VARCHAR(500) NOT NULL,
    message TEXT,
    status ENUM('pending', 'accepted', 'declined') DEFAULT 'pending',
    requested_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (judge_id) REFERENCES judges(id) ON DELETE CASCADE,
    INDEX idx_judge (judge_id),
    INDEX idx_status (status),
    INDEX idx_requested_at (requested_at)
);

-- Sessions table for authentication
CREATE TABLE sessions (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    token VARCHAR(500) NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user (user_id),
    INDEX idx_token (token(100)),
    INDEX idx_expires (expires_at)
);

-- Insert default admin user
INSERT INTO users (id, email, password, name, role) VALUES 
('admin-001', 'admin@dancecompetition.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Admin User', 'admin');

-- Insert sample judges
INSERT INTO users (id, email, password, name, role) VALUES 
('judge-001', 'judge1@example.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Sarah Johnson', 'judge'),
('judge-002', 'judge2@example.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Michael Chen', 'judge');

INSERT INTO judges (id, user_id, name, email, username, country, languages, dance_genres, is_platinum, bio, hourly_rate, available_for_hire, rating, review_count) VALUES 
('judge-001', 'judge-001', 'Sarah Johnson', 'judge1@example.com', 'sarah_judge', 'United States', 
 '["English", "Spanish"]', '["Contemporary", "Ballet", "Jazz"]', TRUE, 
 'Professional dance instructor with 15 years of experience in contemporary and ballet.', 50.00, TRUE, 4.8, 25),
('judge-002', 'judge-002', 'Michael Chen', 'judge2@example.com', 'michael_judge', 'Canada', 
 '["English", "Mandarin"]', '["Hip Hop", "Breaking", "Popping"]', FALSE, 
 'Street dance specialist and competition judge with expertise in urban dance styles.', 40.00, TRUE, 4.9, 18);
