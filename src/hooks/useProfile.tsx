import { useEffect, useState } from 'react';

import { useFormik } from 'formik';
import { profileSchema } from 'validations/Profile';

import { useToast } from 'contexts/Toast';

import { useAuth } from 'hooks/useAuth';

import { getSearchPhotoByHashAWS, getSearchPhotoByIdAWS } from 'services/get';
import { postFotosAWS } from 'services/post';
import { putFotosAWS, putUserAWS } from 'services/update';

export function useProfile() {
  const { toast } = useToast();
  const { user, setUser, setProfileAvatar, avatar } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const userStorage = JSON.parse(localStorage.getItem('@rasg:user') || '{}');

  function showNewPassword() {
    setShowPassword(!showPassword);
  }

  const formikProfile = useFormik({
    initialValues: {
      avatar: '',
      nome: '',
      email: '',
      password: '',
      newPassword: '',
      confirmPassword: '',
      phone: '',
    },
    validationSchema: profileSchema,
    onSubmit: async (values) => {
      if (!user) return;

      const newValues = {
        cdUsuario: Number(user.cdUsuario),
        nmUsuario: values.nome,
        nmSenha: user.nmSenha,
        nmEmail: values.email,
        nmTelefone: values.phone,
        dtCadastro: user.dtCadastro,
        situacaoUsuario: user.situacaoUsuario,
        tipoUsuario: user.tipoUsuario,
        flTermo: 'S',
      };

      try {
        setLoading(true);

        const { data } = await putUserAWS(newValues);

        if (!data) return;

        if (formikProfile.values.email !== data.nmEmail) {
          toast.success(
            'Verifique a sua caixa de entrada para confirmar a mudança de email',
            { id: 'toast' },
          );
          setLoading(false);
        } else {
          toast.success('Perfil atualizado com sucesso', { id: 'toast' });
          setLoading(false);
          setUser(data);
          formikProfile.setFieldValue('password', '');
          formikProfile.setFieldValue('newPassword', '');
          formikProfile.setFieldValue('confirmPassword', '');
        }

        if (!avatar) {
          const formData = new FormData();

          formData.append('mlArquivo', values.avatar);
          formData.append('cdUsuario', String(user.cdUsuario));

          await postFotosAWS(formData);
        }
      } catch (error) {
        toast.error('Não foi possível atualizar perfil', { id: 'toast' });
      } finally {
        setLoading(false);
      }
    },
  });

  async function putPhotoServices(file: File) {
    setLoading(true);
    try {
      const formData = new FormData();

      const { cdFotoUsuario } = JSON.parse(
        localStorage.getItem('@rasg:picture') || '{}',
      );

      formData.append('mlArquivo', file);
      formData.append('cdUsuario', String(user?.cdUsuario));

      const { status } = await putFotosAWS(formData, cdFotoUsuario);

      if (status === 200) {
        toast.success('Foto atualizada com sucesso!', { id: 'toast' });
      }
    } catch (error) {
      toast.error('Erro ao atualizar foto!', { id: 'toast' });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    async function getPhoto() {
      const { data } = await getSearchPhotoByIdAWS(String(user?.cdUsuario));

      localStorage.setItem('@rasg:picture', JSON.stringify(data[0]));

      const { nmHash, nmMime } = data[0];

      const { data: photo } = await getSearchPhotoByHashAWS(nmHash);

      const photoURI = `data:${nmMime};base64,${photo}`;

      setProfileAvatar(photoURI);

      localStorage.setItem('@rasg:avatar', photoURI);

      formikProfile.setFieldValue('avatar', photoURI);
    }

    getPhoto();
  }, [user]);

  useEffect(() => {
    formikProfile.setFieldValue(
      'nome',
      user?.nmUsuario || userStorage?.nmUsuario,
    );
    formikProfile.setFieldValue('email', user?.nmEmail || userStorage?.nmEmail);
    formikProfile.setFieldValue(
      'phone',
      user?.nmTelefone || userStorage?.nmTelefone,
    );
  }, [user]);

  return {
    formikProfile,
    loading,
    showNewPassword,
    showPassword,
    putPhotoServices,
  };
}
