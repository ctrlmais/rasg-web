import { ICalendar } from 'datebook';

import { useUser } from 'contexts/User';

export function useOverlay() {
  const {
    barbeiro,
    generateGoogleCalendarEvent,
    startDate,
    endDate,
    selectDayFormatted,
    selectHours,
  } = useUser();

  const hourFormattedCalendar = selectHours.replace(':', '');
  const hourFormattedCalendarEnd = Number(hourFormattedCalendar) + 100;
  const hourFormattedCalendarEndFormatted = `${hourFormattedCalendarEnd
    .toString()
    .substring(0, 2)}:${hourFormattedCalendarEnd.toString().substring(2, 4)}`;

  const eventSaveCliente = new ICalendar({
    title: `Barba, cabelo e bigode com ${barbeiro?.nome}`,
    description: `Barbearia do ${barbeiro?.nome}`,
    start: new Date(`${selectDayFormatted}T${selectHours}`),
    end: new Date(`${selectDayFormatted}T${hourFormattedCalendarEndFormatted}`),
    location: '',
  });

  function handleGoogleCalendar() {
    const title = `Barba, cabelo e bigode com ${barbeiro?.nome}`;
    const description = `Barbearia do ${barbeiro?.nome}`;
    const location = '';

    generateGoogleCalendarEvent(
      title,
      startDate,
      endDate,
      description,
      location,
    );
  }

  return {
    handleGoogleCalendar,
    eventSaveCliente,
  };
}
