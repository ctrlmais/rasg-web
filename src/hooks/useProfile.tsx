import { useEffect, useState } from 'react';

import { useFormik } from 'formik';
import { profileSchema } from 'validations/Profile';

import { useToast } from 'contexts/Toast';

import { useAuth } from 'hooks/useAuth';

import { updateProfile } from 'services/update/profile';
import { updateProfilePhoto } from 'services/update/profileAvatar';

export function useProfile() {
  const { toast } = useToast();
  const { user, setUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  function isGoogle() {
    if (user?.app_metadata.provider === 'google') {
      return true;
    }

    return false;
  }

  function isEmail() {
    if (user?.app_metadata.provider === 'email') {
      return true;
    }

    return false;
  }

  function showNewPassword() {
    setShowPassword(!showPassword);
  }

  const formikProfile = useFormik({
    initialValues: {
      avatar: '',
      nome: '',
      email: '',
      password: '',
      newPassword: '',
      confirmPassword: '',
      phone: '',
    },
    validationSchema: profileSchema,
    onSubmit: async (values) => {
      setLoading(true);

      const { user: userData, error } = await updateProfile(
        values.email,
        values.password,
        values.newPassword,
        values.nome,
        values.phone,
      );

      if (!userData) return;

      if (values.avatar !== '') {
        const { error } = await updateProfilePhoto(userData.id, values.avatar);

        if (error) {
          toast.error(error.message, { id: 'toast' });
          setLoading(false);
          return;
        }
      }

      if (error) {
        toast.error('Não foi possível atualizar perfil', { id: 'toast' });
        setLoading(false);
        return;
      }

      if (formikProfile.values.email !== userData.email) {
        toast.success(
          'Verifique a sua caixa de entrada para confirmar a mudança de email',
          { id: 'toast' },
        );
        setLoading(false);
      } else {
        toast.success('Perfil atualizado com sucesso', { id: 'toast' });
        setLoading(false);
        setUser(userData);
        formikProfile.setFieldValue('password', '');
        formikProfile.setFieldValue('newPassword', '');
        formikProfile.setFieldValue('confirmPassword', '');
      }
    },
  });

  useEffect(() => {
    formikProfile.setFieldValue('nome', user?.user_metadata.name);
    formikProfile.setFieldValue('email', user?.email);
    formikProfile.setFieldValue('phone', user?.user_metadata.phone);
  }, [user]);

  return {
    formikProfile,
    loading,
    isGoogle,
    isEmail,
    showNewPassword,
    showPassword,
  };
}
