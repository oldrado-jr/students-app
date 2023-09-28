import styled from 'styled-components';
import { primaryColor } from '../../config/colors';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 20px;

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

export default Form;
