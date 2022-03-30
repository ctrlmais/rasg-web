import { InputProps } from 'types/IComponents';

import styles from './Input.module.scss';

export function Input(props: InputProps) {
  return (
    <div className={styles.global}>
      <span className={styles.icon}>{props.icon}</span>
      <input
        {...props}
        className={styles.input}
        type={props.type}
        name={props.name}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
        maxLength={props.maxLength}
      />
    </div>
  );
}
