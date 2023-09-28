export default {
  firstName: {
    min: 3,
    max: 255,
    message: 'Nome deve ter entre 3 e 255 caracteres',
  },
  lastName: {
    min: 3,
    max: 255,
    message: 'Sobrenome deve ter entre 3 e 255 caracteres',
  },
  email: {
    message: 'E-mail inválido',
  },
  age: {
    min: 1,
    max: 130,
    message: 'Idade inválida',
  },
  weight: {
    min: 0,
    message: 'Peso inválido',
  },
  height: {
    min: 0,
    message: 'Altura inválida',
  },
};
