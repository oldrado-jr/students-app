import React from 'react';
import { useDispatch } from 'react-redux';
import { Title, Paragrafo } from './styled';
import { Container } from '../../styles/GlobalStyles';
import { clickedButtonRequested } from '../../store/modules/example/example-slice';

function Login() {
  const dispatch = useDispatch();

  const handleClick = (e) => {
    e.preventDefault();
    dispatch({
      type: clickedButtonRequested.type,
    });
  };

  return (
    <Container>
      <Title>
        Login&nbsp;
        <small>Oie</small>
      </Title>
      <Paragrafo>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa illo porro
        fugiat odio dolore voluptate quis natus quaerat! Facere animi cupiditate
        possimus reiciendis quaerat maiores quae veniam error modi. Maxime.
      </Paragrafo>
      <button type="button" onClick={handleClick}>
        Enviar
      </button>
    </Container>
  );
}

export default Login;
