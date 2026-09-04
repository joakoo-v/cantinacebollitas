// ========================================
// PANEL DE ADMINISTRACIÓN
// ========================================

import { supabaseClient } from "./supabase.js";

// ========================================
// ELEMENTOS DEL HTML
// ========================================

const formLogin = document.getElementById("formLogin");
const mensajeLogin = document.getElementById("mensajeLogin");

const loginSection = document.getElementById("login");
const panelSection = document.getElementById("panel");

const usuarioActual = document.getElementById("usuarioActual");
const btnCerrarSesion = document.getElementById("btnCerrarSesion");

// ========================================
// MOSTRAR LOGIN
// ========================================

function mostrarLogin() {
    loginSection.hidden = false;
    panelSection.hidden = true;

    usuarioActual.textContent = "";
}

// ========================================
// MOSTRAR PANEL
// ========================================

function mostrarPanel(usuario) {
    loginSection.hidden = true;
    panelSection.hidden = false;

    usuarioActual.textContent =
        `Sesión iniciada como: ${usuario.email}`;

    mensajeLogin.textContent = "";
}

// ========================================
// INICIAR SESIÓN
// ========================================

formLogin.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    mensajeLogin.textContent = "Iniciando sesión...";

    const { data, error } =
        await supabaseClient.auth.signInWithPassword({
            email,
            password
        });

    if (error) {
        console.error("Error al iniciar sesión:", error);

        mensajeLogin.textContent =
            "Correo o contraseña incorrectos.";

        return;
    }

    mostrarPanel(data.user);
});

// ========================================
// CERRAR SESIÓN
// ========================================

btnCerrarSesion.addEventListener("click", async () => {

    const { error } =
        await supabaseClient.auth.signOut();

    if (error) {
        console.error("Error al cerrar sesión:", error);
        return;
    }

    mostrarLogin();
    formLogin.reset();
});

// ========================================
// COMPROBAR SESIÓN AL CARGAR
// ========================================

async function comprobarSesion() {

    const { data, error } =
        await supabaseClient.auth.getSession();

    if (error) {
        console.error(
            "Error al comprobar sesión:",
            error
        );

        mostrarLogin();
        return;
    }

    if (data.session?.user) {
        mostrarPanel(data.session.user);
    } else {
        mostrarLogin();
    }
}

// ========================================
// ESCUCHAR CAMBIOS DE SESIÓN
// ========================================

supabaseClient.auth.onAuthStateChange(
    (event, session) => {

        if (session?.user) {
            mostrarPanel(session.user);
        } else {
            mostrarLogin();
        }
    }
);

// ========================================
// INICIAR
// ========================================

comprobarSesion();

console.log(
    "Panel de administración cargado correctamente."
);
