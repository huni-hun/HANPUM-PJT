import Form from '@/components/signup/Form';
import Terms from '@/components/signup/Terms';
import { signupInfo } from '@/models/signup';
import React, { useState } from 'react';
import styled from 'styled-components';

const SignupPage = () => {
  const [signupValue, setSignupValue] = useState<signupInfo>({
    currStep: 0,
    totalStep: 2,
  });

  return (
    <SignUpPageContainer>
      {signupValue.currStep === 0 && <Terms signupValue={signupValue} />}
    </SignUpPageContainer>
  );
};

export default SignupPage;

const SignUpPageContainer = styled.div`
  width: 100vw;
  height: 100vh;
`;
