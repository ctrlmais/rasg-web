import { useNavigate } from 'react-router-dom';

import { useFormik } from 'formik';
import { forgetPasswordSchema, resetPasswordSchema } from 'validations/ForgetPassword';

import { useToast } from 'contexts/Toast';

import { resetPassword } from 'services/post/resetPassword';
import { updatePassword } from 'services/update/password';

import { useAuth } from './useAuth';

export function useForgetPassword() {
  const navigate = useNavigate();
  const { handleLogout } = useAuth();
  const { toast } = useToast();

  const formikForgetPassword = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: forgetPasswordSchema,
    onSubmit: async (values) => {
      toast.loading('Enviando email...', { id: 'toast' });
      const { error } = await resetPassword(values.email);

      if (error) {
        toast.error(error.message, { id: 'toast' });
        return;
      }

      toast.success('Email enviado com sucesso!', { id: 'toast' });
      navigate('/');
    },
  });

  const formikResetPassword = useFormik({
    initialValues: {
      senha: '',
      confirmarSenha: '',
    },
    validationSchema: resetPasswordSchema,
    onSubmit: async (values) => {
      toast.loading('Alterando senha...', { id: 'toast' });
      const { error } = await updatePassword(values.senha);

      if (error) {
        toast.error(error.message, { id: 'toast' });
        return;
      }

      toast.success('Senha alterada com sucesso!', { id: 'toast' });
      handleLogout();
      navigate('/');
    },
  });

  return {
    formikForgetPassword,
    formikResetPassword,
  };
}
