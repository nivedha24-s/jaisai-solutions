-- ============================================
-- JAI SAI SOLUTIONS - MySQL Database Schema
-- Import this file in XAMPP phpMyAdmin
-- ============================================

CREATE DATABASE IF NOT EXISTS jaisai_solutions;
USE jaisai_solutions;

-- ============================================
-- TABLE: contact_inquiries
-- ============================================
CREATE TABLE IF NOT EXISTS contact_inquiries (
  id INT AUTO_INCREMENT PRIMARY KEY,
  legal_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  project_blueprint TEXT,
  status ENUM('new', 'read', 'replied') DEFAULT 'new',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ============================================
-- TABLE: services
-- ============================================
CREATE TABLE IF NOT EXISTS services (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  icon VARCHAR(100),
  display_order INT DEFAULT 0,
  is_active TINYINT(1) DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- TABLE: stats
-- ============================================
CREATE TABLE IF NOT EXISTS stats (
  id INT AUTO_INCREMENT PRIMARY KEY,
  label VARCHAR(100) NOT NULL,
  value VARCHAR(50) NOT NULL,
  suffix VARCHAR(20) DEFAULT '',
  display_order INT DEFAULT 0
);

-- ============================================
-- TABLE: industries
-- ============================================
CREATE TABLE IF NOT EXISTS industries (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  icon VARCHAR(100),
  display_order INT DEFAULT 0
);

-- ============================================
-- TABLE: newsletter_subscribers
-- ============================================
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  is_active TINYINT(1) DEFAULT 1
);

-- ============================================
-- SEED DATA: Services
-- ============================================
INSERT INTO services (title, description, icon, display_order) VALUES
('Neural Automation', 'Streamlining enterprise workflows using advanced natural language processing and computer vision.', 'brain', 1),
('Predictive Analytics', 'Forecasting market shifts and operational bottlenecks with 99.9% data confidence intervals.', 'chart', 2),
('Ethical AI Guard', 'Implementing governance frameworks to ensure bias-free and transparent AI deployments.', 'shield', 3),
('Hybrid Cloud AI', 'Deploying edge intelligence across distributed cloud architectures for low-latency response.', 'cloud', 4),
('Industry 4.0', 'Autonomous robotics and smart manufacturing systems integrated with digital twins.', 'cog', 5),
('Quantum Integration', 'Preparing your data stack for the quantum computing era with future-proof algorithms.', 'atom', 6);

-- ============================================
-- SEED DATA: Stats
-- ============================================
INSERT INTO stats (label, value, suffix, display_order) VALUES
('AI Deployments', '500', '+', 1),
('Efficiency Gains', '98', '%', 2),
('Autonomous Support', '24/7', '', 3),
('Global Patents', '40', '+', 4);

-- ============================================
-- SEED DATA: Industries
-- ============================================
INSERT INTO industries (name, description, icon, display_order) VALUES
('Healthcare', 'AI-integrated systems and patient data management.', 'heart', 1),
('Logistics', 'Predictive supply chain and fleet management.', 'truck', 2),
('Retail', 'Hyper-personalized shopping AI experiences.', 'shopping', 3),
('Finance', 'Algorithmic trading and fraud prevention.', 'dollar', 4);

-- ============================================
-- SEED DATA: Sample Contact Inquiries
-- ============================================
INSERT INTO contact_inquiries (legal_name, email, project_blueprint) VALUES
('John Doe', 'john@example.com', 'Looking for an AI solution for logistics optimization.');

SELECT 'Database setup complete!' AS message;
