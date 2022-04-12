import { useState } from 'react';

import { Schedule } from 'types/IContext';

import { horariosManha, horariosNoite, horariosTarde } from 'utils/horarios';

import { useUser } from 'contexts/User';

export function useSchedule() {
  const { barbeiro } = useUser();
  const weekDay = new Date().getDay();

  const schedules = JSON.parse(barbeiro?.schedules || '[]');

  if (!barbeiro) window.location.assign('/');

  const [horarioInicialBarbeiroSchedule, setHorarioInicialBarbeiroSchedule] = useState(
    JSON.parse(barbeiro?.schedules)[weekDay]?.from || '',
  );
  const [horarioFinalBarbeiroSchedule, setHorarioFinalBarbeiroSchedule] = useState(
    JSON.parse(barbeiro?.schedules)[weekDay]?.to || '',
  );

  function getHorarioAtual(week_day: string) {
    const horario = [] as string[];
    schedules?.map((schedule: Schedule) => {
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

  function desabilitarHorariosAnteriores(horarioInicialBarbeiroSchedule: string) {
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

  function desabilitarHorariosPosteriores(horarioFinalBarbeiroSchedule: string) {
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

  return {
    setHorarioInicialBarbeiroSchedule,
    setHorarioFinalBarbeiroSchedule,
    getHorarioAtual,
    numerosFaltantes,
    desabilitarHorariosAnteriores,
    desabilitarHorariosPosteriores,
    horarioInicialBarbeiroSchedule,
    horarioFinalBarbeiroSchedule,
  };
}
