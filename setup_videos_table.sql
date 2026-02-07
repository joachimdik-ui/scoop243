-- Create videos table for Supabase
-- Adjust UUID function if needed (gen_random_uuid() requires pgcrypto)
CREATE TABLE IF NOT EXISTS videos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  youtube_url text NOT NULL,
  thumbnail_url text,
  description text,
  published_at timestamptz DEFAULT now(),
  active boolean DEFAULT true
);

-- Example insert (replace with your actual YouTube links)
-- INSERT INTO videos (title, youtube_url, thumbnail_url, description, active) VALUES
-- ('Exemple vidéo', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', NULL, 'Description courte', true);
