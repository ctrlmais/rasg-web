import { useEffect, useState } from 'react';

import { format } from 'date-fns';

import { useUser } from 'contexts/User';

import { getBarbeiro } from 'services/get/barbeiros';

import { useAuth } from './useAuth';

const THIRTYMINUTES = 30 * 60 * 1000;

export function useBarbeiro() {
  const { user } = useAuth();
  const { getFirstCliente, buscaClientesHorario, buscarClientes } = useUser();
  const [visible, setVisible] = useState(true);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [ultimaAtualizacao, setUltimaAtualizacao] = useState(format(new Date(), 'HH:mm:ss'));
  const [approved, setApproved] = useState('');

  async function verificarStatusBarbeiro() {
    const { data, status, error } = await getBarbeiro(user?.id || '');

    if (error) {
      switch (status) {
        default:
          return;
      }
    }

    if (!data) return;
    if (!data[0].j) return;

    if (data[0].j === null) {
      return;
    }

    setApproved(data[0].j[0].admin_confirmed);
  }

  useEffect(() => {
    verificarStatusBarbeiro();
  }, []);

  function tick() {
    setDate(new Date());
  }

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    const timerID = setInterval(() => tick(), 1000);

    return function cleanup() {
      clearInterval(timerID);
    };
  });

  useEffect(() => {
    const actualHour = format(date, 'HH:mm:ss');
    const dateCliente = `${getFirstCliente()?.hour}:00`;

    const actualHourMinutePlusOne = format(new Date(date.setMinutes(date.getMinutes() + 1)), 'HH:mm');

    if (actualHour === dateCliente) {
      buscaClientesHorario(actualHourMinutePlusOne);
    }
  }, [date]);

  useEffect(() => {
    const interval = setInterval(() => {
      buscarClientes();

      const dateAtual = format(new Date(), 'HH:mm:ss');
      setUltimaAtualizacao(dateAtual);
    }, THIRTYMINUTES);

    return () => clearInterval(interval);
  }, []);

  const customStyles = {
    content: {
      inset: 'initial',
      border: 'none',
      background: '#312e38',
      overflow: 'auto',
      borderRadius: '4px',
      outline: 'none',
      padding: '0px',
      height: '40vh',
      width: '25rem',
      alignItems: 'center',
      justifyContent: 'center',
    },
    overlay: {
      display: 'flex',
      inset: '0px',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
  };

  return {
    visible,
    setVisible,
    modalIsOpen,
    setIsOpen,
    openModal,
    closeModal,
    customStyles,
    date,
    ultimaAtualizacao,
    approved,
  };
}
