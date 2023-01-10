import { useEffect, useState } from 'react';

import { horariosManha, horariosNoite, horariosTarde } from 'database/horarios';
import { format, subMinutes } from 'date-fns';
import { ContentServico, GetJornadaUsuario } from 'types/ServicesProps';

import { formatHours } from 'utils/formatHours';

import { useToast } from 'contexts/Toast';
import { useUser } from 'contexts/User';

import { getsShedulesByDateAWS, getJourneyByIdAWS } from 'services/get';
import {
  getSearchPhotoServiceByIdAWS,
  getSearchPhotoServicesByHashAWS,
  getServicesByIdAWS,
} from 'services/get/servicos';

export function useSchedule() {
  const { toast } = useToast();
  const { barbeiro, setSelectDay, setSelectHours, selectDay } = useUser();

  const [schedules, setSchedules] = useState<GetJornadaUsuario[]>([]);
  const [weekDay, setWeekDay] = useState<string>(String(new Date().getDay()));
  const [servicesBarber, setServicesBarber] = useState<ContentServico[]>([]);
  const [savePhotoServices, setSavePhotoServices] = useState<string[]>([]);
  const [selectedService, setSelectedService] = useState<ContentServico>();

  const [loading, setLoading] = useState(false);

  const [horarioInicialBarbeiroSchedule, setHorarioInicialBarbeiroSchedule] =
    useState(schedules[0]?.hrInicio || '00:00');
  const [horarioFinalBarbeiroSchedule, setHorarioFinalBarbeiroSchedule] =
    useState(schedules[0]?.hrFim || '00:00');

  const [horariosMarcados, setHorariosMarcados] = useState<string[]>([]);

  const selectDayFormatted = format(new Date(selectDay), 'yyyy-MM-dd');
  const horarioAtual = format(new Date(), 'HH:mm:ss');

  if (!barbeiro) window.location.assign('/');

  function desabilitaHorarioIntervalo(horario: string) {
    const horarioInicioIntervalo = schedules.find(
      (schedule) => schedule.cdDiaSemana === Number(weekDay),
    )?.hrInicioIntervalo;

    const horarioFimIntervalo = schedules.find(
      (schedule) => schedule.cdDiaSemana === Number(weekDay),
    )?.hrFimIntervalo;

    if (horarioInicioIntervalo && horarioFimIntervalo) {
      if (
        horario >= formatHours(horarioInicioIntervalo) &&
        horario <= formatHours(horarioFimIntervalo)
      ) {
        return true;
      }
    }

    return false;
  }

  function getHorarioAtual(cdDiaSemana: string) {
    const horarios = [] as string[];
    schedules?.map((schedule) => {
      if (String(schedule.cdDiaSemana) === cdDiaSemana) {
        horarios.push(
          formatHours(schedule.hrInicio) + ' às ' + formatHours(schedule.hrFim),
        );
      }
    });
    return horarios;
  }

  function salvarWeekDays(schedules: GetJornadaUsuario[]) {
    const weekDays = [] as number[];
    schedules?.map((schedule) => {
      weekDays.push(Number(schedule.cdDiaSemana));
    });
    return weekDays;
  }

  const diasDaSemanaBarbeiro = salvarWeekDays(schedules);

  function verificarNumerosFaltantes(weekDays: number[]) {
    const numerosFaltantes = [] as number[];
    for (let i = 0; i < 7; i++) {
      if (!weekDays.includes(i)) {
        numerosFaltantes.push(i);
      }
    }
    return numerosFaltantes;
  }

  const numerosFaltantes = verificarNumerosFaltantes(diasDaSemanaBarbeiro);

  function disabledHours(horario: string) {
    if (selectDayFormatted === format(new Date(), 'yyyy-MM-dd')) {
      if (horarioAtual >= horario) {
        return true;
      }
    }
    return false;
  }

  function disabledHorariosMarcados(horario: string) {
    if (horariosMarcados.includes(horario)) {
      return true;
    }
    return false;
  }

  function handleSelectDay(day: Date) {
    const weekDayClick = day.getDay();
    getHorarioAtual(String(weekDayClick));
    setWeekDay(String(weekDayClick));
    setSelectHours('');
    setSelectDay(day);
  }

  function disableSchedules(horario: string): boolean {
    return (
      disabledHours(horario) ||
      desabilitaHorarioIntervalo(horario) ||
      disabledHorariosMarcados(horario)
    );
  }

  function getHorariosManhaBarbeiro() {
    const horariosManhaBarbeiro = [] as string[];

    horariosManha.map((horario) => {
      if (
        horario >= formatHours(horarioInicialBarbeiroSchedule) &&
        horario <= formatHours(horarioFinalBarbeiroSchedule)
      ) {
        horariosManhaBarbeiro.push(horario);
      }
    });

    return horariosManhaBarbeiro;
  }

  function getHorariosTardeBarbeiro() {
    const horariosTardeBarbeiro = [] as string[];

    horariosTarde.map((horario) => {
      if (
        horario >= formatHours(horarioInicialBarbeiroSchedule) &&
        horario <= formatHours(horarioFinalBarbeiroSchedule)
      ) {
        horariosTardeBarbeiro.push(horario);
      }
    });

    return horariosTardeBarbeiro;
  }

  function getHorariosNoiteBarbeiro() {
    const horariosNoiteBarbeiro = [] as string[];

    horariosNoite.map((horario) => {
      if (
        horario >= formatHours(horarioInicialBarbeiroSchedule) &&
        horario <= formatHours(horarioFinalBarbeiroSchedule)
      ) {
        horariosNoiteBarbeiro.push(horario);
      }
    });

    return horariosNoiteBarbeiro;
  }

  useEffect(() => {
    async function getServicesBarber() {
      setLoading(true);
      try {
        const { data } = await getServicesByIdAWS(Number(barbeiro?.cdUsuario));

        setServicesBarber(data.content);

        const cdServicos = data.content.map((item) => item.cdServico);

        const promises = cdServicos.map(
          async (cdServico) =>
            await getSearchPhotoServiceByIdAWS(String(cdServico)),
        );

        const results = await Promise.all(promises);

        const resultsFilter = results.filter((item) => item.data.length > 0);

        const nmHashMime = resultsFilter.map((result) => {
          const { nmHash, nmMime } = result.data[0];
          return { nmHash, nmMime };
        });

        const promisesPhoto = nmHashMime.map(
          async (item) => await getSearchPhotoServicesByHashAWS(item.nmHash),
        );

        const resultsPhoto = await Promise.all(promisesPhoto);

        const newResultAddnmMime = resultsPhoto.map((result, index) => ({
          ...result,
          nmMime: nmHashMime[index].nmMime,
        }));

        const photoURI = newResultAddnmMime.map((item) => {
          const { nmMime } = item;
          const photo = `data:${nmMime};base64,${item.data}`;
          return photo;
        });

        setSavePhotoServices(photoURI);

        setLoading(false);
      } catch (error) {
        toast.error('Erro ao buscar serviços do barbeiro ', { id: 'toast' });
        setLoading(false);
      } finally {
        setLoading(false);
      }
    }

    getServicesBarber();
  }, []);

  useEffect(() => {
    async function getHorariosBarbeiro() {
      try {
        const { data } = await getsShedulesByDateAWS(
          `${selectDayFormatted} 00:00:00`,
          `${selectDayFormatted} 23:59:59`,
          Number(barbeiro?.cdUsuario),
        );

        const horariosMarcados = [] as string[];

        data.content.map((agendamento) => {
          const horarioInicial = new Date(agendamento.dtInicio);
          const horarioInicialFormatado = format(horarioInicial, 'HH:mm');
          const horarioInicialMenos30 = subMinutes(horarioInicial, 30);
          const horarioDoMeio = format(horarioInicialMenos30, 'HH:mm');

          const horarioFinal = new Date(agendamento.dtTermino);
          const horarioFinalMenos30 = subMinutes(horarioFinal, 30);
          const horarioFinalFormatado = format(horarioFinalMenos30, 'HH:mm');

          horariosMarcados.push(horarioInicialFormatado);
          horariosMarcados.push(horarioDoMeio);
          horariosMarcados.push(horarioFinalFormatado);
        });

        setHorariosMarcados(horariosMarcados);
      } catch (error) {
        toast.error('Erro ao buscar horários marcados');
      }
    }

    getHorariosBarbeiro();
  }, [weekDay]);

  useEffect(() => {
    async function getDiasTrabalho() {
      try {
        const { data } = await getJourneyByIdAWS(Number(barbeiro?.cdUsuario));

        setSchedules(data);
      } catch (error) {
        toast.error('Erro ao buscar horários do barbeiro');
      }
    }

    getDiasTrabalho();
  }, []);

  useEffect(() => {
    function getSchedule(weekDay: string) {
      const schedule = schedules.find(
        (schedule) => schedule.cdDiaSemana === Number(weekDay),
      );

      if (schedule) {
        setHorarioInicialBarbeiroSchedule(schedule.hrInicio);
        setHorarioFinalBarbeiroSchedule(schedule.hrFim);
      }

      return schedule;
    }

    getSchedule(weekDay);
  }, [weekDay, schedules]);

  return {
    setHorarioInicialBarbeiroSchedule,
    setHorarioFinalBarbeiroSchedule,
    getHorarioAtual,
    numerosFaltantes,
    horarioInicialBarbeiroSchedule,
    horarioFinalBarbeiroSchedule,
    weekDay,
    setWeekDay,
    handleSelectDay,
    disableSchedules,
    getHorariosManhaBarbeiro,
    getHorariosTardeBarbeiro,
    getHorariosNoiteBarbeiro,
    servicesBarber,
    selectedService,
    setSelectedService,
    savePhotoServices,
    loading,
  };
}
