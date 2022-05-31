import { DayPicker } from 'react-day-picker';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';

import { ptBR } from 'date-fns/locale';
import { ClienteMetadata } from 'types/IContext';

import { Agenda } from 'components/Agenda';
import { Alert } from 'components/Alert';
import { Button } from 'components/Button';
import { CardCliente } from 'components/CardCliente';

import { getDiaSemana } from 'utils/diaDaSemana';

import { useUser } from 'contexts/User';

import { useBarbeiro } from 'hooks/useBarbeiro';

import styles from './Barbeiro.module.scss';

export function Barbeiro() {
  const navigate = useNavigate();
  const {
    clientes,
    selectDay,
    setSelectDay,
    selectDayFormatted,
    atualDayFormatted,
    getClientesMorning,
    getClientesAfternoon,
    getClientesNight,
    getFirstCliente,
    verificaHorarioDeTrabalho,
  } = useUser();
  const {
    toggleDownload,
    setToggleDownload,
    modalIsOpen,
    openModal,
    closeModal,
    customStyles,
    date,
    ultimaAtualizacao,
    range,
    setRange,
    exportToExcel,
    pastMonth,
    isBarbeiroApproved,
    visibleCalendar,
    setVisibleCalendar,
  } = useBarbeiro();

  return (
    <div className={styles.containerBarbeiro}>
      {isBarbeiroApproved === false ? (
        <div className={styles.containerAviso}>
          <h2 className={styles.titleHome}>
            Você ainda não foi aprovado para trabalhar como barbeiro.
            <br />
            Aguarde ser aprovado ou entre em contato com o administrador do sistema.
          </h2>
        </div>
      ) : (
        <>
          {toggleDownload ? (
            <div className={styles.containerRightCalendar}>
              <div className={styles.containerCalendar}>
                <button
                  className={styles.button}
                  type="button"
                  onClick={() => {
                    setToggleDownload(!toggleDownload);
                  }}
                >
                  Download do mês
                </button>
                <button
                  className={styles.button}
                  style={{ width: '45px' }}
                  type="button"
                  onClick={() => {
                    setVisibleCalendar(!visibleCalendar);
                  }}
                >
                  {visibleCalendar ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              <div className={styles.hourContainer}>{date?.toLocaleTimeString()}</div>
              {visibleCalendar && (
                <div className={styles.calendar}>
                  <DayPicker
                    mode="single"
                    locale={ptBR}
                    selected={selectDay}
                    onDayClick={(day) => {
                      setSelectDay(day);
                    }}
                    modifiers={{
                      available: { dayOfWeek: [0, 1, 2, 3, 4, 5, 6] },
                    }}
                  />
                </div>
              )}
            </div>
          ) : (
            <div className={styles.containerRightCalendar}>
              <div className={styles.containerCalendar}>
                <button
                  className={styles.button}
                  type="button"
                  onClick={() => {
                    setToggleDownload(!toggleDownload);
                  }}
                >
                  Horários
                </button>
                <button
                  className={styles.button}
                  style={{ width: '45px' }}
                  type="button"
                  onClick={() => {
                    setVisibleCalendar(!visibleCalendar);
                  }}
                >
                  {visibleCalendar ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              <div className={styles.hourContainer}>{date?.toLocaleTimeString()}</div>
              {visibleCalendar && (
                <>
                  <div className={styles.calendar}>
                    <DayPicker
                      locale={ptBR}
                      mode="range"
                      defaultMonth={pastMonth}
                      selected={range}
                      onSelect={setRange}
                    />
                  </div>
                  <div className={styles.containerButton}>
                    <Button type="button" onClick={() => exportToExcel()}>
                      Download
                    </Button>
                  </div>
                </>
              )}
            </div>
          )}
          <div className={styles.list}>
            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles}>
              <Agenda />
            </Modal>

            {!verificaHorarioDeTrabalho() && (
              <div className={styles.containerAlert}>
                <Alert
                  title="Vi que você não tem horários cadastrados no seu perfil. Clique aqui para adicionar"
                  warning
                  onClick={() => {
                    navigate('/horarios');
                  }}
                />
              </div>
            )}

            <div className={styles.containerHorarioAgendados}>
              <h2 className={styles.titleHome}>Horários agendados</h2>
              <p className={styles.infoText}>
                Hoje | Dia {new Date().getDate()} | {getDiaSemana()} | Última atualização: {ultimaAtualizacao}
              </p>
            </div>

            {getClientesMorning().length === 0 &&
              getClientesAfternoon().length === 0 &&
              getClientesNight().length === 0 && (
                <h2 className={styles.titleHome}>Você não tem horários agendados para hoje.</h2>
              )}

            {selectDayFormatted >= atualDayFormatted ? (
              <>
                {(getClientesMorning().length > 0 ||
                  getClientesAfternoon().length > 0 ||
                  getClientesNight().length > 0) && <h2 className={styles.shift}>Atendimento a seguir</h2>}
                {getFirstCliente() && (
                  <CardCliente
                    key={getFirstCliente().id}
                    first
                    cliente={getFirstCliente()}
                    onClick={() => {
                      localStorage.setItem('cliente', JSON.stringify(getFirstCliente()));
                      openModal();
                    }}
                  />
                )}

                <div className={styles.containerList}>
                  {getClientesMorning().length > 1 && (
                    <>
                      <h3 className={styles.shift}>
                        Manhã
                        <div className={styles.line} />
                      </h3>
                      {getClientesMorning().map((cliente: ClienteMetadata) => (
                        <>
                          {getFirstCliente().id !== cliente.id && (
                            <CardCliente
                              key={cliente.id}
                              cliente={cliente}
                              onClick={() => {
                                localStorage.setItem('cliente', JSON.stringify(cliente));
                                openModal();
                              }}
                            />
                          )}
                        </>
                      ))}
                    </>
                  )}

                  {getClientesAfternoon().length >= 1 && (
                    <>
                      <h2 className={styles.shift}>
                        Tarde
                        <div className={styles.line} />
                      </h2>
                      {getClientesAfternoon().map((cliente: ClienteMetadata) => (
                        <>
                          {getFirstCliente().id !== cliente.id && (
                            <CardCliente
                              key={cliente.id}
                              cliente={cliente}
                              onClick={() => {
                                localStorage.setItem('cliente', JSON.stringify(cliente));
                                openModal();
                              }}
                            />
                          )}
                        </>
                      ))}
                    </>
                  )}

                  {getClientesNight().length >= 1 && (
                    <>
                      <h2 className={styles.shift}>
                        Noite
                        <div className={styles.line} />
                      </h2>
                      {getClientesNight().map((cliente: ClienteMetadata) => (
                        <>
                          {getFirstCliente().id !== cliente.id && (
                            <CardCliente
                              key={cliente.id}
                              cliente={cliente}
                              onClick={() => {
                                localStorage.setItem('cliente', JSON.stringify(cliente));
                                openModal();
                              }}
                            />
                          )}
                        </>
                      ))}
                    </>
                  )}
                </div>
              </>
            ) : (
              <>
                {clientes.map((cliente: ClienteMetadata) => (
                  <CardCliente key={cliente.id} cliente={cliente} />
                ))}
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}
