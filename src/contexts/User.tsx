import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { format } from 'date-fns';
import { ClienteMetadata, UserContextProps, UserMetadata } from 'types/IContext';

import { useAuth } from 'hooks/useAuth';

import { getBarbeiros } from 'services/get/barbeiros';
import { getClientes } from 'services/get/clientes';
import { getHorarioMarcadoCliente } from 'services/get/horarioMarcado';
import { shedule } from 'services/post/schedule';

const User = createContext({} as UserContextProps);

export function UserProvider({ children }: any) {
  const navigate = useNavigate();

  const { pathname } = window.location;

  const { user, isCliente, isBarbeiro } = useAuth();
  const [barbeiro, setBarbeiro] = useState<UserMetadata>();
  const [barbeiros, setBarbeiros] = useState<UserMetadata[]>([]);
  const [clientes, setClientes] = useState<ClienteMetadata[]>([]);
  const [horariosAgendados, setHorariosAgendados] = useState<ClienteMetadata[]>([]);
  const [selectDay, setSelectDay] = useState(new Date());
  const [selectHours, setSelectHours] = useState<string>('');
  const [status, setStatus] = useState<string>('');

  const clientId = user?.id;
  const barberId = barbeiro?.id;

  const selectDayFormatted = format(selectDay, 'yyyy-MM-dd');
  const atualDayFormatted = format(new Date(), 'yyyy-MM-dd');
  const selectDayFormattedBR = format(selectDay, 'dd/MM/yyyy');
  const dateFormattedCalendar = format(selectDay, 'yyyyMMdd');
  const hourFormattedCalendar = selectHours.replace(':', '');
  const hourFormattedCalendarEnd = Number(hourFormattedCalendar) + 100;
  const startDate = dateFormattedCalendar + 'T' + hourFormattedCalendar;
  const endDate = dateFormattedCalendar + 'T' + hourFormattedCalendarEnd;

  function verificaLoginGoogleEOcupacao() {
    return user?.app_metadata.provider === 'google' && !user.user_metadata.ocupacao;
  }

  function verificaOcupacao(ocupacao: string) {
    if (user?.user_metadata.ocupacao === ocupacao) {
      return 'cliente';
    }
    if (user?.user_metadata.ocupacao === ocupacao) {
      return 'barbeiro';
    }
  }

  function getClientesMorning() {
    const clientesMorning = clientes.filter((cliente: ClienteMetadata) => {
      const shift = cliente.shift;

      if (shift === 'morning') {
        return cliente;
      }

      return false;
    });

    return clientesMorning;
  }

  function getClientesAfternoon() {
    const clientesAfternoon = clientes.filter((cliente: ClienteMetadata) => {
      const shift = cliente.shift;

      if (shift === 'afternoon') {
        return cliente;
      }

      return false;
    });

    return clientesAfternoon;
  }

  function getClientesNight() {
    const clientesNight = clientes.filter((cliente: ClienteMetadata) => {
      const shift = cliente.shift;

      if (shift === 'night') {
        return cliente;
      }

      return false;
    });

    return clientesNight;
  }

  function getFirstCliente() {
    const clientesMorning = getClientesMorning();
    const clientesAfternoon = getClientesAfternoon();
    const clientesNight = getClientesNight();

    if (!clientesMorning || !clientesAfternoon || !clientesNight) return;

    if (clientesMorning.length > 0) {
      return clientesMorning[0];
    }

    if (clientesAfternoon.length > 0) {
      return clientesAfternoon[0];
    }

    if (clientesNight.length > 0) {
      return clientesNight[0];
    }

    return null;
  }

  function getHorariosMarcados() {
    if (!clientes) return [];

    const horariosMarcados = clientes.map((cliente: ClienteMetadata) => cliente.hour);

    return horariosMarcados;
  }

  function isHorarioMarcado(horario: string) {
    const horariosMarcados = getHorariosMarcados();

    return horariosMarcados.includes(horario);
  }

  function isDataEHorarioPassado(data: string, horario: string) {
    const dataAtual = format(new Date(), 'yyyy-MM-dd');
    const horarioAtual = format(new Date(), 'HH:mm');

    if (data < dataAtual) return true;
    if (data === dataAtual && horario < horarioAtual) return true;

    return false;
  }

  function verificaDataEHoraSelecionada() {
    if (selectDayFormatted < atualDayFormatted) {
      return false;
    }

    if (selectDay && selectHours) {
      return true;
    }

    return false;
  }

  function generateGoogleCalendarEvent(
    title: string,
    startDate: string,
    endDate: string,
    description?: string,
    location?: string,
  ) {
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDate}/${endDate}&details=${description}&location=${location}`;
    window.open(url, '_blank');
  }

  async function buscarBarbeiros() {
    const { data, error, status } = await getBarbeiros();

    if (error) {
      switch (status) {
        default:
          throw new Error('Erro ao buscar barbeiros');
      }
    }

    if (!data) return;

    if (data[0].j === null) {
      throw new Error('Erro ao buscar barbeiros');
    }

    setBarbeiros(data[0].j);
  }

  async function buscarClientes() {
    if (!clientId) return;

    if (isBarbeiro) {
      const { data, error, status } = await getClientes(clientId, selectDayFormatted);

      if (error) {
        switch (status) {
          default:
            return;
        }
      }

      if (!data) return;

      if (data[0].j === null) {
        setClientes([]);
        return;
      }

      setClientes(data[0].j);
    }

    if (isCliente && barberId) {
      const { data, error, status } = await getClientes(barberId || '', selectDayFormatted);

      if (error) {
        switch (status) {
          default:
            return;
        }
      }

      if (!data) return;

      if (data[0].j === null) {
        setClientes([]);
        return;
      }

      setClientes(data[0].j);
    }
  }

  async function buscarAgendamentos() {
    if (!clientId) return;

    const { data, error, status } = await getHorarioMarcadoCliente(clientId, atualDayFormatted);

    if (error) {
      switch (status) {
        default:
          return;
      }
    }

    if (!data) return;

    if (data[0].j === null) {
      setHorariosAgendados([]);
      return;
    }

    setHorariosAgendados(data[0].j);
  }

  async function postShedule() {
    if (!clientId) return;
    if (!barberId) return;
    if (!barbeiro) return;

    const { error, status } = await shedule(clientId, barbeiro, selectDayFormatted, selectHours);

    if (error) {
      setStatus('error');
      switch (status) {
        default:
          throw new Error('Erro ao agendar');
      }
    }

    setStatus('success');
  }

  async function buscarAgendamentosData(diaSelecionado: string) {
    if (!clientId) return;

    const { data, error, status } = await getHorarioMarcadoCliente(clientId, diaSelecionado);

    if (error) {
      switch (status) {
        default:
          return;
      }
    }

    if (!data) return;

    if (data[0].j === null) {
      setHorariosAgendados([]);
      return;
    }

    setHorariosAgendados(data[0].j);
  }

  useEffect(() => {
    if (isCliente) {
      buscarBarbeiros();
    }
  }, [isCliente]);

  useEffect(() => {
    if (isCliente) {
      buscarAgendamentos();
    }
  }, [clientId]);

  useEffect(() => {
    buscarClientes();
  }, [barberId, selectDay, isBarbeiro, isCliente]);

  useEffect(() => {
    const params = pathname.split('/')[1];

    if (params === 'p') {
      if (barbeiro === undefined) {
        navigate('/');
      }
    }
  }, [barbeiro]);

  return (
    <User.Provider
      value={{
        barberId,
        clientId,
        barbeiro,
        setBarbeiro,
        barbeiros,
        setBarbeiros,
        clientes,
        setClientes,
        selectDay,
        setSelectDay,
        selectHours,
        setSelectHours,
        status,
        setStatus,
        buscarBarbeiros,
        buscarClientes,
        selectDayFormatted,
        atualDayFormatted,
        verificaLoginGoogleEOcupacao,
        verificaOcupacao,
        getClientesMorning,
        getClientesAfternoon,
        getClientesNight,
        getFirstCliente,
        selectDayFormattedBR,
        postShedule,
        getHorariosMarcados,
        isHorarioMarcado,
        isDataEHorarioPassado,
        verificaDataEHoraSelecionada,
        horariosAgendados,
        buscarAgendamentosData,
        generateGoogleCalendarEvent,
        startDate,
        endDate,
      }}
    >
      {children}
    </User.Provider>
  );
}

export function useUser() {
  const context = useContext(User);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
