/**
 * RENT-DETAIL.JS - V5.3 (AMBOS BOTONES A WHATSAPP + VALIDACIÓN FECHAS)
 */

document.addEventListener('DOMContentLoaded', () => {
    initRentPage();
    setupTabs();
});

// VARIABLES
let lightboxMedia = []; 
let currentLightboxIndex = 0;
let mapInitialized = false;
let rentPrice = 0;

// FOTOS DE AGENTES (Base de datos local)
const AGENT_PHOTOS = {
    'Cecilia Andersson': 'assets/img/cecilia.jpg',
    'Rebecca Velin': 'assets/img/Rebbeca.jpg',
    'Isidora Polanco': 'assets/img/Isidora.jpg',
    'Isidora': 'assets/img/Isidora.jpg',
    'CEO': 'assets/img/ceo.jpg', 
    'MH Estate Team': 'assets/img/logo mh state negro.png',
    'default': 'assets/img/logo mh state negro.png'
};

// TRADUCCIONES
const I18N_RENT_UI = {
    'es': {
        unit_day: '/ noche', unit_week: '/ semana', unit_month: '/ mes',
        lbl_in: 'Llegada', lbl_out: 'Salida', 
        btn_book: 'RESERVAR', // CAMBIO: Texto corto
        total: 'TOTAL', nights: 'noches',
        managed_by: 'Gestionado por',
        feat_exclusive: 'EXCLUSIVA', cond_new: 'Obra Nueva',
        no_data: 'No disponible', plan_click: 'Clic para ampliar',
        feat_beds: 'Dormitorios', feat_baths: 'Baños', feat_pool: 'Piscina', feat_garage: 'Garaje', feat_wifi: 'Wifi', feat_terrace: 'Terraza',
        
        // ROLES AGENTE
        'role_founder': 'Fundadora y Agente',
        'role_agent': 'Agente Inmobiliaria',
        'role_rental': 'Gestora de Alquileres',
        'agent_label': 'Agente Responsable',
        
        // CONTACTO Y ALERTAS
        'btn_whatsapp': 'CONSULTAR POR WHATSAPP',
        'btn_email': 'Enviar Email', 
        'txt_email': 'Email:',
        'txt_phone': 'Teléfono:',
        'alert_dates': 'Por favor, selecciona las fechas de llegada y salida para continuar.'
    },
    'en': {
        unit_day: '/ night', unit_week: '/ week', unit_month: '/ month',
        lbl_in: 'Check-in', lbl_out: 'Check-out', 
        btn_book: 'RESERVE', // CAMBIO
        total: 'TOTAL', nights: 'nights',
        managed_by: 'Managed by',
        feat_exclusive: 'EXCLUSIVE', cond_new: 'New Construction',
        no_data: 'Not available', plan_click: 'Click to enlarge',
        feat_beds: 'Beds', feat_baths: 'Baths', feat_pool: 'Pool', feat_garage: 'Garage', feat_wifi: 'Wifi', feat_terrace: 'Terrace',

        // ROLES AGENTE
        'role_founder': 'Founder & Agent',
        'role_agent': 'Real Estate Agent',
        'role_rental': 'Rental Manager',
        'agent_label': 'Listing Agent',
        
        // CONTACTO Y ALERTAS
        'btn_whatsapp': 'ASK ON WHATSAPP',
        'btn_email': 'Send Email',
        'txt_email': 'Email:',
        'txt_phone': 'Phone:',
        'alert_dates': 'Please select check-in and check-out dates to continue.'
    },
    'sv': {
        unit_day: '/ natt', unit_week: '/ vecka', unit_month: '/ månad',
        lbl_in: 'Incheckning', lbl_out: 'Utcheckning', 
        btn_book: 'BOKA', // CAMBIO
        total: 'TOTALT', nights: 'nätter',
        managed_by: 'Förvaltas av',
        feat_exclusive: 'EXKLUSIV', cond_new: 'Nyproduktion',
        no_data: 'Ej tillgänglig', plan_click: 'Klicka för att förstora',
        feat_beds: 'Sovrum', feat_baths: 'Badrum', feat_pool: 'Pool', feat_garage: 'Garage', feat_wifi: 'Wifi', feat_terrace: 'Terrass',

        // ROLES AGENTE
        'role_founder': 'Grundare & Mäklare',
        'role_agent': 'Fastighetsmäklare',
        'role_rental': 'Uthyrningschef',
        'agent_label': 'Ansvarig Mäklare',
        
        // CONTACTO Y ALERTAS
        'btn_whatsapp': 'FRÅGA PÅ WHATSAPP',
        'btn_email': 'Skicka E-post',
        'txt_email': 'E-post:',
        'txt_phone': 'Telefon:',
        'alert_dates': 'Vänligen välj in- och utcheckningsdatum för att fortsätta.'
    }
};

function t(key) {
    const lang = localStorage.getItem('preferredLang') || 'es';
    return I18N_RENT_UI[lang][key] || key;
}

// FORMATEO DE TEXTO
function smartFormatText(text) {
    if (!text) return "";
    const rawSegments = text.split('~~').map(s => s.trim()).filter(s => s.length > 0);
    let formattedHtml = "";
    rawSegments.forEach(segment => {
        let processedSegment = segment.replace(/^([^:.\n]{2,50}):/g, '<strong>$1:</strong>');
        formattedHtml += `<p style="margin-bottom: 15px; line-height: 1.6;">${processedSegment}</p>`;
    });
    return formattedHtml;
}

// CONTROL DE VISIBILIDAD PESTAÑAS
function updateTabVisibility(tabName, isVisible) {
    const btn = document.querySelector(`.tab-btn[data-tab="${tabName}"]`);
    if(btn) {
        if(isVisible) {
            btn.style.display = 'inline-block';
        } else {
            btn.style.display = 'none';
            if(btn.classList.contains('active')) {
                btn.classList.remove('active');
                const pane = document.getElementById(tabName);
                if(pane) pane.classList.remove('active');
                const firstVisible = document.querySelector('.tab-btn:not([style*="none"])');
                if(firstVisible) firstVisible.click();
            }
        }
    }
}

// INICIALIZACIÓN
async function initRentPage() {
    const params = new URLSearchParams(window.location.search);
    const propId = params.get('id');

    if (!propId) {
        window.location.href = 'rent.html';
        return;
    }

    try {
        const response = await fetch('assets/data/propiedades.xml');
        if (!response.ok) throw new Error("XML Error");
        const str = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(str, "text/xml");
        
        const items = Array.from(xmlDoc.querySelectorAll("propiedad"));
        const property = items.find(item => {
            const idNode = item.querySelector("id");
            return idNode && idNode.textContent === propId;
        });

        if (!property) throw new Error("Property not found");

        renderRentDetails(property);
        renderRentFeatures(property);
        renderRentGallery(property);
        renderSimilarRentals(property, items);

    } catch (e) {
        console.error(e);
        document.querySelector('main').innerHTML = '<div style="text-align:center; padding:100px;">Property not available.</div>';
    }
}

// RENDERIZADO PRINCIPAL
function renderRentDetails(node) {
    const getVal = (tags) => {
        if(!Array.isArray(tags)) tags = [tags];
        for(let t of tags) {
            const el = node.querySelector(t);
            if(el && el.textContent && el.textContent.trim() !== '') return el.textContent.trim();
        }
        return '';
    };

    const lang = localStorage.getItem('preferredLang') || 'es';

    // 1. Textos Generales
    const city = getVal(['ciudad', 'poblacion']);
    const zone = getVal(['zona', 'area']);
    const title = `${city} - ${zone}`; 
    document.getElementById('prop-title').textContent = title.toUpperCase();
    document.getElementById('prop-location').textContent = zone ? `${city} • ${zone}` : city;
    document.getElementById('prop-ref').textContent = `REF: ${getVal('id')}`;

    let desc = (lang === 'en') ? getVal('descrip2') : (lang === 'sv' ? getVal('descrip9') : getVal('descrip1'));
    if(!desc || desc.length < 5) desc = getVal(['descrip1', 'descripcion']);
    document.getElementById('prop-description').innerHTML = smartFormatText(desc);

    // 2. Lógica Visibilidad (Mapa y Plano)
    const lat = parseFloat(getVal(['latitud', 'lat']));
    const lng = parseFloat(getVal(['altitud', 'longitud', 'lng']));
    let hasMap = false;
    if(!isNaN(lat) && !isNaN(lng) && lat !== 0 && lng !== 0) {
        window.propCoords = { lat, lng }; hasMap = true;
    } 
    updateTabVisibility('tab-map', hasMap);

    const planCont = document.getElementById('plan-container');
    let hasPlan = false;
    let planUrl = getVal(['plano', 'plano1', 'url_plano', 'floor_plan']);
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
        const isImg = /\.(jpg|jpeg|png|webp)$/i.test(planUrl) || planUrl.includes('images');
        if (isImg) {
            planCont.innerHTML = `<div style="cursor: pointer; text-align:center; width:100%;" onclick="window.openSingleImage('${planUrl}')"><img src="${planUrl}" alt="Plano" style="max-height:500px; width:auto; max-width:100%; box-shadow: 0 5px 15px rgba(0,0,0,0.1);"><p style="margin-top: 15px; font-size: 0.9rem; color: #666; font-weight: 500;"><span style="font-size:1.2rem; vertical-align: middle;">🔍</span> ${t('plan_click')}</p></div>`;
        } else {
            planCont.innerHTML = `<iframe src="${planUrl}" width="100%" height="600" style="border:0; border-radius:4px;" allowfullscreen></iframe>`;
        }
    }
    updateTabVisibility('tab-plan', hasPlan);

    // 3. WIDGET DE RESERVA
    let rawPrice = getVal(['precioalq']);
    if(!rawPrice || rawPrice === '0') rawPrice = getVal('precio');
    rentPrice = parseFloat(rawPrice) || 0;
    
    const rawUnit = getVal('tipomensual'); 
    let unitLabel = t('unit_day');
    if(rawUnit && rawUnit.toUpperCase().includes('SEM')) unitLabel = t('unit_week');
    if(rawUnit && rawUnit.toUpperCase().includes('MES')) unitLabel = t('unit_month');

    document.getElementById('rent-price-display').textContent = rentPrice + ' €';
    document.getElementById('rent-unit-display').textContent = unitLabel;
    
    document.getElementById('lbl-checkin').textContent = t('lbl_in');
    document.getElementById('lbl-checkout').textContent = t('lbl_out');
    document.getElementById('btn-request-book').textContent = t('btn_book'); // Ahora dice "RESERVAR"

    // 4. LÓGICA DE AGENTE (INTEGRADA EN EL WIDGET)
    const agentName = getVal('agente') || 'MH Estate Team';
    const agentPhone = getVal(['tlf_agente', 'telefono_agente']);
    const agentEmail = getVal(['email_agente']) || 'info@mhestate.es';
    const agentPrefix = getVal('prefijo_tlf_agente') || '34';

    // Determinar Rol
    let roleKey = 'agent_label';
    if (agentName.includes('Cecilia Andersson')) roleKey = 'role_founder';
    else if (agentName.includes('Rebecca Velin')) roleKey = 'role_agent';
    else if (agentName.includes('Isidora')) roleKey = 'role_rental';

    // Determinar Foto
    let photoUrl = AGENT_PHOTOS[agentName] || AGENT_PHOTOS[Object.keys(AGENT_PHOTOS).find(k => agentName.includes(k))] || AGENT_PHOTOS['default'];

    // Preparar Teléfono
    let finalPhone = agentPhone;
    if(!finalPhone || finalPhone.trim() === "") {
        if(agentName.includes("Rebecca")) finalPhone = "653 61 04 24"; 
        else finalPhone = "604 12 94 65"; 
    }
    const cleanNumber = (agentPrefix + finalPhone).replace(/\D/g, ''); 

    // Renderizar Bloque Agente en Widget (SIN BOTÓN EMAIL, SOLO TEXTO)
    const agentContainer = document.querySelector('.booking-agent-mini');
    if(agentContainer) {
        agentContainer.innerHTML = `
            <div style="display:flex; align-items:center; gap:12px; margin-bottom:15px;">
                <img src="${photoUrl}" style="width:55px; height:55px; border-radius:50%; object-fit:cover; border:1px solid #eee;" alt="${agentName}">
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
        // Ajuste CSS inline
        agentContainer.style.display = 'block'; 
        agentContainer.style.marginTop = '20px';
        agentContainer.style.paddingTop = '20px';
        agentContainer.style.borderTop = '1px solid #eee';
    }

    // 5. Cálculo Fechas
    const inInput = document.getElementById('date-checkin');
    const outInput = document.getElementById('date-checkout');
    const calculate = () => {
        if(inInput.value && outInput.value) {
            const d1 = new Date(inInput.value);
            const d2 = new Date(outInput.value);
            const diffTime = d2 - d1;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
            
            const summaryBox = document.getElementById('booking-summary');
            if (diffDays > 0) {
                const total = diffDays * rentPrice;
                document.getElementById('txt-nights-count').textContent = `${diffDays} ${t('nights')}`;
                document.getElementById('txt-calc-subtotal').textContent = `${total} €`;
                document.getElementById('txt-total').textContent = `${total} €`;
                summaryBox.style.display = 'block';
            } else {
                summaryBox.style.display = 'none';
            }
        }
    };
    inInput.addEventListener('change', calculate);
    outInput.addEventListener('change', calculate);

    // --- ACCIÓN BOTÓN 1: RESERVAR (Misma acción que WhatsApp) ---
    document.getElementById('btn-request-book').addEventListener('click', (e) => {
        e.preventDefault();
        const inDate = inInput.value;
        const outDate = outInput.value;
        
        // VALIDACIÓN
        if(!inDate || !outDate) {
            alert(t('alert_dates')); 
            return;
        }

        const ref = getVal('id');
        const title = document.getElementById('prop-title').textContent;
        
        // MENSAJE DINÁMICO
        const msg = `Hola ${agentName}, estoy interesado en reservar:\n` +
                    `Propiedad: ${title} (Ref: ${ref})\n` +
                    `Fechas: del ${inDate} al ${outDate}.\n` +
                    `Quedo a la espera de confirmación.`;

        // ABRIR WHATSAPP
        const waUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(msg)}`;
        window.open(waUrl, '_blank');
    });

    // --- ACCIÓN BOTÓN 2: CONSULTAR POR WHATSAPP ---
    const waBtn = document.getElementById('btn-whatsapp-dynamic');
    if(waBtn) {
        waBtn.addEventListener('click', (e) => {
            const inDate = inInput.value;
            const outDate = outInput.value;

            // VALIDACIÓN
            if(!inDate || !outDate) {
                e.preventDefault();
                alert(t('alert_dates'));
            } else {
                e.preventDefault();
                const ref = getVal('id');
                const title = document.getElementById('prop-title').textContent;
                
                // MENSAJE DINÁMICO
                const msg = `Hola ${agentName}, me gustaría consultar disponibilidad para:\n` +
                            `Propiedad: ${title} (Ref: ${ref})\n` +
                            `Fechas: del ${inDate} al ${outDate}.\n` +
                            `¿Está disponible?`;

                // ABRIR WHATSAPP
                const waUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(msg)}`;
                window.open(waUrl, '_blank');
            }
        });
    }
}

// GALERÍA BENTO GRID (Mismo código optimizado)
function renderRentGallery(node) {
    const container = document.getElementById('gallery-container');
    lightboxMedia = [];
    
    for(let i=1; i<=25; i++) {
        const url = node.querySelector(`foto${i}`)?.textContent;
        if(url && url.length > 5) lightboxMedia.push({type:'img', src:url});
    }
    
    if(lightboxMedia.length === 0) return;

    let html = `<div class="rent-gallery-wrapper">`;
    html += `<div class="rent-hero-main" onclick="openLightbox(0)"><img src="${lightboxMedia[0].src}" alt="Main View" loading="lazy"></div>`;

    if (lightboxMedia.length > 1) {
        html += `<div class="rent-gallery-bottom">`;
        html += `<div class="gallery-big-square" onclick="openLightbox(1)"><img src="${lightboxMedia[1].src}" alt="Detail 1" loading="lazy"></div>`;
        html += `<div class="gallery-quad-grid">`;
        const limit = Math.min(lightboxMedia.length, 5);
        for (let i = 2; i < limit; i++) {
            html += `<div class="gallery-small-item" onclick="openLightbox(${i})"><img src="${lightboxMedia[i].src}" alt="Detail ${i}" loading="lazy"></div>`;
        }
        if (lightboxMedia.length > 5) {
            const remaining = lightboxMedia.length - 6; 
            if (remaining > 0) {
                 html += `<div class="gallery-small-item" onclick="openLightbox(5)"><img src="${lightboxMedia[5].src}" alt="More" loading="lazy"><div class="more-photos-overlay">+${remaining}</div></div>`;
            } else {
                html += `<div class="gallery-small-item" onclick="openLightbox(5)"><img src="${lightboxMedia[5].src}" alt="Detail 5" loading="lazy"></div>`;
            }
        }
        html += `</div></div>`; 
    }
    html += `</div>`; 
    container.innerHTML = html;
}

// FEATURES & SIMILARS
function renderRentFeatures(node) {
    const container = document.getElementById('tab-facts-content');
    container.innerHTML = '';
    const getVal = (tag) => { const el = node.querySelector(tag); return el ? el.textContent : ''; };
    const desc = node.querySelector('descrip1')?.textContent || '';
    const checkText = (key) => {
        const patterns = { 'pool': /(piscina|pool)/i, 'garage': /(garaje|parking)/i, 'wifi': /(wifi|internet)/i };
        return patterns[key] ? patterns[key].test(desc.toLowerCase()) : false;
    };
    const items = [
        { key: 'feat_beds', val: getVal('habitaciones') || getVal('dormitorios') },
        { key: 'feat_baths', val: getVal('banyos') || getVal('banos') },
        { key: 'feat_pool', val: getVal('piscina'), bool: true, ia:'pool' },
        { key: 'feat_garage', val: getVal('garaje'), bool: true, ia:'garage' },
        { key: 'feat_terrace', val: getVal('terraza'), bool: true },
        { key: 'feat_wifi', val: '0', bool: true, ia:'wifi' }
    ];
    items.forEach(item => {
        let val = item.val;
        if((!val || val === '0') && item.ia) { if(checkText(item.ia)) val = '1'; }
        if(item.bool) { if(val === '1') val = 'Sí'; else return; }
        if(val && val !== '0') {
            const div = document.createElement('div');
            div.className = 'tech-card';
            div.innerHTML = `<span class="tech-label">${t(item.key)}</span><span class="tech-value">${val}</span>`;
            container.appendChild(div);
        }
    });
}

function renderSimilarRentals(current, allItems) {
    const container = document.getElementById('similar-container');
    const currentId = current.querySelector('id')?.textContent;
    let rentals = allItems.filter(p => {
        const act = p.querySelector('accion')?.textContent || '';
        return act.toLowerCase().includes('alquiler') && p.querySelector('id')?.textContent !== currentId;
    });
    rentals = rentals.slice(0, 6);
    container.innerHTML = '';
    rentals.forEach(p => {
        const img = p.querySelector('foto1')?.textContent || 'assets/img/logo mh state negro.png';
        const title = p.querySelector('nombre')?.textContent || 'Property';
        const city = p.querySelector('poblacion')?.textContent;
        const price = p.querySelector('precioalq')?.textContent || p.querySelector('precio')?.textContent;
        const card = document.createElement('div');
        card.className = 'prop-card-mini';
        card.onclick = () => window.location.href = `propiedad-rent.html?id=${p.querySelector('id')?.textContent}`;
        card.innerHTML = `<div class="mini-img-wrapper"><img src="${img}"></div><div class="mini-content"><h4>${title}</h4><p class="mini-loc">${city}</p><p class="mini-price">${price} €</p></div>`;
        container.appendChild(card);
    });
    if(rentals.length > 3) {
        document.getElementById('sim-prev').onclick = () => container.scrollBy({left:-300, behavior:'smooth'});
        document.getElementById('sim-next').onclick = () => container.scrollBy({left:300, behavior:'smooth'});
    }
}

// UTILS
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

window.openSingleImage = (src) => {
    const oldMedia = [...lightboxMedia]; 
    lightboxMedia = [{type:'img', src: src}];
    currentLightboxIndex = 0;
    document.getElementById('lightbox-modal').classList.add('active');
    updateLightbox();
    const modal = document.getElementById('lightbox-modal');
    const restore = () => { lightboxMedia = oldMedia; modal.removeEventListener('click', checkClose); };
    const checkClose = (e) => { if(e.target === modal || e.target.classList.contains('close-lightbox')) restore(); };
    modal.addEventListener('click', checkClose);
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
    document.getElementById('lightbox-media-container').innerHTML = `<img src="${item.src}">`;
    document.getElementById('lightbox-counter').textContent = `${currentLightboxIndex+1}/${lightboxMedia.length}`;
}