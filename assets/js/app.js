/**
 * ============================================================
 * APP.JS - MOTOR V19.0 (CARD LAYOUT: PRICE / SPECS / EXTRAS)
 * ============================================================
 */

// --- 1. CONFIGURACIÓN Y VARIABLES GLOBALES ---

let allPropertiesData = []; 
let allFilteredProperties = []; 
let homePropertiesData = [];    

// Paginación
let currentPage = 0;      
let homeCurrentPage = 0;  

let propertiesPerPage = 2; 

// Traducciones
const I18N_TYPES = {
    'es': { },
    'en': {
        'Apartamento': 'Apartment', 'Piso': 'Apartment',
        'Villa': 'Villa', 'Chalet': 'Villa', 'Casa': 'House',
        'Adosado': 'Townhouse', 'Pareado': 'Semi-detached',
        'Cortijo': 'Country House', 'Finca': 'Country House',
        'Parcela': 'Plot', 'Terreno': 'Land',
        'Garaje': 'Garage', 'Atico': 'Penthouse', 'Ático': 'Penthouse',
        'Local': 'Commercial', 'Oficina': 'Office'
    },
    'sv': {
        'Apartamento': 'Lägenhet', 'Piso': 'Lägenhet',
        'Villa': 'Villa', 'Chalet': 'Villa', 'Casa': 'Hus',
        'Adosado': 'Radhus', 'Pareado': 'Parhus',
        'Cortijo': 'Lantgård', 'Finca': 'Lantgård',
        'Parcela': 'Tomt', 'Terreno': 'Mark',
        'Garaje': 'Garage', 'Atico': 'Takvåning', 'Ático': 'Takvåning',
        'Local': 'Lokal', 'Oficina': 'Kontor'
    }
};

const I18N_UI = {
    'es': { 
        beds: 'Dorm.', baths: 'Baños', // Abreviado para línea 2
        pool: 'Piscina', garage: 'Garaje', view: 'Vistas al Mar', 
        garden: 'Jardín', ac: 'Aire Acond.', elevator: 'Ascensor', terrace: 'Terraza',
        no_results: 'No se encontraron propiedades', btn_all: 'Ver Todas', 
        featured: 'Propiedades Destacadas', found: 'Propiedades encontradas',
        exclusive: 'EXCLUSIVA',
        prev: 'ANTERIOR', next: 'SIGUIENTE'
    },
    'en': { 
        beds: 'Beds', baths: 'Baths', 
        pool: 'Pool', garage: 'Garage', view: 'Sea Views', 
        garden: 'Garden', ac: 'A/C', elevator: 'Elevator', terrace: 'Terrace',
        no_results: 'No properties found', btn_all: 'View All', 
        featured: 'Featured Properties', found: 'Properties found',
        exclusive: 'EXCLUSIVE',
        prev: 'PREVIOUS', next: 'NEXT'
    },
    'sv': { 
        beds: 'Sovrum', baths: 'Badrum', 
        pool: 'Pool', garage: 'Garage', view: 'Havsutsikt', 
        garden: 'Trädgård', ac: 'Luftkond.', elevator: 'Hiss', terrace: 'Terrass',
        no_results: 'Inga bostäder hittades', btn_all: 'Se alla', 
        featured: 'Utvalda Bostäder', found: 'Bostäder hittades',
        exclusive: 'EXKLUSIV',
        prev: 'FÖREGÅENDE', next: 'NÄSTA'
    }
};

// --- 2. INICIALIZACIÓN ---

document.addEventListener('DOMContentLoaded', async () => {
    try {
        setupFilterInteractions(); 
        initSearchLogic();        

        await loadAndStoreProperties();
        populateCitySelect();

        if (window.location.pathname.includes('buy.html')) {
            applyFiltersFromURL(); 
        }

        renderCurrentPage(); 

        window.addEventListener('languageChanged', () => renderCurrentPage());
        initContactModal();

    } catch (err) {
        console.error("Critical Error in App.js:", err);
    }
});

/**
 * Carga el XML una sola vez
 */
async function loadAndStoreProperties() {
    const LOCAL_XML_URL = 'assets/data/propiedades.xml';
    const buyGrid = document.getElementById('properties-grid');
    const homeGrid = document.getElementById('featured-grid');
    if(buyGrid) buyGrid.innerHTML = '<div class="loading-spinner"></div>';
    if(homeGrid) homeGrid.innerHTML = '<div class="loading-spinner"></div>';

    try {
        const res = await fetch(`${LOCAL_XML_URL}?v=${Date.now()}`);
        if (!res.ok) throw new Error(`HTTP Error ${res.status}`);
        const strXML = await res.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(strXML, "text/xml");
        const nodes = Array.from(xmlDoc.querySelectorAll("propiedad"));
        if (nodes.length === 0) throw new Error("XML vacío");
        allPropertiesData = nodes;
    } catch (e) {
        console.error("Error loading XML:", e);
    }
}

function populateCitySelect() {
    const select = document.getElementById('s-area');
    if (!select) return;
    const citiesSet = new Set();
    allPropertiesData.forEach(node => {
        const city = getNodeValue(node, ['ciudad', 'poblacion']);
        if (city && city.trim() !== '') {
            const cleanCity = city.trim().charAt(0).toUpperCase() + city.trim().slice(1).toLowerCase();
            citiesSet.add(cleanCity);
        }
    });
    const sortedCities = Array.from(citiesSet).sort();
    const defaultOption = select.firstElementChild; 
    select.innerHTML = ''; 
    select.appendChild(defaultOption);
    sortedCities.forEach(city => {
        const option = document.createElement('option');
        option.value = city; option.textContent = city;
        select.appendChild(option);
    });
}

/**
 * Renderiza según la página
 */
/* --- EN app.js --- */

function renderCurrentPage() {
    if (allPropertiesData.length === 0) return;

    // A. HOME (index.html)
    const homeGrid = document.getElementById('featured-grid');
    if (homeGrid) {
        if(homePropertiesData.length === 0) {
            homePropertiesData = allPropertiesData.slice(0, 6);
        }
        renderHomeGrid(homeGrid);
    }

    // B. BUY (buy.html)
    const buyGrid = document.getElementById('properties-grid');
    if (buyGrid) {
        // FORZAMOS 10 SIEMPRE EN ESTA PÁGINA
        propertiesPerPage = 10; 

        const urlParams = new URLSearchParams(window.location.search);
        
        // Si la URL está vacía (carga inicial), simulamos que queremos ver "todas"
        // para que no aplique el límite de 2 que usábamos antes.
        allFilteredProperties = filterProperties(allPropertiesData, urlParams);
        
        const countEl = document.getElementById('results-count');
        const lang = getCurrentLang();
        
        if(countEl) {
            countEl.innerText = `${allFilteredProperties.length} ${I18N_UI[lang].found}`;
        }

        highlightActiveFilter(urlParams);
        renderBuyGrid(buyGrid);
    }
}

// --- RENDER HOME ---
function renderHomeGrid(container) {
    container.innerHTML = "";
    const homePerPage = 2; 
    const start = homeCurrentPage * homePerPage;
    const end = start + homePerPage;
    const items = homePropertiesData.slice(start, end);

    items.forEach(node => {
        container.appendChild(createCard(node));
    });

    const totalPages = Math.ceil(homePropertiesData.length / homePerPage);
    generatePaginationButtons('home-pagination', homeCurrentPage, totalPages, (newPage) => {
        homeCurrentPage = newPage;
        renderHomeGrid(container);
    });
}

// --- RENDER BUY ---
function renderBuyGrid(container) {
    container.innerHTML = "";
    container.className = 'properties-grid-layout'; 
    const lang = getCurrentLang();
    const ui = I18N_UI[lang];

    if (allFilteredProperties.length === 0) {
        container.innerHTML = `
            <div style="grid-column: 1/-1; text-align:center; padding:40px;">
                <h3>${ui.no_results}</h3>
                <button onclick="resetSearch()" class="pagination-btn prev-next" style="margin:20px auto; display:block;">${ui.btn_all}</button>
            </div>`;
        document.getElementById('buy-pagination').innerHTML = ''; 
        return;
    }

    const start = currentPage * propertiesPerPage;
    const end = start + propertiesPerPage;
    const items = allFilteredProperties.slice(start, end);

    items.forEach(node => {
        container.appendChild(createCard(node));
    });

    const totalPages = Math.ceil(allFilteredProperties.length / propertiesPerPage);
    generatePaginationButtons('buy-pagination', currentPage, totalPages, (newPage) => {
        currentPage = newPage;
        renderBuyGrid(container);
        document.getElementById('properties-grid')?.scrollIntoView({behavior:'smooth'});
    });
}


// --- GENERADOR DE BOTONES NUMÉRICOS ---
function generatePaginationButtons(containerId, current, total, onPageClick) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = ''; 
    if (total <= 1) return;

    const lang = getCurrentLang();
    const ui = I18N_UI[lang];

    const prevBtn = document.createElement('button');
    prevBtn.className = 'pagination-btn prev-next';
    prevBtn.innerHTML = `&larr; ${ui.prev}`;
    prevBtn.disabled = current === 0;
    prevBtn.onclick = () => onPageClick(current - 1);
    container.appendChild(prevBtn);

    let startPage = 0;
    let endPage = total;
    const maxVisible = 5;
    if (total > maxVisible) {
        if (current < 3) {
            endPage = maxVisible;
        } else if (current > total - 3) {
            startPage = total - maxVisible;
        } else {
            startPage = current - 2;
            endPage = current + 3;
        }
    }

    for (let i = startPage; i < endPage; i++) {
        const btn = document.createElement('button');
        btn.className = `pagination-btn ${i === current ? 'active' : ''}`;
        btn.innerText = i + 1;
        btn.onclick = () => onPageClick(i);
        container.appendChild(btn);
    }

    const nextBtn = document.createElement('button');
    nextBtn.className = 'pagination-btn prev-next';
    nextBtn.innerHTML = `${ui.next} &rarr;`;
    nextBtn.disabled = current >= total - 1;
    nextBtn.onclick = () => onPageClick(current + 1);
    container.appendChild(nextBtn);
}


// --- LÓGICA DE FILTRADO ---
function filterProperties(nodes, params) {
    const locParam = (params.get('loc') || '').toLowerCase();
    const locations = locParam.split(',').map(l => l.trim()).filter(l => l !== '');
    const types = params.get('type') ? params.get('type').toLowerCase().split(',') : [];
    const keyword = (params.get('q') || '').toLowerCase();
    const minPrice = parseFloat(params.get('min')) || 0;
    const maxPrice = parseFloat(params.get('max')) || Infinity;
    const bedsMin = parseInt(params.get('bed')) || 0;
    const bathsMin = parseInt(params.get('bath')) || 0;

    return nodes.filter(node => {
        const get = (tags) => getNodeValue(node, tags).toLowerCase();
        const rawPrice = getNodeValue(node, ['precioinmo', 'precio']);
        const cleanPrice = parseInt(rawPrice.replace(/\D/g, '')) || 0;

        if (minPrice > 0 && cleanPrice < minPrice) return false;
        if (maxPrice > 0 && maxPrice !== Infinity && cleanPrice > maxPrice) return false;

        const descText = get(['descrip1', 'descripcion']);
        let bedsVal = parseInt(get(['habitaciones', 'dormitorios', 'beds'])) || 0;
        const simples = parseInt(get(['hab_simples', 'simple'])) || 0;
        const dobles = parseInt(get(['hab_dobles', 'double'])) || 0;
        if ((simples + dobles) > bedsVal) bedsVal = simples + dobles;
        const bedsDesc = extractNumFromDesc(descText, 'beds');
        if (bedsDesc && parseInt(bedsDesc) > bedsVal) bedsVal = parseInt(bedsDesc);

        let bathsVal = parseInt(get(['banos', 'banyos', 'baths'])) || 0;
        const bathsDesc = extractNumFromDesc(descText, 'baths');
        if (bathsDesc && parseInt(bathsDesc) > bathsVal) bathsVal = parseInt(bathsDesc);

        const pType = get(['tipo', 'type', 'tipo_ofer']);
        const pCity = get(['ciudad', 'poblacion']);
        const pZone = get(['zona', 'area']);
        const pTitle = get(['titulo1', 'titulo2']);

        if (locations.length > 0 && locParam !== 'all') {
            const matchLoc = locations.some(loc => pCity.includes(loc) || pZone.includes(loc));
            if (!matchLoc) return false;
        }
        if (types.length > 0) {
            const match = types.some(t => pType.includes(t));
            if (!match) return false;
        }
        if (bedsVal < bedsMin) return false;
        if (bathsVal < bathsMin) return false;
        if (keyword) {
            const fullText = `${pType} ${pCity} ${pZone} ${pTitle} ${descText}`;
            if (['piscina', 'pool', 'garaje', 'garage', 'jardin', 'garden'].includes(keyword)) {
                let found = false;
                if(keyword.includes('piscina') || keyword.includes('pool')) found = checkHybrid(node, ['piscina_prop'], 'pool');
                else if(keyword.includes('garaje') || keyword.includes('garage')) found = checkHybrid(node, ['garaje'], 'garage');
                else if(keyword.includes('jardin') || keyword.includes('garden')) found = checkHybrid(node, ['jardin_prop'], 'garden');
                if (!found) return false;
            } else {
                if (!fullText.includes(keyword)) return false;
            }
        }
        return true;
    });
}

function checkHybrid(node, tags, regexType) {
    const get = (t) => getNodeValue(node, t).toLowerCase();
    const val = get(tags);
    if (val === '1' || val === 'si' || val === 'yes' || parseInt(val) > 0) return true;
    const desc = get(['descrip1', 'descripcion']);
    return checkFeatureInDesc(desc, regexType);
}

function initSearchLogic() {
    const buttons = document.querySelectorAll('button[onclick="executeSearch()"]');
    buttons.forEach(btn => {
        btn.removeAttribute('onclick'); 
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            handleSearchRedirect();
        });
    });
}

function handleSearchRedirect() {
    const area = document.getElementById('s-area')?.value;
    const keyword = document.getElementById('s-keyword')?.value.trim();
    const minPrice = document.getElementById('s-min')?.value;
    const maxPrice = document.getElementById('s-max')?.value;
    const beds = document.getElementById('beds-selector')?.getAttribute('data-selected');
    const baths = document.getElementById('baths-selector')?.getAttribute('data-selected');
    const checkedTypes = Array.from(document.querySelectorAll('input[name="type"]:checked')).map(cb => cb.value);

    const params = new URLSearchParams();
    if (area && area !== '') params.set('loc', area);
    if (keyword) params.set('q', keyword);
    if (minPrice) params.set('min', minPrice);
    if (maxPrice) params.set('max', maxPrice);
    if (beds) params.set('bed', beds);
    if (baths) params.set('bath', baths);
    if (checkedTypes.length > 0) params.set('type', checkedTypes.join(','));

    if (window.location.pathname.includes('buy.html')) {
        window.location.search = params.toString();
    } else {
        window.location.href = `buy.html?${params.toString()}`;
    }
}

function applyFiltersFromURL() {
    const params = new URLSearchParams(window.location.search);
    if ([...params].length === 0) return;
    if (params.has('q')) setVal('s-keyword', params.get('q'));
    if (params.has('loc')) {
        const locVal = params.get('loc');
        if (!locVal.includes(',')) {
            const select = document.getElementById('s-area');
            if(select) { select.value = locVal; setTimeout(() => { select.value = locVal; }, 100); }
        }
    }
    if (params.has('min')) setVal('s-min', params.get('min'));
    if (params.has('max')) setVal('s-max', params.get('max'));
    if (params.has('bed')) activateButton('beds-selector', params.get('bed'));
    if (params.has('bath')) activateButton('baths-selector', params.get('bath'));
    if (params.has('type')) {
        const types = params.get('type').split(',');
        types.forEach(val => {
            const cb = document.querySelector(`input[name="type"][value="${val}"]`);
            if(cb) cb.checked = true;
        });
    }
}

function highlightActiveFilter(params) {
    const loc = params.get('loc');
    document.querySelectorAll('.btn-filter').forEach(b => b.classList.remove('active'));
    if (!loc || loc === 'all') {
        document.getElementById('btn-all')?.classList.add('active');
    } else if (loc.includes('nerja') && loc.includes('torrox')) {
        document.getElementById('btn-nerja')?.classList.add('active');
    } else if (loc.includes('marbella') && loc.includes('fuengirola')) {
        document.getElementById('btn-marbella')?.classList.add('active');
    }
}

function setVal(id, val) { const el = document.getElementById(id); if(el) el.value = val; }
function activateButton(containerId, val) {
    const container = document.getElementById(containerId);
    if(!container) return;
    container.setAttribute('data-selected', val);
    const btn = container.querySelector(`button[data-val="${val}"]`);
    if(btn) btn.classList.add('active');
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

function checkFeatureInDesc(text, type) {
    if (!text) return false;
    text = text.toLowerCase();
    const patterns = {
        'ac': /(aire acondicionado|aire a\/c|bomba de (fr[ií]o|calor)|climatizaci[oó]n)/i,
        'seaview': /(vista[s]? al mar|vistas? despejadas? al mar|frente al mar|primera l[ií]nea)/i,
        'pool': /(piscina|alberca|pileta)/i,
        'garden': /(jard[ií]n|jardines|zonas? verdes?|huerto)/i,
        'garage': /(garaje|parking|aparcamiento|cochera|plaza de (garaje|parking))/i,
        'elevator': /(ascensor|elevador)/i,
        'terrace': /(terraza|balc[oó]n|solarium|azotea)/i
    };
    if (patterns[type] && patterns[type].test(text)) return true;
    return false;
}

function getNodeValue(node, tags) {
    if(!node || !node.children) return "";
    const children = Array.from(node.children);
    if(typeof tags === 'string') tags = [tags];
    for(const t of tags) {
        const match = children.find(c => c.tagName.toLowerCase() === t.toLowerCase());
        if(match && match.textContent.trim()) return match.textContent.trim();
    }
    return "";
}

function getCurrentLang() {
    return localStorage.getItem('preferredLang') || 'es';
}

function setupFilterInteractions() {
    const sets = ['beds-selector', 'baths-selector'];
    sets.forEach(id => {
        const div = document.getElementById(id);
        if(!div) return;
        div.querySelectorAll('button').forEach(btn => {
            btn.onclick = () => {
                const wasActive = btn.classList.contains('active');
                div.querySelectorAll('button').forEach(b=>b.classList.remove('active'));
                if(!wasActive) {
                    btn.classList.add('active');
                    div.setAttribute('data-selected', btn.getAttribute('data-val'));
                } else {
                    div.removeAttribute('data-selected');
                }
            };
        });
    });
}

function resetSearch() {
    document.getElementById('search-form')?.reset();
    document.querySelectorAll('.active').forEach(e => e.classList.remove('active'));
    document.getElementById('beds-selector')?.removeAttribute('data-selected');
    document.getElementById('baths-selector')?.removeAttribute('data-selected');
    window.location.href = 'buy.html?view=all';
}

function initContactModal() {
    const modal = document.getElementById('contact-modal');
    const injector = document.getElementById('modal-content-injector');
    const closeBtn = document.querySelector('.modal-close-btn');
    const contactLinks = document.querySelectorAll('a[href*="contact.html"], a[href*="contacto.html"], .btn-contact-trigger');

    contactLinks.forEach(link => {
        link.addEventListener('click', async (e) => {
            if(window.innerWidth > 900) { 
                e.preventDefault();
                if (injector.children.length > 0) { openModal(); return; }
                try {
                    injector.innerHTML = '<div style="padding:40px; text-align:center;">Loading...</div>';
                    openModal();
                    const response = await fetch('/contact.html?v=' + Date.now());
                    if (!response.ok) throw new Error("Fetch failed");
                    const htmlText = await response.text();
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(htmlText, 'text/html');
                    const contactSection = doc.querySelector('.contact-section') || doc.querySelector('main');
                    if (contactSection) {
                        injector.innerHTML = '';
                        injector.appendChild(contactSection);
                        if (window.langManager) {
                            setTimeout(() => { window.langManager.translatePage(); }, 50); 
                        }
                    }
                } catch (error) {
                    console.error("Error loading modal:", error);
                    window.location.href = 'contact.html'; 
                }
            }
        });
    });

    function openModal() { modal?.classList.add('active'); document.body.style.overflow = 'hidden'; }
    function closeModal() { modal?.classList.remove('active'); document.body.style.overflow = ''; }
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (modal) modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
}

window.applyLocationFilter = function(locs) {
    if(!locs) { window.location.href = 'buy.html?view=all'; return; }
    window.location.href = `buy.html?loc=${encodeURIComponent(locs)}`;
};

// --- CREATE CARD (UPDATED LAYOUT: 1. Price, 2. Specs, 3. Extras) ---
function createCard(xmlNode) {
    const lang = getCurrentLang();
    const dict = I18N_TYPES[lang] || {};
    const ui = I18N_UI[lang];

    const get = (tags) => getNodeValue(xmlNode, tags);

    const id = get(['id']);
    const priceRaw = get(['precioinmo', 'precio']).replace(/\D/g, '');
    const price = parseFloat(priceRaw) || 0;
    const formatter = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });
    const formattedPrice = formatter.format(price);

    let typeRaw = get(['tipo', 'type', 'tipo_ofer']);
    let city = get(['ciudad', 'poblacion']);
    let zone = get(['zona', 'area']);
    let typeDisplay = dict[typeRaw] || typeRaw; 
    
    if (typeDisplay) typeDisplay = typeDisplay.charAt(0).toUpperCase() + typeDisplay.slice(1);
    const displayTitle = `${typeDisplay} - ${zone || city}`;

    const excluVal = get(['exclu', 'exclusiva']);
    let tagHtml = '';
    if (excluVal === '1') {
        tagHtml = `<span class="card-tag" style="background-color: #000; color: #fff;">${ui.exclusive}</span>`;
    }

    const descText = get(['descrip1', 'descripcion']);
    const m2 = parseInt(get(['m_cons', 'construido', 'surface'])) || 0;

    let bedsVal = parseInt(get(['habitaciones', 'dormitorios', 'beds'])) || 0;
    const simples = parseInt(get(['hab_simples', 'simple'])) || 0;
    const dobles = parseInt(get(['hab_dobles', 'double'])) || 0;
    if ((simples + dobles) > bedsVal) bedsVal = simples + dobles;
    const bedsFromDesc = extractNumFromDesc(descText, 'beds');
    if (bedsFromDesc && parseInt(bedsFromDesc) > bedsVal) bedsVal = parseInt(bedsFromDesc);

    let bathsVal = parseInt(get(['banos', 'banyos', 'baths'])) || 0;
    const bathsFromDesc = extractNumFromDesc(descText, 'baths');
    if (bathsFromDesc && parseInt(bathsFromDesc) > bathsVal) bathsVal = parseInt(bathsFromDesc);

    // --- CARACTERÍSTICAS (BOOLEANOS) ---
    const hasPool = checkHybrid(xmlNode, ['piscina_prop', 'piscina', 'pool'], 'pool');
    const hasGarage = checkHybrid(xmlNode, ['garaje', 'plaza_gara', 'garage'], 'garage');
    const hasView = checkHybrid(xmlNode, ['vistasalmar', 'vistas_mar', 'sea_view'], 'seaview');
    const hasGarden = checkHybrid(xmlNode, ['jardin_prop', 'jardin', 'garden'], 'garden');
    const hasAC = checkHybrid(xmlNode, ['aire_con', 'aire_acondicionado', 'ac'], 'ac');
    const hasElevator = checkHybrid(xmlNode, ['ascensor', 'elevador', 'elevator'], 'elevator');
    const hasTerrace = checkHybrid(xmlNode, ['terraza', 'm_terraza', 'terrace'], 'terrace');

    // --- LÍNEA 2: SPECS (M2 | Cama | Baño) ---
    const specsArr = [];
    if(m2 > 0) specsArr.push(`${m2} m²`);
    if(bedsVal > 0) specsArr.push(`${bedsVal} ${ui.beds}`);
    if(bathsVal > 0) specsArr.push(`${bathsVal} ${ui.baths}`);
    
    let specsLine = specsArr.length > 0 ? specsArr.join(' &bull; ') : '';

    // --- LÍNEA 3: EXTRAS ---
    const extrasArr = [];
    if(hasPool) extrasArr.push(ui.pool);
    if(hasGarage) extrasArr.push(ui.garage);
    if(hasView) extrasArr.push(ui.view);
    if(hasGarden) extrasArr.push(ui.garden);
    if(hasTerrace) extrasArr.push(ui.terrace);
    if(hasAC) extrasArr.push(ui.ac);
    if(hasElevator) extrasArr.push(ui.elevator);

    let extrasLine = extrasArr.length > 0 ? extrasArr.join(', ') : '&nbsp;';

    const photos = [];
    for(let i=1; i<=15; i++) {
        const url = get([`foto${i}`]);
        if(url) photos.push(url);
    }
    if(photos.length === 0) photos.push('assets/img/logo mh state negro.png');

    const article = document.createElement('article');
    article.className = 'property-card';
    
    article.innerHTML = `
        <div class="card-img-box">
            <img src="${photos[0]}" alt="${displayTitle}" loading="lazy" class="card-img" draggable="false">
            ${tagHtml}
            ${photos.length > 1 ? `
                <div class="card-photo-indicator">1/${photos.length}</div>
                <button class="card-mini-arrow prev">❮</button>
                <button class="card-mini-arrow next">❯</button>
            ` : ''}
        </div>
        <div class="card-info-box">
            <h3 style="font-size:14px; color:#999; text-transform:uppercase; margin-bottom:5px;">${displayTitle}</h3>
            
            <div class="line-1-price" style="font-family:'Inter'; font-weight:700; font-size:22px; color:#C5A059; margin-bottom:5px;">
                ${formattedPrice}
            </div>
            
            <div class="line-2-specs" style="font-family:'Inter'; font-weight:600; font-size:14px; color:#000; margin-bottom:5px;">
                ${specsLine}
            </div>
            
            <div class="line-3-extras" style="font-family:'Inter'; font-weight:400; font-size:12px; color:#666; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
                ${extrasLine}
            </div>
        </div>
    `;

    // LÓGICA DE FOTOS Y EVENTOS (IGUAL)
    let currentPhotoIdx = 0;
    const imgEl = article.querySelector('.card-img');
    const indicator = article.querySelector('.card-photo-indicator');
    const imgBox = article.querySelector('.card-img-box');

    const changePhoto = (step) => {
        currentPhotoIdx = (currentPhotoIdx + step + photos.length) % photos.length;
        imgEl.src = photos[currentPhotoIdx];
        if(indicator) indicator.textContent = `${currentPhotoIdx + 1}/${photos.length}`;
    };

    if(photos.length > 1) {
        const prevBtn = article.querySelector('.prev');
        const nextBtn = article.querySelector('.next');
        prevBtn.addEventListener('click', (e) => { e.stopPropagation(); changePhoto(-1); });
        nextBtn.addEventListener('click', (e) => { e.stopPropagation(); changePhoto(1); });

        let startX = 0;
        let isDragging = false;
        const dragThreshold = 50;
        imgBox.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; isDragging = true; }, {passive: true});
        imgBox.addEventListener('touchend', (e) => {
            if(!isDragging) return;
            const diff = startX - e.changedTouches[0].clientX;
            if (Math.abs(diff) > dragThreshold) changePhoto(diff > 0 ? 1 : -1);
            isDragging = false;
        }, {passive: true});
        imgBox.addEventListener('mousedown', (e) => {
            if(e.target.tagName === 'BUTTON') return;
            e.preventDefault(); 
            startX = e.clientX; isDragging = true; imgBox.style.cursor = 'grabbing';
        });
        imgBox.addEventListener('mouseup', (e) => {
            if(!isDragging) return;
            const diff = startX - e.clientX;
            imgBox.style.cursor = 'grab';
            if (Math.abs(diff) > dragThreshold) {
                changePhoto(diff > 0 ? 1 : -1);
                article.dataset.isSwiping = "true";
                setTimeout(() => article.dataset.isSwiping = "false", 100);
            }
            isDragging = false;
        });
        imgBox.addEventListener('mouseleave', () => { isDragging = false; imgBox.style.cursor = 'grab'; });
    }

    article.addEventListener('click', (e) => {
        if(e.target.classList.contains('card-mini-arrow')) return;
        if(article.dataset.isSwiping === "true") { e.preventDefault(); return; }
        window.location.href = `propiedad.html?id=${id}`;
    });

    return article;
}