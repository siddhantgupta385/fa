-- Add media columns to projects table for image/video support (idempotent)
ALTER TABLE projects 
ADD COLUMN IF NOT EXISTS media_url TEXT;

ALTER TABLE projects 
ADD COLUMN IF NOT EXISTS media_type VARCHAR(10) CHECK (media_type IN ('image', 'video'));

-- Mixed media array (images/videos)
ALTER TABLE projects 
ADD COLUMN IF NOT EXISTS media_urls JSONB;

-- Update existing projects to have default values if needed
-- (Optional: You can run this if you want to set default media_type for existing projects)
-- UPDATE projects SET media_type = 'image' WHERE media_type IS NULL;