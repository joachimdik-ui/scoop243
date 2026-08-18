-- ============================================================
-- PROMPT POUR SQL EDITOR - INSERTION ARTICLES SCOOP243
-- ============================================================

-- ÉTAPE 1 : Vérifier la structure de la table articles
-- Exécutez ce prompt pour confirmer que votre table est bien configurée

SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'articles';

-- Vous devez obtenir ces colonnes minimum :
-- - id (UUID)
-- - title (text)
-- - content (text)
-- - category (text)
-- - author (text)
-- - created_at (timestamp)
-- - updated_at (timestamp)
-- - status (text)

-- ============================================================
-- ÉTAPE 2 : Insérer les 20 articles
-- Copiez et exécutez le bloc d'insertion complet ci-dessous
-- ============================================================

INSERT INTO articles (title, content, category, author, created_at, updated_at, status) VALUES
('Élection présidentielle 2026 : Les candidats se mobilisent', 'La campagne électorale s''intensifie à travers le pays. Les principaux candidats multiplient les meetings pour convaincre les électeurs. Les tensions politiques augmentent dans la capitale avec des manifestations quotidiennes.', 'politique', 'Journaliste Principal', NOW(), NOW(), 'published'),
('Nouveau gouvernement : Les ministères remaniés', 'Le Premier ministre a annoncé la composition de son nouveau gouvernement. Des changements majeurs ont été effectués aux postes sensibles, notamment aux Ministères de la Défense et des Finances. Ces décisions suscitent des débats au sein du Parlement.', 'politique', 'Reporter Politique', NOW(), NOW(), 'published'),
('Accord régional : La RDC et l''Afrique du Sud renforcent leurs liens', 'Les deux nations ont signé vendredi un accord commercial d''une valeur de 500 millions de dollars. Cet accord devrait créer des milliers d''emplois et renforcer la coopération économique entre les deux pays. Des spécialistes estiment que cette alliance pourrait transformer le marché régional.', 'politique', 'Correspondant International', NOW(), NOW(), 'published'),
('Le Parlement débat du budget 2026 : Mesures d''austérité annoncées', 'Le gouvernement présente un budget marqué par des mesures d''économie face aux défis économiques. Les dépenses sociales et de santé seront augmentées de 15 milliards de francs congolais. Cette décision provoque déjà des critiques de l''opposition.', 'politique', 'Analyseur Politique', NOW(), NOW(), 'published'),
('Épidémie de rougeole : L''état d''urgence déclaré', 'Le Ministère de la Santé a déclaré l''état d''urgence suite au nombre croissant de cas de rougeole à Kinshasa. Plus de 2000 personnes ont été infectées en trois semaines. Une campagne massive de vaccination est lancée immédiatement dans tous les quartiers.', 'sante', 'Journaliste Santé', NOW(), NOW(), 'published'),
('Nouvelle clinique pédiatrique inaugurée à Kikwit', 'La clinique ultramoderne, construite avec l''aide de l''OMS, a été inaugurée mercredi. Elle dispose de 150 lits et des équipements de pointe pour traiter les enfants. Cette infrastructure devrait réduire considérablement la mortalité infantile dans la région.', 'sante', 'Correspondant Régional', NOW(), NOW(), 'published'),
('Campagne contre le paludisme : 5 millions de moustiquaires distribuées', 'Une vaste campagne de sensibilisation et de distribution de moustiquaires imprégnées de produits insecticides est en cours. L''objectif est de réduire de 40% les cas de paludisme cette année. Les équipes médicales se déploient dans tous les quartiers populeux.', 'sante', 'Reporter Santé', NOW(), NOW(), 'published'),
('Découverte : Des chercheurs congolais trouvent une nouvelle molécule antipalustre', 'Une équipe de chercheurs de l''Université de Kinshasa a découvert une molécule révolutionnaire contre le paludisme. Les résultats préliminaires sont très prometteurs avec un taux de rémission de 97%. Cette découverte pourrait révolutionner le traitement de la maladie en Afrique.', 'sante', 'Journaliste Sciences', NOW(), NOW(), 'published'),
('Ligue 1 : L''AS Vita remporte un succès spectaculaire', 'L''AS Vita Club a dominé ses rivaux lors du match d''ouverture de la saison avec un score impressionnant de 4-1. Les supporters sont en délire et les pronostics vont bon train pour le titre. Le nouvel entraîneur semble avoir trouvé la bonne formule tactique.', 'sport', 'Journaliste Sport', NOW(), NOW(), 'published'),
('Boxe : Champion congolais qualifié pour les jeux olympiques', 'Ilunga Makabu a conservé sa ceinture mondiale poids lourd en battant son challenger américain. Ce succès lui ouvre les portes des jeux olympiques de 2026. La RDC célèbre l''un de ses plus grands boxeurs contemporains.', 'sport', 'Reporter Sport', NOW(), NOW(), 'published'),
('Athlétisme : Nouvelle piste moderne inaugurée à Kinshasa', 'La piste d''athlétisme aux normes internationales a été inaugurée en grande pompe. Elle permettra aux athlètes congolais de s''entraîner dans de meilleures conditions et d''accueillir les grandes compétitions africaines. L''infrastructure devrait renforcer la domination du Congo en athlétisme.', 'sport', 'Journaliste Sport', NOW(), NOW(), 'published'),
('Football féminin : La RDC remporte le tournoi sub-régional', 'L''équipe féminine congolaise a remporté le tournoi sub-régional en dominant l''Ouganda en finale. Cette victoire marque un tournant dans le développement du football féminin en RDC. Les joueuses seront reçues en audience par le Chef d''État.', 'sport', 'Reporter Football', NOW(), NOW(), 'published'),
('Musique : Festival Kinshasa Urban 2026 annoncé', 'L''édition 2026 du plus grand festival musical de Kinshasa aura lieu en avril. Plus de 100 artistes congolais et africains participeront. Les organisateurs promettent un événement inoubliable avec des innovations technologiques impressionnantes.', 'culture', 'Journaliste Culture', NOW(), NOW(), 'published'),
('Cinéma congolais : "La Nuit Sainte" nommé aux Césars africains', 'Le long métrage du réalisateur congolais Zeka Laplaine a reçu trois nominations prestigieuses. Le film, basé sur la vie quotidienne des habitants de Kinshasa, a séduit les critiques internationaux. C''est une fierté pour le cinéma congolais.', 'culture', 'Critique Cinéma', NOW(), NOW(), 'published'),
('Le Pape reçoit les évêques congolais en audience privée', 'Une délégation d''évêques congolais a été reçue en audience spéciale par Sa Sainteté. Ils ont discuté des questions de paix, de développement et du rôle de l''Église en RDC. Cette visite renforce l''importance de la RDC dans la géopolitique religieuse mondiale.', 'religion', 'Journaliste Religion', NOW(), NOW(), 'published'),
('Inondations à Goma : Des centaines de familles évacuées', 'De violentes pluies ont causé des inondations sans précédent à Goma. Plusieurs quartiers sont submergés et plus de 500 familles ont dû être évacuées. Les autorités déploient les moyens d''urgence pour venir en aide aux sinistrés.', 'faits_divers', 'Correspondant Goma', NOW(), NOW(), 'published'),
('Accident spectaculaire sur la route Kinshasa-Matadi', 'Un bus de transport en commun s''est renversé suite à un défaut de freinage. Bilan : 12 morts et 34 blessés graves. Les autorités ont ouvert une enquête pour déterminer les responsabilités. Cet accident relance le débat sur la sécurité routière en RDC.', 'faits_divers', 'Reporter Urgences', NOW(), NOW(), 'published'),
('Cobalt congolais : Hausse record des prix sur le marché mondial', 'Le prix du cobalt congolais a augmenté de 35% en trois mois. Les producteurs congolais en jubilent et les rentrées fiscales de l''État explosent. Cette tendance pourrait booster l''économie du pays pour les années à venir.', 'economie', 'Analyste Économique', NOW(), NOW(), 'published'),
('Nouvelle banque de développement lancée en RDC', 'L''Agence Congolaise de Développement Économique a ouvert ses premières succursales à Kinshasa. Elle offre des crédits à taux avantageux aux petites et moyennes entreprises. Selon les projections, elle créera 10 000 emplois dans l''année.', 'economie', 'Journaliste Économique', NOW(), NOW(), 'published'),
('Commerce : Accord commercial avec la Chine signé', 'La RDC et la Chine ont signé un nouvel accord commercial portant sur l''exploitation conjointe des ressources naturelles. Les investissements chinois devraient atteindre 2 milliards de dollars. Des critiques craignent une nouvelle forme de dépendance économique.', 'economie', 'Correspondant Commerce', NOW(), NOW(), 'published');

-- ============================================================
-- ÉTAPE 3 : Vérifier que les articles ont été insérés
-- ============================================================

SELECT COUNT(*) as "Nombre d'articles", 
       COUNT(DISTINCT category) as "Catégories",
       category 
FROM articles 
WHERE status = 'published'
GROUP BY category
ORDER BY COUNT(*) DESC;

-- Vous devriez voir 20 articles répartis dans les catégories

-- ============================================================
-- ÉTAPE 4 : Afficher les articles par catégorie
-- ============================================================

SELECT id, title, category, author, created_at 
FROM articles 
WHERE status = 'published'
ORDER BY created_at DESC
LIMIT 20;

-- ============================================================
-- ÉTAPE 5 : Recherche par mots-clés (exemple)
-- ============================================================

-- Chercher tous les articles sur la politique :
SELECT * FROM articles 
WHERE category = 'politique' 
AND status = 'published'
ORDER BY created_at DESC;

-- Chercher les articles d'un auteur spécifique :
SELECT * FROM articles 
WHERE author = 'Journaliste Sport' 
ORDER BY created_at DESC;

-- Chercher par titre :
SELECT * FROM articles 
WHERE title LIKE '%RDC%' 
ORDER BY created_at DESC;

-- ============================================================
-- MAINTENANCE - PROMPTS UTILES
-- ============================================================

-- Supprimer les articles de test (si nécessaire) :
-- DELETE FROM articles WHERE author = 'Journaliste Principal' AND created_at > NOW() - INTERVAL '1 hour';

-- Mettre à jour un article :
-- UPDATE articles SET content = 'Nouveau contenu' WHERE id = 'UUID_ICI';

-- Compter les articles par catégorie :
SELECT category, COUNT(*) as total 
FROM articles 
GROUP BY category 
ORDER BY total DESC;

-- Voir les articles les plus récents :
SELECT title, category, author, created_at 
FROM articles 
ORDER BY created_at DESC 
LIMIT 10;

-- ============================================================
-- CONSEILS D'UTILISATION
-- ============================================================
/*
1. Copiez l'entier bloc d'insertion (ÉTAPE 2) dans votre SQL Editor Supabase
2. Exécutez le bloc pour insérer tous les 20 articles
3. Utilisez l'ÉTAPE 3 pour vérifier l'insertion
4. Utilisez les prompts de l'ÉTAPE 4 et 5 pour tester les requêtes
5. Les articles apparaîtront automatiquement sur votre site !

Notes :
- Les articles sont marqués comme 'published' (actifs)
- Les timestamps sont automatiquement définis à NOW()
- Tous les ' (apostrophes) sont échappés avec ''
- Vous pouvez modifier le statut pour 'draft' si vous voulez éditer avant publication
*/
