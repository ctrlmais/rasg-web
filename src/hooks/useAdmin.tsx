import { ChangeEvent, useEffect, useState } from 'react';

import { Gerenciador } from 'types/ServicesProps';

import { useToast } from 'contexts/Toast';

import {
  getClientsApprovedAWS,
  getBarberToApproveAWS,
  getBarberApprovedAWS,
  getBarberDisapprovedAWS,
} from 'services/get';
import { patchApprovedUserAWS, patchDisapprovedUserAWS } from 'services/update';

export function useAdmin() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [barbeiros, setBarbeiros] = useState<Gerenciador[]>([]);
  const [barbeirosAprovados, setBarbeirosAprovados] = useState<Gerenciador[]>(
    [],
  );
  const [clientesAprovados, setClientesAprovados] = useState<Gerenciador[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [page, setPage] = useState(0);

  const clienteQtd = clientesAprovados.length;

  function handleChangePage(event: ChangeEvent<unknown>, value: number) {
    setPage(value - 1);
    setCurrentPage(value);
  }

  async function buscarBarbeirosParaAprovar() {
    try {
      setLoading(true);

      const { data } = await getBarberToApproveAWS(page);
      const { data: dataReprovados } = await getBarberDisapprovedAWS(page);

      const barbeirosParaAprovar = [...data.content, ...dataReprovados.content];

      if (!data) return setLoading(false);

      setBarbeiros(barbeirosParaAprovar);
    } catch (error) {
      toast.error('Erro ao buscar barbeiros aprovados', {
        id: 'toast',
      });
      setBarbeiros([]);
    } finally {
      setLoading(false);
    }
  }

  async function buscarClientesAprovados() {
    try {
      setLoading(true);

      const { data } = await getClientsApprovedAWS(page);

      if (!data) return setLoading(false);

      setClientesAprovados(data.content);
    } catch (error) {
      toast.error('Erro ao buscar clientes aprovados', {
        id: 'toast',
      });
      setClientesAprovados([]);
    } finally {
      setLoading(false);
    }
  }

  async function buscarBarbeirosParaReprovar() {
    try {
      setLoading(true);

      const { data } = await getBarberApprovedAWS(page);

      if (!data) return setLoading(false);

      setBarbeirosAprovados(data.content);
    } catch (error) {
      toast.error('Erro ao buscar barbeiros para aprovados', {
        id: 'toast',
      });
      setBarbeiros([]);
    } finally {
      setLoading(false);
    }
  }

  async function aproveBarbeiro(id: number) {
    const { status } = await patchApprovedUserAWS(Number(id));

    if (status === 200) {
      toast.success('Barbeiro aprovado com sucesso', {
        id: 'toast',
      });
      buscarBarbeirosParaAprovar();
      buscarBarbeirosParaReprovar();
    } else {
      toast.error('Erro ao aprovar barbeiro', {
        id: 'toast',
      });
    }
  }

  async function disabledBarbeiro(id: number) {
    const { status } = await patchDisapprovedUserAWS(Number(id));

    if (status === 200) {
      toast.success('Barbeiro desabilitado com sucesso', {
        id: 'toast',
      });

      buscarBarbeirosParaAprovar();
      buscarBarbeirosParaReprovar();
    } else {
      toast.error('Erro ao desabilitar barbeiro', {
        id: 'toast',
      });
    }
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
