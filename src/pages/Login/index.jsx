import React, { useState } from 'react';
import isEmail from 'validator/lib/isEmail';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { get } from 'lodash';

import { Container } from '../../styles/GlobalStyles';
import Form from './styled';
import validationData from './validation-info';
import { loginRequested } from '../../store/modules/auth/actions';

export default function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const prevPath = get(props, 'location.state.prevPath', '/');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = [];

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

    dispatch(loginRequested({ email, password: validatedPassword, prevPath }));
  };

  return (
    <Container>
      <h1>Login</h1>

      <Form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value.trim())}
          required
        />
        <input
          type="password"
          placeholder="Sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value.trim())}
          required
        />
        <button type="submit">Acessar</button>
      </Form>
    </Container>
  );
}
