import { HorariosProps } from 'types/IComponents';

import { useUser } from 'contexts/User';

import styles from './Horarios.module.scss';

export function HorariosMarcacao(props: HorariosProps) {
  const { selectHours } = useUser();

  return (
    <button
      disabled={props.disabled}
      className={
        selectHours === props.horario ? styles.selected : styles.horario
      }
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}
