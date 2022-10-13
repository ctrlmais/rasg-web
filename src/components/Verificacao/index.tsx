import { Button } from 'components/Button';

import { useAuth } from 'hooks/useAuth';

import styles from './Verificacao.module.scss';

export function VerificacaoOcupacao() {
  const { user } = useAuth();

  return (
    <>
      <h2 className={styles.titleHome}>
        Oi {user?.nmUsuario}, vi que você está logado com o Google.
        <br /> E eu preciso saber se você é:
      </h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className={styles.containerButton}>
          <Button type="submit" onClick={() => {}}>
            Barbeiro
          </Button>

          <Button type="submit" onClick={() => {}}>
            Cliente
          </Button>
        </div>
      </form>
    </>
  );
}
