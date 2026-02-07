/**
 * config.js
 * Configuration centralisée de Supabase pour le site
 * Remplacez les valeurs par vos identifiants Supabase
 */

const SUPABASE_CONFIG = {
  URL: 'https://qkzzhjeeuierlqkqexrf.supabase.co',
  ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFrenpoamVldWllcmxxa3FleHJmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg4NTY4OTgsImV4cCI6MjA4NDQzMjg5OH0.jISmx5PBs99hCVUCziJZBdjS9xI5vfKmII3TaJ1zVu4'
};

// Initialiser le client Supabase
const supabaseClient = window.supabase 
  ? supabase.createClient(SUPABASE_CONFIG.URL, SUPABASE_CONFIG.ANON_KEY)
  : null;
