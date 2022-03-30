import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { UserMetadata } from 'types/IContext';

import { Button } from 'components/Button';
import { CardBarbeiro } from 'components/CardBarbeiro';
import { Header } from 'components/Header';

import { useBarbeiro } from 'contexts/Barbeiro';
import { useTheme } from 'contexts/Theme';

import { useAuth } from 'hooks/useAuth';
import { useRegister } from 'hooks/useRegister';

import { supabase } from 'services/supabase';

import styles from './Home.module.scss';

export function Home() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { theme } = useTheme();
  const { formikLoginGoogle } = useRegister();
  const { setBarbeiro } = useBarbeiro();

  const [barbeiros, setBarbeiros] = useState([]);

  function verificaLoginGoogleEOcupacao() {
    return user?.app_metadata.provider === 'google' && !user.user_metadata.ocupacao;
  }

  function verificaOcupacao(ocupacao: string) {
    if (user?.user_metadata.ocupacao === ocupacao) {
      return 'cliente';
    }
    if (user?.user_metadata.ocupacao === ocupacao) {
      return 'barbeiro';
    }
  }

  async function getBarbeiros() {
    const { data, error, status } = await supabase.rpc('busca_filtrada_usuarios', {
      p_id: '',
      p_name: '',
      p_ocupacao: 'barbeiro',
      p_fullname: '',
      p_email: '',
      p_picture: '',
      p_avatar_url: '',
      p_page: 0,
      p_limit: 10,
      p_orderby: 'name',
      p_ascordsc: 'asc',
    });

    if (error) {
      switch (status) {
        default:
          throw new Error('Erro ao buscar barbeiros');
      }
    }

    if (data[0].j === null) {
      throw new Error('Erro ao buscar barbeiros');
    }

    setBarbeiros(data[0].j);
  }

  useEffect(() => {
    getBarbeiros();
  }, []);

  return (
    <div className={styles.home} data-theme={theme}>
      <Header
        logo
        default
        name={user?.user_metadata.name || user?.email}
        profile={user?.user_metadata.avatar_url || user?.user_metadata.picture}
        avatar={user?.user_metadata.name}
      />

      <div className={styles.container}>
        {verificaLoginGoogleEOcupacao() && (
          <>
            <h2>
              Oi {user?.user_metadata.name}, vi que você está logado com o Google.
              <br /> E eu preciso saber se você é:
            </h2>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                formikLoginGoogle.handleSubmit(e);
              }}
            >
              <div className={styles.containerButton}>
                <Button
                  type="submit"
                  onClick={() => {
                    formikLoginGoogle.setFieldValue('ocupacao', 'barbeiro');
                  }}
                >
                  Barbeiro
                </Button>

                <Button
                  type="submit"
                  onClick={() => {
                    formikLoginGoogle.setFieldValue('ocupacao', 'cliente');
                  }}
                >
                  Cliente
                </Button>
              </div>
            </form>
          </>
        )}

        {verificaOcupacao('cliente') && (
          <>
            <h2>
              Olá {user?.user_metadata.name}, eu encontrei {barbeiros.length}{' '}
              {barbeiros.length > 1 ? 'barbeiros' : 'barbeiro'} para você!
            </h2>
            <div
              style={{
                display: 'flex',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
              }}
            >
              {barbeiros.map((barbeiro: UserMetadata) => (
                <>
                  <CardBarbeiro
                    barbeiro={barbeiro}
                    key={barbeiro.id}
                    onClick={() => {
                      setBarbeiro(barbeiro);
                      navigate(`/p/${barbeiro.id}`);
                    }}
                  />
                </>
              ))}
            </div>
          </>
        )}
        {verificaOcupacao('barbeiro') && (
          <>
            <h1>Barbeiro</h1>
          </>
        )}
      </div>
    </div>
  );
}
