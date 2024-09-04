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
import { useQuery } from 'react-query';
import { GetUser } from '@/api/mypage/GET';
import { STATUS } from '@/constants';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';

function SuccessFindLayout({
  loginId,
  setStep,
}: {
  loginId: string;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}) {
  const param = useParams().account?.split(':')[1];
  // console.log(param);
  const navigate = useNavigate();

  const setInit = useSetRecoilState(isInitAtom);

  const name = sessionStorage.getItem('name');

  return (
    <SuccessFindPageContainer>
      {param === 'pw' && (
        <div className="text-container">
          <img src={successImg} alt="성공 체크" />
          <Flex direction="column" $align="center" $gap="8px">
            <Text $typography="t20" $bold={true} color="main">
              비밀번호 변경 완료!
            </Text>
          </Flex>
        </div>
      )}

      {param === 'id' && (
        <div className="text-container-id">
          <Text $typography="t20" $bold={true}>
            아이디 확인
          </Text>
          <p>
            {name}님의 아이디는
            <Text
              $typography="t16"
              $bold={true}
              color="main"
              style={{ margin: '0 4px' }}
            >
              {loginId}
            </Text>
            입니다.
          </p>
        </div>
      )}

      <FixedBottomButton
        size="large"
        full={false}
        label={'확인'}
        onClick={() => {
          setStep(0);
          setInit(false);
          navigate(-1);
          sessionStorage.removeItem('name');
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

  .text-container-id {
    padding: 16px 24px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    p {
      font-size: 1.6rem;
    }
  }
`;
