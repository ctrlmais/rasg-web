import { useState } from 'react';

import { useFormik } from 'formik';

import { useToast } from 'contexts/Toast';

import { updateHorario } from 'services/update/horarios';

export function useHorarios() {
  const { toast } = useToast();
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

  return {
    formikHorarios,
    loading,
  };
}
