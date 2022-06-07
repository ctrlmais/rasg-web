import { FiCheck, FiLock, FiMail, FiUser } from 'react-icons/fi';
import PasswordStrengthBar from 'react-password-strength-bar';
import { Link } from 'react-router-dom';

import { Ring } from '@uiball/loaders';
import logoDark from 'assets/Logo_dark.png';
import logo from 'assets/Logo.png';
import salaoImage from 'assets/salao.png';

import { Button } from 'components/Button';
import { Input } from 'components/Input';
import { Ocupacao } from 'components/Ocupacao';
import { Overlay } from 'components/Overlay';

import { useTheme } from 'contexts/Theme';

import { useRegister } from 'hooks/useRegister';

import styles from './Register.module.scss';

export function Register() {
  const { theme } = useTheme();
  const { formikRegister, loading, status } = useRegister();

  return (
    <div className={styles.home} data-theme={theme}>
      {status === 'success' && (
        <Overlay
          title="Cadastramento concluído"
          description="Agora é só verificar seu email e fazer o login"
        >
          <FiCheck color="#04D361" size={62} />
        </Overlay>
      )}

      <img src={salaoImage} alt="baberiro" className={styles.image} />

      <div className={styles.logon}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            formikRegister.handleSubmit(e);
          }}
        >
          <div className={styles.form}>
            <img src={theme === 'light' ? logoDark : logo} alt="Logo" />
            <h2>Faça seu cadastro</h2>
            <Ocupacao />

            <Input
              type="text"
              name="nome"
              placeholder="Nome"
              onChange={formikRegister.handleChange}
              onBlur={formikRegister.handleBlur}
              value={formikRegister.values.nome}
              maxLength={100}
              icon={<FiUser color="#666360" size={24} />}
            />
            {formikRegister.errors.nome && formikRegister.touched.nome && (
              <span className={styles.error}>{formikRegister.errors.nome}</span>
            )}
            <Input
              type="email"
              name="email"
              placeholder="Email"
              onChange={formikRegister.handleChange}
              onBlur={formikRegister.handleBlur}
              value={formikRegister.values.email}
              icon={<FiMail color="#666360" size={24} />}
            />
            {formikRegister.errors.email && formikRegister.touched.email && (
              <span className={styles.error}>
                {formikRegister.errors.email}
              </span>
            )}
            <Input
              type="password"
              name="senha"
              placeholder="Senha"
              onChange={formikRegister.handleChange}
              onBlur={formikRegister.handleBlur}
              value={formikRegister.values.senha}
              icon={<FiLock color="#666360" size={24} />}
            />
            <PasswordStrengthBar
              className={styles.passwordStrengthBar}
              shortScoreWord={'Fraca'}
              password={formikRegister.values.senha}
              scoreWords={['Fraca', 'Média', 'Forte', 'Muito forte']}
            />

            <Input
              type="password"
              name="confirmarSenha"
              placeholder="Confirmar senha"
              onChange={formikRegister.handleChange}
              onBlur={formikRegister.handleBlur}
              value={formikRegister.values.confirmarSenha}
              icon={<FiLock color="#666360" size={24} />}
            />
            {formikRegister.errors.confirmarSenha &&
              formikRegister.touched.confirmarSenha && (
                <span className={styles.error}>
                  {formikRegister.errors.confirmarSenha}
                </span>
              )}

            <Button type="submit">
              {loading ? (
                <Ring speed={2} lineWeight={5} color="#28262e" size={32} />
              ) : (
                'Confirmar cadastro'
              )}
            </Button>
          </div>
        </form>

        <p>
          Já tem uma conta?{' '}
          <Link to="/" className={styles.link}>
            Faça seu login
          </Link>
        </p>
      </div>
    </div>
  );
}
