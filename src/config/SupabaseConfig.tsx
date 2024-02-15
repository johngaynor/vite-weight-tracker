import { createClient } from "@supabase/supabase-js";

const url: string = import.meta.env.VITE_SUPABASE_URL;
const serviceKey: string = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(url, serviceKey);

export default supabase;
