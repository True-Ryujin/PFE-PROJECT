import { createClient } from '@supabase/supabase-js'
const SUPABASE_URL='https://vxeguxgwogtaychmeppc.supabase.co';
const SUPABASE_ANON_KEY='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ4ZWd1eGd3b2d0YXljaG1lcHBjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMxODYwODEsImV4cCI6MjA1ODc2MjA4MX0.0WysZuS73wWLrdiXsVe9sGRF_jpn4rE602WroSqE5MI'
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {auth:{persistSession: false,},});