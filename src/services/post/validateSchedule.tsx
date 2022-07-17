import { supabase } from 'services/supabase';

export async function validateSchedule(validar: boolean, idSchedule: string) {
  const { data, error } = await supabase
    .from('tb_schedule')
    .update({ validate: validar })
    .match({ id: idSchedule });

  return { data, error };
}
