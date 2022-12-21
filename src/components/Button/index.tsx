import { ButtonProps } from 'types/ComponentsProps';

import styles from './Button.module.scss';

export function Button(props: ButtonProps) {
  return (
    <button className={styles.button} {...props}>
      {props.children}
    </button>
  );
}
