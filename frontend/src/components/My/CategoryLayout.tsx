import { colors } from '@/styles/colorPalette';
import styled from 'styled-components';
import Header from '../common/Header/Header';
import { useNavigate, useParams } from 'react-router-dom';
import Flex from '../common/Flex';
import Text from '../common/Text';
import { useState } from 'react';
import TextField from '../common/TextField/TextField';
import Icon from '../common/Icon/Icon';

function CategoryLayout() {
  const param = useParams().category?.split(':')[1];

  const navigate = useNavigate();

  const returnTitle = () => {
    if (param === 'nickname') {
      return '닉네임';
    }
    if (param === 'name') {
      return '이름';
    }
    if (param === 'email') {
      return '이메일';
    }
    if (param === 'telphone') {
      return '전화번호';
    }
    if (param === 'birth') {
      return '생년월일';
    }
    if (param === 'gender') {
      return '성별';
    }
  };

  const [editValue, setEditValue] = useState('');

  const checkGender = () => {};
  return (
    <Layout>
      <Header
        purpose="complete"
        title={returnTitle()}
        clickBack={() => {
          navigate(-1);
        }}
      />
      {/* {param === 'nickname' && } */}
      <div className="container">
        {param === 'gender' && (
          <>
            <Flex $justify="space-between" $align="center">
              <Text $typography="t16">남성</Text>
              <div className="check" />
            </Flex>
            <Flex $justify="space-between" $align="center">
              <Text $typography="t16">여성</Text>
              <div className="check" />
            </Flex>
            <Flex $justify="space-between" $align="center">
              <Text $typography="t16">기타</Text>
              <div className="check" />
            </Flex>
          </>
        )}

        {param === 'name' && (
          <div className="input-box">
            <input type="text" />
            <Icon name="IconMyRooteClose" />
          </div>
        )}
      </div>
    </Layout>
  );
}

export default CategoryLayout;

const Layout = styled.div`
  height: 100%;
  background-color: ${colors.white};

  .container {
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 24px;
    .check {
      width: 2rem;
      height: 2rem;
      border-radius: 50%;
      border: 1px solid ${colors.grey2};
      margin-right: 16px;
      box-sizing: border-box;
    }
    .checked {
      width: 2rem;
      height: 2rem;
      border-radius: 50%;
      background-color: ${colors.main};
      margin-right: 16px;
      border: none;
    }
  }
`;
