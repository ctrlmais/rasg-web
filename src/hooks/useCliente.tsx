import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { format } from 'date-fns';
import { UserMetadata } from 'types/IContext';

import { useToast } from 'contexts/Toast';
import { useUser } from 'contexts/User';

export function useCliente() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { setBarbeiro, buscarAgendamentosData, selectDay, setSelectDay } = useUser();

  function nextDay() {
    const nextDay = new Date(selectDay);
    nextDay.setDate(nextDay.getDate() + 1);
    setSelectDay(nextDay);
  }

  function previousDay() {
    const prevDay = new Date(selectDay);
    prevDay.setDate(prevDay.getDate() - 1);
    setSelectDay(prevDay);
  }

  useEffect(() => {
    const dateFormatted = format(selectDay, 'yyyy-MM-dd');

    buscarAgendamentosData(dateFormatted);
  }, [selectDay]);

  function handleClickBarbeiro(barbeiro: UserMetadata) {
    if (barbeiro?.schedules === null) {
      toast.error('Este barbeiro não possui horários disponíveis.', {
        id: 'toast',
      });
    } else {
      setBarbeiro(barbeiro);
      navigate(`/p/${userNameDefault(barbeiro?.nome)}`);
    }
  }

  function userNameDefault(str: string) {
    return str?.replace(/\s/g, '').toLowerCase();
  }

  return {
    nextDay,
    previousDay,
    handleClickBarbeiro,
    userNameDefault,
  };
}
