import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useToast } from 'contexts/Toast';

import { patchValidateAWS } from 'services/update';

const FIVE_SECONDS = 5000;

export function useValidate() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();

  const [idSchedule, setIdSchedule] = useState('');
  const [loading, setLoading] = useState(true);

  async function validarAgendamento() {
    setLoading(true);

    try {
      const { status } = await patchValidateAWS(
        Number(id) || Number(idSchedule),
      );

      if (status === 200) {
        toast.success('Agendamento validado com sucesso!', { id: 'toast' });
        setLoading(false);
      }
    } catch (error) {
      toast.error('Erro ao validar agendamento!', { id: 'toast' });
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
