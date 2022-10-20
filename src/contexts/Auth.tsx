import { createContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { useFormik } from 'formik';
import { AuthContextProps } from 'types/ContextProps';
import { Cliente } from 'types/ServicesProps';
import { loginSchema } from 'validations/Login';

import { setToken } from 'services/api';
import { getJourneyByIdAWS, getByIdAWS } from 'services/get';
import { postSignInAWS, postSignOutAWS } from 'services/post';

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps,
);

export function AuthProvider({ children }: any) {
  const navigate = useNavigate();
  const [user, setUser] = useState<Cliente>();
  const [ocupacao, setOcupacao] = useState('CLIENTE');
  const [loading, setLoading] = useState(false);

  const storagedUser = JSON.parse(localStorage.getItem('@barber:user') || '{}');
  const storagedToken = localStorage.getItem('@barber:token');
  const storagedHorarios = JSON.parse(
    localStorage.getItem('@barber:horarios') || '{}',
  );

  function isSigned() {
    if (storagedToken) {
      return true;
    }

    return false;
  }

  async function checkUser() {
    const hash = window.location.href.split('#')[0];
    const params = hash.split('/')[3];

    const user = localStorage.getItem('@barber:user') || '{}';

    const { cdUsuario } = JSON.parse(user);

    if (cdUsuario === undefined) return;

    try {
      const { data } = await getByIdAWS(cdUsuario);

      if (params === 'reset-password') {
        navigate('/reset-password');
      } else {
        const newUser = JSON.parse(user);
        setUser(newUser);

        if (data && !isSigned()) {
          navigate('/');
        }
      }
    } catch (error) {
      toast.error('Erro ao buscar usuário');
    }
  }

  useEffect(() => {
    checkUser();

    window.addEventListener('hashchange', () => {
      checkUser();
    });
  }, []);

  const formikLogin = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      setLoading(true);

      try {
        const { data } = await postSignInAWS({
          nmEmail: values.email,
          nmSenha: values.password,
        });

        localStorage.setItem('@barber:token', data.token);
        setToken(data.token);

        const expires = new Date(Date.now() + 3 * 60 * 60 * 1000);
        localStorage.setItem('@barber:expires', expires.toString());

        localStorage.setItem('@barber:user', JSON.stringify(data.user));

        if (data.user.tipoUsuario.authority === 'GERENCIADOR') {
          const { data: horarios } = await getJourneyByIdAWS(
            data.user.cdUsuario,
          );

          localStorage.setItem('@barber:horarios', JSON.stringify(horarios));
        }

        toast.success('Login realizado com sucesso', { id: 'toast' });

        navigate('/');
      } catch (error) {
        toast.error('Erro ao fazer login, tente novamente', { id: 'toast' });
      } finally {
        setLoading(false);
      }
    },
  });

  async function handleLogout() {
    postSignOutAWS();

    setUser(undefined);
    navigate('/');
  }

  return (
    <AuthContext.Provider
      value={{
        signed: isSigned(),
        user,
        setUser,
        handleLogout,
        formikLogin,
        ocupacao,
        setOcupacao,
        loading,
        storagedUser,
        storagedHorarios,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
