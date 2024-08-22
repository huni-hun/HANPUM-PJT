import finishImg from '@imgs/signup_finished.png';
import Flex from '../common/Flex';
import Text from '../common/Text';
import FixedBottomButton from '../common/FixedBottomButton';
import * as S from '../Style/Signup/Finish.styled';
import { useSetRecoilState } from 'recoil';
import { signupStepAtom } from '@/atoms/signupStepAtom';
import { useNavigate } from 'react-router-dom';

function Finish({ nickname }: { nickname: string }) {
  const setStep = useSetRecoilState(signupStepAtom);
  const navigate = useNavigate();
  return (
    <S.FinishContainer>
      <img src={finishImg} alt="" />

      <Flex $justify="center" direction="column" $align="center">
        <Text $typography="t20" $bold={true}>
          {nickname}님
        </Text>
        <p>
          <span>한품</span> 가입을 완료했어요
        </p>
      </Flex>

      <FixedBottomButton
        label="시작하기"
        onClick={() => {
          navigate('/login');
          setStep((prevStep) => ({
            ...prevStep,
            currStep: 0,
          }));
        }}
      />
    </S.FinishContainer>
  );
}

export default Finish;
