import { Button } from 'components/Button';

import { useHorarios } from 'hooks/useHorarios';

export function Horarios() {
  const { formikHorarios } = useHorarios();

  function addNewScheduleItem() {
    const newSchedule = [...formikHorarios.values.schedules, { week_day: '', from: '', to: '' }];
    if (newSchedule.length > 7) {
      newSchedule.splice(newSchedule.length - 1, 1);
    }
    formikHorarios.setFieldValue('schedules', newSchedule);
  }

  return (
    <>
      <div>
        <Button type="button" onClick={() => addNewScheduleItem()}>
          add
        </Button>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            formikHorarios.handleSubmit(e);
          }}
        >
          {formikHorarios.values.schedules.map((schedule, index) => (
            <div key={index}>
              <select
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

              <input
                type="time"
                name={`schedules[${index}].from`}
                placeholder="De"
                onChange={formikHorarios.handleChange}
                onBlur={formikHorarios.handleBlur}
                value={schedule.from}
              />
              {formikHorarios.errors.schedules && formikHorarios.touched.schedules && (
                <span>{formikHorarios.errors.schedules}</span>
              )}
              <input
                type="time"
                name={`schedules[${index}].to`}
                placeholder="Até"
                onChange={formikHorarios.handleChange}
                onBlur={formikHorarios.handleBlur}
                value={schedule.to}
                maxLength={100}
              />
              {formikHorarios.errors.schedules && formikHorarios.touched.schedules && (
                <span>{formikHorarios.errors.schedules}</span>
              )}
            </div>
          ))}
          <Button type="submit">Salvar</Button>
        </form>
      </div>
    </>
  );
}
