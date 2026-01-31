/* =========================================
   ASSETS/JS/ARTICLE-LOADER.JS
   Cargador automático de Noticias y Guías
   ========================================= */

class ArticleLoader {
    constructor() {
        this.itemsPerPage = 5; // Configuración: 5 por página
        this.init();
    }

    init() {
        // Ordenar por fecha (más reciente primero)
        this.sortedDB = articlesDB.sort((a, b) => new Date(b.date) - new Date(a.date));

        // 1. Detectar si estamos en NEWS.HTML
        const newsPageContainer = document.getElementById('news-container-dynamic');
        if (newsPageContainer) {
            this.renderPagination('news', newsPageContainer, 'news-list');
        }

        // 2. Detectar si estamos en GUIDES.HTML
        const guidesPageContainer = document.getElementById('guides-container-dynamic');
        if (guidesPageContainer) {
            this.renderPagination('guide', guidesPageContainer, 'guide-grid');
        }

        // 3. Detectar si estamos en GUIDE-NEWS.HTML (Home mixta)
        const homeNewsContainer = document.getElementById('home-news-dynamic');
        const homeGuidesContainer = document.getElementById('home-guides-dynamic');
        
        if (homeNewsContainer || homeGuidesContainer) {
            this.renderHomeMixed(homeNewsContainer, homeGuidesContainer);
        }
    }

    // --- RENDER HOME MIXTO (3 items) ---
    renderHomeMixed(newsContainer, guidesContainer) {
        if (guidesContainer) {
            // Tomar las 3 últimas guías
            const topGuides = this.sortedDB.filter(i => i.type === 'guide').slice(0, 3);
            // Usar formato 'info-card' (el que usa guide-news.html)
            this.renderItems(topGuides, guidesContainer, 'info-card');
        }

        if (newsContainer) {
            // Tomar las 3 últimas noticias
            const topNews = this.sortedDB.filter(i => i.type === 'news').slice(0, 3);
            // Usar formato 'news-item' (el que usa news.html)
            this.renderItems(topNews, newsContainer, 'news-item');
        }
        
        this.triggerTranslation();
    }

    // --- RENDER PAGINACIÓN (5 items) ---
    renderPagination(type, container, layoutType) {
        // Filtrar
        const items = this.sortedDB.filter(i => i.type === type);
        
        // Paginación simple (Cargar primera página por defecto)
        // Nota: Para simplificar, cargamos los primeros 5. Si necesitas botones "Siguiente", avísame.
        const pageItems = items.slice(0, this.itemsPerPage);

        // Renderizar según el tipo de layout exacto
        if (layoutType === 'news-list') {
            this.renderItems(pageItems, container, 'news-item');
        } else if (layoutType === 'guide-grid') {
            this.renderItems(pageItems, container, 'guide-item');
        }

        // Si hay más items, se podría agregar botón "Ver más" aquí
        this.triggerTranslation();
    }

    // --- GENERADOR DE HTML ---
    renderItems(items, container, templateType) {
        container.innerHTML = ''; // Limpiar

        items.forEach((item, index) => {
            // Retraso para animación (delay-1, delay-2...)
            const delayClass = `delay-${(index % 3) + 1}`;
            
            // Detectar si usamos i18n o texto directo (del generador)
            const titleAttr = item.isDirectText ? '' : `data-i18n="${item.titleKey}"`;
            const titleText = item.isDirectText ? item.titleKey : 'Loading title...';
            const descAttr = item.isDirectText ? '' : `data-i18n="${item.descKey}"`;
            const descText = item.isDirectText ? item.descKey : 'Loading description...';

            let html = '';

            // -----------------------------------------------------
            // TEMPLATE 1: NEWS ITEM (Para News.html y Guide-News News)
            // -----------------------------------------------------
            if (templateType === 'news-item') {
                html = `
                <a href="${item.link}" style="text-decoration: none; color: inherit; display: contents;">
                    <article class="news-item animate-up ${delayClass}">
                        <div class="news-img-box">
                            <img src="${item.image}" alt="News Image">
                        </div>
                        <div class="news-text-content">
                            <span class="news-tag">NEWS</span>
                            <h3 ${titleAttr}>${titleText}</h3>
                            <p ${descAttr}>${descText}</p>
                        </div>
                        <div class="news-spacer"></div>
                    </article>
                </a>`;
            }

            // -----------------------------------------------------
            // TEMPLATE 2: GUIDE ITEM (Para Guides.html)
            // Estructura: guide-img-box, guide-text-content
            // -----------------------------------------------------
            else if (templateType === 'guide-item') {
                html = `
                <a href="${item.link}" style="text-decoration: none; color: inherit; display: contents;">
                    <article class="guide-item animate-up ${delayClass}">
                        <div class="guide-img-box">
                            <img src="${item.image}" alt="Guide Image">
                        </div>
                        <div class="guide-text-content">
                            <h3 ${titleAttr}>${titleText}</h3>
                            <p ${descAttr}>${descText}</p>
                        </div>
                    </article>
                </a>`;
            }

            // -----------------------------------------------------
            // TEMPLATE 3: INFO CARD (Para Guide-News.html Seccion Guias)
            // Estructura: card-img-container, card-content
            // -----------------------------------------------------
            else if (templateType === 'info-card') {
                html = `
                <a href="${item.link}" style="text-decoration: none; color: inherit; display: contents;">
                    <article class="info-card animate-up">
                        <div class="card-img-container">
                            <img src="${item.image}" alt="Guide Image">
                        </div>
                        <div class="card-content">
                            <h3 ${titleAttr}>${titleText}</h3>
                            <p ${descAttr}>${descText}</p>
                        </div>
                    </article>
                </a>`;
            }

            container.innerHTML += html;
        });
    }

    triggerTranslation() {
        if (window.langManager) window.langManager.translatePage();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ArticleLoader();
});