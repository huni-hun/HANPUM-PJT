import Header from '@/components/common/Header/Header';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import successImg from '../../assets/img/success.png';
import { colors } from '@/styles/colorPalette';
import Text from '@/components/common/Text';
import Flex from '@/components/common/Flex';
import FixedBottomButton from '../common/FixedBottomButton';
import { isInitAtom } from '@/atoms/isAuthEnticatedAtom';
import { useSetRecoilState } from 'recoil';

function SuccessFindLayout({
  loginId,
  setStep,
}: {
  loginId: string;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}) {
  const param = useParams().account?.split(':')[1];
  console.log(param);
  const navigate = useNavigate();

  const setInit = useSetRecoilState(isInitAtom);
  return (
    <SuccessFindPageContainer>
      <div className="text-container">
        <img src={successImg} alt="성공 체크" />

        <Flex direction="column" $align="center" $gap="8px">
          <Text $typography="t16" color="grey2">
            회원님의 아이디는
          </Text>
          <Text $typography="t20" $bold={true} color="main">
            {loginId}
          </Text>
        </Flex>
      </div>

      <FixedBottomButton
        size="large"
        full={false}
        label={'확인'}
        onClick={() => {
          setStep(0);
          setInit(false);
          navigate(-1);
        }}
        disabled={false}
      />
    </SuccessFindPageContainer>
  );
}

export default SuccessFindLayout;

const SuccessFindPageContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${colors.white};
  .text-container {
    margin-top: 20rem;
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
      margin-bottom: 3rem;
    }
  }
`;
