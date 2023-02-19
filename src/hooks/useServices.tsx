import { useEffect, useState } from 'react';

import { format } from 'date-fns';
import { useFormik } from 'formik';
import { GetServicoTipo, Servico } from 'types/ServicesProps';

import { useToast } from 'contexts/Toast';

import { deleteServicesAWS } from 'services/delete';
import {
  getSearchPhotoServiceByIdAWS,
  getSearchPhotoServicesByHashAWS,
  getServicesByIdAWS,
  getServicesTypesAWS,
} from 'services/get';
import { postServicesAWS } from 'services/post';
import { putPhotoServicesAWS, putServicesAWS } from 'services/update';

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
        dtCadastro: '2022-12-31 02:04:30',
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
        situacaoServico: formikServices.values.situacaoServico,
        tipoServico: servicoSelecionado,
        gerenciador: user,
        dtCadastro: '',
        dtAtualizacao: '',
        cdUsuarioCadastro: Number(user?.cdUsuario),
        cdUsuarioAtualizacao: Number(user?.cdUsuario),
      };

      try {
        setLoading(true);

        const { status } = await postServicesAWS(newValues);

        if (status === 200) {
          toast.success('Serviço cadastrado com sucesso', { id: 'toast' });

          const { data } = await getServicesByIdAWS(user?.cdUsuario);

          const removeDtRemocao = data.content.filter(
            (item) => item.dtRemocao === null,
          );

          data.content = removeDtRemocao;

          setServicos(data.content);
        }
      } catch (error) {
        console.log(error);
        toast.error('Erro ao cadastrar serviço', { id: 'toast' });
      } finally {
        setLoading(false);
        window.location.reload();
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

        const removeDtRemocao = data.content.filter(
          (item) => item.dtRemocao === null,
        );

        data.content = removeDtRemocao;

        setServicos(data.content);
      }
      setLoading(false);

      window.location.reload();
    } catch (error: any) {
      console.log(error.response.data.errors[0]);
      toast.error('Erro ao atualizar serviço', { id: 'toast' });
    } finally {
      setLoading(false);
      localStorage.removeItem('@rasg:service');
    }
  }

  async function deleteServico() {
    try {
      setLoading(true);

      const { status } = await deleteServicesAWS(
        String(serviceStoraged.cdServico),
      );

      if (status === 200) {
        toast.success('Serviço excluído com sucesso', { id: 'toast' });

        const { data } = await getServicesByIdAWS(Number(user?.cdUsuario));

        const removeDtRemocao = data.content.filter(
          (item) => item.dtRemocao === null,
        );

        data.content = removeDtRemocao;

        setServicos(data.content);
      }
      setLoading(false);

      window.location.reload();
    } catch (error) {
      toast.error('Erro ao excluir serviço', { id: 'toast' });
    } finally {
      setLoading(false);
      localStorage.removeItem('@rasg:service');
    }
  }

  useEffect(() => {
    if (!user) return;

    async function loadTiposServicos() {
      try {
        const { data: tiposServicos } = await getServicesTypesAWS();

        const { data: servicos } = await getServicesByIdAWS(
          Number(user?.cdUsuario),
        );

        const servicosAtivos = servicos.content.filter(
          (servico) => servico.dtRemocao === null,
        );

        setTiposServicos(tiposServicos);
        setServicos(servicosAtivos);
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

        const nmHashMimePromises = resultsFilter.map(async (result) => {
          const { nmHash, nmMime, cdFotoServico } = result.data[0];
          const photoResult = await getSearchPhotoServicesByHashAWS(nmHash);
          const photoURI = `data:${nmMime};base64,${photoResult.data}`;
          return {
            photo: photoURI,
            cdFotoServico,
          };
        });

        const photoURIs = await Promise.all(nmHashMimePromises);

        setSavePhotoServices(photoURIs);

        console.log(photoURIs);

        setLoading(false);
      } catch (error) {
        toast.error('Erro ao buscar serviços do barbeiro', { id: 'toast' });
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
    deleteServico,
  };
}
