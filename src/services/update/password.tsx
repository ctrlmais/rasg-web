import { supabase } from 'services/supabase';

export async function updatePassword(password: string) {
  const { error } = await supabase.auth.update({
    password,
  });

  return { error };
}
