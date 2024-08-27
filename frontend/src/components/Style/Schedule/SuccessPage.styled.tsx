import styled from 'styled-components';

export const SuccessContainer = styled.div`
  background-color: #fff;
  height: 100%;
`;

export const SuccessWrap = styled.p`
  font-size: 2rem;
  font-weight: bold;
  margin-top: 10rem;
  margin-bottom: 10rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  span {
    display: flex;
    text-align: center;
    gap: 2rem;
  }
  :nth-child(2) {
    margin: 3rem 0rem 1rem 0rem;
  }
`;
