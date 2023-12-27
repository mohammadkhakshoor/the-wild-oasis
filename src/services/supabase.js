import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://zglvcunhukakbjlqdheq.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpnbHZjdW5odWtha2JqbHFkaGVxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDIzMDkzMDQsImV4cCI6MjAxNzg4NTMwNH0.54Xd0ol6m8QZyjgcrSjWjRNGBiBFNX4S6OUjJ7AN2kk";
const supabase = createClient(supabaseUrl, supabaseKey);
export { supabaseUrl };
export default supabase;
