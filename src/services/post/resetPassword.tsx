import { supabase } from 'services/supabase';

export async function resetPassword(email: string) {
  const { error } = await supabase.auth.api.resetPasswordForEmail(email, {
    redirectTo: 'http://localhost:3000/reset-password',
  });

  return { error };
}
