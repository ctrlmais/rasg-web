import { supabase } from 'services/supabase';

export async function registerUser(
  email: string,
  password: string,
  name: string,
  ocupacao: string,
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
      },
    },
  );

  return { error };
}
