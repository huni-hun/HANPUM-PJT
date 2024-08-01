import Form from '@/components/signup/Form';
import React from 'react';
import styled from 'styled-components';

const SignupPage = () => {
  return (
    <SignUpPageContainer>
      <Form />
    </SignUpPageContainer>
  );
};

export default SignupPage;

const SignUpPageContainer = styled.div`
  width: 100vw;
  height: 100vh;
`;
