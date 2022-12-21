import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useFormik } from 'formik';
import { GetJornadaUsuario } from 'types/ServicesProps';

import { useToast } from 'contexts/Toast';

import { getJourneyByIdAWS } from 'services/get';
import { postJourneysAWS } from 'services/post';

import { useAuth } from './useAuth';

export function useHorarios() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { storagedUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [horarios, setHorarios] = useState<GetJornadaUsuario[]>([]);
  const [modalIsOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

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

        navigate(0);
      } catch (error) {
        toast.error('Erro ao atualizar horários');
      } finally {
        setLoading(false);
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

  return {
    formikHorarios,
    loading,
    modalIsOpen,
    setIsOpen,
    closeModal,
    customStyles,
    horarios,
  };
}
