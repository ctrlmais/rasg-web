import { BsCalendarDate, BsClock, BsScissors } from 'react-icons/bs';

import Avvvatars from 'avvvatars-react';
import { format } from 'date-fns';
import { CardClienteProps } from 'types/IComponents';

import { usePhoto } from 'hooks/usePhoto';

import styles from './CardCliente.module.scss';

export function CardCliente(props: CardClienteProps) {
  const { photo, name } = usePhoto(props.cliente?.client_id || '');

  const dateFormatted =
    format(new Date(props.cliente?.date || ''), 'dd/MM/yyyy') || '';

  return (
    <div
      className={props.first ? styles.cardFirst : styles.card}
      onClick={props.onClick}
      key={props.cliente?.client_id}
    >
      <div className={styles.alert}>
        <br />
      </div>
      <div className={styles.containerImg}>
        {photo === '' &&
        (props.cliente?.client_avatar === null ||
          props.cliente?.client_avatar === undefined) ? (
          <Avvvatars value={props.cliente?.client_name || ''} size={50} />
        ) : (
          <img
            src={
              photo ||
              props.cliente?.client_avatar ||
              props.cliente?.client_picture
            }
            alt={props.cliente?.client_name}
          />
        )}
      </div>
      <div className={styles.containerInfo}>
        <h2 className={styles.title}>{name || props.cliente?.client_name}</h2>
        <strong className={styles.info}>
          <BsClock color="#FF9000" size={16} style={{ marginRight: '8px' }} />
          {props.cliente?.hour} |{' '}
          {props.data ? (
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
              {props.cliente?.barber_name}
            </>
          )}
        </strong>
      </div>
    </div>
  );
}
