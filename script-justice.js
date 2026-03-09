/**
 * script-justice.js
 * Charge les articles de la catégorie "Justice" depuis Supabase
 */

document.addEventListener('DOMContentLoaded', async () => {
  if (!supabaseClient) {
    console.error('Supabase client not initialized');
    return;
  }

  const container = document.getElementById('articles-container');
  if (!container) return;

  container.innerHTML = '<p class="text-gray-500 col-span-full text-center py-10">Chargement des dossiers judiciaires...</p>';

  try {
    const { data, error } = await supabaseClient
      .from('articles')
      .select('*')
      .eq('categorie', 'Justice') // Filtre précisément sur la catégorie Justice
      .order('published_at', { ascending: false });

    if (error) throw error;
    
    if (!data || data.length === 0) {
      container.innerHTML = '<p class="text-gray-500 col-span-full text-center py-10">Aucun article trouvé dans la catégorie Justice.</p>';
      return;
    }

    container.innerHTML = '';
    
    data.forEach(article => {
      const card = document.createElement('article');
      // On utilise les mêmes classes que pour Politique pour garder le design
      card.className = 'article-card bg-white border rounded shadow-sm hover:shadow-md transition overflow-hidden flex flex-col';

      // Gestion de l'image (Image par défaut si vide)
      const imgUrl = article.image_url || article.image || 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=800';
      const excerpt = article.excerpt || article.chapo || '';
      const published = article.published_at ? new Date(article.published_at).toLocaleDateString('fr-FR') : '';

      card.innerHTML = `
        <a href="article-details.html?id=${article.id}" class="block flex-grow">
          <img src="${imgUrl}" class="w-full h-48 object-cover" alt="${escapeHtml(article.title)}">
          <div class="p-4">
             <div class="flex items-center mb-2">
                <span class="bg-orange-media text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">Justice</span>
             </div>
            <h3 class="font-bold text-base md:text-lg leading-tight text-gray-900 hover:text-orange-media transition">${escapeHtml(article.title || 'Titre')}</h3>
            <p class="text-[10px] text-gray-400 mt-2 uppercase font-semibold italic">${published} • Par ${article.author || 'Rédaction'}</p>
            <p class="text-sm text-gray-600 mt-3 line-clamp-3">${escapeHtml(excerpt)}</p>
          </div>
        </a>
      `;
      container.appendChild(card);
    });
  } catch (err) {
    console.error(err);
    container.innerHTML = '<p class="text-red-500 col-span-full text-center py-10">Erreur lors du chargement des articles de justice.</p>';
  }
});

/**
 * Utilitaire pour sécuriser l'affichage du texte
 */
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}