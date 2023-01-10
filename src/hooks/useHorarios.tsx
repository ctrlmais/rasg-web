import { useEffect, useState } from 'react';

import { format } from 'date-fns';
import { useFormik } from 'formik';
import { GetJornadaUsuario } from 'types/ServicesProps';

import { useToast } from 'contexts/Toast';

import { getJourneyByIdAWS } from 'services/get';
import { postJourneysAWS } from 'services/post';
import { putJourneysAWS } from 'services/update';

import { useAuth } from './useAuth';

export function useHorarios() {
  const { toast } = useToast();
  const { storagedUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [horarios, setHorarios] = useState<GetJornadaUsuario[]>([]);
  const [modalIsOpen, setIsOpen] = useState(false);

  const horarioStoraged = JSON.parse(
    localStorage.getItem('@rasg:horario') || '{}',
  );

  function closeModal() {
    setIsOpen(false);

    localStorage.removeItem('@rasg:horario');
  }

  const formikHorarios = useFormik({
    initialValues: {
      gerenciador: storagedUser,
      hrInicio: '',
      hrFim: '',
      hrInicioIntervalo: '',
      hrFimIntervalo: '',
      cdDiaSemana: '',
      tipoJornada: {
        cdTipoJornada: 0,
        deTipoJornada: 'TRABALHO',
        sgTipoJornada: 'TRB',
        dtCadastro: '2022-10-08 02:56:36',
      },
      dtCadastro: '',
      dtAtualizacao: '',
      cdUsuarioCadastro: '',
      cdUsuarioAtualizacao: '',
    },
    onSubmit: async (values) => {
      const newValues = {
        gerenciador: storagedUser,
        hrInicio: `${values.hrInicio}:00`,
        hrFim: `${values.hrFim}:00`,
        hrInicioIntervalo: `${values.hrInicioIntervalo}:00`,
        hrFimIntervalo: `${values.hrFimIntervalo}:00`,
        cdDiaSemana: Number(values.cdDiaSemana),
        tipoJornada: {
          cdTipoJornada: 0,
          deTipoJornada: 'TRABALHO',
          sgTipoJornada: 'TRB',
          dtCadastro: '2022-10-08 02:56:36',
        },
        dtCadastro: '',
        dtAtualizacao: '',
        cdUsuarioCadastro: storagedUser?.cdUsuario,
        cdUsuarioAtualizacao: '',
      };

      const atualDate = format(new Date(), 'yyyy-MM-dd');

      const newValuesPut = {
        cdJornada: horarioStoraged?.cdJornada,
        gerenciador: storagedUser,
        hrInicio: format(
          new Date(`${atualDate} ${values.hrInicio}`),
          'HH:mm:ss',
        ),
        hrFim: format(new Date(`${atualDate} ${values.hrFim}`), 'HH:mm:ss'),
        hrInicioIntervalo: format(
          new Date(`${atualDate} ${values.hrInicioIntervalo}`),
          'HH:mm:ss',
        ),
        hrFimIntervalo: format(
          new Date(`${atualDate} ${values.hrFimIntervalo}`),
          'HH:mm:ss',
        ),
        cdDiaSemana: Number(values.cdDiaSemana),
        tipoJornada: horarioStoraged?.tipoJornada,
        dtCadastro: horarioStoraged?.dtCadastro,
        dtAtualizacao: '',
        cdUsuarioCadastro: storagedUser?.cdUsuario,
        cdUsuarioAtualizacao: storagedUser?.cdUsuario,
      };

      if (horarioStoraged) {
        try {
          setLoading(true);

          const { status } = await putJourneysAWS(
            newValuesPut,
            horarioStoraged.cdJornada,
          );

          if (status === 200) {
            toast.success('Horários adicionados com sucesso!', { id: 'toast' });

            const { data } = await getJourneyByIdAWS(storagedUser?.cdUsuario);

            setHorarios(data);
          }
          setLoading(false);

          window.location.reload();
        } catch (error: any) {
          console.log(error.response.data.errors[0]);
          toast.error('Erro ao atualizar horários', { id: 'toast' });
        } finally {
          setLoading(false);
        }
      }

      if (!horarioStoraged) {
        try {
          setLoading(true);

          const { status } = await postJourneysAWS(newValues);

          const { data } = await getJourneyByIdAWS(storagedUser?.cdUsuario);

          setHorarios(data);

          if (status === 200) {
            toast.success('Horários adicionados com sucesso!', { id: 'toast' });

            const { data } = await getJourneyByIdAWS(storagedUser?.cdUsuario);

            setHorarios(data);
          }
          setLoading(false);

          window.location.reload();
        } catch (error) {
          toast.error('Erro ao atualizar horários', { id: 'toast' });
        } finally {
          setLoading(false);
        }
      }
    },
  });

  useEffect(() => {
    async function loadHorarios() {
      try {
        setLoading(true);

        const { data } = await getJourneyByIdAWS(storagedUser?.cdUsuario);

        setHorarios(data);

        setLoading(false);
      } catch (error) {
        toast.error('Erro ao carregar horários');
      } finally {
        setLoading(false);
      }
    }

    loadHorarios();
  }, []);

  useEffect(() => {
    if (!horarioStoraged) return;

    formikHorarios.setFieldValue('gerenciador', horarioStoraged.gerenciador);
    formikHorarios.setFieldValue('hrInicio', horarioStoraged.hrInicio);
    formikHorarios.setFieldValue('hrFim', horarioStoraged.hrFim);
    formikHorarios.setFieldValue(
      'hrInicioIntervalo',
      horarioStoraged.hrInicioIntervalo,
    );
    formikHorarios.setFieldValue(
      'hrFimIntervalo',
      horarioStoraged.hrFimIntervalo,
    );
    formikHorarios.setFieldValue(
      'cdDiaSemana',
      Number(horarioStoraged.cdDiaSemana),
    );
    formikHorarios.setFieldValue('tipoJornada', horarioStoraged.tipoJornada);
    formikHorarios.setFieldValue('dtCadastro', horarioStoraged.dtCadastro);
    formikHorarios.setFieldValue(
      'dtAtualizacao',
      horarioStoraged.dtAtualizacao,
    );
    formikHorarios.setFieldValue(
      'cdUsuarioCadastro',
      horarioStoraged.cdUsuarioCadastro,
    );
    formikHorarios.setFieldValue(
      'cdUsuarioAtualizacao',
      horarioStoraged.cdUsuarioAtualizacao,
    );
  }, [modalIsOpen]);

  return {
    formikHorarios,
    loading,
    modalIsOpen,
    setIsOpen,
    closeModal,
    horarios,
    horarioStoraged,
  };
}
