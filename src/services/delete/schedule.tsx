import { supabase } from 'services/supabase';

export async function deleteSchedule(idAgendamento: string) {
  const { data, error } = await supabase
    .from('tb_schedule')
    .delete()
    .match({ id: idAgendamento });

  return { data, error };
}
