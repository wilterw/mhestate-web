/* =========================================
   ASSETS/JS/COMPONENTS.JS - CARGA MODULAR Y LÓGICA RENTALS
   ========================================= */

document.addEventListener("DOMContentLoaded", async () => {
    // 1. Cargar Header y Footer
    await Promise.all([
        loadComponent("header-placeholder", "components/header.html"),
        loadComponent("footer-placeholder", "components/footer.html", initFooterLogic) // Callback agregado aquí
    ]);

    // 2. Inicializar UI
    highlightCurrentPage();
    updateActiveLangButton(); 

    // 3. Re-traducir
    const currentLang = localStorage.getItem('preferredLang') || 'es';
    if (typeof setLanguage === 'function') {
        setLanguage(currentLang);
    }
});

// ESCUCHADOR DE EVENTO
window.addEventListener('languageChanged', (e) => {
    updateActiveLangButton();
});

/**
 * Carga de HTML externo
 */
async function loadComponent(placeholderId, url, callback) {
    const placeholder = document.getElementById(placeholderId);
    if (!placeholder) return;

    try {
        // Timestamp para evitar caché
        const noCacheUrl = `${url}?v=${Date.now()}`; 
        const response = await fetch(noCacheUrl);
        
        if (!response.ok) throw new Error(`No se pudo cargar ${url} (Status: ${response.status})`);
        
        const html = await response.text();
        placeholder.innerHTML = html;

        // Ejecutar lógica específica si existe (como la del footer)
        if (callback) callback();

    } catch (err) {
        console.error(`Error cargando componente ${url}:`, err);
    }
}

/**
 * LÓGICA ESPECÍFICA DEL FOOTER (CAMBIO DE CORREO EN RENT)
 */
function initFooterLogic() {
    // Detectamos si la URL contiene "rent.html"
    if (window.location.pathname.includes('rent.html')) {
        const emailLink = document.getElementById('footer-email-link');
        
        if (emailLink) {
            // 1. Cambiamos el enlace
            emailLink.href = "mailto:rentals@mhestate.es";
            
            // 2. Cambiamos el texto visible
            emailLink.textContent = "rentals@mhestate.es";
            
            // 3. Quitamos el atributo de traducción para que no se revierta
            emailLink.removeAttribute('data-i18n');
        }
    }
    
    // Actualizar año automáticamente
    const yearSpan = document.getElementById('year'); // Si añades un span con id="year" en el footer
    if(yearSpan) {
        yearSpan.innerText = new Date().getFullYear();
    }
}

/**
 * Marca página activa
 */
function highlightCurrentPage() {
    const currentPath = window.location.pathname.split("/").pop() || "index.html";
    const links = document.querySelectorAll("nav a, .mobile-links a");
    
    links.forEach(link => {
        const linkPath = link.getAttribute("href");
        if (linkPath === currentPath) {
            link.classList.add("active");
        }
    });
}

/**
 * Actualiza el texto del botón de idioma
 */
function updateActiveLangButton() {
    const currentLang = localStorage.getItem('preferredLang') || 'es';
    const langBtn = document.getElementById('current-lang-btn');
    if (langBtn) {
        langBtn.textContent = currentLang.toUpperCase() + ' ▾';
    }
}

/**
 * Menú Móvil
 */
window.toggleMenu = function() {
    const menu = document.getElementById('mobile-menu');
    if (menu) {
        menu.classList.toggle('open');
        document.body.style.overflow = menu.classList.contains('open') ? 'hidden' : '';
    }
};