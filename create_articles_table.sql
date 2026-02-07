-- create_articles_table.sql
-- Exécutez ce script dans le SQL Editor de Supabase

create extension if not exists "uuid-ossp";

CREATE TABLE IF NOT EXISTS public.articles (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  title varchar(255) NOT NULL,
  excerpt text,
  content text,
  image_url varchar(500),
  categorie varchar(100),
  published_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Index utile pour les tris par date
CREATE INDEX IF NOT EXISTS idx_articles_published_at ON public.articles (published_at DESC);
