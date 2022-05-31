import { useEffect, useState } from 'react';
import { DateRange } from 'react-day-picker';

import { format, addDays } from 'date-fns';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import { ClienteMetadata } from 'types/IContext';
import * as XLSX from 'xlsx';

import { useUser } from 'contexts/User';

import { getBarbeiro } from 'services/get/barbeiros';
import { getClientesMonth } from 'services/get/clientes';

const THIRTYMINUTES = 30 * 60 * 1000;
const TWO_DAYS = 2;
const pastMonth = new Date();

export function useBarbeiro() {
  const { getFirstCliente, buscaClientesHorario, buscarClientes, clientId } =
    useUser();
  const [visible, setVisible] = useState(true);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [approved, setApproved] = useState('');
  const [ultimaAtualizacao, setUltimaAtualizacao] = useState(
    format(new Date(), 'HH:mm:ss'),
  );
  const [dataExport, setDataExport] = useState<ClienteMetadata[]>([]);
  const defaultSelected: DateRange = {
    from: pastMonth,
    to: addDays(pastMonth, 4),
  };
  const [range, setRange] = useState<DateRange | undefined>(defaultSelected);

  const dataInicial = format(range?.from as Date, 'yyyy-MM-dd');
  const dataFinal = format(range?.to as Date, 'yyyy-MM-dd');

  async function verificarStatusBarbeiro() {
    const { data, status, error } = await getBarbeiro(clientId as string, true);

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

  function verificarTurno(shift: string) {
    if (shift === 'morning') {
      return 'Manhã';
    }

    if (shift === 'afternoon') {
      return 'Tarde';
    }

    if (shift === 'night') {
      return 'Noite';
    }
  }

  async function buscarDadosParaExcel() {
    const { data, error, status } = await getClientesMonth(
      clientId || '',
      dataInicial,
      dataFinal,
    );

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
      Turno: verificarTurno(cliente.shift),
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

  function isBarbeiroApproved() {
    if (approved === 'S') {
      return true;
    } else {
      return false;
    }
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

    const actualHourMinutePlusOne = format(
      new Date(date.setMinutes(date.getMinutes() + 1)),
      'HH:mm',
    );

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

  useEffect(() => {
    if (
      Cookies.get('barbeiro_modal') === 'false' ||
      Cookies.get('barbeiro_modal') === undefined
    ) {
      Swal.fire({
        title: 'Novidade no ar!',
        html: 'Agora você pode fazer relatórios do mês. Basta clicar no botão "Download do mês" e selecionar o periodo desejado.',
        icon: 'info',
        confirmButtonColor: '#ff9000',
        background: '#312e38',
        color: '#f4ede8',
        confirmButtonText: 'Entendi!',
      }).then(() => {
        Cookies.set('barbeiro_modal', 'true', { expires: TWO_DAYS });
      });
    }
  }, []);

  useEffect(() => {
    verificarStatusBarbeiro();
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
    range,
    setRange,
    exportToExcel,
    pastMonth,
    isBarbeiroApproved: isBarbeiroApproved(),
  };
}
