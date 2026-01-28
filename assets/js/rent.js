/**
 * RENT.JS - V19.2 (FINAL - CONEXIÓN CON APP.JS LOGIC)
 */

const ITEMS_PER_PAGE = 5;
let allRentProperties = [];
let currentCategory = 'all';
let currentPage = 1;

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
        feat_bed: 'Dorm.', feat_bath: 'Baños', feat_pool: 'Piscina', feat_garage: 'Garaje', feat_wifi: 'Wifi', feat_terrace: 'Terraza'
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
        feat_bed: 'Bed', feat_bath: 'Bath', feat_pool: 'Pool', feat_garage: 'Garage', feat_wifi: 'Wifi', feat_terrace: 'Terrace'
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
        feat_bed: 'Sovrum', feat_bath: 'Badrum', feat_pool: 'Pool', feat_garage: 'Garage', feat_wifi: 'Wifi', feat_terrace: 'Terrass'
    }
};

document.addEventListener("DOMContentLoaded", () => {
    translateRentUI();
    fetchRentData();
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

function initGlobalContactModal() {
    const triggers = document.querySelectorAll('.btn-contact-trigger, .contact-trigger');
    triggers.forEach(btn => {
        btn.addEventListener('click', async (e) => {
            e.preventDefault();
            let modal = document.getElementById('contact-modal');
            const closeBtn = document.querySelector('.modal-close-btn');

            const openModal = () => { if(modal) { modal.classList.add('active'); document.body.style.overflow = 'hidden'; } };
            const closeModal = () => { if(modal) { modal.classList.remove('active'); document.body.style.overflow = ''; } };

            if (modal) {
                openModal();
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

                        openModal();
                        if (window.langManager) setTimeout(() => window.langManager.translatePage(), 50);
                    }
                } catch (error) {
                    console.error("Modal fetch error:", error);
                    window.location.href = 'contact.html';
                }
            }
        });
    });
}

async function fetchRentData() {
    const container = document.getElementById('rent-grid');
    container.innerHTML = '<div class="loading-spinner"></div>';
    try {
        const res = await fetch(`assets/api/booking_proxy.php?v=${Date.now()}`);
        if (!res.ok) throw new Error("PHP Error");
        const json = await res.json();
        if(json.status === 'success') { allRentProperties = json.data; renderRentGrid(); } 
        else throw new Error("JSON Error");
    } catch (e) { useFallbackData(); }
}

function useFallbackData() {
    allRentProperties = [
        { "id": "1", "category": "holiday", "name": "Villa Paraíso", "city": "Nerja", "price": 1500, "m2": 120, "beds": 3, "baths": 2, "features": ["pool", "wifi"], "image": "assets/img/hero-bg.jpg", "link": "#" },
        { "id": "2", "category": "long_term", "name": "Apartamento Centro", "city": "Torrox", "price": 850, "m2": 80, "beds": 2, "baths": 1, "features": ["terrace"], "image": "assets/img/hero-bg1.jpg", "link": "contact.html" },
        { "id": "3", "category": "holiday", "name": "Sunny Beach House", "city": "Marbella", "price": 2200, "m2": 200, "beds": 4, "baths": 3, "features": ["pool", "garage", "ac"], "image": "assets/img/cta-bg.jpg", "link": "#" },
        { "id": "4", "category": "long_term", "name": "Townhouse Modern", "city": "Nerja", "price": 1200, "m2": 150, "beds": 3, "baths": 2, "features": ["garage"], "image": "assets/img/sell-hero-bg.jpg", "link": "contact.html" },
        { "id": "5", "category": "holiday", "name": "Cozy Studio", "city": "Torrox", "price": 400, "m2": 45, "beds": 1, "baths": 1, "features": ["wifi"], "image": "assets/img/hero-bg.jpg", "link": "#" },
        { "id": "6", "category": "holiday", "name": "Luxury Penthouse", "city": "Marbella", "price": 3000, "m2": 180, "beds": 3, "baths": 3, "features": ["pool", "terrace"], "image": "assets/img/mhestate 2.jpg", "link": "#" },
        { "id": "7", "category": "long_term", "name": "Family Home", "city": "Nerja", "price": 1100, "m2": 130, "beds": 3, "baths": 2, "features": ["garage"], "image": "assets/img/hero-bg1.jpg", "link": "contact.html" },
        { "id": "8", "category": "holiday", "name": "Mountain Retreat", "city": "Frigiliana", "price": 900, "m2": 100, "beds": 2, "baths": 1, "features": ["pool"], "image": "assets/img/cta-bg.jpg", "link": "#" },
        { "id": "9", "category": "long_term", "name": "Urban Flat", "city": "Málaga", "price": 950, "m2": 75, "beds": 2, "baths": 1, "features": ["wifi"], "image": "assets/img/hero-bg.jpg", "link": "contact.html" },
        { "id": "10", "category": "holiday", "name": "Sea View Villa", "city": "Nerja", "price": 2500, "m2": 200, "beds": 4, "baths": 3, "features": ["pool", "garage"], "image": "assets/img/sell-hero-bg.jpg", "link": "#" },
        { "id": "11", "category": "holiday", "name": "Beachfront Apt", "city": "Torrox", "price": 1800, "m2": 90, "beds": 2, "baths": 2, "features": ["terrace", "wifi"], "image": "assets/img/hero-bg.jpg", "link": "#" },
        { "id": "12", "category": "long_term", "name": "Country House", "city": "Frigiliana", "price": 1300, "m2": 160, "beds": 3, "baths": 2, "features": ["pool", "garden"], "image": "assets/img/hero-bg1.jpg", "link": "contact.html" }
    ];
    renderRentGrid();
}

function renderRentGrid() {
    const container = document.getElementById('rent-grid');
    const paginationContainer = document.getElementById('rent-pagination');
    const lang = localStorage.getItem('preferredLang') || 'es';
    const dict = I18N_RENT[lang];

    let filtered = allRentProperties;
    if (currentCategory !== 'all') { filtered = allRentProperties.filter(p => p.category === currentCategory); }
    const totalItems = filtered.length;
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
    
    if (currentPage > totalPages) currentPage = totalPages || 1;
    if (currentPage < 1) currentPage = 1;

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const toShow = filtered.slice(startIndex, endIndex);

    container.innerHTML = "";
    if (toShow.length === 0) {
        container.innerHTML = `<div style="text-align:center; padding:40px; width:100%;">No properties found.</div>`;
    } else {
        toShow.forEach(prop => { container.appendChild(createRentCard(prop, dict)); });
    }
    renderPaginationControls(paginationContainer, totalPages, dict);
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

function createRentCard(prop, dict) {
    const article = document.createElement('article');
    article.className = 'rent-layout-card';
    const catLabel = prop.category === 'holiday' ? dict.cat_holiday : dict.cat_long;
    const overlayTitleText = `${prop.city} ${catLabel}`.toUpperCase();

    const feats = [];
    if(prop.m2) feats.push(`${prop.m2} m²`);
    if(prop.beds) feats.push(`${prop.beds} ${dict.feat_bed}`);
    if(prop.baths) feats.push(`${prop.baths} ${dict.feat_bath}`);
    if (prop.features) {
        prop.features.forEach(f => {
            const key = `feat_${f}`; 
            const translated = dict[key] || (f.charAt(0).toUpperCase() + f.slice(1));
            feats.push(translated);
        });
    }
    const featStr = feats.join(' | ');

    article.innerHTML = `
        <h3 class="rent-external-title">${prop.name}</h3>
        <div class="rent-image-box">
            <img src="${prop.image}" alt="${prop.name}" loading="lazy">
            <div class="rent-overlay-specs">
                <div class="overlay-big-title">${overlayTitleText}</div>
                <div class="overlay-small-desc">${featStr}</div>
                <a href="${prop.link}" target="_blank" class="overlay-link-arrow">${dict.view_prop} ➜</a>
            </div>
        </div>
    `;
    return article;
}

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