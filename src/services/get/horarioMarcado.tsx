import { format } from 'date-fns';

import { supabase } from 'services/supabase';

const atualDayFormatted = format(new Date(), 'yyyy-MM-dd');

export async function getHorarioMarcadoCliente(
  clientId: string,
  selectDayFormatted: string,
) {
  const { data, error, status } = await supabase.rpc(
    'busca_filtrada_schedules',
    {
      p_id: [],
      p_barber_id: [],
      p_client_id: [clientId],
      p_dt_inicio:
        atualDayFormatted === selectDayFormatted
          ? `${selectDayFormatted}T00:00`
          : `${selectDayFormatted}T00:00`,
      p_dt_fim: `${selectDayFormatted}T23:59`,
      p_page: 0,
      p_limit: 15,
      p_orderby: 'hour',
      p_ascordsc: 'asc',
    },
  );

  return { data, error, status };
}

export async function getHorarioSelecionado(
  clientId: string,
  selectDayFormatted: string,
  hour: string,
) {
  const { data, error, status } = await supabase.rpc(
    'busca_filtrada_schedules',
    {
      p_id: [],
      p_barber_id: [],
      p_client_id: [clientId],
      p_dt_inicio: `${selectDayFormatted}T${hour}`,
      p_dt_fim: `${selectDayFormatted}T${hour}`,
      p_page: 0,
      p_limit: 15,
      p_orderby: 'hour',
      p_ascordsc: 'asc',
    },
  );

  return { data, error, status };
}

export async function getHorarioMarcadoMensal(
  clientId: string,
  dataInicio: string,
  dataFim: string,
) {
  const { data, error, status } = await supabase.rpc(
    'busca_filtrada_schedules',
    {
      p_id: [],
      p_barber_id: [],
      p_client_id: [clientId],
      p_dt_inicio: `${dataInicio}T23:59`,
      p_dt_fim: `${dataFim}T00:00`,
      p_page: 0,
      p_limit: 100,
      p_orderby: 'hour',
      p_ascordsc: 'asc',
    },
  );

  return { data, error, status };
}
