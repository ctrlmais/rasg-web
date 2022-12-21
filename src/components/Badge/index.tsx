import cx from 'classnames';
import { BadgeProps } from 'types/ComponentsProps';

import styles from './Badge.module.scss';

export function Badge({ children, primary }: BadgeProps) {
  return (
    <>
      <span
        className={cx(styles.badge, {
          [styles.primary]: primary,
        })}
      >
        {children}
      </span>
    </>
  );
}
