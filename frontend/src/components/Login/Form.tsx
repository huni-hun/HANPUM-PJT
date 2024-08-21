import React, { ChangeEvent, useMemo, useState } from 'react';
import TextField from '../common/TextField/TextField';
import FixedBottomButton from '../common/FixedBottomButton';
import * as S from '../Style/Login/Form.styled';
import { useMutation } from 'react-query';
import { Login } from '@/api/signup/POST';
import { toast } from 'react-toastify';
import { STATUS } from '@/constants';
import { AxiosError } from 'axios';

import { encodeToken } from '@/utils/util';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { isAuthEnticatedAtom } from '@/atoms/isAuthEnticatedAtom';
import Text from '../common/Text';
import { useNavigate } from 'react-router-dom';
import Header from '../common/Header/Header';
import BaseButton from '../common/BaseButton';

const Form = () => {
  const navigate = useNavigate();
  const setIsAuthenticated = useSetRecoilState(isAuthEnticatedAtom);
  const [loginReq, setLoginReq] = useState({
    loginId: '',
    password: '',
  });

  const handleLoginReq = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setLoginReq((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const { mutate } = useMutation(
    ({ loginId, password }: { loginId: string; password: string }) =>
      Login(loginId, password),
    {
      onSuccess: (res) => {
        if (res.status === STATUS.success) {
          const { accessToken, refreshToken } = res.data.tokenResDto;
          toast.success(res.message);
          const token = encodeToken(
            accessToken.replace('Bearer', ''),
            refreshToken.replace('Bearer', ''),
          );
          localStorage.setItem('token', JSON.stringify(token));
          setIsAuthenticated(true);
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

  // TODO 로그인 유효성 검사

  // TODO 자동로그인

  return (
    <S.FormContainer>
      <Header
        purpose="back"
        clickBack={() => {
          navigate(-1);
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
        />

        <TextField
          type="password"
          label="비밀번호"
          name="password"
          onChange={handleLoginReq}
          value={loginReq.password}
        />

        <div className="checkbox_input">
          <div className="checkbox_input-box"></div>
          <Text $typography="t12">로그인 상태 유지</Text>
        </div>

        <BaseButton
          size="large"
          style={{ margin: '0 auto' }}
          disabled={true}
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
