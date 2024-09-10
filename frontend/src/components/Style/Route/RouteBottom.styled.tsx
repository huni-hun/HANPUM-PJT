import { colors } from '@/styles/colorPalette';
import styled, { keyframes } from 'styled-components';

interface BottomSheetProps {
  isNoIcon?: boolean;
}

const slideUp = keyframes`
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
`;

const slideDown = keyframes`
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(100%);
  }
`;

export const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: end;
  position: fixed;
  z-index: 99;
`;

export const BottomSheetContainer = styled.div<{ isClosing: boolean }>`
  width: 100%;
  height: 26.3rem;
  background-color: ${colors.white};
  border-radius: 1.2rem 1.2rem 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${({ isClosing }) => (isClosing ? slideDown : slideUp)} 0.3s
    ease-out;
  cursor: pointer;
`;

export const BottomSheetContentBox = styled.div`
  width: 90%;
  height: 80%;
  display: flex;
  flex-direction: column;
`;

export const BottomSheetHeader = styled.div`
  width: 100%;
  height: 15%;
  display: flex;
  flex-direction: row;
  position: relative;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: bold;
  cursor: pointer;
`;

export const HeaderIconBox = styled.div`
  width: 5%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 0;
  font-weight: normal;
`;

export const BottomSheetMain = styled.div`
  width: 100%;
  height: 85%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 2rem;
  margin-top: 2rem;
`;

export const SortingTyepBox = styled.div`
  width: 100%;
  height: 1.5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const SortingTyep = styled.p<{ selected: boolean }>`
  font-size: 1.4rem;
  color: ${(props) => (props.selected ? colors.main : colors.black)};
`;

export const SettingBox = styled.div`
  width: 100%;
  height: 3rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  /* justify-content: space-between; */
`;

export const SettingIconBox = styled.div<BottomSheetProps>`
  width: ${(props) => (props.isNoIcon ? '0%' : '10%')};
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: left;
  cursor: pointer;
`;

export const SettingTextBox = styled.div<{ isDelete: boolean }>`
  width: 90%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 1.4rem;
  /* justify-content: space-between; */
  color: ${(props) => (props.isDelete ? colors.red : colors.black)};
  cursor: pointer;
`;

export const SwitchInput = styled.input`
  height: 0;
  width: 0;
  visibility: hidden;
`;

export const SwitchLabel = styled.label<{ $isOpen: boolean }>`
  display: flex;
  position: relative;
  width: 7.5rem;
  height: 3.1rem;
  border-radius: 10rem 10rem 10rem 10rem;
  background-color: ${({ $isOpen }) => ($isOpen ? '#1A823B' : '#d9d9d9')};
  align-items: center;
  transition: background-color 0.5s;
`;

export const SwitchButton = styled.span<{ $isOpen: boolean }>`
  width: 2.7rem;
  height: 2.7rem;
  background-color: #ffffff;
  position: absolute;
  border-radius: 50%;
  left: 0.2rem;
  transition: all 0.5s ease-in-out;
  ${({ $isOpen }) =>
    $isOpen ? 'transform: translateX(2.4rem)' : 'transform: translateX(0.2rem)'}
`;
