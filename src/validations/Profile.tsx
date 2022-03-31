import * as yup from 'yup';

export const profileSchema = yup.object({
  nome: yup.string().required('O nome é obrigatório'),
  email: yup.string().email('Email inválido').required('Campo obrigatório'),
  password: yup.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
  newPassword: yup.string().when('password', {
    is: (val: string | any[]) => !!val.length,
    then: yup.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
    otherwise: yup.string(),
  }),
  confirmPassword: yup.string().when('newPassword', {
    is: (val: string | any[]) => !!val.length,
    then: yup.string().oneOf([yup.ref('newPassword')], 'As senhas não conferem'),
    otherwise: yup.string(),
  }),
});
