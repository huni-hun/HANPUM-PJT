import React, { ChangeEvent, useMemo, useState } from 'react';
import TextField from '../common/TextField/TextField';
import * as S from '../Style/Login/Form.styled';
import { useMutation } from 'react-query';
import { Login } from '@/api/signup/POST';
import { toast } from 'react-toastify';
import { STATUS } from '@/constants';
import { AxiosError } from 'axios';

import { encodeToken } from '@/utils/util';
import { useSetRecoilState } from 'recoil';
import { isAuthEnticatedAtom, isInitAtom } from '@/atoms/isAuthEnticatedAtom';
import Text from '../common/Text';
import { useNavigate } from 'react-router-dom';
import Header from '../common/Header/Header';
import BaseButton from '../common/BaseButton';
import { UserSignupFormValues } from '@/models/signup';
import Message from '../common/Message';
import Icon from '../common/Icon/Icon';

const Form = () => {
  const navigate = useNavigate();
  const setInit = useSetRecoilState(isInitAtom);
  const setIsAuthenticated = useSetRecoilState(isAuthEnticatedAtom);
  const [loginReq, setLoginReq] = useState({
    loginId: '',
    password: '',
  });

  const [autoLogin, setAutoLogin] = useState(false);

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

  const handleLoginReq = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setLoginReq((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const toggleAutoLogin = () => {
    setAutoLogin(!autoLogin);
  };

  const validate = useMemo(() => {
    let errors: Partial<UserSignupFormValues> = {};

    const loginIdPattern = /^[a-zA-Z0-9]{6,13}$/;
    if (!loginIdPattern.test(loginReq.loginId?.trim() || '')) {
      errors.loginId = '※영문과 숫자를 조합하여 6~13자로 입력해 주세요.';
    }

    const passwordPattern =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/;
    if (!passwordPattern.test(loginReq.password?.trim() || '')) {
      errors.password =
        '※영문 대/소문자, 숫자, 특수문자를 조합하여 8~16자로 입력해 주세요.';
    }

    return errors;
  }, [loginReq]);

  const { mutate } = useMutation(
    ({ loginId, password }: { loginId: string; password: string }) =>
      Login(loginId, password),
    {
      onSuccess: (res) => {
        if (res.status === STATUS.success) {
          // console.log(res);
          const { accessToken } = res.data.tokenResDto;
          toast.success(res.message);

          const token = encodeToken(accessToken.split('+')[1]);

          // console.log('token ::', token);

          if (autoLogin) {
            localStorage.setItem('token', JSON.stringify(token));
          } else {
            sessionStorage.setItem('token', JSON.stringify(token));
          }
          setIsAuthenticated(true);
          navigate('/main');
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

  const noError = Object.keys(validate).length === 0;

  // TODO 자동로그인

  return (
    <S.FormContainer>
      <Header
        purpose="result"
        clickBack={() => {
          setInit(true);
        }}
      />

      <div className="form_container">
        <Text $typography="t20" $bold={true} style={{ margin: '16px 0px' }}>
          일반 회원으로 로그인
        </Text>
        <Text $typography="t14" style={{ marginBottom: '24px' }} color="grey2">
          서비스 이용을 위해 로그인 해주세요
        </Text>

        <TextField
          label="아이디"
          name="loginId"
          placeholder="아이디를 입력해주세요"
          onChange={handleLoginReq}
          value={loginReq.loginId}
          hasError={dirty.loginId && Boolean(validate.loginId)}
          onBlur={handleBlur}
        />
        <Message
          hasError={dirty.loginId && Boolean(validate.loginId)}
          text={dirty.loginId ? validate.loginId || '' : ''}
        />

        <TextField
          type="password"
          label="비밀번호"
          name="password"
          onChange={handleLoginReq}
          value={loginReq.password}
          hasError={dirty.password && Boolean(validate.password)}
          onBlur={handleBlur}
        />
        {dirty.password && Boolean(validate.password) && (
          <Message
            hasError={dirty.password && Boolean(validate.password)}
            text={dirty.password ? (validate.password as string) : null}
          />
        )}

        <div className="checkbox_input">
          <div
            className={`checkbox_input-box ${autoLogin ? 'auto-check' : ''}`}
            onClick={toggleAutoLogin}
          >
            <Icon name="IconCheckInSignIn" />
          </div>
          <Text $typography="t12">로그인 상태 유지</Text>
        </div>

        <BaseButton
          size="large"
          style={{ margin: '0 auto' }}
          disabled={!noError}
          onClick={() => {
            mutate({
              loginId: loginReq.loginId,
              password: loginReq.password,
            });
          }}
        >
          로그인
        </BaseButton>
      </div>

      <div className="login_group">
        <Text
          $typography="t12"
          onClick={() => {
            navigate('/find/:id');
          }}
        >
          아이디 찾기
        </Text>
        <Text
          $typography="t12"
          onClick={() => {
            navigate('/find/:pw');
          }}
        >
          비밀번호 찾기
        </Text>

        <Text
          $typography="t12"
          onClick={() => {
            navigate('/signup');
          }}
        >
          회원가입
        </Text>
      </div>
    </S.FormContainer>
  );
};

export default Form;
