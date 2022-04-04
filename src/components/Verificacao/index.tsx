import { Button } from 'components/Button';

import { useAuth } from 'hooks/useAuth';
import { useRegister } from 'hooks/useRegister';

import styles from './Verificacao.module.scss';

export function VerificacaoOcupacao() {
  const { user } = useAuth();
  const { formikLoginGoogle } = useRegister();

  return (
    <>
      <h2 className={styles.titleHome}>
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
  );
}
