import { supabase } from 'services/supabase';

export async function updateProfile(
  email: string,
  password: string,
  newPassword: string,
  name: string,
) {
  const { user, error } = await supabase.auth.update({
    email,
    password: password === '' ? undefined : newPassword,
    data: { name },
  });

  return { user, error };
}
