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

  const formikProfile = useFormik({
    initialValues: {
      avatar: '',
      nome: '',
      email: '',
      password: '',
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema: profileSchema,
    onSubmit: async (values) => {
      setLoading(true);

      const { user: userData, error } = await updateProfile(
        values.email,
        values.password,
        values.newPassword,
        values.nome,
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

      toast.success('Perfil atualizado com sucesso', { id: 'toast' });
      setLoading(false);
      setUser(userData);
    },
  });

  useEffect(() => {
    formikProfile.setFieldValue('nome', user?.user_metadata.name);
    formikProfile.setFieldValue('email', user?.email);
  }, [user]);

  return {
    formikProfile,
    loading,
    isGoogle,
    isEmail,
  };
}
