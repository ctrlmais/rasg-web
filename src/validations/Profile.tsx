import * as yup from 'yup';

export const profileSchema = yup.object({
  nome: yup.string().required('O nome é obrigatório'),
  email: yup.string().email('Email inválido').required('Campo obrigatório'),
  senha: yup.string().required('Campo obrigatório'),
  novaSenha: yup.string().required('Campo obrigatório'),
  confirmarSenha: yup.string().oneOf([yup.ref('novaSenha'), null], 'As senhas não conferem'),
});
