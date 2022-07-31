import { useEffect, useState } from 'react';
import { DateRange } from 'react-day-picker';

import { addDays, format } from 'date-fns';
import { ClienteMetadata } from 'types/IContext';

import { getHorarioMarcadoMensal } from 'services/get/horarioMarcado';

const pastMonth = new Date();

export function useHistory() {
  const [loading, setLoading] = useState(true);
  const [agendamentos, setAgendamentos] = useState<ClienteMetadata[]>([]);
  const defaultSelected: DateRange = {
    from: addDays(pastMonth, -2),
    to: addDays(pastMonth, 0),
  };
  const [range, setRange] = useState<DateRange | undefined>(defaultSelected);

  const dataInicial = format(range?.from as Date, 'yyyy-MM-dd');
  const dataFinal = format(range?.to as Date, 'yyyy-MM-dd');

  const storagedUser = JSON.parse(
    localStorage.getItem('supabase.auth.token') || '{}',
  );

  const id = storagedUser.currentSession.user.id;

  useEffect(() => {
    async function buscarHorariosMarcadosMensal() {
      setLoading(true);

      const { data, error, status } = await getHorarioMarcadoMensal(
        id,
        dataInicial,
        dataFinal,
      );

      if (error) {
        setLoading(false);
        switch (status) {
          default:
            return;
        }
      }

      if (!data) {
        setAgendamentos([]);
        setLoading(false);
        return;
      }
      if (!data[0].j) {
        setAgendamentos([]);
        setLoading(false);
        return;
      }
      if (!data[0].j[0]) {
        setAgendamentos([]);
        setLoading(false);
        return;
      }

      if (data[0].j === null) {
        setAgendamentos([]);
        setLoading(false);
        return;
      }

      setAgendamentos(data[0].j);
      setLoading(false);
    }

    buscarHorariosMarcadosMensal();
  }, [dataInicial, dataFinal]);

  return {
    loading,
    agendamentos,
    range,
    setRange,
    pastMonth,
  };
}
