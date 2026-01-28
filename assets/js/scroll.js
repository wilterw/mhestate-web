window.addEventListener('scroll', function() {
    const header = document.querySelector('.main-header');
    
    // Solo aplica la lógica si estamos en la Home (donde el header empieza transparente)
    // En otras páginas siempre es sólido
    if(window.location.pathname.includes('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('/')) {
        if (window.scrollY > 50) {
            header.style.backgroundColor = '#C5BDA8'; // Se vuelve sólido
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        } else {
            header.style.backgroundColor = 'rgba(226, 214, 200, 0.5)'; // Vuelve a transparente
            header.style.boxShadow = 'none';
        }
    }
});