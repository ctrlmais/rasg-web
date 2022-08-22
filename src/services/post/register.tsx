import { supabase } from 'services/supabase';

export async function registerUser(
  email: string,
  password: string,
  name: string,
  ocupacao: string,
  phone: string,
) {
  const { error } = await supabase.auth.signUp(
    {
      email,
      password,
    },
    {
      data: {
        name,
        ocupacao,
        phone,
      },
    },
  );

  return { error };
}
