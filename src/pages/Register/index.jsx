import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import isEmail from 'validator/lib/isEmail';
import { toast } from 'react-toastify';

import { Container } from '../../styles/GlobalStyles';
import Form from './styled';
import validationData from './validation-info';
import { registerRequested } from '../../store/modules/auth/actions';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!user.id) {
      return;
    }

    setName(user.nome);
    setEmail(user.email);
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setName(name.trim());

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
      !user.id &&
      (password.length < passwordValidation.min ||
        password.length > passwordValidation.max)
    ) {
      errors.push(passwordValidation.message);
    }

    const validatedPassword = password;

    if (password) {
      setPassword('');
    }

    if (errors.length > 0) {
      errors.map((error) => toast.error(error));
      return;
    }

    dispatch(
      registerRequested({
        id: user.id,
        name,
        email,
        password: validatedPassword,
      }),
    );
  };

  return (
    <Container>
      <h1>{user.id ? 'Editar dados' : 'Crie sua conta'}</h1>
      <Form onSubmit={handleSubmit}>
        <label htmlFor="name">
          Nome:
          <input
            type="text"
            id="name"
            value={name}
            placeholder="Seu nome"
            onChange={(e) => setName(e.target.value)}
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
            required={Boolean(!user.id)}
          />
        </label>
        <button type="submit">{user.id ? 'Salvar' : 'Criar conta'}</button>
      </Form>
    </Container>
  );
}
