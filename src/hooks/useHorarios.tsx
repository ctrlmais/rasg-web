import { useEffect, useState } from 'react';

import { useFormik } from 'formik';
import { Schedule } from 'types/IContext';

import { useToast } from 'contexts/Toast';

import { updateHorario } from 'services/update/horarios';

import { useAuth } from './useAuth';

export function useHorarios() {
  const { toast } = useToast();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const formikHorarios = useFormik({
    initialValues: {
      schedules: [
        {
          week_day: '',
          from: '',
          to: '',
        },
      ],
    },
    // validationSchema: profileSchema,
    onSubmit: async (values) => {
      setLoading(true);

      const { error } = await updateHorario(values.schedules);

      if (error) {
        toast.error(error.message, { id: 'toast' });
        return;
      }

      toast.success('Horários adicionados com sucesso!', { id: 'toast' });
    },
  });

  useEffect(() => {
    if (!user) return;

    const schedules = user?.user_metadata?.schedules?.map((schedule: Schedule) => ({
      week_day: schedule.week_day,
      from: schedule.from,
      to: schedule.to,
    }));

    if (!schedules) return;

    formikHorarios.setValues({ schedules });
  }, [user]);

  function addNewScheduleItem() {
    const newSchedule = [...formikHorarios.values.schedules, { week_day: '', from: '', to: '' }];
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

  return {
    formikHorarios,
    loading,
    addNewScheduleItem,
    removeScheduleItem,
  };
}
