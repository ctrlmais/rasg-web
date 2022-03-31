import { supabase } from 'services/supabase';

export async function signOut() {
  const { error } = await supabase.auth.signOut();

  return { error };
}
