export function formatHours(horario: string) {
  const hora = horario.split(':')[0];
  const minuto = horario.split(':')[1];

  if (hora.length === 1) {
    return `0${hora}:${minuto}`;
  }

  return `${hora}:${minuto}`;
}
