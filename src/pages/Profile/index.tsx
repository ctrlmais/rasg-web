import { FiLock, FiMail, FiUser } from 'react-icons/fi';
import { IoMdClose } from 'react-icons/io';
import { SiWhatsapp } from 'react-icons/si';
import PasswordStrengthBar from 'react-password-strength-bar';

import { Ring } from '@uiball/loaders';

import { Button } from 'components/Button';
import Dropzone from 'components/Dropzone';
import { Header } from 'components/Header';
import { Input } from 'components/Input';

import { convertImageToBase64 } from 'utils/convertBase64';
import { formatCellPhone } from 'utils/telefone';

import { useTheme } from 'contexts/Theme';

import { useProfile } from 'hooks/useProfile';

import styles from './Profile.module.scss';

export function Profile() {
  const { theme } = useTheme();

  const {
    formikProfile,
    loading,
    isGoogle,
    showNewPassword,
    showPassword,
    apagarPicture,
    idPictureProfile,
  } = useProfile();

  return (
    <div className={styles.home} data-theme={theme}>
      <Header back />

      <div className={styles.container}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            formikProfile.handleSubmit(e);
          }}
        >
          <Dropzone
            onFileUploaded={(file) => {
              convertImageToBase64(file).then((base64) => {
                formikProfile.setFieldValue('avatar', base64);
              });
            }}
          />

          {idPictureProfile && (
            <div
              className={styles.removeButton}
              onClick={() => {
                apagarPicture();
              }}
            >
              <IoMdClose />
            </div>
          )}

          <h2>Meu Perfil</h2>
          <div
            className={styles.inputContainer}
            style={{
              height: showPassword ? '28rem' : '13rem',
            }}
          >
            <Input
              type="text"
              name="nome"
              placeholder="Nome"
              onChange={formikProfile.handleChange}
              onBlur={formikProfile.handleBlur}
              value={formikProfile.values.nome}
              maxLength={100}
              icon={<FiUser color="#666360" size={24} />}
              disabled={isGoogle()}
            />
            {formikProfile.errors.nome && formikProfile.touched.nome && (
              <span className={styles.error}>{formikProfile.errors.nome}</span>
            )}
            <Input
              type="email"
              name="email"
              placeholder="Email"
              onChange={formikProfile.handleChange}
              onBlur={formikProfile.handleBlur}
              value={formikProfile.values.email}
              icon={<FiMail color="#666360" size={24} />}
              disabled={isGoogle()}
            />
            {formikProfile.errors.email && formikProfile.touched.email && (
              <span className={styles.error}>{formikProfile.errors.email}</span>
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
            {formikProfile.errors.phone && formikProfile.touched.phone && (
              <span className={styles.error}>{formikProfile.errors.phone}</span>
            )}

            {showPassword && (
              <>
                <Input
                  type="password"
                  name="password"
                  placeholder="Senha Atual"
                  onChange={formikProfile.handleChange}
                  onBlur={formikProfile.handleBlur}
                  value={formikProfile.values.password}
                  icon={<FiLock color="#666360" size={24} />}
                />
                {formikProfile.errors.password &&
                  formikProfile.touched.password && (
                    <span className={styles.error}>
                      {formikProfile.errors.password}
                    </span>
                  )}
                <Input
                  type="password"
                  name="newPassword"
                  placeholder="Nova Senha"
                  onChange={formikProfile.handleChange}
                  onBlur={formikProfile.handleBlur}
                  value={formikProfile.values.newPassword}
                  icon={<FiLock color="#666360" size={24} />}
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
                  name="confirmPassword"
                  placeholder="Confirmar Senha"
                  onChange={formikProfile.handleChange}
                  onBlur={formikProfile.handleBlur}
                  value={formikProfile.values.confirmPassword}
                  icon={<FiLock color="#666360" size={24} />}
                />
                {formikProfile.errors.confirmPassword &&
                  formikProfile.touched.confirmPassword && (
                    <span className={styles.error}>
                      {formikProfile.errors.confirmPassword}
                    </span>
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
  );
}
