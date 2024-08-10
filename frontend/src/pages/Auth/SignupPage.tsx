import Form from '@/components/signup/Form';
import Terms from '@/components/signup/Terms';
import { signupInfo } from '@/models/signup';
import { colors } from '@/styles/colorPalette';
import React, { useState } from 'react';
import styled from 'styled-components';

const SignupPage = () => {
  const [signupValue, setSignupValue] = useState<signupInfo>({
    currStep: 0,
    totalStep: 2,
  });

  console.log(signupValue);

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
    </SignUpPageContainer>
  );
};

export default SignupPage;

const SignUpPageContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${colors.white};
`;
