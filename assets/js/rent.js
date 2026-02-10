/**
 * RENT.JS - V30.4 (TRANSICIÓN 5S + EFECTO SUAVE + PRECIO 'DESDE')
 */

const ITEMS_PER_PAGE = 6;
let allRentProperties = [];
let currentCategory = 'all';
let currentPage = 1;

// URL ficticia
const FAKE_ICAL_URL = "#";

const I18N_RENT = {
    'es': {
        title: 'Alquiler', tab_all: 'VER TODAS', tab_hol: 'VACACIONAL', tab_long: 'LARGA TEMPORADA',
        btn_prev: 'Anterior', btn_next: 'Siguiente',
        txt_title: 'Sabemos que su tiempo es valioso.',
        txt_p1: 'Nuestro equipo de especialistas está aquí para ayudarle.',
        txt_p2: 'Contáctenos para encontrar su propiedad ideal.',
        btn_contact: 'CONTÁCTENOS',
        
        lbl_dorm: 'DORM:', lbl_bath: 'BAÑOS:', lbl_cap: 'PLAZAS:',
        unit_night: '/ noche', unit_month: '/ mes', consult: 'Consultar',
        from: 'Desde',

        cat_holiday: 'VACACIONAL', cat_long: 'LARGA TEMPORADA',
        empty_title: 'No hay propiedades disponibles',
        empty_text: 'Actualmente no hay resultados para esta categoría.',
        btn_interest: 'REGISTRAR INTERÉS'
    },
    'en': {
        title: 'For Rent', tab_all: 'DISCOVER ALL', tab_hol: 'HOLIDAY', tab_long: 'LONG TERM',
        btn_prev: 'Previous', btn_next: 'Next',
        txt_title: 'We know your time is valuable.',
        txt_p1: 'Our team is here to support you.',
        txt_p2: 'Contact us to find your perfect home.',
        btn_contact: 'CONTACT US',
        
        lbl_dorm: 'BEDS:', lbl_bath: 'BATHS:', lbl_cap: 'GUESTS:',
        unit_night: '/ night', unit_month: '/ month', consult: 'On Request',
        from: 'From',

        cat_holiday: 'HOLIDAY', cat_long: 'LONG TERM',
        empty_title: 'No properties available',
        empty_text: 'Currently no properties in this category.',
        btn_interest: 'REGISTER INTEREST'
    },
    'sv': {
        title: 'Uthyrning', tab_all: 'VISA ALLA', tab_hol: 'SEMESTER', tab_long: 'LÅNGTID',
        btn_prev: 'Föregående', btn_next: 'Nästa',
        txt_title: 'Vi vet att din tid är värdefull.',
        txt_p1: 'Vårt team är här för att stödja dig.',
        txt_p2: 'Kontakta oss för att hitta ditt drömboende.',
        btn_contact: 'KONTAKTA OSS',
        
        lbl_dorm: 'SOVR:', lbl_bath: 'BAD:', lbl_cap: 'PLATSER:',
        unit_night: '/ natt', unit_month: '/ månad', consult: 'På begäran',
        from: 'Från',

        cat_holiday: 'SEMESTER', cat_long: 'LÅNGTID',
        empty_title: 'Inga bostäder tillgängliga',
        empty_text: 'För närvarande inga bostäder i denna kategori.',
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

function injectRentStyles() {
    if (document.getElementById('rent-dynamic-styles')) return;
    const style = document.createElement('style');
    style.id = 'rent-dynamic-styles';
    style.innerHTML = `
        .rent-card-overlay-gradient {
            position: absolute; bottom: 0; left: 0; width: 100%; height: 75%;
            background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0) 100%);
            z-index: 3; pointer-events: none;
        }
        .rent-empty-state {
            grid-column: 1 / -1; text-align: center; padding: 60px 20px; 
            background: #fff; border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); margin-top: 20px;
        }
    `;
    document.head.appendChild(style);
}

// --- HELPERS ---
function getXMLValue(node, tags) {
    if (!Array.isArray(tags)) tags = [tags];
    for (const tag of tags) {
        const el = node.querySelector(tag);
        if (el && el.textContent && el.textContent.trim() !== '') return el.textContent.trim();
    }
    return "";
}

function extractNumFromDesc(text, type) {
    if (!text) return null;
    text = text.toLowerCase();
    const numMap = { 'un': 1, 'una': 1, 'uno': 1, 'primer': 1, 'dos': 2, 'tres': 3, 'cuatro': 4, 'cinco': 5, 'seis': 6, 'siete': 7, 'ocho': 8, 'nueve': 9, 'diez': 10 };
    let regex;
    
    if (type === 'dorm') regex = /(?:(\d+)|(un|una|dos|tres|cuatro|cinco|seis|siete|ocho))\s*(?:dorm|hab)/i;
    else if (type === 'bath') regex = /(?:(\d+)|(un|una|dos|tres|cuatro|cinco))\s*(?:bañ|ban|aseo)/i;
    else if (type === 'cap') regex = /(?:capacidad\s*(?:para)?\s*(\d+))|(?:(?:para|hasta)\s*(\d+)\s*personas)|(?:(\d+)\s*(?:plazas|camas|personas))/i;

    const match = text.match(regex);
    if (match) {
        for (let i = 1; i < match.length; i++) {
            if (match[i]) return numMap[match[i]] || match[i];
        }
    }
    return null;
}

// --- CARGA DE DATOS ---
async function fetchRentFromXML() {
    const container = document.getElementById('rent-grid');
    container.innerHTML = '<div class="loading-spinner"></div>';
    
    try {
        const response = await fetch('assets/data/propiedades.xml');
        const str = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(str, "text/xml");
        const items = xmlDoc.querySelectorAll("propiedad");

        allRentProperties = [];

        items.forEach(item => {
            const accion = getXMLValue(item, ['accion', 'operacion']);
            
            if (accion.toLowerCase().includes("alquiler")) {
                const fotos = [];
                for(let i=1; i<=20; i++) {
                    const f = item.querySelector(`foto${i}`)?.textContent;
                    if(f && f.trim().length > 0) fotos.push(f);
                }
                if(fotos.length === 0) fotos.push('assets/img/hero-bg.jpg');

                const fullDesc = (
                    getXMLValue(item, ['titulo']) + " " +
                    getXMLValue(item, ['descrip1', 'descripcion']) + " " +
                    getXMLValue(item, ['descrip2'])
                ).toLowerCase();

                // 1. TÍTULO AUTOMÁTICO (Si no hay explícito, usa ZONA - CIUDAD)
                let title = getXMLValue(item, ['titulo', 'nombre', 'headline']);
                if (!title) {
                    const poblacion = getXMLValue(item, ['poblacion', 'ciudad']);
                    const zona = getXMLValue(item, ['zona', 'area']);
                    if (zona && poblacion) title = `${zona} – ${poblacion}`;
                    else if (poblacion) title = poblacion;
                    else title = "Propiedad en Alquiler";
                }

                // 2. PRECIO
                let price = getXMLValue(item, ['precioalq', 'precio_dia', 'precio']);

                // 3. EXTRACCIÓN (Variables XML o Descripción)
                let dorm = getXMLValue(item, ['habitaciones', 'dormitorios']);
                if (!dorm || dorm === '0') dorm = extractNumFromDesc(fullDesc, 'dorm');

                let bath = getXMLValue(item, ['banyos', 'banos', 'aseos']);
                if (!bath || bath === '0') bath = extractNumFromDesc(fullDesc, 'bath');

                let cap = getXMLValue(item, ['personas', 'capacidad', 'camas', 'plazas']);
                if (!cap || cap === '0') cap = extractNumFromDesc(fullDesc, 'cap');

                allRentProperties.push({
                    id: getXMLValue(item, ['id', 'ref']),
                    name: title,
                    category: accion.toLowerCase().includes("vacacional") ? "holiday" : "long_term",
                    price: price || "0",
                    dorm: dorm || "0",
                    bath: bath || "0",
                    cap: cap || "0",
                    fotos: fotos,
                    link: `propiedad-rent.html?id=${getXMLValue(item, 'id')}`
                });
            }
        });
        renderRentGrid();

    } catch (error) {
        console.error("Error:", error);
        container.innerHTML = `<div style="text-align:center;">Error cargando propiedades.</div>`;
    }
}

function renderRentGrid() {
    const container = document.getElementById('rent-grid');
    const paginationContainer = document.getElementById('rent-pagination');
    const lang = localStorage.getItem('preferredLang') || 'es';
    const dict = I18N_RENT[lang];

    let filtered = allRentProperties;
    if (currentCategory !== 'all') filtered = allRentProperties.filter(p => p.category === currentCategory);

    const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
    
    if (currentPage > totalPages) currentPage = totalPages || 1;
    if (currentPage < 1) currentPage = 1;

    const toShow = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    container.innerHTML = "";
    
    if (toShow.length === 0) {
        container.innerHTML = `<div class="rent-empty-state"><h3 style="margin-bottom:10px;">${dict.empty_title}</h3><p>${dict.empty_text}</p></div>`;
    } else {
        toShow.forEach(prop => container.appendChild(createRentCard(prop, dict)));
        setTimeout(initAutoSliders, 100);
    }
    
    if (toShow.length > 0) renderPaginationControls(paginationContainer, totalPages, dict);
    else paginationContainer.innerHTML = "";
}

function createRentCard(prop, dict) {
    const article = document.createElement('article');
    article.className = 'rent-layout-card';
    article.onclick = (e) => { if (e.target.tagName !== 'BUTTON') window.location.href = prop.link; };
    
    const finalTitle = prop.name.toUpperCase();
    const unit = prop.category === 'holiday' ? dict.unit_night : dict.unit_month;
    // MODIFICACIÓN AQUÍ: Se añade "dict.from" antes del precio
    const priceStr = (prop.price && prop.price !== '0') ? `${dict.from} € ${prop.price} ${unit}` : dict.consult;

    let imagesHtml = '';
    prop.fotos.slice(0, 5).forEach((foto, index) => {
        imagesHtml += `<img src="${foto}" class="slider-img ${index === 0 ? 'active' : ''}" alt="${prop.name}" loading="lazy">`;
    });

    article.innerHTML = `
        <div class="rent-image-box">
            <div class="auto-slider-container">${imagesHtml}</div>
            <div class="rent-card-overlay-gradient"></div>
            
            <div class="rent-overlay-container">
                <div class="rent-overlay-left">
                    <h3 class="rent-card-title">${finalTitle}</h3>
                    <div class="rent-card-price">${priceStr}</div>
                </div>

                <div class="rent-overlay-right">
                    ${prop.dorm && prop.dorm !== '0' ? `<span><b>${dict.lbl_dorm}</b> ${prop.dorm}</span>` : ''}
                    ${prop.bath && prop.bath !== '0' ? `<span><b>${dict.lbl_bath}</b> ${prop.bath}</span>` : ''}
                    ${prop.cap && prop.cap !== '0' ? `<span><b>${dict.lbl_cap}</b> ${prop.cap}</span>` : ''}
                </div>
            </div>
        </div>
    `;
    return article;
}

function initAutoSliders() {
    if(window.rentSliderIntervals) window.rentSliderIntervals.forEach(i => clearInterval(i));
    window.rentSliderIntervals = [];
    document.querySelectorAll('.auto-slider-container').forEach(container => {
        const images = container.querySelectorAll('.slider-img');
        if (images.length <= 1) return;
        let currentIndex = 0;
        // MODIFICACIÓN AQUÍ: 5000ms = 5 Segundos
        const interval = setInterval(() => {
            images[currentIndex].classList.remove('active');
            currentIndex = (currentIndex + 1) % images.length;
            images[currentIndex].classList.add('active');
        }, 5000);
        window.rentSliderIntervals.push(interval);
    });
}

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

function translateRentUI() {
    const lang = localStorage.getItem('preferredLang') || 'es';
    const dict = I18N_RENT[lang];
    const map = { 'rent-title': dict.title, 'tab-all': dict.tab_all, 'tab-holiday': dict.tab_hol, 'tab-long': dict.tab_long, 'txt-valuable-title': dict.txt_title, 'txt-valuable-p1': dict.txt_p1, 'txt-valuable-p2': dict.txt_p2, 'btn-contact-us': dict.btn_contact };
    for (const [id, text] of Object.entries(map)) { const el = document.getElementById(id); if(el) el.innerText = text; }
}

function initGlobalContactModal() {
    document.querySelectorAll('.btn-contact-trigger, .contact-trigger').forEach(btn => {
        const newBtn = btn.cloneNode(true); btn.parentNode.replaceChild(newBtn, btn);
        newBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            let modal = document.getElementById('contact-modal');
            const closeModal = () => { if(modal) { modal.classList.remove('active'); document.body.style.overflow = ''; } };
            if (modal) { modal.classList.add('active'); document.body.style.overflow = 'hidden'; } else {
                try {
                    const resp = await fetch('contact-rent.html?v=' + Date.now());
                    const html = await resp.text();
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(html, 'text/html');
                    modal = document.createElement('div'); modal.id = 'contact-modal'; modal.className = 'modal-overlay';
                    modal.innerHTML = `<div class="modal-container"><button class="modal-close-btn">&times;</button><div class="modal-header-logo"><img src="assets/img/logo mh state negro.png" alt="MH ESTATE" style="max-width:150px;"></div><div id="modal-content-injector"></div></div>`;
                    const contactSection = doc.querySelector('.contact-section') || doc.querySelector('main');
                    if (contactSection) {
                        modal.querySelector('#modal-content-injector').innerHTML = contactSection.innerHTML;
                        doc.querySelectorAll('script').forEach(s => { const ns = document.createElement('script'); ns.textContent = s.textContent; document.body.appendChild(ns); });
                        document.body.appendChild(modal);
                        modal.querySelector('.modal-close-btn').addEventListener('click', closeModal);
                        modal.classList.add('active'); document.body.style.overflow = 'hidden';
                        if (window.langManager) window.langManager.translatePage();
                    }
                } catch (error) { window.location.href = 'contact.html'; }
            }
        });
    });
}