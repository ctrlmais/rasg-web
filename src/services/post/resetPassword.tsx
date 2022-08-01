import { supabase } from 'services/supabase';

export async function resetPassword(email: string) {
  const { error } = await supabase.auth.api.resetPasswordForEmail(email, {
    redirectTo: process.env.REACT_APP_URL,
  });

  return { error };
}
