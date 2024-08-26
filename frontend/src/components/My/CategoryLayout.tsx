import { colors } from '@/styles/colorPalette';
import styled from 'styled-components';
import Header from '../common/Header/Header';
import { useNavigate, useParams } from 'react-router-dom';
import Flex from '../common/Flex';
import Text from '../common/Text';
import { useState } from 'react';
import Icon from '../common/Icon/Icon';
import { SignupRequestValues } from '@/models/signup';
import { genderEng, telnumberFormat } from '@/utils/util';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { GetUser } from '@/api/mypage/GET';
import { ChangeUserInfo } from '@/api/mypage/PUT';
import { STATUS } from '@/constants';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import TextField from '../common/TextField/TextField';
import BaseButton from '../common/BaseButton';

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

  const { data, isLoading } = useQuery('getUser', GetUser);

  const [memberInfoReq, setMemberInfoReq] = useState<
    Partial<SignupRequestValues>
  >({
    gender: data?.data.gender,
    name: data?.data.name,
    birthDate: data?.data.birthDate,
    phoneNumber: data?.data.phoneNumber,
  });

  console.log('memberInfo ::', memberInfoReq.phoneNumber);

  const checkGender = (gender: string) => {
    setMemberInfoReq((prev) => ({
      ...prev,
      gender: genderEng(gender),
    }));
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMemberInfoReq((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === 'phoneNumber') {
      setMemberInfoReq((prev) => ({
        ...prev,
        [name]: telnumberFormat(value), // 입력 값을 포맷팅하여 상태 업데이트
      }));
    }
  };

  const { mutate: changeUserInfo } = useMutation(ChangeUserInfo, {
    onSuccess: (res) => {
      console.log('res ::', res);
      if (res.status === STATUS.success) {
        toast.success(res.message);
        navigate('/myprofile');
      }
      if (res.status === STATUS.error) {
        toast.error(res.message);
      }
    },
    onError: (error: AxiosError) => {
      toast.error(error.message);
    },
  });

  if (isLoading) {
    return <div>로딩중..</div>;
  }

  return (
    <Layout>
      <Header
        purpose="complete"
        title={returnTitle()}
        clickBack={() => {
          navigate(-1);
        }}
        complete={() => changeUserInfo(memberInfoReq)}
      />
      {/* {param === 'nickname' && } */}
      <div className="container">
        {param === 'gender' && (
          <>
            <Flex $justify="space-between" $align="center">
              <Text $typography="t16">남성</Text>
              <div
                className={
                  memberInfoReq.gender === 'MAN' ? 'check checked' : 'check'
                }
                onClick={() => checkGender('남성')}
              />
            </Flex>
            <Flex $justify="space-between" $align="center">
              <Text $typography="t16">여성</Text>
              <div
                className={
                  memberInfoReq.gender === 'WOMAN' ? 'check checked' : 'check'
                }
                onClick={() => checkGender('여성')}
              />
            </Flex>
            <Flex $justify="space-between" $align="center">
              <Text $typography="t16">기타</Text>
              <div
                className={
                  memberInfoReq.gender === 'OTHER' ? 'check checked' : 'check'
                }
                onClick={() => checkGender('기타')}
              />
            </Flex>
          </>
        )}

        {param === 'name' && (
          <div className="input-box">
            <input
              name="name"
              type="text"
              value={memberInfoReq.phoneNumber}
              onChange={onChangeHandler}
            />
            <Icon
              name="IconMyRooteClose"
              style={{ position: 'absolute', top: '18px', right: '18px' }}
            />
          </div>
        )}

        {param === 'telphone' && (
          <div className="input-box">
            <input
              name="phoneNumber"
              type="text"
              value={telnumberFormat(memberInfoReq.phoneNumber)}
              onChange={onChangeHandler}
            />
            <Icon
              name="IconMyRooteClose"
              style={{ position: 'absolute', top: '18px', right: '18px' }}
            />
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

    .input-box {
      width: 100%;
      border: 1px solid ${colors.grey4};
      height: 4.8rem;
      border-radius: 7px;
      position: relative;
      display: flex;
      overflow: hidden;
      input {
        border: none;
        outline: none;
        height: 100%;
        flex: 1;
        padding: 0px 40px 0px 12px;
        box-sizing: border-box;
      }
    }
  }
`;
