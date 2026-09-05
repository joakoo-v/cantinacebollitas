// ========================================
// PÁGINA PÚBLICA
// ========================================

console.log("Página pública cargada correctamente.");


// ========================================
// ELEMENTOS
// ========================================

const contenedor = document.getElementById("contenido");

const secciones = document.querySelectorAll(".panel");

const enlacesNav = document.querySelectorAll(".main-nav a");


// ========================================
// NAVEGACIÓN HORIZONTAL
// ========================================

enlacesNav.forEach((enlace) => {

    enlace.addEventListener("click", (event) => {

        const destino = enlace.getAttribute("href");

        if (!destino || !destino.startsWith("#")) {
            return;
        }

        const seccion = document.querySelector(destino);

        if (!seccion) {
            return;
        }

        event.preventDefault();

        seccion.scrollIntoView({
            behavior: "smooth",
            inline: "start",
            block: "nearest"
        });

        history.replaceState(null, "", destino);
    });

});


// ========================================
// SECCIÓN ACTIVA
// ========================================

const observadorSecciones = new IntersectionObserver(
    (entradas) => {

        entradas.forEach((entrada) => {

            if (!entrada.isIntersecting) {
                return;
            }

            const id = entrada.target.id;

            enlacesNav.forEach((enlace) => {

                const activo =
                    enlace.getAttribute("href") === `#${id}`;

                enlace.classList.toggle(
                    "activo",
                    activo
                );

            });

        });

    },
    {
        root: contenedor,
        threshold: 0.65
    }
);


secciones.forEach((seccion) => {
    observadorSecciones.observe(seccion);
});


// ========================================
// ANIMACIÓN DE ELEMENTOS
// ========================================

const elementosAnimados = document.querySelectorAll(
    ".section-heading, .menu-card, .evento-destacado, .reservation-card, .nosotros-content, .nosotros-visual, .footer-main"
);


elementosAnimados.forEach((elemento) => {

    elemento.style.opacity = "0";

    elemento.style.transform =
        "translateY(30px)";

    elemento.style.transition =
        "opacity 700ms cubic-bezier(.16,1,.3,1), transform 700ms cubic-bezier(.16,1,.3,1)";

});


const observadorAnimaciones = new IntersectionObserver(
    (entradas) => {

        entradas.forEach((entrada) => {

            if (!entrada.isIntersecting) {
                return;
            }

            entrada.target.style.opacity = "1";

            entrada.target.style.transform =
                "translateY(0)";

            observadorAnimaciones.unobserve(
                entrada.target
            );

        });

    },
    {
        root: contenedor,
        threshold: 0.15
    }
);


elementosAnimados.forEach((elemento) => {
    observadorAnimaciones.observe(elemento);
});


// ========================================
// EVENTO DESTACADO
// ========================================

const botonCerrarEvento =
    document.getElementById("cerrarEvento");

const eventoDestacado =
    document.getElementById("eventoDestacado");


if (botonCerrarEvento && eventoDestacado) {

    botonCerrarEvento.addEventListener(
        "click",
        () => {

            eventoDestacado.style.opacity = "0";

            eventoDestacado.style.transform =
                "translateY(-10px) scale(.98)";

            eventoDestacado.style.pointerEvents =
                "none";

            eventoDestacado.setAttribute(
                "aria-hidden",
                "true"
            );

        }
    );

}


// ========================================
// EFECTO PARALLAX SUAVE EN HERO
// ========================================

const hero = document.getElementById("inicio");

const heroVisual =
    document.querySelector(".hero-visual");


if (
    hero &&
    heroVisual &&
    window.matchMedia("(min-width: 651px)").matches
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
                (x - 0.5) * 14;

            const movimientoY =
                (y - 0.5) * 14;

            heroVisual.style.transform =
                `translate(${movimientoX}px, ${movimientoY}px)`;
        }
    );


    hero.addEventListener(
        "mouseleave",
        () => {

            heroVisual.style.transform =
                "translate(0, 0)";
        }
    );

}


// ========================================
// LOG
// ========================================

console.log(
    "Animaciones y navegación cargadas correctamente."
);
