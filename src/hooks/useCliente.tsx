import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { format } from 'date-fns';
import { Gerenciador } from 'types/ServicesProps';

import { useUser } from 'contexts/User';

export function useCliente() {
  const navigate = useNavigate();
  const { setBarbeiro, buscarAgendamentosData, selectDay, setSelectDay } =
    useUser();

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

  function handleClickBarbeiro(barbeiro: Gerenciador) {
    setBarbeiro(barbeiro);
    navigate(`/p/${userNameDefault(barbeiro?.nmUsuario)}`);
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
