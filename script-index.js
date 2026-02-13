/**
 * script-index.js
 * Charge les articles depuis Supabase pour la page d'accueil
 * Charge aussi les articles populaires et les publicités
 */
document.addEventListener('DOMContentLoaded', async () => {
  if (!supabaseClient) {
    console.error('Client Supabase non initialisé');
    return;
  }

  const featuredArticle = document.getElementById('featured-article');
  const featuredImg = document.getElementById('featured-img');
  const featuredTitle = document.getElementById('featured-title');
  const container = document.getElementById('articles-container');
  const popularContainer = document.getElementById('popular-articles');
  const adsContainer = document.getElementById('ads-container');

  try {
    // Récupérer les 5 derniers articles
    const { data: allArticles, error } = await supabaseClient
      .from('articles')
      .select('*')
      .order('published_at', { ascending: false })
      .limit(5);

    if (error) throw error;
    if (!allArticles || allArticles.length === 0) {
      container.innerHTML = '<p class="text-gray-500 col-span-2">Aucun article trouvé.</p>';
      return;
    }

    // Article en vedette (le premier)
// On récupère le container qui va recevoir les 3 articles
const featuredContainer = document.getElementById('une-container'); 

if (allArticles.length > 0 && featuredContainer) {
    // On vide le container au cas où il y aurait du texte "Chargement..."
    featuredContainer.innerHTML = '';

    // On prend les 3 premiers articles du tableau
    const top3 = allArticles.slice(0, 3);

    top3.forEach(article => {
        const imgUrl = article.image_url || article.image || 'https://via.placeholder.com/600x400';
        const articleTitle = article.title || 'Sans titre';
        
        // On crée la structure HTML pour chaque article
        featuredContainer.innerHTML += `
            <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                <img src="${imgUrl}" alt="${articleTitle}" class="w-full h-48 object-cover">
                <div class="p-4">
                    <span class="text-orange-500 text-xs font-bold uppercase">${article.category || 'Actualité'}</span>
                    <h3 class="font-bold text-lg mt-1 line-clamp-2">${articleTitle}</h3>
                    <a href="article-details.html?title=${encodeURIComponent(articleTitle)}" 
                       class="inline-block mt-4 text-slate-900 font-bold hover:underline">
                        Lire la suite →
                    </a>
                </div>
            </div>
        `;
    });
}
    }

    // Autres articles (2 à 5)
    container.innerHTML = '';
    allArticles.slice(1, 5).forEach(article => {
      const card = document.createElement('article');
      card.className = 'article-card bg-white border rounded shadow-sm hover:shadow-md transition overflow-hidden';

      const imgUrl = article.image_url || article.image || 'https://via.placeholder.com/800x450';
      const excerpt = article.excerpt || article.chapo || '';
      const published = article.published_at 
        ? new Date(article.published_at).toLocaleString('fr-FR', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })
        : '';

      card.innerHTML = `
        <a href="article-details.html?title=${encodeURIComponent(article.title)}" class="block">
          <img src="${imgUrl}" class="w-full h-40 object-cover" alt="">
          <div class="p-4">
            <h3 class="font-bold text-base md:text-lg leading-tight">${escapeHtml(article.title || 'Titre')}</h3>
            <p class="text-[10px] text-gray-400 mt-2 uppercase">${article.categorie || 'Actu'} • ${published}</p>
            ${excerpt ? `<p class="text-sm text-gray-600 mt-2">${escapeHtml(excerpt)}</p>` : ''}
          </div>
        </a>
      `;
      container.appendChild(card);
    });

    // Helper pour charger articles par catégorie dans des containers dédiés
    async function loadCategory(categoryName, containerId, limit = 4) {
      const containerEl = document.getElementById(containerId);
      if (!containerEl) return;
      containerEl.innerHTML = '';
      try {
        const { data: catArticles, error: catError } = await supabaseClient
          .from('articles')
          .select('*')
          .eq('categorie', categoryName)
          .order('published_at', { ascending: false })
          .limit(limit);

        if (catError) throw catError;
        if (!catArticles || catArticles.length === 0) {
          containerEl.innerHTML = '<p class="text-xs text-gray-400">Aucun article.</p>';
          return;
        }

        catArticles.forEach(article => {
          const published = article.published_at ? new Date(article.published_at).toLocaleDateString('fr-FR') : '';
          const thumb = article.image_url || article.image || 'https://via.placeholder.com/300x180';
          const item = document.createElement('div');
          item.className = 'flex gap-3 items-start';
          item.innerHTML = `
            <img src="${thumb}" class="w-20 h-14 object-cover rounded" alt="">
            <div class="flex-1">
              <a href="article-details.html?title=${encodeURIComponent(article.title)}" class="font-bold text-sm hover:text-orange-media transition line-clamp-2">${escapeHtml(article.title || '')}</a>
              <div class="text-[10px] text-gray-500 mt-1">${published}</div>
            </div>
          `;
          containerEl.appendChild(item);
        });

      } catch (e) {
        console.error('Erreur chargement catégorie', categoryName, e);
        const containerEl = document.getElementById(containerId);
        if (containerEl) containerEl.innerHTML = '<p class="text-xs text-red-500">Erreur.</p>';
      }
    }

    // Charger les articles populaires (triés par views)
    const { data: popularArticles, error: popError } = await supabaseClient
      .from('articles')
      .select('*')
      .order('views', { ascending: false })
      .limit(5);

    if (!popError && popularArticles && popularArticles.length > 0) {
      popularContainer.innerHTML = '';
      popularArticles.forEach((article, index) => {
        const views = article.views || 0;
        const div = document.createElement('div');
        div.className = 'flex gap-3 items-start pb-3 border-b border-gray-700 last:border-b-0 last:pb-0';
        div.innerHTML = `
          <span class="text-orange-media font-black text-lg italic min-w-max">${String(index + 1).padStart(2, '0')}</span>
          <a href="article-details.html?title=${encodeURIComponent(article.title)}" class="text-xs font-bold hover:text-orange-media transition line-clamp-2">
            ${escapeHtml(article.title || 'Titre')}
          </a>
          <span class="text-[10px] text-gray-500 ml-auto min-w-max">${views} <i class="fas fa-eye"></i></span>
        `;
        popularContainer.appendChild(div);
      });
    } else {
      popularContainer.innerHTML = '<p class="text-xs text-gray-400 text-center py-4">Aucun article populaire.</p>';
    }

    // Charger les publicités
    const { data: ads, error: adsError } = await supabaseClient
      .from('ads')
      .select('*')
      .eq('active', true)
      .order('position', { ascending: true });

    if (!adsError && ads && ads.length > 0) {
      adsContainer.innerHTML = '';
      ads.forEach(ad => {
        const adDiv = document.createElement('div');
        adDiv.className = 'bg-white border border-gray-200 rounded shadow-sm overflow-hidden';
        
        // Choisir l'URL de l'image dans l'ordre: image_url, image, content, link (si image), sinon placeholder
        let imgUrl = '';
        if (ad.image_url) imgUrl = ad.image_url;
        else if (ad.image) imgUrl = ad.image;
        else if (ad.content && ad.type === 'image') imgUrl = ad.content;
        else if (ad.link && (ad.link.endsWith('.jpg') || ad.link.endsWith('.png') || ad.link.endsWith('.webp') || ad.link.endsWith('.gif'))) imgUrl = ad.link;
        else imgUrl = 'https://via.placeholder.com/280x280?text=Pub';
        
        adDiv.innerHTML = `
          <div class="w-full">
            <img src="${imgUrl}" alt="${escapeHtml(ad.title)}" class="w-full h-96 object-cover">
          </div>
        `;
        
        adsContainer.appendChild(adDiv);
      });
    } else {
      // Afficher une publicité par défaut si aucune n'est trouvée
      if (!adsError) {
        const defaultAd = document.createElement('div');
        defaultAd.className = 'bg-gradient-to-br from-blue-50 to-blue-100 border-l-4 border-blue-500 rounded shadow-sm p-4 text-center';
        defaultAd.innerHTML = `
          <p class="text-xs text-gray-600 italic">Espace publicitaire disponible</p>
        `;
        adsContainer.appendChild(defaultAd);
      }
    }

      // Charger les articles par catégorie (section homepage)
      await Promise.all([
        loadCategory('Politique', 'cat-politique', 4),
        loadCategory('Economie', 'cat-economie', 4),
        loadCategory('Sport', 'cat-sports', 4),
        loadCategory('Culture', 'cat-culture', 4),
        loadCategory('Faits_divers', 'cat-faits_divers', 4),
        loadCategory('Religion', 'cat-religion', 4),
      ]);

      // Charger les vidéos depuis la table `videos` et afficher des vignettes YouTube
      async function loadVideos(limit = 6) {
        const thumbsContainer = document.getElementById('video-thumbs');
        if (!thumbsContainer) return;
        thumbsContainer.innerHTML = '<p class="text-xs text-gray-400">Chargement des vidéos...</p>';

        try {
          const { data: videos, error: vidError } = await supabaseClient
            .from('videos')
            .select('*')
            .eq('active', true)
            .order('published_at', { ascending: false })
            .limit(limit);

          if (vidError) throw vidError;
          if (!videos || videos.length === 0) {
            thumbsContainer.innerHTML = '<p class="text-xs text-gray-400">Aucune vidéo disponible.</p>';
            return;
          }

          thumbsContainer.innerHTML = '';
          videos.forEach(v => {
            // Déduire l'ID YouTube
            const url = (v.youtube_url || '').trim();
            const ytIdMatch = url.match(/(?:v=|youtu\.be\/|embed\/)([A-Za-z0-9_-]{11})/);
            const ytId = ytIdMatch ? ytIdMatch[1] : null;
            const thumb = v.thumbnail_url || (ytId ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg` : 'https://via.placeholder.com/320x180?text=Video');

            const card = document.createElement('div');
            card.className = 'relative cursor-pointer overflow-hidden rounded';
            card.innerHTML = `
            <img src="${thumb}" alt="${escapeHtml(v.title)}" class="w-full h-48 object-cover">
            <div class="absolute inset-0 bg-black/30 flex items-center justify-center transition">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-white drop-shadow-lg" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
              </div>
            `;

            card.addEventListener('click', () => {
              if (!ytId) return;
              openVideoModal(ytId);
            });

            thumbsContainer.appendChild(card);
          });

        } catch (e) {
          console.error('Erreur chargement vidéos', e);
          thumbsContainer.innerHTML = '<p class="text-xs text-red-500">Erreur lors du chargement des vidéos.</p>';
        }
      }

      // Modal player: créé à la demande et réutilisé
      function openVideoModal(ytId) {
        let modal = document.getElementById('video-modal');
        if (!modal) {
          modal = document.createElement('div');
          modal.id = 'video-modal';
          modal.className = 'fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4';
          modal.innerHTML = `
            <div class="bg-black max-w-4xl w-full aspect-video relative">
              <button id="video-modal-close" class="absolute top-2 right-2 text-white bg-black/40 rounded-full p-2">✕</button>
              <iframe id="video-modal-iframe" class="w-full h-full" src="" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
          `;
          document.body.appendChild(modal);
          modal.querySelector('#video-modal-close').addEventListener('click', closeVideoModal);
          modal.addEventListener('click', (ev) => { if (ev.target === modal) closeVideoModal(); });
        }
        const iframe = document.getElementById('video-modal-iframe');
        iframe.src = `https://www.youtube.com/embed/${ytId}?autoplay=1&mute=1&rel=0&modestbranding=1`;
        modal.style.display = 'flex';
      }

      function closeVideoModal() {
        const modal = document.getElementById('video-modal');
        if (!modal) return;
        const iframe = document.getElementById('video-modal-iframe');
        if (iframe) iframe.src = '';
        modal.style.display = 'none';
      }

      // Lancer le chargement des vidéos
      loadVideos(4);

  } catch (err) {
    console.error('Erreur lors du chargement des articles:', err);
    container.innerHTML = '<p class="text-red-500 col-span-2">Erreur lors du chargement des articles.</p>';
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
