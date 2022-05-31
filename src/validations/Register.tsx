import * as yup from 'yup';

export const registerSchema = yup.object({
  nome: yup.string().required('O nome é obrigatório'),
  email: yup.string().email('Email inválido').required('Campo obrigatório'),
  senha: yup
    .string()
    .required('Campo obrigatório')
    .min(6, 'A senha deve ter no mínimo 6 caracteres'),
  confirmarSenha: yup
    .string()
    .oneOf([yup.ref('senha'), null], 'As senhas não conferem'),
});
