import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useFormik } from 'formik';
import { SituacaoUsuario, TipoUsuario } from 'types/ServicesProps';
import { registerSchema } from 'validations/Register';

import { useToast } from 'contexts/Toast';

import { useAuth } from 'hooks/useAuth';

import { getUserSituationsAWS, getUserTypesAWS } from 'services/get';
import { postRegisterUserAWS } from 'services/post';

export function useRegister() {
  const navigate = useNavigate();
  const { ocupacao } = useAuth();
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);
  const [tipoUsuario, setTipoUsuario] = useState<TipoUsuario>();
  const [situacaoUsuario, setSituacaoUsuario] = useState<SituacaoUsuario>();
  const [status, setStatus] = useState<'success' | 'error' | ''>('');

  const formikRegister = useFormik({
    initialValues: {
      nome: '',
      email: '',
      password: '',
      confirmPassword: '',
      ocupacao: '',
      phone: '',
    },
    validationSchema: registerSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);

        await postRegisterUserAWS({
          nmUsuario: values.nome,
          nmSenha: values.password,
          nmEmail: values.email,
          nmTelefone: values.phone,
          situacaoUsuario: situacaoUsuario as SituacaoUsuario,
          tipoUsuario: tipoUsuario as TipoUsuario,
        });

        setStatus('success');
        setLoading(false);

        navigate('/');
      } catch (error) {
        const { message } = error as Error;

        toast.error(message, { id: 'toast' });
        setStatus('error');
        setLoading(false);
      } finally {
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    async function getTipoUsuario() {
      if (ocupacao === 'CLIENTE') {
        const { data: typeUser } = await getUserTypesAWS();

        setTipoUsuario(typeUser[3]);

        const { data: situation } = await getUserSituationsAWS();

        setSituacaoUsuario(situation[0]);
      }

      if (ocupacao === 'GERENCIADOR') {
        const { data: typeUser } = await getUserTypesAWS();

        setTipoUsuario(typeUser[2]);

        const { data: situation } = await getUserSituationsAWS();

        setSituacaoUsuario(situation[2]);
      }
    }

    getTipoUsuario();
  }, [ocupacao]);

  return {
    formikRegister,
    loading,
    status,
  };
}
