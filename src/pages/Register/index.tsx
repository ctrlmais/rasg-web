import { FiCheck, FiLock, FiMail, FiUser } from 'react-icons/fi';
import { SiWhatsapp } from 'react-icons/si';
import PasswordStrengthBar from 'react-password-strength-bar';
import { Link } from 'react-router-dom';

import { Ring } from '@uiball/loaders';
import logoDark from 'assets/rasg_dark.png';
import logo from 'assets/rasg.png';
import salaoImage from 'assets/salao.png';

import { Button } from 'components/Button';
import { Input } from 'components/Input';
import { Ocupacao } from 'components/Ocupacao';
import { Overlay } from 'components/Overlay';

import { formatCellPhone } from 'utils/telefone';

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
              placeholder="Nome"
              maxLength={100}
              icon={<FiUser color="#666360" size={24} />}
              {...formikRegister.getFieldProps('nome')}
            />
            {formikRegister.errors.nome && formikRegister.touched.nome && (
              <span className={styles.error}>{formikRegister.errors.nome}</span>
            )}
            <Input
              type="email"
              placeholder="Email"
              icon={<FiMail color="#666360" size={24} />}
              {...formikRegister.getFieldProps('email')}
            />
            {formikRegister.errors.email && formikRegister.touched.email && (
              <span className={styles.error}>
                {formikRegister.errors.email}
              </span>
            )}
            <Input
              type="text"
              name="phone"
              placeholder="WhatsApp"
              onChange={formikRegister.handleChange}
              onBlur={formikRegister.handleBlur}
              value={formatCellPhone(formikRegister.values.phone)}
              icon={<SiWhatsapp color="#666360" size={24} />}
              maxLength={11}
            />
            {formikRegister.errors.phone && formikRegister.touched.phone && (
              <span className={styles.error}>
                {formikRegister.errors.phone}
              </span>
            )}
            <Input
              type="password"
              placeholder="Senha"
              icon={<FiLock color="#666360" size={24} />}
              {...formikRegister.getFieldProps('password')}
            />
            {formikRegister.values.password.length >= 6 && (
              <PasswordStrengthBar
                className={styles.passwordStrengthBar}
                shortScoreWord={'Fraca'}
                password={formikRegister.values.password}
                scoreWords={['Fraca', 'Média', 'Forte', 'Muito forte']}
              />
            )}

            <Input
              type="password"
              placeholder="Confirmar senha"
              icon={<FiLock color="#666360" size={24} />}
              {...formikRegister.getFieldProps('confirmPassword')}
            />
            {formikRegister.errors.confirmPassword &&
              formikRegister.touched.confirmPassword && (
                <span className={styles.error}>
                  {formikRegister.errors.confirmPassword}
                </span>
              )}

            <div className={styles.disclaimer}>
              Ao se registrar, você concorda com os{' '}
              <Link to="/terms" className={styles.color}>
                Termos de Uso
              </Link>{' '}
              e{' '}
              <Link to="/privacy" className={styles.color}>
                Privacidade
              </Link>
              .
            </div>

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
