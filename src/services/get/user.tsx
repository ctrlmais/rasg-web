import { supabase } from 'services/supabase';

export function getUser() {
  const userData = supabase.auth.user();

  return userData;
}
