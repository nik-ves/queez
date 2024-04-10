import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://fwuycbgfprygjnwjpojr.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ3dXljYmdmcHJ5Z2pud2pwb2pyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI3NzU4MzIsImV4cCI6MjAyODM1MTgzMn0.TuxgNWChTKnOPkiDYO8TPviEn2qv627u7OfPDbJVAPo";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
