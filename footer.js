/**
 * footer.js
 * Script pour charger et gérer le footer sur toutes les pages
 */

function loadFooter() {
  const footerHTML = `
    <footer class="bg-zinc-900 text-gray-400 mt-12 py-8 px-4">
        <div class="container mx-auto">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8 text-[11px] md:text-sm">
                
                <!-- Qui sommes-nous -->
                <div>
                    <h4 class="text-white font-bold mb-4 text-base">Qui sommes-nous</h4>
                    <p class="text-gray-400 leading-relaxed mb-3">scoop243.net est votre source d'information indépendante et fiable sur l'actualité en République Démocratique du Congo. Nous nous engageons à apporter des informations vérifiées et pertinentes.</p>
                    <a href="about.html" class="text-orange-media hover:underline font-bold text-xs">En savoir plus →</a>
                </div>
                
                <!-- Rubriques -->
                <div>
                    <h4 class="text-white font-bold mb-4 text-base">Rubriques</h4>
                    <ul class="space-y-2 text-gray-400">
                        <li><a href="politique.html" class="hover:text-orange-media transition">Politique</a></li>
                        <li><a href="economie.html" class="hover:text-orange-media transition">Économie</a></li>
                        <li><a href="sports.html" class="hover:text-orange-media transition">Sports</a></li>
                        <li><a href="culture.html" class="hover:text-orange-media transition">Culture</a></li>
                        <li><a href="faits_divers.html" class="hover:text-orange-media transition">Faits divers</a></li>
                        <li><a href="religion.html" class="hover:text-orange-media transition">Religion</a></li>
                    </ul>
                </div>
                
                <!-- Pages -->
                <div>
                    <h4 class="text-white font-bold mb-4 text-base">Pages</h4>
                    <ul class="space-y-2 text-gray-400">
                        <li><a href="index.html" class="hover:text-orange-media transition">Accueil</a></li>
                        <li><a href="about.html" class="hover:text-orange-media transition">À propos</a></li>
                        <li><a href="contact.html" class="hover:text-orange-media transition">Contact</a></li>
                        <li><a href="conditions.html" class="hover:text-orange-media transition">Conditions</a></li>
                        <li><a href="privacy.html" class="hover:text-orange-media transition">Confidentialité</a></li>
                    </ul>
                </div>
                
                <!-- Réseaux sociaux -->
                <div>
                    <h4 class="text-white font-bold mb-4 text-base">Suivez-nous</h4>
                    <div class="flex gap-4 text-lg mb-4">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-orange-media transition"><i class="fab fa-facebook"></i></a>
                        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-orange-media transition"><i class="fab fa-youtube"></i></a>
                        <a href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-orange-media transition"><i class="fab fa-tiktok"></i></a>
                    </div>
                </div>
                
                <!-- Contact -->
                <div>
                    <h4 class="text-white font-bold mb-4 text-base">Contact</h4>
                    <ul class="space-y-3 text-gray-400">
                        <li class="flex items-start gap-2">
                            <i class="fas fa-envelope text-orange-media mt-0.5 min-w-max"></i>
                            <a href="mailto:info@scoop243.net" class="hover:text-orange-media transition">info@scoop243.net</a>
                        </li>
                        <li class="flex items-start gap-2">
                            <i class="fas fa-phone text-orange-media mt-0.5 min-w-max"></i>
                            <a href="tel:+243123456789" class="hover:text-orange-media transition">+243 (0) 123 456 789</a>
                        </li>
                        <li class="flex items-start gap-2">
                            <i class="fas fa-map-marker-alt text-orange-media mt-0.5 min-w-max"></i>
                            <span>Kinshasa, RDC</span>
                        </li>
                    </ul>
                </div>
            </div>
            
            <!-- Ligne de séparation -->
            <div class="border-t border-gray-700 pt-6 text-center text-[10px] text-gray-500">
                <p>&copy; 2026 scoop243.net - Tous droits réservés. | <a href="conditions.html" class="hover:text-orange-media transition">Conditions</a> | <a href="privacy.html" class="hover:text-orange-media transition">Politique de confidentialité</a></p>
            </div>
        </div>
    </footer>
  `;
  
  return footerHTML;
}

// Fonction pour injecter le footer sur toutes les pages
document.addEventListener('DOMContentLoaded', () => {
  // Cherche s'il y a un élément footer vide ou un conteneur pour le footer
  const footer = document.querySelector('footer');
  
  // Si un footer existe, on remplace son contenu
  if (footer) {
    footer.parentElement.replaceChild(
      new DOMParser().parseFromString(loadFooter(), 'text/html').body.firstChild,
      footer
    );
  } else {
    // Sinon on l'ajoute avant la fin du body
    document.body.insertAdjacentHTML('beforeend', loadFooter());
  }
});
