
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const supabaseUrl = 'https://qpnbgzibqehvhhsrbccd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFwbmJnemlicWVodmhoc3JiY2NkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE3MDI3NzcsImV4cCI6MjA2NzI3ODc3N30.usn_dhutaU-2E-FlOlA7OieWuPsWzpIilorUiYA9B6M';

export const supabase = createClient<Database>(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});
