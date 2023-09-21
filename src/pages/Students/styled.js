import styled from 'styled-components';

export const StudentContainer = styled.ul`
  margin-top: 20px;

  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px 0;
  }

  div + div {
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
