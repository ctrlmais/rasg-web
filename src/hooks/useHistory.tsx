import { ChangeEvent, useEffect, useState } from 'react';

import { getHorarioMarcadoMensal } from 'services/get/horarioMarcado';

export function useHistory() {
  const [loading, setLoading] = useState(true);
  const [agendamentos, setAgendamentos] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [page, setPage] = useState(0);

  const storagedUser = JSON.parse(
    localStorage.getItem('supabase.auth.token') || '{}',
  );

  const id = storagedUser.currentSession.user.id;
  const agendamentosQtd = agendamentos.length || 0;

  function handleChangePage(event: ChangeEvent<unknown>, value: number) {
    setPage(value - 1);
    setCurrentPage(value);
  }

  async function buscarHorariosMarcadosMensal() {
    setLoading(true);

    const { data, error, status } = await getHorarioMarcadoMensal(id, page);

    if (error) {
      setLoading(false);
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

    console.log(data[0].j);
    setAgendamentos(data[0].j);
    setLoading(false);
  }

  useEffect(() => {
    buscarHorariosMarcadosMensal();
  }, [currentPage]);

  return {
    loading,
    agendamentos,
    agendamentosQtd,
    handleChangePage,
    currentPage,
    page,
  };
}
