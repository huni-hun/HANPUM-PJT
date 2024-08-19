import React, { ChangeEvent, useState } from 'react';
import TextField from '../common/TextField/TextField';
import FixedBottomButton from '../common/FixedBottomButton';
import * as S from '../Style/Login/Form.styled';
import { useMutation } from 'react-query';
import { Login } from '@/api/signup/POST';
import { toast } from 'react-toastify';
import { STATUS } from '@/constants';
import { AxiosError } from 'axios';

import { encodeToken } from '@/utils/util';
import { useNavigate } from 'react-router-dom';

const Form = () => {
  const navigate = useNavigate();
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
          const token = encodeToken(accessToken, refreshToken);
          localStorage.setItem('token', JSON.stringify(token));
          navigate('/');
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
    <S.FormContainer>
      <form>
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
      </form>

      <FixedBottomButton
        label="로그인"
        onClick={() => {
          mutate({
            loginId: loginReq.loginId,
            password: loginReq.password,
          });
        }}
      />
    </S.FormContainer>
  );
};

export default Form;
