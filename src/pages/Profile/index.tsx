import { FiLink, FiLock, FiMail, FiShare, FiUser } from 'react-icons/fi';
import { SiWhatsapp } from 'react-icons/si';
import PasswordStrengthBar from 'react-password-strength-bar';
import { RWebShare } from 'react-web-share';

import { Skeleton } from '@mui/material';
import { Ring } from '@uiball/loaders';

import { Button } from 'components/Button';
import { Dropzone } from 'components/Dropzone';
import { Header } from 'components/Header';
import { Input } from 'components/Input';

import { formatCellPhone } from 'utils/telefone';

import { useTheme } from 'contexts/Theme';

import { useCliente } from 'hooks/useCliente';
import { usePerfil } from 'hooks/usePerfil';
import { useProfile } from 'hooks/useProfile';

import styles from './Profile.module.scss';

export function Profile() {
  const { theme } = useTheme();

  const {
    formikProfile,
    loading,
    showNewPassword,
    showPassword,
    putPhotoServices,
  } = useProfile();
  const { userNameDefault } = useCliente();
  const { isBarbeiro } = usePerfil();

  const LINK_INDICACAO = `${window.location.origin}/p/${userNameDefault(
    formikProfile.values.nome,
  )}`;

  return (
    <>
      <div className={styles.home} data-theme={theme}>
        <Header logo path="/profile" />

        <div className={styles.container}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              formikProfile.handleSubmit(e);
            }}
          >
            {loading ? (
              <Skeleton
                variant="circular"
                width={180}
                height={180}
                style={{
                  margin: '0 auto',
                  marginTop: '40px',
                  marginBottom: '18px',
                }}
              />
            ) : (
              <Dropzone
                onFileUploaded={(file) => {
                  putPhotoServices(file);
                  formikProfile.setFieldValue('avatar', file);
                }}
              />
            )}

            <h2>Meu Perfil</h2>
            <div
              className={styles.inputContainer}
              style={{
                height: isBarbeiro ? '18rem' : '14rem',
              }}
            >
              {showPassword ? (
                <>
                  <Input
                    type="password"
                    placeholder="Senha Atual"
                    icon={<FiLock color="#666360" size={24} />}
                    {...formikProfile.getFieldProps('password')}
                  />
                  {formikProfile.errors.password &&
                    formikProfile.touched.password && (
                      <span className={styles.error}>
                        {formikProfile.errors.password}
                      </span>
                    )}
                  <Input
                    type="password"
                    placeholder="Nova Senha"
                    icon={<FiLock color="#666360" size={24} />}
                    {...formikProfile.getFieldProps('newPassword')}
                  />
                  {formikProfile.values.newPassword.length >= 6 && (
                    <PasswordStrengthBar
                      className={styles.passwordStrengthBar}
                      shortScoreWord={'Fraca'}
                      password={formikProfile.values.newPassword}
                      scoreWords={['Fraca', 'Média', 'Forte', 'Muito forte']}
                    />
                  )}
                  {formikProfile.errors.newPassword &&
                    formikProfile.touched.newPassword && (
                      <span className={styles.error}>
                        {formikProfile.errors.newPassword}
                      </span>
                    )}
                  <Input
                    type="password"
                    placeholder="Confirmar Senha"
                    icon={<FiLock color="#666360" size={24} />}
                    {...formikProfile.getFieldProps('confirmPassword')}
                  />
                  {formikProfile.errors.confirmPassword &&
                    formikProfile.touched.confirmPassword && (
                      <span className={styles.error}>
                        {formikProfile.errors.confirmPassword}
                      </span>
                    )}
                </>
              ) : (
                <>
                  <Input
                    type="text"
                    placeholder="Nome"
                    maxLength={100}
                    icon={<FiUser color="#666360" size={24} />}
                    {...formikProfile.getFieldProps('nome')}
                  />
                  {formikProfile.errors.nome && formikProfile.touched.nome && (
                    <span className={styles.error}>
                      {formikProfile.errors.nome}
                    </span>
                  )}
                  <Input
                    type="email"
                    placeholder="Email"
                    icon={<FiMail color="#666360" size={24} />}
                    {...formikProfile.getFieldProps('email')}
                  />
                  {formikProfile.errors.email &&
                    formikProfile.touched.email && (
                      <span className={styles.error}>
                        {formikProfile.errors.email}
                      </span>
                    )}

                  <Input
                    type="text"
                    name="phone"
                    placeholder="WhatsApp"
                    onChange={formikProfile.handleChange}
                    onBlur={formikProfile.handleBlur}
                    value={formatCellPhone(formikProfile.values.phone)}
                    maxLength={11}
                    icon={<SiWhatsapp color="#666360" size={24} />}
                  />
                  {formikProfile.errors.phone &&
                    formikProfile.touched.phone && (
                      <span className={styles.error}>
                        {formikProfile.errors.phone}
                      </span>
                    )}

                  {isBarbeiro && (
                    <div className={styles.linkShareContainer}>
                      <Input
                        type="text"
                        name="link"
                        disabled
                        placeholder="Seu link de indicação"
                        onChange={formikProfile.handleChange}
                        onBlur={formikProfile.handleBlur}
                        value={LINK_INDICACAO}
                        style={{ width: '320px' }}
                        icon={<FiLink color="#666360" size={24} />}
                      />
                      <RWebShare
                        data={{
                          text: 'Compartilhe o seu link de indicação',
                          url: LINK_INDICACAO,
                          title: 'Venha cortar o cabelo comigo!',
                        }}
                        onClick={(e: any) => {
                          e.preventDefault();
                        }}
                      >
                        <div className={styles.buttonShare}>
                          <FiShare size={24} />
                        </div>
                      </RWebShare>
                    </div>
                  )}
                </>
              )}
            </div>

            <div className={styles.buttonContainer}>
              <Button
                type="button"
                onClick={() => {
                  showNewPassword();
                }}
              >
                {showPassword ? 'Cancelar' : 'Trocar de senha'}
              </Button>
              <Button type="submit">
                {loading ? (
                  <Ring speed={2} lineWeight={5} color="#28262e" size={32} />
                ) : (
                  'Confirmar mudanças'
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
