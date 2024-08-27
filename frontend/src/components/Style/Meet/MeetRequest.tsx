import { colors } from '@/styles/colorPalette';
import styled from 'styled-components';

export const InfoWrap = styled.div`
  /* width: 100%; */
  height: 100vw;
  box-sizing: border-box;
`;

export const ProfileBox = styled.div`
  width: 100%;
  height: 30vw;
  padding: 0 3rem;
  display: flex;
  align-items: center;
  gap: 2rem;
  border-bottom: 0.1rem solid #ccc;
  box-sizing: border-box;
`;

export const Img = styled.div``;

export const Name = styled.div`
  font-size: 1.7rem;
  font-weight: 700;
`;

export const ProfileInfoDetail = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  height: 15vw;
  box-sizing: border-box;
  gap: 2rem;
`;

export const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem 3rem;
  height: 35vw;
  border-bottom: 0.1rem #ccc solid;
  box-sizing: border-box;
`;

export const ProfileInfoTitle = styled.div`
  font-size: 1.5rem;
  color: #777;
  width: 18vw;
`;
export const ProfileInfoContent = styled.div`
  font-size: 1.8rem;
`;

export const InfoInputBox = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
`;

export const InfoText = styled.div`
  font-size: 1.6rem;
  font-weight: 700;
  margin-bottom: 2rem;
`;

export const InfoInput = styled.textarea`
  height: 30vw;
  border-radius: 1.5rem;
  border: 0.1rem #ccc solid;
  padding: 2rem;

  &:focus {
    border-color: ${colors.main};
    outline: none;
  }
`;

export const ButtonWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10rem;
  gap: 2rem;
`;
