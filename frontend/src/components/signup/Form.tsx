import React from 'react';
import TextField from '../common/TextField';
import Flex from '../common/Flex';

const Form = () => {
  return (
    <form>
      <TextField
        label="이메일"
        name="email"
        placeholder="이메일을 입력해주세요"
        helpMessage="dd"
      />
      <button>중복확인</button>
      <button>인증요청</button>

      <TextField
        label="이메일 인증"
        placeholder="이메일 인증번호를 입력해주세요"
      />

      <TextField label="아이디" name="id" placeholder="아이디를 입력해주세요" />

      <TextField type="password" label="비밀번호" name="password" />

      <TextField label="이름" name="name" placeholder="이름을 입력해주세요" />

      {/* selectbox로 수정 */}
      <TextField label="성별" name="gender" placeholder="성별을 입력해주세요" />

      {/* 캘린더로 수정 */}
      <TextField
        label="출생년도"
        name="birth"
        placeholder="출생년도를 입력해주세요"
      />

      {/* 다음 주소 api */}
      <TextField
        label="주소"
        name="address"
        placeholder="주소를 입력해주세요"
      />

      {/* 유틸함수로 010-0000-0000 생성 */}
      <TextField
        label="전화번호"
        type="tel"
        name="tel"
        placeholder="전화번호를 입력해주세요"
      />

      <TextField
        label="닉네임"
        name="nickname"
        placeholder="닉네임을 입력해주세요"
      />

      <p>약관동의</p>

      <button>회원가입완료</button>
    </form>
  );
};

export default Form;
