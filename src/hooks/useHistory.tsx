import { useEffect, useState } from 'react';
import { DateRange } from 'react-day-picker';

import { addDays, format } from 'date-fns';
import { Content } from 'types/ServicesProps';

import { useToast } from 'contexts/Toast';

import { getsShedulesByDateAWS, getsShedulesByIdAWS } from 'services/get';

import { usePerfil } from './usePerfil';

const pastMonth = new Date();

export function useHistory() {
  const { toast } = useToast();
  const { isBarbeiro } = usePerfil();

  const [loading, setLoading] = useState(true);
  const [agendamentos, setAgendamentos] = useState<Content[]>([]);
  const defaultSelected: DateRange = {
    from: addDays(pastMonth, -2),
    to: addDays(pastMonth, 0),
  };
  const [range, setRange] = useState<DateRange | undefined>(defaultSelected);

  const user = JSON.parse(localStorage.getItem('@barber:user') || '{}');

  const id = user?.cdUsuario;

  useEffect(() => {
    async function buscarHorariosMarcadosMensal() {
      if (!range?.from) return;
      if (!range?.to) return;

      const dataInicial =
        format(new Date(range.from), 'yyyy-MM-dd 00:00:00') || '';
      const dataFinal = format(new Date(range.to), 'yyyy-MM-dd 23:59:59') || '';

      console.log(isBarbeiro);

      try {
        setLoading(true);

        if (isBarbeiro) {
          const { data } = await getsShedulesByDateAWS(
            dataInicial,
            dataFinal,
            id,
          );

          if (!data) {
            setAgendamentos([]);
            setLoading(false);
            return;
          }

          setAgendamentos(data.content);
          setLoading(false);
        }

        if (!isBarbeiro) {
          const { data } = await getsShedulesByIdAWS(
            dataInicial,
            dataFinal,
            id,
          );

          if (!data) {
            setAgendamentos([]);
            setLoading(false);
            return;
          }

          setAgendamentos(data.content);
          setLoading(false);
        }
      } catch (error) {
        toast.error('Erro ao buscar agendamentos', {
          id: 'toast',
        });
        setLoading(false);
      } finally {
        setLoading(false);
      }
    }

    buscarHorariosMarcadosMensal();
  }, [range, id]);

  return {
    loading,
    agendamentos,
    range,
    setRange,
    pastMonth,
  };
}
