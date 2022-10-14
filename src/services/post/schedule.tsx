import { Usuarios } from 'types/Aws';

import { supabase } from 'services/supabase';

export async function shedule(
  clientId: string,
  barbeiro: Usuarios,
  selectDayFormatted: string,
  selectHours: string,
) {
  const { error, status } = await supabase.rpc('upsert_schedule', {
    p_barber_id: barbeiro?.cdUsuario,
    p_client_id: clientId,
    p_appointment_date: `${selectDayFormatted}T${selectHours}`,
    p_user_id: barbeiro?.cdUsuario,
  });

  return { error, status };
}
