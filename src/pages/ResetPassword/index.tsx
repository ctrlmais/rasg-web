import { FiLock } from 'react-icons/fi';

import logoDark from 'assets/Logo_dark.png';
import logo from 'assets/Logo.png';
import salaoImage from 'assets/salao.png';

import { Button } from 'components/Button';
import { Input } from 'components/Input';

import { useTheme } from 'contexts/Theme';

import { useForgetPassword } from 'hooks/useForgetPassword';

import styles from './ResetPassword.module.scss';

export function ResetPassword() {
  const { theme } = useTheme();
  const { formikResetPassword } = useForgetPassword();

  return (
    <div className={styles.home} data-theme={theme}>
      <img src={salaoImage} alt="baberiro" className={styles.image} />

      <div className={styles.logon}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            formikResetPassword.handleSubmit(e);
          }}
        >
          <div className={styles.form}>
            <img src={theme === 'light' ? logoDark : logo} alt="Logo" />
            <h2>Redefinir senha</h2>

            <Input
              type="password"
              name="password"
              placeholder="Senha"
              onChange={formikResetPassword.handleChange}
              onBlur={formikResetPassword.handleBlur}
              value={formikResetPassword.values.password}
              icon={<FiLock color="#666360" size={24} />}
            />
            {formikResetPassword.errors.password &&
              formikResetPassword.touched.password && (
                <span className={styles.error}>
                  {formikResetPassword.errors.password}
                </span>
              )}

            <Input
              type="password"
              name="confirmPassword"
              placeholder="Confirmar senha"
              onChange={formikResetPassword.handleChange}
              onBlur={formikResetPassword.handleBlur}
              value={formikResetPassword.values.confirmPassword}
              icon={<FiLock color="#666360" size={24} />}
            />
            {formikResetPassword.errors.confirmPassword &&
              formikResetPassword.touched.confirmPassword && (
                <span className={styles.error}>
                  {formikResetPassword.errors.confirmPassword}
                </span>
              )}

            <Button type="submit">Alterar senha</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
