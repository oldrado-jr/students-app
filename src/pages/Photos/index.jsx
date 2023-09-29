import React, { useEffect, useState } from 'react';
import { get } from 'lodash';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { Container } from '../../styles/GlobalStyles';
import { Form, Title } from './styled';
import axios from '../../services/axios';
import history from '../../services/history';
import { loginFailed } from '../../store/modules/auth/actions';

export default function Photos({ match }) {
  const id = get(match, 'params.id', 0);
  const [photo, setPhoto] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    if (!id) {
      return;
    }

    (async () => {
      try {
        const { data } = await axios.get(`/alunos/${id}`);
        setPhoto(get(data, 'Fotos[0].url', ''));
      } catch (error) {
        toast.error('Erro ao obter imagem!');
        history.push('/');
      }
    })();
  }, [id]);

  const handleChange = async (e) => {
    const newPhoto = get(e, 'target.files[0]', {});
    const newPhotoURL = URL.createObjectURL(newPhoto);
    setPhoto(newPhotoURL);

    const formData = new FormData();
    formData.append('aluno_id', id);
    formData.append('foto', newPhoto);

    try {
      await axios.post('/fotos', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Foto atualizada com sucesso!');
    } catch (error) {
      const status = get(error, 'response.status', 0);
      toast.error('Erro ao enviar foto!');

      if (status === 401) {
        dispatch(loginFailed());
      }
    }
  };

  return (
    <Container>
      <Title>Fotos</Title>
      <Form>
        <label htmlFor="foto">
          {photo ? <img src={photo} alt="Foto" /> : 'Selecionar'}
          <input type="file" id="foto" onChange={handleChange} />
        </label>
      </Form>
    </Container>
  );
}

Photos.propTypes = {
  match: PropTypes.shape({}).isRequired,
};
