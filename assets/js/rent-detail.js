/**
 * RENT-DETAIL.JS - V56.1 (Añadido Mascotas, Niños y Ascensor Condicional)
 * - Propiedades Similares: Ahora usan el diseño .rent-layout-card (igual que rent.html).
 * - Estilos Inyectados: Se añaden los estilos de tarjeta (gradiente, slider) dinámicamente.
 * - Lógica Unificada: Extracción de datos para similares igual que en el listado principal.
 * - Nuevos Filtros: Mascotas (Sí/No), Niños (Sí/No), Ascensor (Sí/No si Plantas >= 2).
 */

document.addEventListener('DOMContentLoaded', () => {
    initRentPage();
    setupTabs();
    injectValidationModalStyles(); 
    injectRentCardStyles(); 
    setupLightboxNavigation(); 

    window.addEventListener('languageChanged', () => {
        if (currentProperty) {
            renderRentDetails(currentProperty);
            renderRentFeatures(currentProperty);
            if (allCachedItems.length > 0) renderSimilarRentals(currentProperty, allCachedItems);
        }
    });
});

let lightboxMedia = []; 
let currentLightboxIndex = 0;
let mapInitialized = false;
let rentPrice = 0;
let currentProperty = null; 
let allCachedItems = [];    

// FOTOS DE AGENTES
const AGENT_PHOTOS = {
    'Cecilia': 'assets/img/cecilia.jpg',
    'Rebecca': 'assets/img/Rebbeca.jpg',
    'Isidora': 'assets/img/Isidora.jpg',
    'CEO': 'assets/img/ceo.jpg', 
    'default': 'assets/img/logo mh state negro.png'
};

const I18N_RENT_UI = {
    'es': {
        unit_day: '/ noche', unit_week: '/ semana', unit_month: '/ mes',
        lbl_in: 'Llegada', lbl_out: 'Salida', 
        total: 'TOTAL', nights: 'noches',
        no_data: 'No disponible', plan_click: 'Clic para ampliar',
        feat_ref: 'Referencia', 
        feat_capacity: 'Plazas', 
        feat_beds: 'Dormitorios', feat_baths: 'Baños', 
        feat_built: 'Construido', feat_plot: 'Parcela', feat_terrace: 'Terraza', 
        feat_floor: 'Planta', feat_year: 'Año Const.', feat_ibi: 'IBI', feat_community: 'Comunidad',
        feat_pool: 'Piscina', feat_garage: 'Garaje', feat_wifi: 'Wifi', 
        feat_seaview: 'Vistas Mar', feat_ac: 'Aire Acond.',
        feat_elevator: 'Ascensor', feat_tv: 'TV',
        feat_heating: 'Calefacción', feat_furnished: 'Amueblado',
        feat_orient: 'Orientación', feat_checkin: 'Check-in', feat_checkout: 'Check-out', feat_distmar: 'Dist. Playa',
        feat_garden: 'Jardín', feat_disabled: 'Acceso Adapt.',
        
        // --- TEXTOS ACTUALIZADOS ---
        feat_pets: 'Se Aceptan Mascotas', feat_children: 'Se Aceptan Niños',
        
        lbl_card_bath: 'BAÑOS:', lbl_card_cap: 'PLAZAS:',
        consult: 'Consultar',

        'role_founder': 'Fundadora y Agente', 'role_agent': 'Agente Inmobiliaria',
        'role_rental': 'Gestora de Alquileres', 'agent_label': 'Agente Responsable',
        'btn_whatsapp': 'CONSULTAR POR WHATSAPP', 
        'txt_email': 'Email:', 'txt_phone': 'Teléfono:',
        'from': 'Desde',
        'modal_title': 'Fechas requeridas', 
        'modal_text': 'Para poder consultar disponibilidad con <strong>{agent}</strong>, por favor seleccione primero las fechas de llegada y salida.', 
        'modal_btn': 'ENTENDIDO',
        'wa_msg': 'Hola {agent}, estoy interesado en alquilar:\nPropiedad: {title} (Ref: {ref})\nFechas deseadas: del {in} al {out}.\n¿Tienen disponibilidad?',
        'yes': 'Sí', 'no': 'No', 
        'u_m': ' m', 'u_m2': ' m²',
        'orient_sur': 'Sur', 'orient_norte': 'Norte', 'orient_este': 'Este', 'orient_oeste': 'Oeste',
        'orient_sureste': 'Sureste', 'orient_suroeste': 'Suroeste', 'orient_noreste': 'Noreste', 'orient_noroeste': 'Noroeste',
        'floor_baja': 'Baja', 'floor_sotano': 'Sótano', 'floor_atico': 'Ático',
        'type_apartamento': 'Apartamento', 'type_piso': 'Piso', 'type_atico': 'Ático',
        'type_villa': 'Villa', 'type_chalet': 'Chalet', 'type_estudio': 'Estudio',
        'type_casa': 'Casa', 'type_pareado': 'Pareado', 'type_adosado': 'Adosado',
        'btn_email': 'Enviar Email'
    },
    'en': {
        unit_day: '/ night', unit_week: '/ week', unit_month: '/ month',
        lbl_in: 'Check-in', lbl_out: 'Check-out', 
        total: 'TOTAL', nights: 'nights',
        no_data: 'Not available', plan_click: 'Click to enlarge',
        feat_ref: 'Reference', 
        feat_capacity: 'Beds', 
        feat_beds: 'Bedrooms', feat_baths: 'Bathrooms', 
        feat_built: 'Size', feat_plot: 'Plot', feat_terrace: 'Terrace',
        feat_floor: 'Floor', feat_year: 'Year Built', feat_ibi: 'Tax (IBI)', feat_community: 'Community',
        feat_pool: 'Pool', feat_garage: 'Garage', feat_wifi: 'Wifi', 
        feat_seaview: 'Sea Views', feat_ac: 'A/C',
        feat_elevator: 'Elevator', feat_tv: 'TV',
        feat_heating: 'Heating', feat_furnished: 'Furnished',
        feat_orient: 'Orientation', feat_checkin: 'Check-in', feat_checkout: 'Check-out', feat_distmar: 'Dist. Beach',
        feat_garden: 'Garden', feat_disabled: 'Disabled Access',
        
        // --- TEXTOS ACTUALIZADOS ---
        feat_pets: 'Pets Allowed', feat_children: 'Children Allowed',

        lbl_card_bath: 'BATHS:', lbl_card_cap: 'BEDS:',
        consult: 'On Request',

        'role_founder': 'Founder & Agent', 'role_agent': 'Real Estate Agent',
        'role_rental': 'Rental Manager', 'agent_label': 'Listing Agent',
        'btn_whatsapp': 'ASK ON WHATSAPP', 
        'txt_email': 'Email:', 'txt_phone': 'Phone:',
        'from': 'From',
        'modal_title': 'Dates Required', 
        'modal_text': 'To check availability with <strong>{agent}</strong>, please select your check-in and check-out dates first.', 
        'modal_btn': 'UNDERSTOOD',
        'wa_msg': 'Hello {agent}, I am interested in renting:\nProperty: {title} (Ref: {ref})\nDates: from {in} to {out}.\nIs it available?',
        'yes': 'Yes', 'no': 'No', 
        'u_m': ' m', 'u_m2': ' m²',
        'orient_sur': 'South', 'orient_norte': 'North', 'orient_este': 'East', 'orient_oeste': 'West',
        'orient_sureste': 'South-East', 'orient_suroeste': 'South-West', 'orient_noreste': 'North-East', 'orient_noroeste': 'North-West',
        'floor_baja': 'Ground Floor', 'floor_sotano': 'Basement', 'floor_atico': 'Penthouse',
        'type_apartamento': 'Apartment', 'type_piso': 'Flat', 'type_atico': 'Penthouse',
        'type_villa': 'Villa', 'type_chalet': 'Chalet', 'type_estudio': 'Studio',
        'type_casa': 'House', 'type_pareado': 'Semi-detached', 'type_adosado': 'Townhouse',
        'btn_email': 'Send Email'
    },
    'sv': {
        unit_day: '/ natt', unit_week: '/ vecka', unit_month: '/ månad',
        lbl_in: 'Incheckning', lbl_out: 'Utcheckning', 
        total: 'TOTALT', nights: 'nätter',
        no_data: 'Ej tillgänglig', plan_click: 'Klicka för att förstora',
        feat_ref: 'Referens', 
        feat_capacity: 'Sängar', 
        feat_beds: 'Sovrum', feat_baths: 'Badrum', 
        feat_built: 'Byggyta', feat_plot: 'Tomt', feat_terrace: 'Terrass',
        feat_floor: 'Våning', feat_year: 'Byggår', feat_ibi: 'Skatt (IBI)', feat_community: 'Samfällighet',
        feat_pool: 'Pool', feat_garage: 'Garage', feat_wifi: 'Wifi', 
        feat_seaview: 'Havsutsikt', feat_ac: 'Luftkond.',
        feat_elevator: 'Hiss', feat_tv: 'TV',
        feat_heating: 'Uppvärmning', feat_furnished: 'Möblerad',
        feat_orient: 'Orientering', feat_checkin: 'Incheckning', feat_checkout: 'Utcheckning', feat_distmar: 'Avstånd Strand',
        feat_garden: 'Trädgård', feat_disabled: 'Handikappanpassat',
        
        // --- TEXTOS ACTUALIZADOS ---
        feat_pets: 'Husdjur Tillåtna', feat_children: 'Barn Tillåtna',

        lbl_card_bath: 'BAD:', lbl_card_cap: 'SÄNGAR:',
        consult: 'På begäran',

        'role_founder': 'Grundare & Mäklare', 'role_agent': 'Fastighetsmäklare',
        'role_rental': 'Uthyrningschef', 'agent_label': 'Ansvarig Mäklare',
        'btn_whatsapp': 'FRÅGA PÅ WHATSAPP', 
        'txt_email': 'E-post:', 'txt_phone': 'Telefon:',
        'from': 'Från',
        'modal_title': 'Datum krävs', 
        'modal_text': 'För att kontrollera tillgänglighet med <strong>{agent}</strong>, vänligen välj datum först.', 
        'modal_btn': 'JAG FÖRSTÅR',
        'wa_msg': 'Hej {agent}, jag är intresserad av att hyra:\nFastighet: {title} (Ref: {ref})\nDatum: från {in} till {out}.\nÄr den tillgänglig?',
        'yes': 'Ja', 'no': 'Nej', 
        'u_m': ' m', 'u_m2': ' m²',
        'orient_sur': 'Söder', 'orient_norte': 'Norr', 'orient_este': 'Öster', 'orient_oeste': 'Väster',
        'orient_sureste': 'Sydost', 'orient_suroeste': 'Sydväst', 'orient_noreste': 'Nordost', 'orient_noroeste': 'Nordväst',
        'floor_baja': 'Bottenvåning', 'floor_sotano': 'Källare', 'floor_atico': 'Takvåning',
        'type_apartamento': 'Lägenhet', 'type_piso': 'Lägenhet', 'type_atico': 'Takvåning',
        'type_villa': 'Villa', 'type_chalet': 'Chalet', 'type_estudio': 'Studio',
        'type_casa': 'Hus', 'type_pareado': 'Parhus', 'type_adosado': 'Radhus',
        'btn_email': 'Skicka E-post'
    }
};

function t(key) {
    const lang = localStorage.getItem('preferredLang') || 'es';
    return I18N_RENT_UI[lang][key] || key;
}

function formatPropType(rawType) {
    if (!rawType) return '';
    const safe = rawType.toLowerCase().trim();
    if (safe.includes('apartamento')) return t('type_apartamento');
    if (safe.includes('piso')) return t('type_piso');
    if (safe.includes('ático') || safe.includes('atico')) return t('type_atico');
    if (safe.includes('villa')) return t('type_villa');
    if (safe.includes('chalet')) return t('type_chalet');
    if (safe.includes('estudio')) return t('type_estudio');
    if (safe.includes('casa')) return t('type_casa');
    if (safe.includes('pareado')) return t('type_pareado');
    if (safe.includes('adosado')) return t('type_adosado');
    return rawType.charAt(0).toUpperCase() + rawType.slice(1);
}

function translateValue(val, type) {
    if (!val) return '';
    const v = val.toLowerCase().trim();
    if (type === 'orient') {
        if (v.includes('sur') && v.includes('este')) return t('orient_sureste');
        if (v.includes('sur') && v.includes('oeste')) return t('orient_suroeste');
        if (v.includes('nor') && v.includes('este')) return t('orient_noreste');
        if (v.includes('nor') && v.includes('oeste')) return t('orient_noroeste');
        if (v === 'sur') return t('orient_sur');
        if (v === 'norte') return t('orient_norte');
        if (v === 'este') return t('orient_este');
        if (v === 'oeste') return t('orient_oeste');
    }
    if (type === 'floor') {
        if (v.includes('baja') || v.includes('bajo')) return t('floor_baja');
        if (v.includes('sotano') || v.includes('sótano')) return t('floor_sotano');
        if (v.includes('atico') || v.includes('ático')) return t('floor_atico');
    }
    return val;
}

function injectValidationModalStyles() {
    if (document.getElementById('val-modal-styles')) return;
    const style = document.createElement('style');
    style.id = 'val-modal-styles';
    style.innerHTML = `.val-modal-overlay{position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.7);display:flex;align-items:center;justify-content:center;z-index:10000;opacity:0;pointer-events:none;transition:0.3s}.val-modal-overlay.active{opacity:1;pointer-events:auto}.val-modal-box{background:#fff;padding:35px;max-width:420px;width:90%;text-align:center;border-radius:8px;box-shadow:0 10px 30px rgba(0,0,0,0.2);transform:translateY(20px);transition:0.3s}.val-modal-overlay.active .val-modal-box{transform:translateY(0)}.val-modal-title{font-size:18px;font-weight:700;margin-bottom:15px;color:#000;text-transform:uppercase}.val-modal-text{font-size:15px;color:#555;line-height:1.6;margin-bottom:25px}.val-modal-btn{background:#000;color:#fff;border:none;padding:12px 25px;cursor:pointer;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:1px;border-radius:4px;}`;
    document.head.appendChild(style);
}

function injectRentCardStyles() {
    if (document.getElementById('rent-card-styles')) return;
    const style = document.createElement('style');
    style.id = 'rent-card-styles';
    style.innerHTML = `
        .rent-card-overlay-gradient {
            position: absolute; bottom: 0; left: 0; width: 100%; height: 75%;
            background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0) 100%);
            z-index: 3; pointer-events: none;
        }
        .rent-layout-card {
            flex: 0 0 320px; 
            margin-right: 20px;
            cursor: pointer;
            border-radius: 8px;
            overflow: hidden;
            background: #fff;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
    `;
    document.head.appendChild(style);
}

function showValidationModal(agentName) {
    let modal = document.getElementById('val-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'val-modal';
        modal.className = 'val-modal-overlay';
        modal.innerHTML = `<div class="val-modal-box"><div class="val-modal-title" id="val-modal-title"></div><div class="val-modal-text" id="val-modal-text"></div><button class="val-modal-btn" id="val-modal-btn"></button></div>`;
        document.body.appendChild(modal);
        modal.querySelector('#val-modal-btn').addEventListener('click', () => modal.classList.remove('active'));
        modal.addEventListener('click', (e) => { if (e.target === modal) modal.classList.remove('active'); });
    }
    document.getElementById('val-modal-title').textContent = t('modal_title');
    document.getElementById('val-modal-text').innerHTML = t('modal_text').replace('{agent}', agentName);
    document.getElementById('val-modal-btn').textContent = t('modal_btn');
    setTimeout(() => modal.classList.add('active'), 50);
}

function setupLightboxNavigation() {
    document.addEventListener('keydown', (e) => {
        const modal = document.getElementById('lightbox-modal');
        if (!modal || !modal.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        else if (e.key === 'ArrowRight') changeLightboxSlide(1);
        else if (e.key === 'ArrowLeft') changeLightboxSlide(-1);
    });
}

function generateSmartTitle(node) {
    const rawType = node.querySelector('tipo_ofer')?.textContent || 'Propiedad';
    const city = node.querySelector('poblacion')?.textContent || '';
    const zone = node.querySelector('zona')?.textContent || '';
    return `${formatPropType(rawType)} - ${zone || city}`;
}

function smartFormatText(text) {
    if (!text) return "";
    let html = text.replace(/<!\[CDATA\[|\]\]>/g, '').replace(/~/g, '<br><br>').replace(/—/g, '&mdash;').replace(/\r\n/g, '\n');
    const listPattern = /(?:^|\n)\s*[•\-\*]\s+(.*?)(?=\n|$|<br>)/g;
    if (listPattern.test(html)) {
        html = html.replace(listPattern, '<li>$1</li>');
        html = html.replace(/(<li>.*?<\/li>)+/g, '<ul>$&</ul>');
    }
    const keywords = ["Cocina", "Salón", "Dormitorio", "Baño", "Terraza", "Exterior", "Interior", "Planta baja", "Planta alta", "Ubicación", "Jardín", "Piscina", "Vistas"];
    keywords.forEach(word => {
        const regex = new RegExp(`(\\.\\s*|^|\\n|<br>)(${word})`, 'gi');
        html = html.replace(regex, '$1<strong>$2</strong>');
    });
    return html.split('<br><br>').map(p => p.trim()).filter(p => p.length > 0).map(p => p.includes('<ul>') ? p : `<p class="desc-paragraph">${p}</p>`).join('');
}

// --- ACTUALIZACIÓN DE EXTRACTOR LIGERO ---
// Permite extraer baños, capacidad y PLANTAS
function extractNumFromDesc(text, type) {
    if (!text) return null;
    text = text.toLowerCase();
    const numMap = { 'un': 1, 'una': 1, 'uno': 1, 'primer': 1, 'dos': 2, 'tres': 3, 'cuatro': 4, 'cinco': 5, 'seis': 6, 'siete': 7, 'ocho': 8, 'nueve': 9, 'diez': 10 };
    let regex;
    if (type === 'bath') regex = /(?:(\d+)|(un|una|dos|tres|cuatro|cinco))\s*(?:bañ|ban|aseo)/i;
    else if (type === 'cap') regex = /(?:capacidad\s*(?:para)?\s*(\d+))|(?:(?:para|hasta)\s*(\d+)\s*personas)|(?:(\d+)\s*(?:plazas|camas|personas))/i;
    else if (type === 'plantas') regex = /(?:(\d+)|(un|una|dos|tres|cuatro|cinco|seis|siete|ocho))\s*(?:plantas|pisos|niveles)/i;
    
    const match = text.match(regex);
    if (match) {
        for (let i = 1; i < match.length; i++) {
            if (match[i]) return numMap[match[i]] || match[i];
        }
    }
    return null;
}

async function initRentPage() {
    const params = new URLSearchParams(window.location.search);
    const propId = params.get('id');
    if (!propId) { window.location.href = 'rent.html'; return; }
    try {
        const response = await fetch('assets/data/propiedades.xml');
        const str = await response.text();
        const items = Array.from((new DOMParser()).parseFromString(str, "text/xml").querySelectorAll("propiedad"));
        allCachedItems = items; 
        const property = items.find(item => item.querySelector("id")?.textContent.trim() === propId);
        if (!property) throw new Error("Not found");
        currentProperty = property; 
        renderRentDetails(property);
        renderRentFeatures(property);
        renderMultimediaGallery(property);
        renderSimilarRentals(property, items); 
    } catch (e) { console.error(e); }
}

function renderRentDetails(node) {
    const getVal = (tags) => {
        if(!Array.isArray(tags)) tags = [tags];
        for(let t of tags) {
            const el = node.querySelector(t);
            if(el && el.textContent) return el.textContent.replace(/<!\[CDATA\[|\]\]>/g, '').trim();
        }
        return '';
    };

    const lang = localStorage.getItem('preferredLang') || 'es';
    const city = getVal(['ciudad', 'poblacion']), zone = getVal(['zona', 'area']), idRef = getVal('id');
    const technicalTitle = generateSmartTitle(node); 
    
    document.getElementById('prop-title').textContent = technicalTitle.toUpperCase();
    document.getElementById('prop-location').textContent = zone ? `${city} • ${zone}` : city;
    document.getElementById('prop-ref').textContent = `REF: ${idRef}`;
    if(document.querySelector('.tab-inner-title')) document.querySelector('.tab-inner-title').textContent = technicalTitle;
    document.getElementById('prop-description').innerHTML = smartFormatText(getVal(lang==='en'?'descrip2':(lang==='sv'?'descrip9':'descrip1')) || getVal(['descrip1', 'descripcion']));

    const lat = parseFloat(getVal(['latitud', 'lat'])), lng = parseFloat(getVal(['altitud', 'longitud', 'lng']));
    if(!isNaN(lat) && !isNaN(lng) && lat !== 0) window.propCoords = { lat, lng };
    updateTabVisibility('tab-map', !!window.propCoords);

    let rentPriceVal = parseFloat(getVal(['precioalq']) || getVal('precio')) || 0;
    rentPrice = rentPriceVal; 

    document.getElementById('rent-price-display').textContent = t('from') + ' ' + rentPrice + ' €';
    document.getElementById('rent-unit-display').textContent = getVal('tipomensual')?.toUpperCase().includes('SEM') ? t('unit_week') : (getVal('tipomensual')?.toUpperCase().includes('MES') ? t('unit_month') : t('unit_day'));
    document.getElementById('lbl-checkin').textContent = t('lbl_in');
    document.getElementById('lbl-checkout').textContent = t('lbl_out');
    
    // --- LÓGICA DEL AGENTE ---
    const agentName = getVal('agente') || 'MH Estate Team';
    const agentEmail = getVal(['email_agente']) || 'info@mhestate.es';
    const agentPhone = getVal(['tlf_agente', 'telefono_agente']);
    const agentPrefix = getVal('prefijo_tlf_agente') || '34';

    let roleKey = 'agent_label';
    let photoUrl = AGENT_PHOTOS['default'];
    Object.keys(AGENT_PHOTOS).forEach(key => { if(key !== 'default' && agentName.includes(key)) photoUrl = AGENT_PHOTOS[key]; });
    
    if (agentName.includes('Cecilia')) roleKey = 'role_founder';
    else if (agentName.includes('Rebecca')) roleKey = 'role_agent';
    else if (agentName.includes('Isidora')) roleKey = 'role_rental';

    let finalPhone = agentPhone;
    if(!finalPhone || finalPhone.trim() === "") {
        if(agentName.includes("Rebecca")) finalPhone = "653 61 04 24"; 
        else finalPhone = "604 12 94 65"; 
    }
    const cleanNumber = (agentPrefix + finalPhone).replace(/\D/g, ''); 

    // Rellenar Datos
    const labelEl = document.querySelector('.agent-label');
    if(labelEl) labelEl.textContent = t(roleKey);

    const nameEl = document.getElementById('agent-name');
    if(nameEl) nameEl.textContent = agentName;

    const imgEl = document.getElementById('agent-img');
    if(imgEl) imgEl.src = photoUrl;

    const bioEl = document.getElementById('agent-bio');
    if(bioEl) {
        let contactHtml = '';
        if(agentEmail) contactHtml += `<div style="margin-bottom:5px;">✉️ ${agentEmail}</div>`;
        if(finalPhone) contactHtml += `<div>📞 +${agentPrefix} ${finalPhone}</div>`;
        bioEl.innerHTML = contactHtml || 'Contacta para más información.';
        bioEl.style.fontStyle = 'normal'; bioEl.style.color = '#333';
    }

    // --- BOTÓN PRINCIPAL DE RESERVA (ARRIBA) ---
    const bookBtn = document.getElementById('btn-request-book');
    const inInput = document.getElementById('date-checkin'), outInput = document.getElementById('date-checkout');

    if(bookBtn) {
        bookBtn.textContent = '💬 ' + t('btn_whatsapp');
        bookBtn.style.backgroundColor = '#25D366'; bookBtn.style.color = '#fff'; bookBtn.style.border = 'none';
        
        const newBookBtn = bookBtn.cloneNode(true);
        bookBtn.parentNode.replaceChild(newBookBtn, bookBtn);
        
        newBookBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if(!inInput.value || !outInput.value) { showValidationModal(agentName); return; }
            
            let waMsg = t('wa_msg')
                .replace('{agent}', agentName).replace('{title}', technicalTitle)
                .replace('{ref}', idRef).replace('{in}', inInput.value).replace('{out}', outInput.value);
            window.open(`https://wa.me/${cleanNumber}?text=${encodeURIComponent(waMsg)}`, '_blank');
        });
    }

    if(inInput && outInput) {
        const calculate = () => {
            if(inInput.value && outInput.value) {
                const diffDays = Math.ceil((new Date(outInput.value) - new Date(inInput.value)) / (1000 * 60 * 60 * 24)); 
                if (diffDays > 0) {
                    const total = diffDays * rentPrice;
                    document.getElementById('txt-nights-count').textContent = `${diffDays} ${t('nights')}`;
                    document.getElementById('txt-calc-subtotal').textContent = `${total} €`;
                    document.getElementById('txt-total').textContent = `${total} €`;
                    document.getElementById('booking-summary').style.display = 'block';
                } else document.getElementById('booking-summary').style.display = 'none';
            }
        };
        inInput.addEventListener('change', calculate);
        outInput.addEventListener('change', calculate);
    }
}

function renderMultimediaGallery(node) { 
    const container = document.getElementById('gallery-container');
    if(!container) return;
    lightboxMedia = []; 
    const videoUrl = node.querySelector('videos video1')?.textContent?.trim();
    if (videoUrl) {
        let embedSrc = videoUrl;
        if(videoUrl.includes('youtu')) embedSrc = `https://www.youtube.com/embed/${videoUrl.split('v=')[1]?.split('&')[0] || videoUrl.split('/').pop()}`;
        lightboxMedia.push({ type: 'video', src: embedSrc });
    }
    for(let i=1; i<=50; i++) {
        const url = node.querySelector(`foto${i}`)?.textContent;
        if(url && url.startsWith('http')) lightboxMedia.push({ type: 'img', src: url });
    }
    if(lightboxMedia.length === 0) return;
    const topItem = lightboxMedia[0];
    let topHtml = topItem.type === 'video' ? `<div class="gallery-hero-item video-container" onclick="openLightbox(0)"><iframe src="${topItem.src}" frameborder="0" allowfullscreen style="pointer-events:none;"></iframe><div class="play-overlay">▶</div></div>` : `<div class="gallery-hero-item" onclick="openLightbox(0)"><img src="${topItem.src}" alt="Principal"></div>`;
    let bottomRowHtml = '';
    if (lightboxMedia.length > 1) {
        let rightGridHtml = lightboxMedia.length > 2 ? `<div class="gallery-sub-grid">${lightboxMedia.slice(2, 6).map((img, i) => `<div class="gallery-grid-item ${i===3 && lightboxMedia.length > 6 ? 'overlay-container':''}" onclick="openLightbox(${i+2})"><img src="${img.src}">${i===3 && lightboxMedia.length > 6 ? `<div class="more-photos-overlay">+${lightboxMedia.length - 6}</div>`:''}</div>`).join('')}</div>` : '';
        bottomRowHtml = `<div class="gallery-bottom-row"><div class="gallery-sub-main" onclick="openLightbox(1)"><img src="${lightboxMedia[1].src}"></div>${rightGridHtml}</div>`;
    }
    container.innerHTML = topHtml + bottomRowHtml;
}

// ==========================================
// RENDER FEATURES - ACTUALIZADO CON MASCOTAS, NIÑOS Y ASCENSOR
// ==========================================
function renderRentFeatures(node) {
    const container = document.getElementById('tab-facts-content');
    if(!container) return;
    container.innerHTML = '';
    
    const getVal = (tags) => { if(!Array.isArray(tags)) tags = [tags]; for(let t of tags) { const el = node.querySelector(t); if(el && el.textContent) return el.textContent.trim(); } return ''; };
    const getNum = (tags) => { let total = 0; tags.forEach(t => { let val = parseFloat(node.querySelector(t)?.textContent || 0); if(!isNaN(val)) total += val; }); return total > 0 ? total.toString() : ''; };
    
    const desc = ((node.querySelector('descrip1')?.textContent || '') + ' ' + (node.querySelector('descrip2')?.textContent || '')).toLowerCase();

    // 1. Extraer Plantas para Condicionar Ascensor
    const numPlantas = parseInt(getVal(['num_plantas', 'plantas', 'plantas_edificio']) || extractNumFromDesc(desc, 'plantas') || 1);

    // 2. IA Ligera para Mascotas
    let petsVal = getVal(['admitenmascotas', 'mascotas', 'animales']);
    if (!petsVal) {
        if (/(no mascot|no animal|no pet|no se admiten mascot|inga husdjur)/.test(desc)) petsVal = '0';
        else if (/(mascotas|pet friendly|se admiten mascot|pets allowed|husdjur tillåtna)/.test(desc)) petsVal = '1';
    }

    // 3. IA Ligera para Niños
    let childVal = getVal(['admitenninos', 'ninos', 'niños', 'apt_ninos']);
    if (!childVal) {
        if (/(no niñ|no nin|no children|inga barn)/.test(desc)) childVal = '0';
        else if (/(ideal famil|se admiten niñ|children allowed|barn tillåtna)/.test(desc)) childVal = '1';
    }

    // 4. IA Ligera para Ascensor
    let ascensorVal = getVal(['ascensor', 'elevador']);
    if (!ascensorVal || ascensorVal === '0') {
        if (/(ascensor|elevator|lift|hiss)/.test(desc) && !/(sin ascensor|no elevator|no lift|ingen hiss)/.test(desc)) {
            ascensorVal = '1';
        }
    }

    let isAscensorYes = (ascensorVal === '1' || ascensorVal === 'true' || ascensorVal === 'SI' || ascensorVal.toLowerCase() === 'sí');
    let showElevator = (numPlantas >= 2) || isAscensorYes; // Mostrar si hay 2+ plantas O si tiene ascensor en piso 1.

    const items = [
        { key: 'feat_ref', val: getVal(['id', 'referencia']) },
        { key: 'feat_checkin', val: '16:00' }, { key: 'feat_checkout', val: '10:00' },
        { key: 'feat_distmar', val: (getVal('distmar').match(/(\d+)/) || [])[0], suffix: 'u_m' },
        { key: 'feat_capacity', val: (getVal(['capacidad', 'personas']).match(/(\d+)/) || [])[0] || (getNum(['habdobles', 'habitaciones']) ? (parseInt(getNum(['habdobles', 'habitaciones'])) * 2).toString() : ''), suffix: '' },
        { key: 'feat_beds', val: getNum(['habdobles', 'habitaciones', 'dormitorios']) },
        { key: 'feat_baths', val: getNum(['banyos', 'aseos', 'banos']) },
        { key: 'feat_built', val: getVal(['m_cons', 'construido']), suffix: 'u_m2' },
        { key: 'feat_plot', val: getVal(['m_parcela', 'parcela']), suffix: 'u_m2' },
        { key: 'feat_terrace', val: getVal(['m_terraza', 'terraza']), suffix: 'u_m2', ia: /(terraza)/ },
        { key: 'feat_year', val: getVal(['antiguedad', 'ano_construccion']) },
        
        // Atributos forzados a decir siempre Sí/No
        { key: 'feat_pets', val: petsVal, forceSiNo: true },
        { key: 'feat_children', val: childVal, forceSiNo: true },
        
        { key: 'feat_ibi', val: getVal('ibi') ? parseFloat(getVal('ibi')).toLocaleString('de-DE') + ' €' : '' },
        { key: 'feat_community', val: getVal(['comunidad', 'gastos_comunidad']) ? parseFloat(getVal(['comunidad'])).toLocaleString('de-DE') + ' €' : '' },
        { key: 'feat_floor', val: getVal(['planta', 'numplanta']), type: 'floor' },
        { key: 'feat_orient', val: getVal('orientacion'), type: 'orient' },
        { key: 'feat_pool', val: getVal(['piscina', 'piscina_com', 'piscina_prop', 'pool']), bool: true, ia: /(piscina|pool|alberca)/ },
        { key: 'feat_garage', val: getVal(['garaje', 'parking', 'plaza_gara', 'cochera']), bool: true, ia: /(garaje|parking|aparcamiento)/ },
        { key: 'feat_wifi', val: getVal(['wifi', 'internet']), bool: true, ia: /(wifi|internet|fibra)/ },
        { key: 'feat_seaview', val: getVal(['vistasalmar', 'vistas_mar', 'primera_line']), bool: true, ia: /(vistas al mar|sea view|frente al mar)/ },
        { key: 'feat_ac', val: getVal(['aire_con', 'ac', 'airecentral']), bool: true, ia: /(aire acondicionado|air cond|a\/c|climatizaci)/ },
        { key: 'feat_heating', val: getVal(['calefaccion', 'heating']), bool: true, ia: /(calefacción|radiadores|suelo radiante)/ },
        
        // Ascensor sujeto a validación de plantas
        { key: 'feat_elevator', val: ascensorVal, forceSiNo: true, customShow: showElevator },
        
        { key: 'feat_tv', val: getVal(['tv', 'satelite']), bool: true, ia: /(tv|televisi|satelite)/ },
        { key: 'feat_furnished', val: getVal(['muebles', 'amueblado']), bool: true, ia: /(amueblado|furnished)/ },
        { key: 'feat_garden', val: getVal('jardin'), bool: true, ia: /(jardin|garden)/ },
        { key: 'feat_disabled', val: getVal('adaptadominus'), bool: true, ia: /(adaptado|minusvalidos)/ }
    ];

    items.forEach(item => {
        let val = item.val;
        
        if ((!val || val === '0' || val.trim()==='') && item.ia && item.ia.test(desc)) val = 'true';
        
        // Ocultar características que no pasen el filtro custom (ej. ascensor sin plantas suficientes)
        if (item.customShow === false) return;

        if (item.forceSiNo) {
            // Fuerza respuesta a Sí o No, no permite desaparecer.
            if (val === '1' || val === 'true' || val === 'SI' || val === 'Sí' || val === true) val = t('yes');
            else val = t('no');
        } else {
            // Lógica estándar para el resto
            if (!val || val.trim() === '') return;
            if (val === '0' || val === '0.00' || val === '0 €' || val === '0 m²') return;
            
            if (item.bool) { 
                if (val === '1' || val === 'true' || val === 'SI' || val === 'Sí') val = t('yes'); 
                else return; 
            } else if (item.type) {
                val = translateValue(val, item.type);
            }
            if (item.suffix) val += t(item.suffix);
        }
        
        container.innerHTML += `<div class="tech-card"><span class="tech-label">${t(item.key)}</span><span class="tech-value">${val}</span></div>`;
    });
}

function renderSimilarRentals(current, allItems) {
    const container = document.getElementById('similar-container');
    if(!container) return;
    
    const getVal = (n, tags) => {
        if(!Array.isArray(tags)) tags = [tags];
        for(let t of tags) { const el = n.querySelector(t); if(el && el.textContent) return el.textContent.trim(); }
        return '';
    };

    const cid = getVal(current, ['id', 'referencia']);
    
    let rentals = allItems.filter(p => {
        const acc = getVal(p, ['accion', 'operacion']).toLowerCase();
        const pid = getVal(p, ['id', 'referencia']);
        return acc.includes('alquiler') && pid !== cid;
    }).slice(0, 6);

    container.innerHTML = rentals.map(p => {
        const id = getVal(p, ['id', 'referencia']);
        const title = generateSmartTitle(p);
        const price = parseFloat(getVal(p, ['precioalq', 'precio'])).toLocaleString('de-DE') || '0';
        const isHoliday = getVal(p, ['accion']).toLowerCase().includes('vacacional');
        const unit = isHoliday ? t('unit_day') : t('unit_month');
        
        let bath = getVal(p, ['banyos', 'aseos', 'banos']);
        if (!bath || bath === '0') bath = extractNumFromDesc(getVal(p, ['descrip1', 'descripcion']), 'bath');
        
        let cap = getVal(p, ['capacidad', 'personas']);
        if (!cap || cap === '0') {
            const dorm = getVal(p, ['habitaciones', 'dormitorios']);
            if (dorm && dorm !== '0') cap = (parseInt(dorm) * 2).toString();
        }

        const img = getVal(p, 'foto1') || 'assets/img/logo mh state negro.png';

        return `
            <article class="rent-layout-card" onclick="window.location.href='propiedad-rent.html?id=${id}'">
                <div class="rent-image-box" style="height:320px; position:relative;">
                    <img src="${img}" style="width:100%; height:100%; object-fit:cover;" loading="lazy">
                    <div class="rent-card-overlay-gradient"></div>
                    
                    <div class="rent-overlay-container" style="position:absolute; bottom:0; left:0; width:100%; padding:20px; display:flex; justify-content:space-between; align-items:flex-end; color:#fff; z-index:4;">
                        <div class="rent-overlay-left">
                            <h3 class="rent-card-title" style="margin:0; font-size:1.1rem; font-weight:600; text-shadow:0 2px 4px rgba(0,0,0,0.5);">${title.toUpperCase()}</h3>
                            <div class="rent-card-price" style="font-size:1rem; font-weight:400; margin-top:5px; opacity:0.9;">${t('from')} ${price} € ${unit}</div>
                        </div>

                        <div class="rent-overlay-right" style="text-align:right; font-size:0.85rem; display:flex; flex-direction:column; gap:4px;">
                            ${bath && bath !== '0' ? `<span><b>${t('lbl_card_bath')}</b> ${bath}</span>` : ''}
                            ${cap && cap !== '0' ? `<span><b>${t('lbl_card_cap')}</b> ${cap}</span>` : ''}
                        </div>
                    </div>
                </div>
            </article>
        `;
    }).join('');
}

function setupTabs() {
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.tab-btn, .tab-pane').forEach(el => el.classList.remove('active'));
            btn.classList.add('active');
            const target = document.getElementById(btn.dataset.tab);
            if(target) target.classList.add('active');
            if(btn.dataset.tab === 'tab-map' && !mapInitialized && window.propCoords) {
                setTimeout(() => {
                    const map = L.map('map-container').setView([window.propCoords.lat, window.propCoords.lng], 15);
                    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
                    L.marker([window.propCoords.lat, window.propCoords.lng]).addTo(map);
                    mapInitialized = true;
                }, 100);
            }
        });
    });
}

function updateTabVisibility(tabName, isVisible) { 
    const btn = document.querySelector(`.tab-btn[data-tab="${tabName}"]`); 
    if(btn) btn.style.display = isVisible ? 'inline-block' : 'none'; 
}

window.openSingleImage = (src) => { 
    lightboxMedia = [{type:'img', src: src}]; 
    currentLightboxIndex = 0; 
    document.getElementById('lightbox-modal').classList.add('active'); 
    updateLightbox(); 
};

window.openLightbox = (index) => { 
    currentLightboxIndex = index; 
    document.getElementById('lightbox-modal').classList.add('active'); 
    updateLightbox(); 
};

window.closeLightbox = () => document.getElementById('lightbox-modal').classList.remove('active');

window.changeLightboxSlide = (n) => { 
    currentLightboxIndex = (currentLightboxIndex + n + lightboxMedia.length) % lightboxMedia.length; 
    updateLightbox(); 
};

function updateLightbox() {
    const item = lightboxMedia[currentLightboxIndex];
    document.getElementById('lightbox-media-container').innerHTML = item.type === 'video' ? `<iframe src="${item.src}?autoplay=1" frameborder="0" allowfullscreen></iframe>` : `<img src="${item.src}">`;
    document.getElementById('lightbox-counter').textContent = `${currentLightboxIndex+1}/${lightboxMedia.length}`;
}