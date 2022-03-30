import { createContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { useFormik } from 'formik';
import { AuthContextProps } from 'types/IContext';
import { loginSchema } from 'validations/Login';

import { supabase } from 'services/supabase';

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export function AuthProvider({ children }: any) {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>();
  const [ocupacao, setOcupacao] = useState('cliente');
  const [loading, setLoading] = useState(false);

  function isSigned() {
    const storagedUser = localStorage.getItem('supabase.auth.token');

    if (storagedUser) {
      return true;
    }

    return false;
  }

  async function checkUser() {
    const hash = window.location.href.split('#')[0];
    const params = hash.split('/')[3];

    const userData = supabase.auth.user();

    if (!userData) return;

    if (params === 'reset-password') {
      navigate('/reset-password');
    } else {
      setUser(userData);

      if (userData && !isSigned()) {
        navigate('/');
      }
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
      senha: '',
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      setLoading(true);
      const { user, error } = await supabase.auth.signIn({
        email: values.email,
        password: values.senha,
      });

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
    const { user: userData, error } = await supabase.auth.signIn({
      provider: 'google',
    });

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
    const { error } = await supabase.auth.signOut();

    if (error) {
      toast.error('Erro ao deslogar', { id: 'login' });
      return;
    }

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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
