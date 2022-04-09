import * as yup from 'yup';

export const loginSchema = yup.object({
  email: yup.string().email('Email inválido').required(''),
  senha: yup.string().required('Campo obrigatório'),
});
