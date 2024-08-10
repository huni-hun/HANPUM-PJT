import { SignupInfo } from '@/models/signup';
import * as S from '../Style/Signup/UserInfo.styled';
import { useState } from 'react';
import TextField from '../common/TextField';

function UserInfo({
  signupValue,
  clickNext,
}: {
  signupValue: SignupInfo;
  clickNext: () => void;
}) {
  const [formValues, setFormValues] = useState({});

  const activeClass = (step: number) => {
    return step === signupValue.currStep ? '-active' : '';
  };

  return (
    <S.UserInfoContainer>
      <div className="pagenation">
        {Array.from({ length: signupValue.totalStep }, (_, index) => (
          <div key={index} className={`page${activeClass(index)}`} />
        ))}
      </div>

      <div className="form">
        <TextField
          label="아이디"
          name="email"
          placeholder="김동산"
          // value={formValues.email}
          // onChange={handleFormValues}
          // hasError={Boolean(dirty.email) && Boolean(errors.email)}
          // helpMessage={Boolean(dirty.email) ? errors.email : ''}
          // onBlur={handleBlur}
        />
      </div>
    </S.UserInfoContainer>
  );
}

export default UserInfo;
