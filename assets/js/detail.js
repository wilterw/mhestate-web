/* =========================================
   DETAIL.JS - V10.4 (SMART TITLE + SMART DESC + FIXES)
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {
    initPropertyPage();
    setupTabs();
});

// --- VARIABLES GLOBALES ---
let lightboxMedia = []; 
let currentLightboxIndex = 0;
let mapInitialized = false;
let currentXmlProp = null; 

// --- DICCIONARIO DE TRADUCCIONES ---
const TRANSLATIONS = {
    'es': {
        'type_apartamento': 'Apartamento', 'type_piso': 'Piso', 'type_atico': 'Ático',
        'type_pareado': 'Pareado', 'type_adosado': 'Adosado', 'type_villa': 'Villa',
        'type_chalet': 'Chalet', 'type_estudio': 'Estudio', 'type_terreno': 'Terreno',
        'type_parcela': 'Parcela', 'type_local': 'Local Comercial', 'type_oficina': 'Oficina',
        
        'cond_new': 'Obra Nueva', 
        'cond_resale': 'Segunda Mano',

        'feat_ref': 'Referencia', 'feat_price': 'Precio', 'feat_type': 'Tipo',
        'feat_town': 'Ciudad', 'feat_zone': 'Zona', 'feat_beds': 'Dormitorios',
        'feat_baths': 'Baños', 'feat_toilets': 'Aseos', 'feat_built': 'Construido',
        'feat_useful': 'Útil', 'feat_terrace': 'Terraza', 'feat_plot': 'Parcela',
        'feat_pool': 'Piscina', 'feat_garage': 'Garaje', 
        'feat_year': 'Año Const.', 'feat_floors': 'Plantas',
        'feat_ibi': 'IBI', 'feat_community': 'Comunidad',
        
        'feat_ac': 'Aire Acond.',
        'feat_seaview': 'Vistas al Mar',
        'feat_elevator': 'Ascensor',
        'feat_plan': 'Plano',

        'val_yes': 'Sí', 'val_no': 'No', 'val_private': 'Privada',
        'val_communal': 'Comunitaria', 'val_consult': 'Consultar',
        
        // --- ROLES DE AGENTE (ES) ---
        'agent_label': 'Agente Responsable', 
        'role_founder': 'Fundadora y Agente Inmobiliaria',
        'role_agent': 'Agente Inmobiliaria',
        'role_rental': 'Gestora de Alquileres',

        'btn_email': 'Enviar Email', 'btn_call': 'Llamar',
        'plan_click': 'Haz clic para ampliar', 'no_data': 'No disponible', 'loc_approx': 'Ubicación Aproximada',

        'feat_exclusive': 'EXCLUSIVA'
    },
    'en': {
        'type_apartamento': 'Apartment', 'type_piso': 'Flat', 'type_atico': 'Penthouse',
        'type_pareado': 'Semi-detached', 'type_adosado': 'Townhouse', 'type_villa': 'Villa',
        'type_chalet': 'Chalet', 'type_estudio': 'Studio', 'type_terreno': 'Land',
        'type_parcela': 'Plot', 'type_local': 'Commercial Premises', 'type_oficina': 'Office',

        'cond_new': 'New Construction',
        'cond_resale': 'Resale',

        'feat_ref': 'Reference', 'feat_price': 'Price', 'feat_type': 'Type',
        'feat_town': 'Town', 'feat_zone': 'Area', 'feat_beds': 'Bedrooms',
        'feat_baths': 'Bathrooms', 'feat_toilets': 'Toilets', 'feat_built': 'Built',
        'feat_useful': 'Useful', 'feat_terrace': 'Terrace', 'feat_plot': 'Plot',
        'feat_pool': 'Pool', 'feat_garage': 'Garage', 
        'feat_year': 'Year Built', 'feat_floors': 'Floors',
        'feat_ibi': 'Tax (IBI)', 'feat_community': 'Community',
        
        'feat_ac': 'Air Cond.',
        'feat_seaview': 'Sea Views',
        'feat_elevator': 'Elevator',
        'feat_plan': 'Floor Plan',

        'val_yes': 'Yes', 'val_no': 'No', 'val_private': 'Private',
        'val_communal': 'Communal', 'val_consult': 'On request',
        
        // --- ROLES DE AGENTE (EN) ---
        'agent_label': 'Listing Agent', 
        'role_founder': 'Founder & Real Estate Agent',
        'role_agent': 'Real Estate Agent',
        'role_rental': 'Rental Manager',

        'btn_email': 'Send Email', 'btn_call': 'Call Now',
        'plan_click': 'Click to enlarge', 'no_data': 'Not available', 'loc_approx': 'Approximate Location',

        'feat_exclusive': 'EXCLUSIVE'
    },
    'sv': {
        'type_apartamento': 'Lägenhet', 'type_piso': 'Lägenhet', 'type_atico': 'Takvåning',
        'type_pareado': 'Parhus', 'type_adosado': 'Radhus', 'type_villa': 'Villa',
        'type_chalet': 'Chalet', 'type_estudio': 'Studio', 'type_terreno': 'Mark',
        'type_parcela': 'Tomt', 'type_local': 'Lokal', 'type_oficina': 'Kontor',

        'cond_new': 'Nyproduktion',
        'cond_resale': 'Begagnad',

        'feat_ref': 'Referens', 'feat_price': 'Pris', 'feat_type': 'Typ',
        'feat_town': 'Stad', 'feat_zone': 'Område', 'feat_bed': 'Sovrum',
        'feat_baths': 'Badrum', 'feat_toilets': 'Toaletter', 'feat_built': 'Byggyta',
        'feat_useful': 'Användbar', 'feat_terrace': 'Terrass', 'feat_plot': 'Tomt',
        'feat_pool': 'Pool', 'feat_garage': 'Garage', 
        'feat_year': 'Byggår', 'feat_floors': 'Våningar',
        'feat_ibi': 'Skatt (IBI)', 'feat_community': 'Samfällighet',
        
        'feat_ac': 'Luftkond.',
        'feat_seaview': 'Havsutsikt',
        'feat_elevator': 'Hiss',
        'feat_plan': 'Planlösning',

        'val_yes': 'Ja', 'val_no': 'Nej', 'val_private': 'Privat',
        'val_communal': 'Gemensam', 'val_consult': 'På begäran',
        
        // --- ROLES DE AGENTE (SV) ---
        'agent_label': 'Ansvarig Mäklare', 
        'role_founder': 'Grundare & Fastighetsmäklare',
        'role_agent': 'Fastighetsmäklare',
        'role_rental': 'Uthyrningschef',

        'btn_email': 'Skicka E-post', 'btn_call': 'Ring Nu',
        'plan_click': 'Klicka för att förstora', 'no_data': 'Ej tillgänglig', 'loc_approx': 'Ungefärlig plats',

        'feat_exclusive': 'EXKLUSIV'
    }
};

function t(key) {
    const lang = localStorage.getItem('preferredLang') || 'es';
    return (TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) || (TRANSLATIONS['en'] && TRANSLATIONS['en'][key]) || key;
}

// --- HELPER FUNCTIONS ---
function formatPropType(rawType) {
    if (!rawType) return '';
    const safeType = rawType.toLowerCase().trim();
    const typeMap = {
        'apartamento': 'type_apartamento', 'piso': 'type_piso',
        'ático': 'type_atico', 'atico': 'type_atico',
        'pareado': 'type_pareado', 'adosado': 'type_adosado',
        'villa': 'type_villa', 'casa': 'type_villa', 'chalet': 'type_chalet',
        'estudio': 'type_estudio', 'terreno': 'type_terreno',
        'parcela': 'type_parcela', 'solar': 'type_parcela',
        'local': 'type_local', 'oficina': 'type_oficina'
    };
    for (const [key, transKey] of Object.entries(typeMap)) {
        if (safeType.includes(key)) return t(transKey);
    }
    return rawType.charAt(0).toUpperCase() + rawType.slice(1);
}

function formatCondition(rawCond) {
    if (!rawCond) return t('cond_resale'); 
    if (rawCond === 'Obra Nueva') return t('cond_new');
    return t('cond_resale');
}

// --- TÍTULO INTELIGENTE (COMO EN RENT-DETAIL) ---
function generateSmartTitle(node) {
    const lang = localStorage.getItem('preferredLang') || 'es';
    let titleTag = 'titulo1'; 
    let descTag = 'descrip1';
    
    if (lang === 'en') { titleTag = 'titulo2'; descTag = 'descrip2'; }
    if (lang === 'sv') { titleTag = 'titulo9'; descTag = 'descrip9'; }

    // 1. Prioridad: Etiqueta de título traducida (titulo1, titulo2...)
    let title = node.querySelector(titleTag)?.textContent;
    if (title && title.trim().length > 5 && !title.includes('CDATA')) return title.replace(/<!\[CDATA\[|\]\]>/g, '').trim();
    
    // 2. Prioridad: TituloWeb o Titulo genérico
    title = node.querySelector('tituloweb')?.textContent || node.querySelector('titulo')?.textContent;
    if (title && title.trim().length > 5 && !title.includes('CDATA')) return title.replace(/<!\[CDATA\[|\]\]>/g, '').trim();

    // 3. Prioridad: Extracción inteligente de la primera frase de la descripción
    let desc = node.querySelector(descTag)?.textContent || node.querySelector('descrip1')?.textContent; 
    if (desc) {
        let cleanDesc = desc.replace(/<!\[CDATA\[|\]\]>/g, '').trim();
        // Tomar hasta el primer punto, salto de línea o cierre de interrogación/exclamación
        let firstPart = cleanDesc.split(/[\r\n.]+/)[0].trim();
        // Limpiar caracteres iniciales o finales raros
        firstPart = firstPart.replace(/^[¡¿"-]+/, '').replace(/[!?:."]+$/, '');
        
        // Si la frase extraída tiene una longitud razonable (título), usarla
        if (firstPart.length > 10 && firstPart.length < 80) {
            return firstPart.charAt(0).toUpperCase() + firstPart.slice(1);
        }
    }

    // 4. Fallback: Formato técnico (Tipo en Zona)
    const city = node.querySelector('poblacion')?.textContent || '';
    const type = formatPropType(node.querySelector('tipo_ofer')?.textContent || 'Propiedad');
    const zone = node.querySelector('zona')?.textContent || '';
    return `${type} en ${zone || city}`;
}

// --- FORMATO INTELIGENTE DE DESCRIPCIÓN (COMO EN RENT-PROPIEDAD) ---
function smartFormatText(text) {
    if (!text) return "";
    
    // 1. Limpieza inicial
    let html = text.replace(/<!\[CDATA\[|\]\]>/g, '')
                   .replace(/~/g, '<br><br>')
                   .replace(/—/g, '&mdash;')
                   .replace(/\r\n/g, '\n');

    // 2. Detectar listas (•, *, -) y convertir a HTML
    const listPattern = /(?:^|\n)\s*[•\-\*]\s+(.*?)(?=\n|$|<br>)/g;
    if (listPattern.test(html)) {
        html = html.replace(listPattern, '<li>$1</li>');
        html = html.replace(/(<li>.*?<\/li>)+/g, '<ul>$&</ul>');
    }

    // 3. Negritas inteligentes en palabras clave
    const keywords = [
        "Cocina", "Salón", "Dormitorio", "Baño", "Terraza", "Exterior", "Interior", 
        "Planta baja", "Planta alta", "Ubicación", "Jardín", "Piscina", "Vistas", "Distribución", "Garaje",
        "Kitchen", "Living room", "Bedroom", "Bathroom", "Terrace", "Garden", "Pool", "Views", "Location", "Distribution", "Garage"
    ];
    
    keywords.forEach(word => {
        const regex = new RegExp(`(\\.\\s*|^|\\n|<br>|<ul>\\s*)(${word})`, 'gi');
        html = html.replace(regex, '$1<strong>$2</strong>');
    });

    // 4. Envolver en párrafos limpios
    const parts = html.split('<br><br>');
    let finalHtml = "";
    
    parts.forEach(part => {
        let cleanPart = part.trim();
        if (cleanPart.includes('<ul>')) {
            finalHtml += cleanPart; 
        } else if (cleanPart.length > 0) {
            finalHtml += `<p class="desc-paragraph">${cleanPart}</p>`;
        }
    });

    return finalHtml;
}

// --- IA LIGERA (EXTRACCIÓN) ---
function extractNumFromDesc(text, type) {
    if (!text) return null;
    text = text.toLowerCase();
    const numMap = { 'un': 1, 'una': 1, 'uno': 1, 'primer': 1, 'dos': 2, 'tres': 3, 'cuatro': 4, 'cinco': 5, 'seis': 6, 'siete': 7, 'ocho': 8, 'nueve': 9, 'diez': 10 };
    let regex;
    if (type === 'beds') {
        regex = /(?:^|\s|\.|,)(?:(\d+)|(un|una|uno|dos|tres|cuatro|cinco|seis|siete|ocho|nueve|diez))\s+(?:(?:amplios?|dobles?|grandes?|bonitos?|luminosos?|fantásticos?|espaciosos?|hermosos?)\s+)?(?:dormitorios?|dorm|habs?|habitaci[oó]nes?|cuartos?|bedrooms?|beds?)(?:\s|\.|,|$)/i;
    } else if (type === 'baths') {
        regex = /(?:^|\s|\.|,)(?:(\d+)|(un|una|uno|dos|tres|cuatro|cinco))\s+(?:(?:completos?|grandes?|modernos?)\s+)?(?:baños?|banyos?|aseos?|cuartos? de baño|bathrooms?|baths?)(?:\s|\.|,|$)/i;
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
        'garage': /(garaje|parking|aparcamiento|cochera|plaza de (garaje|parking))/i,
        'elevator': /(ascensor|elevador)/i,
        'terrace': /(terraza|balc[oó]n|solarium|azotea)/i
    };
    if (patterns[type] && patterns[type].test(text)) return true;
    return false;
}

// --- FOTOS DE AGENTES ---
const AGENT_PHOTOS = {
    'Cecilia Andersson': 'assets/img/cecilia.jpg',
    'Rebecca Velin': 'assets/img/Rebbeca.jpg',
    'Isidora': 'assets/img/Isidora.jpg',
    'CEO': 'assets/img/ceo.jpg', 
    'MH Estate Team': 'assets/img/logo mh state negro.png',
    'default': 'assets/img/logo mh state negro.png'
};

async function initPropertyPage() {
    let propId = new URLSearchParams(window.location.search).get('id');
    if (!propId && window.location.hash) {
        const hash = window.location.hash.substring(1); 
        const params = new URLSearchParams(hash);
        propId = params.get('id');
    }

    if (!propId) { console.warn("No ID detected"); return; }

    try {
        const response = await fetch('assets/data/propiedades.xml');
        if (!response.ok) throw new Error("Error loading XML");
        
        const strXML = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(strXML, "text/xml");
        
        const props = Array.from(xmlDoc.querySelectorAll('propiedad'));
        
        const property = props.find(p => {
            const idNode = p.querySelector('id');
            const refNode = p.querySelector('ref');
            const refNode2 = p.querySelector('referencia');
            return (idNode && idNode.textContent.trim() === propId) || 
                   (refNode && refNode.textContent.trim() === propId) ||
                   (refNode2 && refNode2.textContent.trim() === propId);
        });

        if (!property) throw new Error("Propiedad no encontrada");

        currentXmlProp = property;
        renderPropertyDetails(property);
        renderSimilarProperties(property, props);

    } catch (error) {
        console.error(error);
        const main = document.querySelector('main');
        if(main) main.innerHTML = '<div style="text-align:center;padding:100px;">Propiedad no disponible / Property not available</div>';
    }
}

function renderPropertyDetails(node) {
    const get = (tags) => {
        if(!Array.isArray(tags)) tags = [tags];
        for(let t of tags) {
            const el = node.querySelector(t);
            if(el && el.textContent && el.textContent.trim() !== '') return el.textContent.trim();
        }
        return '';
    };

    const lang = localStorage.getItem('preferredLang') || 'es';

    // --- APLICAR TÍTULO INTELIGENTE ---
    const smartTitle = generateSmartTitle(node);
    
    // Subtítulo (Ubicación técnica)
    const zone = get(['zona', 'area']);
    const city = get(['ciudad', 'poblacion']);
    const locationSubtitle = `${city} • ${zone}`; 

    // Asignar al H1 y al subtítulo
    setTextSafe('prop-title', smartTitle);
    setTextSafe('prop-location', locationSubtitle);
    
    // Asignar al título dentro de la pestaña "Descripción"
    const innerTitle = document.querySelector('.tab-inner-title');
    if(innerTitle) innerTitle.textContent = smartTitle;

    const refEl = document.getElementById('prop-ref');
    if(refEl) refEl.style.display = 'none'; 
    
    // --- LÓGICA DE ETIQUETA EN HERO DETALLE ---
    const excluVal = get(['exclu', 'exclusiva']);
    const tagEl = document.getElementById('prop-tag');

    if(tagEl) {
        tagEl.style.display = 'none'; 
        if(excluVal === '1') {
            tagEl.textContent = t('feat_exclusive');
            tagEl.style.display = 'inline-block';
            tagEl.style.backgroundColor = '#000';
            tagEl.style.color = '#fff';
        } 
    }

    setTextSafe('prop-price', formatPrice(get(['precioinmo', 'precio'])));

    renderMultimediaGallery(node);

    let rawDesc = (lang === 'en') ? get('descrip2') : (lang === 'sv' ? get('descrip9') : get('descrip1'));
    if (!rawDesc || rawDesc.length < 5) rawDesc = get(['descrip1', 'descripcion']);
    
    // --- APLICAR FORMATO INTELIGENTE A LA DESCRIPCIÓN ---
    const descContainer = document.getElementById('prop-description');
    if(descContainer) descContainer.innerHTML = smartFormatText(rawDesc);

    // --- LÓGICA DEL AGENTE ---
    const agentName = get('agente') || 'MH Estate Team';
    const agentEmail = get('email_agente') || ''; 
    const agentPhone = get(['tlf_agente', 'telefono_agente']);
    const agentPrefix = get('prefijo_tlf_agente') || '34';
    const propRef = get(['ref', 'referencia', 'id']);

    let roleKey = 'agent_label'; 
    if (agentName.includes('Cecilia Andersson')) {
        roleKey = 'role_founder';
    } else if (agentName.includes('Rebecca Velin')) {
        roleKey = 'role_agent';
    } else if (agentName.includes('Isidora Polanco')) {
        roleKey = 'role_rental';
    }

    const labelEl = document.querySelector('.agent-label');
    if(labelEl) labelEl.textContent = t(roleKey);
    
    setTextSafe('agent-name', agentName);
    
    const imgEl = document.getElementById('agent-img');
    if(imgEl) {
        let photoUrl = AGENT_PHOTOS[agentName] || AGENT_PHOTOS['default'];
        imgEl.src = photoUrl;
    }

    let finalPhone = agentPhone;
    if(!finalPhone || finalPhone.trim() === "") {
        if(agentName.includes("Rebecca")) finalPhone = "653 61 04 24"; 
        else finalPhone = "604 12 94 65"; 
    }

    const bioEl = document.getElementById('agent-bio');
    if(bioEl) {
        bioEl.style.fontStyle = 'normal';
        bioEl.style.color = '#333';
        let contactHtml = '';
        if(agentEmail) contactHtml += `<div style="margin-bottom:5px;">✉️ ${agentEmail}</div>`;
        if(finalPhone) contactHtml += `<div>📞 +${agentPrefix} ${finalPhone}</div>`;
        bioEl.innerHTML = contactHtml || 'Contacta para más información.';
    }

    const emailBtn = document.getElementById('agent-email-btn');
    if(emailBtn) {
        emailBtn.textContent = t('btn_email');
        if(agentEmail) {
            emailBtn.href = `mailto:${agentEmail}`;
            emailBtn.style.display = 'flex'; 
        } else {
            emailBtn.style.display = 'none';
        }
    }

    const wsBtn = document.getElementById('agent-call-btn');
    if(wsBtn) {
        wsBtn.className = 'btn-agent btn-whatsapp';
        wsBtn.textContent = 'WhatsApp'; 
        const cleanNumber = (agentPrefix + finalPhone).replace(/\D/g, ''); 
        let msg = `Hola, estoy interesado en la propiedad Ref: ${propRef}.`;
        if(lang === 'en') msg = `Hello, I'm interested in property Ref: ${propRef}.`;
        if(lang === 'sv') msg = `Hej, jag är intresserad av fastigheten Ref: ${propRef}.`;
        wsBtn.href = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(msg)}`;
        wsBtn.target = "_blank";
        wsBtn.style.display = 'flex';
    }

    renderFeatures(node);

    const lat = parseFloat(get(['latitud', 'lat']));
    const lng = parseFloat(get(['altitud', 'longitud', 'lng']));
    if(!isNaN(lat) && !isNaN(lng) && lat !== 0) {
        window.propCoords = { lat, lng };
    } else {
        const mapCont = document.getElementById('map-container');
        if(mapCont) mapCont.innerHTML = `<p style="padding:40px; text-align:center; color:#888;">${t('no_data')}</p>`;
    }

    const planCont = document.getElementById('plan-container');
    let hasPlan = false;
    
    if (planCont) {
        let planUrl = get(['plano', 'plano1', 'url_plano', 'floor_plan', 'link_plano', 'foto_plano', 'enlace_plano']);
        
        if (planUrl && planUrl.length > 5 && planUrl !== '1' && planUrl !== '0') {
            hasPlan = true;
        } else {
            for(let i=1; i<=60; i++) {
                const urlNode = node.querySelector(`foto${i}`);
                if(urlNode && urlNode.textContent) {
                    const eti = urlNode.getAttribute('eti');
                    const url = urlNode.textContent.trim().toLowerCase();
                    if (eti === 'plano' || url.includes('plan') || url.includes('layout') || url.includes('plano') || url.includes('distribucion') || url.includes('floor')) {
                        planUrl = urlNode.textContent.trim();
                        hasPlan = true;
                        break;
                    }
                }
            }
        }

        if (hasPlan && planUrl) {
            const isImg = /\.(jpg|jpeg|png|webp|gif|bmp)$/i.test(planUrl) || planUrl.includes('images');
            if (isImg) {
                lightboxMedia.push({ type: 'img', src: planUrl, title: t('feat_plan') || 'Plano' });
                const planIndex = lightboxMedia.length - 1;
                planCont.innerHTML = `
                    <div style="cursor: pointer; text-align:center; width:100%;" onclick="openLightbox(${planIndex})">
                        <img src="${planUrl}" alt="Plano" style="max-height:500px; width:auto; max-width:100%;">
                        <p style="margin-top: 15px; font-size: 0.9rem; color: #666; font-weight: 500;">
                            <span style="font-size:1.2rem; vertical-align: middle;">🔍</span> ${t('plan_click')}
                        </p>
                    </div>
                `;
            } else {
                planCont.innerHTML = `<iframe src="${planUrl}" width="100%" height="600" style="border:0; border-radius:4px;" allowfullscreen></iframe>`;
            }
            planCont.classList.remove('media-placeholder');
        } else {
            planCont.innerHTML = `<div style="padding:40px; text-align:center; color:#999;"><p>${t('no_data')}</p></div>`;
        }
    }

    const tourUrl = get(['tour', 'tour_virtual', 'video_tour', 'url_tour', 'enlace_tour']);
    let hasTour = false;
    if(tourUrl && tourUrl.length > 5 && tourUrl !== '0') {
        hasTour = true;
        const tourCont = document.getElementById('tour-container');
        if(tourCont) {
            tourCont.innerHTML = `<iframe src="${tourUrl}" width="100%" height="450" style="border:0; border-radius:8px;" allowfullscreen></iframe>`;
            tourCont.classList.remove('media-placeholder');
        }
    }

    const url360 = get(['fotos360', 'url_360', 'st_360', 'enlace_360', 'view360']);
    let has360 = false;
    if(url360 && url360.length > 5 && url360 !== '0') {
        has360 = true;
        const cont360 = document.getElementById('360-container');
        if(cont360) {
            cont360.innerHTML = `<iframe src="${url360}" width="100%" height="450" style="border:0; border-radius:8px;" allowfullscreen></iframe>`;
        }
    }

    updateTabVisibility('tab-plan', hasPlan);
    updateTabVisibility('tab-tour', hasTour);
    updateTabVisibility('tab-360', has360);
}

function updateTabVisibility(tabName, isVisible) {
    const btn = document.querySelector(`.tab-btn[data-tab="${tabName}"]`);
    if(btn) {
        if(isVisible) {
            btn.style.display = 'inline-block';
        } else {
            btn.style.display = 'none';
        }
    }
}

function renderFeatures(node) {
    const container = document.getElementById('tab-facts-content');
    if(!container) return; 
    
    container.innerHTML = ''; 

    // Combinar todas las descripciones para buscar mejor
    const descText = (node.querySelector('descrip1')?.textContent || '') + ' ' + (node.querySelector('descrip2')?.textContent || '');

    const getVal = (tags) => {
        if(!Array.isArray(tags)) tags = [tags];
        for(let t of tags) {
            const el = node.querySelector(t);
            if(el && el.textContent && el.textContent.trim() !== '') return el.textContent.trim();
        }
        return null;
    };

    const allSpecs = [
        { key: 'feat_ref', tags: ['ref', 'referencia', 'id'] },
        { key: 'feat_price', tags: ['precioinmo', 'precio', 'price'], isPrice: true },
        { key: 'feat_type', tags: ['tipo_ofer', 'tipo', 'type'], isType: true },
        { key: 'feat_town', tags: ['ciudad', 'poblacion', 'town'] },
        { key: 'feat_zone', tags: ['zona', 'area'] },
        
        { key: 'feat_beds', tags: ['habitaciones', 'dormitorios', 'beds', 'bedrooms', 'hab', 'rooms'] },
        { key: 'feat_baths', tags: ['banyos', 'banos', 'baths', 'bathrooms'] },
        { key: 'feat_toilets', tags: ['aseos', 'toilets'] },
        
        { key: 'feat_built', tags: ['m_cons', 'construido', 'built'], suffix: ' m²' },
        { key: 'feat_useful', tags: ['m_util', 'util', 'useful'], suffix: ' m²' },
        { key: 'feat_plot', tags: ['m_parcela', 'parcela', 'plot'], suffix: ' m²' },
        
        { key: 'feat_terrace', tags: ['m_terraza', 'terraza', 'terrace'], suffix: ' m²', isHybrid: true, iaKey: 'terrace' },
        
        { key: 'feat_pool', tags: ['piscina_prop', 'piscina', 'pool'], isBool: true, iaKey: 'pool' },
        { key: 'feat_garage', tags: ['plaza_gara', 'garaje', 'garage'], isBool: true, iaKey: 'garage' },
        
        { key: 'feat_ac', tags: ['aire_con', 'aire_acondicionado'], isBool: true, iaKey: 'ac' },
        { key: 'feat_seaview', tags: ['vistasalmar', 'vistas_mar'], isBool: true, iaKey: 'seaview' },
        { key: 'feat_elevator', tags: ['ascensor', 'elevador'], isBool: true, iaKey: 'elevator' },
        
        { key: 'feat_year', tags: ['antiguedad', 'ano_construccion', 'year'] },
        { key: 'feat_floors', tags: ['num_plantas', 'floors'] },
        { key: 'feat_ibi', tags: ['ibi'], suffix: ' €' },
        { key: 'feat_community', tags: ['comunidad', 'community_fees'], suffix: ' €' }
    ];

    let itemsFound = 0;
    allSpecs.forEach(item => {
        let val = getVal(item.tags);

        // --- FIX DORMITORIOS (Suma) ---
        if(item.key === 'feat_beds') {
            const simples = parseInt(getVal(['Simple', 'simple', 'hab_simples', 'simples'])) || 0;
            const dobles = parseInt(getVal(['Double', 'double', 'hab_dobles', 'dobles'])) || 0;
            const total = simples + dobles;
            if(total > (parseInt(val) || 0)) val = total.toString();
        }

        // --- FIX DORMITORIOS (IA Texto) ---
        if ((item.key === 'feat_beds' || item.key === 'feat_baths') && (!val || val === '0')) {
            const extracted = extractNumFromDesc(descText, item.key === 'feat_beds' ? 'beds' : 'baths');
            if (extracted) {
                val = extracted.toString();
            }
        }

        if (item.iaKey) {
            let currentCheck = val ? val.toString().trim() : '';
            if (!currentCheck || currentCheck === '0' || currentCheck.toLowerCase() === 'no') {
                if (checkFeatureInDesc(descText, item.iaKey)) {
                    val = '1'; 
                }
            }
        }

        let check = val ? val.toString().trim() : '';
        if (!check || check === '0' || check === '0.00' || check.toLowerCase() === 'no') return;
        if (!isNaN(check) && parseFloat(check) === 0) return;

        if(item.isType) val = formatPropType(val);
        else if(item.isStatus) val = formatCondition(val);
        else if(item.isBool || (item.isHybrid && val === '1')) {
            if(item.key === 'feat_pool' || item.key === 'feat_garden') val = t('val_private');
            else val = t('val_yes');
        }
        else if (item.isPrice) val = formatPrice(val);
        else if (item.suffix) val += item.suffix;

        const div = document.createElement('div');
        div.className = 'tech-card';
        div.innerHTML = `<span class="tech-label">${t(item.key)}</span><span class="tech-value">${val}</span>`;
        container.appendChild(div);
        itemsFound++;
    });

    if(itemsFound === 0) {
        container.innerHTML = `<p style="color:#999; padding:20px; grid-column:1/-1; text-align:center;">${t('no_data')}</p>`;
    }
}

// --- UTILS (RESTO IGUAL) ---
function setupTabs() {
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.tab-btn, .tab-pane').forEach(el => el.classList.remove('active'));
            btn.classList.add('active');
            
            const tabId = btn.dataset.tab;
            let targetId = tabId;
            if(tabId === 'facts') targetId = 'tab-facts'; 
            if(tabId === 'features') targetId = 'tab-desc'; 
            
            const pane = document.getElementById(targetId) || document.getElementById(tabId);
            
            if(pane) {
                pane.classList.add('active');
                if((targetId === 'tab-map' || tabId === 'map') && !mapInitialized && window.propCoords) {
                    initMap(window.propCoords.lat, window.propCoords.lng);
                    mapInitialized = true;
                }
            }
        });
    });
}

function initMap(lat, lng) {
    setTimeout(() => {
        if(typeof L !== 'undefined') {
            const map = L.map('map-container').setView([lat, lng], 15);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '© OpenStreetMap' }).addTo(map);
            L.marker([lat, lng]).addTo(map).bindPopup(t('loc_approx')).openPopup();
        }
    }, 200);
}

function setTextSafe(id, txt) { const el = document.getElementById(id); if(el) el.textContent = txt; }
function formatPrice(v) { return v ? parseFloat(v).toLocaleString('de-DE') + ' €' : t('val_consult'); }
// La funcion formatRichText anterior ya no se usa, reemplazada por smartFormatText

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
    const mainItem = lightboxMedia[0];
    let mainHtml = mainItem.type === 'video' 
        ? `<div class="gallery-main-media video-container" onclick="openLightbox(0)"><iframe src="${mainItem.src}" frameborder="0" allowfullscreen style="pointer-events:none;"></iframe><div class="play-overlay">▶</div></div>`
        : `<div class="gallery-main-media" onclick="openLightbox(0)"><img src="${mainItem.src}" alt="Principal"></div>`;
    let secondaryHtml = lightboxMedia.length > 1 
        ? `<div class="gallery-secondary-media" onclick="openLightbox(1)"><img src="${lightboxMedia[1].src}" alt="Secundaria"></div>` : '';
    let smallGridHtml = '<div class="gallery-small-grid">';
    const maxSmall = Math.min(6, lightboxMedia.length);
    for(let i=2; i<maxSmall; i++) {
        let content = `<img src="${lightboxMedia[i].src}" alt="Foto">`;
        if(i === 5 && lightboxMedia.length > 6) {
            content += `<div class="more-photos-overlay">+${lightboxMedia.length - 6}</div>`;
            smallGridHtml += `<div class="gallery-small-item overlay-container" onclick="openLightbox(${i})">${content}</div>`;
        } else {
            smallGridHtml += `<div class="gallery-small-item" onclick="openLightbox(${i})">${content}</div>`;
        }
    }
    smallGridHtml += '</div>';
    container.innerHTML = `${mainHtml}<div class="gallery-split-row">${secondaryHtml}${smallGridHtml}</div>`;
}

window.openLightbox = (index) => {
    currentLightboxIndex = index;
    document.getElementById('lightbox-modal').classList.add('active');
    updateLightboxContent();
};
window.closeLightbox = () => {
    document.getElementById('lightbox-modal').classList.remove('active');
    document.getElementById('lightbox-media-container').innerHTML = '';
};
window.changeLightboxSlide = (step) => {
    currentLightboxIndex = (currentLightboxIndex + step + lightboxMedia.length) % lightboxMedia.length;
    updateLightboxContent();
};
function updateLightboxContent() {
    const item = lightboxMedia[currentLightboxIndex];
    const container = document.getElementById('lightbox-media-container');
    document.getElementById('lightbox-counter').textContent = `${currentLightboxIndex + 1} / ${lightboxMedia.length}`;
    container.innerHTML = item.type === 'video' 
        ? `<iframe src="${item.src}?autoplay=1" frameborder="0" allowfullscreen></iframe>`
        : `<img src="${item.src}">`;
}

function renderSimilarProperties(currentProp, allProps) {
    const container = document.getElementById('similar-container');
    if (!container) return;

    const getVal = (n, tag) => {
        const el = n.querySelector(tag);
        return el ? el.textContent.trim() : '';
    };
    
    const currentId = getVal(currentProp, 'id');
    const currentType = getVal(currentProp, 'tipo_ofer');
    const currentCity = getVal(currentProp, 'ciudad');

    let similar = allProps.filter(p => {
        const pId = getVal(p, 'id');
        const pType = getVal(p, 'tipo_ofer');
        const pCity = getVal(p, 'ciudad');
        return pId !== currentId && pType === currentType && pCity === currentCity;
    });

    if (similar.length < 3) {
        const more = allProps.filter(p => {
            const pId = getVal(p, 'id');
            const pCity = getVal(p, 'ciudad');
            return pId !== currentId && pCity === currentCity && !similar.includes(p);
        });
        similar = similar.concat(more);
    }

    similar = similar.slice(0, 10);

    if (similar.length === 0) {
        const sec = document.querySelector('.similar-section');
        if(sec) sec.style.display = 'none';
        return;
    }

    container.innerHTML = '';
    const isCarousel = similar.length > 3;
    
    if (isCarousel) {
        container.classList.add('carousel-mode');
        const prev = document.getElementById('sim-prev');
        const next = document.getElementById('sim-next');
        if(prev) prev.style.display = 'flex';
        if(next) next.style.display = 'flex';
    } else {
        container.classList.remove('carousel-mode');
        container.classList.add('grid-center-mode');
        const prev = document.getElementById('sim-prev');
        const next = document.getElementById('sim-next');
        if(prev) prev.style.display = 'none';
        if(next) next.style.display = 'none';
    }
    
    similar.forEach(p => {
        const pId = getVal(p, 'id');
        const pImg = getVal(p, 'foto1') || 'assets/img/logo mh state negro.png';
        const pPrice = formatPrice(getVal(p, 'precioinmo'));
        const typeTrans = formatPropType(getVal(p, 'tipo_ofer'));
        const pZone = getVal(p, ['zona', 'area']);
        const pCity = getVal(p, 'ciudad');
        let pTitle = `${typeTrans} - ${pZone || pCity}`;

        const excluVal = getVal(p, 'exclu') || getVal(p, 'exclusiva');
        const conservationVal = getVal(p, 'conservacion') || getVal(p, 'estado');
        
        let tagHtml = '';
        if (excluVal === '1') {
            tagHtml = `<span class="mini-tag" style="background-color:#000; color:#fff;">${t('feat_exclusive')}</span>`;
        } else if (conservationVal === 'Obra Nueva') {
            tagHtml = `<span class="mini-tag" style="background-color:#000; color:#fff;">${t('cond_new')}</span>`;
        }

        const card = document.createElement('div');
        card.className = 'prop-card-mini';
        card.onclick = () => window.location.href = `propiedad.html?id=${pId}`;
        
        card.innerHTML = `
            <div class="mini-img-wrapper">
                <img src="${pImg}" alt="${pTitle}" loading="lazy">
                ${tagHtml}
            </div>
            <div class="mini-content">
                <h4>${pTitle}</h4>
                <p class="mini-loc">${pCity}</p>
                <p class="mini-price">${pPrice}</p>
            </div>
        `;
        container.appendChild(card);
    });

    if (isCarousel) {
        const prevBtn = document.getElementById('sim-prev');
        const nextBtn = document.getElementById('sim-next');
        if(prevBtn) prevBtn.onclick = () => container.scrollBy({ left: -320, behavior: 'smooth' });
        if(nextBtn) nextBtn.onclick = () => container.scrollBy({ left: 320, behavior: 'smooth' });
    }
}