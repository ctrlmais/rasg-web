import { format } from 'date-fns';
import { ClienteMetadata } from 'types/IContext';

import { useUser } from 'contexts/User';

export function useAgenda() {
  const cliente = JSON.parse(
    localStorage.getItem('cliente') || '',
  ) as ClienteMetadata;
  const { generateGoogleCalendarEvent, selectDayFormatted } = useUser();

  const hourFormattedCalendarCliente = cliente?.hour?.replace(':', '');
  const hourFormattedCalendarClienteEnd =
    Number(hourFormattedCalendarCliente) + 100;
  const hourFormattedCalendarClienteEndFormatted = `${hourFormattedCalendarClienteEnd
    .toString()
    .substring(0, 2)}:${hourFormattedCalendarClienteEnd
    .toString()
    .substring(2, 4)}`;
  const dateFormattedCalendar = format(
    new Date(cliente?.appointment_date),
    'yyyyMMdd',
  );
  const startDatesCliente =
    dateFormattedCalendar + 'T' + hourFormattedCalendarCliente;
  const endDatesCliente =
    dateFormattedCalendar + 'T' + hourFormattedCalendarClienteEnd;

  const enventSaveBarbeiro = {
    title: `Barba, cabelo e bigode com ${cliente?.client_name}`,
    description: `Barbearia do ${cliente?.barber_name}`,
    startTime: `${selectDayFormatted}T${cliente?.hour}`,
    endTime: `${selectDayFormatted}T${hourFormattedCalendarClienteEndFormatted}`,
    location: '',
  };

  function handleGoogleCalendarCliente() {
    const title = `Barba, cabelo e bigode com ${cliente?.client_name}`;
    const description = `Barbearia do ${cliente?.barber_name}`;
    const location = '';

    generateGoogleCalendarEvent(
      title,
      startDatesCliente,
      endDatesCliente,
      description,
      location,
    );
  }

  return {
    handleGoogleCalendarCliente,
    enventSaveBarbeiro,
  };
}
