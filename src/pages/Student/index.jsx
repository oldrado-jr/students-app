import React, { useEffect, useState } from 'react';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import { isEmail, isInt, isFloat } from 'validator';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { FaUserCircle, FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import { Container } from '../../styles/GlobalStyles';
import { Form, ProfilePicture, Title } from './styled';
import validationData from './validation-info';
import axios from '../../services/axios';
import history from '../../services/history';
import { loginFailed } from '../../store/modules/auth/actions';

export default function Student({ match }) {
  const id = get(match, 'params.id', 0);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [photo, setPhoto] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    if (!id) {
      return;
    }

    (async () => {
      try {
        const { data } = await axios.get(`/alunos/${id}`);
        const foto = get(data, 'Fotos[0].url', '');

        setFirstName(data.nome);
        setLastName(data.sobrenome);
        setEmail(data.email);
        setAge(data.idade);
        setWeight(data.peso);
        setHeight(data.altura);
        setPhoto(foto);
      } catch (error) {
        const status = get(error, 'response.status', 0);
        const errorsApi = get(error, 'response.data.errors', []);

        if (status === 400) {
          errorsApi.map((err) => toast.error(err));
        }

        history.push('/');
      }
    })();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = [];

    const firstNameValidation = validationData.firstName;

    setFirstName(firstName.trim());

    if (
      firstName.length < firstNameValidation.min ||
      firstName.length > firstNameValidation.max
    ) {
      errors.push(firstNameValidation.message);
    }

    const lastNameValidation = validationData.lastName;

    setLastName(lastName.trim());

    if (
      lastName.length < lastNameValidation.min ||
      lastName.length > lastNameValidation.max
    ) {
      errors.push(lastNameValidation.message);
    }

    const emailValidation = validationData.email;

    if (!isEmail(email)) {
      errors.push(emailValidation.message);
    }

    const ageValidation = validationData.age;

    if (
      !isInt(String(age)) ||
      age < ageValidation.min ||
      age > ageValidation.max
    ) {
      errors.push(ageValidation.message);
    }

    const weightValidation = validationData.weight;

    if (!isFloat(String(weight)) || weight < weightValidation.min) {
      errors.push(weightValidation.message);
    }

    const heightValidation = validationData.height;

    if (!isFloat(String(height)) || height < heightValidation.min) {
      errors.push(heightValidation.message);
    }

    if (errors.length > 0) {
      errors.map((error) => toast.error(error));
      return;
    }

    const payload = {
      nome: firstName,
      sobrenome: lastName,
      email,
      idade: age,
      peso: weight,
      altura: height,
    };

    try {
      if (id) {
        await axios.put(`/alunos/${id}`, payload);
        toast.success('Aluno(a) editado(a) com sucesso!');
      } else {
        const { data } = await axios.post('/alunos', payload);
        toast.success('Aluno(a) criado(a) com sucesso!');
        history.push(`/student/${data.id}`);
      }
    } catch (error) {
      const status = get(error, 'response.status', 0);
      const errorsApi = get(error, 'response.data.errors', []);

      if (errorsApi.length > 0) {
        errorsApi.map((err) => toast.error(err));
      } else {
        toast.error('Erro desconhecido!');
      }

      if (status === 401) {
        dispatch(loginFailed());
      }
    }
  };

  return (
    <Container>
      <Title>{id ? 'Editar Aluno' : 'Novo Aluno'}</Title>
      {id > 0 && (
        <ProfilePicture>
          {photo ? (
            <img src={photo} alt={firstName} />
          ) : (
            <FaUserCircle size={180} />
          )}
          <Link to={`/student/${id}/photos`}>
            <FaEdit size={24} />
          </Link>
        </ProfilePicture>
      )}
      <Form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Seu nome"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Seu sobrenome"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Seu email"
          value={email}
          onChange={(e) => setEmail(e.target.value.trim())}
          required
        />
        <input
          type="number"
          placeholder="Sua idade"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Seu peso"
          value={weight}
          onChange={(e) => setWeight(e.target.value.trim())}
          required
        />
        <input
          type="text"
          placeholder="Sua altura"
          value={height}
          onChange={(e) => setHeight(e.target.value.trim())}
          required
        />
        <button type="submit">Enviar</button>
      </Form>
    </Container>
  );
}

Student.propTypes = {
  match: PropTypes.shape({}).isRequired,
};
