-- seed_articles.sql
-- Insère un article de test

INSERT INTO public.articles (title, excerpt, content, image_url, categorie)
VALUES (
  'Test: Première actualité',
  'Résumé de test',
  '<p>Contenu de test pour vérifier l\'affichage sur le site.</p>',
  'https://via.placeholder.com/1200x600',
  'Politique'
);
