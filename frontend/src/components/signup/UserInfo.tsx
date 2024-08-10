import { SignupInfo } from '@/models/signup';
import * as S from '../Style/Signup/UserInfo.styled';
import { useState } from 'react';
import TextField from '../common/TextField';
import BaseButton from '../common/BaseButton';
import Icon from '../common/Icon/Icon';
import Flex from '../common/Flex';

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

        <TextField
          label="아이디"
          name="email"
          placeholder="김동산"
          rightElement={
            <BaseButton
              size="radius"
              fontSize={1.2}
              weak={true}
              style={{
                marginLeft: '8px',
              }}
            >
              중복확인
            </BaseButton>
          }
        />

        <TextField
          label="아이디"
          name="email"
          placeholder="김동산"
          bottomElement={
            <BaseButton
              size="radius"
              fontSize={1.2}
              weak={true}
              style={{
                marginLeft: '8px',
              }}
            >
              중복확인
            </BaseButton>
          }
        />
      </div>

      <BaseButton>버튼1</BaseButton>
      <BaseButton weak={true}>버튼2</BaseButton>
      <BaseButton size="radius">버튼2</BaseButton>
      <BaseButton size="radius" weak={true}>
        버튼2
      </BaseButton>

      <BaseButton size="medium" fontSize={1}>
        버튼2
      </BaseButton>
      <BaseButton size="medium" fontSize={1} disabled={true}>
        버튼2
      </BaseButton>

      <BaseButton size="medium" fontSize={1}>
        버튼2
      </BaseButton>

      <BaseButton size="medium" fontSize={1} full={true}>
        버튼2
      </BaseButton>
      <BaseButton size="medium" full={true} disabled={true}>
        버튼2
      </BaseButton>
      <BaseButton size="medium" full={true} disabled={true}>
        <Flex align="center" justify="center" as="span">
          <Icon name="IconSun" />
          <span>ㅎㅇㅇ</span>
        </Flex>
      </BaseButton>
    </S.UserInfoContainer>
  );
}

export default UserInfo;
