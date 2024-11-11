import styled from 'styled-components';
import logoImg from '@imgs/splash_logo.png';
import Text from '../common/Text';

function Splash() {
  return (
    <SplashContainer>
      <div className="img-box">
        <img src={logoImg} alt="" />
        <Text color="main" style={{ fontSize: '45px' }}>
          한품
        </Text>
      </div>
    </SplashContainer>
  );
}

export default Splash;

const SplashContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  background-color: #fff;
  justify-content: center;
  align-items: center;

  .img-box {
    display: flex;
    align-items: center;
    position: relative;
    transform: translateX(50px);
    animation: move-logo 1s ease forwards;

    img {
      width: 73px;
      height: 73px;
    }

    span {
      opacity: 0;
      margin-left: 10px;
      animation: fade-in 1.5s ease forwards;
      animation-delay: 1s;
    }
  }

  @keyframes move-logo {
    0% {
      transform: translateX(50px);
    }
    100% {
      transform: translateX(0px);
    }
  }

  @keyframes fade-in {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;
