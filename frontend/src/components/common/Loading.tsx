import styled from 'styled-components';
import Dimmed from './Modal/Dimmed';
import Icon from './Icon/Icon';
import { colors } from '@/styles/colorPalette';

function Loading() {
  return (
    <Dimmed>
      <LoadingContainer>
        <div className="spinner-box">
          <Icon
            name="IconLoading"
            width={35}
            height={17.5}
            style={{ opacity: '0' }}
          />
          <Icon name="IconLoading" width={35} height={17.5} />
        </div>
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
  .spinner-box {
    width: 35px;
    height: 34px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    animation: spin 0.8s linear infinite;

    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  }
`;
