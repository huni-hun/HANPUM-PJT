import { colors } from '@/styles/colorPalette';
import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.45);
  position: fixed;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalCard = styled.div`
  width: 28.7rem;
  height: 48.5rem;
  border-radius: 1.2rem;
  background-color: ${colors.white};
  padding: 2rem 2rem 2rem 2rem;
`;

export const ModalHeader = styled.div`
  width: 100%;
  height: 3.1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: bold;
  position: relative;
  margin-bottom: 1.6rem;
`;

export const CloseBox = styled.div`
  width: 2rem;
  height: 100%;
  position: absolute;
  left: 0;
`;

export const RatingBox = styled.div`
  width: 100%;
  height: 7rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2.4rem;
`;

export const RatingText = styled.div`
  width: 100%;
  height: 10%;
  font-size: 1.2rem;
  font-weight: bold;
  color: ${colors.grey2};
  display: flex;
`;

export const Rating = styled.div`
  width: 100%;
  height: 90%;
  display: flex;
  align-items: end;
  justify-content: center;
`;

export const ReviewWriteBox = styled.div`
  width: 100%;
  height: 24.1rem;
  display: column;
  align-items: center;
  margin-bottom: 2.4rem;
`;

export const ReviewTitle = styled.div`
  width: 100%;
  height: 1.7rem;
  font-size: 1.2rem;
  font-weight: bold;
  color: ${colors.grey2};
  margin-bottom: 0.4rem;
`;

export const ReviewWrite = styled.textarea`
  width: 25.5rem;
  height: 22rem;
  border-radius: 1.2rem;
  border: 0.2rem solid ${colors.grey3};
  padding: 1.6rem 1.6rem 1.6rem 1.6rem;
  outline-color: ${colors.main};
`;

export const BtnBox = styled.div`
  width: 100%;
  height: 10rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;
