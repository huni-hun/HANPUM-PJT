import styled from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99999;
`;

export const ModalContainer = styled.div`
  width: 70vw;
  max-width: 500px;
  height: auto;
  max-height: 60vh;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -120%);
  background-color: white;
  padding: 2rem;
  border-radius: 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  text-align: center;
  overflow: auto;
`;

export const IconContainer = styled.div`
  margin-bottom: 3rem;

  img {
    width: 15vw;
    max-width: 100px;
  }
`;

export const Title = styled.p`
  font-size: 1.8rem;
  margin-bottom: 1rem;
  font-weight: 700;
`;

export const Content = styled.p`
  font-size: 1.2rem;
  margin-bottom: 4rem;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
`;
export const CancelButton = styled.button`
  background-color: #ccc;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  flex: 1;
  margin-right: 1rem;

  &:hover {
    background-color: #aaa;
  }
`;

export const ConfirmButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  flex: 1;

  &:hover {
    background-color: #0056b3;
  }
`;
