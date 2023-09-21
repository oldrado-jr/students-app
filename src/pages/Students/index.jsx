import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { get } from 'lodash';
import { FaEdit, FaUserCircle, FaWindowClose } from 'react-icons/fa';

import { Container } from '../../styles/GlobalStyles';
import axios from '../../services/axios';
import { StudentContainer, ProfilePhoto } from './styled';

export default function Students() {
  const [students, setStudents] = useState([]);

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
        {students.map((student) => (
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

            <FaEdit size={16} />
            <FaWindowClose size={16} />
          </li>
        ))}
      </StudentContainer>
    </Container>
  );
}
