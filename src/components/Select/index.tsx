import { SelectProps } from 'types/ComponentsProps';

import styles from './Select.module.scss';

export function Select({ name, onChange, onBlur, children }: SelectProps) {
  return (
    <div className={styles.global}>
      <select
        className={styles.input}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
      >
        {children}
      </select>
    </div>
  );
}
