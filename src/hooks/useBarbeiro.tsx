import { useEffect, useState } from 'react';
import { DateRange } from 'react-day-picker';

import { format, addDays } from 'date-fns';
import { ClienteMetadata } from 'types/IContext';
import * as XLSX from 'xlsx';

import { useUser } from 'contexts/User';

import { getClientesMonth } from 'services/get/clientes';

const THIRTYMINUTES = 30 * 60 * 1000;
const pastMonth = new Date();

export function useBarbeiro() {
  const { getFirstCliente, buscaClientesHorario, buscarClientes, clientId } = useUser();
  const [visible, setVisible] = useState(true);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [ultimaAtualizacao, setUltimaAtualizacao] = useState(format(new Date(), 'HH:mm:ss'));
  const [dataExport, setDataExport] = useState<ClienteMetadata[]>([]);
  const defaultSelected: DateRange = {
    from: pastMonth,
    to: addDays(pastMonth, 4),
  };
  const [range, setRange] = useState<DateRange | undefined>(defaultSelected);

  const dataInicial = format(range?.from as Date, 'yyyy-MM-dd');
  const dataFinal = format(range?.to as Date, 'yyyy-MM-dd');

  async function buscarDadosParaExcel() {
    const { data, error, status } = await getClientesMonth(clientId || '', dataInicial, dataFinal);

    if (error) {
      switch (status) {
        default:
          return;
      }
    }

    if (!data) return;
    if (!data[0].j) return;
    if (!data[0].j[0]) return;

    const newValues = data[0].j.map((cliente: ClienteMetadata) => ({
      id: cliente.id,
      Nome: cliente.client_name,
      Horario: cliente.hour,
      Data: format(new Date(cliente.appointment_date), 'dd/MM/yyyy'),
      // eslint-disable-next-line no-nested-ternary
      Turno: cliente.shift === 'morning' ? 'Manhã' : cliente.shift === 'afternoon' ? 'Tarde' : 'Noite',
    }));

    setDataExport(newValues);
  }

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

  useEffect(() => {
    buscarDadosParaExcel();
  }, [dataInicial, dataFinal]);

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
    range,
    setRange,
    exportToExcel,
    pastMonth,
  };
}
