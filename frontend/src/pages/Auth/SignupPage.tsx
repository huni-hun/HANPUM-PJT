import Header from '@/components/common/Header/Header';
import ProfileConfig from '@/components/signup/ProfileConfig';
import Terms from '@/components/signup/Terms';
import UserInfo from '@/components/signup/UserInfo';
import { IncludeStepSignupValues, SignupValues } from '@/models/signup';
import { colors } from '@/styles/colorPalette';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const SignupPage = () => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState<
    Partial<IncludeStepSignupValues>
  >({
    step: {
      currStep: 2,
      totalStep: 3,
    },
  });

  console.log(formValues);

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

  const renderPagenation = (): React.ReactNode => {
    return (
      <div className="pagenation">
        {formValues.step &&
          Array.from({ length: formValues.step.totalStep }, (_, index) => (
            <div key={index} className={`page${activeClass(index)}`} />
          ))}
      </div>
    );
  };

  return (
    <SignUpPageContainer>
      <Header
        purpose="title"
        title={
          formValues.step?.currStep === 0
            ? '약관 동의'
            : formValues.step?.currStep === 1
              ? '기본정보'
              : '프로필 설정'
        }
        clickBack={() => {
          if ((formValues.step?.currStep as number) > 0) {
            setFormValues((prevValues) => ({
              ...prevValues,
              step: {
                currStep: (prevValues.step?.currStep || 0) - 1,
                totalStep: prevValues.step?.totalStep || 3,
              },
            }));
          } else {
            navigate(-1);
          }
        }}
      />
      {formValues.step?.currStep === 0 && (
        <Terms
          pagenation={renderPagenation}
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
        <UserInfo clickNext={handleInfoChange} pagenation={renderPagenation} />
      )}
      {formValues.step?.currStep === 2 && (
        <ProfileConfig pagenation={renderPagenation} />
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
    margin-bottom: 22px;
    margin-top: 2px;

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
