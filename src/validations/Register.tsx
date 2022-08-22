import * as yup from 'yup';

export const registerSchema = yup.object({
  nome: yup.string().required('O nome é obrigatório'),
  email: yup.string().email('Email inválido').required('Campo obrigatório'),
  password: yup
    .string()
    .required('Campo obrigatório')
    .min(6, 'A senha deve ter no mínimo 6 caracteres'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'As senhas não conferem'),
  phone: yup
    .string()
    .required('Campo obrigatório')
    .min(11, 'O telefone deve ter no mínimo 11 caracteres'),
});
