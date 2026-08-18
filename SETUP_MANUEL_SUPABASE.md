# Guide Étape par Étape - Configuration Supabase

## ÉTAPE 1 : Ajouter la colonne "views" à la table articles

### Accès à l'Éditeur SQL:
1. Connecte-toi à ton projet Supabase: https://app.supabase.com
2. Sélectionne ton projet
3. Dans le menu de gauche, clique sur **SQL Editor**
4. Clique sur **New Query**

### Exécute cette requête:
```sql
ALTER TABLE articles ADD COLUMN views INTEGER DEFAULT 0;
```

**Étapes:**
- Copie la requête ci-dessus
- Colle-la dans l'éditeur SQL
- Clique sur le bouton ▶️ **Run** (ou appuie sur Ctrl+Enter)
- Tu devrais voir le message: "Successfully completed"

---

## ÉTAPE 2 : Créer la table "ads" (Publicités)

### Via SQL Editor (méthode facile):

Exécute cette requête SQL:

```sql
CREATE TABLE ads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  type VARCHAR(50) NOT NULL,
  link VARCHAR(500),
  image VARCHAR(500),
  active BOOLEAN DEFAULT true,
  position INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

**Étapes:**
- Ouvre un **New Query** dans SQL Editor
- Copie la requête ci-dessus
- Clique sur **Run**
- Attends le message "Successfully completed"

---

## ÉTAPE 3 : Ajouter des exemples de publicités

Une fois la table créée, exécute cette requête:

```sql
INSERT INTO ads (title, content, type, link, active, position) VALUES
-- Ads inserted here
```

---

## ÉTAPE 4 : Vérifier que tout fonctionne

### Vérifier la colonne views:
1. Va à **Table Editor** dans le menu de gauche
2. Sélectionne la table **articles**
3. Scroll vers la droite
4. Tu devrais voir la nouvelle colonne **views** (avec valeur 0 par défaut)

### Vérifier la table ads:
1. Va à **Table Editor**
2. En haut, tu devrais voir **ads** dans la liste des tables
3. Clique sur **ads**
4. Tu devrais voir tes 3 publicités insérées

---

## Alternative : Interface Graphique (sans SQL)

Si tu préfères l'interface graphique:

### Ajouter la colonne views:
1. Table Editor → **articles**
2. Clique sur le **+** (Add column)
3. Remplis:
   - **Name**: views
   - **Type**: int8 (Integer)
   - **Default value**: 0
4. Clique **Save**

### Créer la table ads:
1. Table Editor → clic sur **+** (Create table)
2. Remplis:
   - **Name**: ads
   - **Enable Row Level Security**: Non (pour l'instant)
3. Clique **Create table**

### Ajouter les colonnes à ads:
Pour chaque colonne, clique sur **Add column**:

| Name | Type | Default | Nullable |
|------|------|---------|----------|
| id | uuid | gen_random_uuid() | No |
| title | varchar | - | No |
| content | text | - | No |
| type | varchar | - | No |
| link | varchar | - | Yes |
| image | varchar | - | Yes |
| active | boolean | true | No |
| position | int8 | 0 | No |
| created_at | timestamptz | now() | No |
| updated_at | timestamptz | now() | No |

4. Après avoir ajouté toutes les colonnes, définis **id** comme clé primaire

### Ajouter les données:
1. Table Editor → **ads**
2. Clique sur **Insert row** (ou +)
3. Remplis les champs:

**Publicité 1:**
- title: "Abonnez-vous maintenant"
- content: "Obtenez accès à tous les articles premium"
- type: "text"
- link: "/abonnement.html"
- active: true (checked)
- position: 1

**Publicité 2:**
- title: "Offre spéciale"
- content: "50% de réduction sur votre premier mois"
- type: "text"
- link: "/abonnement.html"
- active: true (checked)
- position: 2

---

## RÉSULTAT ATTENDU

Après ces étapes, tu devrais avoir:

✅ **Table articles** avec colonne **views** (Integer, default: 0)
✅ **Table ads** avec 3 publicités de test
✅ La page d'accueil affichera:
  - Articles populaires (triés par views)
  - Publicités actives (dans l'ordre de position)

---

## PROCHAINE ÉTAPE

Une fois configuré:
1. Teste la page d'accueil: http://localhost:8000/index.html
2. Tu devrais voir les 3 publicités à droite
3. Les articles populaires s'affichent (initialement tous avec 0 vues)

Besoin d'aide? Dis-moi à quelle étape tu es bloqué! 🚀
