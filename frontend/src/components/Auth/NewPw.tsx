import Text from '../common/Text';
import * as S from '../Style/Auth/FindId.styled';
import { ChangeEvent, useMemo, useState } from 'react';
import { UserSignupFormValues } from '@/models/signup';
import FixedBottomButton from '../common/FixedBottomButton';
import Message from '../common/Message';
import TextField from '../common/TextField/TextField';
import Spacing from '../common/Spacing';
import { useMutation } from 'react-query';
import { ChangePassword } from '@/api/mypage/PUT';
import { STATUS } from '@/constants';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';

function NewPw({
  setStep,
}: {
  setStep: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [updatePwReq, setUpdatePwReq] = useState({
    email: localStorage.getItem('email'),
    password: '',
    checkPassword: '',
  });

  // console.log(updatePwReq);

  const [dirty, setDirty] = useState<
    Partial<Record<keyof UserSignupFormValues, boolean>>
  >({});

  const handleUpdatePwReq = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setUpdatePwReq((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setDirty((prev) => ({
      ...prev,
      [name]: 'true',
    }));
  };

  const validate = useMemo(() => {
    let errors: Partial<UserSignupFormValues> = {};

    // const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // if ((updatePwReq.email?.trim() || '').length === 0) {
    //   errors.email = '이메일을 입력해주세요.';
    // } else if (!emailPattern.test(updatePwReq.email?.trim() || '')) {
    //   errors.email = '유효한 이메일 형식을 입력해 주세요.';
    // }

    // 비밀번호 유효성 검사
    const passwordPattern =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/;
    if (!passwordPattern.test(updatePwReq.password?.trim() || '')) {
      errors.password =
        '※영문 대/소문자, 숫자, 특수문자를 조합하여 8~16자로 입력해 주세요.';
    }

    // 비밀번호 확인
    if ((updatePwReq.checkPassword?.trim() || '').length === 0) {
      errors.checkPassword = '비밀번호를 입력해주세요.';
    } else if (
      updatePwReq.password?.trim() !== updatePwReq.checkPassword?.trim()
    ) {
      errors.checkPassword = '비밀번호가 일치하지 않습니다.';
    }

    return errors;
  }, [updatePwReq]);

  const noError = Object.keys(validate).length === 0;

  const { mutate: changePassword } = useMutation(
    ({ email, password }: { email: string; password: string }) =>
      ChangePassword(email, password),
    {
      onSuccess: (res) => {
        if (res.status === STATUS.success) {
          toast.success(res.message);
          localStorage.removeItem('email');
          setStep(2);
        }
        if (res.status === STATUS.error) {
          toast.error(res.message);
        }
      },
      onError: (error: AxiosError) => {
        toast.error(error.message);
      },
    },
  );

  return (
    <S.FindContainer>
      <div className="form-container">
        <Text $typography="t20" $bold={true} style={{ margin: '16px 0px' }}>
          비밀번호 재설정 하기
        </Text>
        <Text $typography="t14" style={{ marginBottom: '24px' }}>
          재설정할 비밀번호를 입력해주세요
        </Text>

        <TextField
          label="이메일"
          name="email"
          // placeholder="123456@naver.com"
          // onChange={handleUpdatePwReq}
          readOnly
          value={localStorage.getItem('email') || ''}
          // onBlur={handleBlur}
          // hasError={dirty.email && Boolean(validate.email)}
        />
        {/* <Message
          hasError={dirty.email && Boolean(validate.email)}
          text={dirty.email ? validate.email || '' : ''}
        /> */}
        <Spacing size={2.4} />

        <TextField
          label="비밀번호"
          type="password"
          name="password"
          onBlur={handleBlur}
          value={updatePwReq.password}
          onChange={handleUpdatePwReq}
          hasError={dirty.password && Boolean(validate.password)}
        />
        <Message
          hasError={dirty.password && Boolean(validate.password)}
          text={
            validate.password ||
            '※영문 대/소문자, 숫자, 특수문자를 조합하여 8~16자로 입력해 주세요.'
          }
        />

        <TextField
          label="비밀번호 확인"
          type="password"
          name="checkPassword"
          onBlur={handleBlur}
          value={updatePwReq.checkPassword}
          onChange={handleUpdatePwReq}
          hasError={dirty.checkPassword && Boolean(validate.checkPassword)}
          helpMessage={validate.checkPassword}
        />

        {dirty.checkPassword && Boolean(validate.checkPassword) ? (
          <>
            <Message
              hasError={dirty.checkPassword && Boolean(validate.checkPassword)}
              text={validate.checkPassword || ''}
            />
          </>
        ) : (
          <Spacing size={4.2} />
        )}
      </div>
      <FixedBottomButton
        label={'다음'}
        onClick={() => {
          changePassword({
            email: updatePwReq.email || '',
            password: updatePwReq.password,
          });
        }}
        disabled={!noError}
      />
    </S.FindContainer>
  );
}

export default NewPw;
