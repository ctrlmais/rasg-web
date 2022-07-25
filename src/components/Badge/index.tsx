import cx from 'classnames';
import { BadgeProps } from 'types/IComponents';

import styles from './Badge.module.scss';

export function Badge(props: BadgeProps) {
  return (
    <>
      <span
        className={cx(styles.badge, {
          [styles.primary]: props.primary,
        })}
      >
        {props.children}
      </span>
    </>
  );
}
