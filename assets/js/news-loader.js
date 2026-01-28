/* assets/js/news-loader.js */

document.addEventListener('DOMContentLoaded', () => {
    loadXmlNews();

    // ESCUCHAR CAMBIOS DE IDIOMA
    // Cuando el usuario cambia el idioma en el header, recargamos las noticias
    window.addEventListener('languageChanged', () => {
        loadXmlNews();
    });
});

async function loadXmlNews() {
    const container = document.getElementById('xml-news-container');
    if (!container) return;

    const xmlUrl = 'assets/data/propiedades.xml'; 

    try {
        const response = await fetch(xmlUrl);
        if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
        
        const str = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(str, "text/xml");

        const allProperties = xmlDoc.getElementsByTagName('propiedad');
        
        if (allProperties.length === 0) {
            renderMockData(container);
            return;
        }

        // LIMPIAR CONTENEDOR ANTES DE RENDERIZAR
        container.innerHTML = '';

        // DETECTAR IDIOMA ACTUAL (Por defecto 'es')
        const currentLang = localStorage.getItem('preferredLang') || 'es';

        // MAPEO DE CAMPOS XML SEGÚN IDIOMA
        // ES -> titulo1/descrip1, EN -> titulo2/descrip2, SV -> titulo9/descrip9
        const fieldMap = {
            'es': { t: 'titulo1', d: 'descrip1', tag: 'NUEVA PROPIEDAD' },
            'en': { t: 'titulo2', d: 'descrip2', tag: 'NEW LISTING' },
            'sv': { t: 'titulo9', d: 'descrip9', tag: 'NY LISTNING' } // titulo9/descrip9 suelen ser sueco en este CRM
        };

        const map = fieldMap[currentLang] || fieldMap['es'];

        // Tomar las últimas 3 propiedades
        const latestProps = Array.from(allProperties).slice(-3).reverse();

        latestProps.forEach(prop => {
            const getTagValue = (tagName) => {
                const el = prop.getElementsByTagName(tagName)[0];
                return el ? el.textContent.trim() : null;
            };

            // 1. TÍTULO
            // Intentamos obtener el título en el idioma actual. Si no existe, fallback a Español (titulo1)
            let title = getTagValue(map.t) || getTagValue('titulo1');
            
            // Si aun así falla, construimos uno genérico
            if (!title || title.length < 3) {
                const tipo = getTagValue('tipo_ofer') || 'Property';
                const ciudad = getTagValue('ciudad') || '';
                title = `${tipo} ${ciudad}`;
            }

            // 2. DESCRIPCIÓN
            // Intentamos descripción en el idioma actual. Si no, fallback a Español (descrip1)
            let rawDesc = getTagValue(map.d) || getTagValue('descrip1') || '';
            
            // Limpieza de HTML (CDATA) y recorte
            const tempDiv = document.createElement("div");
            tempDiv.innerHTML = rawDesc;
            let shortDesc = tempDiv.textContent || tempDiv.innerText || "";
            if (shortDesc.length > 150) shortDesc = shortDesc.substring(0, 150) + '...';

            // 3. IMAGEN (Bucle de seguridad para encontrar la primera foto válida)
            let imgSrc = '';
            for(let i = 1; i <= 5; i++) {
                const url = getTagValue(`foto${i}`);
                if (url && url.length > 10 && url.startsWith('http')) {
                    imgSrc = url;
                    break; 
                }
            }

            // Renderizar con el Tag traducido
            createNewsCard(container, imgSrc, title, shortDesc, map.tag);
        });

    } catch (error) {
        console.error('Error cargando noticias XML:', error);
        renderMockData(container);
    }
}

function createNewsCard(container, image, title, desc, tagLabel) {
    const article = document.createElement('article');
    article.className = 'info-card';

    // Fallback de imagen por si falla la carga
    const fallbackImg = 'assets/img/logo mh state negro.png';

    article.innerHTML = `
        <div class="card-img-container">
            <img src="${image || fallbackImg}" alt="${title}" loading="lazy" 
                 onerror="this.onerror=null; this.src='${fallbackImg}'; this.style.objectFit='contain'; this.style.padding='20px';">
        </div>

        <div class="card-content">
            <span class="card-tag">${tagLabel}</span>
            <h3>${title}</h3>
            <p>${desc}</p>
        </div>
    `;

    container.appendChild(article);
}

function renderMockData(container) {
    container.innerHTML = '<p style="text-align:center">No news available at the moment.</p>';
}