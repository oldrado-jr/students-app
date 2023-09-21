import styled from 'styled-components';
import { primaryColor } from '../../config/colors';

const Nav = styled.nav`
  background: ${primaryColor};
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;

  a {
    color: #ffffff;
    font-weight: bold;
  }
`;

export default Nav;
