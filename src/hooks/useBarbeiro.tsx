import { useEffect, useState } from 'react';
import { DateRange } from 'react-day-picker';
import { useNavigate } from 'react-router-dom';

import { format, addDays } from 'date-fns';
import Swal from 'sweetalert2';
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
  const navigate = useNavigate();
  const {
    // getFirstCliente,
    // buscaClientesHorario,
    buscarClientes,
    clientId,
    getClientesMorning,
    getClientesAfternoon,
    getClientesNight,
    verificaTelefone,
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

  // useEffect(() => {
  //   async function getCliente() {
  //     const actualHour = format(date, 'HH:mm:ss');
  //     const dateCliente = `${getFirstCliente()?.dtInicio}`;
  //     const dateClienteFormat = format(new Date(dateCliente), 'HH:mm:ss');

  //     const actualHourMinutePlusOne = format(
  //       new Date(date.setMinutes(date.getMinutes() + 1)),
  //       'HH:mm',
  //     );

  //     if (actualHour === dateClienteFormat) {
  //       buscaClientesHorario(actualHourMinutePlusOne);
  //     }
  //   }

  //   getCliente();
  // }, [date]);

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

  useEffect(() => {
    if (!verificaTelefone()) {
      Swal.fire({
        title: 'Atenção!',
        text: 'Para continuar utilizando o app, é necessário informar seu telefone. Estamos atualizando algumas coisas no sistema, então não se preocupe, isso não vai demorar nada.',
        icon: 'warning',
        confirmButtonColor: '#ff9000',
        background: '#312e38',
        color: '#f4ede8',
        confirmButtonText: 'Adicionar telefone',
      }).then((result) => {
        if (result.value) {
          navigate('/profile');
        }
      });
    }
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
      width: '22rem',
      alignItems: 'center',
      justifyContent: 'center',
    },
    overlay: {
      display: 'flex',
      inset: '0px',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      zIndex: '10',
    },
  };

  return {
    toggleDownload,
    setToggleDownload,
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
    isBarbeiroApproved: isBarbeiroApproved(),
    visibleCalendar,
    setVisibleCalendar,
    handleSetClienteLocalStorage,
    clienteEqualsZero,
    clienteGreaterZero,
  };
}
