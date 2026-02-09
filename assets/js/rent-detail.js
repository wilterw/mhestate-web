/**
 * RENT-DETAIL.JS - V42.0
 * - Soporte tecla ESC para cerrar lightbox.
 * - Título Inteligente (Prioridad: titulo1 > tituloweb > extracción descripción).
 * - Galería V40 (Hero + Mosaico).
 * - Facts Completos (6 columnas + búsqueda en texto).
 */

document.addEventListener('DOMContentLoaded', () => {
    initRentPage();
    setupTabs();
    injectValidationModalStyles(); 
    setupLightboxNavigation(); // Nueva función para teclado
});

// VARIABLES GLOBALES
let lightboxMedia = []; 
let currentLightboxIndex = 0;
let mapInitialized = false;
let rentPrice = 0;

// FOTOS DE AGENTES
const AGENT_PHOTOS = {
    'Cecilia': 'assets/img/cecilia.jpg',
    'Rebecca': 'assets/img/Rebbeca.jpg',
    'Isidora': 'assets/img/Isidora.jpg',
    'CEO': 'assets/img/ceo.jpg', 
    'default': 'assets/img/logo mh state negro.png'
};

// TRADUCCIONES
const I18N_RENT_UI = {
    'es': {
        unit_day: '/ noche', unit_week: '/ semana', unit_month: '/ mes',
        lbl_in: 'Llegada', lbl_out: 'Salida', 
        btn_book: 'RESERVAR', total: 'TOTAL', nights: 'noches',
        no_data: 'No disponible', plan_click: 'Clic para ampliar',
        feat_capacity: 'Capacidad', feat_beds: 'Dorm.', feat_baths: 'Baños', 
        feat_pool: 'Piscina', feat_garage: 'Garaje', feat_wifi: 'Wifi', 
        feat_terrace: 'Terraza', feat_seaview: 'Vistas Mar', feat_ac: 'Aire Acond.',
        feat_kitchen: 'Cocina', feat_elevator: 'Ascensor', feat_tv: 'TV',
        feat_heating: 'Calefacción', feat_furnished: 'Amueblado',
        feat_orient: 'Orientación', feat_built: 'Metros', feat_plot: 'Parcela',
        feat_checkin: 'Check-in', feat_checkout: 'Check-out', feat_distmar: 'Dist. Playa',
        feat_floor: 'Planta', feat_garden: 'Jardín', feat_disabled: 'Acceso Adapt.',
        'role_founder': 'Fundadora y Agente', 'role_agent': 'Agente Inmobiliaria',
        'role_rental': 'Gestora de Alquileres', 'agent_label': 'Agente Responsable',
        'btn_whatsapp': 'CONSULTAR POR WHATSAPP', 'txt_email': 'Email:', 'txt_phone': 'Teléfono:',
        'modal_title': 'Seleccione las fechas', 'modal_text': 'Debe seleccionar un rango de fechas.', 'modal_btn': 'ENTENDIDO'
    },
    'en': {
        unit_day: '/ night', unit_week: '/ week', unit_month: '/ month',
        lbl_in: 'Check-in', lbl_out: 'Check-out', 
        btn_book: 'RESERVE', total: 'TOTAL', nights: 'nights',
        no_data: 'Not available', plan_click: 'Click to enlarge',
        feat_capacity: 'Capacity', feat_beds: 'Bedrooms', feat_baths: 'Baths', 
        feat_pool: 'Pool', feat_garage: 'Garage', feat_wifi: 'Wifi', 
        feat_terrace: 'Terrace', feat_seaview: 'Sea Views', feat_ac: 'A/C',
        feat_kitchen: 'Kitchen', feat_elevator: 'Elevator', feat_tv: 'TV',
        feat_heating: 'Heating', feat_furnished: 'Furnished',
        feat_orient: 'Orientation', feat_built: 'Size', feat_plot: 'Plot',
        feat_checkin: 'Check-in', feat_checkout: 'Check-out', feat_distmar: 'Dist. Beach',
        feat_floor: 'Floor', feat_garden: 'Garden', feat_disabled: 'Disabled Access',
        'role_founder': 'Founder & Agent', 'role_agent': 'Real Estate Agent',
        'role_rental': 'Rental Manager', 'agent_label': 'Listing Agent',
        'btn_whatsapp': 'ASK ON WHATSAPP', 'txt_email': 'Email:', 'txt_phone': 'Phone:',
        'modal_title': 'Select dates', 'modal_text': 'You must select a date range.', 'modal_btn': 'UNDERSTOOD'
    },
    'sv': {
        unit_day: '/ natt', unit_week: '/ vecka', unit_month: '/ månad',
        lbl_in: 'Incheckning', lbl_out: 'Utcheckning', 
        btn_book: 'BOKA', total: 'TOTALT', nights: 'nätter',
        no_data: 'Ej tillgänglig', plan_click: 'Klicka för att förstora',
        feat_capacity: 'Antal personer', feat_beds: 'Sovrum', feat_baths: 'Badrum', 
        feat_pool: 'Pool', feat_garage: 'Garage', feat_wifi: 'Wifi', 
        feat_terrace: 'Terrass', feat_seaview: 'Havsutsikt', feat_ac: 'Luftkond.',
        feat_kitchen: 'Kök', feat_elevator: 'Hiss', feat_tv: 'TV',
        feat_heating: 'Uppvärmning', feat_furnished: 'Möblerad',
        feat_orient: 'Orientering', feat_built: 'Byggyta', feat_plot: 'Tomt',
        feat_checkin: 'Incheckning', feat_checkout: 'Utcheckning', feat_distmar: 'Avstånd Strand',
        feat_floor: 'Våning', feat_garden: 'Trädgård', feat_disabled: 'Handikappanpassat',
        'role_founder': 'Grundare & Mäklare', 'role_agent': 'Fastighetsmäklare',
        'role_rental': 'Uthyrningschef', 'agent_label': 'Ansvarig Mäklare',
        'btn_whatsapp': 'FRÅGA PÅ WHATSAPP', 'txt_email': 'E-post:', 'txt_phone': 'Telefon:',
        'modal_title': 'Välj datum', 'modal_text': 'Du måste välja ett datumintervall.', 'modal_btn': 'JAG FÖRSTÅR'
    }
};

function t(key) {
    const lang = localStorage.getItem('preferredLang') || 'es';
    return I18N_RENT_UI[lang][key] || key;
}

// MODAL STYLES
function injectValidationModalStyles() {
    if (document.getElementById('val-modal-styles')) return;
    const style = document.createElement('style');
    style.id = 'val-modal-styles';
    style.innerHTML = `.val-modal-overlay{position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.7);display:flex;align-items:center;justify-content:center;z-index:10000;opacity:0;pointer-events:none;transition:0.3s}.val-modal-overlay.active{opacity:1;pointer-events:auto}.val-modal-box{background:#fff;padding:35px;max-width:420px;width:90%;text-align:center;border-radius:4px;box-shadow:0 10px 30px rgba(0,0,0,0.2);transform:translateY(20px);transition:0.3s}.val-modal-overlay.active .val-modal-box{transform:translateY(0)}.val-modal-title{font-size:18px;font-weight:700;margin-bottom:15px;color:#000;text-transform:uppercase}.val-modal-text{font-size:14px;color:#555;line-height:1.6;margin-bottom:25px}.val-modal-btn{background:#000;color:#fff;border:none;padding:12px 25px;cursor:pointer;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:1px}`;
    document.head.appendChild(style);
}

// --- SOPORTE TECLADO (ESC, FLECHAS) ---
function setupLightboxNavigation() {
    document.addEventListener('keydown', (e) => {
        const modal = document.getElementById('lightbox-modal');
        if (!modal || !modal.classList.contains('active')) return;

        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowRight') {
            changeLightboxSlide(1);
        } else if (e.key === 'ArrowLeft') {
            changeLightboxSlide(-1);
        }
    });
}

// --- GENERADOR DE TÍTULOS INTELIGENTES ---
function generateSmartTitle(node) {
    const lang = localStorage.getItem('preferredLang') || 'es';
    let titleTag = 'titulo1'; 
    let descTag = 'descrip1';
    
    if (lang === 'en') { titleTag = 'titulo2'; descTag = 'descrip2'; }
    if (lang === 'sv') { titleTag = 'titulo9'; descTag = 'descrip9'; }

    let title = node.querySelector(titleTag)?.textContent;
    if (title && title.trim().length > 5) {
        return title.replace(/<!\[CDATA\[|\]\]>/g, '').trim();
    }
    
    title = node.querySelector('tituloweb')?.textContent || node.querySelector('titulo')?.textContent;
    if (title && title.trim().length > 5) {
        return title.replace(/<!\[CDATA\[|\]\]>/g, '').trim();
    }

    let desc = node.querySelector(descTag)?.textContent;
    if (!desc) desc = node.querySelector('descrip1')?.textContent; 

    if (desc) {
        let cleanDesc = desc.replace(/<!\[CDATA\[|\]\]>/g, '').trim();
        let firstPart = cleanDesc.split('~')[0].trim();
        firstPart = firstPart.replace(/^[¡¿"-]+/, '').replace(/[!?:."]+$/, '');
        if (firstPart.length > 10 && firstPart.length < 120) {
            return firstPart.charAt(0).toUpperCase() + firstPart.slice(1);
        }
    }

    const city = node.querySelector('poblacion')?.textContent || '';
    const type = node.querySelector('tipo_ofer')?.textContent || 'Propiedad';
    return `${type} en ${city}`;
}

// --- FORMATO INTELIGENTE DE TEXTO ---
function smartFormatText(text) {
    if (!text) return "";
    let html = text.replace(/<!\[CDATA\[|\]\]>/g, '')
                   .replace(/~/g, '<br><br>')
                   .replace(/—/g, '&mdash;')
                   .replace(/\r\n/g, '\n');

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

    const parts = html.split('<br><br>');
    let finalHtml = "";
    parts.forEach(part => {
        let cleanPart = part.trim();
        if (cleanPart.includes('<ul>')) finalHtml += cleanPart;
        else if (cleanPart.length > 0) finalHtml += `<p class="desc-paragraph">${cleanPart}</p>`;
    });
    return finalHtml;
}

// --- INICIALIZACIÓN ---
async function initRentPage() {
    const params = new URLSearchParams(window.location.search);
    const propId = params.get('id');
    if (!propId) { window.location.href = 'rent.html'; return; }
    try {
        const response = await fetch('assets/data/propiedades.xml');
        if (!response.ok) throw new Error("XML Error");
        const str = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(str, "text/xml");
        const items = Array.from(xmlDoc.querySelectorAll("propiedad"));
        const property = items.find(item => {
            const idNode = item.querySelector("id");
            return idNode && idNode.textContent.trim() === propId;
        });
        if (!property) throw new Error("Property not found");

        renderRentDetails(property);
        renderRentFeatures(property);
        renderMultimediaGallery(property);
        renderSimilarRentals(property, items); 
    } catch (e) {
        console.error("Error:", e);
    }
}

// --- RENDERIZADO PRINCIPAL ---
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
    const city = getVal(['ciudad', 'poblacion']);
    const zone = getVal(['zona', 'area']);
    const idRef = getVal('id');

    let descTag = 'descrip1'; if(lang === 'en') descTag = 'descrip2'; if(lang === 'sv') descTag = 'descrip9';
    let desc = getVal(descTag);
    if(!desc || desc.length < 5) desc = getVal(['descrip1', 'descripcion']);

    const catchyTitle = generateSmartTitle(node); 
    const technicalTitle = `${getVal('tipo_ofer') || 'Propiedad'} en ${zone || city}`;
    
    document.getElementById('prop-title').textContent = technicalTitle.toUpperCase();
    document.getElementById('prop-location').textContent = zone ? `${city} • ${zone}` : city;
    document.getElementById('prop-ref').textContent = `REF: ${idRef}`;

    const descTitleEl = document.querySelector('.tab-inner-title');
    if(descTitleEl) descTitleEl.textContent = catchyTitle;
    
    document.getElementById('prop-description').innerHTML = smartFormatText(desc);

    const lat = parseFloat(getVal(['latitud', 'lat']));
    const lng = parseFloat(getVal(['altitud', 'longitud', 'lng']));
    let hasMap = false;
    if(!isNaN(lat) && !isNaN(lng) && lat !== 0) { window.propCoords = { lat, lng }; hasMap = true; } 
    updateTabVisibility('tab-map', hasMap);

    const planCont = document.getElementById('plan-container');
    let hasPlan = false;
    let planUrl = getVal(['plano', 'plano1', 'url_plano']);
    if (!planUrl || planUrl.length < 5) {
        for(let i=1; i<=30; i++) {
            const photoUrl = getVal(`foto${i}`);
            if (photoUrl && (photoUrl.toLowerCase().includes('plan') || photoUrl.toLowerCase().includes('layout'))) {
                planUrl = photoUrl; break;
            }
        }
    }
    if (planUrl && planUrl.length > 5 && planUrl !== '0') {
        hasPlan = true;
        if(planCont) planCont.innerHTML = `<div style="cursor: pointer; text-align:center; width:100%;" onclick="window.openSingleImage('${planUrl}')"><img src="${planUrl}" alt="Plano" style="max-height:500px; width:auto; max-width:100%; box-shadow: 0 5px 15px rgba(0,0,0,0.1);"><p style="margin-top: 15px; font-size: 0.9rem; color: #666; font-weight: 500;"><span style="font-size:1.2rem; vertical-align: middle;">🔍</span> ${t('plan_click')}</p></div>`;
    }
    updateTabVisibility('tab-plan', hasPlan);

    let rawPrice = getVal(['precioalq']);
    if(!rawPrice || rawPrice === '0') rawPrice = getVal('precio');
    rentPrice = parseFloat(rawPrice) || 0;
    
    let unitLabel = t('unit_day');
    const rawUnit = getVal('tipomensual'); 
    if(rawUnit && rawUnit.toUpperCase().includes('SEM')) unitLabel = t('unit_week');
    if(rawUnit && rawUnit.toUpperCase().includes('MES')) unitLabel = t('unit_month');

    document.getElementById('rent-price-display').textContent = rentPrice + ' €';
    document.getElementById('rent-unit-display').textContent = unitLabel;
    document.getElementById('lbl-checkin').textContent = t('lbl_in');
    document.getElementById('lbl-checkout').textContent = t('lbl_out');
    document.getElementById('btn-request-book').textContent = t('btn_book');

    const agentName = getVal('agente') || 'MH Estate Team';
    const agentPhone = getVal(['tlf_agente', 'telefono_agente']);
    const agentEmail = getVal(['email_agente']) || 'info@mhestate.es';
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

    const agentContainer = document.querySelector('.booking-agent-mini');
    if(agentContainer) {
        agentContainer.innerHTML = `
            <div style="display:flex; align-items:center; gap:12px; margin-bottom:15px;">
                <img src="${photoUrl}" class="booking-agent-img" alt="${agentName}">
                <div>
                    <div style="font-size:10px; text-transform:uppercase; color:#999; font-weight:700; letter-spacing:0.5px;">${t(roleKey)}</div>
                    <h4 style="margin:0; font-size:15px; color:#000; font-weight:600;">${agentName}</h4>
                </div>
            </div>
            <div style="font-size:13px; color:#555; margin-bottom:20px; border-bottom:1px solid #eee; padding-bottom:15px; line-height:1.6;">
                <div style="margin-bottom:4px;"><strong style="color:#000;">${t('txt_email')}</strong> <br> ${agentEmail}</div>
                <div><strong style="color:#000;">${t('txt_phone')}</strong> <br> +${agentPrefix} ${finalPhone}</div>
            </div>
            <a href="#" id="btn-whatsapp-dynamic" style="text-decoration:none; text-align:center; padding:15px; background:#25D366; color:#fff; font-size:13px; font-weight:700; border-radius:4px; display:flex; justify-content:center; align-items:center; gap:8px; text-transform:uppercase; transition: background 0.3s; margin-top:10px;">
                <span style="font-size:18px;">💬</span> ${t('btn_whatsapp')}
            </a>
        `;
        setTimeout(() => {
            document.getElementById('btn-whatsapp-dynamic')?.addEventListener('click', (e) => {
                e.preventDefault();
                const inDate = document.getElementById('date-checkin').value;
                const outDate = document.getElementById('date-checkout').value;
                if(!inDate || !outDate) { showValidationModal(); } else {
                    const msg = `Hola ${agentName}, disponibilidad:\nPropiedad: ${catchyTitle} (Ref: ${idRef})\nFechas: del ${inDate} al ${outDate}.`;
                    window.open(`https://wa.me/${cleanNumber}?text=${encodeURIComponent(msg)}`, '_blank');
                }
            });
        }, 100);
    }
    
    const inInput = document.getElementById('date-checkin');
    const outInput = document.getElementById('date-checkout');
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

    document.getElementById('btn-request-book')?.addEventListener('click', (e) => {
        e.preventDefault();
        const inDate = inInput.value;
        const outDate = outInput.value;
        if(!inDate || !outDate) { showValidationModal(); return; }
        const msg = `Hola ${agentName}, reservar:\nPropiedad: ${catchyTitle} (Ref: ${idRef})\nFechas: del ${inDate} al ${outDate}.`;
        window.open(`https://wa.me/${cleanNumber}?text=${encodeURIComponent(msg)}`, '_blank');
    });
}

// --- GALERÍA V40 (Hero + Mosaico) ---
function renderMultimediaGallery(node) { 
    const container = document.getElementById('gallery-container');
    if(!container) return;
    container.innerHTML = '';
    lightboxMedia = []; 

    const videoUrl = node.querySelector('videos video1')?.textContent?.trim();
    if (videoUrl) {
        let embedSrc = videoUrl;
        if(videoUrl.includes('youtu')) {
            const videoId = videoUrl.split('v=')[1]?.split('&')[0] || videoUrl.split('/').pop();
            embedSrc = `https://www.youtube.com/embed/${videoId}`;
        }
        lightboxMedia.push({ type: 'video', src: embedSrc });
    }

    for(let i=1; i<=50; i++) {
        const url = node.querySelector(`foto${i}`)?.textContent;
        if(url && url.startsWith('http')) lightboxMedia.push({ type: 'img', src: url });
    }
    if(lightboxMedia.length === 0) return;

    // 1. HERO SUPERIOR
    const topItem = lightboxMedia[0];
    let topHtml = topItem.type === 'video' 
        ? `<div class="gallery-hero-item video-container" onclick="openLightbox(0)"><iframe src="${topItem.src}" frameborder="0" allowfullscreen style="pointer-events:none;"></iframe><div class="play-overlay">▶</div></div>`
        : `<div class="gallery-hero-item" onclick="openLightbox(0)"><img src="${topItem.src}" alt="Principal"></div>`;

    // 2. FILA INFERIOR
    let bottomRowHtml = '';
    
    if (lightboxMedia.length > 1) {
        const leftItem = lightboxMedia[1];
        const leftHtml = `<div class="gallery-sub-main" onclick="openLightbox(1)"><img src="${leftItem.src}" alt="Secundaria"></div>`;

        let rightGridHtml = '';
        if (lightboxMedia.length > 2) {
            rightGridHtml = '<div class="gallery-sub-grid">';
            const max = Math.min(6, lightboxMedia.length); 
            for (let i = 2; i < max; i++) {
                let content = `<img src="${lightboxMedia[i].src}" alt="Foto">`;
                if (i === 5 && lightboxMedia.length > 6) {
                    content += `<div class="more-photos-overlay">+${lightboxMedia.length - 6}</div>`;
                    rightGridHtml += `<div class="gallery-grid-item overlay-container" onclick="openLightbox(${i})">${content}</div>`;
                } else {
                    rightGridHtml += `<div class="gallery-grid-item" onclick="openLightbox(${i})">${content}</div>`;
                }
            }
            rightGridHtml += '</div>';
        }

        bottomRowHtml = `<div class="gallery-bottom-row">${leftHtml}${rightGridHtml}</div>`;
    }

    container.innerHTML = `${topHtml}${bottomRowHtml}`;
}

// --- FACTS ---
function renderRentFeatures(node) {
    const container = document.getElementById('tab-facts-content');
    if(!container) return;
    container.innerHTML = '';
    
    const getVal = (tags) => { 
        if(!Array.isArray(tags)) tags = [tags];
        for(let t of tags) {
            const el = node.querySelector(t);
            if(el && el.textContent) return el.textContent.trim();
        }
        return ''; 
    };

    const getNum = (tags) => {
        let total = 0;
        tags.forEach(t => {
            let val = parseFloat(node.querySelector(t)?.textContent || 0);
            if(!isNaN(val)) total += val;
        });
        return total > 0 ? total.toString() : '';
    };

    const desc = (node.querySelector('descrip1')?.textContent || '') + ' ' + (node.querySelector('descrip2')?.textContent || '');
    const descLower = desc.toLowerCase();
    const checkText = (keyRegex) => keyRegex.test(descLower);

    const items = [
        { key: 'feat_checkin', val: '16:00' }, 
        { key: 'feat_checkout', val: '10:00' },
        { key: 'feat_distmar', val: getVal('distmar'), suffix: ' m' },
        { key: 'feat_capacity', val: getVal(['capacidad', 'personas']) || (getNum(['habdobles', 'habitaciones']) ? (parseInt(getNum(['habdobles', 'habitaciones'])) * 2).toString() : ''), suffix: ' pers.' },
        { key: 'feat_beds', val: getNum(['habdobles', 'habitaciones', 'dormitorios']) },
        { key: 'feat_baths', val: getNum(['banyos', 'aseos', 'banos']) },
        { key: 'feat_built', val: getVal(['m_cons', 'construido']), suffix: ' m²' },
        { key: 'feat_plot', val: getVal(['m_parcela', 'parcela']), suffix: ' m²' },
        { key: 'feat_floor', val: getVal(['planta', 'numplanta']) },
        { key: 'feat_orient', val: getVal('orientacion'), bool: false },
        
        { key: 'feat_pool', val: getVal(['piscina', 'piscina_com', 'piscina_prop', 'pool']), bool: true, ia: /(piscina|pool|alberca)/ },
        { key: 'feat_garage', val: getVal(['garaje', 'parking', 'plaza_gara', 'cochera']), bool: true, ia: /(garaje|parking|aparcamiento)/ },
        { key: 'feat_wifi', val: getVal(['wifi', 'internet']), bool: true, ia: /(wifi|internet|fibra)/ },
        { key: 'feat_terrace', val: getVal(['terraza', 'balcon', 'terrace']), bool: true, ia: /(terraza|terrace|balcon)/ },
        { key: 'feat_seaview', val: getVal(['vistasalmar', 'vistas_mar', 'primera_line']), bool: true, ia: /(vistas al mar|sea view|frente al mar)/ },
        { key: 'feat_ac', val: getVal(['aire_con', 'ac', 'airecentral']), bool: true, ia: /(aire acondicionado|air cond|a\/c|climatizaci)/ },
        { key: 'feat_heating', val: getVal(['calefaccion', 'heating']), bool: true, ia: /(calefacción|radiadores|suelo radiante)/ },
        { key: 'feat_kitchen', val: getVal(['cocina_inde', 'cocina']), bool: true, ia: /(cocina equipada|kitchen|lavavajillas)/ },
        { key: 'feat_elevator', val: getVal('ascensor'), bool: true, ia: /(ascensor|elevator|lift)/ },
        { key: 'feat_tv', val: getVal(['tv', 'satelite']), bool: true, ia: /(tv|televisi|satelite)/ },
        { key: 'feat_furnished', val: getVal(['muebles', 'amueblado']), bool: true, ia: /(amueblado|furnished)/ },
        { key: 'feat_garden', val: getVal('jardin'), bool: true, ia: /(jardin|garden)/ },
        { key: 'feat_disabled', val: getVal('adaptadominus'), bool: true, ia: /(adaptado|minusvalidos)/ }
    ];

    items.forEach(item => {
        let val = item.val;
        
        if (!val || val === '0' || val === '0.00' || val.trim() === '') {
            if (item.ia && checkText(item.ia)) val = 'Sí'; else return; 
        }

        if (item.bool) {
            if (val === '1' || val === 'true' || (parseInt(val) > 0 && val !== '0') || val === 'SI' || val === 'Sí') val = 'Sí';
            else return; 
        }

        if (item.suffix) val += item.suffix;
        
        const div = document.createElement('div');
        div.className = 'tech-card';
        div.innerHTML = `<span class="tech-label">${t(item.key)}</span><span class="tech-value">${val}</span>`;
        container.appendChild(div);
    });

    if(container.children.length === 0) container.innerHTML = `<p style="grid-column:1/-1; text-align:center; color:#999;">${t('no_data')}</p>`;
}

// --- SIMILARES ---
function renderSimilarRentals(current, allItems) {
    const container = document.getElementById('similar-container');
    if(!container) return;
    const currentId = current.querySelector('id')?.textContent;
    
    let rentals = allItems.filter(p => {
        const act = p.querySelector('accion')?.textContent || '';
        const pid = p.querySelector('id')?.textContent;
        return act.toLowerCase().includes('alquiler') && pid && pid !== currentId;
    }).slice(0, 6);

    container.innerHTML = '';
    
    rentals.forEach(p => {
        const img = p.querySelector('foto1')?.textContent || 'assets/img/logo mh state negro.png';
        const title = generateSmartTitle(p);
        const city = p.querySelector('poblacion')?.textContent || '';
        const price = p.querySelector('precioalq')?.textContent || p.querySelector('precio')?.textContent || '0';
        const pid = p.querySelector('id')?.textContent;

        let beds = p.querySelector('habitaciones')?.textContent;
        if(!beds || beds === '0') beds = p.querySelector('habdobles')?.textContent;
        if(!beds || beds === '0') beds = '-';

        let baths = p.querySelector('banyos')?.textContent || p.querySelector('aseos')?.textContent || '-';
        let size = p.querySelector('m_cons')?.textContent || '-';
        if(size !== '-') size = Math.floor(parseFloat(size)); 

        const card = document.createElement('div');
        card.className = 'prop-card-mini';
        card.onclick = () => window.location.href = `propiedad-rent.html?id=${pid}`;
        
        card.innerHTML = `
            <div class="mini-img-wrapper">
                <img src="${img}" alt="${title}">
                <div class="mini-price-tag">${price} €</div>
            </div>
            <div class="mini-content">
                <h4 class="mini-title">${title}</h4>
                <p class="mini-loc">📍 ${city}</p>
                <div class="mini-features">
                    <span>🛏️ ${beds}</span>
                    <span>🚿 ${baths}</span>
                    <span>📐 ${size} m²</span>
                </div>
            </div>
        `;
        container.appendChild(card);
    });

    if(rentals.length > 3) {
        const prev = document.getElementById('sim-prev');
        const next = document.getElementById('sim-next');
        if(prev) prev.onclick = () => container.scrollBy({left:-300, behavior:'smooth'});
        if(next) next.onclick = () => container.scrollBy({left:300, behavior:'smooth'});
    }
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
    const oldMedia = [...lightboxMedia]; lightboxMedia = [{type:'img', src: src}];
    currentLightboxIndex = 0; document.getElementById('lightbox-modal').classList.add('active'); updateLightbox();
    const modal = document.getElementById('lightbox-modal');
    const restore = () => { lightboxMedia = oldMedia; modal.removeEventListener('click', checkClose); };
    const checkClose = (e) => { if(e.target === modal || e.target.classList.contains('close-lightbox')) restore(); };
    modal.addEventListener('click', checkClose);
};
window.openLightbox = (index) => { currentLightboxIndex = index; document.getElementById('lightbox-modal').classList.add('active'); updateLightbox(); };
window.closeLightbox = () => document.getElementById('lightbox-modal').classList.remove('active');
window.changeLightboxSlide = (n) => { currentLightboxIndex = (currentLightboxIndex + n + lightboxMedia.length) % lightboxMedia.length; updateLightbox(); };
function updateLightbox() {
    const item = lightboxMedia[currentLightboxIndex];
    document.getElementById('lightbox-media-container').innerHTML = item.type === 'video' ? `<iframe src="${item.src}?autoplay=1" frameborder="0" allowfullscreen></iframe>` : `<img src="${item.src}">`;
    document.getElementById('lightbox-counter').textContent = `${currentLightboxIndex+1}/${lightboxMedia.length}`;
}