import { FiLock, FiUser } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import { Ring } from '@uiball/loaders';
import barberImage from 'assets/barber.png';
import logoDark from 'assets/Logo_dark.png';
import logo from 'assets/Logo.png';

import { Button } from 'components/Button';
import { ButtonGoogle } from 'components/ButtonGoogle';
import { Input } from 'components/Input';

import { useTheme } from 'contexts/Theme';

import { useAuth } from 'hooks/useAuth';

import styles from './Login.module.scss';

export function Login() {
  const { theme } = useTheme();
  const { formikLogin, handleLoginGoogle, loading } = useAuth();

  return (
    <div className={styles.home} data-theme={theme}>
      <div className={styles.logon}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            formikLogin.handleSubmit(e);
          }}
        >
          <div className={styles.form}>
            <img src={theme === 'light' ? logoDark : logo} alt="Logo" />
            <h2>Faça seu Login</h2>
            <ButtonGoogle
              type="button"
              onClick={() => {
                handleLoginGoogle();
              }}
            />

            <div className={styles.separator}>ou </div>

            <Input
              type="email"
              name="email"
              placeholder="Email"
              onChange={formikLogin.handleChange}
              onBlur={formikLogin.handleBlur}
              value={formikLogin.values.email}
              icon={<FiUser color="#666360" size={24} />}
            />
            {formikLogin.errors.email && (
              <span className={styles.error}>{formikLogin.errors.email}</span>
            )}

            <Input
              type="password"
              name="senha"
              placeholder="Senha"
              onChange={formikLogin.handleChange}
              onBlur={formikLogin.handleBlur}
              value={formikLogin.values.senha}
              icon={<FiLock color="#666360" size={24} />}
            />

            <Button type="submit">
              {loading ? (
                <Ring speed={2} lineWeight={5} color="#28262e" size={32} />
              ) : (
                'Entrar'
              )}
            </Button>
          </div>
        </form>

        <p>
          <Link to="/forget-password" className={styles.forgetPassword}>
            Esqueci minha senha
          </Link>
        </p>

        <p>
          Não tem uma conta?{' '}
          <Link to="/register" className={styles.link}>
            Cadastre-se
          </Link>
        </p>
      </div>
      <img src={barberImage} alt="baberiro" className={styles.image} />
    </div>
  );
}
