import { FiUser } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import { imgBarberLogin, imgRasgDark, imgRasgLight } from 'assets';

import { Button } from 'components/Button';
import { Input } from 'components/Input';

import { useTheme } from 'contexts/Theme';

import { useForgetPassword } from 'hooks/useForgetPassword';

import styles from './ForgetPassword.module.scss';

export function ForgetPassword() {
  const { theme } = useTheme();
  const { formikForgetPassword } = useForgetPassword();

  return (
    <div className={styles.home} data-theme={theme}>
      <div className={styles.logon}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            formikForgetPassword.handleSubmit(e);
          }}
        >
          <div className={styles.form}>
            <img
              src={theme === 'light' ? imgRasgDark : imgRasgLight}
              alt="Logo"
              className={styles.logo}
            />
            <h2>Recuperar senha</h2>

            <Input
              type="email"
              placeholder="Email"
              icon={<FiUser color="#666360" size={24} />}
              {...formikForgetPassword.getFieldProps('email')}
            />
            {formikForgetPassword.errors.email &&
              formikForgetPassword.touched.email && (
                <span className={styles.error}>
                  {formikForgetPassword.errors.email}
                </span>
              )}

            <Button type="submit">Recuperar</Button>
          </div>
        </form>

        <p>
          <Link to="/" className={styles.link}>
            Voltar ao login
          </Link>
        </p>
      </div>
      <img src={imgBarberLogin} alt="baberiro" className={styles.image} />
    </div>
  );
}
