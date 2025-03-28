import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://vwnafpgydigehxprcvpx.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ3bmFmcGd5ZGlnZWh4cHJjdnB4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMxMTAxNzEsImV4cCI6MjA1ODY4NjE3MX0.K3OlSLCOBL3_TZCWzyo42ghgB_mAjGg0GnZn1DJVN0o";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
