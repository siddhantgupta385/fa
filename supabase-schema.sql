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
('Siddhant Gupta', 'siddhantgupta385@gmail.com', '7827395948', 'Expert Full-Stack Developer');

INSERT INTO projects (title, description, technologies, status, icon, url) VALUES 
('Sports Betting Platform', 'Google Apps Script optimization for multi-sport betting platform with API integration for MLB, NBA, UFC, NHL, and expanding to F1 and horse racing.', ARRAY['Google Apps Script', 'API Integration', 'Mobile UI'], 'active', 'fas fa-dice', ''),
('Loveable Framework App', 'Web application development using the Loveable framework with seamless user experience and scalable architecture.', ARRAY['Loveable', 'Web Development', 'JavaScript'], 'active', 'fas fa-heart', 'https://preview--swastha.lovable.app'),
('AI Workflow Automation', 'Full-stack SAAS application with React frontend, Django backend, AI integration using LlamaIndex and Langchain for workflow automation.', ARRAY['React', 'Django', 'AI Integration', 'PostgreSQL'], 'completed', 'fas fa-robot', ''),
('E-League Online Platform', 'Tournament management system with user registration, team stats, player check-in, and comprehensive gaming league functionality.', ARRAY['Angular', 'Full-Stack', 'Tournament System'], 'completed', 'fas fa-gamepad', 'https://eleagueonline.com');

INSERT INTO skills (category, name) VALUES 
('Frontend', 'React'), ('Frontend', 'Next.js'), ('Frontend', 'Vue.js'), ('Frontend', 'Angular'), ('Frontend', 'TypeScript'), ('Frontend', 'JavaScript'), ('Frontend', 'HTML5'), ('Frontend', 'CSS3'), ('Frontend', 'Tailwind CSS'), ('Frontend', 'Bootstrap'),
('Backend', 'Django'), ('Backend', 'FastAPI'), ('Backend', 'Node.js'), ('Backend', 'Spring Boot'), ('Backend', 'Python'), ('Backend', 'Java'), ('Backend', 'PHP'), ('Backend', 'PostgreSQL'), ('Backend', 'MongoDB'), ('Backend', 'RESTful APIs'),
('Cloud & Tools', 'Google Cloud Platform'), ('Cloud & Tools', 'Google Apps Script'), ('Cloud & Tools', 'Google APIs'), ('Cloud & Tools', 'Google Sheets'), ('Cloud & Tools', 'API Integration'), ('Cloud & Tools', 'Data Extraction'), ('Cloud & Tools', 'Beautiful Soup'), ('Cloud & Tools', 'Web Scraping'),
('AI & Data', 'Machine Learning'), ('AI & Data', 'TensorFlow'), ('AI & Data', 'Data Science'), ('AI & Data', 'AI Agent Development'), ('AI & Data', 'LlamaIndex'), ('AI & Data', 'Langchain'), ('AI & Data', 'Hugging Face'), ('AI & Data', 'R');

INSERT INTO testimonials (author, project, rating, text) VALUES 
('Michael M.', 'Web Application Project', 5, 'The team is legit. I was facing an issue with my web app which we primarily built using AI, Siddhant Gupta delivered the solution in record time and was cooperative throughout the process.'),
('Jai C.', 'E-League Online Platform', 5, 'It was a great experience working with Siddhant Gupta. Very collaborating, and skilled in their expertise area.'),
('Jai C.', 'User Signup Module', 5, 'Siddhant Gupta was great to work with. Available when needed, has the necessary skills needed for the job. Loved the discussions and the collaboration.'),
('Akash S.', 'Machine Learning Project', 5, 'Highly recommend for projects. Siddhant Gupta demonstrated professionalism, skill, and a strong understanding of the project requirements.');

INSERT INTO services (title, description, icon, technologies) VALUES 
('Frontend Development', 'Modern, responsive web applications using React, Vue.js, Angular, and Next.js with beautiful UX/UI design.', 'fab fa-react', ARRAY['React & Next.js', 'Vue.js & Angular', 'TypeScript & JavaScript', 'HTML5 & CSS3']),
('Backend Development', 'Robust, scalable backend systems with secure APIs, database design, and cloud integration.', 'fas fa-server', ARRAY['Django & FastAPI', 'Node.js & Express', 'PostgreSQL & MongoDB', 'RESTful APIs']),
('Cloud & Integration', 'Cloud deployment, API integrations, and automation solutions using modern cloud platforms.', 'fas fa-cloud', ARRAY['Google Cloud Platform', 'Google Apps Script', 'API Integration', 'Data Extraction']),
('AI & Machine Learning', 'Intelligent solutions with machine learning, data science, and AI agent development.', 'fas fa-brain', ARRAY['Python & TensorFlow', 'Machine Learning', 'Data Science', 'AI Agent Development']);