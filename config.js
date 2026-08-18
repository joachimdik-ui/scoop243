/**
 * config.js
 * Configuration centralisée de Supabase pour le site
 * Remplacez les valeurs par vos identifiants Supabase
 */

const SUPABASE_CONFIG = {
  URL: 'https://qkzzhjeeuierlqkqexrf.supabase.co',
  ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFrenpoamVldWllcmxxa3FleHJmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg4NTY4OTgsImV4cCI6MjA4NDQzMjg5OH0.jISmx5PBs99hCVUCziJZBdjS9xI5vfKmII3TaJ1zVu4'
};

// Initialiser le client Supabase
const supabaseClient = window.supabase 
  ? supabase.createClient(SUPABASE_CONFIG.URL, SUPABASE_CONFIG.ANON_KEY)
  : null;

  /**
 * GESTION DE LA RECHERCHE SCOOP243
 */
document.addEventListener('DOMContentLoaded', () => {
    // On cible le champ de saisie et le bouton par leurs IDs
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');

    if (searchInput && searchBtn) {
        // Fonction qui lance la redirection
        const lancerRecherche = () => {
            const motCle = searchInput.value.trim();
            if (motCle.length > 0) {
                // Redirige vers la page de résultats avec le mot-clé dans l'URL
                window.location.href = `search-results.html?q=${encodeURIComponent(motCle)}`;
            }
        };

        // Écoute du clic sur le bouton "OK"
        searchBtn.addEventListener('click', lancerRecherche);

        // Écoute de la touche "Entrée" sur le clavier
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                lancerRecherche();
            }
        });
    }
});