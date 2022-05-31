import ICalendarLink from 'react-icalendar-link';
import { SiApple, SiGooglecalendar } from 'react-icons/si';

import { useAgenda } from 'hooks/useAgenda';

import styles from './Agenda.module.scss';

export function Agenda() {
  const { handleGoogleCalendarCliente, enventSaveBarbeiro } = useAgenda();
  return (
    <div className={styles.wrapper}>
      <h2>Adicionar ao seu calendário</h2>

      <div className={styles.containerButton}>
        <button
          className={styles.google}
          type="button"
          onClick={() => {
            handleGoogleCalendarCliente();
          }}
        >
          <SiGooglecalendar />
          Adicionar ao Google Calendar
        </button>

        <button className={styles.apple} type="button">
          <SiApple />
          <ICalendarLink event={enventSaveBarbeiro}>
            Adicionar ao Apple Calendar
          </ICalendarLink>
        </button>
      </div>
    </div>
  );
}
