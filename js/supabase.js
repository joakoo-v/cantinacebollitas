// ========================================
// CONFIGURACIÓN DE SUPABASE
// ========================================

const SUPABASE_URL = "https://hmksgznuavtwwpsqqwms.supabase.co";

const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_bTDBF4tTHtI2XhVHoTMK9g_zuhOwi9S";

// Cliente de Supabase
const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
);

console.log("Supabase conectado:", supabaseClient);
export { supabaseClient };
