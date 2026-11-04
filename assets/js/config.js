/* ==========================================================================
   LA CUCHARA DE BACO: datos editables de la web
   Todo lo que cambia (menús, precios, horarios, enlaces, fotos) está aquí.
   Regla general: null = todavía no hay dato. La web muestra entonces el
   espacio provisional o simplemente no enseña ese bloque.
   ========================================================================== */
window.CUCHARA = {
  nombre: 'La Cuchara de Baco',
  firma: 'by Javi Sierra', // pone null si no debe aparecer

  // Dirección de la web, sin barra final. Cambiarla al tener dominio propio.
  dominio: 'https://crsdigitalizacion.github.io/la-cuchara-de-baco',

  telefono: {
    enlace: '+34698965692',
    visible: '698 965 692',
  },

  direccion: {
    calle: 'Av. Portugal, 5',
    codigoPostal: '26001',
    ciudad: 'Logroño',
    region: 'La Rioja',
    pais: 'ES',
  },

  enlaces: {
    mapa: 'https://www.google.com/maps/place/La+Cuchara+de+Baco/@42.4643758,-2.4487102,17z/data=!3m1!4b1!4m6!3m5!1s0xd5aabf7f4b570e9:0x89131aa952db2bf6!8m2!3d42.4643758!4d-2.4487102!16s%2Fg%2F11qrf4w3hz',
    instagram: 'https://www.instagram.com/lacucharadebaco/',
    instagramUsuario: '@lacucharadebaco',
    // A dónde lleva el botón «Reservar». El formulario de esa página es solo de
    // vista: con un sistema de reservas real, pon aquí su URL.
    reservas: 'encuentranos.html#reservar',
    avisoLegal: 'aviso-legal.html',
    privacidad: 'privacidad.html',
  },

  // Horario de la ficha de Google (4/11/2026). Con null se invita a llamar.
  horario: [
    { dias: 'Martes a jueves', horas: '13:30 a 15:30' },
    { dias: 'Viernes y sábado', horas: '13:30 a 15:30 y 20:30 a 22:30' },
    { dias: 'Domingo', horas: '13:30 a 15:30' },
    { dias: 'Lunes', horas: 'Cerrado' },
  ],
  // El mismo horario, en el formato que lee Google. Mantener ambos iguales.
  horarioDatos: [
    { dias: ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], abre: '13:30', cierra: '15:30' },
    { dias: ['Friday', 'Saturday'], abre: '20:30', cierra: '22:30' },
  ],

  // Distinción publicada en la ficha de la Guía Repsol. null la oculta.
  distincion: {
    texto: 'Solete Guía Repsol, primavera 2026',
    cita: 'Una auténtica joya',
    fuente: 'Guía Repsol',
    url: 'https://www.guiarepsol.com/es/fichas/solete/la-cuchara-de-baco-335353/',
  },

  // Tres platos de la carta en la portada. El primero sale más grande.
  destacados: [
    {
      src: 'assets/img/plato-pulpo',
      nombre: 'Pulpo braseado',
      detalle: 'sobre parmentier de patata trufada',
      alt: 'Pulpo con salsa clara y pimentón en un plato blanco',
    },
    {
      src: 'assets/img/plato-carpaccio',
      nombre: 'Carpaccio de solomillo de buey',
      detalle: 'con escamas de idiazabal y rúcula',
      alt: 'Carpaccio con rúcula, lascas de queso y una reducción oscura',
    },
    {
      src: 'assets/img/plato-gyozas',
      nombre: 'Gyozas de cordero txamarito',
      detalle: 'guisado al chilindrón',
      alt: 'Empanadillas con salsa en una fuente blanca alargada',
    },
  ],

  // Nota de la ficha de Google (4,6 con 798 opiniones el 4/11/2026). null la oculta.
  valoracion: {
    nota: '4,6',
    texto: 'de 5 en Google, con casi 800 opiniones',
  },

  // Citas textuales y breves. No añadir ninguna que no sea real.
  opiniones: [
    {
      cita: 'Una auténtica joya',
      fuente: 'Guía Repsol',
      url: 'https://www.guiarepsol.com/es/fichas/solete/la-cuchara-de-baco-335353/',
    },
    {
      cita: 'Excelente relación calidad-precio',
      fuente: 'Guía Macarfi',
      url: 'https://macarfi.com/es/l.r./ficha-restaurante/la-cuchara-de-baco',
    },
    {
      cita: 'Donde mejor se come es en casa de Javi Sierra',
      fuente: 'Opinión de un cliente en Tripadvisor',
      url: 'https://www.tripadvisor.es/ShowUserReviews-g187513-d23262235-r792781553-La_Cuchara_De_Baco-Logrono_La_Rioja.html',
    },
  ],

  /* MENÚS ------------------------------------------------------------------
     Se muestran completos en menus.html. Para actualizar un menú:
       precio:   '00,00 €'
       nota:     'Pan, agua y vino incluidos' (o lo que corresponda)
       cuando:   'De martes a viernes, a mediodía' (o lo que corresponda)
       mensaje:  frase corta bajo el título del menú
       aviso:    recuadro de dato por confirmar; pon null cuando ya sea vigente
       secciones: cada curso con su lista de platos. Un plato puede ser un
                  texto o { nombre: 'Bacalao', detalle: 'con su guarnición' }.
                  Un curso con platos: [] muestra el espacio provisional.
     Con foto oficial y vigente de la carta (ampliable y descargable):
       imagen: { src: 'assets/img/menu-ejecutivo.webp', alt: 'Carta del menú ejecutivo' }
     actualizado: 'Noviembre de 2026' se enseña junto al menú.
     En la carta, cada plato lleva además precio: '9,90 €'.
     sinPrecio: true    → la hoja no pide precio general (es el caso de la carta).
     ---------------------------------------------------------------------- */
  menus: [
    {
      id: 'dia-fin-de-semana',
      nombre: 'Menú del día / fin de semana',
      descripcion: 'El que cambia con el calendario. Pregunta qué hay hoy en cocina.',
      // Propuesta aprobada por el dueño (4/11/2026): precio, mensaje y platos.
      mensaje: 'Primero, segundo y postre a elegir.',
      precio: '24,90 €',
      nota: 'Pan, agua y vino de Rioja incluidos.',
      cuando: null,
      secciones: [
        {
          titulo: 'Primeros platos',
          platos: [
            { nombre: 'Cocido de lentejas a la castellana', detalle: 'con carrillera ibérica' },
            { nombre: 'Stortarelli de pasta italiana', detalle: 'napolitana de atún y encurtidos' },
            { nombre: 'Espinacas de la huerta riojana a la crema', detalle: 'huevo de corral a baja temperatura' },
            { nombre: 'Ensalada de brotes tiernos', detalle: 'calamar de potera en panko, cebolleta caramelizada y muselina de tinta negra' },
          ],
        },
        {
          titulo: 'Segundos platos',
          platos: [
            { nombre: 'Lomo de corvina salvaje al horno', detalle: 'ratatouille de calabacín y parmentier trufada' },
            { nombre: 'Bacalao ajoarriero', detalle: 'fondo de verduritas y choricero' },
            { nombre: 'Entrecot de ternera a la plancha (200 g)', detalle: 'patata de bastón y pimientos del piquillo confitados' },
            { nombre: 'Roti de pollo picantón deshuesado', detalle: 'carbonara de boletus edulis y setas de temporada' },
          ],
        },
        {
          titulo: 'Postres',
          platos: [
            { nombre: 'Tiramisú de mascarpone' },
            { nombre: 'Torrija de brioche', detalle: 'leche de vainilla y azúcar de caña' },
            { nombre: 'Goxua de la abuela' },
            { nombre: 'Brownie de chocolate y nueces', detalle: 'con helado de vainilla' },
          ],
        },
      ],
      imagen: null,
      actualizado: null,
    },
    {
      id: 'ejecutivo',
      nombre: 'Menú ejecutivo',
      descripcion: 'Pensado para comer bien en plena jornada de trabajo.',
      // Propuesta aprobada por el dueño (4/11/2026): platos, precio y condiciones.
      mensaje: 'Primero, segundo y postre a elegir.',
      precio: '32,00 €',
      nota: 'Pan, agua, vino de Rioja y café incluidos.',
      cuando: 'De martes a viernes, a mediodía.',
      secciones: [
        {
          titulo: 'Primeros platos',
          platos: [
            { nombre: 'Nuestras croquetas caseras', detalle: 'de cecina, al estilo tradicional' },
            { nombre: 'Ensalada templada de delicias de pato', detalle: 'frutos secos y tomate texturizado con vinagreta de arándanos' },
            { nombre: 'Gyozas rellenas de cordero txamarito', detalle: 'guisado al chilindrón y mermelada de pimientos asados a leña' },
          ],
        },
        {
          titulo: 'Segundos platos',
          platos: [
            { nombre: 'Carrilleras de ternera de la Llanada Alavesa', detalle: 'glaseadas al vino tinto de Rioja con cremoso de patata' },
            { nombre: 'Taco de bacalao al natural', detalle: 'pisto de verduritas de la huerta riojana y muselina de choriceros' },
            { nombre: 'Suprema de merluza de pintxo', detalle: 'rellena de setas y gambas con crema fina de cigalas' },
          ],
        },
        {
          titulo: 'Postres',
          platos: [
            { nombre: 'Tarta de queso horneada', detalle: 'con crumble de campurrianas' },
            { nombre: 'Crema de mascarpone', detalle: 'con esponja de pistacho y tierra de oreo' },
            { nombre: 'Tarrito de goxua', detalle: 'al estilo de la abuela' },
          ],
        },
      ],
      imagen: null,
      actualizado: null,
    },
    {
      id: 'carta',
      nombre: 'La carta',
      descripcion: 'Para pedir a tu aire, de los caprichos de Baco a la tentación más dulce.',
      // Transcrita de la foto de la carta expuesta en el local. La foto no tiene
      // fecha: confirmar platos y precios antes de publicar (ver PENDIENTES.md).
      sinPrecio: true,
      nota: 'Todos los precios incluyen el 10 % de IVA.',
      cuando: null,
      secciones: [
        {
          titulo: 'Los caprichos de Baco',
          platos: [
            { nombre: 'Ensalada templada de delicias de pato', detalle: 'frutos secos y tomate texturizado con vinagreta de arándanos', precio: '9,90 €' },
            { nombre: 'Carpaccio de solomillo de buey', detalle: 'de vaca rubia gallega con escamas de idiazabal, rúcula y aceite de Arróniz', precio: '12,00 €' },
            { nombre: 'Ceviche de salmón marinado', detalle: 'en eneldo y cítricos, pétalos de aguacate, piparras de la tierra y muselina de mango', precio: '13,20 €' },
            { nombre: 'Nuestras croquetas caseras', detalle: 'de cecina, al estilo tradicional', precio: '7,70 €' },
            { nombre: 'Patatas bravas', detalle: 'con fritada de chistorra a la sidra', precio: '5,50 €' },
            { nombre: 'Pan bao de callos y morros', detalle: 'a la riojana con migas de pastor a nuestro estilo', precio: '8,80 €' },
            { nombre: 'Gyozas rellenas de cordero txamarito', detalle: 'guisado al chilindrón y mermelada de pimientos asados a leña', precio: '9,00 €' },
            { nombre: 'Baco burger de rabo de toro', detalle: 'meloso en pan brioche', precio: '8,80 €' },
            { nombre: 'Lobster roll de bogavante', detalle: 'con mahonesa de lima sobre pan de cristal hecho al momento', precio: '18,00 €' },
          ],
        },
        {
          titulo: 'Los placeres carnales',
          platos: [
            { nombre: 'Carré de cerdo ibérico 100 % bellota Beher', detalle: 'cocinado a 63° en su propio jugo con arrope de uva tempranillo', precio: '17,90 €' },
            { nombre: 'Lingote de cochinillo lechal', detalle: 'deshuesado a baja temperatura con compota fina de reineta', precio: '18,90 €' },
            { nombre: 'Carrilleras de ternera de la Llanada Alavesa', detalle: 'glaseadas al vino tinto de Rioja con cremoso de patata', precio: '14,50 €' },
            { nombre: 'Tataki de vaca rubia gallega', detalle: 'madurada durante 50 días con patatas de bastón y pimientos de cristal confitados en su jugo', precio: '18,00 €' },
            { nombre: 'Chuletón al corte', detalle: 'de vaca vieja con su guarnición', precio: '39,00 €/kilo' },
          ],
        },
        {
          titulo: 'Los pecados del mar',
          platos: [
            { nombre: 'Albóndigas de rape y carabineros', detalle: 'con sopa tibia de mejillón de roca al azafrán', precio: '17,50 €' },
            { nombre: 'Suprema de merluza de pintxo', detalle: 'rellena de setas y gambas con crema fina de cigalas', precio: '16,90 €' },
            { nombre: 'Taco de bacalao al natural', detalle: 'sobre cama de pisto de verduritas de la huerta riojana y muselina de choriceros', precio: '15,90 €' },
            { nombre: 'Pulpo braseado', detalle: 'sobre parmentier de patata trufada y velo de papada ibérica', precio: '16,50 €' },
          ],
        },
        {
          titulo: 'La tentación más dulce',
          platos: [
            { nombre: 'Tarta de queso horneada', detalle: 'con crumble de campurrianas y quenelle de idiazabal', precio: '5,50 €' },
            { nombre: 'Volcán de chocolate', detalle: 'negro 70 %, hecho en casa', precio: '6,00 €' },
            { nombre: 'Crema de mascarpone', detalle: 'con esponja de pistacho y tierra de oreo', precio: '5,00 €' },
            { nombre: 'Torrija de brioche a las tres leches', detalle: 'caramelizada en azúcar de caña con helado de Ferrero Rocher', precio: '4,50 €' },
            { nombre: 'Tarrito de goxua', detalle: 'al estilo de la abuela', precio: '4,00 €' },
          ],
        },
      ],
      imagen: null,
      actualizado: null,
    },
  ],

  /* FOTOS ------------------------------------------------------------------
     La galería va por secciones. Cada foto lleva:
       src:   archivo sin el final «-640.webp» / «-1200.webp»
       alt:   qué se ve (también es el pie en el visor)
       ancho, alto: medidas de la foto, para reservar su hueco al cargar
     «El local» se compone con 3 fotos y «Postres y vinos» con 3. En «Platos»
     caben las que quieras: se ordenan en columnas sin recortarse.
     ---------------------------------------------------------------------- */
  fachada: {
    src: 'assets/img/local-fachada-1200.webp',
    alt: 'Fachada de La Cuchara de Baco, con rótulo dorado y marcos verde agua',
  },

  /* Fondo de la portada: fotos a pantalla completa que se funden con un zoom
     lento. Son 4: escritorio (pantalla horizontal) y movil (vertical). La primera
     va en index.html y es la misma en ambos. Ver preparar_imagenes.py. */
  fondo: [
    { escritorio: 'assets/img/fondo-1.webp', movil: 'assets/img/fondo-1.webp' },
    { escritorio: 'assets/img/fondo-2.webp', movil: 'assets/img/fondo-movil-2.webp' },
    { escritorio: 'assets/img/fondo-3.webp', movil: 'assets/img/fondo-2.webp' },
    { escritorio: 'assets/img/fondo-4.webp', movil: 'assets/img/fondo-movil-4.webp' },
  ],

  galeria: [
    {
      id: 'el-local',
      titulo: 'El local',
      texto: 'Madera, azulejo y la cocina a la vista.',
      fotos: [
        { src: 'assets/img/local-entrada', ancho: 1400, alto: 1050, alt: 'Entrada del restaurante con barra de azulejo blanco, taburetes verdes, suelo de madera y ventanal a la calle' },
        { src: 'assets/img/local-comedor', ancho: 970, alto: 635, alt: 'Comedor con mesas de madera, sillas verdes con aspa y la cocina a la vista tras una cristalera' },
        { src: 'assets/img/local-fachada', ancho: 857, alto: 666, alt: 'Fachada del restaurante, con rótulo dorado y marcos verde agua' },
      ],
    },
    {
      id: 'platos',
      titulo: 'Platos',
      texto: 'Algunos de los platos que han pasado por nuestras mesas.',
      fotos: [
        { src: 'assets/img/plato-pasta', ancho: 1100, alto: 1467, alt: 'Pasta corta con salsa cremosa y yema de huevo, en un plato de rayas blancas y negras' },
        { src: 'assets/img/plato-pulpo', ancho: 1400, alto: 788, alt: 'Pulpo con salsa clara y pimentón en un plato blanco' },
        { src: 'assets/img/plato-carpaccio', ancho: 1100, alto: 1467, alt: 'Carpaccio con rúcula, lascas de queso y una reducción oscura' },
        { src: 'assets/img/plato-patatas', ancho: 1400, alto: 1050, alt: 'Plato con patatas, salsa y brotes morados' },
        { src: 'assets/img/plato-gyozas', ancho: 1100, alto: 1467, alt: 'Empanadillas con salsa en una fuente blanca alargada' },
        { src: 'assets/img/plato-pescado', ancho: 1314, alto: 1314, alt: 'Lomo de pescado con piel sobre verduras, con un hilo de salsa blanca alrededor' },
        { src: 'assets/img/plato-brotes', ancho: 1400, alto: 1050, alt: 'Plato relleno con salsa, cubierto de brotes morados' },
        { src: 'assets/img/plato-tomate', ancho: 1100, alto: 1467, alt: 'Tomate con queso y una reducción oscura en un plato blanco' },
        { src: 'assets/img/plato-pescado-oval', ancho: 1311, alto: 983, alt: 'Pescado con verduras en un plato ovalado, decorado con trazos de salsa' },
        { src: 'assets/img/plato-ensalada', ancho: 600, alto: 1334, alt: 'Ensalada de hojas y verduras en un plato blanco' },
      ],
    },
    {
      id: 'postres-y-vinos',
      titulo: 'Postres y vinos',
      texto: 'Para terminar sin prisa.',
      fotos: [
        { src: 'assets/img/postre-pizarra', ancho: 1400, alto: 630, alt: 'Postre servido sobre una pizarra negra con pequeños merengues' },
        { src: 'assets/img/plato-vino', ancho: 1100, alto: 1467, alt: 'Plato hondo en la mesa, con dos copas y una botella de vino tinto' },
        { src: 'assets/img/plato-carne', ancho: 1100, alto: 1467, alt: 'Carne guisada con guarnición, junto a una botella y una copa de vino tinto' },
      ],
    },
  ],
};
