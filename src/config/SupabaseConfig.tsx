import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_REFERENCE_ID as string,
  process.env.SUPABASE_PRIVATE_KEY as string
);

export default supabase;
