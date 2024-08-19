import Icon from '../common/Icon/Icon';
import Text from '../common/Text';

import human from '@imgs/login_human.png';
import flag from '@imgs/login_flag.png';
import logo from '@imgs/logo.png';
import Flex from '../common/Flex';

import * as S from '../Style/Login/Entry.styled';
import { Dispatch, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';

function Entry({ setInit }: { setInit: Dispatch<SetStateAction<boolean>> }) {
  const navigate = useNavigate();
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
            <div className="kakao_login">
              <Icon name="IconKakaoLogo" />
              <span>카카오로 시작하기</span>
            </div>
            <div
              className="local_login"
              onClick={() => {
                setInit(false);
              }}
            >
              일반회원으로 시작하기
            </div>
            <div className="login_group-find">
              <Text
                $typography="t12"
                onClick={() => {
                  navigate('/find/:id');
                }}
              >
                아이디 찾기
              </Text>
              <Text
                $typography="t12"
                onClick={() => {
                  navigate('/find/:pw');
                }}
              >
                비밀번호 찾기
              </Text>
            </div>
          </div>
        </div>
      </div>
    </S.EntryContainer>
  );
}

export default Entry;
