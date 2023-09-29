import styled from 'styled-components';
import { primaryColor } from '../../config/colors';

export const Title = styled.h1`
  text-align: center;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 30px;

  input {
    height: 40px;
    font-size: 18px;
    border: 1px solid #dddddd;
    padding: 0 10px;
    border-radius: 4px;
    margin-bottom: 20px;

    &:focus {
      border: 1px solid ${primaryColor};
    }
  }
`;

export const ProfilePicture = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 0 20px;
  margin-top: 20px;
  position: relative;

  img {
    width: min(100%, 180px);
    height: 180px;
    border-radius: 50%;
    object-fit: cover;
  }

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    position: absolute;
    bottom: 0;
    color: #ffffff;
    background: ${primaryColor};
    width: 36px;
    height: 36px;
    border-radius: 50%;
  }
`;
