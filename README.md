# scoop243.net - Site d'actualités RDC

## 🌐 Vue d'ensemble
Site d'actualités moderne pour la RDC, construit avec **HTML5**, **Tailwind CSS** et **Supabase** pour la gestion dynamique du contenu.

## 📁 Structure du projet

```
scoop243/
├── index.html                 # Page d'accueil
├── politique.html            # Catégorie Politique
├── economie.html             # Catégorie Économie
├── sports.html               # Catégorie Sports
├── culture.html              # Catégorie Culture
├── article-details.html      # Page d'un article complet
├── contact.html              # Page de contact

├── config.js                 # Configuration Supabase centralisée
├── script.js                 # Scripts généraux (menu, animations)
├── script-index.js           # Chargement articles pour accueil
├── script-politique.js       # Chargement articles Politique
├── script-economie.js        # Chargement articles Économie
├── script-sports.js          # Chargement articles Sports
├── script-culture.js         # Chargement articles Culture
├── script-article-details.js # Affichage d'un article complet
├── style.css                 # Styles additionnels (optionnel)
├── Images/                   # Dossier d'images locales
└── README.md                 # Ce fichier
```

## 🚀 Installation & Configuration

### 1. **Créer un projet Supabase**
- Allez sur [supabase.com](https://supabase.com)
- Créez un nouveau projet
- Récupérez votre **Project URL** et **Anon Key** depuis les paramètres API

### 2. **Configurer la base de données**
Créez une table `articles` avec les colonnes suivantes :

```sql
CREATE TABLE articles (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  excerpt TEXT,
  content TEXT,
  image_url VARCHAR(500),
  categorie VARCHAR(100),
  published_at TIMESTAMP DEFAULT now(),
  created_at TIMESTAMP DEFAULT now()
);
```

**Colonnes acceptées :**
- `id` : Identifiant unique
- `title` : Titre de l'article
- `excerpt` / `chapo` : Résumé court
- `content` / `body` / `article` : Contenu complet
- `image_url` / `image` : URL de l'image
- `categorie` : Catégorie (Politique, Économie, Sports, Culture)
- `published_at` : Date de publication

### 3. **Mettre à jour les identifiants**
Ouvrez [config.js](config.js) et remplacez :

```javascript
const SUPABASE_CONFIG = {
  URL: 'https://qkzzhjeeuierlqkqexrf.supabase.co',  // ← Remplacer
  ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFrenpoamVldWllcmxxa3FleHJmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg4NTY4OTgsImV4cCI6MjA4NDQzMjg5OH0.jISmx5PBs99hCVUCziJZBdjS9xI5vfKmII3TaJ1zVu4'            // ← Remplacer

};
```

### 4. **Ajouter des articles**
Depuis le dashboard Supabase, insérez des articles dans la table `articles`. Exemple :

| id | title | excerpt | content | image_url | categorie | published_at |
|----|-------|---------|---------|-----------|-----------|--------------|
| (auto) | Élection 2026 : nouvelles dates | Résumé... | Article complet... | https://... | Politique | 2026-02-07 |

## 📝 Pages du site

### **Accueil** (`index.html`)
- Affiche l'article principal en vedette
- Liste 4 autres articles des catégories
- Récupère automatiquement depuis Supabase

### **Catégories** (`politique.html`, `economie.html`, etc.)
- Affiche tous les articles d'une catégorie
- Navigation active du lien correspondant
- Filtrés par `.eq('categorie', 'NomCategorie')`

### **Détail article** (`article-details.html?id=...`)
- Affiche un article complet via son ID
- Récupère depuis l'URL : `?id=article-uuid`
- Affiche image, titre, catégorie, date et contenu

### **Contact** (`contact.html`)
- Formulaire de contact simple
- Carte Google Maps intégrée

### **Abonnement** (`abonnement.html`)
- Présente 3 plans d'abonnement fictifs
- Designs responsifs

## 🎨 Personnalisation

### Couleur orange
Définie dans chaque HTML dans `<style>` :
```css
:root { --orange-media: #F37021; }
```

### Logo
Placez votre logo dans `images/votre-logo.png` (hauteur 24-48 selon l'écran)

## ⚙️ Fonctionnalités

✅ Chargement dynamique des articles depuis Supabase  
✅ Filtrage par catégorie  
✅ Pages responsives (mobile-first)  
✅ Navigation sticky  
✅ Marquee (ticker) d'actualités  
✅ Sidebar avec articles populaires  
✅ Liens internes vers les articles complets  

## 🔒 Sécurité

- La clé Supabase affichée est une **clé anon** (lecture seule)
- N'exposez pas votre **clé secrète** en frontend
- Configurez les **Row Level Security (RLS)** policies si nécessaire

## 📱 Responsive Design

Le site utilise **Tailwind CSS** et est optimisé pour :
- ✅ Mobile (xs, sm)
- ✅ Tablette (md, lg)
- ✅ Desktop (xl, 2xl)

## 🐛 Dépannage

**Erreur "Supabase client not initialized"**
→ Vérifiez que `config.js` est chargé avant les autres scripts

**Pas d'articles affichés**
→ Vérifiez vos identifiants Supabase et que la table existe

**Images non chargées**
→ Vérifiez les URLs dans les champs `image_url` de Supabase

## 📞 Support
Pour des questions sur Supabase : https://supabase.com/docs
