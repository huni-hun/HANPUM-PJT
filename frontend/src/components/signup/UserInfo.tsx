import * as S from '../Style/Signup/UserInfo.styled';
import TextField from '../common/TextField';
import BaseButton from '../common/BaseButton';
import Flex from '../common/Flex';
import Icon from '../common/Icon/Icon';
import Spacing from '../common/Spacing';
import FixedBottomButton from '../common/FixedBottomButton';
import { CheckId } from '@/api/signup/POST';
import { SignupValues } from '@/models/signup';
import { ChangeEvent, useState } from 'react';

type InfoValues = Pick<SignupValues, 'loginId' | 'password' | 'email'>;

function UserInfo({
  clickNext,
}: {
  clickNext: (signupForms: SignupValues) => void;
}) {
  // 회원 정보에만 있는 state
  const [infoValue, setInfoValue] = useState<InfoValues>({
    loginId: '',
    password: '',
    email: '',
  });

  const handleInfoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log('이름은 ::', name, '값은 ::', value);
  };
  // const { mutate } = CheckId({
  //   onSuccess: (res) => {
  //     console.log(res);
  //   },
  //   // onError: () => {},
  // });

  const clickCheckId = (id: string) => {
    CheckId(id);
  };

  return (
    <S.UserInfoContainer>
      <TextField
        label="아이디"
        name="id"
        placeholder="김동산"
        onChange={handleInfoChange}
        value={infoValue.loginId}
        helpMessage="※영문, 숫자를 조합해서 입력해주세요.(6~13자)"
        rightElement={
          <BaseButton
            size="radius"
            fontSize={1.2}
            $weak={true}
            style={{
              marginLeft: '8px',
            }}
          >
            중복확인
          </BaseButton>
        }
      />

      <TextField
        label="비밀번호"
        type="password"
        name="password"
        value={infoValue.password}
        onChange={handleInfoChange}
        helpMessage="※영문 대/소문자, 숫자, 특수문자를 조합해서 입력해 주세요.(8~16자)"
      />

      <TextField label="비밀번호 확인" type="password" name="rePassword" />

      <Spacing size={42} />

      <TextField
        label="이메일"
        name="email"
        onChange={handleInfoChange}
        value={infoValue.email}
        bottomElement={
          <BaseButton
            fontSize={1.2}
            size="longRadius"
            $weak={true}
            style={{ marginTop: 8 }}
          >
            인증번호 재발송
          </BaseButton>
        }
      />

      <TextField
        label="인증번호"
        name="id"
        rightElement={
          <BaseButton
            size="radius"
            fontSize={1.2}
            $weak={false}
            style={{
              marginLeft: '8px',
            }}
          >
            <Flex align="center" justify="center" gap={4}>
              <Icon name="IconHeart" size={9} />
              <span>인증</span>
            </Flex>
          </BaseButton>
        }
      />

      <FixedBottomButton
        label="다음"
        onClick={() => {}}
        disabled={true}
        $bottom="5"
      />
    </S.UserInfoContainer>
  );
}

export default UserInfo;
