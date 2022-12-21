import { useNavigate } from 'react-router-dom';

import { useFormik } from 'formik';
import {
  forgetPasswordSchema,
  resetPasswordSchema,
} from 'validations/ForgetPassword';

import { useToast } from 'contexts/Toast';

import { resetPasswordAWS } from 'services/get';
import { patchPasswordAWS } from 'services/update';

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

      try {
        const { status } = await resetPasswordAWS(values.email);

        if (status === 200) {
          toast.success('Email enviado com sucesso!', { id: 'toast' });
          navigate('/');
        }
      } catch (error) {
        toast.error('Erro ao enviar email', { id: 'toast' });
      }
    },
  });

  const formikResetPassword = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validationSchema: resetPasswordSchema,
    onSubmit: async (values) => {
      toast.loading('Alterando senha...', { id: 'toast' });

      const tokenReset = String(localStorage.getItem('@rasg:tokenReset'));

      const payload = {
        nmToken: tokenReset,
        nmSenha: values.password,
      };

      try {
        const { status } = await patchPasswordAWS(payload);

        if (status === 200) {
          toast.success('Senha alterada com sucesso!', { id: 'toast' });
          localStorage.removeItem('@rasg:tokenReset');
          handleLogout();
          navigate('/');
        }
      } catch (error) {
        toast.error('Erro ao alterar senha', { id: 'toast' });
      }
    },
  });

  return {
    formikForgetPassword,
    formikResetPassword,
  };
}
