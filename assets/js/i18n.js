/* =========================================
   ASSETS/JS/I18N.JS - GESTOR DE IDIOMAS V5.2 (GUIDES UPDATE)
   ========================================= */

const translations = {
    'es': {
        // --- NAVEGACIÓN ---
        'nav-home': 'INICIO',
        'nav-buy': 'COMPRAR',
        'nav-rent': 'ALQUILAR',
        'nav-sell': 'VENDER',
        'nav-about': 'NOSOTROS',
        'nav-news': 'GUÍA/NOTICIAS',
        'nav-contact': 'CONTACTO',

        // --- NUEVA ETIQUETA ---
        'label-exclusive': 'EXCLUSIVA',

        // --- SEO & META ---
        'meta-title': 'Inmobiliaria en Nerja y Marbella | MH ESTATE',
        'meta-desc': 'Expertos en venta de propiedades en Nerja, Torrox y Marbella.',

        // --- HOME: HERO & INTRO ---
        'hero-title': 'Propiedades Exclusivas en la Costa del Sol',
        'hero-subtitle': 'Tu aliado de confianza en el mercado inmobiliario',
        'intro-text': 'Orientación profesional, conexiones globales y un equipo especializado<br>que garantiza una experiencia inmobiliaria perfecta.',

        // --- HOME: SECCIONES ---
        'search-title': 'Búsqueda de Propiedades',
        'featured-title': 'Propiedades Destacadas',
        'about-text': 'En nuestro equipo reunimos una amplia experiencia en el mercado inmobiliario, que se remonta a 2003. A lo largo de los años, hemos guiado a innumerables clientes en transacciones exitosas. Siempre evaluamos cada operación para seguir mejorando.',
        'btn-contact': 'CONTÁCTANOS',
        'newsletter-title': 'Suscríbete al Boletín',
        'btn-subscribe': 'SUSCRIBIRSE',
        'testimonials-title': 'Lo que dicen nuestros clientes',
        'testimonial-body': '"MH Estate nos brindó un servicio excepcional. Su equipo fue profesional, paciente y realmente entendió nuestras necesidades. ¡Encontramos la villa perfecta en Nerja gracias a su experiencia!"',
        'testimonial-author': '- Sarah & James Jenkins',
        'cta-title': 'Comencemos tu viaje<br>inmobiliario hoy.',
        'cta-subtitle': 'Contacta con nuestro equipo multilingüe.',
        'btn-contact-us': 'CONTÁCTANOS',

        // --- PÁGINA COMPRAR (BUY) ---
        'buy-meta-title': 'Comprar Propiedad | MH Estate',
        'buy-meta-desc': 'Busca propiedades exclusivas en la Costa del Sol',
        'hero-buy-title': 'En Venta',
        'buy-hero-sub': 'Explora las propiedades a continuación y permítenos complementar tu búsqueda con recomendaciones personalizadas, incluso más allá de lo que hay en la web.',
        'buy-hero-right': 'Comparte tus deseos y te guiaremos hacia el hogar adecuado. Nuestra misión es encontrarte una vivienda que supere tus expectativas.',
        
        // Filtros Buy
        'filter-all': 'DESCUBRIR TODO',
        'filter-nerja': 'NERJA TORROX',
        'filter-marbella': 'FUENGIROLA MARBELLA',
        
        // Listados Buy
        'listings-title': 'Propiedades Disponibles',
        'btn-prev': '← Anterior',
        'btn-next': 'Siguiente →',
        'label-type': 'Tipo de Propiedad',
        'type-apt': 'Apartamento',
        'type-villa': 'Villa/Chalet',
        'type-town': 'Casa Adosada',
        'type-country': 'Finca Rústica',
        'type-plot': 'Parcela',
        'type-garage': 'Garaje',
        'label-area': 'Seleccionar Zona',
        'opt-all': 'Todas las zonas',
        'label-price': 'Precio',
        'label-beds': 'Dormitorios',
        'label-baths': 'Baños',
        'label-keyword': 'Palabra clave',
        'link-new': 'Obra Nueva',
        'link-second': 'Segunda Mano',
        'link-see-all': 'Ver todo',
        'btn-clear': 'LIMPIAR',
        'btn-search': 'BUSCAR',

        // --- PÁGINA VENDER (SELL) ---
        'sell-meta-title': 'Vender mi Casa en Nerja y Marbella | MH ESTATE',
        'sell-meta-desc': 'Vende tu propiedad con expertos. Valoración gratuita, marketing profesional y clientes internacionales.',
        'btn-valuation': 'VALORACIÓN GRATUITA',
        'exp-title': 'Experiencia desde<br>2003',
        'exp-desc': 'En nuestro equipo reunimos una amplia experiencia en el mercado inmobiliario, que se remonta a 2003. A lo largo de los años, hemos guiado a innumerables clientes en transacciones exitosas. Siempre evaluamos cada operación para seguir mejorando, porque su éxito es la base del nuestro.',
        'craft-title': 'Vender una<br>propiedad: un arte<br>de muchos detalles',
        'craft-desc': 'Vender una propiedad es un oficio compuesto de muchos detalles importantes, y nuestro objetivo es dominar cada aspecto. Una venta exitosa nunca es fruto de la casualidad: es el resultado de un proceso cuidadosamente compuesto.',
        'prof-title': 'Nos aseguramos de que cada hogar se presente de la manera más profesional',
        'prof-subtitle': 'Utilizando fotografía de alta calidad, material visual y otras herramientas de presentación efectivas.',
        'prof-desc-1': 'Nuestra base reside en nuestra sólida red, compromiso personal y profundo conocimiento del mercado inmobiliario local.',
        'prof-desc-2': 'Por eso MH Estate es la elección correcta para la venta de su propiedad.',
        'sell-statement': 'La forma en que se presenta su propiedad es uno de los factores más importantes para una venta exitosa. Con herramientas modernas y marketing creativo, nos aseguramos de que su hogar destaque con una presentación completa que capte la atención.',
        'visual-title': 'Visuales que Destacan',
        'visual-desc': 'Trabajamos con fotografía de alta calidad, drones, tomas al atardecer, planos y video para resaltar el carácter único de su propiedad. La luz natural y la atención al detalle garantizan imágenes que inspiran a los compradores.',
        'interactive-title': 'Experiencia interactiva',
        'interactive-desc': 'Nuestros tours 360º y videos permiten a los compradores explorar el hogar en cualquier momento. Pueden moverse virtualmente y construir una conexión emocional antes de visitar.',
        'sell_marketing_title': 'Marketing',
        'sell_marketing_text': 'Conocemos nuestro mercado. Combinamos una sólida presentación con publicidad dirigida en canales seleccionados para maximizar la visibilidad, generar más visitas y mejores resultados.',
        'sell_sold_title': 'SELECCIÓN DE PROPIEDADES VENDIDAS',

        // --- ABOUT PAGE ---
        'about-hero-title': 'Un servicio inmobiliario premium',
        'about-intro-lead': 'MH Estate ofrece un servicio inmobiliario premium, respaldado por una experiencia que se remonta a 2003. Hacemos más que vender casas: ayudamos a nuestros clientes a aprovechar al máximo la vida.',
        'about-us-title': 'Sobre nosotros',
        'about-us-text': 'Impulsados por un compromiso de servicio cinco estrellas, nuestro enfoque es guiarte en cada paso del camino, convirtiendo sueños en realidad y ayudándote a detectar oportunidades. Combinamos experiencia local, alcance internacional y apoyo personalizado para garantizar una experiencia fluida y a medida.',
        'about-team-intro': 'Ya sea que estés comprando, vendiendo o alquilando, nuestro equipo dedicado y multilingüe está aquí para ti durante todo el año, todos los días, en cada paso del proceso. Con MH Estate, tienes un socio siempre listo para hacer que tu viaje inmobiliario sea simple, rewarding e inspirerande.',
        'role-founder': 'Fundadora y Agente Inmobiliaria',
        'role-agent': 'Agente Inmobiliaria',
        'role-manager': 'Gerente de Alquileres',
        'lang-cecilia': 'Sueco, Inglés, Español',
        'lang-rebecca': 'Sueco, Inglés',
        'lang-isidora': 'Inglés, Español',
        'btn-more-info': 'Leer Mas   >',

        // --- BIOGRAFÍA CECILIA ---
        'bio-cecilia-title': 'Cecilia – Aquí para apoyarte en cada paso del camino',
        'bio-cecilia-p1': 'Con más de 20 años de experiencia como agente inmobiliaria, ofrezco una sólida trayectoria que garantiza un viaje inmobiliario seguro para cada cliente. Me cualifiqué como agente inmobiliaria con licencia en Suecia en 2003 y pronto me sentí atraída por España gracias a su clima cálido, su cultura vibrante y su estilo de vida.',
        'bio-cecilia-p2': 'Hoy en día, ayudo tanto a compradores como a vendedores a navegar por el mercado inmobiliario español con confianza y claridad. Hablo sueco, inglés y español, lo que garantiza una comunicación fluida durante todo el proceso.',
        'bio-cecilia-p3': 'Ya sea que estés comprando la casa de tus sueños o vendiendo tu propiedad, mi objetivo es guiarte con cuidado, transparencia y compromiso, desde el primer contacto hasta la finalización exitosa.',

        // --- BIOGRAFÍA REBECCA ---
        'bio-rebecca-title': 'Rebecca - Con gran pasión por ayudar a los clientes',
        'bio-rebecca-p1': 'Vivir en la zona me da una visión valiosa del mercado, el estilo de vida y lo que realmente importa al comprar o vender una casa aquí.',
        'bio-rebecca-p2': 'Me dirijo a cada cliente con energía, compromiso y atención al detalle, esforzándome siempre por ir un paso más allá. Ya sea que estés comprando tu primera vivienda, una propiedad vacacional o vendiendo tu residencia actual, mi objetivo es hacer que el proceso sea fluido, transparente y agradable.',
        'bio-rebecca-p3': 'Para mí, no se trata solo de propiedades, sino de generar confianza, entender tus necesidades y ofrecer resultados en los que puedas confiar.',

        // --- BIOGRAFÍA ISIDORA ---
        'bio-isidora-title': 'Isidora - Gestión de alquileres con cuidado y compromiso',
        'bio-isidora-p1': 'Soy responsable de la gestión de alquileres y me enorgullezco de brindar tanto a propietarios como a huéspedes una experiencia de alquiler fluida, confiable y bien organizada. Con base en España, trabajo estrechamente con los propietarios para maximizar el potencial de alquiler mientras aseguro un servicio de alta calidad en cada estancia.',
        'bio-isidora-p2': 'Gestiono reservas, comunicación con huéspedes, check-ins y la coordinación continua con gran atención al detalle. Mi enfoque siempre está en una comunicación clara.',

        // --- CONTACT PAGE (V15 FIXED) ---
        'contact-title': 'Contáctanos',
        'contact-subtitle': 'Estamos aquí para ayudarte.',
        'lbl-address': 'Dirección',
        'lbl-phone': 'Teléfono',
        'ph-name': 'Nombre',
        'ph-lastname': 'Apellido',
        'ph-email': 'Email',
        'ph-phone': 'Teléfono (Opcional)',
        'ph-message': 'Mensaje',
        'btn-send': 'ENVIAR MENSAJE',

        // --- GUIDE & NEWS (SECCIÓN ACTUALIZADA CON 6 ITEMS) ---
        'meta-title-guide': 'Guías y Noticias | MH ESTATE',
        'meta-title-guides': 'Guías de Compra | MH ESTATE',
        'guide-hero-title': 'Guías y Noticias',
        'guide-hero-desc': 'Queremos que te sientas seguro y respaldado...',
        'guide-page-title': 'Guías',
        'guide-sec-guides': 'Guías',
        'btn-all-guides': 'TODAS LAS GUÍAS',
        
        // GUÍAS 1-3
        'guide-card1-title': 'Resumen Rápido del<br>Proceso de Compra',
        'guide-card1-desc': 'Realizamos una búsqueda exhaustiva en el mercado para encontrar las opciones que mejor se ajusten a sus criterios. A continuación, visitamos juntos las propiedades seleccionadas.',
        'guide-card2-title': 'Tasas y Costes al<br>comprar una propiedad',
        'guide-card2-desc': 'Costes de Compra de Segunda Mano: Aproximadamente 9%<br>(Incluye 7% impuesto de compra y alrededor del 2% para notaría, registro y representación legal).',
        'guide-card3-title': 'Gastos Después de<br>la Compra',
        'guide-card3-desc': 'Los costes asociados con la propiedad pueden variar en cantidad, y es importante conocerlos de antemano. Algunos gastos comunes incluyen los siguientes...',
        
        // GUÍAS 4-6 (NUEVAS - REPLICADAS)
        'guide-card4-title': 'Resumen Rápido del<br>Proceso de Compra',
        'guide-card4-desc': 'Realizamos una búsqueda exhaustiva en el mercado para encontrar las opciones que mejor se ajusten a sus criterios. A continuación, visitamos juntos las propiedades seleccionadas.',
        'guide-card5-title': 'Tasas y Costes al<br>comprar una propiedad',
        'guide-card5-desc': 'Costes de Compra de Segunda Mano: Aproximadamente 9%<br>(Incluye 7% impuesto de compra y alrededor del 2% para notaría, registro y representación legal).',
        'guide-card6-title': 'Gastos Después de<br>la Compra',
        'guide-card6-desc': 'Los costes asociados con la propiedad pueden variar en cantidad, y es importante conocerlos de antemano. Algunos gastos comunes incluyen los siguientes...',
        
        'guide-sec-news': 'Noticias',
        'btn-all-news': 'TODAS LAS NOTICIAS',
        'msg-loading-news': 'Cargando últimas noticias...',

        // --- News
        'meta-title-news': 'Noticias | MH ESTATE',
        'news-page-title': 'Noticias',
        'news-card1-title': 'Resumen Rápido del Proceso de Compra',
        'news-card1-desc': 'Realizamos una búsqueda exhaustiva en el mercado para encontrar las opciones que mejor se ajusten a sus criterios. A continuación, visitamos juntos las propiedades seleccionadas.',
        'news-card2-title': 'Tendencias del Mercado 2024',
        'news-card2-desc': 'Realizamos una búsqueda exhaustiva en el mercado para encontrar las opciones que mejor se ajusten a sus criterios. A continuación, visitamos juntos las propiedades seleccionadas.',
        'news-card3-title': 'Apertura de Nueva Oficina',
        'news-card3-desc': 'Realizamos una búsqueda exhaustiva en el mercado para encontrar las opciones que mejor se ajusten a sus criterios. A continuación, visitamos juntos las propiedades seleccionadas.',
        'news-card4-title': 'Actualización Golden Visa',
        'news-card4-desc': 'Realizamos una búsqueda exhaustiva en el mercado para encontrar las opciones que mejor se ajusten a sus criterios. A continuación, visitamos juntos las propiedades seleccionadas.',
        'meta-title-news': 'Noticias | MH ESTATE',
        'news-page-title': 'Noticias',
        'news-pdf-title': 'Un Resumen Rápido<br>del Proceso de Compra',
        'news-pdf-desc': 'Realizamos una búsqueda exhaustiva en el<br>mercado para encontrar las opciones que<br>mejor se ajusten a sus criterios. A continuación,<br>visitamos juntos las propiedades seleccionadas<br>para una comprensión más profunda.',

        // --- PROPIEDAD DETALLE (NUEVAS PESTAÑAS) ---
        'btn-back': 'Volver',
        
        // Pestañas
        'tab-desc': 'Descripción',
        'tab-facts': 'Datos',
        'tab-map': 'Mapa',
        'tab-plan': 'Plano',
        'tab-tour': 'Tour 3D',
        'tab-360': 'Fotos 360',
        
        // Títulos Internos
        'title-desc': 'Sobre esta propiedad',
        'title-facts': 'Características y Datos',
        'agent-label': 'Agente Responsable',
        'similar-title': 'Propiedades Similares',
        
        // Mensajes
        'no-data': 'Información no disponible.',

        // --- FOOTER ---
        'footer-desc': 'Tu aliado de confianza en el mercado inmobiliario.',
        'footer-links': 'Enlaces Rápidos',
        'footer-contact': 'Información de Contacto',
        'footer-follow': 'Síguenos',
        'footer-rights': '© 2026 MH Estate. Todos los derechos reservados.'
    },

    'en': {
        // --- NAVIGATION ---
        'nav-home': 'HOME',
        'nav-buy': 'BUY',
        'nav-rent': 'RENT',
        'nav-sell': 'SELL',
        'nav-about': 'ABOUT US',
        'nav-news': 'GUIDE/NEWS',
        'nav-contact': 'CONTACT',

        // --- NUEVA ETIQUETA ---
        'label-exclusive': 'EXCLUSIVE',

        // --- SEO ---
        'meta-title': 'Real Estate in Nerja & Marbella | MH ESTATE',
        'meta-desc': 'Exclusive properties for sale in Costa del Sol. Your trusted agents.',

        // --- HOME ---
        'hero-title': 'Exclusive Properties on the Costa del Sol',
        'hero-subtitle': 'Your trusted partner in Real Estate',
        'intro-text': 'Professional guidance, global connections, and a specialist team<br>ensuring a seamless real estate experience.',
        'search-title': 'Property Search',
        'featured-title': 'Featured Properties',
        'about-text': 'Within our team, we bring together extensive experience of the real estate market, dating back to 2003. Over the years, we have guided countless clients through successful transactions. We always evaluate each deal to keep improving.',
        'btn-contact': 'CONTACT US',
        'newsletter-title': 'Subscribe Newsletter',
        'btn-subscribe': 'SUBSCRIBE',
        'testimonials-title': 'What our clients say',
        'testimonial-body': '"MH Estate provided an exceptional service. Their team was professional, patient, and truly understood our needs. We found the perfect villa in Nerja thanks to their expertise!"',
        'testimonial-author': '- Sarah & James Jenkins',
        'cta-title': "Let's start your<br>real estate<br>journey today.",
        'cta-subtitle': 'Contact our multilingual team.',
        'btn-contact-us': 'CONTACT US',

        // --- BUY PAGE ---
        'buy-meta-title': 'Buy Property | MH Estate',
        'buy-meta-desc': 'Browse exclusive properties in Costa del Sol',
        'hero-buy-title': 'For Sale',
        'buy-hero-sub': 'Browse the properties below, and let us complement your search with personalized recommendations, even beyond what’s on the website.',
        'buy-hero-right': 'Share your wishes and we’ll guide you to the right home. Our mission is to match you with a home that exceeds your expectations.',
        
        'filter-all': 'DISCOVER ALL',
        'filter-nerja': 'NERJA TORROX',
        'filter-marbella': 'FUENGIROLA MARBELLA',

        'listings-title': 'Listings',
        'btn-prev': '← Previous',
        'btn-next': 'Next →',
        'label-type': 'Property Type',
        'type-apt': 'Apartment',
        'type-villa': 'Detached House/Villa',
        'type-town': 'Town House',
        'type-country': 'Country house',
        'type-plot': 'Plot',
        'type-garage': 'Garage',
        'label-area': 'Select Area',
        'opt-all': 'All areas',
        'label-price': 'Price',
        'label-beds': 'Bedrooms',
        'label-baths': 'Bathrooms',
        'label-keyword': 'Keyword',
        'link-new': 'New Promotion',
        'link-second': 'Second Hand',
        'link-see-all': 'See all',
        'btn-clear': 'CLEAR ALL',
        'btn-search': 'SEARCH',

        // --- SELL PAGE ---
        'sell-meta-title': 'Sell my Property in Nerja & Marbella | MH ESTATE',
        'sell-meta-desc': 'Sell your property with experts. Free valuation, professional marketing, and international clients.',
        'btn-valuation': 'FREE VALUATION',
        'exp-title': 'Experienced since<br>2003',
        'exp-desc': 'Within our team, we bring together extensive experience of the real estate market, dating back to 2003. Over the years, we have guided countless clients through successful transactions. We always evaluate each deal to keep improving — because your success is the foundation of ours.',
        'craft-title': 'Selling a<br>property – a<br>craft of many<br>details',
        'craft-desc': 'Selling a property is a craft made up of many important details, and we aim to master every aspect of it. A successful sale is never the result of chance – it is the outcome of a carefully composed process.',
        'prof-title': 'We make sure that every home is presented in the most professional way',
        'prof-subtitle': 'Using high-quality photography, visual material, and other effective presentation tools.',
        'prof-desc-1': 'Our foundation lies in our strong network, personal commitment, and deep knowledge of the local housing market.',
        'prof-desc-2': 'That\'s why MH Estate is the right choice for your property sale.',
        'sell-statement': 'The way your property is presented is one of the most important factors for a successful sale. With modern tools and creative marketing, we make sure your home stands out - not only with beautiful images but with a complete presentation that captures attention and creates desire.',
        'visual-title': 'Visual That Stand Out',
        'visual-desc': 'We work with high-quality photography, drone images, twilight shots, floorplans and video to highlight your property’s unique character. Natural light, strong composition, and attention to detail ensure pictures that inspire buyers - turning passive interest into real engagement.',
        'interactive-title': 'Interactive experience',
        'interactive-desc': 'Our 360º tours and property videos allow buyers to explore the home anytime, anywhere. They can move through the rooms virtually, get a true sense of space, and build an emotional connection before they step inside.',
        'sell_marketing_title': 'Marketing',
        'sell_marketing_text': 'We know our market and ensure your property reaches the right buyers. We combine strong property presentation with targeted advertising. Through carefully selected channels and precise targeting, we maximize visibility and generate more qualified interest, more viewings, and better results.',
        'sell_sold_title': 'SELECTION OF SOLD PROPERTIES',

        // --- ABOUT PAGE ---
        'about-hero-title': 'A premium real estate service',
        'about-intro-lead': 'MH Estate offers a premium real estate service, backed by experience dating back to 2003. We do more than just sell homes — we help our clients make the most of life.',
        'about-us-title': 'About us',
        'about-us-text': 'Driven by a commitment to five-star service, our approach is to guide you every step of the way, turning dreams into reality while helping you spot opportunities as they arise. We combine local expertise, international reach, and personalized support to ensure a seamless and tailored experience.',
        'about-team-intro': 'Whether you are buying, selling, or renting, our dedicated and multilingual team is here for you throughout the year, every day, every step of the process. With MH Estate, you have a partner who is always ready to make your property journey simple, rewarding, and inspiring.',
        'role-founder': 'Founder & Real Estate Agent',
        'role-agent': 'Real Estate Agent',
        'role-manager': 'Rental Manager',
        'lang-cecilia': 'Swedish, English, Spanish',
        'lang-rebecca': 'Swedish, English',
        'lang-isidora': 'English, Spanish',
        'btn-more-info': 'Read More   >',

        // --- BIOGRAFÍA CECILIA ---
        'bio-cecilia-title': 'Cecilia – Here to Support You Every Step of the Way',
        'bio-cecilia-p1': 'With over 20 years of experience as a real estate agent, I provide a solid background that ensures a safe and secure property journey for every client. I qualified as a licensed real estate agent in Sweden in 2003 and was soon drawn to Spain by its warm climate, vibrant culture, and lifestyle.',
        'bio-cecilia-p2': 'Today, I help both buyers and sellers navigate the Spanish property market with confidence and clarity. I speak Swedish, English, and Spanish, ensuring smooth communication throughout the entire process.',
        'bio-cecilia-p3': 'Whether you are buying your dream home or selling your property, my goal is to guide you with care, transparency, and commitment — from first contact to successful completion.',

        // --- BIOGRAFÍA REBECCA ---
        'bio-rebecca-title': 'Rebecca - With a Strong Passion for Helping Clients',
        'bio-rebecca-p1': 'Living locally gives me valuable insight into the market, the lifestyle, and what truly matters when buying or selling a home here.',
        'bio-rebecca-p2': 'I approach every client with energy, commitment, and attention to detail, always striving to go the extra mile. Whether you are buying your first home, a holiday property, or selling your current residence, my goal is to make the process smooth, transparent, and enjoyable.',
        'bio-rebecca-p3': 'For me, it’s not just about property — it’s about building trust, understanding your needs, and delivering results you can feel confident about.',

        // --- BIOGRAFÍA ISIDORA ---
        'bio-isidora-title': 'Isidora - Rental Management with Care and Commitment',
        'bio-isidora-p1': 'I am responsible for rental management and take pride in providing both homeowners and guests with a smooth, reliable, and well-organised rental experience. Based in Spain, I work closely with property owners to maximise rental potential while ensuring high-quality service for every stay.',
        'bio-isidora-p2': 'I manage bookings, guest communication, check-ins, and ongoing coordination with great attention to detail. My focus is always on clear communication.',

        // --- CONTACT PAGE (V15 FIXED) ---
        'contact-title': 'Contact Us',
        'contact-subtitle': 'We are here to help you.',
        'lbl-address': 'Address',
        'lbl-phone': 'Phone',
        'ph-name': 'Name',
        'ph-lastname': 'Last Name',
        'ph-email': 'Email',
        'ph-phone': 'Phone (Optional)',
        'ph-message': 'Message',
        'btn-send': 'SEND MESSAGE',

        // --- GUIDE & NEWS (UPDATED 6 ITEMS) ---
        'meta-title-guide': 'Guides & News | MH ESTATE',
        'meta-title-guides': 'Buying Guides | MH ESTATE',
        'guide-hero-title': 'Guides & News',
        'guide-hero-desc': 'We want you to feel confident and supported...',
        'guide-page-title': 'Guides',
        'guide-sec-guides': 'Guides',
        'btn-all-guides': 'ALL GUIDES',
        
        // GUIDES 1-3
        'guide-card1-title': 'A Quick Overview<br>of the Buying Process',
        'guide-card1-desc': 'We conduct a thorough market search to find the options that best match your criteria. Next, we visit the selected properties together to provide you with a deeper understanding of each home.',
        'guide-card2-title': 'Fees and Costs when<br>buying a property',
        'guide-card2-desc': 'Second-Hand Purchase Costs: Approximately 9%<br>(Includes 7% purchase tax and around 2% for notary fees, property registry registration, and legal representation.)',
        'guide-card3-title': 'Expenses After the<br>Purchase',
        'guide-card3-desc': 'The costs associated with the property can vary in amount, and it’s important to be aware of these costs in advance. Some common expenses include the following...',

        // GUIDES 4-6 (NEW - REPLICATED)
        'guide-card4-title': 'A Quick Overview<br>of the Buying Process',
        'guide-card4-desc': 'We conduct a thorough market search to find the options that best match your criteria. Next, we visit the selected properties together to provide you with a deeper understanding of each home.',
        'guide-card5-title': 'Fees and Costs when<br>buying a property',
        'guide-card5-desc': 'Second-Hand Purchase Costs: Approximately 9%<br>(Includes 7% purchase tax and around 2% for notary fees, property registry registration, and legal representation.)',
        'guide-card6-title': 'Expenses After the<br>Purchase',
        'guide-card6-desc': 'The costs associated with the property can vary in amount, and it’s important to be aware of these costs in advance. Some common expenses include the following...',
        
        'guide-sec-news': 'News',
        'btn-all-news': 'ALL NEWS',
        'msg-loading-news': 'Loading latest news...',

        // --- News
        'meta-title-news': 'News | MH ESTATE',
        'news-page-title': 'News',
        'news-card1-title': 'A Quick Overview of the Buying Process',
        'news-card1-desc': 'We conduct a thorough market search to find the options that best match your criteria. Next, we visit the selected properties together to provide you with a deeper understanding of each home.',
        'news-card2-title': 'Market Trends 2024',
        'news-card2-desc': 'We conduct a thorough market search to find the options that best match your criteria. Next, we visit the selected properties together to provide you with a deeper understanding of each home.',
        'news-card3-title': 'New Office Opening',
        'news-card3-desc': 'We conduct a thorough market search to find the options that best match your criteria. Next, we visit the selected properties together to provide you with a deeper understanding of each home.',
        'news-card4-title': 'Golden Visa Updates',
        'news-card4-desc': 'We conduct a thorough market search to find the options that best match your criteria. Next, we visit the selected properties together to provide you with a deeper understanding of each home.',
        'meta-title-news': 'News | MH ESTATE',
        'news-page-title': 'News',
        'news-pdf-title': 'A Quick Overview<br>of the Buying Process',
        'news-pdf-desc': 'We conduct a thorough market search to<br>find the options that best match your<br>criteria. Next, we visit the selected<br>properties together to provide you with a<br>deeper understanding of each home.',

        // --- PROPERTY DETAIL (UPDATED) ---
        'btn-back': 'Back',
        
        // Tabs
        'tab-desc': 'Description',
        'tab-facts': 'Facts',
        'tab-map': 'Map',
        'tab-plan': 'Floor Plan',
        'tab-tour': '3D Tour',
        'tab-360': '360 Photos',
        
        // Inner Titles
        'title-desc': 'About this property',
        'title-facts': 'Features & Facts',
        'agent-label': 'Listing Agent',
        'similar-title': 'Similar Properties',

        // Messages
        'no-data': 'Information not available.',
        'details-title': 'Features & Details',

        // --- FOOTER ---
        'footer-desc': 'Your trusted partner in Real Estate.',
        'footer-links': 'Quick Links',
        'footer-contact': 'Contact Info',
        'footer-follow': 'Follow Us',
        'footer-rights': '© 2026 MH Estate. All rights reserved.'
    },

    'sv': {
        // --- NAVIGATION ---
        'nav-home': 'HEM',
        'nav-buy': 'KÖPA',
        'nav-rent': 'HYRA',
        'nav-sell': 'SÄLJA',
        'nav-about': 'OM OSS',
        'nav-news': 'GUIDER/NYHETER',
        'nav-contact': 'KONTAKT',

        // --- NUEVA ETIQUETA ---
        'label-exclusive': 'EXKLUSIV',

        // --- SEO ---
        'meta-title': 'Svensk Mäklare i Nerja & Marbella | MH ESTATE',
        'meta-desc': 'Exklusiva bostäder på Costa del Sol. Vi hjälper dig att köpa och sälja.',

        // --- HOME ---
        'hero-title': 'Exklusiva Bostäder på Costa del Sol',
        'hero-subtitle': 'Din pålitliga partner på fastighetsmarknad',
        'intro-text': 'Professionell vägledning, globala kontakter och ett specialistteam<br>som garanterar en smidig fastighetsaffär.',
        'search-title': 'Sök Bostad',
        'featured-title': 'Utvalda Bostäder',
        'about-text': 'I vårt team samlar vi omfattande erfarenhet av fastighetsmarknaden, som sträcker sig tillbaka till 2003. Genom åren har vi väglett otaliga kunder genom framgångsrika transaktioner.',
        'btn-contact': 'KONTAKTA OSS',
        'newsletter-title': 'Prenumerera på Nyhetsbrev',
        'btn-subscribe': 'PRENUMERERA',
        'testimonials-title': 'Vad våra kunder säger',
        'testimonial-body': '"MH Estate gav en exceptionell service. Deras team var professionellt, tålmodigt och förstod verkligen våra behov. Vi hittade den perfekta villan i Nerja tack vare deras expertis!"',
        'testimonial-author': '- Sarah & James Jenkins',
        'cta-title': 'Låt oss börja din<br>bostadsresa idag.',
        'cta-subtitle': 'Kontakta vårt flerspråkiga team.',
        'btn-contact-us': 'KONTAKTA OSS',

        // --- BUY PAGE ---
        'buy-meta-title': 'Köpa Fastighet | MH Estate',
        'buy-meta-desc': 'Sök exklusiva fastigheter på Costa del Sol',
        'hero-buy-title': 'Till Salu',
        'buy-hero-sub': 'Bläddra bland bostäderna nedan och låt oss komplettera din sökning med personliga rekommendationer, även utöver vad som finns på webbplatsen.',
        'buy-hero-right': 'Dela dina önskemål så guidar vi dig rätt. Vårt uppdrag är att hitta ett hem som överträffar dina förväntningar.',
        
        'filter-all': 'UPPTÄCK ALLT',
        'filter-nerja': 'NERJA TORROX',
        'filter-marbella': 'FUENGIROLA MARBELLA',

        'listings-title': 'Tillgängliga Bostäder',
        'btn-prev': '← Föregående',
        'btn-next': 'Nästa →',
        'label-type': 'Bostadstyp',
        'type-apt': 'Lägenhet',
        'type-villa': 'Villa',
        'type-town': 'Radhus',
        'type-country': 'Lantgård',
        'type-plot': 'Tomt',
        'type-garage': 'Garage',
        'label-area': 'Välj Område',
        'opt-all': 'Alla områden',
        'label-price': 'Pris',
        'label-beds': 'Sovrum',
        'label-baths': 'Badrum',
        'label-keyword': 'Nyckelord',
        'link-new': 'Nyproduktion',
        'link-second': 'Begagnat',
        'link-see-all': 'Se alla',
        'btn-clear': 'RENSA',
        'btn-search': 'SÖK',

        // --- SELL PAGE ---
        'sell-meta-title': 'Sälja min Bostad i Nerja & Marbella | MH ESTATE',
        'sell-meta-desc': 'Sälj din bostad med experter. Gratis värdering, professionell marknadsföring och internationella kunder.',
        'btn-valuation': 'KOSTNADSFRI VÄRDERING',
        'exp-title': 'Erfarenhet sedan<br>2003',
        'exp-desc': 'I vårt team samlar vi omfattande erfarenhet av fastighetsmarknaden, som sträcker sig tillbaka till 2003. Genom åren har vi väglett otaliga kunder genom framgångsrika transaktioner. Vi utvärderar alltid varje affär för att ständigt förbättras — eftersom din framgång är grunden för vår.',
        'craft-title': 'Att sälja en<br>bostad – ett<br>hantverk av<br>många detaljer',
        'craft-desc': 'Att sälja en bostad är ett hantverk som består av många viktiga detaljer, och vi strävar efter att bemästra varje aspekt av det. En lyckad försäljning är aldrig resultatet av slumpen – det är resultatet av en omsorgsfullt sammansatt process.',
        'prof-title': 'Vi ser till att varje hem presenteras på det mest professionella sättet',
        'prof-subtitle': 'Med hjälp av högkvalitativ fotografering, visuellt material och andra effektiva presentationsverktyg.',
        'prof-desc-1': 'Vår grund ligger i vårt starka nätverk, personliga engagemang och djupa kunskap om den lokala bostadsmarknaden.',
        'prof-desc-2': 'Därför är MH Estate rätt val för din bostadsförsäljning.',
        'sell-statement': 'Sättet din bostad presenteras på är en av de viktigaste faktorerna för en lyckad försäljning. Med moderna verktyg och kreativ marknadsföring ser vi till att ditt hem sticker ut – inte bara med vackra bilder utan med en komplett presentation som fångar uppmärksamhet och skapar begär.',
        'visual-title': 'Visuellt som Sticker Ut',
        'visual-desc': 'Vi arbetar med högkvalitativ fotografering, drönarbilder, kvällsbilder, planlösningar och video för att lyfta fram din bostads unika karaktär. Naturligt ljus, stark komposition och känsla för detaljer garanterar bilder som inspirerar köpare – och förvandlar passivt intresse till verkligt engagemang.',
        'interactive-title': 'Interaktiv upplevelse',
        'interactive-desc': 'Våra 360º-turer och bostadsvideor låter köpare utforska hemmet när som helst, var som helst. De kan röra sig genom rummen virtuellt, få en sann känsla av rymd och bygga en känslomässig koppling innan de ens kliver innanför dörren.',
        'sell_marketing_title': 'Marknadsföring',
        'sell_marketing_text': 'Vi kan vår marknad och ser till att din bostad når rätt köpare. Vi kombinerar stark bostadspresentation med riktad annonsering. Genom noggrant utvalda kanaler och exakt målgruppsanpassning maximerar vi synligheten och genererar mer kvalificerat intresse, fler visningar och bättre resultat.',
        'sell_sold_title': 'URVAL AV SÅLDA BOSTÄDER',

        // --- ABOUT PAGE ---
        'about-hero-title': 'En förstklassig fastighetstjänst',
        'about-intro-lead': 'MH Estate erbjuder en förstklassig fastighetstjänst, uppbackad av erfarenhet som sträcker sig tillbaka till 2003. Vi gör mer än att bara sälja bostäder – vi hjälper våra kunder att få ut det mesta av livet.',
        'about-us-title': 'Om oss',
        'about-us-text': 'Drivna av ett engagemang för femstjärnig service är vårt tillvägagångssätt att vägleda dig varje steg på vägen, förvandla drömmar till verklighet samtidigt som vi hjälper dig att upptäcka möjligheter när de dyker upp. Vi kombinerar lokal expertis, internationell räckvidd och personligt stöd för att säkerställa en smidig och skräddarsydd upplevelse.',
        'about-team-intro': 'Oavsett om du köper, säljer eller hyr ut, finns vårt dedikerade och flerspråkiga team här för dig året runt, varje dag, i varje steg av processen. Med MH Estate har du en partner som alltid är redo att göra din bostadsresa enkel, givande och inspirerande.',
        'role-founder': 'Grundare & Fastighetsmäklare',
        'role-agent': 'Fastighetsmäklare',
        'role-manager': 'Uthyrningsansvarig',
        'lang-cecilia': 'Svenska, Engelska, Spanska',
        'lang-rebecca': 'Svenska, Engelska',
        'lang-isidora': 'Engelska, Spanska',
        'btn-more-info': 'Läs mer   >',

        // --- BIOGRAFÍA CECILIA ---
        'bio-cecilia-title': 'Cecilia – Här för att stötta dig varje steg på vägen',
        'bio-cecilia-p1': 'Med över 20 års erfarenhet som fastighetsmäklare erbjuder jag en solid bakgrund som garanterar en trygg och säker bostadsresa för varje kund. Jag kvalificerade mig som registrerad fastighetsmäklare i Sverige 2003 och drogs snart till Spanien av dess varma klimat, levande kultur och livsstil.',
        'bio-cecilia-p2': 'Idag hjälper jag både köpare och säljare att navigera på den spanska fastighetsmarknaden med självförtroende och tydlighet. Jag talar svenska, engelska och spanska, vilket garanterar smidig kommunikation genom hela processen.',
        'bio-cecilia-p3': 'Oavsett om du köper ditt drömhem eller säljer din bostad är mitt mål att vägleda dig med omsorg, transparens och engagemang — från första kontakt till framgångsrikt avslut.',

        // --- BIOGRAFÍA REBECCA ---
        'bio-rebecca-title': 'Rebecca - Med en stark passion för att hjälpa kunder',
        'bio-rebecca-p1': 'Att bo lokalt ger mig värdefull insikt i marknaden, livsstilen och vad som verkligen betyder något när man köper eller säljer ett hem här.',
        'bio-rebecca-p2': 'Jag bemöter varje kund med energi, engagemang och känsla för detaljer, och strävar alltid efter att göra det lilla extra. Oavsett om du köper din första bostad, en semesterbostad eller säljer din nuvarande bostad, är mitt mål att göra processen smidig, transparent och trevlig.',
        'bio-rebecca-p3': 'För mig handlar det inte bara om fastigheter – det handlar om att bygga förtroende, förstå dina behov och leverera resultat du kan känna dig trygg med.',

        // --- BIOGRAFÍA ISIDORA ---
        'bio-isidora-title': 'Isidora - Uthyrningshantering med omsorg och engagemang',
        'bio-isidora-p1': 'Jag ansvarar för uthyrningshanteringen och är stolt över att ge både husägare och gäster en smidig, pålitlig och välorganiserad uthyrningsupplevelse. Baserad i Spanien arbetar jag nära fastighetsägare för att maximera uthyrningspotentialen samtidigt som jag säkerställer hög kvalitet vid varje vistelse.',
        'bio-isidora-p2': 'Jag hanterar bokningar, gästkommunikation, incheckningar och löpande samordning med stor uppmärksamhet på detaljer. Mitt fokus ligger alltid på tydlig kommunikation.',

        // --- CONTACT PAGE (V15 FIXED) ---
        'contact-title': 'Kontakta Oss',
        'contact-subtitle': 'Vi finns här för att hjälpa dig.',
        'lbl-address': 'Adress',
        'lbl-phone': 'Telefon',
        'ph-name': 'Namn',
        'ph-lastname': 'Efternamn',
        'ph-email': 'E-post',
        'ph-phone': 'Telefon (Valfritt)',
        'ph-message': 'Meddelande',
        'btn-send': 'SKICKA MEDDELANDE',

        // --- GUIDE & NEWS (UPPDATERAD 6 ITEMS) ---
        'meta-title-guide': 'Guider & Nyheter | MH ESTATE',
        'meta-title-guides': 'Köpguider | MH ESTATE',
        'guide-hero-title': 'Guider & Nyheter',
        'guide-hero-desc': 'Vi vill att du ska känna dig trygg och stöttad...',
        'guide-page-title': 'Guider',
        'guide-sec-guides': 'Guider',
        'btn-all-guides': 'ALLA GUIDER',
        
        // GUIDER 1-3
        'guide-card1-title': 'En Snabb Överblick<br>of Köpprocessen',
        'guide-card1-desc': 'Vi genomför en grundlig marknadssökning för att hitta de alternativ som bäst matchar dina kriterier. Därefter besöker vi de utvalda fastigheterna tillsammans för att ge dig en djupare förståelse för varje hem.',
        'guide-card2-title': 'Avgifter och Kostnader<br>vid köp av fastighet',
        'guide-card2-desc': 'Kostnader vid köp av begagnat: Cirka 9%<br>(Inkluderar 7% överföringsskatt och cirka 2% för notarie, fastighetsregister och juridisk representation).',
        'guide-card3-title': 'Utgifter Efter<br>Köpet',
        'guide-card3-desc': 'Kostnaderna förknippade med fastigheten kan variera, och det är viktigt att vara medveten om dessa i förväg. Några vanliga utgifter inkluderar följande...',

        // GUIDER 4-6 (NYA - REPLIKERADE)
        'guide-card4-title': 'En Snabb Överblick<br>of Köpprocessen',
        'guide-card4-desc': 'Vi genomför en grundlig marknadssökning för att hitta de alternativ som bäst matchar dina kriterier. Därefter besöker vi de utvalda fastigheterna tillsammans för att ge dig en djupare förståelse för varje hem.',
        'guide-card5-title': 'Avgifter och Kostnader<br>vid köp av fastighet',
        'guide-card5-desc': 'Kostnader vid köp av begagnat: Cirka 9%<br>(Inkluderar 7% överföringsskatt och cirka 2% för notarie, fastighetsregister och juridisk representation).',
        'guide-card6-title': 'Utgifter Efter<br>Köpet',
        'guide-card6-desc': 'Kostnaderna förknippade med fastigheten kan variera, och det är viktigt att vara medveten om dessa i förväg. Några vanliga utgifter inkluderar följande...',
        
        'guide-sec-news': 'Nyheter',
        'btn-all-news': 'ALLA NYHETER',
        'msg-loading-news': 'Laddar senaste nyheter...',

        // --- News
        'meta-title-news': 'Nyheter | MH ESTATE',
        'news-page-title': 'Nyheter',
        'news-card1-title': 'En Snabb Överblick av Köpprocessen',
        'news-card1-desc': 'Vi genomför en grundlig marknadssökning för att hitta de alternativ som bäst matchar dina kriterier. Därefter besöker vi de utvalda fastigheterna tillsammans.',
        'news-card2-title': 'Marknadstrender 2024',
        'news-card2-desc': 'Vi genomför en grundlig marknadssökning för att hitta de alternativ som bäst matchar dina kriterier. Därefter besöker vi de utvalda fastigheterna tillsammans.',
        'news-card3-title': 'Nytt Kontor Öppnar',
        'news-card3-desc': 'Vi genomför en grundlig marknadssökning för att hitta de alternativ som bäst matchar dina kriterier. Därefter besöker vi de utvalda fastigheterna tillsammans.',
        'news-card4-title': 'Uppdatering Golden Visa',
        'news-card4-desc': 'Vi genomför en grundlig marknadssökning för att hitta de alternativ som bäst matchar dina kriterier. Därefter besöker vi de utvalda fastigheterna tillsammans.',
        'meta-title-news': 'Nyheter | MH ESTATE',
        'news-page-title': 'Nyheter',
        'news-pdf-title': 'En Snabb Överblick<br>av Köpprocessen',
        'news-pdf-desc': 'Vi genomför en grundlig marknadssökning<br>för att hitta de alternativ som bäst<br>matchar dina kriterier. Därefter besöker<br>vi de utvalda fastigheterna tillsammans<br>för att ge dig en djupare förståelse.',

        // --- PROPIEDAD DETALLE (UPPDATERAD) ---
        'btn-back': 'Tillbaka',
        
        // Flikar
        'tab-desc': 'Beskrivning',
        'tab-facts': 'Fakta',
        'tab-map': 'Karta',
        'tab-plan': 'Planlösning',
        'tab-tour': '3D-tur',
        'tab-360': '360-bilder',
        
        // Titlar
        'title-desc': 'Om denna bostad',
        'title-facts': 'Funktioner och fakta',
        'agent-label': 'Ansvarig Mäklare',
        'similar-title': 'Liknande bostäder',

        // Meddelanden
        'no-data': 'Information ej tillgänglig.',
        'details-title': 'Egenskaper och detaljer',

        // --- FOOTER ---
        'footer-desc': 'Din pålitliga partner på fastighetsmarknad',
        'footer-links': 'Snabblänkar',
        'footer-contact': 'Kontaktinfo',
        'footer-follow': 'Följ oss',
        'footer-rights': '© 2026 MH Estate. Alla rättigheter förbehållna.'
    }
};

class LanguageManager {
    constructor() {
        this.currentLang = localStorage.getItem('preferredLang') || 'es';
        this.init();
    }

    init() {
        this.setLanguage(this.currentLang, false);
        window.setLanguage = (lang) => this.setLanguage(lang, true);
    }

    setLanguage(lang, triggerEvent = true) {
        if (!translations[lang]) {
            console.warn(`Idioma '${lang}' no encontrado, usando 'es'`);
            lang = 'es';
        }

        this.currentLang = lang;
        localStorage.setItem('preferredLang', lang);
        document.documentElement.lang = lang;

        this.translatePage();

        if (triggerEvent) {
            document.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
        }
    }

    translatePage() {
        const elements = document.querySelectorAll('[data-i18n]');
        
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = translations[this.currentLang][key];

            if (translation) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = translation;
                } else if (element.tagName === 'META') {
                    element.setAttribute('content', translation);
                } else if (translation.includes('<')) {
                    element.innerHTML = translation;
                } else {
                    element.textContent = translation;
                }
            }
        });
        
        const pageTitleKey = document.body.getAttribute('data-title-key');
        if (pageTitleKey && translations[this.currentLang][pageTitleKey]) {
            document.title = translations[this.currentLang][pageTitleKey];
        }
    }
}

const langManager = new LanguageManager();
window.langManager = langManager; // Acceso global explícito