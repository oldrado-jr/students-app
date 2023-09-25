import React, { useState } from 'react';
import isEmail from 'validator/lib/isEmail';
import { toast } from 'react-toastify';
import { get } from 'lodash';

import { Container } from '../../styles/GlobalStyles';
import Form from './styled';
import validationData from './validation-info';
import axios from '../../services/axios';
import history from '../../services/history';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = [];

    const nameValidation = validationData.name;

    if (name.length < nameValidation.min || name.length > nameValidation.max) {
      errors.push(nameValidation.message);
    }

    const emailValidation = validationData.email;

    if (!isEmail(email)) {
      errors.push(emailValidation.message);
    }

    const passwordValidation = validationData.password;

    if (
      password.length < passwordValidation.min ||
      password.length > passwordValidation.max
    ) {
      errors.push(passwordValidation.message);
    }

    const validatedPassword = password;
    setPassword('');

    if (errors.length > 0) {
      errors.map((error) => toast.error(error));
      return;
    }

    try {
      await axios.post('/users', {
        nome: name,
        email,
        password: validatedPassword,
      });
      toast.success('Você fez seu cadastro!');
      history.push('/login');
    } catch (error) {
      const errorsApi = get(error, 'response.data.erros', []);
      errorsApi.map((err) => toast.error(err));
    }
  };

  return (
    <Container>
      <h1>Crie sua conta</h1>
      <Form onSubmit={handleSubmit}>
        <label htmlFor="name">
          Nome:
          <input
            type="text"
            id="name"
            value={name}
            placeholder="Seu nome"
            onChange={(e) => setName(e.target.value.trim())}
            required
          />
        </label>
        <label htmlFor="email">
          E-mail:
          <input
            type="email"
            id="email"
            value={email}
            placeholder="Seu e-mail"
            onChange={(e) => setEmail(e.target.value.trim())}
            required
          />
        </label>
        <label htmlFor="password">
          Senha:
          <input
            type="password"
            id="password"
            value={password}
            placeholder="Sua senha"
            onChange={(e) => setPassword(e.target.value.trim())}
            required
          />
        </label>
        <button type="submit">Criar minha conta</button>
      </Form>
    </Container>
  );
}
