import { Schedule } from 'types/IContext';

import { supabase } from 'services/supabase';

export async function updateHorario(horario: Schedule[]) {
  const { error } = await supabase.auth.update({
    data: { schedules: horario },
  });

  return { error };
}
