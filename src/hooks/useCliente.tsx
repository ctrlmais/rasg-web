import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { format } from 'date-fns';
import Swal from 'sweetalert2';
import { Gerenciador } from 'types/ServicesProps';

import { useUser } from 'contexts/User';

export function useCliente() {
  const navigate = useNavigate();
  const {
    setBarbeiro,
    buscarAgendamentosData,
    selectDay,
    setSelectDay,
    verificaTelefone,
  } = useUser();

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

  useEffect(() => {
    if (!verificaTelefone()) {
      Swal.fire({
        title: 'Atenção!',
        text: 'Para continuar utilizando o app, é necessário informar seu telefone. Estamos atualizando algumas coisas no sistema, então não se preocupe, isso não vai demorar nada.',
        icon: 'warning',
        confirmButtonColor: '#ff9000',
        background: '#312e38',
        color: '#f4ede8',
        confirmButtonText: 'Adicionar telefone',
      }).then((result) => {
        if (result.value) {
          navigate('/profile');
        }
      });
    }
  }, []);

  return {
    nextDay,
    previousDay,
    handleClickBarbeiro,
    userNameDefault,
  };
}
