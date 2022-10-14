import { supabase } from 'services/supabase';

export async function validateSchedule(
  idSchedule: string,
  idProfile: number,
  validate: boolean,
) {
  const { status, error } = await supabase.rpc(
    'ebarscheduleupdatevalidatefield',
    {
      p_id: idSchedule,
      p_user_id: idProfile,
      p_validate: validate,
    },
  );

  return { status, error };
}
