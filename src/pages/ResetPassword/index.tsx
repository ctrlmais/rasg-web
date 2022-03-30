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
    <>
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
                name="senha"
                placeholder="Senha"
                onChange={formikResetPassword.handleChange}
                onBlur={formikResetPassword.handleBlur}
                value={formikResetPassword.values.senha}
                icon={<FiLock color="#666360" size={24} />}
              />
              {formikResetPassword.errors.senha && formikResetPassword.touched.senha && (
                <span>{formikResetPassword.errors.senha}</span>
              )}

              <Input
                type="password"
                name="confirmarSenha"
                placeholder="Confirmar senha"
                onChange={formikResetPassword.handleChange}
                onBlur={formikResetPassword.handleBlur}
                value={formikResetPassword.values.confirmarSenha}
                icon={<FiLock color="#666360" size={24} />}
              />
              {formikResetPassword.errors.confirmarSenha && formikResetPassword.touched.confirmarSenha && (
                <span>{formikResetPassword.errors.confirmarSenha}</span>
              )}

              <Button type="submit">Alterar senha</Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
