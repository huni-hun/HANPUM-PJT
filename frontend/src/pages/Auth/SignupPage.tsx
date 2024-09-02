import { signupStepAtom } from '@/atoms/signupStepAtom';
import Header from '@/components/common/Header/Header';
import Finish from '@/components/Signup/Finish';
import ProfileConfig from '@/components/Signup/ProfileConfig';
import Terms from '@/components/Signup/Terms';
import UserInfo from '@/components/Signup/UserInfo';

import { UserSignupFormValues } from '@/models/signup';
import { colors } from '@/styles/colorPalette';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

const SignupPage = () => {
  const [step, setStep] = useRecoilState(signupStepAtom);

  const navigate = useNavigate();

  // 최상단에서 data관리
  const [formValues, setFormValues] = useState<Partial<UserSignupFormValues>>({
    gender: null,
    multipartFile: '',
    birthDate: '',
    nickname: '',
    // phoneNumber: '',
  });

  // pagenation 현재, 이전, 다음 style 분기 함수
  const activeClass = (paramStep: number) => {
    if (paramStep < step.currStep) {
      return '-prev';
    } else if (paramStep === step.currStep) {
      return '-active';
    } else {
      return '';
    }
  };

  const clickNext = () => {
    setStep((prevStep) => ({
      ...prevStep,
      currStep: prevStep.currStep + 1,
    }));
  };

  const renderPagenation = (): React.ReactNode => {
    return (
      <div className="pagenation">
        {Array.from({ length: step.totalStep }, (_, index) => (
          <div key={index} className={`page${activeClass(index)}`} />
        ))}
      </div>
    );
  };

  // // 스크롤 최상단으로 보내기
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step.currStep]);

  return (
    <SignUpPageContainer>
      <Header
        purpose="title"
        title={(() => {
          switch (step.currStep) {
            case 0:
              return '약관 동의';
            case 1:
              return '기본정보';
            case 2:
              return '프로필 설정';
            case 3:
              return '';
          }
        })()}
        clickBack={() => {
          if (step.currStep > 0) {
            setStep((prevStep) => ({
              ...prevStep,
              currStep: prevStep.currStep - 1,
            }));
          } else {
            navigate(-1);
          }
        }}
      />
      {step.currStep === 0 && (
        <Terms pagenation={renderPagenation} clickNext={clickNext} />
      )}
      {step.currStep === 1 && (
        <UserInfo
          clickNext={clickNext}
          pagenation={renderPagenation}
          setFormValues={setFormValues}
          formValues={formValues}
        />
      )}
      {step.currStep === 2 && (
        <ProfileConfig
          setFormValues={setFormValues}
          formValues={formValues}
          pagenation={renderPagenation}
          clickNext={clickNext}
        />
      )}
      {step.currStep === 3 && <Finish nickname={formValues.nickname || ''} />}
    </SignUpPageContainer>
  );
};

export default SignupPage;

const SignUpPageContainer = styled.div`
  width: 100vw;
  height: 100%;
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
