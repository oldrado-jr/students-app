export default {
  name: {
    min: 3,
    max: 255,
    message: 'Nome deve ter entre 3 e 255 caracteres',
  },
  password: {
    min: 6,
    max: 50,
    message: 'Senha deve ter entre 6 e 50 caracteres',
  },
  email: {
    message: 'E-mail inválido',
  },
};
