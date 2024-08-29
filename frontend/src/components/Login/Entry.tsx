import Icon from '../common/Icon/Icon';
import Text from '../common/Text';

import human from '@imgs/login_human.png';
import flag from '@imgs/login_flag.png';
import logo from '@imgs/logo.png';
import Flex from '../common/Flex';

import * as S from '../Style/Login/Entry.styled';
import { Link, useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { isInitAtom } from '@/atoms/isAuthEnticatedAtom';

function Entry() {
  const navigate = useNavigate();
  const setInit = useSetRecoilState(isInitAtom);

  const handleKakaoLogin = () => {
    sessionStorage.setItem('send', 'true');
    window.location.href = `${process.env.REACT_APP_BASEURL}/oauth2/authorization/kakao`;
  };

  return (
    <S.EntryContainer>
      <img src={logo} alt="logo" className="logo" />

      <Flex direction="column" $align="center" $justify="center">
        <Text $bold={true} $typography="t16" style={{ lineHeight: '25px' }}>
          이제는 국토대장정을
        </Text>
        <Text $bold={true} $typography="t16" style={{ lineHeight: '25px' }}>
          한품과 함께해요!
        </Text>
      </Flex>
      <div className="round">
        <div className="round_bg">
          <div className="circle"></div>
          <img src={flag} alt="" className="flag_img" />
          <img src={human} alt="" className="human_img" />
          <div className="login_group">
            <div className="kakao_login" onClick={handleKakaoLogin}>
              <Icon name="IconKakaoLogo" />
              <Text $typography="t13">카카오로 시작하기</Text>
            </div>
            <div className="local_login" onClick={() => setInit(false)}>
              일반회원으로 시작하기
            </div>
          </div>
        </div>
      </div>
    </S.EntryContainer>
  );
}

export default Entry;
