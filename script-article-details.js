/**
 * script-article-details.js
 * Récupère le TITLE depuis l'URL et affiche l'article complet depuis Supabase
 * Avec support du formatage style WhatsApp (*gras*, _italique_)
 */

// Fonction de formatage style WhatsApp
function formatWhatsAppStyle(text) {
    if (!text) return "";
    return text
        .replace(/\*(.*?)\*/g, '<strong>$1</strong>') // *gras*
        .replace(/_(.*?)_/g, '<em>$1</em>')          // _italique_
        .replace(/~(.*?)~/g, '<del>$1</del>')       // ~barré~
        .replace(/\n/g, '<br>');                     // Sauts de ligne
}

document.addEventListener('DOMContentLoaded', async () => {
  if (!supabaseClient) {
    console.error('Supabase client not initialized');
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const title = params.get('title');
  const root = document.getElementById('article-root');
  const relatedContainer = document.getElementById('related-articles');
  
  if (!title || !root) {
    if (root) root.innerHTML = '<p class="text-red-500">Article introuvable.</p>';
    return;
  }

  root.innerHTML = '<p class="text-gray-500 text-center py-8">Chargement...</p>';

  try {
    // Charger l'article principal par TITLE
    const { data: article, error } = await supabaseClient
      .from('articles')
      .select('*')
      .eq('title', decodeURIComponent(title))
      .single();

    if (error) throw error;
    if (!article) {
      root.innerHTML = '<p class="text-gray-500">Article non trouvé.</p>';
      return;
    }

    // Préparation des données et formatage du contenu
    const formattedContent = formatWhatsAppStyle(article.content || '');
    const imgUrl = article.image_url || 'https://via.placeholder.com/1200x600?text=Scoop243';
    const artDate = article.created_at ? new Date(article.created_at).toLocaleDateString('fr-FR') : '';
    
    // Utilisation de la colonne 'categorie' de votre base de données
    const nomCategorie = article.categorie || 'Info';

    // Affichage de l'article (Apparence préservée)
    root.innerHTML = `
      <div class="mb-6">
        <h1 class="text-3xl md:text-5xl font-black text-slate-900 leading-tight mb-4">${escapeHtml(article.title)}</h1>
        <div class="text-gray-500 text-sm flex items-center gap-3">
          <span><i class="far fa-calendar-alt mr-1"></i> ${artDate}</span>
          <span class="bg-orange-media text-white px-2 py-0.5 rounded text-xs uppercase font-bold">${escapeHtml(nomCategorie)}</span>
        </div>
      </div>
      
      <img src="${imgUrl}" class="w-full h-auto rounded-xl shadow-sm mb-8">
      
      <div class="article-body-text text-gray-800 text-lg leading-relaxed">
        ${formattedContent}
      </div>
    `;

    // Charger les articles similaires en utilisant 'categorie'
    if (article.categorie) {
      const { data: related } = await supabaseClient
        .from('articles')
        .select('*')
        .eq('categorie', article.categorie) // Correction du nom de la colonne
        .neq('title', article.title)      // Exclusion par titre pour plus de fiabilité
        .order('created_at', { ascending: false }) // Les plus récents en premier
        .limit(2);

      if (related && related.length > 0) {
        relatedContainer.innerHTML = '';
        related.forEach(art => {
          const artImg = art.image_url || 'https://via.placeholder.com/400x250';
          const card = document.createElement('a');
          card.href = `article-details.html?title=${encodeURIComponent(art.title)}`;
          card.className = 'bg-white border rounded shadow-sm hover:shadow-md transition overflow-hidden';
          card.innerHTML = `
            <img src="${artImg}" alt="" class="w-full h-40 object-cover">
            <div class="p-4">
              <h3 class="font-bold text-base leading-tight hover:text-orange-media">${escapeHtml(art.title || 'Sans titre')}</h3>
              <p class="text-xs text-gray-400 mt-2">${new Date(art.created_at).toLocaleDateString('fr-FR')}</p>
            </div>
          `;
          relatedContainer.appendChild(card);
        });
      } else {
        relatedContainer.innerHTML = '<p class="text-gray-500 col-span-2 text-center py-4">Aucun article similaire.</p>';
      }
    }

  } catch (err) {
    console.error(err);
    root.innerHTML = `<p class="text-red-500">Erreur : ${err.message || 'Impossible de charger l\'article.'}</p>`;
  }
});

function escapeHtml(str) {
  if (!str) return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}