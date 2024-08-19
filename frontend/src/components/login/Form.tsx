import React from 'react';
import TextField from '../common/TextField/TextField';

const Form = () => {
  return (
    <form>
      <TextField label="아이디" name="id" placeholder="아이디를 입력해주세요" />

      <TextField type="password" label="비밀번호" name="password" />
    </form>
  );
};

export default Form;
