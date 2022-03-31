import { FiMail, FiUser } from 'react-icons/fi';

import { SpinnerCircular } from 'spinners-react';

import { Button } from 'components/Button';
import Dropzone from 'components/Dropzone';
import { Header } from 'components/Header';
import { Input } from 'components/Input';

import { useTheme } from 'contexts/Theme';

import { useProfile } from 'hooks/useProfile';

import styles from './Profile.module.scss';

export function Profile() {
  const { theme } = useTheme();

  const { formikProfile, loading } = useProfile();

  function convertImageToBase64(file: File) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  return (
    <>
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

            <h2>Meu Perfil</h2>
            <div className={styles.perfilContainer}>
              <Input
                type="text"
                name="nome"
                placeholder="Nome"
                onChange={formikProfile.handleChange}
                onBlur={formikProfile.handleBlur}
                value={formikProfile.values.nome}
                maxLength={100}
                icon={<FiUser color="#666360" size={24} />}
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
              />
              {formikProfile.errors.email && formikProfile.touched.email && (
                <span className={styles.error}>{formikProfile.errors.email}</span>
              )}
            </div>

            <div className={styles.passwordContainer}>
              <Input
                type="password"
                name="password"
                placeholder="Senha Atual"
                onChange={formikProfile.handleChange}
                onBlur={formikProfile.handleBlur}
                value={formikProfile.values.password}
                icon={<FiMail color="#666360" size={24} />}
              />
              {formikProfile.errors.password && formikProfile.touched.password && (
                <span className={styles.error}>{formikProfile.errors.password}</span>
              )}
              <Input
                type="password"
                name="newPassword"
                placeholder="Nova Senha"
                onChange={formikProfile.handleChange}
                onBlur={formikProfile.handleBlur}
                value={formikProfile.values.newPassword}
                icon={<FiMail color="#666360" size={24} />}
              />
              {formikProfile.errors.newPassword && formikProfile.touched.newPassword && (
                <span className={styles.error}>{formikProfile.errors.newPassword}</span>
              )}
              <Input
                type="password"
                name="confirmPassword"
                placeholder="Confirmar Senha"
                onChange={formikProfile.handleChange}
                onBlur={formikProfile.handleBlur}
                value={formikProfile.values.confirmPassword}
                icon={<FiMail color="#666360" size={24} />}
              />
              {formikProfile.errors.confirmPassword && formikProfile.touched.confirmPassword && (
                <span className={styles.error}>{formikProfile.errors.confirmPassword}</span>
              )}
            </div>

            <Button type="submit">
              {loading ? <SpinnerCircular color="#28262e" size={32} /> : 'Confirmar mudanças'}
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
