import styled from 'styled-components';
import Dimmed from './Modal/Dimmed';
import Icon from './Icon/Icon';
import { colors } from '@/styles/colorPalette';

function Loading() {
  return (
    <Dimmed>
      <LoadingContainer>
        {/* <Icon name="IconLoading" width={35} height={17.5} /> */}
        <Spinner />
      </LoadingContainer>
    </Dimmed>
  );
}

export default Loading;

const LoadingContainer = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  z-index: 15;
`;

const Spinner = styled.div`
  width: 35px;
  height: 35px;
  border: 4px solid ${colors.grey5};
  border-top: 4px solid;
  border-left: 4px solid;
  border-radius: 50%;
  transform: rotate(45deg);
  /* animation: spin 0.7s linear infinite; */

  @keyframes spin {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
