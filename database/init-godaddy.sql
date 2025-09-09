
-- Database schema for GoDaddy hosting
-- Run this in your cPanel phpMyAdmin to create the required tables

CREATE TABLE IF NOT EXISTS `judges` (
  `id` varchar(255) NOT NULL PRIMARY KEY,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL UNIQUE,
  `password` varchar(255) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `languages` JSON DEFAULT NULL,
  `dance_genres` JSON DEFAULT NULL,
  `is_platinum` tinyint(1) DEFAULT 0,
  `bio` text DEFAULT NULL,
  `hourly_rate` decimal(10,2) DEFAULT NULL,
  `available_for_hire` tinyint(1) DEFAULT 0,
  `rating` decimal(3,2) DEFAULT 5.00,
  `review_count` int DEFAULT 0,
  `profile_image` text DEFAULT NULL,
  `role` varchar(50) DEFAULT 'judge',
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS `performances` (
  `id` varchar(255) NOT NULL PRIMARY KEY,
  `performer_name` varchar(255) NOT NULL,
  `performance_title` varchar(255) NOT NULL,
  `performance_description` text DEFAULT NULL,
  `video_url` text NOT NULL,
  `email` varchar(255) NOT NULL,
  `feedback_type` enum('FREE','PAID') DEFAULT 'FREE',
  `status` enum('PENDING','REVIEWED','IN_PROGRESS') DEFAULT 'PENDING',
  `country` varchar(255) NOT NULL,
  `language` varchar(255) NOT NULL,
  `dance_genre` varchar(255) NOT NULL,
  `platinum_upgrade` tinyint(1) DEFAULT 0,
  `global_scoring` tinyint(1) DEFAULT 0,
  `global_entry` tinyint(1) DEFAULT 0,
  `teacher_recommendations_shown` tinyint(1) DEFAULT 0,
  `assigned_judge_id` varchar(255) DEFAULT NULL,
  `assigned_judge_name` varchar(255) DEFAULT NULL,
  `platinum_judge_id` varchar(255) DEFAULT NULL,
  `submitted_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS `performance_feedback` (
  `id` varchar(255) NOT NULL PRIMARY KEY,
  `performance_id` varchar(255) DEFAULT NULL,
  `judge_id` varchar(255) DEFAULT NULL,
  `judge_name` varchar(255) NOT NULL,
  `technique` int DEFAULT NULL,
  `timing` int DEFAULT NULL,
  `reflex` int DEFAULT NULL,
  `smoothness` int DEFAULT NULL,
  `creativity` int DEFAULT NULL,
  `overall` int DEFAULT NULL,
  `text_feedback` text NOT NULL,
  `video_feedback_url` text DEFAULT NULL,
  `submitted_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS `feedback_requests` (
  `id` varchar(255) NOT NULL PRIMARY KEY,
  `judge_id` varchar(255) DEFAULT NULL,
  `judge_name` varchar(255) NOT NULL,
  `performer_name` varchar(255) NOT NULL,
  `performer_email` varchar(255) NOT NULL,
  `performance_title` varchar(255) NOT NULL,
  `performance_description` text DEFAULT NULL,
  `video_url` text NOT NULL,
  `message` text DEFAULT NULL,
  `requested_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `status` enum('pending','accepted','declined') DEFAULT 'pending',
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert some demo data for testing
INSERT IGNORE INTO `judges` (`id`, `name`, `email`, `password`, `country`, `dance_genres`, `is_platinum`, `bio`, `rating`, `review_count`) VALUES
('judge_1', 'Sarah Martinez', 'sarah@example.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'USA', '["Ballet", "Contemporary", "Jazz"]', 1, 'Professional ballet instructor with 15+ years of experience in competitive dance.', 4.8, 127),
('judge_2', 'Michael Chen', 'michael@example.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Canada', '["Hip Hop", "Breaking", "Street Dance"]', 0, 'Street dance pioneer and choreographer for major music videos.', 4.9, 89),
('judge_3', 'Isabella Rodriguez', 'isabella@example.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Spain', '["Latin", "Salsa", "Bachata"]', 1, 'World champion in Latin dance competitions.', 5.0, 156);
