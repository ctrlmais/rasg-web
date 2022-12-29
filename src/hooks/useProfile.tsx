import { useEffect, useState } from 'react';

import { useFormik } from 'formik';
import { profileSchema } from 'validations/Profile';

import { useToast } from 'contexts/Toast';

import { useAuth } from 'hooks/useAuth';

import { putUserAWS } from 'services/update';

export function useProfile() {
  const { toast } = useToast();
  const { user, setUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
      if (!user) return;

      const newValues = {
        cdUsuario: Number(user.cdUsuario),
        nmUsuario: values.nome,
        nmSenha: user.nmSenha,
        nmEmail: values.email,
        nmTelefone: values.phone,
        dtCadastro: user.dtCadastro,
        situacaoUsuario: user.situacaoUsuario,
        tipoUsuario: user.tipoUsuario,
        flTermo: 'S',
      };
      try {
        setLoading(true);

        const { data } = await putUserAWS(newValues);

        if (!data) return;

        if (formikProfile.values.email !== data.nmEmail) {
          toast.success(
            'Verifique a sua caixa de entrada para confirmar a mudança de email',
            { id: 'toast' },
          );
          setLoading(false);
        } else {
          toast.success('Perfil atualizado com sucesso', { id: 'toast' });
          setLoading(false);
          setUser(data);
          formikProfile.setFieldValue('password', '');
          formikProfile.setFieldValue('newPassword', '');
          formikProfile.setFieldValue('confirmPassword', '');
        }
      } catch (error) {
        toast.error('Não foi possível atualizar perfil', { id: 'toast' });
      } finally {
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    formikProfile.setFieldValue('nome', user?.nmUsuario);
    formikProfile.setFieldValue('email', user?.nmEmail);
    formikProfile.setFieldValue('phone', user?.nmTelefone);
  }, [user]);

  return {
    formikProfile,
    loading,
    showNewPassword,
    showPassword,
  };
}
