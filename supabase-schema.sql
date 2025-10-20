-- Create tables for portfolio data
CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  technologies TEXT[] NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('active', 'completed')),
  icon TEXT NOT NULL,
  url TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE skills (
  id SERIAL PRIMARY KEY,
  category TEXT NOT NULL,
  name TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE testimonials (
  id SERIAL PRIMARY KEY,
  author TEXT NOT NULL,
  project TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  text TEXT NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE services (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  technologies TEXT[] NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE personal_details (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  title TEXT NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE personal_details ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Allow public read skills" ON skills FOR SELECT USING (true);
CREATE POLICY "Allow public read testimonials" ON testimonials FOR SELECT USING (true);
CREATE POLICY "Allow public read services" ON services FOR SELECT USING (true);
CREATE POLICY "Allow public read personal" ON personal_details FOR SELECT USING (true);

-- Allow all operations without authentication (for simplicity)
-- In production, you should use proper authentication
CREATE POLICY "Allow all projects" ON projects FOR ALL USING (true);
CREATE POLICY "Allow all skills" ON skills FOR ALL USING (true);
CREATE POLICY "Allow all testimonials" ON testimonials FOR ALL USING (true);
CREATE POLICY "Allow all services" ON services FOR ALL USING (true);
CREATE POLICY "Allow all personal" ON personal_details FOR ALL USING (true);

-- Insert initial data
INSERT INTO personal_details (name, email, phone, title) VALUES 
('AI Tool Enhancer', 'siddhantgupta385@gmail.com', '7827395948', 'Lovable, Supabase & Replit Specialist');

INSERT INTO projects (title, description, technologies, status, icon, url) VALUES 
('Lovable E-commerce Platform', 'Scaled a Lovable-generated e-commerce prototype from MVP to production platform. Enhanced authentication, optimized database queries, and implemented payment processing to handle 10K+ transactions.', ARRAY['Lovable', 'Supabase', 'Stripe Integration'], 'active', 'fas fa-heart', 'https://preview--swastha.lovable.app'),
('Supabase CRM System', 'Scaled a Replit-generated CRM from prototype to enterprise system. Optimized database relationships, implemented efficient queries, and added proper RLS policies to handle 5K+ customers with real-time updates.', ARRAY['Replit', 'Supabase', 'React'], 'completed', 'fas fa-database', ''),
('AI Workflow Automation', 'Scaled an AI-generated workflow tool from prototype to enterprise solution. Enhanced architecture, implemented proper error handling, and optimized performance to process 1M+ requests daily with 99.9% uptime.', ARRAY['Lovable', 'Supabase', 'Python'], 'completed', 'fas fa-code', ''),
('Replit SaaS Platform', 'Scaled a Replit prototype into a production SaaS platform. Enhanced authentication, optimized database performance, and implemented deployment pipeline to serve 50K+ users reliably.', ARRAY['Replit', 'Supabase', 'Next.js'], 'completed', 'fas fa-rocket', 'https://eleagueonline.com');

INSERT INTO skills (category, name) VALUES 
('Lovable Platform', 'Authentication Fixes'), ('Lovable Platform', 'Component Optimization'), ('Lovable Platform', 'Deployment Issues'), ('Lovable Platform', 'Performance Tuning'), ('Lovable Platform', 'State Management'), ('Lovable Platform', 'API Integration'),
('Supabase Database', 'RLS Policy Implementation'), ('Supabase Database', 'Query Optimization'), ('Supabase Database', 'Authentication Fixes'), ('Supabase Database', 'Real-time Subscriptions'), ('Supabase Database', 'Database Design'), ('Supabase Database', 'Performance Tuning'),
('Replit Enhancement', 'Error Handling'), ('Replit Enhancement', 'Code Refactoring'), ('Replit Enhancement', 'Deployment Pipeline'), ('Replit Enhancement', 'Performance Optimization'), ('Replit Enhancement', 'Architecture Redesign'), ('Replit Enhancement', 'Testing Implementation'),
('AI Tool Transformation', 'Architecture Redesign'), ('AI Tool Transformation', 'Testing Implementation'), ('AI Tool Transformation', 'Production Deployment'), ('AI Tool Transformation', 'Monitoring & Maintenance'), ('AI Tool Transformation', 'Code Quality'), ('AI Tool Transformation', 'Security Hardening');

INSERT INTO testimonials (author, project, rating, text) VALUES 
('Sarah M.', 'Lovable SaaS Platform', 5, 'My Lovable prototype worked great for testing, but when I tried to scale it for real users, authentication and database queries started failing. AI Tool Enhancer optimized everything and now it handles thousands of users seamlessly.'),
('Alex K.', 'Replit + Supabase App', 5, 'My Replit project was perfect for development, but as it grew, performance issues and database bottlenecks appeared. AI Tool Enhancer refactored the architecture and optimized the Supabase integration for scale.'),
('Maria R.', 'Supabase Database Optimization', 5, 'Started with a simple Supabase setup that worked fine for my MVP, but as user data grew, queries became slow and relationships got complex. AI Tool Enhancer restructured the database and implemented proper RLS policies for enterprise scale.'),
('David L.', 'AI Prototype to Production', 5, 'My AI prototype was working well for small-scale testing, but when I needed to deploy to production, I hit scalability walls. AI Tool Enhancer transformed it into a robust, enterprise-ready application with proper architecture and monitoring.');

INSERT INTO services (title, description, icon, technologies) VALUES 
('Lovable Platform Scaling', 'Scale your Lovable prototypes to production. Enhance authentication, optimize components, and implement proper deployment strategies for growing user bases.', 'fas fa-heart', ARRAY['Authentication Fixes', 'Component Optimization', 'Deployment Issues', 'Performance Tuning']),
('Supabase Database Scaling', 'Scale your Supabase database for production workloads. Optimize queries, implement RLS policies, and enhance authentication for enterprise-level performance.', 'fas fa-database', ARRAY['RLS Policy Implementation', 'Query Optimization', 'Authentication Fixes', 'Real-time Subscriptions']),
('Replit Project Scaling', 'Scale your Replit prototypes to production applications. Enhance architecture, implement proper error handling, and optimize for growing user demands.', 'fas fa-code', ARRAY['Error Handling', 'Code Refactoring', 'Deployment Pipeline', 'Performance Optimization']),
('Complete AI Tool Scaling', 'End-to-end scaling of AI-generated applications: from prototype to production-ready solutions with proper architecture, testing, and enterprise deployment.', 'fas fa-tools', ARRAY['Architecture Redesign', 'Testing Implementation', 'Production Deployment', 'Monitoring & Maintenance']);