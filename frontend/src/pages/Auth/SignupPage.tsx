import Terms from '@/components/signup/Terms';
import UserInfo from '@/components/signup/UserInfo';
import { SignFormValues, SignupInfo } from '@/models/signup';
import { colors } from '@/styles/colorPalette';
import { useState } from 'react';
import styled from 'styled-components';

const SignupPage = () => {
  const [signupValue, setSignupValue] = useState<SignupInfo>({
    currStep: 1,
    totalStep: 3,
  });

  const [formValues, setFormValues] = useState<SignFormValues>({
    id: '',
    password: '',
    name: '',
    gender: '',
    birth: '',
    email: '',
    address: '',
    tel: '',
    agreement: true,
    nickname: '',
  });

  const handleNextPage = () => {
    setSignupValue((prevValues) => ({
      ...prevValues,
      currStep: (prevValues.currStep as number) + 1,
    }));
  };

  const activeClass = (step: number) => {
    if (step < signupValue.currStep) {
      return '-prev';
    } else if (step === signupValue.currStep) {
      return '-active';
    } else {
      return '';
    }
    // return step === signupValue.currStep ? '-active' : '';
  };

  return (
    <SignUpPageContainer>
      <div className="pagenation">
        {Array.from({ length: signupValue.totalStep }, (_, index) => (
          <div key={index} className={`page${activeClass(index)}`} />
        ))}
      </div>
      {signupValue.currStep === 0 && <Terms clickNext={handleNextPage} />}
      {signupValue.currStep === 1 && <UserInfo clickNext={handleNextPage} />}
    </SignUpPageContainer>
  );
};

export default SignupPage;

const SignUpPageContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${colors.white};

  .pagenation {
    display: flex;
    gap: 3px;
    padding-left: 24px;
    margin-bottom: 22px;

    .page {
      width: 0.5rem;
      height: 0.5rem;
      border-radius: 50%;
      background-color: ${colors.grey2};
    }
    .page-active {
      width: 1.3rem;
      height: 0.5rem;
      border-radius: 100px;
      background-color: ${colors.red};
    }
    .page-prev {
      width: 0.5rem;
      height: 0.5rem;
      border-radius: 50%;
      background-color: ${colors.main};
    }
  }
`;
