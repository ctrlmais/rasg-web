import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { addMinutes, format } from 'date-fns';
import Swal from 'sweetalert2';
import { UserContextProps } from 'types/ContextProps';
import {
  Content,
  Gerenciador,
  SituacaoAgendamento,
  SituacaoServico,
} from 'types/ServicesProps';

import { useAuth } from 'hooks/useAuth';
import { usePerfil } from 'hooks/usePerfil';

import {
  getJourneyTypesAWS,
  getAllBarberAWS,
  getsShedulingSituationsAWS,
  getsShedulesByIdAWS,
  getsShedulesByDateAWS,
} from 'services/get';
import { postScheduleAWS, postSignOutAWS } from 'services/post';

import { useToast } from './Toast';

const User = createContext({} as UserContextProps);

export function UserProvider({ children }: any) {
  const { toast } = useToast();
  const navigate = useNavigate();

  const { pathname } = window.location;

  const { isCliente, isBarbeiro } = usePerfil();

  const { storagedUser, storagedHorarios } = useAuth();

  const [barbeiro, setBarbeiro] = useState<Gerenciador>();
  const [barbeiros, setBarbeiros] = useState<Gerenciador[]>([]);
  const [clientes, setClientes] = useState<Content[]>([]);
  const [horariosAgendados, setHorariosAgendados] = useState<Content[]>([]);
  const [situacaoAgendamento, setSituacaoAgendamento] =
    useState<SituacaoAgendamento>();
  const [situacaoServico, setSituacaoServico] = useState<any>();

  const [selectDay, setSelectDay] = useState(new Date());
  const [selectHours, setSelectHours] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [loading, setLoading] = useState(true);

  const clientId = storagedUser?.cdUsuario;
  const barberId = barbeiro?.cdUsuario;

  const situation = storagedUser?.situacaoUsuario?.deSituacaoUsuario;
  const authority = storagedUser?.tipoUsuario?.authority;
  const emailUser = storagedUser?.nmEmail;

  const selectDayFormatted = format(selectDay, 'yyyy-MM-dd');
  const atualDayFormatted = format(new Date(), 'yyyy-MM-dd');
  const atualHourFormatted = format(new Date(), 'HH:mm:ss');
  const selectDayFormattedBR = format(selectDay, 'dd/MM/yyyy');
  const dateFormattedCalendar = format(selectDay, 'yyyyMMdd');
  const hourFormattedCalendar = selectHours.replace(':', '');
  const hourFormattedCalendarEnd = Number(hourFormattedCalendar) + 100;
  const startDate = dateFormattedCalendar + 'T' + hourFormattedCalendar;
  const endDate = dateFormattedCalendar + 'T' + hourFormattedCalendarEnd;
  const dataEHora = new Date(selectDayFormatted + ' ' + selectHours);
  const selectHoursFormatted = addMinutes(new Date(dataEHora), 60);
  const selectHoursFinish = format(selectHoursFormatted, 'HH:mm:ss');

  function verificaOcupacao(ocupacao: string) {
    if (authority === ocupacao) {
      return 'CLIENTE';
    }
    if (authority === ocupacao) {
      return 'GERENCIADOR';
    }
    if (authority === ocupacao) {
      return 'ADMINISTRADOR';
    }
  }

  function verificaHorario(horario: string) {
    const horarioInicio = new Date(selectDayFormatted + ' ' + horario);
    const horarioInicioMais60Minutos = addMinutes(horarioInicio, 60);
    const horarioInicioFormatted = format(
      horarioInicioMais60Minutos,
      'HH:mm:ss',
    );

    if (
      horarioInicioFormatted >= '08:00:00' &&
      horarioInicioFormatted <= '12:00:00'
    ) {
      return 'MANHÃ';
    }
    if (
      horarioInicioFormatted >= '13:00:00' &&
      horarioInicioFormatted <= '17:00:00'
    ) {
      return 'TARDE';
    }
    if (
      horarioInicioFormatted >= '18:00:00' &&
      horarioInicioFormatted <= '22:00:00'
    ) {
      return 'NOITE';
    }
  }

  function getClientesMorning() {
    const clientesMorning = clientes.filter((cliente) => {
      const horarioInicio = format(new Date(cliente.dtInicio), 'HH:mm');
      const shift = verificaHorario(horarioInicio);

      if (shift === 'MANHÃ') {
        return cliente;
      }

      return false;
    });

    return clientesMorning;
  }

  function getClientesAfternoon() {
    const clientesAfternoon = clientes.filter((cliente) => {
      const horarioInicio = format(new Date(cliente.dtInicio), 'HH:mm');
      const shift = verificaHorario(horarioInicio);

      if (shift === 'TARDE') {
        return cliente;
      }

      return false;
    });

    return clientesAfternoon;
  }

  function getClientesNight() {
    const clientesNight = clientes.filter((cliente) => {
      const horarioInicio = format(new Date(cliente.dtInicio), 'HH:mm');
      const shift = verificaHorario(horarioInicio);

      if (shift === 'NOITE') {
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

    if (clientesMorning?.length > 0) {
      return clientesMorning[0];
    }

    if (clientesAfternoon?.length > 0) {
      return clientesAfternoon[0];
    }

    if (clientesNight?.length > 0) {
      return clientesNight[0];
    }

    return {
      ...clientesMorning[0],
      ...clientesAfternoon[0],
      ...clientesNight[0],
    };
  }

  function getHorariosMarcados() {
    if (!clientes) return [];

    const horariosMarcados = clientes.map((cliente) => {
      const horarioInicio = format(new Date(cliente.dtInicio), 'HH:mm');

      return horarioInicio;
    });

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

  function verificaHorarioDeTrabalho() {
    if (storagedHorarios && storagedHorarios.length > 0) {
      return true;
    }

    return false;
  }

  function verificaTelefone() {
    const telefone = storagedUser?.nmTelefone;

    if (telefone) {
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
    try {
      setLoading(true);

      const { data } = await getAllBarberAWS();

      if (!data) return setLoading(false);

      setBarbeiros(data.content);

      setLoading(false);
    } catch (error) {
      toast.error('Erro ao buscar barbeiros', { id: 'toast' });
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  async function buscaClientesHorario(hour: string) {
    if (!clientId === undefined) return;

    if (isBarbeiro) {
      try {
        const { data } = await getsShedulesByDateAWS(
          `${selectDayFormatted} ${hour}:00`,
          `${selectDayFormatted} 23:59:59`,
          Number(clientId),
        );

        if (!data) return;

        setClientes(data.content);
      } catch (error) {
        toast.error('Erro ao buscar clientes', { id: 'toast' });
      }
    }
  }

  async function buscarClientes() {
    if (!clientId === undefined) return;
    if (selectDayFormatted < atualDayFormatted) return;

    if (isBarbeiro) {
      try {
        if (selectDayFormatted === atualDayFormatted) {
          const { data } = await getsShedulesByDateAWS(
            `${selectDayFormatted} ${atualHourFormatted}`,
            `${selectDayFormatted} 23:00:00`,
            Number(clientId),
          );

          if (!data.content) return;

          setClientes(data.content);
        }

        if (selectDayFormatted > atualDayFormatted) {
          const { data } = await getsShedulesByDateAWS(
            `${selectDayFormatted} 00:00:00`,
            `${selectDayFormatted} 23:59:59`,
            Number(clientId),
          );

          if (!data.content) return;

          setClientes(data.content);
        }
      } catch (error) {
        toast.error('Erro ao buscar clientes', { id: 'toast' });
      }
    }

    if (isCliente && barberId) {
      try {
        const { data } = await getsShedulesByDateAWS(
          `${selectDayFormatted} ${atualHourFormatted}`,
          `${selectDayFormatted} 23:59:59`,
          Number(clientId),
        );

        if (!data.content) return;

        setClientes(data.content);
      } catch (error) {
        toast.error('Erro ao buscar clientes', { id: 'toast' });
      }
    }
  }

  async function postShedule() {
    if (!barbeiro) return;
    if (!storagedUser) return;
    if (!situacaoAgendamento) return;

    const newValues = {
      nmAgendamento: `${storagedUser.nmUsuario} - ${barbeiro.nmUsuario} - ${selectDayFormatted} ${selectHours}:00`,
      deAgendamento: `APROVADO DIA ${selectDayFormatted} AS ${selectHours}`,
      dtInicio: `${selectDayFormatted} ${selectHours}:00`,
      dtTermino: `${selectDayFormatted} ${selectHoursFinish}`,
      situacaoAgendamento: situacaoAgendamento as SituacaoAgendamento,
      servico: {
        cdServico: 0,
        tmServico: '01:00:00',
        nmServico: 'CORTE MANDRAQUE',
        deServico: 'SELOKO TIO< CORTA COM NOIS AEW',
        situacaoServico: situacaoServico as SituacaoServico,
        tipoServico: {
          cdTipoServico: 0,
          deTipoServico: 'CORTE DE CABELO',
          sgTipoServico: 'CDC',
          dtCadastro: '2022-01-01 12:00:00',
        },
        gerenciador: barbeiro,
        dtCadastro: `${selectDayFormatted} ${selectHours}:00`,
        dtAtualizacao: '',
        cdUsuarioCadastro: Number(barbeiro.cdUsuario),
        cdUsuarioAtualizacao: Number(barbeiro.cdUsuario),
      },
      cliente: storagedUser,
      gerenciador: barbeiro,
      dtCadastro: `${selectDayFormatted} ${selectHours}:00`,
      cdUsuarioCadastro: Number(storagedUser.cdUsuario),
      cdUsuarioAtualizacao: Number(storagedUser.cdUsuario),
    };

    try {
      const { status } = await postScheduleAWS(newValues);

      if (status === 200) {
        toast.success('Agendamento realizado com sucesso', { id: 'toast' });
        setStatus('success');
      }
    } catch (error) {
      toast.error('Erro ao realizar agendamento', { id: 'toast' });
      setStatus('error');
    }
  }

  async function buscarAgendamentosData(diaSelecionado: string) {
    if (!clientId === undefined) return;

    try {
      const { data } = await getsShedulesByIdAWS(
        `${diaSelecionado} 00:00:00`,
        `${diaSelecionado} 23:59:59`,
        Number(clientId),
      );

      if (!data.content) return;

      setHorariosAgendados(data.content);
    } catch (error) {
      toast.error('Erro ao buscar agendamentos', { id: 'toast' });
    }
  }

  useEffect(() => {
    async function getSituacaoAgendamento() {
      try {
        setLoading(true);
        const { data } = await getJourneyTypesAWS();

        if (!data) return;

        setSituacaoServico(data[0]);
        setLoading(false);
      } catch (error) {
        toast.error('Erro ao buscar situação agendamento', { id: 'toast' });
        setLoading(false);
      } finally {
        setLoading(false);
      }
    }

    async function getSituacaoServico() {
      try {
        setLoading(true);
        const { data } = await getsShedulingSituationsAWS();

        if (!data) return;

        setSituacaoAgendamento(data[0]);
        setLoading(false);
      } catch (error) {
        toast.error('Erro ao buscar situação agendamento', { id: 'toast' });
        setLoading(false);
      } finally {
        setLoading(false);
      }
    }

    getSituacaoAgendamento();
    getSituacaoServico();
  }, []);

  useEffect(() => {
    if (isCliente) {
      buscarBarbeiros();
    }
  }, [isCliente]);

  useEffect(() => {
    async function buscarAgendamentos() {
      if (!clientId) return;

      try {
        const { data } = await getsShedulesByIdAWS(
          `${atualDayFormatted} 00:00:00`,
          `${atualDayFormatted} 23:59:59`,
          Number(clientId),
        );

        if (!data.content) return;

        setHorariosAgendados(data.content);
      } catch (error) {
        toast.error('Erro ao buscar agendamentos', { id: 'toast' });
      }
    }

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

  useEffect(() => {
    const expires = localStorage.getItem('@rasg:expires');

    if (expires) {
      const expiresDate = new Date(expires);
      const now = new Date();

      if (expiresDate < now) {
        postSignOutAWS();

        Swal.fire({
          title: 'Sessão expirada',
          text: 'Faça login novamente',
          icon: 'warning',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#ff9000',
          background: '#312e38',
          color: '#f4ede8',
        }).then(() => {
          navigate('/');
        });
      }
    }
  }, []);

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
        buscaClientesHorario,
        verificaHorarioDeTrabalho,
        verificaTelefone,
        loading,
        emailUser,
        situation,
        verificaHorario,
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
