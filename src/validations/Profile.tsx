import * as yup from 'yup';

export const profileSchema = yup.object({
  nome: yup.string().required('O nome é obrigatório'),
  email: yup.string().email('Email inválido').required('Campo obrigatório'),
  password: yup.string(),
  newPassword: yup
    .string()
    .when('password', (password, field) =>
      password ? field.required('Campo obrigatório') : field,
    )
    .typeError('Senha inválida'),
  confirmPassword: yup
    .string()
    .when('newPassword', (newPassword, field) =>
      newPassword
        ? field
            .required('Campo obrigatório')
            .oneOf([yup.ref('newPassword')], 'Senhas não conferem')
        : field,
    )
    .typeError('Senha inválida'),
});
