/* =========================================
   ASSETS/JS/COMPONENTS.JS - V2.1 (FOOTER ISIDORA RENT/RENT-HOME)
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
    // Re-aplicar lógica de footer por si la traducción reinicia los textos
    setTimeout(initFooterLogic, 50);
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
 * LÓGICA ESPECÍFICA DEL FOOTER (CAMBIO DE CORREO/TELÉFONO EN RENT Y RENT-HOME)
 */
function initFooterLogic() {
    const path = window.location.pathname;
    // Detectamos si la URL contiene "rent.html" O "rent-home.html"
    if (path.includes('rent.html') || path.includes('rent-home.html')) {
        
        const footerPlaceholder = document.getElementById('footer-placeholder');
        
        if (footerPlaceholder) {
            // 1. Cambiamos EMAIL (rentals@mhestate.es)
            const emailLinks = footerPlaceholder.querySelectorAll('a[href^="mailto:"]');
            emailLinks.forEach(link => {
                link.href = "mailto:rentals@mhestate.es";
                link.textContent = "rentals@mhestate.es";
                link.removeAttribute('data-i18n'); // Bloquear traducción
            });

            // 2. Cambiamos TELÉFONO (+34 695 91 96 86)
            const phoneLinks = footerPlaceholder.querySelectorAll('a[href^="tel:"]');
            phoneLinks.forEach(link => {
                link.href = "tel:+34695919686";
                link.textContent = "+34 695 91 96 86";
                link.removeAttribute('data-i18n'); // Bloquear traducción
            });
        }
    }
    
    // Actualizar año automáticamente
    const yearSpan = document.getElementById('year'); 
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