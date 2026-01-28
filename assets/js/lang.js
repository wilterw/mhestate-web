const translations = {
    es: {
        nav: {
            home: "Inicio",
            buy: "Comprar",
            rent: "Alquilar",
            sell: "Vender",
            about: "Nosotros",
            contact: "Contacto"
        },
        buttons: {
            contact: "Contactar",
            more: "Ver más",
            search: "Buscar"
        },
        footer: {
            rights: "Todos los derechos reservados."
        }
    },
    en: {
        nav: {
            home: "Home",
            buy: "Buy",
            rent: "Rent",
            sell: "Sell",
            about: "About Us",
            contact: "Contact"
        },
        buttons: {
            contact: "Contact Us",
            more: "View More",
            search: "Search"
        },
        footer: {
            rights: "All rights reserved."
        }
    }
};

// Función para obtener idioma (guarda la preferencia en el navegador)
function getCurrentLang() {
    return localStorage.getItem('siteLang') || 'es';
}

function setLanguage(lang) {
    localStorage.setItem('siteLang', lang);
    location.reload();
}