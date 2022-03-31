import { supabase } from '../supabase';

export async function signInGoogleProvider() {
  const { user, error } = await supabase.auth.signIn({
    provider: 'google',
  });

  return { user, error };
}
