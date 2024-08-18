import FixedBottomButton from '@/components/common/FixedBottomButton';
import Header from '@/components/common/Header/Header';
import Text from '@/components/common/Text';
import TextField from '@/components/common/TextField/TextField';
import { colors } from '@/styles/colorPalette';
import { ChangeEvent, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

function FindPage() {
  const param = useParams().account?.split(':')[1];
  console.log(param);

  const navigate = useNavigate();

  const [findIdReq, setFindIdReq] = useState({
    name: '',
    email: '',
  });

  const [findPwReq, setFindPwReq] = useState({
    loginId: '',
    email: '',
  });

  const handleIdReq = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFindIdReq((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const handlePwReq = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFindPwReq((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  return (
    <FindPageContainer>
      <Header
        purpose="back"
        clickBack={() => {
          navigate(-1);
        }}
      />
      <div className="form-container">
        <Text $typography="t20" $bold={true} style={{ margin: '16px 0px' }}>
          {param === 'id' ? '아이디 찾기' : '비밀번호 찾기'}
        </Text>
        <Text $typography="t14" style={{ marginBottom: '24px' }}>
          가입한 계정 정보를 입력해주세요
        </Text>
        <TextField
          label={param === 'id' ? '이름' : '아이디'}
          name={param === 'id' ? 'name' : 'loginId'}
          placeholder="김동산"
          onChange={param === 'id' ? handleIdReq : handlePwReq}
          value={param === 'id' ? findIdReq.name : findPwReq.loginId}
          style={{ marginBottom: '24px' }}
        />
        <TextField
          label="이메일"
          name="email"
          placeholder="123456@naver.com"
          onChange={param === 'id' ? handleIdReq : handlePwReq}
          value={param === 'id' ? findIdReq.email : findPwReq.email}
        />
      </div>
      <FixedBottomButton
        label={param === 'id' ? '다음' : '임시 비밀번호 전송'}
        onClick={() => {}}
        disabled={
          param === 'id'
            ? !(findIdReq.email && findIdReq.name)
            : !(findPwReq.email && findPwReq.loginId)
        }
      />
    </FindPageContainer>
  );
}

export default FindPage;

const FindPageContainer = styled.div`
  background-color: ${colors.white};
  height: 100vh;
  .form-container {
    width: 100%;
    padding: 0 24px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
  }
`;
