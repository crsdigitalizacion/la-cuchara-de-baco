/* Pinta en la página los datos de config.js. No hay que tocar este archivo
   para actualizar menús, precios, horarios o fotos. */
(function () {
  'use strict';

  const datos = window.CUCHARA;
  const PLATOS_POR_SECCION = 2;
  const todos = (selector, raiz = document) => [...raiz.querySelectorAll(selector)];

  function crear(etiqueta, clase, texto) {
    const el = document.createElement(etiqueta);
    if (clase) el.className = clase;
    if (texto != null) el.textContent = texto;
    return el;
  }

  /* Datos de contacto ---------------------------------------------------- */
  function pintarContacto() {
    const { telefono, direccion, enlaces } = datos;
    todos('[data-tel]').forEach((a) => { a.href = 'tel:' + telefono.enlace; });
    todos('[data-tel-texto]').forEach((a) => { a.textContent = telefono.visible; });
    todos('[data-reservar]').forEach((a) => {
      a.href = enlaces.reservas || 'tel:' + telefono.enlace;
    });
    todos('[data-calle]').forEach((el) => { el.textContent = direccion.calle; });
    todos('[data-cp]').forEach((el) => { el.textContent = direccion.codigoPostal; });
    todos('[data-ciudad]').forEach((el) => { el.textContent = direccion.ciudad; });
    todos('[data-region]').forEach((el) => { el.textContent = direccion.region; });
    todos('[data-mapa]').forEach((a) => {
      a.href = enlaces.mapa;
      a.target = '_blank';
      a.rel = 'noopener';
    });
    todos('[data-instagram]').forEach((a) => {
      a.href = enlaces.instagram;
      a.target = '_blank';
    });
    const firma = document.querySelector('[data-firma]');
    if (firma) {
      firma.textContent = datos.firma || '';
      firma.hidden = !datos.firma;
    }
    todos('[data-aviso-legal]').forEach((a) => { a.href = enlaces.avisoLegal; });
    todos('[data-privacidad]').forEach((a) => { a.href = enlaces.privacidad; });
  }

  // En ordenador una llamada no lleva a ningún sitio: esos botones van a la reserva.
  function adaptarBotonesLlamar() {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    todos('[data-llamar]').forEach((a) => {
      a.href = datos.enlaces.reservas;
      a.textContent = 'Reservar mesa';
    });
  }

  // De momento el formulario es solo de vista: no guarda ni envía nada.
  function prepararReserva() {
    const formulario = document.querySelector('[data-reserva]');
    if (!formulario) return;
    const fecha = formulario.querySelector('[data-reserva-fecha]');
    const hoy = new Date();
    hoy.setMinutes(hoy.getMinutes() - hoy.getTimezoneOffset());
    fecha.min = hoy.toISOString().slice(0, 10);
    formulario.addEventListener('submit', (evento) => {
      evento.preventDefault();
      const aviso = formulario.querySelector('[data-reserva-aviso]');
      aviso.textContent = `Demostración: esta reserva no se ha enviado. Para reservar, llama al ${datos.telefono.visible}.`;
      aviso.hidden = false;
    });
  }

  function pintarDistincion() {
    const el = document.querySelector('[data-distincion]');
    const { distincion } = datos;
    if (!el || !distincion) return;
    el.hidden = false;
    const enlace = crear('a', null, distincion.texto);
    enlace.href = distincion.url;
    enlace.target = '_blank';
    enlace.rel = 'noopener';
    el.append(enlace);
    if (distincion.cita) {
      el.append(crear('span', 'casa__cita', `«${distincion.cita}», dice ${distincion.fuente}.`));
    }
  }

  function pintarDestacados() {
    const caja = document.querySelector('[data-destacados]');
    if (!caja) return;
    datos.destacados.forEach((plato, i) => {
      const enlace = crear('a', 'destacado');
      enlace.href = 'menus.html#carta';
      const marco = crear('span', 'destacado__foto');
      const img = crear('img');
      img.src = rutaFoto(plato, 1200);
      img.srcset = `${rutaFoto(plato, 640)} 640w, ${rutaFoto(plato, 1200)} 1200w`;
      img.sizes = i === 0 ? '(min-width: 62rem) 50vw, 100vw' : '(min-width: 62rem) 25vw, 50vw';
      img.alt = plato.alt;
      img.loading = 'lazy';
      img.decoding = 'async';
      marco.append(img);
      enlace.append(marco, crear('strong', null, plato.nombre), crear('span', 'destacado__detalle', plato.detalle));
      caja.append(enlace);
    });
  }

  function pintarOpiniones() {
    const caja = document.querySelector('[data-opiniones]');
    if (!caja) return;
    const nota = document.querySelector('[data-valoracion]');
    if (nota && datos.valoracion) {
      nota.hidden = false;
      nota.append(crear('strong', null, datos.valoracion.nota), crear('span', null, datos.valoracion.texto));
    }
    datos.opiniones.forEach(({ cita, fuente, url }) => {
      const figura = crear('figure', 'opinion');
      figura.append(crear('blockquote', null, `«${cita}»`));
      const pie = crear('figcaption');
      if (url) {
        const enlace = crear('a', null, fuente);
        enlace.href = url;
        enlace.target = '_blank';
        enlace.rel = 'noopener';
        pie.append(enlace);
      } else {
        pie.textContent = fuente;
      }
      figura.append(pie);
      caja.append(figura);
    });
  }

  function pintarHorario() {
    const caja = document.querySelector('[data-horario]');
    if (!caja || !datos.horario) return;
    const lista = crear('dl');
    datos.horario.forEach(({ dias, horas }) => {
      lista.append(crear('dt', null, dias), crear('dd', null, horas));
    });
    caja.querySelector('p').replaceWith(lista);
  }

  /* Fotos ---------------------------------------------------------------- */
  function rutaFoto(foto, ancho) {
    return foto.archivo || `${foto.src}-${ancho}.webp`;
  }

  function pintarFachada() {
    const img = document.querySelector('[data-fachada]');
    if (!img) return;
    if (!datos.fachada) {
      img.remove();
      return;
    }
    img.src = datos.fachada.src;
    img.alt = datos.fachada.alt;
  }

  function pintarFoto(foto, sizes) {
    const boton = crear('button', 'foto');
    boton.type = 'button';
    boton.setAttribute('aria-label', `Ampliar: ${foto.alt}`);
    const img = crear('img');
    img.src = rutaFoto(foto, 1200);
    img.srcset = `${rutaFoto(foto, 640)} 640w, ${rutaFoto(foto, 1200)} 1200w`;
    img.sizes = sizes;
    img.alt = '';
    img.width = foto.ancho;
    img.height = foto.alto;
    img.loading = 'lazy';
    img.decoding = 'async';
    boton.append(img);
    return boton;
  }

  function pintarGaleria() {
    const caja = document.querySelector('[data-galeria]');
    if (!caja) return;
    const todas = [];
    const saltos = document.querySelector('[data-galeria-saltos]');

    datos.galeria.forEach((seccion) => {
      const salto = crear('a', 'boton boton--linea-clara', seccion.titulo);
      salto.href = `#${seccion.id}`;
      saltos.append(salto);

      const bloque = crear('section', 'album');
      bloque.id = seccion.id;
      const titulo = crear('h2', null, seccion.titulo);
      titulo.id = `titulo-${seccion.id}`;
      bloque.setAttribute('aria-labelledby', titulo.id);
      bloque.append(titulo, crear('p', 'album__texto', seccion.texto));

      const fotos = crear('div', `fotos fotos--${seccion.id}`);
      const sizes = seccion.id === 'platos' ? '(min-width: 62rem) 32vw, 50vw' : '(min-width: 62rem) 66vw, 100vw';
      seccion.fotos.forEach((foto) => {
        const posicion = todas.push(foto) - 1;
        const boton = pintarFoto(foto, sizes);
        boton.addEventListener('click', () => abrirVisor(todas, posicion));
        fotos.append(boton);
      });
      bloque.append(fotos);
      caja.append(bloque);
    });
    prepararVisor(todas);
  }

  function abrirVisor(fotos, posicion) {
    const visor = document.querySelector('[data-visor]');
    mostrarEnVisor(fotos, posicion);
    if (!visor.open) visor.showModal();
  }

  function mostrarEnVisor(fotos, posicion) {
    const visor = document.querySelector('[data-visor]');
    const actual = (posicion + fotos.length) % fotos.length;
    visor.dataset.posicion = actual;
    const foto = fotos[actual];
    const img = visor.querySelector('[data-visor-img]');
    img.src = rutaFoto(foto, 1200);
    img.alt = foto.alt;
    visor.querySelector('[data-visor-pie]').textContent = foto.alt;
    visor.querySelector('[data-visor-cuenta]').textContent = `${actual + 1} de ${fotos.length}`;
  }

  function prepararVisor(fotos) {
    const visor = document.querySelector('[data-visor]');
    const pasar = (paso) => mostrarEnVisor(fotos, Number(visor.dataset.posicion) + paso);
    visor.querySelectorAll('[data-visor-paso]').forEach((boton) => {
      boton.addEventListener('click', () => pasar(Number(boton.dataset.visorPaso)));
    });
    visor.addEventListener('keydown', (evento) => {
      if (evento.key === 'ArrowLeft') pasar(-1);
      if (evento.key === 'ArrowRight') pasar(1);
    });
    // Pulsar fuera de la foto también cierra.
    visor.addEventListener('click', (evento) => {
      if (evento.target === visor || evento.target.classList.contains('visor__foto')) visor.close();
    });
  }

  /* Menús ---------------------------------------------------------------- */
  function pintarPlato(plato) {
    const item = crear('li');
    const { nombre, detalle, precio } = typeof plato === 'string' ? { nombre: plato } : plato;
    item.append(crear('span', 'plato__nombre', nombre));
    if (detalle) item.append(crear('span', 'plato__detalle', detalle));
    if (precio) item.append(crear('span', 'plato__precio', precio));
    return item;
  }

  function pintarCurso(seccion) {
    const curso = crear('section', 'curso');
    curso.append(crear('h3', 'curso__titulo', seccion.titulo));
    if (seccion.platos.length) {
      const lista = crear('ul');
      seccion.platos.forEach((plato) => lista.append(pintarPlato(plato)));
      curso.append(lista);
    } else {
      curso.append(crear('p', 'hueco', '[Platos — actualizar con el cliente]'));
    }
    return curso;
  }

  function pintarPieHoja(menu) {
    const pie = crear('div', 'hoja__pie');
    if (menu.precio) {
      pie.append(crear('p', 'hoja__precio', menu.precio));
    } else if (!menu.sinPrecio) {
      pie.append(crear('p', 'hueco', '[Precio — actualizar con el cliente]'));
    }
    [menu.nota, menu.cuando].filter(Boolean).forEach((texto) => {
      pie.append(crear('p', 'hoja__nota', texto));
    });
    if (menu.actualizado) pie.append(crear('p', 'hoja__nota', `Actualizado: ${menu.actualizado}`));
    if (menu.imagen) {
      const enlace = crear('a', 'hoja__carta');
      enlace.href = menu.imagen.src;
      enlace.target = '_blank';
      enlace.rel = 'noopener';
      const img = crear('img');
      img.src = menu.imagen.src;
      img.alt = menu.imagen.alt;
      img.loading = 'lazy';
      enlace.append(img);
      const bajar = crear('a', 'boton boton--linea', 'Descargar la carta');
      bajar.href = menu.imagen.src;
      bajar.download = '';
      pie.append(enlace, bajar);
    }
    pie.append(crear('p', 'hoja__nota', 'Si tienes alguna alergia o intolerancia, avísanos al reservar.'));
    return pie;
  }

  function pintarMenus() {
    const caja = document.querySelector('[data-menus]');
    if (!caja) return;
    caja.replaceChildren();
    datos.menus.forEach((menu, indice) => {
      const posicion = ['primera', 'segunda'][indice] || 'carta';
      const hoja = crear('article', `hoja hoja--${posicion}`);
      hoja.id = menu.id;
      hoja.setAttribute('aria-labelledby', `titulo-${menu.id}`);

      const cabeza = crear('header', 'hoja__cabeza');
      const titulo = crear('h2', null, menu.nombre);
      titulo.id = `titulo-${menu.id}`;
      cabeza.append(titulo, crear('p', null, menu.descripcion));

      const cuerpo = crear('div', 'hoja__cuerpo');
      if (menu.aviso) cuerpo.append(crear('p', 'hueco', menu.aviso));
      if (menu.mensaje) cuerpo.append(crear('p', 'hoja__mensaje', menu.mensaje));
      const cursos = crear('div', 'hoja__cursos');
      menu.secciones.forEach((seccion) => cursos.append(pintarCurso(seccion)));
      cuerpo.append(cursos);
      cuerpo.append(pintarPieHoja(menu));

      hoja.append(cabeza, cuerpo);
      caja.append(hoja);
    });
  }

  /* Fondo de la portada: la primera foto ya está en el HTML; el resto se añade
     después para no retrasar la carga. Sin movimiento o con ahorro de datos,
     se queda la primera. ------------------------------------------------- */
  function pintarFondo() {
    const fondo = document.querySelector('[data-fondo]');
    if (!fondo) return;
    const quieto = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (quieto || navigator.connection?.saveData) return;
    datos.fondo.slice(1).forEach((foto, i) => {
      const imagen = crear('picture', `fondo__foto fondo__foto--${i + 2}`);
      const movil = crear('source');
      movil.media = '(max-aspect-ratio: 1/1)';
      movil.srcset = foto.movil;
      const img = crear('img');
      img.src = foto.escritorio;
      img.alt = '';
      imagen.append(movil, img);
      fondo.append(imagen);
    });
  }

  /* Cada página empieza arriba, también al recargar o con el botón Atrás. Solo
     los enlaces a un punto concreto, como Reservar, llevan hasta ese punto. */
  function situarAlEntrar() {
    const destino = location.hash && document.querySelector(location.hash);
    if (destino) destino.scrollIntoView({ behavior: 'instant' });
    else window.scrollTo({ top: 0, behavior: 'instant' });
  }

  function prepararScroll() {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    situarAlEntrar();
    window.addEventListener('pageshow', (evento) => {
      if (evento.persisted) situarAlEntrar();
    });
    // Pulsar la página en la que ya estás sube arriba sin recargarla.
    todos('a[aria-current="page"]').forEach((enlace) => {
      enlace.addEventListener('click', (evento) => {
        evento.preventDefault();
        history.replaceState(null, '', location.pathname + location.search);
        window.scrollTo({ top: 0 });
      });
    });
  }

  /* Entrada de la portada. El temporizador es el seguro: pase lo que pase con la
     animación, la entrada desaparece y nunca bloquea la página. */
  function cerrarEntrada() {
    const entrada = document.querySelector('[data-entrada]');
    if (!entrada) return;
    const cerrar = () => {
      entrada.remove();
      document.documentElement.classList.remove('con-entrada');
    };
    entrada.addEventListener('click', cerrar);
    window.addEventListener('keydown', cerrar, { once: true });
    window.setTimeout(cerrar, 1100);
  }

  /* Las fotos aparecen al llegar a ellas. Sin soporte o pidiendo menos movimiento,
     se ven directamente. */
  function prepararApariciones() {
    const quieto = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (quieto || !('IntersectionObserver' in window)) return;
    const fotos = todos('.destacado, .historia__foto, .foto');
    if (!fotos.length) return;
    const observador = new IntersectionObserver((entradas) => {
      entradas.filter((e) => e.isIntersecting).forEach((e) => {
        e.target.classList.add('visible');
        observador.unobserve(e.target);
      });
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.08 });
    fotos.forEach((foto, i) => {
      foto.classList.add('aparece');
      foto.style.setProperty('--retraso', `${(i % 3) * 70}ms`);
      observador.observe(foto);
    });
  }

  /* SEO local ------------------------------------------------------------ */
  function pintarDatosEstructurados() {
    const { nombre, telefono, direccion, enlaces, dominio, horarioDatos } = datos;
    const ficha = {
      '@context': 'https://schema.org',
      '@type': 'Restaurant',
      name: nombre,
      telephone: telefono.enlace,
      address: {
        '@type': 'PostalAddress',
        streetAddress: direccion.calle,
        postalCode: direccion.codigoPostal,
        addressLocality: direccion.ciudad,
        addressRegion: direccion.region,
        addressCountry: direccion.pais,
      },
      hasMap: enlaces.mapa,
      sameAs: [enlaces.instagram],
      servesCuisine: 'Cocina tradicional',
      acceptsReservations: true,
    };
    if (horarioDatos) {
      ficha.openingHoursSpecification = horarioDatos.map(({ dias, abre, cierra }) => ({
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: dias,
        opens: abre,
        closes: cierra,
      }));
    }
    if (dominio) {
      ficha.url = dominio;
      ficha.hasMenu = `${dominio}/menus.html`;
    }
    const script = crear('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(ficha);
    document.head.append(script);
  }

  pintarContacto();
  adaptarBotonesLlamar();
  prepararReserva();
  pintarDistincion();
  pintarDestacados();
  pintarOpiniones();
  pintarHorario();
  pintarFachada();
  pintarGaleria();
  pintarMenus();
  pintarDatosEstructurados();
  pintarFondo();
  prepararApariciones();
  cerrarEntrada();
  prepararScroll();
})();
