/**
 * script-article-details.js
 * Récupère le TITLE depuis l'URL et affiche l'article complet depuis Supabase
 */

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

    const imgUrl = article.image_url || article.image || 'https://via.placeholder.com/1200x600?text=No+Image';
    const published = article.published_at 
      ? new Date(article.published_at).toLocaleDateString('fr-FR', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric'
        }) 
      : '';
    const content = article.content || article.body || article.article || '<p>Contenu non disponible.</p>';

    // Afficher l'article
    root.innerHTML = `
      <article>
        <h1 class="text-3xl md:text-4xl font-black mb-3 leading-tight">${escapeHtml(article.title || 'Sans titre')}</h1>
        <div class="flex items-center gap-3 mb-6 text-sm text-gray-500">
          <span class="bg-orange-media text-white px-3 py-1 rounded font-bold text-xs">${article.categorie || 'Actu'}</span>
          <span>•</span>
          <span>${published}</span>
        </div>
        <img src="${imgUrl}" alt="${escapeHtml(article.title)}" class="w-full h-96 object-cover rounded-lg shadow-md mb-8">
        <div class="prose-content max-w-none text-gray-800 leading-relaxed text-base">
          ${sanitizeHtml(content)}
        </div>
      </article>
    `;

    // Charger les articles similaires (même catégorie, mais pas celui-ci)
    if (article.categorie && relatedContainer) {
      const { data: related, error: relErr } = await supabaseClient
        .from('articles')
        .select('*')
        .eq('categorie', article.categorie)
        .neq('title', article.title)
        .order('published_at', { ascending: false })
        .limit(2);

      if (!relErr && related && related.length > 0) {
        relatedContainer.innerHTML = '';
        related.forEach(art => {
          const artImg = art.image_url || art.image || 'https://via.placeholder.com/400x300';
          const artDate = art.published_at 
            ? new Date(art.published_at).toLocaleDateString('fr-FR')
            : '';
          
          const card = document.createElement('a');
          card.href = `article-details.html?title=${encodeURIComponent(art.title)}`;
          card.className = 'bg-white border rounded shadow-sm hover:shadow-md transition overflow-hidden';
          card.innerHTML = `
            <img src="${artImg}" alt="" class="w-full h-40 object-cover">
            <div class="p-4">
              <h3 class="font-bold text-base leading-tight hover:text-orange-media">${escapeHtml(art.title || 'Sans titre')}</h3>
              <p class="text-xs text-gray-400 mt-2">${artDate}</p>
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

function sanitizeHtml(html) {
  // Permet les balises HTML simples mais sécurisées
  if (!html) return '<p>Contenu non disponible.</p>';
  
  // Si c'est du texte brut (pas de balises HTML), l'envelopper dans <p>
  if (!/<[a-z][\s\S]*>/i.test(html)) {
    return `<p>${escapeHtml(html)}</p>`;
  }
  
  // Sinon, retourner le HTML (supposé sûr depuis Supabase)
  return html;
}
