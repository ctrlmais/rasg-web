import { supabase } from 'services/supabase';

export async function signIn(email: string, password: string) {
  const { user, error } = await supabase.auth.signIn({
    email,
    password,
  });

  return { user, error };
}
