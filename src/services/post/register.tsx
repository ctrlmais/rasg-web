import { supabase } from 'services/supabase';

export async function registerUser(email: string, senha: string, nome: string, ocupacao: string) {
  const { error } = await supabase.auth.signUp(
    {
      email: email,
      password: senha,
    },
    {
      data: {
        name: nome,
        ocupacao: ocupacao,
      },
    },
  );

  return { error };
}
