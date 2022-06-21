import { supabase } from 'services/supabase';

export async function updateProfile(
  email: string,
  password: string,
  newPassword: string,
  name: string,
  phone: string,
) {
  const { user, error } = await supabase.auth.update({
    email,
    password: password === '' ? undefined : newPassword,
    data: { name, phone },
  });

  return { user, error };
}
