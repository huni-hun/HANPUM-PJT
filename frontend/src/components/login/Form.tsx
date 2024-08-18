import React, { ChangeEvent, useState } from 'react';
import TextField from '../common/TextField/TextField';

const Form = () => {
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

  return (
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
        value={loginReq.loginId}
      />
    </form>
  );
};

export default Form;
