import { Dialog } from '@mui/material';

import { Button } from 'components/Button';
import { CardHorario } from 'components/CardHorario';
import { Header } from 'components/Header';
import { ModalTitle } from 'components/ModalTitle';

import { formatHours } from 'utils/formatHours';
import { getDiaSemana } from 'utils/semanas';

import { useTheme } from 'contexts/Theme';

import { useHorarios } from 'hooks/useHorarios';

import styles from './Horarios.module.scss';

export function Horarios() {
  const { theme } = useTheme();

  const { horarios, modalIsOpen, setIsOpen, closeModal } = useHorarios();

  return (
    <>
      <div className={styles.home} data-theme={theme}>
        <Header logo path="/schedules" />

        <div className={styles.container}>
          <h2 className={styles.title}>Adicione seus horários de trabalho</h2>

          <div className={styles.form}>
            {/* sort by cdDiaSemana */}
            {horarios
              ?.sort((a, b) => a.cdDiaSemana - b.cdDiaSemana)
              .map((horario) => (
                <div
                  className={styles.card}
                  key={horario?.cdJornada}
                  onClick={() => {
                    setIsOpen(true);
                    localStorage.setItem(
                      '@rasg:horario',
                      JSON.stringify(horario),
                    );
                  }}
                >
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

        <Dialog
          fullScreen
          onClose={closeModal}
          aria-labelledby="customized-dialog-title"
          open={modalIsOpen}
          maxWidth="sm"
          fullWidth
        >
          <ModalTitle onClose={closeModal} />
          <CardHorario />
        </Dialog>
      </div>
    </>
  );
}
