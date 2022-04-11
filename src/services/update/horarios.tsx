import { supabase } from 'services/supabase';

export async function updateHorario(horario: any) {
  const { error } = await supabase.auth.update({
    data: { schedules: horario },
  });

  return { error };
}
