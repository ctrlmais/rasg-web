import { FiPlus, FiSlash } from 'react-icons/fi';

import { Button } from 'components/Button';
import { Header } from 'components/Header';

import { useTheme } from 'contexts/Theme';
import { useToast } from 'contexts/Toast';

import { useHorarios } from 'hooks/useHorarios';

import styles from './Horarios.module.scss';

export function Horarios() {
  const { toast } = useToast();
  const { theme } = useTheme();
  const { formikHorarios } = useHorarios();

  function addNewScheduleItem() {
    const newSchedule = [
      ...formikHorarios.values.schedules,
      { week_day: '', from: '', to: '' },
    ];
    if (newSchedule.length > 7) {
      toast.error('Você não pode adicionar mais horários.', { id: 'toast' });
      newSchedule.splice(newSchedule.length - 1, 1);
    }
    formikHorarios.setFieldValue('schedules', newSchedule);
  }

  function removeScheduleItem(index: number) {
    const newSchedule = [...formikHorarios.values.schedules];
    newSchedule.splice(index, 1);
    formikHorarios.setFieldValue('schedules', newSchedule);
  }

  return (
    <div className={styles.home} data-theme={theme}>
      <Header back />

      <div className={styles.container}>
        <h2>Adicionar horários</h2>
        <div className={styles.containerButtonTop}>
          <button
            type="button"
            onClick={() => addNewScheduleItem()}
            className={styles.button}
          >
            Adicionar horario
            <FiPlus />
          </button>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            formikHorarios.handleSubmit(e);
          }}
          style={{
            width: '100%',
          }}
        >
          <div className={styles.form}>
            {formikHorarios?.values?.schedules?.map((schedule, index) => (
              <div key={index} className={styles.containerHorarios}>
                <select
                  className={styles.select}
                  name={`schedules[${index}].week_day`}
                  value={schedule.week_day}
                  onChange={formikHorarios.handleChange}
                >
                  <option value="">Selecione um dia da semana</option>
                  <option value={0}>Domingo</option>
                  <option value={1}>Segunda-feira</option>
                  <option value={2}>Terça-feira</option>
                  <option value={3}>Quarta-feira</option>
                  <option value={4}>Quinta-feira</option>
                  <option value={5}>Sexta-feira</option>
                  <option value={6}>Sábado</option>
                </select>

                <div className={styles.containerTime}>
                  <input
                    className={styles.time}
                    type="time"
                    name={`schedules[${index}].from`}
                    placeholder="De"
                    onChange={formikHorarios.handleChange}
                    onBlur={formikHorarios.handleBlur}
                    value={schedule.from}
                  />

                  <input
                    className={styles.time}
                    type="time"
                    name={`schedules[${index}].to`}
                    placeholder="Até"
                    onChange={formikHorarios.handleChange}
                    onBlur={formikHorarios.handleBlur}
                    value={schedule.to}
                    maxLength={100}
                  />
                  {formikHorarios.values.schedules.length > 1 && (
                    <button
                      className={styles.buttonRemove}
                      onClick={() => {
                        removeScheduleItem(index);
                      }}
                    >
                      <FiSlash
                        color="#FFF"
                        size={18}
                        style={{ marginTop: '6px' }}
                      />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div
            className={styles.containerButton}
            style={{ justifyContent: 'center' }}
          >
            <Button type="submit">Salvar horários</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
