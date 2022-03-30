import { useNavigate } from 'react-router-dom';

import { useFormik } from 'formik';
import { forgetPasswordSchema, resetPasswordSchema } from 'validations/ForgetPassword';

import { useToast } from 'contexts/Toast';

import { supabase } from 'services/supabase';

export function useForgetPassword() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const formikForgetPassword = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: forgetPasswordSchema,
    onSubmit: async (values) => {
      toast.loading('Enviando email...', { id: 'toast' });
      const { error } = await supabase.auth.api.resetPasswordForEmail(values.email, {
        redirectTo: 'http://localhost:3000/reset-password',
      });

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
      const { error } = await supabase.auth.update({
        password: values.senha,
      });

      if (error) {
        toast.error(error.message, { id: 'toast' });
        return;
      }

      toast.success('Senha alterada com sucesso!', { id: 'toast' });
      navigate('/');
    },
  });

  return {
    formikForgetPassword,
    formikResetPassword,
  };
}
