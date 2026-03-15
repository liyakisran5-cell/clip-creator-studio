import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://erknllyrpwygvgomsbyw.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVya25sbHlycHd5Z3Znb21zYnl3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM1NTU2MjcsImV4cCI6MjA4OTEzMTYyN30.bWV5NPt4RYEOZt7yZ4EBE9b18NXk6Y-Z_GrcMnyvm5c';

export const isSupabaseConfigured = true;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type { User, Session } from '@supabase/supabase-js';
