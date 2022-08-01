import * as yup from 'yup';

export const forgetPasswordSchema = yup.object({
  email: yup.string().email('Email inválido').required('Campo obrigatório'),
});

export const resetPasswordSchema = yup.object({
  password: yup
    .string()
    .required('Campo obrigatório')
    .min(6, 'Senha deve ter no mínimo 6 caracteres'),
  confirmPassword: yup
    .string()
    .required('Campo obrigatório')
    .oneOf([yup.ref('password'), null], 'Senhas não conferem'),
});
