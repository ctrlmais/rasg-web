import { supabase } from 'services/supabase';

export async function signIn(email: string, senha: string) {
  const { user, error } = await supabase.auth.signIn({
    email,
    password: senha,
  });

  return { user, error };
}
