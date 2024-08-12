import Terms from '@/components/signup/Terms';
import UserInfo from '@/components/signup/UserInfo';
import { IncludeStepSignupValues, SignupValues } from '@/models/signup';
import { colors } from '@/styles/colorPalette';
import { useState } from 'react';
import styled from 'styled-components';

const SignupPage = () => {
  const [formValues, setFormValues] = useState<
    Partial<IncludeStepSignupValues>
  >({
    step: {
      currStep: 1,
      totalStep: 3,
    },
  });

  console.log(formValues);

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

  const handleInfoChange = (infoValue: Partial<SignupValues>) => {
    console.log('infoValue ::', infoValue);
    setFormValues((prevValues) => ({
      ...prevValues,
      ...infoValue,
      step: {
        currStep: (prevValues.step?.currStep || 0) + 1,
        totalStep: prevValues.step?.totalStep || 3,
      },
    }));
  };

  return (
    <SignUpPageContainer>
      <div className="pagenation">
        {formValues.step &&
          Array.from({ length: formValues.step.totalStep }, (_, index) => (
            <div key={index} className={`page${activeClass(index)}`} />
          ))}
      </div>
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
      {formValues.step?.currStep === 2 && <div>3번째</div>}
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
