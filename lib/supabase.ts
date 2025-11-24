import { createClient } from '@supabase/supabase-js';

// We use the Service Role Key for the backend API to bypass RLS (Row Level Security)
// This ensures our API routes can always read/write data.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
    throw new Error("Missing Supabase URL or Service Role Key");
}

export const supabase = createClient(supabaseUrl, supabaseKey);
