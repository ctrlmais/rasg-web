import { ButtonProps } from 'types/IComponents';

import styles from './Button.module.scss';
export function Button(props: ButtonProps) {
  return (
    <button type={props.type} className={styles.button} onClick={props.onClick}>
      {props.children}
    </button>
  );
}
