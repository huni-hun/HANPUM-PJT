import { colors } from '@/styles/colorPalette';
import styled from 'styled-components';
import Header from '../common/Header/Header';
import { useNavigate, useParams } from 'react-router-dom';
import Flex from '../common/Flex';
import Text from '../common/Text';
import { useEffect, useState } from 'react';
import Icon from '../common/Icon/Icon';
import { SignupRequestValues } from '@/models/signup';
import { dateFormat, genderEng, telnumberFormat } from '@/utils/util';
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from 'react-query';
import { GetUser } from '@/api/mypage/GET';
import { ChangeUserInfo } from '@/api/mypage/PUT';
import { STATUS } from '@/constants';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import TextField from '../common/TextField/TextField';
import BaseButton from '../common/BaseButton';
import { CheckNickname } from '@/api/signup/POST';
import { useAlert } from '@/hooks/global/useAlert';
import Calender from '../Signup/Calender';

function CategoryLayout() {
  const param = useParams().category?.split(
    ':',
  )[1] as keyof SignupRequestValues;

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
    if (param === 'phoneNumber') {
      return '전화번호';
    }
    if (param === 'birthDate') {
      return '생년월일';
    }
    if (param === 'gender') {
      return '성별';
    }
  };

  // const [isSend, setIsSend] = useState(true);

  const { data, isLoading } = useQuery('getUser', GetUser);

  const [memberInfoReq, setMemberInfoReq] = useState<
    Partial<SignupRequestValues>
  >({
    gender: data?.data.gender,
    name: data?.data.name,
    birthDate: data?.data.birthDate,
    phoneNumber: data?.data.phoneNumber,
    nickname: '두가두가',
  });

  const [focus, setFocus] = useState(false);

  // console.log('memberInfo ::', memberInfoReq);

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

    // if (name === 'phoneNumber') {
    //   setMemberInfoReq((prev) => ({
    //     ...prev,
    //     [name]: value, // 입력 값을 포맷팅하여 상태 업데이트
    //   }));
    // }
  };

  const queryClient = useQueryClient();

  const { mutate: changeUserInfo } = useMutation(ChangeUserInfo, {
    onSuccess: (res) => {
      console.log('res ::', res);
      if (res.status === STATUS.success) {
        toast.success(res.message);
        queryClient.invalidateQueries({ queryKey: ['getUser'] });
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

  const { mutate: checkNickname } = useMutation(CheckNickname, {
    onSuccess: (res) => {
      if (res.status === STATUS.success) {
        toast.success(res.message);
        // setCheckNicknameMessage(null);
      }
      if (res.status === STATUS.error) {
        toast.error(res.message);
        // setCheckNicknameMessage(res.message);
      }
    },
    onError: (error: AxiosError) => {
      toast.error(error.message);
    },
  });

  useEffect(() => {
    if (param && memberInfoReq[param] !== data?.data[param]) {
      setFocus(true);
    } else {
      setFocus(false);
    }
  }, [param, memberInfoReq, data]);

  const { open } = useAlert();

  const handleDate = (birthDate: string) => {
    setMemberInfoReq((prevValue) => ({
      ...prevValue,
      birthDate: birthDate,
    }));
  };

  const handleClickAlert = () => {
    open({
      purpose: 'calender',
      onButtonClick: (cancel?: boolean) => {
        // console.log(cancel);
        if (cancel) {
          // console.log('취소');
          setMemberInfoReq((prev) => ({
            ...prev,
            birthDate: '',
          }));
        }
      },
      element: <Calender onChange={handleDate} />,
    });
  };

  const clickInit = () => {
    if (param) {
      if (param === 'birthDate') {
        handleClickAlert();
        setMemberInfoReq((prev) => ({
          ...prev,
          [param]: '', // 해당 param 키의 값을 빈 문자열로 설정
        }));
      }
      setMemberInfoReq((prev) => ({
        ...prev,
        [param]: '', // 해당 param 키의 값을 빈 문자열로 설정
      }));
    }
  };

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
        focus={focus}
      />
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
              value={memberInfoReq.name}
              onChange={onChangeHandler}
            />
            <Icon
              name="IconMyRooteClose"
              style={{ position: 'absolute', top: '18px', right: '18px' }}
              onClick={clickInit}
            />
          </div>
        )}

        {param === 'phoneNumber' && (
          <div className="input-box">
            <input
              name="phoneNumber"
              type="text"
              maxLength={13}
              value={
                memberInfoReq.phoneNumber?.trim().length !== 0
                  ? telnumberFormat(memberInfoReq.phoneNumber)
                  : ''
              }
              onChange={onChangeHandler}
            />
            <Icon
              name="IconMyRooteClose"
              style={{ position: 'absolute', top: '18px', right: '18px' }}
              onClick={clickInit}
            />
          </div>
        )}

        {param === 'nickname' && (
          <>
            <TextField
              name="nickname"
              value={memberInfoReq.nickname}
              onChange={onChangeHandler}
              rightElement={
                <BaseButton
                  size="radius"
                  fontSize={1.2}
                  $weak={!(data?.data.nickname === memberInfoReq.nickname)}
                  style={{ marginLeft: '8px' }}
                  onClick={() => {
                    if (memberInfoReq.nickname?.trim().length !== 0) {
                      checkNickname(memberInfoReq.nickname as string);
                    }
                  }}
                >
                  {data?.data.nickname === memberInfoReq.nickname ? (
                    <Flex $align="center" $gap={4} $justify="center">
                      중복확인
                      <Icon name="IconCheck" size={9} />
                    </Flex>
                  ) : (
                    '중복확인'
                  )}
                </BaseButton>
              }
            />
          </>
        )}

        {param === 'birthDate' && (
          <TextField
            label="생년월일"
            name="birthDate"
            value={dateFormat(memberInfoReq.birthDate)}
            readOnly
            onClick={handleClickAlert}
            hasFloat={
              <Icon name="IconMyRooteClose" size={12} onClick={clickInit} />
            }
            // hasError={dirty.birthDate && Boolean(validate.birthDate)}
            // helpMessage={validate.birthDate}
          />
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
