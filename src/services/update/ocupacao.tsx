import { supabase } from 'services/supabase';

export async function updateOcupacao(ocupacao: string) {
  const { error } = await supabase.auth.update({
    data: { ocupacao },
  });

  return { error };
}
