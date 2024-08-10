import Terms from '@/components/signup/Terms';
import UserInfo from '@/components/signup/UserInfo';
import { SignupInfo } from '@/models/signup';
import { colors } from '@/styles/colorPalette';
import React, { useState } from 'react';
import styled from 'styled-components';

const SignupPage = () => {
  const [signupValue, setSignupValue] = useState<SignupInfo>({
    currStep: 1,
    totalStep: 2,
  });

  const handleNextPage = () => {
    setSignupValue((prevValues) => ({
      ...prevValues,
      currStep: (prevValues.currStep as number) + 1,
    }));
  };

  return (
    <SignUpPageContainer>
      {signupValue.currStep === 0 && (
        <Terms signupValue={signupValue} clickNext={handleNextPage} />
      )}
      {signupValue.currStep === 1 && (
        <UserInfo signupValue={signupValue} clickNext={handleNextPage} />
      )}
    </SignUpPageContainer>
  );
};

export default SignupPage;

const SignUpPageContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${colors.white};
`;
