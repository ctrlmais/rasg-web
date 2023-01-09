import { FiLock, FiUser } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import { Ring } from '@uiball/loaders';
import { imgRasgDark, imgRasgLight, imgBarberLogin } from 'assets';

import { Button } from 'components/Button';
import { Input } from 'components/Input';

import { useTheme } from 'contexts/Theme';

import { useAuth } from 'hooks/useAuth';

import styles from './Login.module.scss';

export function Login() {
  const { theme } = useTheme();
  const { formikLogin, loading } = useAuth();

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
            <img
              src={theme === 'light' ? imgRasgDark : imgRasgLight}
              alt="Logo"
              className={styles.logo}
            />
            <h2>Faça seu Login</h2>

            <Input
              type="email"
              name="email"
              placeholder="Email"
              icon={<FiUser color="#666360" size={24} />}
              {...formikLogin.getFieldProps('email')}
            />

            <Input
              type="password"
              name="password"
              placeholder="Senha"
              icon={<FiLock color="#666360" size={24} />}
              {...formikLogin.getFieldProps('password')}
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
      <img src={imgBarberLogin} alt="baberiro" className={styles.image} />
    </div>
  );
}
