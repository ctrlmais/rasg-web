import cx from 'classnames';
import { SocialButtonProps } from 'types/ComponentsProps';

import styles from './SocialButton.module.scss';

export function SocialButton({
  icon,
  text,
  apple,
  google,
  whatsapp,
  ...props
}: SocialButtonProps) {
  return (
    <button
      className={cx(styles.button, {
        [styles.google]: google,
        [styles.apple]: apple,
        [styles.whatsapp]: whatsapp,
      })}
      type="button"
      {...props}
    >
      {icon}
      {text}
    </button>
  );
}
