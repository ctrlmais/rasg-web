import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { format } from 'date-fns';
import { ClienteMetadata } from 'types/IContext';

import { useUser } from 'contexts/User';

import { getHorarioSelecionado } from 'services/get/horarioMarcado';

export function useTicket() {
  const navigate = useNavigate();
  const params = useParams();
  const { selectHours, selectDay, setSelectHours, setSelectDay } = useUser();

  const [cliente, setCliente] = useState<ClienteMetadata>();
  const [loading, setLoading] = useState(true);

  const dayFormatted = format(selectDay, 'yyyy-MM-dd');

  async function buscaCliente() {
    setLoading(true);
    const { data, error, status } = await getHorarioSelecionado(params?.id || '', dayFormatted, selectHours);

    if (error) {
      setLoading(false);
      navigate('/');
      switch (status) {
        default:
          return;
      }
    }

    if (!data) return;
    if (!data[0].j) return;
    if (!data[0].j[0]) return;

    if (data[0].j === null) {
      setLoading(false);
      return;
    }

    setCliente(data[0].j[0]);
    setLoading(false);
  }

  useEffect(() => {
    buscaCliente();
  }, []);

  useEffect(() => {
    setSelectHours('');
    setSelectDay(new Date());
  }, [params.id]);

  return {
    cliente,
    loading,
  };
}
