```js
// ========================================
// CANTINA LOS CEBOLLITAS
// PÁGINA PÚBLICA
// ========================================

console.log("🍷 Cantina Los Cebollitas — página pública cargada.");


// ========================================
// ELEMENTOS PRINCIPALES
// ========================================

const nav = document.getElementById("nav");
const menuMobile = document.getElementById("menuMobile");

const anioActual = document.getElementById("anioActual");

const categorias = document.getElementById("categorias");
const productos = document.getElementById("productos");

const listaEventos = document.getElementById("listaEventos");

const hero = document.getElementById("inicio");


// ========================================
// AÑO AUTOMÁTICO DEL FOOTER
// ========================================

if (anioActual) {
    anioActual.textContent = new Date().getFullYear();
}


// ========================================
// MENÚ MOBILE
// ========================================

if (menuMobile && nav) {

    menuMobile.addEventListener("click", () => {

        const abierto =
            nav.classList.contains("activo");

        nav.classList.toggle("activo");

        menuMobile.setAttribute(
            "aria-expanded",
            String(!abierto)
        );

        menuMobile.setAttribute(
            "aria-label",
            abierto
                ? "Abrir menú"
                : "Cerrar menú"
        );

        menuMobile.textContent =
            abierto ? "☰" : "✕";

    });


    // Cerrar menú al seleccionar una sección

    nav.querySelectorAll("a").forEach((enlace) => {

        enlace.addEventListener("click", () => {

            nav.classList.remove("activo");

            menuMobile.setAttribute(
                "aria-expanded",
                "false"
            );

            menuMobile.setAttribute(
                "aria-label",
                "Abrir menú"
            );

            menuMobile.textContent = "☰";

        });

    });

}


// ========================================
// NAVEGACIÓN SUAVE
// ========================================

document.querySelectorAll('a[href^="#"]').forEach((enlace) => {

    enlace.addEventListener("click", (event) => {

        const destino =
            enlace.getAttribute("href");

        if (!destino || destino === "#") {
            event.preventDefault();
            return;
        }

        const seccion =
            document.querySelector(destino);

        if (!seccion) {
            return;
        }

        event.preventDefault();

        seccion.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

        history.replaceState(
            null,
            "",
            destino
        );

    });

});


// ========================================
// NAV ACTIVA SEGÚN LA SECCIÓN
// ========================================

const seccionesNavegables =
    document.querySelectorAll(
        "main > section[id]"
    );

const enlacesNav =
    document.querySelectorAll(
        ".nav a[href^='#']"
    );


if (
    seccionesNavegables.length &&
    enlacesNav.length
) {

    const observadorNav =
        new IntersectionObserver(
            (entradas) => {

                entradas.forEach((entrada) => {

                    if (!entrada.isIntersecting) {
                        return;
                    }

                    const id =
                        entrada.target.id;

                    enlacesNav.forEach((enlace) => {

                        const href =
                            enlace.getAttribute("href");

                        enlace.classList.toggle(
                            "activo",
                            href === `#${id}`
                        );

                    });

                });

            },
            {
                threshold: 0.35
            }
        );


    seccionesNavegables.forEach((seccion) => {

        observadorNav.observe(seccion);

    });

}


// ========================================
// EFECTO DEL HEADER AL HACER SCROLL
// ========================================

const header =
    document.querySelector(".header");


function actualizarHeader() {

    if (!header) {
        return;
    }

    if (window.scrollY > 30) {

        header.classList.add("scrolleado");

    } else {

        header.classList.remove("scrolleado");

    }

}


window.addEventListener(
    "scroll",
    actualizarHeader,
    { passive: true }
);

actualizarHeader();


// ========================================
// ANIMACIONES DE ENTRADA
// ========================================

const elementosAnimados =
    document.querySelectorAll(
        ".seccion-encabezado, " +
        ".sobre-imagen, " +
        ".sobre-contenido, " +
        ".resena-card, " +
        ".info-card, " +
        ".redes-club-contenido, " +
        ".footer-principal, " +
        ".eventos-contenedor, " +
        ".categorias-grid, " +
        ".productos-contenedor"
    );


if (elementosAnimados.length) {

    elementosAnimados.forEach((elemento) => {

        elemento.classList.add(
            "animar-entrada"
        );

    });


    const observadorAnimaciones =
        new IntersectionObserver(
            (entradas) => {

                entradas.forEach((entrada) => {

                    if (!entrada.isIntersecting) {
                        return;
                    }

                    entrada.target.classList.add(
                        "visible"
                    );

                    observadorAnimaciones.unobserve(
                        entrada.target
                    );

                });

            },
            {
                threshold: 0.12
            }
        );


    elementosAnimados.forEach((elemento) => {

        observadorAnimaciones.observe(
            elemento
        );

    });

}


// ========================================
// ESTILOS DE ANIMACIÓN DINÁMICOS
// ========================================

const estilosAnimacion =
    document.createElement("style");

estilosAnimacion.textContent = `

    .animar-entrada {
        opacity: 0;
        transform: translateY(28px);
        transition:
            opacity 0.7s ease,
            transform 0.7s ease;
    }

    .animar-entrada.visible {
        opacity: 1;
        transform: translateY(0);
    }

    .header.scrolleado {
        background: rgba(8, 8, 8, 0.96);
        box-shadow:
            0 10px 35px rgba(0, 0, 0, 0.28);
    }

    .nav a.activo {
        color: #ffffff;
    }

    .nav a.activo::after {
        width: 100%;
    }

`;

document.head.appendChild(
    estilosAnimacion
);


// ========================================
// EVENTO DESTACADO
// ========================================

const eventoDestacado =
    document.getElementById(
        "eventoDestacado"
    );

const botonCerrarEvento =
    document.getElementById(
        "cerrarEvento"
    );


// Esta función queda preparada para cuando
// el sistema de eventos de Supabase cargue
// un evento destacado.

function mostrarEventoDestacado(evento) {

    if (
        !eventoDestacado ||
        !evento
    ) {
        return;
    }

    const titulo =
        document.getElementById(
            "eventoTitulo"
        );

    const descripcion =
        document.getElementById(
            "eventoDescripcion"
        );

    const fecha =
        document.getElementById(
            "eventoFecha"
        );

    const hora =
        document.getElementById(
            "eventoHora"
        );

    const boton =
        document.getElementById(
            "eventoBoton"
        );


    if (titulo) {
        titulo.textContent =
            evento.titulo ||
            "¡DÍA DE PARTIDO!";
    }


    if (descripcion) {
        descripcion.textContent =
            evento.descripcion ||
            "Viví el partido junto al Bicho.";
    }


    if (fecha) {

        if (evento.fecha) {

            const fechaObjeto =
                new Date(
                    `${evento.fecha}T00:00:00`
                );

            if (!Number.isNaN(
                fechaObjeto.getTime()
            )) {

                fecha.textContent =
                    "📅 " +
                    fechaObjeto.toLocaleDateString(
                        "es-AR",
                        {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric"
                        }
                    );

            }

        }

    }


    if (hora) {

        hora.textContent =
            evento.hora
                ? `🕐 ${evento.hora}`
                : "🕐 Horario a confirmar";

    }


    if (boton) {

        boton.textContent =
            evento.botonTexto ||
            "RESERVAR MESA";


        if (evento.botonLink) {

            boton.href =
                evento.botonLink;

        }

    }


    // Imagen del evento

    const fondo =
        eventoDestacado.querySelector(
            ".evento-fondo"
        );


    if (
        fondo &&
        evento.imagen
    ) {

        fondo.style.backgroundImage =
            `url("${evento.imagen}")`;

        fondo.classList.add(
            "tiene-imagen"
        );

    }


    eventoDestacado.style.display = "";

    eventoDestacado.classList.remove(
        "cerrando"
    );

    eventoDestacado.classList.add(
        "visible"
    );

    eventoDestacado.setAttribute(
        "aria-hidden",
        "false"
    );

}


// ========================================
// CERRAR EVENTO DESTACADO
// ========================================

function ocultarEventoDestacado() {

    if (!eventoDestacado) {
        return;
    }

    eventoDestacado.classList.add(
        "cerrando"
    );

    eventoDestacado.setAttribute(
        "aria-hidden",
        "true"
    );


    setTimeout(() => {

        eventoDestacado.style.display =
            "none";

    }, 500);

}


if (
    botonCerrarEvento &&
    eventoDestacado
) {

    botonCerrarEvento.addEventListener(
        "click",
        ocultarEventoDestacado
    );

}


// ========================================
// ESC PARA CERRAR EVENTO
// ========================================

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape" &&
            eventoDestacado &&
            eventoDestacado.classList.contains(
                "visible"
            )
        ) {

            ocultarEventoDestacado();

        }

    }
);


// ========================================
// CATEGORÍAS DEL MENÚ
// ========================================

function prepararCategorias() {

    if (!categorias) {
        return;
    }


    // La información real podrá llegar
    // desde Supabase.


    categorias.addEventListener(
        "click",
        (event) => {

            const categoria =
                event.target.closest(
                    "[data-categoria]"
                );


            if (!categoria) {
                return;
            }


            categorias
                .querySelectorAll(
                    "[data-categoria]"
                )
                .forEach((elemento) => {

                    elemento.classList.remove(
                        "activo"
                    );

                    elemento.setAttribute(
                        "aria-selected",
                        "false"
                    );

                });


            categoria.classList.add(
                "activo"
            );

            categoria.setAttribute(
                "aria-selected",
                "true"
            );


            const categoriaId =
                categoria.dataset.categoria;

            console.log(
                "Categoría seleccionada:",
                categoriaId
            );


            // Punto de conexión para cargar
            // productos desde Supabase.

            document.dispatchEvent(
                new CustomEvent(
                    "categoriaSeleccionada",
                    {
                        detail: {
                            id: categoriaId
                        }
                    }
                )
            );

        }
    );

}


prepararCategorias();


// ========================================
// PRODUCTOS
// ========================================

function mostrarMensajeMenu(
    mensaje
) {

    if (!productos) {
        return;
    }

    productos.innerHTML = "";

    const elemento =
        document.createElement("p");

    elemento.className =
        "menu-mensaje";

    elemento.textContent =
        mensaje;

    productos.appendChild(
        elemento
    );

}


// ========================================
// EVENTOS
// ========================================

function prepararEventos() {

    if (!listaEventos) {
        return;
    }


    // Evitamos que quede una pantalla
    // vacía mientras Supabase carga.

    if (
        listaEventos.children.length === 0
    ) {

        const mensaje =
            document.createElement("p");

        mensaje.className =
            "cargando";

        mensaje.textContent =
            "Próximamente tendremos novedades.";

        listaEventos.appendChild(
            mensaje
        );

    }

}


prepararEventos();


// ========================================
// PARALLAX DEL HERO
// ========================================

const heroFondo =
    document.querySelector(
        ".hero-fondo"
    );


if (
    hero &&
    heroFondo &&
    window.matchMedia(
        "(min-width: 901px)"
    ).matches
) {

    hero.addEventListener(
        "mousemove",
        (event) => {

            const rect =
                hero.getBoundingClientRect();


            const x =
                (event.clientX - rect.left) /
                rect.width;


            const y =
                (event.clientY - rect.top) /
                rect.height;


            const movimientoX =
                (x - 0.5) * 8;


            const movimientoY =
                (y - 0.5) * 8;


            heroFondo.style.transform =
                `scale(1.04)
                 translate(
                    ${movimientoX}px,
                    ${movimientoY}px
                 )`;

        }
    );


    hero.addEventListener(
        "mouseleave",
        () => {

            heroFondo.style.transform =
                "scale(1.02) translate(0, 0)";

        }
    );

}


// ========================================
// EFECTO DE MOVIMIENTO SUAVE
// EN TARJETAS
// ========================================

document
    .querySelectorAll(
        ".resena-card, .info-card"
    )
    .forEach((tarjeta) => {

        tarjeta.addEventListener(
            "mousemove",
            (event) => {

                if (
                    window.innerWidth <= 650
                ) {
                    return;
                }


                const rect =
                    tarjeta.getBoundingClientRect();


                const x =
                    (event.clientX -
                        rect.left) /
                    rect.width;


                const y =
                    (event.clientY -
                        rect.top) /
                    rect.height;


                const rotacionX =
                    (0.5 - y) * 2;


                const rotacionY =
                    (x - 0.5) * 2;


                tarjeta.style.transform =
                    `translateY(-6px)
                     perspective(700px)
                     rotateX(${rotacionX}deg)
                     rotateY(${rotacionY}deg)`;

            }
        );


        tarjeta.addEventListener(
            "mouseleave",
            () => {

                tarjeta.style.transform =
                    "";

            }
        );

    });


// ========================================
// BOTÓN / LINKS EXTERNOS
// ========================================

document
    .querySelectorAll(
        'a[href^="http"]'
    )
    .forEach((enlace) => {

        enlace.setAttribute(
            "target",
            "_blank"
        );

        enlace.setAttribute(
            "rel",
            "noopener noreferrer"
        );

    });


// ========================================
// HASH INICIAL
// ========================================

window.addEventListener(
    "load",
    () => {

        const hash =
            window.location.hash;


        if (!hash) {
            return;
        }


        const seccion =
            document.querySelector(hash);


        if (!seccion) {
            return;
        }


        setTimeout(() => {

            seccion.scrollIntoView({
                behavior: "instant",
                block: "start"
            });

        }, 150);

    }
);


// ========================================
// EVENTOS PERSONALIZADOS
// ========================================

// Estas funciones/eventos permiten que,
// si tu supabase.js carga información,
// pueda comunicarse con este script
// sin tener que romper la estructura.


document.addEventListener(
    "eventoCargado",
    (event) => {

        if (
            event.detail
        ) {

            mostrarEventoDestacado(
                event.detail
            );

        }

    }
);


document.addEventListener(
    "productosCargados",
    (event) => {

        if (!event.detail) {
            return;
        }

        console.log(
            "Productos cargados:",
            event.detail
        );

    }
);


document.addEventListener(
    "categoriasCargadas",
    (event) => {

        if (!event.detail) {
            return;
        }

        console.log(
            "Categorías cargadas:",
            event.detail
        );

    }
);


// ========================================
// CARGA INICIAL
// ========================================

mostrarMensajeMenu(
    "Elegí una categoría para ver nuestros productos."
);


console.log(
    "✅ Navegación, menú mobile, animaciones, eventos y efectos cargados correctamente."
);
```
