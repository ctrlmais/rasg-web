import * as yup from 'yup';

export const forgetPasswordSchema = yup.object({
  email: yup.string().email('Email inválido').required('Campo obrigatório'),
});

export const resetPasswordSchema = yup.object({
  senha: yup.string().required('Campo obrigatório').min(6, 'Senha deve ter no mínimo 6 caracteres'),
  confirmarSenha: yup
    .string()
    .required('Campo obrigatório')
    .oneOf([yup.ref('senha'), null], 'Senhas não conferem'),
});
