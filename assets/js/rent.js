/**
 * RENT.JS - V29.0 (TEXTO BORDE NEGRO + INFO DUPLICADA + MENSAJE LONG TERM VACÍO)
 */

const ITEMS_PER_PAGE = 5;
let allRentProperties = [];
let currentCategory = 'all';
let currentPage = 1;

// URL ficticia de iCal para desarrollo
const FAKE_ICAL_URL = "https://calendar.google.com/calendar/ical/es.spanish%23holiday%40group.v.calendar.google.com/public/basic.ics";

const I18N_RENT = {
    'es': {
        title: 'Alquiler', tab_all: 'VER TODAS', tab_hol: 'VACACIONAL', tab_long: 'LARGA TEMPORADA',
        btn_prev: 'Anterior', btn_next: 'Siguiente',
        txt_title: 'Sabemos que su tiempo es valioso.',
        txt_p1: 'Tanto para alquileres a corto como a largo plazo, nuestro equipo de especialistas está aquí para ayudarle.',
        txt_p2: 'Ya sea que sea propietario de una propiedad o esté buscando un lugar para alquilar, no dude en contactarnos; estamos comprometidos a ayudarle de la mejor manera posible.',
        btn_contact: 'CONTÁCTENOS',
        view_prop: 'Ver Propiedad',
        cat_holiday: 'VACACIONAL', cat_long: 'LARGA TEMPORADA',
        
        // CARACTERÍSTICAS
        feat_bed: 'Dorm.', 
        feat_bath: 'Baños', 
        feat_pool: 'Piscina', 
        feat_garage: 'Garaje', 
        feat_wifi: 'Wifi', 
        feat_terrace: 'Terraza', 
        feat_ac: 'A/C', 
        feat_garden: 'Jardín',
        feat_seaview: 'Vistas al Mar',

        // MENSAJE VACÍO (LONG TERM)
        empty_long_title: 'No hay propiedades disponibles',
        empty_long_text: 'Actualmente no tenemos viviendas disponibles para alquiler de larga temporada. Sin embargo, tenemos propietarios que pueden ofrecer sus viviendas por un número determinado de meses. También podemos tener nuevas viviendas en camino. Registre su interés y le contactaremos tan pronto como tengamos algo que coincida con sus deseos.',
        btn_interest: 'REGISTRAR INTERÉS'
    },
    'en': {
        title: 'For Rent', tab_all: 'DISCOVER ALL', tab_hol: 'HOLIDAY', tab_long: 'LONG TERM',
        btn_prev: 'Previous', btn_next: 'Next',
        txt_title: 'We know your time is valuable.',
        txt_p1: 'For both short-term and long-term rentals, our team of specialists is here to support you.',
        txt_p2: 'Whether you\'re a property owner or looking for a place to rent, feel free to reach out — we’re committed to helping you in the best possible way.',
        btn_contact: 'CONTACT US',
        view_prop: 'View Property',
        cat_holiday: 'HOLIDAY', cat_long: 'LONG TERM',
        
        feat_bed: 'Bed', 
        feat_bath: 'Bath', 
        feat_pool: 'Pool', 
        feat_garage: 'Garage', 
        feat_wifi: 'Wifi', 
        feat_terrace: 'Terrace', 
        feat_ac: 'A/C', 
        feat_garden: 'Garden',
        feat_seaview: 'Sea View',

        // EMPTY MESSAGE (LONG TERM)
        empty_long_title: 'No properties available',
        empty_long_text: 'Currently, we have no homes available for long-term rental. However, we have homeowners who can offer their homes for rent for a certain number of months. We may also have new homes on the way. Register your interest and we will contact you as soon as we get something that matches your wishes.',
        btn_interest: 'REGISTER INTEREST'
    },
    'sv': {
        title: 'Uthyrning', tab_all: 'VISA ALLA', tab_hol: 'SEMESTER', tab_long: 'LÅNGTID',
        btn_prev: 'Föregående', btn_next: 'Nästa',
        txt_title: 'Vi vet att din tid är värdefull.',
        txt_p1: 'För både korttids- och långtidsuthyrning finns vårt team av specialister här för att stödja dig.',
        txt_p2: 'Oavsett om du är fastighetsägare eller letar efter något att hyra, tveka inte att kontakta oss – vi är fast beslutna att hjälpa dig på bästa möjliga sätt.',
        btn_contact: 'KONTAKTA OSS',
        view_prop: 'Visa Fastighet',
        cat_holiday: 'SEMESTER', cat_long: 'LÅNGTID',
        
        feat_bed: 'Sovrum', 
        feat_bath: 'Badrum', 
        feat_pool: 'Pool', 
        feat_garage: 'Garage', 
        feat_wifi: 'Wifi', 
        feat_terrace: 'Terrass', 
        feat_ac: 'AC', 
        feat_garden: 'Trädgård',
        feat_seaview: 'Havsutsikt',

        // TOMT MEDDELANDE (LONG TERM)
        empty_long_title: 'Inga bostäder tillgängliga',
        empty_long_text: 'Just nu har vi inga bostäder tillgängliga för långtidsuthyrning. Däremot har vi bostadsägare som kan erbjuda sina bostäder för uthyrning under ett visst antal månader. Vi kan även ha nya bostäder på väg in. Anmäl ditt intresse så kontaktar vi dig så snart vi får in något som matchar dina önskemål.',
        btn_interest: 'ANMÄL DITT INTRESSE'
    }
};

document.addEventListener("DOMContentLoaded", () => {
    injectRentStyles(); 
    translateRentUI();
    fetchRentFromXML(); 
    initGlobalContactModal(); 

    document.querySelectorAll('.rent-tab').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.rent-tab').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentCategory = btn.getAttribute('data-cat');
            currentPage = 1;
            renderRentGrid();
        });
    });

    window.addEventListener('languageChanged', () => {
        translateRentUI();
        renderRentGrid(); 
    });
});

// --- ESTILOS INYECTADOS (Fade Suave + Borde Negro + Info Abajo) ---
function injectRentStyles() {
    if (document.getElementById('rent-dynamic-styles')) return;
    const style = document.createElement('style');
    style.id = 'rent-dynamic-styles';
    style.innerHTML = `
        /* Slider Container */
        .auto-slider-container {
            position: relative;
            width: 100%;
            height: 100%;
            overflow: hidden;
        }
        /* Imágenes con Fade */
        .slider-img {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            opacity: 0;
            transition: opacity 1.2s ease-in-out; 
            z-index: 1;
        }
        .slider-img.active {
            opacity: 1;
            z-index: 2;
        }
        
        /* BORDE NEGRO PARA TEXTO BLANCO (TEXT-SHADOW) */
        .rent-text-outline {
            color: #fff !important;
            text-shadow: 
                -1px -1px 0 #000,  
                 1px -1px 0 #000,
                -1px  1px 0 #000,
                 1px  1px 0 #000,
                 0px 2px 4px rgba(0,0,0,0.8); /* Sombra extra para profundidad */
        }

        /* INFO DEBAJO DE LA IMAGEN */
        .rent-bottom-details {
            margin-top: 15px;
            color: #000;
            text-align: left;
            padding: 0 5px;
        }
        .rent-bottom-big {
            font-family: 'Inter', sans-serif;
            font-size: 1.4rem;
            font-weight: 700;
            text-transform: uppercase;
            margin-bottom: 5px;
            line-height: 1.2;
        }
        .rent-bottom-small {
            font-family: 'Inter', sans-serif;
            font-size: 1rem;
            font-weight: 400;
            color: #333;
        }

        /* ESTILOS ESTADO VACÍO */
        .rent-empty-state {
            grid-column: 1 / -1;
            text-align: center; 
            padding: 60px 20px; 
            background: #fff; 
            border-radius: 8px; 
            box-shadow: 0 4px 15px rgba(0,0,0,0.05);
            margin-top: 20px;
        }
        .rent-empty-icon {
            font-size: 50px; 
            margin-bottom: 20px;
        }
        .rent-empty-title {
            margin-bottom: 20px; 
            color: #333; 
            font-weight: 600; 
            font-size: 1.5rem;
        }
        .rent-empty-text {
            max-width: 700px; 
            margin: 0 auto 35px auto; 
            color: #666; 
            line-height: 1.8; 
            font-size: 1.05rem;
        }
    `;
    document.head.appendChild(style);
}

// --- HELPER EXTRACCIÓN ---
function getXMLValue(node, tags) {
    if (!Array.isArray(tags)) tags = [tags];
    for (const tag of tags) {
        const el = node.querySelector(tag);
        if (el && el.textContent && el.textContent.trim() !== '') {
            return el.textContent.trim();
        }
    }
    return "";
}

function extractNumFromDesc(text, type) {
    if (!text) return null;
    text = text.toLowerCase();
    const numMap = { 'un': 1, 'una': 1, 'uno': 1, 'primer': 1, 'dos': 2, 'tres': 3, 'cuatro': 4, 'cinco': 5, 'seis': 6, 'siete': 7, 'ocho': 8, 'nueve': 9, 'diez': 10 };
    let regex;
    if (type === 'beds') {
        regex = /(?:(\d+)|(un|una|uno|dos|tres|cuatro|cinco|seis|siete|ocho|nueve|diez))\s+(?:(?:amplios?|dobles?|grandes?|bonitos?|luminosos?|fantásticos?|espaciosos?|hermosos?)\s+)?(?:dormitorios?|habitaci[oó]nes?|cuartos?)/i;
    } else if (type === 'baths') {
        regex = /(?:(\d+)|(un|una|uno|dos|tres|cuatro|cinco))\s+(?:(?:completos?|grandes?|modernos?)\s+)?(?:baños?|banyos?|aseos?|cuartos? de baño)/i;
    }
    const match = text.match(regex);
    if (match) {
        if (match[1]) return match[1];
        if (match[2]) return numMap[match[2]];
    }
    return null;
}

// --- BÚSQUEDA DE CARACTERÍSTICAS EN TEXTO (IA LIGERA) ---
function checkFeatureInText(text, type) {
    if (!text) return false;
    text = text.toLowerCase();
    const patterns = {
        'pool': /(piscina|pool|alberca|pileta)/i,
        'garage': /(garaje|parking|aparcamiento|cochera|plaza de (garaje|parking))/i,
        'terrace': /(terraza|balc[oó]n|solarium|azotea)/i,
        'ac': /(aire acondicionado|aire a\/c|bomba de (fr[ií]o|calor)|climatizaci[oó]n)/i,
        'garden': /(jard[ií]n|jardines|zonas? verdes?|huerto)/i,
        'seaview': /(vista[s]? al mar|sea view|havsutsikt|vistas? despejadas? al mar|frente al mar)/i,
        'wifi': /(wifi|wi-fi|internet|fibra)/i
    };
    return patterns[type] ? patterns[type].test(text) : false;
}

// --- CARGA XML ---
async function fetchRentFromXML() {
    const container = document.getElementById('rent-grid');
    container.innerHTML = '<div class="loading-spinner"></div>';
    
    try {
        const response = await fetch('assets/data/propiedades.xml');
        if (!response.ok) throw new Error("Error loading XML");
        
        const str = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(str, "text/xml");
        const items = xmlDoc.querySelectorAll("propiedad");

        allRentProperties = [];

        items.forEach(item => {
            const accion = getXMLValue(item, ['accion', 'operacion']);
            
            if (accion.toLowerCase().includes("alquiler")) {
                
                // 1. Fotos
                const fotos = [];
                for(let i=1; i<=20; i++) {
                    const f = item.querySelector(`foto${i}`)?.textContent;
                    if(f && f.trim().length > 0) fotos.push(f);
                }
                if(fotos.length === 0) fotos.push('assets/img/hero-bg.jpg');

                // 2. Extracción Texto
                const fullDesc = (
                    getXMLValue(item, ['descrip1', 'descripcion']) + " " +
                    getXMLValue(item, ['descrip2']) + " " +
                    getXMLValue(item, ['descrip9'])
                ).toLowerCase();

                // 3. Características Híbridas
                const features = [];
                const checkHybrid = (xmlTags, typeKey) => {
                    let val = getXMLValue(item, xmlTags).toLowerCase();
                    if (val === '1' || val === 'si' || val === 'true' || parseInt(val) > 0) return true;
                    return checkFeatureInText(fullDesc, typeKey);
                };

                if (checkHybrid(['piscina_prop', 'piscina', 'piscina_com', 'pool'], 'pool')) features.push("pool");
                if (checkHybrid(['plaza_gara', 'garaje', 'garage', 'parking'], 'garage')) features.push("garage");
                if (checkHybrid(['terraza', 'm_terraza'], 'terrace')) features.push("terrace");
                if (checkHybrid(['aire_con', 'aire_acondicionado', 'ac'], 'ac')) features.push("ac");
                if (checkHybrid(['jardin_prop', 'jardin'], 'garden')) features.push("garden");
                if (checkHybrid(['vistasalmar', 'vistas_mar', 'sea_view'], 'seaview')) features.push("seaview");
                if (checkFeatureInText(fullDesc, 'wifi')) features.push("wifi");

                // 4. Datos Numéricos
                const m2 = getXMLValue(item, ['m_cons', 'construido', 'superficie', 'm_util']) || "0";
                
                let beds = getXMLValue(item, ['habitaciones', 'dormitorios', 'beds']);
                if (!beds || beds === "0") {
                    const simples = parseInt(getXMLValue(item, ['hab_simples', 'simple'])) || 0;
                    const dobles = parseInt(getXMLValue(item, ['hab_dobles', 'double'])) || 0;
                    const habdobles = parseInt(getXMLValue(item, ['habdobles'])) || 0;
                    if ((simples + dobles + habdobles) > 0) beds = (simples + dobles + habdobles).toString();
                }
                
                let baths = getXMLValue(item, ['banyos', 'banos', 'baths']) || "0";

                // Respaldo descripción
                if ((!beds || beds === "0") && fullDesc) {
                    const found = extractNumFromDesc(fullDesc, 'beds');
                    if(found) beds = found;
                }
                if ((!baths || baths === "0") && fullDesc) {
                    const found = extractNumFromDesc(fullDesc, 'baths');
                    if(found) baths = found;
                }
                
                // 5. Ubicación
                const rawCity = getXMLValue(item, ['poblacion', 'ciudad']);
                const rawZone = getXMLValue(item, ['zona', 'area']);

                allRentProperties.push({
                    id: getXMLValue(item, ['id', 'ref']),
                    name: getXMLValue(item, ['nombre']) || "Property",
                    city: rawCity,
                    zone: rawZone,
                    category: accion.toLowerCase().includes("vacacional") ? "holiday" : "long_term",
                    price: getXMLValue(item, ['precio', 'precioinmo', 'precioalq']) || "Consult",
                    m2: m2, 
                    beds: beds || "0",
                    baths: baths || "0",
                    features: features,
                    fotos: fotos,
                    link: `propiedad-rent.html?id=${getXMLValue(item, 'id')}`,
                    ical_url: FAKE_ICAL_URL
                });
            }
        });

        renderRentGrid();

    } catch (error) {
        console.error("Error XML Rent:", error);
        container.innerHTML = `<div style="text-align:center; padding:40px;">Error loading properties.</div>`;
    }
}

// --- RENDERIZADO GRID (CON EMPTY STATE LONG TERM) ---
function renderRentGrid() {
    const container = document.getElementById('rent-grid');
    const paginationContainer = document.getElementById('rent-pagination');
    const lang = localStorage.getItem('preferredLang') || 'es';
    const dict = I18N_RENT[lang];

    let filtered = allRentProperties;
    if (currentCategory !== 'all') {
        filtered = allRentProperties.filter(p => p.category === currentCategory);
    }

    const totalItems = filtered.length;
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
    
    if (currentPage > totalPages) currentPage = totalPages || 1;
    if (currentPage < 1) currentPage = 1;

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const toShow = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    container.innerHTML = "";
    
    // CASO VACÍO
    if (toShow.length === 0) {
        if (currentCategory === 'long_term') {
            // Mensaje específico para Larga Temporada
            container.innerHTML = `
                <div class="rent-empty-state">
                    <div class="rent-empty-icon">📋</div>
                    <h3 class="rent-empty-title">${dict.empty_long_title}</h3>
                    <p class="rent-empty-text">${dict.empty_long_text}</p>
                    <button class="btn-valuable-gold btn-contact-trigger">${dict.btn_interest}</button>
                </div>
            `;
            // Reinicializar el modal para el nuevo botón inyectado
            initGlobalContactModal();
        } else {
            // Mensaje genérico
            container.innerHTML = `<div style="text-align:center; padding:40px; width:100%;">No properties found.</div>`;
        }
    } else {
        toShow.forEach(prop => { 
            container.appendChild(createRentCard(prop, dict)); 
        });
        setTimeout(initAutoSliders, 100);
    }
    
    // Si hay resultados, mostrar paginación
    if (toShow.length > 0) {
        renderPaginationControls(paginationContainer, totalPages, dict);
    } else {
        paginationContainer.innerHTML = "";
    }
}

// --- CREAR TARJETA ---
function createRentCard(prop, dict) {
    const article = document.createElement('article');
    article.className = 'rent-layout-card';
    
    // TÍTULO: Ciudad - Zona
    let locationTitle = prop.city;
    if (prop.city && prop.city.trim() !== "" && prop.zone && prop.zone.trim() !== "") {
        locationTitle += ` - ${prop.zone}`;
    } else if ((!prop.city || prop.city.trim() === "") && prop.zone) {
        locationTitle = prop.zone;
    }
    const finalTitle = locationTitle ? locationTitle.toUpperCase() : "PROPERTY";

    // SPECS
    const specs = [];
    if(prop.beds && prop.beds !== "0") specs.push(`${prop.beds} ${dict.feat_bed}`);
    if(prop.baths && prop.baths !== "0") specs.push(`${prop.baths} ${dict.feat_bath}`);
    
    // EXTRAS
    const extras = [];
    prop.features.forEach(f => {
        const key = `feat_${f}`;
        const val = dict[key] || f;
        extras.push(val);
    });
    
    const allFeats = [...specs, ...extras];
    const featStr = allFeats.join(' | ');

    // IMÁGENES SLIDER
    let imagesHtml = '';
    prop.fotos.slice(0, 5).forEach((foto, index) => {
        imagesHtml += `<img src="${foto}" class="slider-img ${index === 0 ? 'active' : ''}" alt="${prop.name}" loading="lazy">`;
    });

    article.innerHTML = `
        <h3 class="rent-external-title">${finalTitle}</h3>
        <div class="rent-image-box">
            <div class="auto-slider-container">
                ${imagesHtml}
            </div>
            
            <div class="rent-overlay-specs">
                <div class="overlay-big-title rent-text-outline">${finalTitle}</div>
                <div class="overlay-small-desc rent-text-outline">${featStr}</div>
                <a href="${prop.link}" class="overlay-link-arrow rent-text-outline">${dict.view_prop} ➜</a>
            </div>
        </div>

        <div class="rent-bottom-details">
            <div class="rent-bottom-big">${finalTitle}</div>
            <div class="rent-bottom-small">${featStr}</div>
        </div>
    `;
    return article;
}

// --- SLIDER AUTOMÁTICO (2.5s) ---
function initAutoSliders() {
    if(window.rentSliderIntervals) {
        window.rentSliderIntervals.forEach(i => clearInterval(i));
    }
    window.rentSliderIntervals = [];

    const containers = document.querySelectorAll('.auto-slider-container');
    
    containers.forEach(container => {
        const images = container.querySelectorAll('.slider-img');
        if (images.length <= 1) return;

        let currentIndex = 0;
        
        const interval = setInterval(() => {
            images[currentIndex].classList.remove('active');
            currentIndex = (currentIndex + 1) % images.length;
            images[currentIndex].classList.add('active');
        }, 2500); 

        window.rentSliderIntervals.push(interval);
    });
}

// --- PAGINACIÓN ---
function renderPaginationControls(container, totalPages, dict) {
    container.innerHTML = "";
    if (totalPages <= 1) return;

    const btnPrev = document.createElement('button');
    btnPrev.className = 'rent-page-btn prev-next';
    btnPrev.innerText = dict.btn_prev;
    btnPrev.disabled = currentPage === 1;
    btnPrev.onclick = () => { if(currentPage > 1) { currentPage--; renderRentGrid(); window.scrollTo(0, 400); } };
    container.appendChild(btnPrev);

    for (let i = 1; i <= totalPages; i++) {
        const btnNum = document.createElement('button');
        btnNum.className = `rent-page-btn ${i === currentPage ? 'active' : ''}`;
        btnNum.innerText = i;
        btnNum.onclick = () => { currentPage = i; renderRentGrid(); window.scrollTo(0, 400); };
        container.appendChild(btnNum);
    }

    const btnNext = document.createElement('button');
    btnNext.className = 'rent-page-btn prev-next';
    btnNext.innerText = dict.btn_next;
    btnNext.disabled = currentPage === totalPages;
    btnNext.onclick = () => { if(currentPage < totalPages) { currentPage++; renderRentGrid(); window.scrollTo(0, 400); } };
    container.appendChild(btnNext);
}

// --- UI / TRADUCCIÓN ---
function translateRentUI() {
    const lang = localStorage.getItem('preferredLang') || 'es';
    const dict = I18N_RENT[lang];
    const map = {
        'rent-title': dict.title, 'tab-all': dict.tab_all, 'tab-holiday': dict.tab_hol, 'tab-long': dict.tab_long,
        'txt-valuable-title': dict.txt_title, 'txt-valuable-p1': dict.txt_p1, 'txt-valuable-p2': dict.txt_p2,
        'btn-contact-us': dict.btn_contact
    };
    for (const [id, text] of Object.entries(map)) {
        const el = document.getElementById(id);
        if(el) el.innerText = text;
    }
}

// --- MODAL DE CONTACTO ---
function initGlobalContactModal() {
    const triggers = document.querySelectorAll('.btn-contact-trigger, .contact-trigger');
    triggers.forEach(btn => {
        // Clonar para evitar listeners duplicados si se llama múltiples veces
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);

        newBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            let modal = document.getElementById('contact-modal');
            const closeModal = () => { if(modal) { modal.classList.remove('active'); document.body.style.overflow = ''; } };

            if (modal) {
                modal.classList.add('active'); document.body.style.overflow = 'hidden';
            } else {
                try {
                    const resp = await fetch('contact.html');
                    if (!resp.ok) throw new Error("Error loading contact");
                    const html = await resp.text();
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(html, 'text/html');
                    
                    modal = document.createElement('div');
                    modal.id = 'contact-modal';
                    modal.className = 'modal-overlay';
                    modal.innerHTML = `
                        <div class="modal-container">
                            <button class="modal-close-btn">&times;</button>
                            <div class="modal-header-logo">
                                <img src="assets/img/logo mh state negro.png" alt="MH ESTATE" style="max-width:150px;">
                            </div>
                            <div id="modal-content-injector"></div>
                        </div>
                    `;

                    const contactSection = doc.querySelector('.contact-section') || doc.querySelector('main');
                    if (contactSection) {
                        const injector = modal.querySelector('#modal-content-injector');
                        injector.innerHTML = contactSection.innerHTML;
                        document.body.appendChild(modal);

                        const newCloseBtn = modal.querySelector('.modal-close-btn');
                        if(newCloseBtn) newCloseBtn.addEventListener('click', closeModal);
                        modal.addEventListener('click', (ev) => { if (ev.target === modal) closeModal(); });

                        modal.classList.add('active'); document.body.style.overflow = 'hidden';
                        if (window.langManager) setTimeout(() => window.langManager.translatePage(), 50);
                    }
                } catch (error) {
                    window.location.href = 'contact.html';
                }
            }
        });
    });
}