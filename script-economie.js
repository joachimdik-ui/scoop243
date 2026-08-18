/**
 * script-economie.js
 * Charge les articles de la catégorie "Économie" depuis Supabase
 */

document.addEventListener('DOMContentLoaded', async () => {
  if (!supabaseClient) {
    console.error('Supabase client not initialized');
    return;
  }

  const container = document.getElementById('articles-container');
  if (!container) return;

  container.innerHTML = '<p class="text-gray-500 col-span-1">Chargement...</p>';

  try {
    const { data, error } = await supabaseClient
      .from('articles')
      .select('*')
      .eq('categorie', 'Economie')
      .order('published_at', { ascending: false });

    if (error) throw error;
    if (!data || data.length === 0) {
      container.innerHTML = '<p class="text-gray-500 col-span-1">Aucun article trouvé pour cette catégorie.</p>';
      return;
    }

    container.innerHTML = '';
    data.forEach(article => {
      const card = document.createElement('article');
      card.className = 'article-card bg-white border rounded shadow-sm hover:shadow-md transition overflow-hidden';
      const imgUrl = article.image_url || article.image || 'https://via.placeholder.com/800x450?text=No+Image';
      const excerpt = article.excerpt || article.chapo || '';
      const published = article.published_at ? new Date(article.published_at).toLocaleString('fr-FR') : '';

      card.innerHTML = `
        <a href="article-details.html?title=${encodeURIComponent(article.title)}" class="block">
          <img src="${imgUrl}" class="w-full h-40 object-cover">
          <div class="p-4">
            <h3 class="font-bold text-base md:text-lg leading-tight">${escapeHtml(article.title || 'Titre')}</h3>
            <p class="text-[10px] text-gray-400 mt-2 uppercase">${article.categorie || 'Économie'} • ${published}</p>
            <p class="text-sm text-gray-600 mt-2">${escapeHtml(excerpt)}</p>
          </div>
        </a>
      `;
      container.appendChild(card);
    });
  } catch (err) {
    console.error(err);
    container.innerHTML = '<p class="text-red-500 col-span-1">Erreur lors du chargement des articles.</p>';
  }
});

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
