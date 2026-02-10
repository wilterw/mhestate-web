/* =========================================
   ASSETS/JS/I18N.JS - GESTOR DE IDIOMAS V5.3 (NEWS ARTICLE UPDATE)
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
        'about-us-text': 'Impulsados por un compromiso de servicio cinco estrellas, nuestro enfoque es guiarte en cada paso del camino, convirtiendo sueños en realidad y ayudándote a detectar oportunidades a medida que surgen. Combinamos experiencia local, alcance internacional y apoyo personalizado para garantizar una experiencia fluida y a medida.',
        'about-team-intro': 'Ya sea que estés comprando, vendiendo o alquilando, nuestro equipo dedicado y multilingüe está aquí para ti durante todo el año, todos los días, en cada paso del proceso. Con MH Estate, tienes un socio siempre listo para hacer que tu viaje inmobiliario sea simple, gratificante e inspirador.',
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
        "guide-card2-title": "Tasas y Costes al<br>comprar una propiedad",
        "guide-card2-desc": "Los costes asociados a la propiedad pueden variar en cantidad, y es importante conocer estos costes de antemano....",
        "guide-card3-title": "Servicios para tu<br>Tranquilidad",
        "guide-card3-desc": "Tenemos los contactos que necesitas y hacemos que la transacción de tu propiedad sea lo más fluida posible...",
        
        // GUÍAS 4-6
        'guide-card4-title': 'Resumen Rápido del<br>Proceso de Compra',
        'guide-card4-desc': 'Realizamos una búsqueda exhaustiva en el mercado para encontrar las opciones que mejor se ajusten a sus criterios. A continuación, visitamos juntos las propiedades seleccionadas.',
        'guide-card5-title': 'Tasas y Costes al<br>comprar una propiedad',
        'guide-card5-desc': 'Costes de Compra de Segunda Mano: Aproximadamente 9%<br>(Incluye 7% impuesto de compra y alrededor del 2% para notaría, registro y representación legal).',
        'guide-card6-title': 'Gastos Después de<br>la Compra',
        'guide-card6-desc': 'Los costes asociados con la propiedad pueden variar en cantidad, y es importante conocerlos de antemano. Algunos gastos comunes incluyen los siguientes...',
        "news-king-title": "España – ¡El País Donde Puedes Comer y Beber Como un Rey!",
        "news-king-desc": "Se confirma una vez más: España sigue reinando como uno de los países con mayor densidad de bares y restaurantes del mundo...",
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
        'news-pdf-title': 'Un Resumen Rápido<br>del Proceso de Compra',
        'news-pdf-desc': 'Realizamos una búsqueda exhaustiva en el<br>mercado para encontrar las opciones que<br>mejor se ajusten a sus criterios. A continuación,<br>visitamos juntos las propiedades seleccionadas<br>para una comprensión más profunda.',

        // --- NUEVO ARTÍCULO ESPAÑA ---
        'news-spain-title': 'España – ¡El país donde puedes<br>comer y beber como un rey!',
        'news-spain-p1': 'Se ha confirmado una vez más: España sigue reinando como uno de los países con mayor densidad de bares y restaurantes del mundo. Los españoles simplemente parecen haber descifrado el código de la calidad de vida: buena comida, buena compañía y una copa en la mano.',
        'news-spain-p2': 'Incluso después de la pandemia y varios años difíciles para la industria de la restauración, las cifras son impresionantes. Hoy en día, hay más de 300.000 establecimientos de comida y bebida en España, incluyendo bares, restaurantes, cafeterías y bares de tapas.',
        'news-spain-p3': 'En otras palabras: en España es mucho más fácil encontrar un bar que una plaza de aparcamiento, y a veces incluso más fácil que encontrar un cajero automático.',
        'news-spain-p4': 'Aquí encontramos creadores culinarios que evocan clásicos como la paella, el gazpacho, los churros y, por supuesto, las todopoderosas tapas en sus cocinas, un concepto que en sí mismo es prueba del amor de España por comer en sociedad. La cultura gastronómica española no se trata solo de lo que hay en el plato, sino de la comunidad, el ritmo y el disfrute.',
        'news-spain-p5': '¿Y qué sería de una fiesta sin bebidas? España afirma haber dado al mundo la sangría, y los amantes del vino saben que es un paraíso. Desde Rioja y Ribera del Duero hasta Priorat, Rías Baixas y Jerez, España alberga algunas de las regiones vinícolas más preciadas del mundo.',
        'news-spain-p6': 'Así que si alguna vez estás pensando en mudarte a España o comprar una casa de vacaciones, recuerda que no solo estás invirtiendo en sol, playas y cultura. También estás invirtiendo en algo igual de importante:',
        'news-spain-list1': '👉 Un bar local donde te reconozcan.',
        'news-spain-list2': '👉 Un restaurante a la vuelta de la esquina que se convertirá en tu segunda sala de estar.',
        'news-spain-p7': 'Así que reserva tu billete, ven con la mente abierta y un apetito aún más amplio. Bienvenido a España, donde cada comida es una celebración y cada copa es un brindis por la vida.',
        'news-spain-toast': '¡Salud! 🍷',
        'read-more': 'Leer Más',

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

        // --- RENT (NUEVO) ---
        "nav-rent-view": "VER ALQUILERES",
        "nav-rent-list": "ALQUILAR MI PROPIEDAD",

        // --- RENT HOME PAGE (NUEVO CONTENIDO) ---
        "rh-hero-title": "Maximiza tus ingresos por alquiler<br>con una gestión sin complicaciones",
        "rh-intro-text": "En MH Estate, ofrecemos a los propietarios un servicio de alquiler premium<br>diseñado para maximizar reservas e ingresos mientras brindamos<br>un soporte excepcional a propietarios e inquilinos.",
        
        // ACTUALIZADO PARA NUEVO DISEÑO
        "rh-marketing-title": "Marketing Global",
        "rh-marketing-body": "Mostramos su propiedad en las mejores plataformas de alquiler,<br>incluyendo Airbnb y Booking.com, así como en<br>redes sociales y en nuestra oficina, asegurando máxima<br>visibilidad y alcance a huéspedes de todo el mundo.",
        
        "rh-management-title": "Gestión<br>Integral",
        "rh-management-intro": "Nuestros servicios todo incluido cubren cada aspecto de la gestión de alquileres:",
        
        "rh-list-1": "Marketing profesional y optimización de anuncios",
        "rh-list-2": "Gestión de reservas y pagos seguros de inquilinos",
        "rh-list-3": "Registro de la propiedad y huéspedes en la Guardia Civil",
        "rh-list-4": "Check-in y check-out, manejo de llaves, coordinación de limpieza e inspecciones",
        "rh-list-5": "Mantenimiento básico, como cambio de bombillas (materiales a precio de coste)",
        "rh-list-6": "Gestión y sincronización de calendarios",
        "rh-list-7": "Atención dedicada al inquilino para una experiencia fluida",
        "rh-list-8": "Asistencia con licencias turísticas (disponible con coste adicional)",
        
        "rh-support-title": "Soporte<br>Dedicado",
        "rh-support-body": "Nuestro equipo está siempre disponible para responder tus preguntas y brindar un servicio de primer nivel tanto a ti como a tus huéspedes, asegurando una experiencia de alquiler tranquila y sin estrés de principio a fin.",

        // --- News-Buying-Process
        "bp-title": "Resumen del Proceso de Compra",
        "bp-meta": "30 Oct 2025 por Cecilia Andersson",
        "bp-h2-viewing": "Visitas",
        "bp-p-viewing": "Realizamos una búsqueda exhaustiva en el mercado para encontrar las opciones que mejor se ajusten a tus criterios. Luego, visitamos juntos las propiedades seleccionadas para brindarte un conocimiento más profundo de cada vivienda. Por supuesto, siempre estamos disponibles para responder tus preguntas y seremos quienes comuniquen tu oferta al vendedor o su representante para la propiedad que desees comprar.",
        "bp-h2-negotiation": "Negociación",
        "bp-p-negotiation": "Nos encargamos de la negociación. La transacción se finaliza una vez que el vendedor acepta una oferta. Si bien el mercado de segunda mano ocasionalmente permite ajustes de precio, las propiedades de obra nueva generalmente se venden a precios fijos.",
        "bp-h2-reservation": "Contrato de Reserva",
        "bp-p-reservation": "Una vez aceptada la oferta, se redacta un contrato de reserva y se paga una tarifa de reserva. Esta tarifa suele oscilar entre 3.000 € y 6.000 €, aunque a veces puede ser mayor. Durante el período de reserva, tienes la oportunidad de contratar representación legal, y estaremos encantados de ayudarte a encontrar un abogado especializado en transacciones inmobiliarias.",
        "bp-h2-sales": "Contrato de Compraventa",
        "bp-p-sales": "Una vez que el abogado ha verificado que la documentación de la propiedad está en orden, se redacta el contrato de compraventa. En este punto, pagarás el 10% del precio de compra, menos la tarifa de reserva pagada previamente. Tras este pago, el trato queda formalmente 'cerrado'. Para nuevas promociones, normalmente se requiere un porcentaje mayor, y se suelen realizar pagos adicionales durante el proceso de construcción. El promotor también debe proporcionar un aval bancario o equivalente al firmar el contrato para asegurar tus fondos en caso de cualquier problema.",
        "bp-h2-deed": "Escritura",
        "bp-p-deed": "En el momento del cierre, se paga el importe restante de la compra. Los fondos deben estar disponibles en la cuenta del abogado con antelación para que la transacción pueda completarse ante notario el mismo día. El notario asegura que la transacción se registre y la propiedad se transfiera a tu nombre, dándote acceso a tu nuevo hogar.",
        "bp-role": "Fundadora y Agente Inmobiliaria",

        // --- Feed and Cost
        "fc-tab-title": "Tasas y Costes al comprar una propiedad | MH ESTATE",
        "fc-title": "Tasas y Costes al<br>comprar una propiedad",
        "fc-meta": "30 Oct 2025 por Cecilia Andersson",
        "fc-h2-secondhand": "Segunda Mano",
        "fc-p-secondhand": "<strong>Costes de Compra: Aproximadamente 9%</strong><br>(Incluye 7% de impuesto de transmisiones y alrededor del 2% para notaría, registro de la propiedad y representación legal.)",
        "fc-h2-newdev": "Obra Nueva",
        "fc-p-newdev": "<strong>Costes de Compra: Aproximadamente 13.2%</strong><br>(Incluye 10% de IVA, 1.2% de actos jurídicos documentados y el 2% restante para notaría, registro y representación legal.)",
        "fc-h2-expenses": "Gastos Después de la Compra",
        "fc-p-expenses-intro": "Los costes asociados con la propiedad pueden variar en cantidad, y es importante conocer estos costes de antemano. Algunos gastos comunes incluyen:",
        "fc-li-ibi": "<strong>IBI</strong> (Impuesto sobre Bienes Inmuebles)",
        "fc-li-basura": "<strong>BASURA</strong> - Recogida de Residuos",
        "fc-li-comunidad": "<strong>COMUNIDAD</strong> - Cuota de Comunidad (la cantidad depende del tamaño de la propiedad, número de miembros y nivel de instalaciones y mantenimiento)",
        "fc-li-electricidad": "<strong>ELECTRICIDAD</strong> - Luz",
        "fc-li-agua": "<strong>AGUA</strong> - Suministro de Agua",
        "fc-li-seguro": "<strong>SEGURO DE HOGAR</strong> - Seguro Multirriesgo",
        "fc-li-internet": "<strong>TV e Internet.</strong> Internet de alta velocidad (fibra) está disponible a precios competitivos. En la mayoría de los casos, solo se cobra la suscripción y la instalación es gratuita.",

        // --- Peace of Mind
        "pom-tab-title": "Servicios para tu Tranquilidad | MH ESTATE",
        "pom-title": "Servicios para tu<br>Tranquilidad",
        "pom-meta": "30 Oct 2025 por Cecilia Andersson",
        "pom-intro": "Tenemos los contactos que necesitas y hacemos que la transacción de tu propiedad sea lo más fluida posible.",
        "pom-h2-survey": "Inspección de la Propiedad",
        "pom-p-survey": "Para tu mayor seguridad, ofrecemos una inspección profesional de tu nueva vivienda. Nuestros especialistas realizan un estudio detallado para descubrir posibles problemas o futuros requisitos de mantenimiento, asegurando que conozcas plenamente el estado de la propiedad antes de comprar.",
        "pom-h2-manager": "Gestor de Propiedades",
        "pom-p-manager": "Nuestros servicios están diseñados para mantener y cuidar tu propiedad en tu ausencia, asegurando que se mantenga en perfecto estado.",
        "pom-h2-legal": "Asesoramiento Legal",
        "pom-p-legal": "Ofrecemos asistencia legal profesional para ayudarte a comprender todos los aspectos jurídicos, asegurando que puedas proceder con la compra de tu propiedad con confianza.",
        "pom-h2-design": "Diseño de Interiores",
        "pom-p-design": "Con la ayuda de estilistas profesionales, podemos ayudarte a crear la casa de tus sueños. Ofrecen paquetes de muebles o pueden adaptar todo a tu estilo y presupuesto. También podemos entregar tu propiedad llave en mano, incluyendo todo, desde habitaciones amuebladas hasta camas hechas y platos lavados y colocados en los armarios.",
        "pom-h2-currency": "Monitoreo de Divisas",
        "pom-p-currency": "Colaboramos con una empresa líder en cambio de divisas para ayudarte a ahorrar dinero en transferencias internacionales. Ofrecen mejores tasas que los bancos y la opción de fijar la tasa hasta por un año, brindando seguridad y ahorro financiero.",
        "pom-h2-alarm": "Alarma",
        "pom-p-alarm": "Para garantizar tu seguridad, ofrecemos instalaciones de sistemas de alarma para proteger tu hogar cuando no estás. Esto ayuda a prevenir intrusos y podría resultar en un descuento en tu seguro de hogar.",
        "pom-h2-rental": "Alquiler de Propiedades",
        "pom-p-rental": "Si decides alquilar tu propiedad, nuestro experto en alquileres te ayudará con el marketing, la gestión de reservas y ofrecerá soporte para ti y tus huéspedes, asegurando que la experiencia de alquiler sea sencilla y rentable.",
        "pom-h2-oversight": "Supervisión de la Propiedad",
        "pom-p-oversight": "Ofrecemos servicios de supervisión de propiedades cuando no estás cerca. Esto incluye chequeos regulares para asegurar que tu hogar se mantenga en óptimas condiciones.",
        "pom-h2-remodel": "Servicios de Remodelación",
        "pom-p-remodel": "Nuestros servicios de remodelación te ayudan a crear tu hogar perfecto. Ya sea que busques actualizar la cocina, diseñar una sala acogedora o darle un toque único a tu hogar, podemos hacer realidad tu visión.",
        "pom-h2-lang": "Soporte Lingüístico y Traducciones",
        "pom-p-lang": "Ofrecemos asistencia con el idioma en cada paso del camino, para que nunca tengas que sentirte inseguro debido a las diferencias de idioma.",
        "pom-h2-network": "Red y Experiencia Local",
        "pom-p-network": "Compartimos nuestra red de proveedores de servicios locales, como personal de mantenimiento, jardineros y empresas de limpieza, para hacer que tu estancia sea lo más cómoda posible.",

        // --- Country Where Like King
        "news-king-tab-title": "España – ¡El País Donde Puedes Comer y Beber Como un Rey! | MH ESTATE",
        "news-king-title": "España – ¡El País Donde Puedes Comer y Beber Como un Rey!",
        "news-king-meta": "30 Ene 2026 &nbsp;·&nbsp; por Cecilia Andersson",
        "news-king-p1": "Se confirma una vez más: España sigue reinando como uno de los países con mayor densidad de bares y restaurantes del mundo. Los españoles parecen haber descifrado el código de la calidad de vida: buena comida, buena compañía y una copa en la mano.",
        "news-king-p2": "Incluso después de la pandemia y varios años difíciles para la industria de la restauración, las cifras son impresionantes. Hoy en día hay más de 300.000 establecimientos de comida y bebida en España, incluyendo bares, restaurantes, cafeterías y bares de tapas.",
        "news-king-p3": "En otras palabras: en España es mucho más fácil encontrar un bar que una plaza de aparcamiento, y a veces incluso más fácil que encontrar un cajero automático.",
        "news-king-p4": "Aquí encontramos creadores culinarios que evocan clásicos como la paella, el gazpacho, los churros y, por supuesto, las todopoderosas tapas en sus cocinas, un concepto que en sí mismo es una prueba del amor de España por la comida social. La cultura gastronómica española no se trata solo de lo que hay en el plato, sino de la comunidad, el ritmo y el disfrute.",
        "news-king-p5": "¿Y qué sería de una fiesta sin bebida? España afirma haber dado al mundo la sangría, y los amantes del vino saben que el país es un paraíso. Desde Rioja y Ribera del Duero hasta Priorat, Rías Baixas y Jerez, España alberga algunas de las regiones vinícolas más apreciadas del mundo.",
        "news-king-p6": "Así que, si alguna vez consideras mudarte a España o comprar una casa de vacaciones, recuerda que no solo estás invirtiendo en sol, playas y cultura. También estás invirtiendo en algo al menos igual de importante:",
        "news-king-li1": "👉 Un bar local donde te reconozcan.",
        "news-king-li2": "👉 Un restaurante a la vuelta de la esquina que se convierta en tu segunda sala de estar.",
        "news-king-p7": "Así que reserva el billete, ven con la mente abierta y un apetito aún mayor. Bienvenido a España, donde cada comida es una fiesta y cada copa es un brindis por la vida.",
        "news-king-toast": "¡Salud! 🍷",

        // --- FOOTER ---
        'footer-desc': 'Tu aliado de confianza en el mercado inmobiliario',
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
        "guide-card2-title": "Fees and Costs when<br>buying a property",
        "guide-card2-desc": "The costs associated with the property can vary in amount, and it’s important to be aware of these costs in advance....",
        "guide-card3-title": "Peace of Mind<br>Services",
        "guide-card3-desc": "We have the contacts you need and make your property transaction as smooth as possible...",

        // GUIDES 4-6
        'guide-card4-title': 'A Quick Overview<br>of the Buying Process',
        'guide-card4-desc': 'We conduct a thorough market search to find the options that best match your criteria. Next, we visit the selected properties together to provide you with a deeper understanding of each home.',
        'guide-card5-title': 'Fees and Costs when<br>buying a property',
        'guide-card5-desc': 'Second-Hand Purchase Costs: Approximately 9%<br>(Includes 7% purchase tax and around 2% for notary fees, property registry registration, and legal representation.)',
        'guide-card6-title': 'Expenses After the<br>Purchase',
        'guide-card6-desc': 'The costs associated with the property can vary in amount, and it’s important to be aware of these costs in advance. Some common expenses include the following...',
        
        "news-king-title": "Spain – The Country Where You Can Eat and Drink Like a King!",
        "news-king-desc": "It is confirmed once again: Spain continues to reign as one of the world's densest countries for bars and restaurants...",
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
        'news-pdf-title': 'A Quick Overview<br>of the Buying Process',
        'news-pdf-desc': 'We conduct a thorough market search to<br>find the options that best match your<br>criteria. Next, we visit the selected<br>properties together to provide you with a<br>deeper understanding of each home.',

        // --- NUEVO ARTÍCULO ESPAÑA ---
        'news-spain-title': 'Spain – The Country Where You Can<br>Eat and Drink Like a King!',
        'news-spain-p1': 'It’s been confirmed once again: Spain continues to reign as one of the world’s most bar- and restaurant-dense countries. The Spaniards simply seem to have cracked the code for quality of life – good food, good company and a glass in hand.',
        'news-spain-p2': 'Even after the pandemic and several tough years for the restaurant industry, the numbers are impressive. Today, there are over 300,000 food and drink establishments in Spain, including bars, restaurants, cafés and tapas bars.',
        'news-spain-p3': 'In other words: in Spain, it’s much easier to find a bar than a parking space – and sometimes even easier than finding an ATM.',
        'news-spain-p4': 'Here we find culinary creators who conjure up classics like paella, gazpacho, churros and of course the almighty tapas in their kitchens – a concept that in itself is proof of Spain’s love of social eating. Spanish food culture is not just about what’s on the plate, but about community, pace and enjoyment.',
        'news-spain-p5': 'And what would a party be without drinks? Spain claims to have given the world sangria, and wine lovers know it’s a paradise. From Rioja and Ribera del Duero to Priorat, Rías Baixas and Jerez – Spain is home to some of the world’s most prized wine regions.',
        'news-spain-p6': 'So if you’re ever thinking about moving to Spain or buying a holiday home, remember that you’re not just investing in sun, beaches and culture. You’re also investing in something just as important:',
        'news-spain-list1': '👉 A local bar where they recognise you.',
        'news-spain-list2': '👉 A restaurant around the corner that will become your second living room.',
        'news-spain-p7': 'So book your ticket, come with an open mind – and an even wider appetite. Welcome to Spain, where every meal is a celebration and every glass is a toast to life.',
        'news-spain-toast': '¡Salud! 🍷',
        'read-more': 'Read More',

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

        // --- RENT (NUEVO) ---
        "nav-rent-view": "VIEW RENTALS",
        "nav-rent-list": "RENT YOUR HOME",

        // --- RENT HOME PAGE (NUEVO CONTENIDO) ---
        "rh-hero-title": "Maximize Your Rental Income<br>with Hassle-Free Management",
        "rh-intro-text": "At MH Estate, we offer homeowners a premium rental service<br>designed to maximize bookings and income while providing<br>exceptional support to both owners and tenants.",
        
        // ACTUALIZADO PARA NUEVO DISEÑO
        "rh-marketing-title": "Global Marketing",
        "rh-marketing-body": "We showcase your property on top rental platforms,<br>including Airbnb and Booking.com, as well as on<br>social media and in our office, ensuring maximum<br>visibility and reach to potential guests worldwide.",
        
        "rh-management-title": "Comprehensive<br>Management",
        "rh-management-intro": "Our all-inclusive services cover every aspect of rental management:",
        
        "rh-list-1": "Professional marketing and listing optimization",
        "rh-list-2": "Booking management and secure tenant payments",
        "rh-list-3": "Registration of the property and tenants with the Guardia Civil",
        "rh-list-4": "Check-in and check-out, including key handling, cleaning coordination, and inspections",
        "rh-list-5": "Basic maintenance, such as lamp replacement (materials at cost)",
        "rh-list-6": "Calendar management and synchronization",
        "rh-list-7": "Dedicated tenant support for a seamless experience",
        "rh-list-8": "Assistance with rental licenses (available at additional cost)",
        
        "rh-support-title": "Dedicated<br>Support",
        "rh-support-body": "Our team is always available to answer your questions and provide top-tier service to both you and your guests, ensuring a smooth, stress-free rental experience from start to finish.",

        // --- News-Buying-Process
        "bp-title": "A Quick Overview of the Buying Process",
        "bp-meta": "30th Oct 2025 by Cecilia Andersson",
        "bp-h2-viewing": "Viewing",
        "bp-p-viewing": "We conduct a thorough market search to find the options that best match your criteria. Next, we visit the selected properties together to provide you with a deeper understanding of each home. Of course, we are always available to answer your questions and will also be the ones to communicate your offer to the seller or the seller’s representative for the property you wish to purchase.",
        "bp-h2-negotiation": "Negotiation",
        "bp-p-negotiation": "We take care of negotiation. The transaction is finalized once the seller accepts an offer. While the resale market occasionally allows for price adjustments, newly built properties are generally sold at fixed prices.",
        "bp-h2-reservation": "Reservation Agreement",
        "bp-p-reservation": "Once an offer has been accepted, a reservation agreement is drawn up, and a reservation fee is paid. The fee is typically between €3,000 and €6,000, although it can sometimes be higher. During the reservation period, you have the opportunity to hire legal representation, and we are happy to assist you in finding a lawyer specialized in property transactions.",
        "bp-h2-sales": "Sales Contract",
        "bp-p-sales": "Once the lawyer has verified that the property’s documentation is in order, the purchase agreement is drawn up. At this point, you will pay 10% of the purchase price, minus the previously paid reservation fee. After this payment, the deal is formally ‘locked.’ For new developments, a higher percentage is typically required, and additional payments are usually made during the construction process. The developer is also required to provide a bank guarantee or equivalent when the purchase agreement is signed to secure your funds in case of any issues.",
        "bp-h2-deed": "Title Deed",
        "bp-p-deed": "At the time of closing, the remaining purchase amount is paid. The funds must be available in the lawyer’s account in advance so that the transaction can be completed at the notary on the same day. The notary ensures the transaction is registered and the ownership is transferred to you, giving you access to your new home.",
        "bp-role": "Founder & Real Estate Agent",

        // --- Feed ans Cost
        "fc-tab-title": "Fees and Costs when buying a property | MH ESTATE",
        "fc-title": "Fees and Costs when<br>buying a property",
        "fc-meta": "30th Oct 2025 by Cecilia Andersson",
        "fc-h2-secondhand": "Second-Hand",
        "fc-p-secondhand": "<strong>Purchase Costs: Approximately 9%</strong><br>(Includes 7% purchase tax and around 2% for notary fees, property registry registration, and legal representation.)",
        "fc-h2-newdev": "New Development",
        "fc-p-newdev": "<strong>Purchase Costs: Approximately 13.2%</strong><br>(Includes 10% VAT, 1.2% stamp duty, and the remaining 2% for notary fees, property registry registration, and legal representation.)",
        "fc-h2-expenses": "Expenses After the Purchase",
        "fc-p-expenses-intro": "The costs associated with the property can vary in amount, and it’s important to be aware of these costs in advance. Some common expenses include the following:",
        "fc-li-ibi": "<strong>IBI</strong> (Municipal Property Yearly Tax)",
        "fc-li-basura": "<strong>BASURA</strong> - Waste Collection",
        "fc-li-comunidad": "<strong>COMUNIDAD</strong> - Community Fee (the amount depends on the size of the property, the number of members, and the level of facilities and maintenance)",
        "fc-li-electricidad": "<strong>ELECTRICIDAD</strong> - Electricity",
        "fc-li-agua": "<strong>AGUA</strong> - Water",
        "fc-li-seguro": "<strong>SEGURO DE HOGAR</strong> - Home Insurance",
        "fc-li-internet": "<strong>TV and Internet.</strong> High-speed internet, usually delivered via fiber, is now available at very competitive rates. In most cases, the provider charges only for the subscription, with installation usually free of charge.",

        // --- Peace of Mind
        "pom-tab-title": "Peace of Mind Services | MH ESTATE",
        "pom-title": "Peace of Mind<br>Services",
        "pom-meta": "30th Oct 2025 by Cecilia Andersson",
        "pom-intro": "We have the contacts you need and make your property transaction as smooth as possible.",
        "pom-h2-survey": "Property Survey",
        "pom-p-survey": "For your added security, we provide a professional property inspection for your new home. Our specialists perform a detailed survey to uncover any possible problems or future maintenance requirements, ensuring you are fully aware of the property’s condition prior to purchase.",
        "pom-h2-manager": "Property Manager",
        "pom-p-manager": "Our services are designed to maintain and care for your property in your absence, ensuring it stays in perfect shape.",
        "pom-h2-legal": "Legal Guidance",
        "pom-p-legal": "We provide professional legal assistance to help you understand all legal aspects, ensuring you can proceed with your property purchase confidently.",
        "pom-h2-design": "Interior Design",
        "pom-p-design": "With the help of professional stylists, we can assist you in creating your dream home. They offer furniture packages or can tailor everything to your style and budget. We can also make your property turnkey, including everything from furnished rooms to made beds and dishes washed and placed in the cabinets, allowing you to move in hassle-free.",
        "pom-h2-currency": "Currency Monitoring",
        "pom-p-currency": "We partner with a market-leading currency exchange company to help you save money on international transfers. They offer better exchange rates than banks and the option to lock-in the rate for up to a year, providing security and financial savings.",
        "pom-h2-alarm": "Alarm",
        "pom-p-alarm": "To ensure your security, we provide alarm system installations to protect your home when you’re not there. This helps guard against intruders and could result in a discount on your home insurance.",
        "pom-h2-rental": "Property Rental",
        "pom-p-rental": "Should you decide to rent out your property, our rental expert will help with marketing, booking management, and offer support for you and your guests, ensuring the rental experience is simple and profitable.",
        "pom-h2-oversight": "Property Oversight",
        "pom-p-oversight": "We offer property supervision services when you’re not around. This includes regular checks to ensure your home remains in top condition.",
        "pom-h2-remodel": "Remodeling Services",
        "pom-p-remodel": "Our remodeling services assist you in crafting your perfect home. Whether you’re looking to update the kitchen, design a cozy living room, or give your home a unique touch, we can make your vision a reality.",
        "pom-h2-lang": "Language Support and Translations",
        "pom-p-lang": "We provide language assistance every step of the way, so you never have to feel unsure due to language differences.",
        "pom-h2-network": "Network and Local Expertise",
        "pom-p-network": "We share our network of local service providers, such as handymen, gardeners, and cleaning companies, to make your accommodation as comfortable as possible.",

        // --- Country Where Like King
        "news-king-tab-title": "Spain – The Country Where You Can Eat and Drink Like a King! | MH ESTATE",
        "news-king-title": "Spain – The Country Where You Can Eat and Drink Like a King!",
        "news-king-meta": "30th Jan 2026 &nbsp;·&nbsp; by Cecilia Andersson",
        "news-king-p1": "It is confirmed once again: Spain continues to reign as one of the world's countries with the highest density of bars and restaurants. Spaniards seem to have simply cracked the code for quality of life – good food, good company, and a glass in hand.",
        "news-king-p2": "Even after the pandemic and several tough years for the restaurant industry, the numbers are impressive. Today there are over 300,000 food and beverage establishments in Spain, including bars, restaurants, cafes, and tapas bars.",
        "news-king-p3": "In other words: in Spain, it is significantly easier to find a bar than a parking spot – and sometimes even easier than finding an ATM.",
        "news-king-p4": "Here we find culinary creators who conjure up classics like paella, gazpacho, churros, and of course the almighty tapas in their kitchens – a concept that in itself is proof of Spain's love for social eating. Spanish food culture is not just about what is on the plate, but about community, pace, and enjoyment.",
        "news-king-p5": "And what would a party be without a drink? Spain claims to have given the world sangria, and wine lovers know the country is a paradise. From Rioja and Ribera del Duero to Priorat, Rías Baixas, and Jerez – Spain is home to some of the world's most appreciated wine regions.",
        "news-king-p6": "So if you ever consider moving to Spain or buying a holiday home, remember that you are not just investing in sun, beaches, and culture. You are also investing in something at least as important:",
        "news-king-li1": "👉 A local bar where they recognize you.",
        "news-king-li2": "👉 A restaurant around the corner that becomes your second living room.",
        "news-king-p7": "So book the ticket, come with an open mind – and an even bigger appetite. Welcome to Spain, where every meal is a feast and every glass is a toast to life.",
        "news-king-toast": "Cheers! 🍷",

        // --- FOOTER ---
        'footer-desc': 'Your trusted partner in Real Estate',
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
        'testimonial-body': '"MH Estate gav en exceptionell service. Deras team was professionellt, tålmodigt och förstod verkligen våra behov. Vi hittade den perfekta villan i Nerja tack vare deras expertis!"',
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
        "guide-card2-title": "Avgifter och Kostnader vid<br>köp av fastighet",
        "guide-card2-desc": "Kostnaderna förknippade med fastigheten kan variera i storlek, och det är viktigt att vara medveten om dessa kostnader i förväg....",
        // SV (Sueco)
        "guide-card3-title": "Tjänster för din<br>Trygghet",
        "guide-card3-desc": "Vi har kontakterna du behöver och gör din fastighetsaffär så smidig som möjligt...",

        // GUIDER 4-6
        'guide-card4-title': 'En Snabb Överblick<br>of Köpprocessen',
        'guide-card4-desc': 'Vi genomför en grundlig marknadssökning för att hitta de alternativ som bäst matchar dina kriterier. Därefter besöker vi de utvalda fastigheterna tillsammans för att ge dig en djupare förståelse för varje hem.',
        'guide-card5-title': 'Avgifter och Kostnader<br>vid köp av fastighet',
        'guide-card5-desc': 'Kostnader vid köp av begagnat: Cirka 9%<br>(Inkluderar 7% överföringsskatt och cirka 2% för notarie, fastighetsregister och juridisk representation).',
        'guide-card6-title': 'Utgifter Efter<br>Köpet',
        'guide-card6-desc': 'Kostnaderna förknippade med fastigheten kan variera, och det är viktigt att vara medveten om dessa i förväg. Några vanliga utgifter inkluderar följande...',
        
        "news-king-title": "Spanien – Landet Där Du Kan Äta och Dricka Som En Kung!",
        "news-king-desc": "Det är återigen bekräftat: Spanien fortsätter att regera som ett av världens mest bar- och restaurangtätaste länder...",
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
        'news-pdf-title': 'En Snabb Överblick<br>av Köpprocessen',
        'news-pdf-desc': 'Vi genomför en grundlig marknadssökning<br>för att hitta de alternativ som bäst<br>matchar dina kriterier. Därefter besöker<br>vi de utvalda fastigheterna tillsammans<br>för att ge dig en djupare förståelse.',

        // --- NUEVO ARTÍCULO ESPAÑA ---
        'news-spain-title': 'Spanien – Landet Där Du Kan<br>Äta och Dricka Som En Kung!',
        'news-spain-p1': 'Det är återigen bekräftat: Spanien fortsätter att regera som ett av världens mest bar- och restaurangtätaste länder. Spanjorerna verkar helt enkelt ha knäckt koden för livskvalitet – god mat, gott sällskap och ett glas i handen.',
        'news-spain-p2': 'Även efter pandemin och flera tuffa år för restaurangbranschen är siffrorna imponerande. Idag finns det över 300 000 mat- och dryckesställen i Spanien, inklusive barer, restauranger, caféer och tapasbarer.',
        'news-spain-p3': 'Med andra ord: i Spanien är det betydligt lättare att hitta en bar än en parkeringsplats – och ibland till och med lättare än att hitta en bankomat.',
        'news-spain-p4': 'Här hittar vi kulinariska kreatörer som i sina kök trollar fram klassiker som paella, gazpacho, churros och förstås den allsmäktiga tapasen – ett koncept som i sig är ett bevis på Spaniens kärlek till socialt ätande. Den spanska matkulturen handlar inte bara om vad som ligger på tallriken, utan om gemenskap, tempo och njutning.',
        'news-spain-p5': 'Och vad vore en fest utan dryck? Spanien gör anspråk på att ha gett världen sangrian, och vinälskare vet att landet är ett paradis. Från Rioja och Ribera del Duero till Priorat, Rías Baixas och Jerez – Spanien är hem för några av världens mest uppskattade vinregioner.',
        'news-spain-p6': 'Så om du någon gång funderar på att flytta till Spanien eller köpa ett semesterboende, kom ihåg att du inte bara investerar i sol, stränder och kultur. Du investerar också i något minst lika viktigt:',
        'news-spain-list1': '👉 En lokal bar där de känner igen dig.',
        'news-spain-list2': '👉 En restaurang runt hörnet som blir ditt andra vardagsrum.',
        'news-spain-p7': 'Så boka biljetten, kom med öppet sinne – och ännu öppnare aptit. Välkommen till Spanien, där varje måltid är en fest och varje glas är en skål för livet.',
        'news-spain-toast': '¡Salud! 🍷',
        'read-more': 'Läs Mer',

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

        // --- RENT (NUEVO) ---
        "nav-rent-view": "SE HYRESBOSTÄDER",
        "nav-rent-list": "HYR UT DIN BOSTAD",

        // --- RENT HOME PAGE (NUEVO CONTENIDO) ---
        "rh-hero-title": "Maximera dina hyresintäkter<br>med problemfri förvaltning",
        "rh-intro-text": "På MH Estate erbjuder vi husägare en premiumuthyrningstjänst<br>utformad för att maximera bokningar och intäkter samtidigt som vi ger<br>exceptionellt stöd till både ägare och hyresgäster.",
        
        // ACTUALIZADO PARA NUEVO DISEÑO
        "rh-marketing-title": "Global Marknadsföring",
        "rh-marketing-body": "Vi visar upp din fastighet på de bästa uthyrningsplattformarna,<br>inklusive Airbnb och Booking.com, samt på<br>sociala medier och på vårt kontor, vilket garanterar maximal<br>synlighet och räckvidd till potentiella gäster över hela världen.",
        
        "rh-management-title": "Omfattande<br>Förvaltning",
        "rh-management-intro": "Våra all-inclusive-tjänster täcker varje aspekt av uthyrningsförvaltning:",
        
        "rh-list-1": "Professionell marknadsföring och optimering av annonser",
        "rh-list-2": "Bokningshantering och säkra hyresgästbetalningar",
        "rh-list-3": "Registrering av fastigheten och hyresgäster hos Guardia Civil",
        "rh-list-4": "In- och utcheckning, nyckelhantering, städkoordinering och inspektioner",
        "rh-list-5": "Grundläggande underhåll, t.ex. lampbyte (material till självkostnadspris)",
        "rh-list-6": "Kalenderhantering och synkronisering",
        "rh-list-7": "Dedikerad hyresgästsupport för en smidig upplevelse",
        "rh-list-8": "Hjälp med uthyrningslicenser (tillgängligt mot extra kostnad)",
        
        "rh-support-title": "Dedikerad<br>Support",
        "rh-support-body": "Vårt team är alltid tillgängligt för att svara på dina frågor och ge service i toppklass till både dig och dina gäster, vilket säkerställer en smidig och stressfri uthyrningsupplevelse från början till slut.",

        // -- News-Buying-Process
        "bp-title": "En Snabb Överblick av Köpprocessen",
        "bp-meta": "30 Okt 2025 av Cecilia Andersson",
        "bp-h2-viewing": "Visning",
        "bp-p-viewing": "Vi genomför en grundlig marknadssökning för att hitta de alternativ som bäst matchar dina kriterier. Därefter besöker vi de valda fastigheterna tillsammans för att ge dig en djupare förståelse för varje hem. Naturligtvis finns vi alltid tillgängliga för att svara på dina frågor och kommer också att vara de som kommunicerar ditt bud till säljaren eller säljarens representant för den fastighet du vill köpa.",
        "bp-h2-negotiation": "Förhandling",
        "bp-p-negotiation": "Vi tar hand om förhandlingen. Transaktionen slutförs när säljaren accepterar ett bud. Medan andrahandsmarknaden ibland tillåter prisjusteringar, säljs nyproducerade fastigheter generellt till fasta priser.",
        "bp-h2-reservation": "Reservationsavtal",
        "bp-p-reservation": "När ett bud har accepterats upprättas ett reservationsavtal och en reservationsavgift betalas. Avgiften ligger vanligtvis mellan 3 000 € och 6 000 €, även om den ibland kan vara högre. Under reservationsperioden har du möjlighet att anlita juridiskt ombud, och vi hjälper dig gärna att hitta en advokat specialiserad på fastighetstransaktioner.",
        "bp-h2-sales": "Köpekontrakt",
        "bp-p-sales": "När advokaten har verifierat att fastighetens dokumentation är i sin ordning upprättas köpekontraktet. Vid denna tidpunkt betalar du 10% av köpeskillingen, minus den tidigare betalda reservationsavgiften. Efter denna betalning är affären formellt 'låst'. För nyproduktion krävs vanligtvis en högre procentandel, och ytterligare betalningar görs vanligtvis under byggprocessen. Byggherren är också skyldig att tillhandahålla en bankgaranti eller motsvarande när köpekontraktet undertecknas för att säkra dina medel vid eventuella problem.",
        "bp-h2-deed": "Lagfart",
        "bp-p-deed": "Vid tillträdet betalas det återstående köpebeloppet. Medlen måste finnas tillgängliga på advokatens konto i förväg så att transaktionen kan slutföras hos notarien samma dag. Notarien säkerställer att transaktionen registreras och äganderätten överförs till dig, vilket ger dig tillgång till ditt nya hem.",
        "bp-role": "Grundare & Fastighetsmäklare",

        // --- Feed and Cost
        "fc-tab-title": "Fees and Costs when buying a property | MH ESTATE",
        "fc-title": "Fees and Costs when<br>buying a property",
        "fc-meta": "30th Oct 2025 &nbsp;·&nbsp; by Cecilia Andersson",
        "fc-h2-secondhand": "Second-Hand",
        "fc-p-secondhand": "<strong>Purchase Costs: Approximately 9%</strong><br>(Includes 7% purchase tax and around 2% for notary fees, property registry registration, and legal representation.)",
        "fc-h2-newdev": "New Development",
        "fc-p-newdev": "<strong>Purchase Costs: Approximately 13.2%</strong><br>(Includes 10% VAT, 1.2% stamp duty, and the remaining 2% for notary fees, property registry registration, and legal representation.)",
        "fc-h2-expenses": "Expenses After the Purchase",
        "fc-p-expenses-intro": "The costs associated with the property can vary in amount, and it’s important to be aware of these costs in advance. Some common expenses include the following:",
        "fc-li-ibi": "<strong>IBI</strong> (Municipal Property Yearly Tax)",
        "fc-li-basura": "<strong>BASURA</strong> - Waste Collection",
        "fc-li-comunidad": "<strong>COMUNIDAD</strong> - Community Fee (the amount depends on the size of the property, the number of members, and the level of facilities and maintenance)",
        "fc-li-electricidad": "<strong>ELECTRICIDAD</strong> - Electricity",
        "fc-li-agua": "<strong>AGUA</strong> - Water",
        "fc-li-seguro": "<strong>SEGURO DE HOGAR</strong> - Home Insurance",
        "fc-li-internet": "<strong>TV and Internet.</strong> High-speed internet, usually delivered via fiber, is now available at very competitive rates. In most cases, the provider charges only for the subscription, with installation usually free of charge.",

        // --- Feed and Cost
        "fc-tab-title": "Avgifter och Kostnader vid köp av fastighet | MH ESTATE",
        "fc-title": "Avgifter och Kostnader vid<br>köp av fastighet",
        "fc-meta": "30 Okt 2025 av Cecilia Andersson",
        "fc-h2-secondhand": "Andrahandsmarknad",
        "fc-p-secondhand": "<strong>Köpkostnader: Cirka 9%</strong><br>(Inkluderar 7% överföringsskatt och cirka 2% för notarieavgifter, fastighetsregister och juridisk representation.)",
        "fc-h2-newdev": "Nyproduktion",
        "fc-p-newdev": "<strong>Köpkostnader: Cirka 13,2%</strong><br>(Inkluderar 10% moms, 1,2% stämpelskatt och återstående 2% för notarieavgifter, fastighetsregister och juridisk representation.)",
        "fc-h2-expenses": "Kostnader Efter Köpet",
        "fc-p-expenses-intro": "Kostnaderna förknippade med fastigheten kan variera, och det är viktigt att vara medveten om dessa i förväg. Några vanliga utgifter inkluderar:",
        "fc-li-ibi": "<strong>IBI</strong> (Kommunal fastighetsskatt)",
        "fc-li-basura": "<strong>BASURA</strong> - Sophämtning",
        "fc-li-comunidad": "<strong>COMUNIDAD</strong> - Samfällighetsavgift (beloppet beror på fastighetens storlek, antal medlemmar samt nivå på faciliteter och underhåll)",
        "fc-li-electricidad": "<strong>ELECTRICIDAD</strong> - El",
        "fc-li-agua": "<strong>AGUA</strong> - Vatten",
        "fc-li-seguro": "<strong>SEGURO DE HOGAR</strong> - Hemförsäkring",
        "fc-li-internet": "<strong>TV och Internet.</strong> Höghastighetsinternet (fiber) finns nu till mycket konkurrenskraftiga priser. Oftast tar leverantören endast betalt för abonnemanget, medan installationen vanligtvis är gratis.",

        // --- Peace of Mind
        "pom-tab-title": "Tjänster för din Trygghet | MH ESTATE",
        "pom-title": "Tjänster för din<br>Trygghet",
        "pom-meta": "30 Okt 2025 av Cecilia Andersson",
        "pom-intro": "Vi har kontakterna du behöver och gör din fastighetsaffär så smidig som möjligt.",
        "pom-h2-survey": "Fastighetsbesiktning",
        "pom-p-survey": "För din extra trygghet erbjuder vi en professionell fastighetsbesiktning av ditt nya hem. Våra specialister utför en detaljerad undersökning för att upptäcka eventuella problem eller framtida underhållskrav, så att du är fullt medveten om fastighetens skick innan köp.",
        "pom-h2-manager": "Fastighetsförvaltning",
        "pom-p-manager": "Våra tjänster är utformade för att underhålla och ta hand om din fastighet i din frånvaro, vilket säkerställer att den förblir i perfekt skick.",
        "pom-h2-legal": "Juridisk Vägledning",
        "pom-p-legal": "Vi erbjuder professionell juridisk assistans för att hjälpa dig förstå alla juridiska aspekter, så att du kan genomföra ditt fastighetsköp med trygghet.",
        "pom-h2-design": "Inredningsdesign",
        "pom-p-design": "Med hjälp av professionella stylister kan vi hjälpa dig att skapa ditt drömhem. De erbjuder möbelpaket eller kan skräddarsy allt efter din stil och budget. Vi kan också göra din fastighet nyckelfärdig, inklusive allt från möblerade rum till bäddade sängar och diskad disk i skåpen.",
        "pom-h2-currency": "Valutaövervakning",
        "pom-p-currency": "Vi samarbetar med ett marknadsledande valutaväxlingsföretag för att hjälpa dig spara pengar på internationella överföringar. De erbjuder bättre växelkurser än banker och möjligheten att låsa kursen i upp till ett år, vilket ger trygghet och ekonomiska besparingar.",
        "pom-h2-alarm": "Larm",
        "pom-p-alarm": "För att säkerställa din trygghet erbjuder vi installation av larmsystem för att skydda ditt hem när du inte är där. Detta hjälper till att skydda mot inkräktare och kan ge rabatt på din hemförsäkring.",
        "pom-h2-rental": "Fastighetsuthyrning",
        "pom-p-rental": "Om du bestämmer dig för att hyra ut din fastighet hjälper vår uthyrningsexpert till med marknadsföring, bokningshantering och support för dig och dina gäster, vilket säkerställer att uthyrningsupplevelsen blir enkel och lönsam.",
        "pom-h2-oversight": "Fastighetstillsyn",
        "pom-p-oversight": "Vi erbjuder tillsynstjänster för din fastighet när du inte är på plats. Detta inkluderar regelbundna kontroller för att säkerställa att ditt hem förblir i toppskick.",
        "pom-h2-remodel": "Renoveringstjänster",
        "pom-p-remodel": "Våra renoveringstjänster hjälper dig att skapa ditt perfekta hem. Oavsett om du vill uppdatera köket, designa ett mysigt vardagsrum eller ge ditt hem en unik touch, kan vi göra din vision till verklighet.",
        "pom-h2-lang": "Språkstöd och Översättningar",
        "pom-p-lang": "Vi erbjuder språkhjälp varje steg på vägen, så att du aldrig behöver känna dig osäker på grund av språkskillnader.",
        "pom-h2-network": "Nätverk och Lokal Expertis",
        "pom-p-network": "Vi delar med oss av vårt nätverk av lokala tjänsteleverantörer, såsom hantverkare, trädgårdsmästare och städföretag, för att göra ditt boende så bekvämt som möjligt.",

        // --- Country Where Like King
        "news-king-tab-title": "Spanien – Landet Där Du Kan Äta och Dricka Som En Kung! | MH ESTATE",
        "news-king-title": "Spanien – Landet Där Du Kan Äta och Dricka Som En Kung!",
        "news-king-meta": "30 Jan 2026 av Cecilia Andersson",
        "news-king-p1": "Det är återigen bekräftat: Spanien fortsätter att regera som ett av världens mest bar- och restaurangtätaste länder. Spanjorerna verkar helt enkelt ha knäckt koden för livskvalitet – god mat, gott sällskap och ett glas i handen.",
        "news-king-p2": "Även efter pandemin och flera tuffa år för restaurangbranschen är siffrorna imponerande. Idag finns det över 300 000 mat- och dryckesställen i Spanien, inklusive barer, restauranger, caféer och tapasbarer.",
        "news-king-p3": "Med andra ord: i Spanien är det betydligt lättare att hitta en bar än en parkeringsplats – och ibland till och med lättare än att hitta en bankomat.",
        "news-king-p4": "Här hittar vi kulinariska kreatörer som i sina kök trollar fram klassiker som paella, gazpacho, churros och förstås den allsmäktiga tapasen – ett koncept som i sig är ett bevis på Spaniens kärlek till socialt ätande. Den spanska matkulturen handlar inte bara om vad som ligger på tallriken, utan om gemenskap, tempo och njutning.",
        "news-king-p5": "Och vad vore en fest utan dryck? Spanien gör anspråk på att ha gett världen sangrian, och vinälskare vet att landet är ett paradis. Från Rioja och Ribera del Duero till Priorat, Rías Baixas och Jerez – Spanien är hem för några av världens mest uppskattade vinregioner.",
        "news-king-p6": "Så om du någon gång funderar på att flytta till Spanien eller köpa ett semesterboende, kom ihåg att du inte bara investerar i sol, stränder och kultur. Du investerar också i något minst lika viktigt:",
        "news-king-li1": "👉 En lokal bar där de känner igen dig.",
        "news-king-li2": "👉 En restaurang runt hörnet som blir ditt andra vardagsrum.",
        "news-king-p7": "Så boka biljetten, kom med öppet sinne – och ännu öppnare aptit. Välkommen till Spanien, där varje måltid är en fest och varje glas är en skål för livet.",
        "news-king-toast": "Hälsa 🍷",

        // --- FOOTER ---
        'footer-desc': 'Din pålitliga partner på fastighetsmarknaden',
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