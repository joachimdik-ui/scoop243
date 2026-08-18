/**
 * flash.js - Gestion des messages d'alerte en temps réel
 */
async function fetchFlashNews() {
    const flashContainer = document.getElementById('flash-container');
    const flashText = document.getElementById('flash-text');

    if (!supabaseClient) return;

    try {
        // On récupère le dernier message actif
        const { data, error } = await supabaseClient
            .from('flash_news')
            .select('content')
            .eq('is_active', true)
            .order('created_at', { ascending: false })
            .limit(1)
            .single();

        if (error) throw error;

        if (data && data.content) {
            flashText.innerText = data.content;
            flashContainer.classList.remove('hidden');
        } else {
            flashContainer.classList.add('hidden');
        }
    } catch (err) {
        console.error("Erreur Flash News:", err.message);
        flashContainer.classList.add('hidden');
    }
}

// Lancer au chargement
document.addEventListener('DOMContentLoaded', fetchFlashNews);