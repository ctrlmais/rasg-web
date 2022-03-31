import { useEffect, useState } from 'react';

import { useFormik } from 'formik';
import { profileSchema } from 'validations/Profile';

import { useToast } from 'contexts/Toast';

import { useAuth } from 'hooks/useAuth';

import { supabase } from 'services/supabase';

export function useProfile() {
  const { toast } = useToast();

  const { user, setUser } = useAuth();
  const [loading, setLoading] = useState(false);

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
      const { user: userData, error } = await supabase.auth.update({
        email: values.email,
        password: values.password === '' ? undefined : values.newPassword,
        data: { name: values.nome },
      });

      const { error: errorAvatar } = await supabase.rpc('upsert_profile_photo', {
        p_user_id: user?.id,
        p_src: values.avatar,
      });

      if (errorAvatar || error) {
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
  };
}
