import { HorariosProps } from 'types/ComponentsProps';

import { useUser } from 'contexts/User';

import styles from './Horarios.module.scss';

export function HorariosMarcacao({
  disabled,
  horario,
  children,
  ...props
}: HorariosProps) {
  const { selectHours } = useUser();

  return (
    <button
      disabled={disabled}
      className={selectHours === horario ? styles.selected : styles.horario}
      {...props}
    >
      {children}
    </button>
  );
}
