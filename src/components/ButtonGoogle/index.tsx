import logoGoogle from 'assets/google-icon.svg';
import { ButtonProps } from 'types/ComponentsProps';

import styles from './ButtonGoogle.module.scss';

export function ButtonGoogle(props: ButtonProps) {
  return (
    <button className={styles.googleBtn} {...props}>
      <div className={styles.googleIconWrapper}>
        <img className={styles.googleIcon} src={logoGoogle} />
      </div>
      <p className={styles.btnText}>
        <b>Fazer login com o Google</b>
      </p>
    </button>
  );
}
