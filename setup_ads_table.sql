-- Ajouter la colonne 'views' à la table articles (si elle n'existe pas)
ALTER TABLE articles ADD COLUMN views INTEGER DEFAULT 0;

-- Créer la table pour les publicités
CREATE TABLE IF NOT EXISTS ads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  type VARCHAR(50) NOT NULL, -- 'image' ou 'text'
  link VARCHAR(500),
  image VARCHAR(500),
  active BOOLEAN DEFAULT true,
  position INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Ajouter des exemples de publicités
INSERT INTO ads (title, content, type, link, active, position) VALUES
-- No subscription ads (site is free with all content accessible)
