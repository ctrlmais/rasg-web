import { useEffect, useState } from 'react';

import { Schedule } from 'types/IContext';

import { horariosManha, horariosNoite, horariosTarde } from 'utils/horarios';

import { useUser } from 'contexts/User';

export function useSchedule() {
  const {
    barbeiro,
    setSelectDay,
    setSelectHours,
    selectDayFormatted,
    isHorarioMarcado,
    isDataEHorarioPassado,
  } = useUser();
  const [weekDay, setWeekDay] = useState<string>(String(new Date().getDay()));

  if (!barbeiro) window.location.assign('/');

  const schedules: Schedule[] = JSON.parse(barbeiro?.schedules || '[]');

  const [horarioInicialBarbeiroSchedule, setHorarioInicialBarbeiroSchedule] =
    useState(JSON.parse(barbeiro?.schedules)[weekDay]?.from);
  const [horarioFinalBarbeiroSchedule, setHorarioFinalBarbeiroSchedule] =
    useState(JSON.parse(barbeiro?.schedules)[weekDay]?.to);

  function getHorarioAtual(week_day: string) {
    const horario = [] as string[];
    schedules?.map((schedule) => {
      if (schedule.week_day === week_day) {
        horario.push(schedule.from + ' às ' + schedule.to);
      }
    });
    return horario;
  }

  function salvarWeekDays(schedules: Schedule[]) {
    const weekDays = [] as number[];
    schedules?.map((schedule) => {
      weekDays.push(Number(schedule.week_day));
    });
    return weekDays;
  }

  const diasDaSemanaBarbeiro = salvarWeekDays(JSON.parse(barbeiro?.schedules));

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

  function desabilitarHorariosAnteriores(
    horarioInicialBarbeiroSchedule: string,
  ) {
    const horariosAnteriores = [] as string[];
    horariosManha.map((horario) => {
      if (horario < horarioInicialBarbeiroSchedule) {
        horariosAnteriores.push(horario);
      }
    });
    horariosTarde.map((horario) => {
      if (horario < horarioInicialBarbeiroSchedule) {
        horariosAnteriores.push(horario);
      }
    });
    horariosNoite.map((horario) => {
      if (horario < horarioInicialBarbeiroSchedule) {
        horariosAnteriores.push(horario);
      }
    });
    return horariosAnteriores;
  }

  function desabilitarHorariosPosteriores(
    horarioFinalBarbeiroSchedule: string,
  ) {
    const horariosPosteriores = [] as string[];
    horariosManha.map((horario) => {
      if (horario > horarioFinalBarbeiroSchedule) {
        horariosPosteriores.push(horario);
      }
    });
    horariosTarde.map((horario) => {
      if (horario > horarioFinalBarbeiroSchedule) {
        horariosPosteriores.push(horario);
      }
    });
    horariosNoite.map((horario) => {
      if (horario > horarioFinalBarbeiroSchedule) {
        horariosPosteriores.push(horario);
      }
    });
    return horariosPosteriores;
  }

  function handleSelectDay(day: Date) {
    const weekDayClick = day.getDay();
    getHorarioAtual(String(weekDayClick));
    setWeekDay(String(weekDayClick));
    setSelectHours('');
    setSelectDay(day);
  }

  function disableSchedule(horario: string): boolean {
    return (
      isHorarioMarcado(horario) ||
      isDataEHorarioPassado(selectDayFormatted, horario) ||
      desabilitarHorariosAnteriores(horarioInicialBarbeiroSchedule).includes(
        horario,
      ) ||
      desabilitarHorariosPosteriores(horarioFinalBarbeiroSchedule).includes(
        horario,
      )
    );
  }

  useEffect(() => {
    function getSchedule(weekDay: string) {
      const schedule = [] as Schedule[];
      const schedules = JSON.parse(barbeiro?.schedules || '[]');
      schedules.map((scheduleItem: Schedule) => {
        if (scheduleItem.week_day === weekDay) {
          schedule.push(scheduleItem);
        }
      });
      return schedule;
    }

    setHorarioInicialBarbeiroSchedule(
      getSchedule(weekDay || '0').map((schedule) => schedule.from),
    );
    setHorarioFinalBarbeiroSchedule(
      getSchedule(weekDay || '0').map((schedule) => schedule.to),
    );
  }, [weekDay]);

  return {
    setHorarioInicialBarbeiroSchedule,
    setHorarioFinalBarbeiroSchedule,
    getHorarioAtual,
    numerosFaltantes,
    desabilitarHorariosAnteriores,
    desabilitarHorariosPosteriores,
    horarioInicialBarbeiroSchedule,
    horarioFinalBarbeiroSchedule,
    setWeekDay,
    handleSelectDay,
    disableSchedule,
  };
}
