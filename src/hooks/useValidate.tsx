import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useToast } from 'contexts/Toast';

import { validateSchedule } from 'services/post/validateSchedule';

import { useAuth } from './useAuth';

const FIVE_SECONDS = 5000;

export function useValidate() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();
  const { user } = useAuth();

  const [idSchedule, setIdSchedule] = useState('');
  const [loading, setLoading] = useState(true);

  async function validarAgendamento() {
    setLoading(true);
    const { error, status } = await validateSchedule(
      (id as string) || idSchedule,
      user?.id as string,
      true,
    );

    if (error) {
      toast.error(error.message, { id: 'toast' });
      setLoading(false);
      return;
    }

    if (status === 204) {
      toast.success('Agendamento validado com sucesso!', { id: 'toast' });
      setLoading(false);
    }

    setTimeout(() => {
      toast('Retornando para a página inicial...', { id: 'toast' });
      navigate('/');
    }, FIVE_SECONDS);

    setLoading(false);
  }

  useEffect(() => {
    if (id || idSchedule) {
      setTimeout(() => {
        validarAgendamento();
      }, FIVE_SECONDS);
    }
  }, []);

  return {
    idSchedule,
    setIdSchedule,
    loading,
    validarAgendamento,
  };
}
