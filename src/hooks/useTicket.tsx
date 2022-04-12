import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';

import { format } from 'date-fns';
import { ClienteMetadata } from 'types/IContext';

import { useToast } from 'contexts/Toast';
import { useUser } from 'contexts/User';

import { deleteSchedule } from 'services/delete/schedule';
import { getHorarioSelecionado } from 'services/get/horarioMarcado';

export function useTicket() {
  const navigate = useNavigate();
  const params = useParams();
  const { toast } = useToast();
  const { selectHours, selectDay, setSelectHours, setSelectDay } = useUser();

  const [cliente, setCliente] = useState<ClienteMetadata>();
  const [loading, setLoading] = useState(true);
  const [showPrint, setShowPrint] = useState(false);

  const componentToPrintRef = useRef<HTMLDivElement>(null);

  const dayFormatted = format(selectDay, 'yyyy-MM-dd');

  const handlePrint =
    useReactToPrint({
      content: () => componentToPrintRef.current,
      onAfterPrint: () => setShowPrint(false),
    }) || (() => {});

  function handleClickPrint() {
    setShowPrint(!showPrint);
    handlePrint();
  }

  async function cancelarAgendamento(idAgendamento: string) {
    const { data, error } = await deleteSchedule(idAgendamento);

    if (error) {
      toast.error(error.message, { id: 'toast' });
      return;
    }

    if (data) {
      toast.success('Agendamento cancelado com sucesso!', { id: 'toast' });
      navigate('/');
    }
  }

  function verificaHorarioCancelamento(dataAgendamento: ClienteMetadata) {
    const dataAtual = new Date();
    const dataAtualFormatted = format(dataAtual, 'yyyy-MM-dd');
    const horaAtual = format(dataAtual, 'HH:mm:ss');
    const dataHoraAtual = `${dataAtualFormatted}T${horaAtual}`;
    const dataAgenda = dataAgendamento?.appointment_date;

    const diff = new Date(dataAgenda).getTime() - new Date(dataHoraAtual).getTime();
    const diffMinutes = Math.round(diff / 1000 / 60);

    if (diffMinutes < 60) {
      return true;
    }

    return false;
  }

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
    componentToPrintRef,
    handleClickPrint,
    showPrint,
    cancelarAgendamento,
    verificaHorarioCancelamento,
  };
}
