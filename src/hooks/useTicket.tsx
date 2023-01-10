import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';

// import { format } from 'date-fns';
import { Content } from 'types/ServicesProps';

import { useToast } from 'contexts/Toast';
import { useUser } from 'contexts/User';

import { deleteScheduleAWS } from 'services/delete';
import { getSchedulesAWS, getSchedulesClientAWS } from 'services/get';

import { useAuth } from './useAuth';

export function useTicket() {
  const navigate = useNavigate();
  const params = useParams();
  const { toast } = useToast();
  const { user } = useAuth();
  const { setSelectHours, setSelectDay } = useUser();

  const [cliente, setCliente] = useState<Content>();
  const [tickets, setTickets] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);
  const [showPrint, setShowPrint] = useState(false);

  const componentToPrintRef = useRef<HTMLDivElement>(null);

  const handlePrint =
    useReactToPrint({
      content: () => componentToPrintRef.current,
      onAfterPrint: () => setShowPrint(false),
    }) || (() => {});

  function handleClickPrint() {
    setShowPrint(!showPrint);
    handlePrint();
  }

  const urlPathname = window.location.pathname;

  async function cancelarAgendamento(idAgendamento: number) {
    const { status } = await deleteScheduleAWS(idAgendamento);

    if (status === 200) {
      toast.success('Agendamento cancelado com sucesso!', { id: 'toast' });

      if (urlPathname.includes('/ticket')) {
        navigate('/');
      }

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  }

  function verificaHorarioCancelamento() {
    if (!cliente) return;

    const dataAtual = new Date();

    const diff = new Date(cliente?.dtInicio).getTime() - dataAtual.getTime();

    const diffMinutes = Math.round(diff / 1000 / 60);

    if (diffMinutes < 30) {
      return true;
    }

    return false;
  }

  useEffect(() => {
    async function buscaCliente() {
      try {
        setLoading(true);

        const { data } = await getSchedulesAWS(Number(params.id));

        if (!data) return;

        setCliente(data.content[0]);

        setLoading(false);
      } catch (error) {
        toast.error('Erro ao buscar cliente', { id: 'toast' });
        navigate('/');
        setLoading(false);
      } finally {
        setLoading(false);
      }
    }

    if (params?.id !== undefined) {
      buscaCliente();
    }
  }, []);

  useEffect(() => {
    async function buscarTickets() {
      try {
        setLoading(true);

        const { data } = await getSchedulesClientAWS(Number(user?.cdUsuario));

        if (!data) return;

        setTickets(data.content);

        setLoading(false);
      } catch (error) {
        toast.error('Erro ao buscar cliente', { id: 'toast' });
        setLoading(false);
      } finally {
        setLoading(false);
      }
    }

    buscarTickets();
  }, []);

  useEffect(() => {
    setSelectHours('');
    if (params?.id !== undefined) {
      setSelectDay(new Date());
    }
  }, [params.id]);

  return {
    cliente,
    loading,
    componentToPrintRef,
    handleClickPrint,
    showPrint,
    cancelarAgendamento,
    verificaHorarioCancelamento,
    tickets,
  };
}
