import styled from 'styled-components';
import { primaryColor } from '../../config/colors';

export const Title = styled.h1`
  text-align: center;
`;

export const Form = styled.form`
  label {
    width: min(100%, 180px);
    height: 180px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #eeeeee;
    border: 5px dashed ${primaryColor};
    margin: 30px auto;
    cursor: pointer;
    border-radius: 50%;
    overflow: hidden;

    img {
      width: inherit;
      height: inherit;
      object-fit: cover;
    }
  }

  input {
    display: none;
  }
`;
