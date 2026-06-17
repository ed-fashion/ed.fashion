const SUPABASE_URL = 'https://sabvkhcjmlgugypqkusn.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNhYnZraGNqbWxndWd5cHFrdXNuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE2NTQ0MDQsImV4cCI6MjA5NzIzMDQwNH0.zFaGDcTa3sPxEwqcS8AzVdnhgq6QUG4qP_GKIVpLXlo';

const { createClient } = supabase;
const db = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
