import { useEffect, useState } from 'react';

import { format } from 'date-fns';
import { ICalendar } from 'datebook';

import { useToast } from 'contexts/Toast';
import { useUser } from 'contexts/User';

export function useAgenda() {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const cliente = JSON.parse(localStorage.getItem('@rasg:cliente') || '{}');
  const { generateGoogleCalendarEvent } = useUser();

  const dateStartGoogle = format(
    new Date(cliente.dtInicio),
    `yyyyMMdd'T'HHmmss`,
  );
  const dateEndGoogle = format(
    new Date(cliente.dtTermino),
    `yyyyMMdd'T'HHmmss`,
  );

  const dateStartApple = format(
    new Date(cliente.dtInicio),
    `yyyy-MM-dd'T'HH:mm:ss`,
  );
  const dateEndApple = format(
    new Date(cliente.dtTermino),
    `yyyy-MM-dd'T'HH:mm:ss`,
  );

  const eventSaveBarbeiro = new ICalendar({
    title: `Barba, cabelo e bigode com ${cliente?.cliente.nmUsuario}`,
    description: `Barbearia do ${cliente?.gerenciador.nmUsuario}`,
    start: new Date(dateStartApple),
    end: new Date(dateEndApple),
    location: '',
  });

  function handleGoogleCalendarCliente() {
    const title = `Barba, cabelo e bigode com ${cliente?.cliente.nmUsuario}`;
    const description = `Barbearia do ${cliente?.gerenciador.nmUsuario}`;
    const location = '';

    generateGoogleCalendarEvent(
      title,
      dateStartGoogle,
      dateEndGoogle,
      description,
      location,
    );
  }

  function contactCliente(number: string) {
    window.open(`https://wa.me/+55${number}`);
  }

  function copyToClipboard() {
    setCopied(!copied);
  }

  useEffect(() => {
    if (copied) {
      toast.success('Código de agendamento copiado!', { id: 'toast' });
      setCopied(false);
    }
  }, [copied]);

  return {
    handleGoogleCalendarCliente,
    eventSaveBarbeiro,
    contactCliente,
    copyToClipboard,
  };
}
