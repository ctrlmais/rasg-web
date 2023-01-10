import { createContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { useFormik } from 'formik';
import { AuthContextProps } from 'types/ContextProps';
import { Cliente } from 'types/ServicesProps';
import { loginSchema } from 'validations/Login';

import { setToken } from 'services/api';
import {
  getJourneyByIdAWS,
  getByIdAWS,
  getSearchPhotoByIdAWS,
  getSearchPhotoByHashAWS,
} from 'services/get';
import { postSignInAWS, postSignOutAWS } from 'services/post';

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps,
);

export function AuthProvider({ children }: any) {
  const navigate = useNavigate();
  const [user, setUser] = useState<Cliente>();
  const [profileAvatar, setProfileAvatar] = useState('');
  const [ocupacao, setOcupacao] = useState('CLIENTE');
  const [loading, setLoading] = useState(false);

  const storagedUser = JSON.parse(localStorage.getItem('@rasg:user') || '{}');
  const avatar = localStorage.getItem('@rasg:avatar') || '';
  const storagedToken = localStorage.getItem('@rasg:token');
  const storagedHorarios = JSON.parse(
    localStorage.getItem('@rasg:horarios') || '{}',
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

    const user = localStorage.getItem('@rasg:user') || '{}';
    const avatar = localStorage.getItem('@rasg:avatar') || '';

    const { cdUsuario } = JSON.parse(user);

    if (cdUsuario === undefined) return;
    if (!user) return;

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

      if (avatar) {
        setProfileAvatar(avatar);
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
  }, [isSigned()]);

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

        localStorage.setItem('@rasg:token', data.token);
        setToken(data.token);

        const expires = new Date(Date.now() + 3 * 60 * 60 * 1000);
        localStorage.setItem('@rasg:expires', expires.toString());

        localStorage.setItem('@rasg:user', JSON.stringify(data.user));

        if (data.user.tipoUsuario.authority === 'GERENCIADOR') {
          const { data: horarios } = await getJourneyByIdAWS(
            data.user.cdUsuario,
          );

          localStorage.setItem('@rasg:horarios', JSON.stringify(horarios));
        }

        if (data.token) {
          const { data: dataPhoto } = await getSearchPhotoByIdAWS(
            data.user?.cdUsuario,
          );

          if (dataPhoto.length !== 0) {
            const { nmHash, nmMime } = dataPhoto[0];

            const { data: photo } = await getSearchPhotoByHashAWS(nmHash);

            const photoURI = `data:${nmMime};base64,${photo}`;

            localStorage.setItem('@rasg:avatar', photoURI);
          }
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
    setProfileAvatar('');
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
        profileAvatar,
        setProfileAvatar,
        avatar,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
