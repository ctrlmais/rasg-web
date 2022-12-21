import { useEffect, useState } from 'react';
import { BsCalendarDate, BsClock, BsScissors } from 'react-icons/bs';

import Avvvatars from 'avvvatars-react';
import { format } from 'date-fns';
import { CardClienteProps } from 'types/ComponentsProps';

import styles from './CardCliente.module.scss';

export function CardCliente({
  cliente,
  data,
  first,
  ...props
}: CardClienteProps) {
  const [dateFormatted, setDateFormatted] = useState('');
  const [hoursFormatted, setHoursFormatted] = useState('');

  useEffect(() => {
    async function loadDate() {
      if (!cliente) return;

      setDateFormatted(format(new Date(cliente?.dtInicio), 'dd/MM/yyyy'));
      setHoursFormatted(format(new Date(cliente?.dtInicio), 'HH:mm'));
    }

    loadDate();
  }, [cliente]);

  return (
    <div
      className={first ? styles.cardFirst : styles.card}
      onClick={props.onClick}
      key={cliente?.cdAgendamento}
    >
      <div className={styles.alert}>
        <br />
      </div>
      <div className={styles.containerImg}>
        <Avvvatars value={cliente?.cliente?.nmUsuario || ''} size={50} />
      </div>
      <div className={styles.containerInfo}>
        <h2 className={styles.title}>{cliente?.cliente?.nmUsuario}</h2>
        <strong className={styles.info}>
          <BsClock color="#FF9000" size={16} style={{ marginRight: '8px' }} />
          {hoursFormatted} | {''}
          {data ? (
            <>
              <BsCalendarDate
                color="#FF9000"
                size={16}
                style={{ marginLeft: '6px', marginRight: '3px' }}
              />
              {dateFormatted}
            </>
          ) : (
            <>
              <BsScissors
                color="#FF9000"
                size={16}
                style={{ marginLeft: '6px', marginRight: '3px' }}
              />
              {cliente?.gerenciador?.nmUsuario}
            </>
          )}
        </strong>
      </div>
    </div>
  );
}
