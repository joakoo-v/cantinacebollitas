// ========================================
// PANEL DE ADMINISTRACIÓN
// ========================================

import { supabaseClient } from "./supabase.js";

// Elementos del HTML
const formLogin = document.getElementById("formLogin");
const mensajeLogin = document.getElementById("mensajeLogin");
const loginSection = document.getElementById("login");
const panelSection = document.getElementById("panel");
const usuarioActual = document.getElementById("usuarioActual");
const btnCerrarSesion = document.getElementById("btnCerrarSesion");

// ========================================
// INICIAR SESIÓN
// ========================================

formLogin.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    mensajeLogin.textContent = "Iniciando sesión...";

    const { data, error } = await supabaseClient.auth.signInWithPassword({
        email,
        password
    });

    if (error) {
        console.error("Error al iniciar sesión:", error);
        mensajeLogin.textContent = "Correo o contraseña incorrectos.";
        return;
    }

    mostrarPanel(data.user);
});

// ========================================
// MOSTRAR PANEL
// ========================================

function mostrarPanel(usuario) {
    loginSection.hidden = true;
    panelSection.hidden = false;

    usuarioActual.textContent = `Sesión iniciada como: ${usuario.email}`;
    mensajeLogin.textContent = "";
}

// ========================================
// CERRAR SESIÓN
// ========================================

btnCerrarSesion.addEventListener("click", async () => {
    const { error } = await supabaseClient.auth.signOut();

    if (error) {
        console.error("Error al cerrar sesión:", error);
        return;
    }

    panelSection.hidden = true;
    loginSection.hidden = false;

    formLogin.reset();
    mensajeLogin.textContent = "";
});

// ========================================
// COMPROBAR SESIÓN EXISTENTE
// ========================================

async function comprobarSesion() {
    const { data, error } = await supabaseClient.auth.getSession();

    if (error) {
        console.error("Error al comprobar sesión:", error);
        return;
    }

    if (data.session?.user) {
        mostrarPanel(data.session.user);
    }
}

comprobarSesion();

console.log("Panel de administración cargado correctamente.");
