import { FiClock } from 'react-icons/fi';

import { Tooltip } from '@mui/material';
import { diasSemana } from 'database/diaSemana';

import { Button } from 'components/Button';
import { Input } from 'components/Input';

import { useTheme } from 'contexts/Theme';

import { useHorarios } from 'hooks/useHorarios';

import styles from './CardHorario.module.scss';

export function CardHorario() {
  const { theme } = useTheme();
  const { formikHorarios, isHorarioStoraged, putHorario } = useHorarios();

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
            <div className={styles.containerDiaSemana}>
              {diasSemana.map((dia) => (
                <>
                  <Tooltip title={dia.name} placement="top" arrow>
                    <div
                      key={dia.cdDiaSemana}
                      onClick={() => {
                        formikHorarios.setFieldValue(
                          'cdDiaSemana',
                          dia.cdDiaSemana,
                        );
                      }}
                      className={styles.diaSemana}
                      style={{
                        color:
                          Number(formikHorarios.values.cdDiaSemana) ===
                          dia.cdDiaSemana
                            ? '#3e3b47'
                            : '',
                        background:
                          Number(formikHorarios.values.cdDiaSemana) ===
                          dia.cdDiaSemana
                            ? '#ff9000'
                            : '',
                      }}
                    >
                      {dia.deDiaSemana}
                    </div>
                  </Tooltip>
                </>
              ))}
            </div>

            <label>Horário Inicial</label>
            <Input
              type="time"
              placeholder="De"
              maxLength={100}
              icon={<FiClock color="#666360" size={24} />}
              {...formikHorarios.getFieldProps('hrInicio')}
            />

            <label>Horário Final</label>
            <Input
              type="time"
              placeholder="Até"
              maxLength={100}
              icon={<FiClock color="#666360" size={24} />}
              {...formikHorarios.getFieldProps('hrFim')}
            />
          </div>
        </div>
        <div className={styles.container}>
          <strong className={styles.intervalo}>
            Adicione seu horário de intervalo
          </strong>

          <div className={styles.containerInput}>
            <label>Horário Inicial</label>
            <Input
              type="time"
              placeholder="De"
              maxLength={100}
              icon={<FiClock color="#666360" size={24} />}
              {...formikHorarios.getFieldProps('hrInicioIntervalo')}
            />

            <label>Horário Final</label>
            <Input
              type="time"
              placeholder="Até"
              maxLength={100}
              icon={<FiClock color="#666360" size={24} />}
              {...formikHorarios.getFieldProps('hrFimIntervalo')}
            />
          </div>
          <Button
            style={{
              marginTop: '1rem',
            }}
            type="submit"
            onClick={() => {
              isHorarioStoraged ? putHorario() : formikHorarios.handleSubmit();
            }}
          >
            {isHorarioStoraged ? 'Atualizar' : 'Cadastrar'}
          </Button>
        </div>
      </form>
    </div>
  );
}
