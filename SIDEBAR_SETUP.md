# Configuration de la Barre Latérale - Accueil

## Modifications Effectuées

### 1. **Page d'Accueil (index.html)**
La page d'accueil inclut maintenant une barre latérale à droite (lg:col-span-4) avec:

#### a) **Section "Qui sommes-nous"**
- Logo du site
- Courte description avec lien vers about.html
- Icônes des réseaux sociaux

#### b) **Articles Populaires**
- Les 5 articles les plus lus (basés sur le champ `views`)
- Affichage avec numérotation (01, 02, etc.)
- Icône de feu pour indiquer la popularité
- Lien vers la page d'article détaillé

#### c) **Publicités**
- Chargées dynamiquement depuis la table `ads` en Supabase
- Support de 2 types: **image** (avec lien) et **text** (banneau texte)
- Gestion de l'ordre via le champ `position`
- Activation/désactivation via le champ `active`

---

## Configuration Supabase Requise

### Étape 1 : Modifier la Table Articles
Ajoutez une colonne pour tracker les lectures:

```sql
ALTER TABLE articles ADD COLUMN views INTEGER DEFAULT 0;
```

### Étape 2 : Créer la Table Publicités
Exécutez dans l'éditeur SQL Supabase:

```sql
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
```

### Étape 3 : Ajouter des Publicités Exemples
```sql
INSERT INTO ads (title, content, type, link, active, position) VALUES
-- No subscription ads, site is free
```

---

## Comment Ajouter une Publicité

### Via l'Interface Supabase:

1. **Publicité Texte:**
   - `title`: "Mon Titre"
   - `content`: "Description/contenu"
   - `type`: "text"
   - `link`: "https://example.com"
   - `active`: true
   - `position`: 1 (ordre d'affichage)

2. **Publicité Image:**
   - `title`: "Mon Titre"
   - `content`: "URL ou description"
   - `image`: "https://lien-vers-image.jpg"
   - `type`: "image"
   - `link`: "https://example.com"
   - `active`: true
   - `position`: 2

### Ordre d'Affichage:
- Le champ `position` détermine l'ordre (0, 1, 2...)
- Les publicités avec `active = false` ne s'affichent pas

---

## Incrémenter les Vues d'un Article

Lorsqu'un utilisateur accède à un article, vous pouvez incrémenter les vues avec:

```javascript
// Dans script-article-details.js (à ajouter)
await supabaseClient
  .from('articles')
  .update({ views: (article.views || 0) + 1 })
  .eq('title', article.title);
```

---

## Résultat

- ✅ Sidebar affichée à droite (visible en lg et plus)
- ✅ Qui sommes-nous avec logo et réseaux sociaux
- ✅ Articles populaires triés par nombre de vues
- ✅ Publicités gérées via la base de données
- ✅ Responsive (cache en mobile, affichée en desktop)

---

## Fichiers Modifiés

1. **index.html** - Ajout structure sidebar
2. **script-index.js** - Chargement des articles populaires et publicités
3. **setup_ads_table.sql** - Script de création des tables
