import logoGoogle from 'assets/google-icon.svg';
import { ButtonGoogleProps } from 'types/IComponents';

import styles from './ButtonGoogle.module.scss';

export function ButtonGoogle(props: ButtonGoogleProps) {
  return (
    <div className={styles.googleBtn} onClick={props.onClick}>
      <div className={styles.googleIconWrapper}>
        <img className={styles.googleIcon} src={logoGoogle} />
      </div>
      <p className={styles.btnText}>
        <b>Fazer login com o Google</b>
      </p>
    </div>
  );
}
