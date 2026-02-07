// Gestion de la recherche fonctionnelle
document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');

    if (!searchForm || !searchInput) return;

    searchForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const query = searchInput.value.trim();
        
        if (!query) {
            alert('Veuillez entrer un terme de recherche');
            return;
        }

        // Utiliser l'API Supabase pour rechercher
        try {
            const { data: articles, error } = await supabase
                .from('articles')
                .select('*')
                .or(`title.ilike.%${query}%,content.ilike.%${query}%`)
                .limit(10);

            if (error) {
                console.error('Erreur de recherche:', error);
                alert('Erreur lors de la recherche');
                return;
            }

            if (articles && articles.length > 0) {
                // Rediriger vers le premier article trouvé
                const article = articles[0];
                window.location.href = `article-details.html?id=${article.id}`;
            } else {
                alert('Aucun article trouvé pour votre recherche');
            }
        } catch (error) {
            console.error('Erreur:', error);
            // Fallback: recherche simple dans la page
            performLocalSearch(query);
        }
    });

    // Recherche locale comme fallback
    function performLocalSearch(query) {
        const lowerQuery = query.toLowerCase();
        const articles = document.querySelectorAll('[data-article-id]');
        
        if (articles.length === 0) {
            alert('Aucun article trouvé');
            return;
        }

        for (let article of articles) {
            const title = article.querySelector('h3, h2')?.textContent || '';
            const content = article.textContent || '';
            
            if (title.toLowerCase().includes(lowerQuery) || content.toLowerCase().includes(lowerQuery)) {
                const link = article.querySelector('a');
                if (link && link.href) {
                    window.location.href = link.href;
                    return;
                }
            }
        }
        
        alert('Aucun article trouvé pour votre recherche');
    }

    // Ajouter le support de la recherche par Enter
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchForm.dispatchEvent(new Event('submit'));
        }
    });
});
