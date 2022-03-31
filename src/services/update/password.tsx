import { supabase } from 'services/supabase';

export async function updatePassword(senha: string) {
  const { error } = await supabase.auth.update({
    password: senha,
  });

  return { error };
}
