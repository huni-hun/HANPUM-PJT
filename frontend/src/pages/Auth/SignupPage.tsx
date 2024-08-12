import Terms from '@/components/signup/Terms';
import UserInfo from '@/components/signup/UserInfo';
import { SignupValues } from '@/models/signup';
import { colors } from '@/styles/colorPalette';
import { useState } from 'react';
import styled from 'styled-components';

const SignupPage = () => {
  const [formValues, setFormValues] = useState<Partial<SignupValues>>({
    step: {
      currStep: 1,
      totalStep: 3,
    },
  });

  const activeClass = (step: number) => {
    if (formValues.step) {
      if (step < formValues.step.currStep) {
        return '-prev';
      } else if (step === formValues.step.currStep) {
        return '-active';
      } else {
        return '';
      }
    }
  };

  const handleInfoChange = (
    infoValue: Pick<SignupValues, 'loginId' | 'password' | 'email'>,
  ) => {
    console.log('infoValue ::', infoValue);
    // console.log('terms ::', terms);
    // setFormValues((prevValues) => ({
    //   ...prevValues,
    //   // [name]: value
    //   step: (prevValues.step as number) + 1,
    // }));
  };

  return (
    <SignUpPageContainer>
      <div className="pagenation">
        {formValues.step &&
          Array.from({ length: formValues.step.totalStep }, (_, index) => (
            <div key={index} className={`page${activeClass(index)}`} />
          ))}
      </div>
      {/* {formValues.step?.currStep === 0 && <Terms clickNext={handleNextPage} />} */}
      {formValues.step?.currStep === 0 && (
        <Terms
          clickNext={() => {
            setFormValues((prevValues) => ({
              ...prevValues,
              step: {
                currStep: (prevValues.step?.currStep || 0) + 1,
                totalStep: prevValues.step?.totalStep || 3,
              },
            }));
          }}
        />
      )}
      {formValues.step?.currStep === 1 && (
        <UserInfo clickNext={handleInfoChange} />
      )}
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
