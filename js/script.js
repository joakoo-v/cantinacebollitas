```js
// ========================================
// PÁGINA PÚBLICA — LOS CEBOLLITAS
// ========================================

console.log("Página pública cargada correctamente.");


// ========================================
// ELEMENTOS
// ========================================

const contenedor = document.getElementById("contenido");
const secciones = document.querySelectorAll(".panel");
const enlacesNav = document.querySelectorAll(".main-nav a");


// ========================================
// NAVEGACIÓN
// ========================================

function irASeccion(destino) {
    if (!destino || !destino.startsWith("#")) {
        return;
    }

    const seccion = document.querySelector(destino);

    if (!seccion) {
        return;
    }

    seccion.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start"
    });

    history.replaceState(null, "", destino);
}


document.querySelectorAll('a[href^="#"]').forEach((enlace) => {

    enlace.addEventListener("click", (event) => {

        const destino = enlace.getAttribute("href");

        if (!destino || destino === "#") {
            event.preventDefault();
            return;
        }

        const seccion = document.querySelector(destino);

        if (!seccion) {
            return;
        }

        event.preventDefault();

        irASeccion(destino);

    });

});


// ========================================
// SECCIÓN ACTIVA EN LA NAV
// ========================================

if (contenedor && secciones.length && enlacesNav.length) {

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

                    enlace.classList.toggle("activo", activo);

                });

            });

        },
        {
            root: contenedor,
            threshold: 0.55
        }
    );


    secciones.forEach((seccion) => {
        observadorSecciones.observe(seccion);
    });

}


// ========================================
// ANIMACIONES DE ENTRADA
// ========================================

const elementosAnimados = document.querySelectorAll(
    ".section-heading, " +
    ".menu-card, " +
    ".evento-destacado, " +
    ".reservation-card, " +
    ".nosotros-content, " +
    ".nosotros-visual, " +
    ".footer-main"
);


if (elementosAnimados.length) {

    elementosAnimados.forEach((elemento) => {

        elemento.classList.add("animar-entrada");

    });


    const observadorAnimaciones = new IntersectionObserver(
        (entradas) => {

            entradas.forEach((entrada) => {

                if (!entrada.isIntersecting) {
                    return;
                }

                entrada.target.classList.add("visible");

                observadorAnimaciones.unobserve(
                    entrada.target
                );

            });

        },
        {
            root: contenedor,
            threshold: 0.12
        }
    );


    elementosAnimados.forEach((elemento) => {
        observadorAnimaciones.observe(elemento);
    });

}


// ========================================
// EVENTO DESTACADO
// ========================================

const botonCerrarEvento =
    document.getElementById("cerrarEvento");

const eventoDestacado =
    document.getElementById("eventoDestacado");


if (botonCerrarEvento && eventoDestacado) {

    botonCerrarEvento.addEventListener("click", () => {

        eventoDestacado.classList.add("cerrando");

        eventoDestacado.setAttribute(
            "aria-hidden",
            "true"
        );

        setTimeout(() => {

            eventoDestacado.style.display = "none";

        }, 500);

    });

}


// ========================================
// PARALLAX DEL HERO
// ========================================

const hero = document.getElementById("inicio");
const heroVisual = document.querySelector(".hero-visual");


if (
    hero &&
    heroVisual &&
    window.matchMedia("(min-width: 651px)").matches
) {

    hero.addEventListener("mousemove", (event) => {

        const rect = hero.getBoundingClientRect();

        const x =
            (event.clientX - rect.left) /
            rect.width;

        const y =
            (event.clientY - rect.top) /
            rect.height;

        const movimientoX =
            (x - 0.5) * 12;

        const movimientoY =
            (y - 0.5) * 12;

        heroVisual.style.transform =
            `translate(${movimientoX}px, ${movimientoY}px)`;

    });


    hero.addEventListener("mouseleave", () => {

        heroVisual.style.transform =
            "translate(0, 0)";

    });

}


// ========================================
// SOPORTE PARA EL SCROLL HORIZONTAL
// ========================================

if (contenedor) {

    let desplazando = false;

    contenedor.addEventListener(
        "wheel",
        (event) => {

            // En pantallas grandes convertimos
            // la rueda vertical en desplazamiento horizontal.
            if (
                window.matchMedia("(min-width: 901px)").matches &&
                Math.abs(event.deltaY) > Math.abs(event.deltaX)
            ) {

                event.preventDefault();

                if (desplazando) {
                    return;
                }

                desplazando = true;

                contenedor.scrollBy({
                    left: event.deltaY,
                    behavior: "smooth"
                });

                setTimeout(() => {
                    desplazando = false;
                }, 350);

            }

        },
        { passive: false }
    );

}


// ========================================
// BOTONES DEL MENÚ
// ========================================

document.querySelectorAll(".menu-card").forEach((tarjeta) => {

    tarjeta.addEventListener("click", () => {

        const titulo =
            tarjeta.querySelector("h3")?.textContent;

        if (titulo) {
            console.log(`Categoría seleccionada: ${titulo}`);
        }

    });

});


// ========================================
// CARGA INICIAL
// ========================================

window.addEventListener("load", () => {

    const hash = window.location.hash;

    if (hash) {

        const seccion =
            document.querySelector(hash);

        if (seccion) {

            setTimeout(() => {

                seccion.scrollIntoView({
                    behavior: "instant",
                    block: "nearest",
                    inline: "start"
                });

            }, 100);

        }

    }

});


console.log(
    "Navegación, animaciones y efectos cargados correctamente."
);
```
