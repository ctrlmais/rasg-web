import { format } from 'date-fns';

import { supabase } from 'services/supabase';

const atualDayFormatted = format(new Date(), 'yyyy-MM-dd');
const atualHourFormatted = format(new Date(), 'HH:mm');

export async function getClientes(barberId: string, selectDayFormatted: string) {
  const { data, error, status } = await supabase.rpc('busca_filtrada_schedules', {
    p_id: [],
    p_barber_id: [barberId],
    p_client_id: [],
    p_dt_inicio:
      selectDayFormatted === atualDayFormatted
        ? `${selectDayFormatted}T${atualHourFormatted}`
        : `${selectDayFormatted}T00:00`,
    p_dt_fim: selectDayFormatted === atualDayFormatted ? `${selectDayFormatted}T23:00` : `${selectDayFormatted}T23:59`,
    p_page: 0,
    p_limit: 15,
    p_orderby: 'hour',
    p_ascordsc: 'asc',
  });

  return { data, error, status };
}

export async function getClientesHour(barberId: string, selectDayFormatted: string, selectHour: string) {
  const { data, error, status } = await supabase.rpc('busca_filtrada_schedules', {
    p_id: [],
    p_barber_id: [barberId],
    p_client_id: [],
    p_dt_inicio:
      selectDayFormatted === atualDayFormatted ? `${selectDayFormatted}T${selectHour}` : `${selectDayFormatted}T00:00`,
    p_dt_fim: selectDayFormatted === atualDayFormatted ? `${selectDayFormatted}T23:00` : `${selectDayFormatted}T23:59`,
    p_page: 0,
    p_limit: 15,
    p_orderby: 'hour',
    p_ascordsc: 'asc',
  });

  return { data, error, status };
}
