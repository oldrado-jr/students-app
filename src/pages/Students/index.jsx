import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { get } from 'lodash';
import {
  FaEdit,
  FaUserCircle,
  FaWindowClose,
  FaExclamation,
} from 'react-icons/fa';

import { Container } from '../../styles/GlobalStyles';
import axios from '../../services/axios';
import { StudentContainer, ProfilePhoto } from './styled';
import { primaryColor } from '../../config/colors';

export default function Students() {
  const [students, setStudents] = useState([]);

  const handleDeleteConfirmation = (e) => {
    e.preventDefault();
    const deleteIcon = e.currentTarget;
    const exclamationIcon = deleteIcon.nextSibling;
    exclamationIcon.setAttribute('display', 'inline');
    deleteIcon.remove();
  };

  const handleDelete = async (e, id, index) => {
    e.preventDefault();

    try {
      await axios.delete(`/alunos/${id}`);
      const newStudents = [...students];
      newStudents.splice(index, 1);
      setStudents(newStudents);
    } catch (error) {
      const status = get(error, 'response.status', 0);

      if (status === 401) {
        toast.error('Você precisa fazer login!');
      } else {
        toast.error('Houve um erro ao excluir aluno!');
      }
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get('/alunos');
        setStudents(response.data);
      } catch (error) {
        toast.error(error.message);
      }
    })();
  }, []);

  return (
    <Container>
      <h1>Alunos</h1>
      <StudentContainer>
        {students.map((student, index) => (
          <li key={String(student.id)}>
            <ProfilePhoto>
              {get(student, 'Fotos[0].url', false) ? (
                <img src={student.Fotos[0].url} alt={student.nome} />
              ) : (
                <FaUserCircle size={36} />
              )}
            </ProfilePhoto>

            <span>{student.nome}</span>
            <span>{student.email}</span>

            <FaEdit size={16} color={primaryColor} cursor="pointer" />
            <FaWindowClose
              onClick={handleDeleteConfirmation}
              size={16}
              color={primaryColor}
              cursor="pointer"
            />
            <FaExclamation
              onClick={(e) => handleDelete(e, student.id, index)}
              size={16}
              color={primaryColor}
              display="none"
              cursor="pointer"
            />
          </li>
        ))}
      </StudentContainer>
    </Container>
  );
}
