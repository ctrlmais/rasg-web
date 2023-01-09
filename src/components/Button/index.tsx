import { ButtonProps } from 'types/ComponentsProps';

import styles from './Button.module.scss';

export function Button({ children, ...props }: ButtonProps) {
  return (
    <button className={styles.button} {...props}>
      {children}
    </button>
  );
}
