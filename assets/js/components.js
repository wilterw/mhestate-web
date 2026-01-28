/* =========================================
   ASSETS/JS/COMPONENTS.JS - CARGA MODULAR Y UI
   ========================================= */

document.addEventListener("DOMContentLoaded", async () => {
    // 1. Cargar Header y Footer
    // CAMBIO: Añadida la barra '/' al inicio para asegurar la ruta absoluta
    await Promise.all([
        loadComponent("header-placeholder", "/components/header.html"),
        loadComponent("footer-placeholder", "/components/footer.html")
    ]);

    // 2. Inicializar UI
    highlightCurrentPage();
    updateActiveLangButton(); // Actualizar botón al cargar

    // 3. Re-traducir elementos recién cargados
    const currentLang = localStorage.getItem('preferredLang') || 'es';
    if (typeof setLanguage === 'function') {
        // No llamamos a setLanguage aquí para evitar bucle infinito si ya se cargó,
        // pero sí forzamos la traducción de la página si es necesario.
        // Mejor opción: Disparar evento de traducción manual o llamar al traductor.
        // Dado que i18n ya corre, simplemente invocamos setLanguage que refresca todo.
        setLanguage(currentLang);
    }
});

// ESCUCHADOR DE EVENTO: Esto arregla el problema del botón "atascado"
window.addEventListener('languageChanged', (e) => {
    updateActiveLangButton();
});

/**
 * Carga de HTML externo
 */
async function loadComponent(placeholderId, url) {
    const placeholder = document.getElementById(placeholderId);
    if (!placeholder) return;

    try {
        // Agregamos un timestamp para evitar caché en los componentes también (?v=...)
        const noCacheUrl = `${url}?v=${Date.now()}`; 
        const response = await fetch(noCacheUrl);
        
        if (!response.ok) throw new Error(`No se pudo cargar ${url} (Status: ${response.status})`);
        
        const html = await response.text();
        placeholder.innerHTML = html;
    } catch (err) {
        console.error(`Error cargando componente ${url}:`, err);
        // Opcional: Mostrar error visual si falla
        // placeholder.innerHTML = "";
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
 * Actualiza el texto del botón de idioma (ES ▾ / EN ▾ / SV ▾)
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