import { createClient } from '@supabase/supabase-js';

// TODO: Replace with your actual Supabase URL and API Key
const URL = 'insert your Project URL here';
const API_KEY = 'insert your Project API key here';

export const supabase = createClient(URL, API_KEY);
