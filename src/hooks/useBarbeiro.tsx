import { useEffect, useState } from 'react';
import { DateRange } from 'react-day-picker';

import { format, addDays } from 'date-fns';
import { Content } from 'types/ServicesProps';
import * as XLSX from 'xlsx';

import { useUser } from 'contexts/User';

import { getsShedulesByDateAWS } from 'services/get';

const THIRTYMINUTES = 30 * 60 * 1000;
const pastMonth = new Date();

interface ExcelDataProps {
  id: number;
  Nome: string;
  Horario: string;
  Data: string;
  Turno: string | undefined;
}

export function useBarbeiro() {
  const {
    buscarClientes,
    clientId,
    getClientesMorning,
    getClientesAfternoon,
    getClientesNight,
    situation,
    verificaHorario,
  } = useUser();

  const [toggleDownload, setToggleDownload] = useState(true);
  const [visibleCalendar, setVisibleCalendar] = useState(true);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [ultimaAtualizacao, setUltimaAtualizacao] = useState(
    format(new Date(), 'HH:mm:ss'),
  );
  const [dataExport, setDataExport] = useState<ExcelDataProps[]>([]);
  const defaultSelected: DateRange = {
    from: pastMonth,
    to: addDays(pastMonth, 4),
  };
  const [range, setRange] = useState<DateRange | undefined>(defaultSelected);

  function exportToExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataExport);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, `Mes_${format(range?.to as Date, 'MM')}.xlsx`);
  }

  function tick() {
    setDate(new Date());
  }

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function isBarbeiroApproved() {
    if (situation === 'APROVADO') {
      return true;
    }

    return false;
  }

  function handleSetClienteLocalStorage(cliente: Content) {
    localStorage.setItem('@rasg:cliente', JSON.stringify(cliente));
    openModal();
  }

  function clienteEqualsZero() {
    return (
      getClientesMorning().length === 0 &&
      getClientesAfternoon().length === 0 &&
      getClientesNight().length === 0
    );
  }

  function clienteGreaterZero() {
    return (
      getClientesMorning().length > 0 ||
      getClientesAfternoon().length > 0 ||
      getClientesNight().length > 0
    );
  }

  useEffect(() => {
    const timerID = setInterval(() => tick(), 1000);

    return function cleanup() {
      clearInterval(timerID);
    };
  });

  useEffect(() => {
    const interval = setInterval(() => {
      buscarClientes();

      const dateAtual = format(new Date(), 'HH:mm:ss');
      setUltimaAtualizacao(dateAtual);
    }, THIRTYMINUTES);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    async function buscarDadosParaExcel() {
      if (!range?.from) return;
      if (!range?.to) return;

      const dataInicial =
        format(new Date(range.from), 'yyyy-MM-dd 00:00:00') || '';
      const dataFinal = format(new Date(range.to), 'yyyy-MM-dd 23:59:59') || '';

      const { data } = await getsShedulesByDateAWS(
        dataInicial,
        dataFinal,
        Number(clientId),
      );

      if (!data) return;

      const newValues = data.content.map((cliente) => ({
        id: Number(cliente.cliente.cdUsuario),
        Nome: cliente.cliente.nmUsuario,
        Horario: format(new Date(cliente.dtInicio), 'HH:mm'),
        Data: format(new Date(cliente.dtInicio), 'dd/MM/yyyy'),
        Turno: verificaHorario(format(new Date(cliente.dtInicio), 'HH:mm')),
      }));

      setDataExport(newValues);
    }

    if (toggleDownload === false) {
      buscarDadosParaExcel();
    }
  }, [toggleDownload, range]);

  return {
    toggleDownload,
    setToggleDownload,
    modalIsOpen,
    setIsOpen,
    openModal,
    closeModal,
    date,
    ultimaAtualizacao,
    range,
    setRange,
    exportToExcel,
    pastMonth,
    isBarbeiroApproved: isBarbeiroApproved(),
    visibleCalendar,
    setVisibleCalendar,
    handleSetClienteLocalStorage,
    clienteEqualsZero,
    clienteGreaterZero,
  };
}
