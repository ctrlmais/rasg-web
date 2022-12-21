import { useTheme } from 'contexts/Theme';

import { useHorarios } from 'hooks/useHorarios';

import styles from './CardHorario.module.scss';

const diasSemana = [
  {
    cdDiaSemana: 0,
    deDiaSemana: 'Domingo',
  },
  {
    cdDiaSemana: 1,
    deDiaSemana: 'Segunda-feira',
  },
  {
    cdDiaSemana: 2,
    deDiaSemana: 'Terça-feira',
  },
  {
    cdDiaSemana: 3,
    deDiaSemana: 'Quarta-feira',
  },
  {
    cdDiaSemana: 4,
    deDiaSemana: 'Quinta-feira',
  },
  {
    cdDiaSemana: 5,
    deDiaSemana: 'Sexta-feira',
  },
  {
    cdDiaSemana: 6,
    deDiaSemana: 'Sábado',
  },
];

export function CardHorario() {
  const { theme } = useTheme();
  const { formikHorarios } = useHorarios();

  return (
    <div className={styles.wrapper} data-theme={theme}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          formikHorarios.handleSubmit(e);
        }}
      >
        <div className={styles.container}>
          <div className={styles.containerInput}>
            <label>Dia da Semana</label>
            <select
              className={styles.select}
              name="cdDiaSemana"
              onChange={formikHorarios.handleChange}
              onBlur={formikHorarios.handleBlur}
            >
              <option value="">Selecione o dia da semana</option>
              {diasSemana.map((dia) => (
                <option
                  key={dia.cdDiaSemana}
                  value={dia.cdDiaSemana}
                  onChange={() =>
                    formikHorarios.setFieldValue('cdDiaSemana', dia.cdDiaSemana)
                  }
                >
                  {dia.deDiaSemana}
                </option>
              ))}
            </select>

            <label>Horário Inicial</label>
            <input
              className={styles.time}
              type="time"
              placeholder="De"
              name="hrInicio"
              value={formikHorarios.values.hrInicio}
              onChange={formikHorarios.handleChange}
              onBlur={formikHorarios.handleBlur}
              maxLength={100}
            />

            <label>Horário Final</label>
            <input
              className={styles.time}
              type="time"
              placeholder="Até"
              name="hrFim"
              value={formikHorarios.values.hrFim}
              onChange={formikHorarios.handleChange}
              onBlur={formikHorarios.handleBlur}
              maxLength={100}
            />
          </div>
        </div>
        <div className={styles.container}>
          <strong className={styles.intervalo}>
            Adicione seu horário de intervalo
          </strong>

          <div className={styles.containerInput}>
            <label>Horário Inicial</label>
            <input
              className={styles.time}
              type="time"
              placeholder="De"
              name="hrInicioIntervalo"
              value={formikHorarios.values.hrInicioIntervalo}
              onChange={formikHorarios.handleChange}
              onBlur={formikHorarios.handleBlur}
              maxLength={100}
            />

            <label>Horário Final</label>
            <input
              className={styles.time}
              type="time"
              placeholder="Até"
              name="hrFimIntervalo"
              value={formikHorarios.values.hrFimIntervalo}
              onChange={formikHorarios.handleChange}
              onBlur={formikHorarios.handleBlur}
              maxLength={100}
            />
          </div>
        </div>
        <button className={styles.button} type="submit">
          Adicionar
        </button>
      </form>
    </div>
  );
}
