import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { format } from 'date-fns';
import { ClienteMetadata } from 'types/IContext';

import { Header } from 'components/Header';
import { Ticket } from 'components/Ticket';

import { useTheme } from 'contexts/Theme';
import { useUser } from 'contexts/User';

import { getHorarioSelecionado } from 'services/get/horarioMarcado';

import styles from './MyTicket.module.scss';

export function MyTicket() {
  const navigate = useNavigate();
  const params = useParams();
  const { selectHours, setSelectHours } = useUser();
  const { theme } = useTheme();

  const [cliente, setCliente] = useState<ClienteMetadata>();
  const atualDayFormatted = format(new Date(), 'yyyy-MM-dd');

  useEffect(() => {
    setSelectHours('');
  }, [params.id]);

  async function buscaCliente() {
    const { data, error, status } = await getHorarioSelecionado(params?.id || '', atualDayFormatted, selectHours);

    if (error) {
      navigate('/');
      switch (status) {
        default:
          throw new Error('Erro ao buscar barbeiros');
      }
    }

    if (!data) return;

    if (data[0].j === null) {
      throw new Error('Erro ao buscar barbeiros');
    }

    setCliente(data[0].j[0]);
  }

  useEffect(() => {
    buscaCliente();
  }, []);

  return (
    <>
      <div className={styles.home} data-theme={theme}>
        <Header back />

        <div className={styles.container}>
          <h2>Apresente esse ticket para o seu barbeiro</h2>
          <Ticket cliente={cliente} />
        </div>
      </div>
    </>
  );
}
