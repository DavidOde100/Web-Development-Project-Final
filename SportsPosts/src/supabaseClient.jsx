import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://sugvnphedtpwwozhijmw.supabase.co';
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN1Z3ZucGhlZHRwd3dvemhpam13Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk4MzE2OTAsImV4cCI6MjAxNTQwNzY5MH0.jgPXJ45uUkTLV4S2hkispBbYOPQJsSoIqYgQVp9eoSg';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default supabase;