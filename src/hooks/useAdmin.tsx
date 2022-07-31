import { ChangeEvent, useEffect, useState } from 'react';

import { UserMetadata } from 'types/IContext';

import { getBarbeirosApproved } from 'services/get/aprovar';
import { getClientesApproved } from 'services/get/clienteAprovados';
import { confirmUser } from 'services/post/confirmUser';

import { useAuth } from './useAuth';

export function useAdmin() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [barbeiros, setBarbeiros] = useState<UserMetadata[]>([]);
  const [barbeirosAprovados, setBarbeirosAprovados] = useState<UserMetadata[]>(
    [],
  );
  const [clientesAprovados, setClientesAprovados] = useState<UserMetadata[]>(
    [],
  );
  const [currentPage, setCurrentPage] = useState(0);
  const [page, setPage] = useState(0);

  const clienteQtd = clientesAprovados[0]?.qtd || 0;

  function handleChangePage(event: ChangeEvent<unknown>, value: number) {
    setPage(value - 1);
    setCurrentPage(value);
  }

  async function buscarBarbeirosParaAprovar() {
    setLoading(true);
    const { data, error, status } = await getBarbeirosApproved(false);

    if (error) {
      switch (status) {
        default:
          return;
      }
    }

    if (!data) return;

    if (data[0].j === null) {
      setBarbeiros([]);
      setLoading(false);
      return;
    }

    setBarbeiros(data[0].j);
    setLoading(false);
  }

  async function buscarClientesAprovados() {
    setLoading(true);
    const { data, error, status } = await getClientesApproved(false, page);

    if (error) {
      switch (status) {
        default:
          return;
      }
    }

    if (!data) return;

    if (data[0].j === null) {
      setClientesAprovados([]);
      setLoading(false);
      return;
    }

    setClientesAprovados(data[0].j);
    setLoading(false);
  }

  async function buscarBarbeirosParaReprovar() {
    setLoading(true);
    const { data, error, status } = await getBarbeirosApproved(true);

    if (error) {
      switch (status) {
        default:
          return;
      }
    }

    if (!data) return;

    if (data[0].j === null) {
      setBarbeirosAprovados([]);
      setLoading(false);
      return;
    }

    setBarbeirosAprovados(data[0].j);
    setLoading(false);
  }

  async function aproveBarbeiro(id: string) {
    const { error, status } = await confirmUser(user?.id || '', id, true);

    if (error) {
      switch (status) {
        default:
          return;
      }
    }

    buscarBarbeirosParaAprovar();
    buscarBarbeirosParaReprovar();
  }

  async function disabledBarbeiro(id: string) {
    const { error, status } = await confirmUser(user?.id || '', id, false);

    if (error) {
      switch (status) {
        default:
          return;
      }
    }

    buscarBarbeirosParaAprovar();
    buscarBarbeirosParaReprovar();
  }

  useEffect(() => {
    buscarBarbeirosParaAprovar();
    buscarBarbeirosParaReprovar();
    buscarClientesAprovados();
  }, []);

  useEffect(() => {
    buscarClientesAprovados();
  }, [currentPage]);

  return {
    loading,
    aproveBarbeiro,
    barbeiros,
    barbeirosAprovados,
    disabledBarbeiro,
    clientesAprovados,
    currentPage,
    handleChangePage,
    clienteQtd,
  };
}
