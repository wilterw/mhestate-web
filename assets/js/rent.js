/**
 * RENT.JS - V42.0 (CORRECCIÓN CRÍTICA: FORMULARIO DESAPARECIDO)
 * - Bug Fix: Se elimina 'div' del selector en translateModalContent().
 * Antes, al detectar la palabra "Contáctanos" dentro de un div contenedor,
 * reemplazaba todo el HTML del formulario por texto plano.
 * - Ahora solo traduce nodos de texto específicos (h1-h6, p, span, label, button).
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
        
        lbl_bath: 'BAÑOS:', lbl_cap: 'PLAZAS:',
        unit_night: '/ noche', unit_month: '/ mes', consult: 'Consultar',
        from: 'Desde',

        cat_holiday: 'VACACIONAL', cat_long: 'LARGA TEMPORADA',
        empty_title: 'No hay propiedades disponibles',
        empty_text: 'Actualmente no hay resultados para esta categoría.',
        btn_interest: 'REGISTRAR INTERÉS',

        long_term_title: 'Actualmente no tenemos viviendas disponibles para larga temporada.',
        long_term_p1: 'Sin embargo, contamos con propietarios que pueden ofrecer sus viviendas por un número determinado de meses. 🏠📅',
        long_term_p2: 'También es posible que tengamos nuevas viviendas en camino. ✨ Registra tu interés y te contactaremos tan pronto como tengamos algo que coincida con tus deseos. 🔑',
        
        // --- DICCIONARIO MODAL ---
        modal_contact_header: 'CONTÁCTANOS',
        modal_form_title: 'Contactar con el Agente',
        modal_lbl_name: 'Nombre',
        modal_lbl_email: 'Email',
        modal_lbl_phone: 'Teléfono',
        modal_lbl_msg: 'Mensaje',
        modal_btn_send: 'ENVIAR MENSAJE',
        
        // ROLES
        dept_title: 'Departamento de Alquileres',
        role_manager: 'Gestora de Alquileres',

        'type_apartamento': 'Apartamento', 'type_piso': 'Piso', 'type_atico': 'Ático',
        'type_villa': 'Villa', 'type_chalet': 'Chalet', 'type_estudio': 'Estudio',
        'type_casa': 'Casa', 'type_pareado': 'Pareado', 'type_adosado': 'Adosado'
    },
    'en': {
        title: 'For Rent', tab_all: 'DISCOVER ALL', tab_hol: 'HOLIDAY', tab_long: 'LONG TERM',
        btn_prev: 'Previous', btn_next: 'Next',
        txt_title: 'We know your time is valuable.',
        txt_p1: 'Our team is here to support you.',
        txt_p2: 'Contact us to find your perfect home.',
        btn_contact: 'CONTACT US',
        
        lbl_bath: 'BATHS:', lbl_cap: 'BEDS:',
        unit_night: '/ night', unit_month: '/ month', consult: 'On Request',
        from: 'From',

        cat_holiday: 'HOLIDAY', cat_long: 'LONG TERM',
        empty_title: 'No properties available',
        empty_text: 'Currently no properties in this category.',
        btn_interest: 'REGISTER INTEREST',

        long_term_title: 'Currently, we have no homes available for long-term rental.',
        long_term_p1: 'However, we have homeowners who can offer their homes for rent for a certain number of months. 🏠📅',
        long_term_p2: 'We may also have new homes on the way. ✨ Register your interest, and we will contact you as soon as we get something that matches your wishes. 🔑',

        // --- MODAL DICTIONARY ---
        modal_contact_header: 'CONTACT US',
        modal_form_title: 'Contact Agent',
        modal_lbl_name: 'Name',
        modal_lbl_email: 'Email',
        modal_lbl_phone: 'Phone',
        modal_lbl_msg: 'Message',
        modal_btn_send: 'SEND MESSAGE',
        
        // ROLES
        dept_title: 'Rentals Department',
        role_manager: 'Rental Manager',

        'type_apartamento': 'Apartment', 'type_piso': 'Flat', 'type_atico': 'Penthouse',
        'type_villa': 'Villa', 'type_chalet': 'Chalet', 'type_estudio': 'Studio',
        'type_casa': 'House', 'type_pareado': 'Semi-detached', 'type_adosado': 'Townhouse'
    },
    'sv': {
        title: 'Uthyrning', tab_all: 'VISA ALLA', tab_hol: 'SEMESTER', tab_long: 'LÅNGTID',
        btn_prev: 'Föregående', btn_next: 'Nästa',
        txt_title: 'Vi vet att din tid är värdefull.',
        txt_p1: 'Vårt team är här för att stödja dig.',
        txt_p2: 'Kontakta oss för att hitta ditt drömboende.',
        btn_contact: 'KONTAKTA OSS',
        
        lbl_bath: 'BAD:', lbl_cap: 'SÄNGAR:',
        unit_night: '/ natt', unit_month: '/ månad', consult: 'På begäran',
        from: 'Från',

        cat_holiday: 'SEMESTER', cat_long: 'LÅNGTID',
        empty_title: 'Inga bostäder tillgängliga',
        empty_text: 'För närvarande inga bostäder i denna kategori.',
        btn_interest: 'ANMÄL DITT INTRESSE',

        long_term_title: 'Just nu har vi inga bostäder tillgängliga för långtidsuthyrning.',
        long_term_p1: 'Däremot har vi bostadsägare som kan erbjuda sina bostäder för uthyrning under ett visst antal månader. 🏠📅',
        long_term_p2: 'Vi kan även ha nya bostäder på väg in. ✨ Anmäl ditt intresse så kontaktar vi dig så snart vi får in något som matchar dina önskemål. 🔑',

        // --- MODAL DICTIONARY ---
        modal_contact_header: 'KONTAKTA OSS',
        modal_form_title: 'Kontakta Mäklare',
        modal_lbl_name: 'Namn',
        modal_lbl_email: 'E-post',
        modal_lbl_phone: 'Telefon',
        modal_lbl_msg: 'Meddelande',
        modal_btn_send: 'SKICKA MEDDELANDE',
        
        // ROLES
        dept_title: 'Uthyrningsavdelning',
        role_manager: 'Uthyrningschef',

        'type_apartamento': 'Lägenhet', 'type_piso': 'Lägenhet', 'type_atico': 'Takvåning',
        'type_villa': 'Villa', 'type_chalet': 'Chalet', 'type_estudio': 'Studio',
        'type_casa': 'Hus', 'type_pareado': 'Parhus', 'type_adosado': 'Radhus'
    }
};

// HELPER PARA TIPO PROPIEDAD
function formatRentType(rawType, dict) {
    if (!rawType) return 'Propiedad';
    const safe = rawType.toLowerCase().trim();
    if (safe.includes('apartamento')) return dict.type_apartamento || 'Apartamento';
    if (safe.includes('piso')) return dict.type_piso || 'Piso';
    if (safe.includes('ático') || safe.includes('atico')) return dict.type_atico || 'Ático';
    if (safe.includes('villa')) return dict.type_villa || 'Villa';
    if (safe.includes('chalet')) return dict.type_chalet || 'Chalet';
    if (safe.includes('estudio')) return dict.type_estudio || 'Estudio';
    if (safe.includes('casa')) return dict.type_casa || 'Casa';
    if (safe.includes('pareado')) return dict.type_pareado || 'Pareado';
    if (safe.includes('adosado')) return dict.type_adosado || 'Adosado';
    return rawType.charAt(0).toUpperCase() + rawType.slice(1);
}

document.addEventListener("DOMContentLoaded", () => {
    injectRentStyles(); 
    translateRentUI();
    fetchRentFromXML(); 
    setupContactButtons(); 

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
        if(document.getElementById('contact-modal') && document.getElementById('contact-modal').classList.contains('active')) {
            translateModalContent();
        }
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
        .slider-img {
            opacity: 0; transition: opacity 1.5s ease-in-out; 
        }
        .slider-img.active {
            opacity: 1;
        }
    `;
    document.head.appendChild(style);
}

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

async function fetchRentFromXML() {
    const container = document.getElementById('rent-grid');
    container.innerHTML = '<div class="loading-spinner"></div>';
    const lang = localStorage.getItem('preferredLang') || 'es';
    const dict = I18N_RENT[lang];
    
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

                const rawType = getXMLValue(item, ['tipo_ofer', 'tipo']) || 'Propiedad';
                const zone = getXMLValue(item, ['zona', 'area']);
                const city = getXMLValue(item, ['poblacion', 'ciudad']);
                const typeTrans = formatRentType(rawType, dict);
                
                const title = `${typeTrans} - ${zone || city}`;
                let price = getXMLValue(item, ['precioalq', 'precio_dia', 'precio']);

                let dorm = getXMLValue(item, ['habitaciones', 'dormitorios']);
                if (!dorm || dorm === '0') dorm = extractNumFromDesc(fullDesc, 'dorm');

                let bath = getXMLValue(item, ['banyos', 'banos', 'aseos']);
                if (!bath || bath === '0') bath = extractNumFromDesc(fullDesc, 'bath');

                let cap = getXMLValue(item, ['personas', 'capacidad', 'camas', 'plazas']);
                if (!cap || cap === '0') {
                    cap = extractNumFromDesc(fullDesc, 'cap');
                    if (!cap && dorm && dorm !== '0') cap = (parseInt(dorm) * 2).toString();
                }

                allRentProperties.push({
                    id: getXMLValue(item, ['id', 'ref']),
                    name: title,
                    rawType: rawType, // Guardamos para re-traducir si cambia idioma
                    zone: zone || city,
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

    // --- BLOQUE INTERCEPTOR: LARGA TEMPORADA ---
    if (currentCategory === 'long_term') {
        container.innerHTML = `
            <div class="long-term-message-container" style="grid-column: 1 / -1; text-align: center; padding: 80px 20px; background: #fff; border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); font-family: 'Inter', sans-serif;">
                <img src="assets/img/logo mh state negro.png" alt="MH Estate" style="max-width: 150px; display: block; margin: 0 auto 30px auto;">

                <h3 style="font-size: 1.6rem; color: #000; margin-bottom: 25px; font-weight: 700; text-transform: uppercase; letter-spacing: -0.5px;">
                    ${dict.long_term_title}
                </h3>

                <p style="font-size: 1.15rem; color: #444; max-width: 750px; margin: 0 auto 20px; line-height: 1.7;">
                    ${dict.long_term_p1}
                </p>
                <p style="font-size: 1.15rem; color: #444; max-width: 750px; margin: 0 auto 40px; line-height: 1.7;">
                    ${dict.long_term_p2}
                </p>
                
                <a href="contact.html" class="btn-valuable-gold btn-contact-trigger" style="text-decoration:none; display:inline-block; font-weight: 600; letter-spacing: 1px;">
                    ${dict.btn_interest}
                </a>
            </div>
        `;
        paginationContainer.innerHTML = "";
        
        // Re-asignar evento al botón dinámico
        const newBtn = container.querySelector('.btn-contact-trigger');
        if (newBtn) {
            newBtn.addEventListener('click', (e) => {
                e.preventDefault();
                openRentModal();
            });
        }
        return;
    }
    // --------------------------------------------------

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
        toShow.forEach(prop => {
            const typeTrans = formatRentType(prop.rawType, dict);
            prop.name = `${typeTrans} - ${prop.zone}`;
            container.appendChild(createRentCard(prop, dict));
        });
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
    const priceStr = (prop.price && prop.price !== '0') ? `${dict.from} ${prop.price}€ ${unit}` : dict.consult;

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

// --- TRADUCTOR CONTENIDO MODAL (CORREGIDO) ---
function translateModalContent() {
    const lang = localStorage.getItem('preferredLang') || 'es';
    const dict = I18N_RENT[lang];
    const modal = document.getElementById('contact-modal');
    if(!modal) return;

    // Etiquetas Formulario
    const selectors = [
        { sel: 'label[for*="name"], label[for*="nombre"]', text: dict.modal_lbl_name },
        { sel: 'label[for*="email"], label[for*="correo"]', text: dict.modal_lbl_email },
        { sel: 'label[for*="phone"], label[for*="tel"]', text: dict.modal_lbl_phone },
        { sel: 'label[for*="msg"], label[for*="message"], label[for*="mensaje"]', text: dict.modal_lbl_msg },
        { sel: 'button[type="submit"]', text: dict.modal_btn_send }
    ];
    selectors.forEach(item => {
        const els = modal.querySelectorAll(item.sel);
        els.forEach(el => { if(el) el.textContent = item.text; });
    });

    // Reemplazo de Textos Específicos (Sin usar DIV para evitar borrado de bloques)
    const textElements = modal.querySelectorAll('h1, h2, h3, h4, p, span, b, strong'); 
    textElements.forEach(el => {
        const txt = el.textContent.trim().toUpperCase();
        
        if (txt.includes('DEPARTAMENTO DE ALQUILERES')) el.textContent = dict.dept_title;
        if (txt.includes('GESTORA DE ALQUILERES')) el.textContent = dict.role_manager;
        
        // TRADUCCIÓN FORZADA DE "CONTÁCTANOS" (Solo en encabezados, no en divs padres)
        if (txt === 'CONTACTANOS' || txt === 'CONTÁCTANOS' || txt === 'CONTACT US' || txt.includes('CONTÁCTANOS')) {
            el.textContent = dict.modal_contact_header;
        }
    });
}

// --- FUNCIÓN PRINCIPAL PARA ABRIR MODAL ---
async function openRentModal() {
    let modal = document.getElementById('contact-modal');
    
    // 1. Crear si no existe
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'contact-modal';
        modal.className = 'modal-overlay';
        modal.innerHTML = `<div class="modal-container"><button class="modal-close-btn">&times;</button><div class="modal-header-logo"><img src="assets/img/logo mh state negro.png" alt="MH ESTATE" style="max-width:150px;"></div><div id="modal-content-injector"></div></div>`;
        document.body.appendChild(modal);
        
        modal.querySelector('.modal-close-btn').addEventListener('click', () => {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        });
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // 2. Verificar contenido y cargar si es necesario
    const injector = modal.querySelector('#modal-content-injector');
    if (injector && injector.innerHTML.trim().length < 50) {
        try {
            const resp = await fetch('contact-rent.html');
            if (resp.ok) {
                const html = await resp.text();
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                const contactSection = doc.querySelector('.contact-section') || doc.querySelector('main') || doc.body;
                
                injector.innerHTML = contactSection.innerHTML;
                
                doc.querySelectorAll('script').forEach(s => {
                    const ns = document.createElement('script');
                    ns.textContent = s.textContent;
                    document.body.appendChild(ns);
                });
            } else {
                throw new Error('Fetch failed');
            }
        } catch (e) {
            console.error(e);
            window.location.href = 'contact.html';
            return;
        }
    }

    // 3. Traducir y Mostrar
    translateModalContent();
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function setupContactButtons() {
    document.querySelectorAll('.btn-contact-trigger, .contact-trigger').forEach(btn => {
        if(btn.dataset.hasModalListener) return;
        btn.dataset.hasModalListener = "true";
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            openRentModal();
        });
    });
}