import { supabase } from "./supabase";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export async function apiFetch(path, options = {}) {
  // TODO: Hent session med getSession(), og gem access_token i en variabel, token.
const { data: { session }} = await supabase.auth.getSession();
const token = session?.access_token;

  // TODO: Lav et headers-objekt med headers fra options og apikey.
const headers = {
    ...options.headers,
    apikey: supabaseAnonKey,
}
  
  // TODO: Sæt Authorization på headers, men kun hvis der er et token.
if(token){
     headers.Authorization = `Bearer ${token}`;
}

  // TODO: Kald fetch() med supabaseUrl + path og options med dine headers. Returnér svaret.
  return fetch(`${supabaseUrl}${path}`, { ...options, headers });
}