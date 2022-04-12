import { ButtonProps } from 'types/IComponents';

import styles from './Button.module.scss';
export function Button(props: ButtonProps) {
  return (
    <button
      type={props.type}
      className={styles.button}
      onClick={props.onClick}
      disabled={props.disabled}
      style={props.style}
    >
      {props.children}
    </button>
  );
}
