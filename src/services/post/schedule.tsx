import { UserMetadata } from 'types/IContext';

import { supabase } from 'services/supabase';

export async function shedule(
  clientId: string,
  barbeiro: UserMetadata,
  selectDayFormatted: string,
  selectHours: string,
) {
  const { error, status } = await supabase.rpc('upsert_schedule', {
    p_barber_id: barbeiro?.id,
    p_client_id: clientId,
    p_appointment_date: `${selectDayFormatted}T${selectHours}`,
    p_user_id: barbeiro?.id,
  });

  return { error, status };
}
