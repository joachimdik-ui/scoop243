/**
 * Script pour scoop243.net
 * Gère l'interactivité, le menu mobile et les animations de scroll
 */

document.addEventListener('DOMContentLoaded', () => {

    // 1. GESTION DU MENU STICKY (Effet au défilement)
    const nav = document.querySelector('.main-nav');
    const header = document.querySelector('.site-header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > header.offsetHeight) {
            nav.classList.add('shadow-lg', 'bg-opacity-95');
            // Optionnel : réduire un peu la hauteur du menu au scroll
            nav.style.padding = '5px 0';
        } else {
            nav.classList.remove('shadow-lg', 'bg-opacity-95');
            nav.style.padding = '0';
        }
    });

    // 2. MENU MOBILE (Toggle)
    // Ajout dynamique d'un bouton burger pour les petits écrans
    const navContainer = document.querySelector('.nav-container');
    const navLinks = document.querySelector('.nav-links');
    
    const burger = document.createElement('div');
    burger.innerHTML = '<i class="fas fa-bars"></i>';
    burger.className = 'mobile-burger md:hidden text-white text-2xl cursor-pointer p-4';
    
    // On insère le burger avant les liens sur mobile
    if (window.innerWidth < 768) {
        navContainer.prepend(burger);
    }

    burger.addEventListener('click', () => {
        navLinks.classList.toggle('active-menu');
        // Animation de l'icône
        const icon = burger.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });

    // 3. ANIMATION D'APPARITION (Intersection Observer)
    // Fait apparaître les articles avec un léger fondu quand on défile
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const articles = document.querySelectorAll('.article-card');
    articles.forEach(article => {
        // État initial pour l'animation
        article.style.opacity = '0';
        article.style.transform = 'translateY(20px)';
        article.style.transition = 'all 0.6s ease-out';
        observer.observe(article);
    });

    // 4. GESTION DES FLÈCHES DE LA SIDEBAR (Justice/Culture)
    // Simule le changement de news dans les petits blocs
    const upBtn = document.querySelector('.fa-chevron-up');
    const downBtn = document.querySelector('.fa-chevron-down');
    
    if (upBtn && downBtn) {
        [upBtn, downBtn].forEach(btn => {
            btn.addEventListener('click', () => {
                const container = btn.closest('.sidebar-section').querySelector('.p-4');
                container.style.opacity = '0.5';
                setTimeout(() => {
                    container.style.opacity = '1';
                    // Ici on pourrait charger dynamiquement d'autres news via une API
                    console.log("Chargement de la news suivante...");
                }, 300);
            });
        });
    }

    // 5. RECHERCHE (Animation de l'input)
    const searchIcon = document.querySelector('.fa-search');
    searchIcon.addEventListener('click', () => {
        const query = prompt("Rechercher un article sur scoop243.net :");
        if (query) {
            alert("Recherche en cours pour : " + query);
        }
    });

});// Fonction pour mettre à jour l'horloge
function demarrerHorloge() {
    const afficheurHorloge = document.getElementById('live-clock');
    
    if (afficheurHorloge) { // On vérifie que l'élément existe pour éviter les erreurs
        setInterval(() => {
            const maintenant = new Date();
            
            // On récupère heures, minutes, secondes
            const h = String(maintenant.getHours()).padStart(2, '0');
            const m = String(maintenant.getMinutes()).padStart(2, '0');
            const s = String(maintenant.getSeconds()).padStart(2, '0');
            
            // On affiche le résultat
            afficheurHorloge.textContent = `${h}:${m}:${s}`;
        }, 1000);
    }
}

// On lance la fonction
demarrerHorloge();