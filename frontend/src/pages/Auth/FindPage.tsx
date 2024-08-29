import { FindId } from '@/api/signup/GET';
import { FindPw } from '@/api/signup/PUT';
import FindIdComponent from '@/components/Auth/FindId';
import FindPwComponent from '@/components/Auth/FindPw';
import SuccessFindLayout from '@/components/Auth/SuccessFindLayout';
import SuccessFindPage from '@/components/Auth/SuccessFindLayout';
import FixedBottomButton from '@/components/common/FixedBottomButton';
import Header from '@/components/common/Header/Header';
import Message from '@/components/common/Message';
import Text from '@/components/common/Text';
import TextField from '@/components/common/TextField/TextField';
import { STATUS } from '@/constants';
import { UserSignupFormValues } from '@/models/signup';
import { colors } from '@/styles/colorPalette';
import { AxiosError } from 'axios';
import { ChangeEvent, useMemo, useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';

function FindPage() {
  const param = useParams().account?.split(':')[1];

  const [step, setStep] = useState(0);

  const [loginId, setLoginId] = useState('');

  // console.log(param, step);

  const navigate = useNavigate();

  const { mutate: findId } = useMutation(
    ({ name, email }: { name: string; email: string }) => FindId(name, email),
    {
      onSuccess: (res) => {
        if (res.status === STATUS.success) {
          toast.success(res.message);
          setLoginId(res.data.loginId);
          setStep(1);
        }
        if (res.status === STATUS.error) {
          toast.error(res.message);
        }
      },
      onError: (error: AxiosError) => {
        toast.error(error.message);
      },
    },
  );

  const { mutate: findPw, isLoading } = useMutation(
    ({ loginId, email }: { loginId: string; email: string }) =>
      FindPw(loginId, email),
    {
      onSuccess: (res) => {
        if (res.status === STATUS.success) {
          toast.success(res.message);
          setStep(1);
        }
        if (res.status === STATUS.error) {
          toast.error(res.message);
        }
      },
      onError: (error: AxiosError) => {
        toast.error(error.message);
      },
    },
  );

  if (isLoading) {
    <div>이메일로 임시비밀번호를 보내고 있어요.</div>;
  }

  return (
    <FindPageContainer>
      <Header
        purpose="result"
        clickBack={() => {
          navigate(-1);
        }}
      />
      {param === 'id' && step === 0 && (
        <FindIdComponent param={param} findId={findId} />
      )}

      {param === 'id' && step === 1 && (
        <SuccessFindLayout loginId={loginId} setStep={setStep} />
      )}

      {param === 'pw' && step === 0 && (
        <FindPwComponent param={param} findPw={findPw} />
      )}

      {param === 'pw' && step === 1 && (
        <SuccessFindLayout loginId={loginId} setStep={setStep} />
      )}
    </FindPageContainer>
  );
}

export default FindPage;

const FindPageContainer = styled.div`
  background-color: ${colors.white};
  height: 100vh;
`;
