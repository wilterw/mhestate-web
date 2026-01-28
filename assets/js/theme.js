async function initSystem() {
    try {
        console.log("⚙️ Cargando configuración del sistema...");
        
        // 1. Obtener configuración
        const response = await fetch('config/settings.json');
        if (!response.ok) throw new Error("No se pudo cargar settings.json");
        const settings = await response.json();

        // 2. Guardar configuración clave en SessionStorage para otros scripts
        sessionStorage.setItem('xmlUrl', settings.api.xmlUrl);
        sessionStorage.setItem('siteName', settings.siteName);

        // 3. Aplicar Variables CSS (Colores y Fuentes)
        const root = document.documentElement;
        root.style.setProperty('--primary-color', settings.theme.primaryColor);
        root.style.setProperty('--secondary-color', settings.theme.secondaryColor);
        root.style.setProperty('--accent-color', settings.theme.accentColor);
        root.style.setProperty('--bg-color', settings.theme.backgroundColor);
        root.style.setProperty('--font-main', settings.theme.fontFamily);

        // 4. Inyectar datos en elementos marcados con IDs específicos
        // (Esto servirá para Header, Footer y Contacto)
        setText('contact-email', settings.contact.email);
        setText('contact-phone', settings.contact.phone);
        setText('contact-address', settings.contact.address);
        
        // Actualizar enlaces de mailto y tel
        setHref('link-email', `mailto:${settings.contact.email}`);
        setHref('link-phone', `tel:${settings.contact.phone.replace(/\s/g, '')}`);

        // Actualizar Logo
        const logo = document.getElementById('brand-logo');
        if (logo) {
            logo.src = settings.branding.logoUrl;
            logo.alt = settings.siteName;
        }

        console.log("✅ Sistema configurado correctamente para:", settings.siteName);

    } catch (error) {
        console.error("❌ Error crítico del sistema:", error);
    }
}

// Helpers
function setText(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
}

function setHref(id, link) {
    const el = document.getElementById(id);
    if (el) el.href = link;
}

// Iniciar
document.addEventListener('DOMContentLoaded', initSystem);