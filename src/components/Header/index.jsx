import React from 'react';
import { FaHome, FaSignInAlt, FaUserAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Nav from './styled';

function Header() {
  const clickedButton = useSelector((state) => state.example.clickedButton);

  return (
    <Nav>
      <Link to="/">
        <FaHome size={24} />
      </Link>
      <Link to="/login">
        <FaUserAlt size={24} />
      </Link>
      <Link to="/teste">
        <FaSignInAlt size={24} />
      </Link>
      {clickedButton ? 'Clicado' : 'Não clicado'}
    </Nav>
  );
}

export default Header;
