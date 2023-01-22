import { useEffect, useState } from 'react';

import { format } from 'date-fns';
import { useFormik } from 'formik';
import { GetServicoTipo, Servico } from 'types/ServicesProps';

import { useToast } from 'contexts/Toast';

import {
  getSearchPhotoServiceByIdAWS,
  getSearchPhotoServicesByHashAWS,
  getServicesByIdAWS,
  getServicesTypesAWS,
} from 'services/get/servicos';
import { postServicesAWS } from 'services/post/servicos';
import { putPhotoServicesAWS } from 'services/update';
import { putServicesAWS } from 'services/update/servicos/putServico';

import { useAuth } from './useAuth';

export interface SaveDetailPhotoProps {
  photo: string;
  cdFotoServico: number;
}

export function useServices() {
  const { toast } = useToast();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [servicos, setServicos] = useState<Servico[]>([]);
  const [tiposServicos, setTiposServicos] = useState<GetServicoTipo[]>([]);
  const [servicoSelecionado, setServicoSelecionado] = useState<any>();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [savePhotoServices, setSavePhotoServices] = useState<
    SaveDetailPhotoProps[]
  >([]);

  const serviceStoraged: Servico = JSON.parse(
    localStorage.getItem('@rasg:service') || '{}',
  );

  const isServiceStoraged = !!serviceStoraged.cdServico;

  function closeModal() {
    setIsOpen(false);
    localStorage.removeItem('@rasg:service');
  }

  function convertMinutesToHoursTwoDigits(minutes: number) {
    const hours = Math.floor(minutes / 60);
    const minutesRest = minutes % 60;
    return `${hours < 10 ? '0' : ''}${hours}:${
      minutesRest < 10 ? '0' : ''
    }${minutesRest}`;
  }

  function convertHoursToMinutes(time: string) {
    if (!time) return 0;
    const [hour, minutes, seconds] = time.split(':').map(Number);
    const timeInMinutes = hour * 60 + minutes + seconds / 60;
    return timeInMinutes;
  }

  const formikServices = useFormik({
    initialValues: {
      cdServico: '',
      tmServico: '',
      nmServico: '',
      deServico: '',
      situacaoServico: {
        cdSituacaoServico: 0,
        deSituacaoServico: 'APROVADO',
        sgSituacaoServico: 'APR',
        nmIcon: 'BiCheck',
        nmCor: '#FFFFFF',
        dtCadastro: '2022-12-24 03:51:34',
      },
      tipoServico: {
        cdTipoServico: '',
        deTipoServico: '',
        sgTipoServico: '',
        dtCadastro: '',
      },
      gerenciador: user,
      dtCadastro: '',
      dtAtualizacao: '',
      cdUsuarioCadastro: 0,
      cdUsuarioAtualizacao: 0,
    },
    onSubmit: async (values) => {
      if (!user) return;

      const newValues = {
        tmServico: `${convertMinutesToHoursTwoDigits(
          Number(values.tmServico),
        )}:00`,
        nmServico: values.nmServico,
        deServico: values.deServico,
        situacaoServico: values.situacaoServico,
        tipoServico: servicoSelecionado,
        gerenciador: user,
        dtCadastro: '',
        dtAtualizacao: '',
        cdUsuarioCadastro: Number(user.cdUsuario),
        cdUsuarioAtualizacao: Number(user.cdUsuario),
      };

      if (!serviceStoraged) {
        try {
          setLoading(true);

          const { status } = await postServicesAWS(newValues);

          if (status === 200) {
            toast.success('Serviço cadastrado com sucesso', { id: 'toast' });

            const { data } = await getServicesByIdAWS(user?.cdUsuario);

            setServicos(data.content);
          }
          setLoading(false);

          window.location.reload();
        } catch (error) {
          toast.error('Erro ao cadastrar serviço', { id: 'toast' });
        } finally {
          setLoading(false);
        }
      }
    },
  });

  async function putPhotoServices(image: string, file: File, servico: string) {
    try {
      const result = savePhotoServices.find(
        (photo) => String(photo.cdFotoServico) === image,
      );

      const resultServico = servicos.find(
        (serv) => String(serv.cdServico) === servico,
      );

      const cdFotoServico = String(result?.cdFotoServico);
      const cdServico = String(resultServico?.cdServico);

      const formData = new FormData();

      formData.append('mlArquivo', file);
      formData.append('cdFotoServico', cdFotoServico);
      formData.append('cdServico', cdServico);

      await putPhotoServicesAWS(formData, cdFotoServico);
      toast.success('Foto atualizada com sucesso!', { id: 'toast' });
    } catch (error) {
      toast.error('Erro ao atualizar foto', { id: 'toast' });
    }
  }

  async function putServico() {
    const newValuesPut = {
      cdServico: serviceStoraged.cdServico,
      tmServico: `${convertMinutesToHoursTwoDigits(
        Number(formikServices.values.tmServico),
      )}:00`,
      nmServico: formikServices.values.nmServico,
      deServico: formikServices.values.deServico,
      situacaoServico: formikServices.values.situacaoServico,
      tipoServico: servicoSelecionado,
      gerenciador: user,
      dtCadastro: serviceStoraged.dtCadastro,
      dtAtualizacao: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
      cdUsuarioCadastro: Number(user?.cdUsuario),
      cdUsuarioAtualizacao: Number(user?.cdUsuario),
    };

    try {
      setLoading(true);

      const { status } = await putServicesAWS(newValuesPut);

      if (status === 200) {
        toast.success('Serviço atualizado com sucesso', { id: 'toast' });

        const { data } = await getServicesByIdAWS(Number(user?.cdUsuario));

        setServicos(data.content);
      }
      setLoading(false);

      window.location.reload();
    } catch (error: any) {
      console.log(error.response.data.errors[0]);
      toast.error('Erro ao atualizar serviço', { id: 'toast' });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!user) return;

    async function loadTiposServicos() {
      try {
        const { data } = await getServicesTypesAWS();

        const { data: servicosData } = await getServicesByIdAWS(
          Number(user?.cdUsuario),
        );

        setTiposServicos(data);

        setServicos(servicosData.content);
      } catch (error) {
        toast.error('Erro ao carregar tipos de serviços');
      }
    }

    loadTiposServicos();
  }, []);

  useEffect(() => {
    if (!user) return;

    async function getPhotoServiesBarber() {
      setLoading(true);
      try {
        const { data } = await getServicesByIdAWS(Number(user?.cdUsuario));

        const cdServicos = data.content.map((item) => item.cdServico);

        const promises = cdServicos.map(
          async (cdServico) =>
            await getSearchPhotoServiceByIdAWS(String(cdServico)),
        );

        const results = await Promise.all(promises);

        const resultsFilter = results.filter((item) => item.data.length > 0);

        const nmHashMime = resultsFilter.map((result) => {
          const { nmHash, nmMime, cdFotoServico } = result.data[0];
          return { nmHash, nmMime, cdFotoServico };
        });

        const promisesPhoto = nmHashMime.map(
          async (item) => await getSearchPhotoServicesByHashAWS(item.nmHash),
        );

        const resultsPhoto = await Promise.all(promisesPhoto);

        const newResultAddnmMime = resultsPhoto.map((result, index) => ({
          ...result,
          nmMime: nmHashMime[index].nmMime,
          cdFotoServico: nmHashMime[index].cdFotoServico,
        }));

        const photoURI = newResultAddnmMime.map((item) => {
          const { nmMime, cdFotoServico } = item;
          const photo = `data:${nmMime};base64,${item.data}`;
          return {
            photo,
            cdFotoServico,
          };
        });

        setSavePhotoServices(photoURI);

        setLoading(false);
      } catch (error) {
        toast.error('Erro ao buscar serviços do barbeiro', { id: 'toast' });
        setLoading(false);
      } finally {
        setLoading(false);
      }
    }

    getPhotoServiesBarber();
  }, []);

  useEffect(() => {
    if (!serviceStoraged) return;

    const horarioEmMinutos = convertHoursToMinutes(serviceStoraged.tmServico);

    formikServices.setFieldValue('cdServico', serviceStoraged.cdServico);
    formikServices.setFieldValue('tmServico', horarioEmMinutos);
    formikServices.setFieldValue('nmServico', serviceStoraged.nmServico);
    formikServices.setFieldValue('deServico', serviceStoraged.deServico);
    formikServices.setFieldValue(
      'situacaoServico',
      serviceStoraged.situacaoServico,
    );
    setServicoSelecionado(serviceStoraged.tipoServico);
    formikServices.setFieldValue('tipoServico', serviceStoraged.tipoServico);
    formikServices.setFieldValue('gerenciador', serviceStoraged.gerenciador);
    formikServices.setFieldValue('dtCadastro', serviceStoraged.dtCadastro);
    formikServices.setFieldValue(
      'dtAtualizacao',
      serviceStoraged.dtAtualizacao,
    );
    formikServices.setFieldValue(
      'cdUsuarioCadastro',
      serviceStoraged.cdUsuarioCadastro,
    );
    formikServices.setFieldValue(
      'cdUsuarioAtualizacao',
      serviceStoraged.cdUsuarioAtualizacao,
    );
  }, [modalIsOpen]);

  return {
    formikServices,
    loading,
    modalIsOpen,
    setIsOpen,
    closeModal,
    servicos,
    setServicos,
    tiposServicos,
    servicoSelecionado,
    setServicoSelecionado,
    savePhotoServices,
    putPhotoServices,
    serviceStoraged,
    putServico,
    isServiceStoraged,
  };
}
