import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useFormik } from 'formik';
import { registerSchema } from 'validations/Register';

import { useToast } from 'contexts/Toast';

import { useAuth } from 'hooks/useAuth';

import { registerUser } from 'services/post/register';
import { updateOcupacao } from 'services/update/ocupacao';

export function useRegister() {
  const navigate = useNavigate();
  const { ocupacao } = useAuth();
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'success' | 'error' | ''>('');

  const formikRegister = useFormik({
    initialValues: {
      nome: '',
      email: '',
      senha: '',
      confirmarSenha: '',
      ocupacao: '',
    },
    validationSchema: registerSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);

        const { error } = await registerUser(
          values.email,
          values.senha,
          values.nome,
          ocupacao,
        );

        if (error) {
          toast.error(error.message, { id: 'toast' });
          setStatus('error');
          setLoading(false);
          return;
        }

        setStatus('success');
        setLoading(false);
      } catch (error) {
        const { message } = error as Error;

        toast.error(message, { id: 'toast' });
        setStatus('error');
        setLoading(false);
      } finally {
        setTimeout(function () {
          navigate('/');
        }, 4000);
      }
    },
  });

  const formikLoginGoogle = useFormik({
    initialValues: {
      ocupacao: '',
    },
    validationSchema: ocupacao ? '' : registerSchema,
    onSubmit: async (values) => {
      const { error } = await updateOcupacao(values.ocupacao);

      if (error) {
        toast.error(error.message, { id: 'toast' });
        return;
      }

      toast.success('Função adicionada com sucesso!', { id: 'toast' });

      window.location.reload();
    },
  });

  return {
    formikRegister,
    formikLoginGoogle,
    loading,
    status,
  };
}
