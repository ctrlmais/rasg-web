import cx from 'classnames';
import { SocialButtonProps } from 'types/IComponents';

import styles from './SocialButton.module.scss';

export function SocialButton(props: SocialButtonProps) {
  return (
    <button
      className={cx(styles.button, {
        [styles.google]: props.google,
        [styles.apple]: props.apple,
        [styles.whatsapp]: props.whatsapp,
      })}
      type="button"
      onClick={props.onClick}
    >
      {props.icon}
      {props.text}
    </button>
  );
}
