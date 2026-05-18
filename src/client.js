import { createClient } from '@supabase/supabase-js';

// TODO: Replace with your actual Supabase URL and API Key
const URL = import.meta.env.VITE_SUPABASE_URL;
const API_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(URL, API_KEY);
