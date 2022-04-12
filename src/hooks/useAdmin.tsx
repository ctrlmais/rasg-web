import { useEffect, useState } from 'react';

import { useToast } from 'contexts/Toast';

import { getBarbeirosApproved } from 'services/get/aprovar';
import { confirmUser } from 'services/post/confirmUser';

export function useAdmin() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [barbeiros, setBarbeiros] = useState([]);
  const [barbeirosAprovados, setBarbeirosAprovados] = useState([]);

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
    const { error, status } = await confirmUser('aa12bb33-d77d-4ec5-9b79-28aec4831abf', id, true);

    if (error) {
      switch (status) {
        default:
          return;
      }
    }

    toast.success('Barbeiro aprovado com sucesso!', { id: 'toast' });

    buscarBarbeirosParaAprovar();
    buscarBarbeirosParaReprovar();
  }

  async function disabledBarbeiro(id: string) {
    const { error, status } = await confirmUser('aa12bb33-d77d-4ec5-9b79-28aec4831abf', id, false);

    if (error) {
      switch (status) {
        default:
          return;
      }
    }

    toast.success('Barbeiro desabilitado com sucesso!', { id: 'toast' });

    buscarBarbeirosParaAprovar();
    buscarBarbeirosParaReprovar();
  }

  useEffect(() => {
    buscarBarbeirosParaAprovar();
    buscarBarbeirosParaReprovar();
  }, []);

  return {
    loading,
    aproveBarbeiro,
    barbeiros,
    barbeirosAprovados,
    disabledBarbeiro,
  };
}
