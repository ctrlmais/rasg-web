import { createContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { useFormik } from 'formik';
import { AuthContextProps } from 'types/IContext';
import { loginSchema } from 'validations/Login';

import { getBarbeiro } from 'services/get/barbeiros';
import { getPhoto } from 'services/get/photo';
import { getUser } from 'services/get/user';
import { signIn } from 'services/post/signIn';
import { signInGoogleProvider } from 'services/post/signInGoogleProvider';
import { signOut } from 'services/post/signOut';

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export function AuthProvider({ children }: any) {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>();
  const [ocupacao, setOcupacao] = useState('cliente');
  const [loading, setLoading] = useState(false);
  const [approved, setApproved] = useState('');

  function isSigned() {
    const storagedUser = localStorage.getItem('supabase.auth.token');

    if (storagedUser) {
      return true;
    }

    return false;
  }

  function isBarbeiro() {
    if (user?.user_metadata?.ocupacao === 'barbeiro') {
      return true;
    }

    return false;
  }

  function isCliente() {
    if (user?.user_metadata?.ocupacao === 'cliente') {
      return true;
    }

    return false;
  }

  function isAlexander() {
    if (user?.email === 'xanderzinho26@gmail.com') {
      return true;
    }

    return false;
  }

  function isBarbeiroApproved() {
    if (approved === '') {
      return false;
    }

    return true;
  }

  async function checkUser() {
    const hash = window.location.href.split('#')[0];
    const params = hash.split('/')[3];

    const userData = getUser();

    const { data, error, status } = await getPhoto(userData?.id || params);

    if (error) {
      switch (status) {
        default:
          return;
      }
    }

    if (!data) return;

    if (!userData) return;

    if (data[0].j === null) {
      setUser(userData);
    }

    if (!data[0].j) return;

    if (!data[0]?.j[0]) return;

    const infoUser = data[0]?.j[0];

    if (!infoUser) return;

    const newUserData = {
      ...userData,
      user_metadata: {
        ...userData.user_metadata,
        avatar_url: infoUser.src,
        picture: infoUser.src,
      },
      updated_at: infoUser.updated_at,
    };

    if (params === 'reset-password') {
      navigate('/reset-password');
    } else {
      setUser(newUserData);

      if (userData && !isSigned()) {
        navigate('/');
      }
    }
  }

  async function verificarStatusBarbeiro() {
    const storagedUser = JSON.parse(localStorage.getItem('supabase.auth.token') || '{}');

    const id = storagedUser?.currentSession?.user.id;

    const { data, status, error } = await getBarbeiro(id, true);

    if (error) {
      switch (status) {
        default:
          return;
      }
    }

    if (!data) return;
    if (!data[0].j) return;

    if (data[0].j === null) {
      return;
    }

    setApproved(data[0].j[0].admin_confirmed);
  }

  useEffect(() => {
    checkUser();

    window.addEventListener('hashchange', () => {
      checkUser();
    });
  }, []);

  useEffect(() => {
    verificarStatusBarbeiro();
  }, []);

  const formikLogin = useFormik({
    initialValues: {
      email: '',
      senha: '',
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      setLoading(true);

      const { user, error } = await signIn(values.email, values.senha);

      if (error && error.message === 'Invalid login credentials') {
        toast.error('Usuário ou senha inválidos', { id: 'toast' });
        setLoading(false);
        return;
      }

      if (error && error.message === 'Email not confirmed') {
        toast.error('Por favor, confirme seu email', { id: 'toast' });
        setLoading(false);
        return;
      }

      if (error) {
        toast.error('Erro ao logar', { id: 'toast' });
        setLoading(false);
        return;
      }

      if (!user) return;

      toast.success('Login realizado com sucesso', { id: 'toast' });

      setLoading(false);

      checkUser();

      navigate('/');
    },
  });

  async function handleLoginGoogle() {
    const { user: userData, error } = await signInGoogleProvider();

    if (!userData) return;

    if (error && error.message === 'Email not confirmed') {
      toast.error('Por favor, confirme seu email', { id: 'login' });
      setLoading(false);
      return;
    }

    if (error) {
      toast.error('Erro ao logar', { id: 'login' });
      setLoading(false);
      return;
    }

    setUser(userData);
  }

  async function handleLogout() {
    const { error } = await signOut();

    if (error) {
      toast.error('Erro ao deslogar', { id: 'login' });
      return;
    }

    localStorage.removeItem('cliente');
    toast.success('Deslogado com sucesso', { id: 'login' });
    setUser(null);

    navigate('/');
  }

  return (
    <AuthContext.Provider
      value={{
        signed: isSigned(),
        user,
        setUser,
        handleLogout,
        handleLoginGoogle,
        formikLogin,
        ocupacao,
        setOcupacao,
        loading,
        isBarbeiro: isBarbeiro(),
        isCliente: isCliente(),
        isAlexander: isAlexander(),
        isBarbeiroApproved: isBarbeiroApproved(),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
