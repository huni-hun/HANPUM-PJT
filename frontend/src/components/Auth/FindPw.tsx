import { useMutation } from 'react-query';
import FixedBottomButton from '../common/FixedBottomButton';
import Message from '../common/Message';
import Text from '../common/Text';
import TextField from '../common/TextField/TextField';
import * as S from '../Style/Auth/FindId.styled';
import { FindId } from '@/api/signup/GET';
import { STATUS } from '@/constants';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { UserSignupFormValues } from '@/models/signup';

function FindPwComponent({
  param,
  findPw,
}: {
  param: string;
  findPw: (data: { loginId: string; email: string }) => void;
}) {
  const [findPwReq, setFindPwReq] = useState({
    loginId: '',
    email: '',
  });

  const handlePwReq = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFindPwReq((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const [dirty, setDirty] = useState<
    Partial<Record<keyof UserSignupFormValues, boolean>>
  >({});

  const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setDirty((prev) => ({
      ...prev,
      [name]: 'true',
    }));
  };

  const validate = useMemo(() => {
    let errors: Partial<UserSignupFormValues> = {};

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if ((findPwReq.email?.trim() || '').length === 0) {
      errors.email = '이메일을 입력해주세요.';
    } else if (!emailPattern.test(findPwReq.email?.trim() || '')) {
      errors.email = '유효한 이메일 형식을 입력해 주세요.';
    }

    const loginIdPattern = /^[a-zA-Z0-9]{6,13}$/;
    if (!loginIdPattern.test(findPwReq.loginId?.trim() || '')) {
      errors.loginId = '※영문과 숫자를 조합하여 6~13자로 입력해 주세요.';
    }

    return errors;
  }, [findPwReq, param]);

  const noError = Object.keys(validate).length === 0;

  return (
    <S.FindContainer>
      <div className="form-container">
        <Text $typography="t20" $bold={true} style={{ margin: '16px 0px' }}>
          비밀번호 찾기
        </Text>
        <Text $typography="t14" style={{ marginBottom: '24px' }}>
          가입한 계정 정보를 입력해주세요
        </Text>

        <TextField
          label={'아이디'}
          name={'loginId'}
          placeholder="김동산"
          onChange={handlePwReq}
          value={findPwReq.loginId}
          onBlur={handleBlur}
          hasError={
            param === 'id'
              ? dirty.name && Boolean(validate.name)
              : dirty.loginId && Boolean(validate.loginId)
          }
        />
        {param === 'id' ? (
          <Message
            hasError={dirty.name && Boolean(validate.name)}
            text={dirty.name ? validate.name || '' : ''}
          />
        ) : (
          <Message
            hasError={dirty.loginId && Boolean(validate.loginId)}
            text={dirty.loginId ? validate.loginId || '' : ''}
          />
        )}

        <TextField
          label="이메일"
          name="email"
          placeholder="123456@naver.com"
          onChange={handlePwReq}
          value={findPwReq.email}
          onBlur={handleBlur}
          hasError={dirty.email && Boolean(validate.email)}
        />
        <Message
          hasError={dirty.email && Boolean(validate.email)}
          text={dirty.email ? validate.email || '' : ''}
        />
      </div>
      <FixedBottomButton
        label={'다음'}
        onClick={() => {
          findPw({
            loginId: findPwReq.loginId,
            email: findPwReq.email,
          });
        }}
        disabled={!noError}
      />
    </S.FindContainer>
  );
}

export default FindPwComponent;
