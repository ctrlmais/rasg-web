import { InputProps } from 'types/ComponentsProps';

import styles from './Input.module.scss';

export function Input(props: InputProps) {
  return (
    <div className={styles.global}>
      <span className={styles.icon}>{props.icon}</span>
      <input {...props} className={styles.input} />
    </div>
  );
}
