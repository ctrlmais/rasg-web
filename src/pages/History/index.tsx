import { DayPicker } from 'react-day-picker';

import { Ring } from '@uiball/loaders';
import { ptBR } from 'date-fns/locale';

import { ButtonTopPage } from 'components/ButtonTop';
import { CardCliente } from 'components/CardCliente';
import { Header } from 'components/Header';

import { useTheme } from 'contexts/Theme';

import { useHistory } from 'hooks/useHistory';

import { css } from 'styles/calendar.styles';

import styles from './History.module.scss';

export function History() {
  const { theme } = useTheme();

  const { loading, agendamentos, range, setRange, pastMonth } = useHistory();

  return (
    <>
      <style>{css}</style>
      <div className={styles.home} data-theme={theme}>
        <Header logo path="/history" />
        <div className={styles.container}>
          <h2 className={styles.title}>Histórico</h2>
          <ButtonTopPage />
          <div className={styles.calendar}>
            <DayPicker
              locale={ptBR}
              mode="range"
              defaultMonth={pastMonth}
              selected={range}
              onSelect={setRange}
              toDate={new Date()}
            />
          </div>
          <div className={styles.containerList}>
            {loading ? (
              <Ring speed={2} lineWeight={5} color="#ff9000" size={64} />
            ) : (
              <>
                {agendamentos.length > 0 ? (
                  agendamentos.map((cliente) => (
                    <>
                      <div
                        className={styles.containerBarber}
                        key={cliente.cliente.cdUsuario}
                      >
                        <CardCliente
                          key={cliente.cliente.cdUsuario}
                          cliente={cliente}
                          data
                          isVerified={
                            cliente.situacaoAgendamento
                              .deSituacaoAgendamento === 'EXECUTADO'
                          }
                        />
                      </div>
                    </>
                  ))
                ) : (
                  <div className={styles.containerHorario}>
                    <h2>Nenhum horário encontrado nessas datas 🙁</h2>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
