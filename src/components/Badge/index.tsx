import cx from 'classnames';

import styles from './Badge.module.scss';

interface IBadgeProps {
  primary: boolean;
  children: React.ReactNode;
}

export function Badge(props: IBadgeProps) {
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
