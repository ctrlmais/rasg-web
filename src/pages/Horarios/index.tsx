import Modal from 'react-modal';

import { Button } from 'components/Button';
import { CardHorario } from 'components/CardHorario';
import { Header } from 'components/Header';

import { formatHours } from 'utils/formatHours';
import { getDiaSemana } from 'utils/semanas';

import { useTheme } from 'contexts/Theme';

import { useHorarios } from 'hooks/useHorarios';

import styles from './Horarios.module.scss';

export function Horarios() {
  const { theme } = useTheme();

  const { horarios, modalIsOpen, setIsOpen, closeModal, customStyles } =
    useHorarios();

  return (
    <div className={styles.home} data-theme={theme}>
      <Header logo path="/horarios" />

      <div className={styles.container}>
        <h2 className={styles.title}>Adicione seus horários de trabalho</h2>

        <div className={styles.form}>
          {horarios?.map((horario) => (
            <div className={styles.card}>
              <div>
                <h3>{getDiaSemana(String(horario?.cdDiaSemana))}</h3>
              </div>
              <div>
                <h3>Seu horário de trabalho é das </h3>
                <h3>
                  {formatHours(horario?.hrInicio)} às{' '}
                  {formatHours(horario?.hrFim)}
                </h3>
              </div>
              <div>
                <h3>Seu intervalo é de</h3>
                <h3>
                  {formatHours(horario?.hrInicioIntervalo)} às{' '}
                  {formatHours(horario?.hrFimIntervalo)}
                </h3>
              </div>
            </div>
          ))}
        </div>
        {horarios?.length < 7 && (
          <div
            className={styles.containerButton}
            style={{ justifyContent: 'center' }}
          >
            <Button onClick={() => setIsOpen(true)} type="button">
              Adicionar horário
            </Button>
          </div>
        )}

        {horarios?.length === 7 && (
          <div
            className={styles.containerButton}
            style={{ justifyContent: 'center' }}
          >
            <Button type="button" disabled>
              Adicionar horário
            </Button>
          </div>
        )}
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <CardHorario />
      </Modal>
    </div>
  );
}
