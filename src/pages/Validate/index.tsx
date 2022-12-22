import { FiUser } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

import { Ring } from '@uiball/loaders';

import { Button } from 'components/Button';
import { Header } from 'components/Header';
import { Input } from 'components/Input';

import { useTheme } from 'contexts/Theme';

import { useValidate } from 'hooks/useValidate';

import styles from './Validate.module.scss';

export function Validate() {
  const { theme } = useTheme();
  const { idSchedule, setIdSchedule, loading, validarAgendamento } =
    useValidate();
  const navigate = useNavigate();

  return (
    <>
      <div className={styles.home} data-theme={theme}>
        <Header logo path="/validate" />

        <div className={styles.container}>
          <h2>Validar horário</h2>
        </div>

        <div className={styles.wrapperContainer}>
          <div className={styles.inputContainer}>
            <Input
              type="text"
              name="text"
              placeholder="Digite o ID do agendamento"
              onChange={(e) => setIdSchedule(e.target.value)}
              onBlur={(e) => setIdSchedule(e.target.value)}
              value={idSchedule}
              icon={<FiUser color="#666360" size={24} />}
            />

            <div className={styles.containerButton}>
              <Button
                disabled={idSchedule === ''}
                type="button"
                onClick={() => {
                  validarAgendamento();
                }}
              >
                {loading ? (
                  'Validar'
                ) : (
                  <Ring speed={2} lineWeight={5} color="#28262e" size={32} />
                )}
              </Button>
              <Button
                type="button"
                onClick={() => {
                  navigate('/scanner');
                }}
              >
                Abrir câmera
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
