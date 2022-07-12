import { format } from 'date-fns';

import { supabase } from 'services/supabase';

const atualDayFormatted = format(new Date(), 'yyyy-MM-dd');
const atualHourFormatted = format(new Date(), 'HH:mm');
const primeiroDiaMes = format(
  new Date(new Date().getFullYear(), new Date().getMonth(), 1),
  'yyyy-MM-dd',
);
const ultimoDiaMes = format(
  new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
  'yyyy-MM-dd',
);

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
          ? `${selectDayFormatted}T${atualHourFormatted}`
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

export async function getHorarioMarcadoMensal(clientId: string, page: number) {
  const { data, error, status } = await supabase.rpc(
    'busca_filtrada_schedules',
    {
      p_id: [],
      p_barber_id: [],
      p_client_id: [clientId],
      p_dt_inicio: `${primeiroDiaMes}T00:00`,
      p_dt_fim: `${ultimoDiaMes}T23:59`,
      p_page: page,
      p_limit: 5,
      p_orderby: 'date',
      p_ascordsc: 'asc',
    },
  );

  return { data, error, status };
}
