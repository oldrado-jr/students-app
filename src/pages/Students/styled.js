import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const StudentContainer = styled.ul`
  margin-top: 20px;

  li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px 0;
  }

  li + li {
    border-top: 1px solid #eeeeee;
  }
`;

export const ProfilePhoto = styled.div`
  img {
    width: 36px;
    height: 36px;
    border-radius: 50%;
  }
`;

export const NewStudent = styled(Link)`
  display: block;
  padding: 20px 0 10px 0;
`;
