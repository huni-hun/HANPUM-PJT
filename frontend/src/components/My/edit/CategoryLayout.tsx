import { colors } from '@/styles/colorPalette';
import styled from 'styled-components';
import Header from '../../common/Header/Header';
import { useNavigate, useParams } from 'react-router-dom';
import Flex from '../../common/Flex';
import Text from '../../common/Text';
import { useEffect, useState } from 'react';
import Icon from '../../common/Icon/Icon';
import { SignupRequestValues } from '@/models/signup';
import {
  dateFormat,
  genderEng,
  returnTitle,
  telnumberFormat,
} from '@/utils/util';
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from 'react-query';
import { GetUser } from '@/api/mypage/GET';
import { ChangeNickname, ChangeUserInfo } from '@/api/mypage/PUT';
import { STATUS } from '@/constants';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import TextField from '../../common/TextField/TextField';
import BaseButton from '../../common/BaseButton';
import { CheckNickname } from '@/api/signup/POST';
import { useAlert } from '@/hooks/global/useAlert';
import Calender from '../../Signup/Calender';

function CategoryLayout() {
  const param = useParams().category?.split(
    ':',
  )[1] as keyof SignupRequestValues;
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data, isLoading } = useQuery('getUser', GetUser);

  const [memberInfoReq, setMemberInfoReq] = useState<
    Partial<SignupRequestValues>
  >({
    gender: data?.data.gender,
    name: data?.data.name,
    birthDate: data?.data.birthDate,
    phoneNumber: data?.data.phoneNumber,
  });
  const [nickNameStr, setNickNameStr] = useState<string>(data?.data.nickname);
  const [sendNick, setSendNick] = useState(false);

  const [focus, setFocus] = useState(false);

  const checkGender = (gender: string) => {
    setMemberInfoReq((prev) => ({
      ...prev,
      gender: genderEng(gender),
    }));
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'nickname') {
      setNickNameStr(value);
    } else {
      setMemberInfoReq((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const { mutate: changeUserInfo } = useMutation(ChangeUserInfo, {
    onSuccess: (res) => {
      console.log('res ::', res);
      if (res.status === STATUS.success) {
        toast.success(res.message);
        setMemberInfoReq({});
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
        setSendNick(true);
      }
      if (res.status === STATUS.error) {
        toast.error(res.message);
        setSendNick(false);
      }
    },
    onError: (error: AxiosError) => {
      toast.error(error.message);
    },
  });

  const { mutate: changeNickname } = useMutation(ChangeNickname, {
    onSuccess: (res) => {
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

  const { open } = useAlert();

  const handleDate = (birthDate: string) => {
    setMemberInfoReq((prevValue) => ({
      ...prevValue,
      birthDate: birthDate,
    }));
  };

  // 캘린더 달력 띄우기
  const handleClickAlert = () => {
    open({
      purpose: 'calender',
      onButtonClick: (cancel?: boolean) => {
        if (cancel) {
          setMemberInfoReq((prev) => ({
            ...prev,
            birthDate: '',
          }));
        }
      },
      element: <Calender onChange={handleDate} />,
    });
  };

  // input 옆에 있는 X 버튼(param값 초기화)
  const clickInit = () => {
    if (param) {
      if (param === 'birthDate') {
        handleClickAlert();
        setMemberInfoReq((prev) => ({
          ...prev,
          [param]: '',
        }));
      } else {
        setMemberInfoReq((prev) => ({
          ...prev,
          [param]: '',
        }));
      }
    }
  };

  // 통신 분기처리(닉네임, 유저 정보)
  const setComplete = () => {
    if (param === 'nickname') {
      return changeNickname(nickNameStr);
    }
    return changeUserInfo(memberInfoReq);
  };

  // 헤더에 완료 focus여부에 따른 색상 변경
  useEffect(() => {
    if (param && memberInfoReq[param] !== data?.data[param]) {
      setFocus(true);
    } else {
      setFocus(false);
    }
  }, [param, memberInfoReq, data]);

  if (isLoading) {
    return <div>로딩중..</div>;
  }

  return (
    <Layout>
      <Header
        purpose="complete"
        title={returnTitle(param)}
        clickBack={() => {
          navigate(-1);
        }}
        complete={() => setComplete()}
        focus={focus}
      />
      {data && (
        <>
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
                      memberInfoReq.gender === 'WOMAN'
                        ? 'check checked'
                        : 'check'
                    }
                    onClick={() => checkGender('여성')}
                  />
                </Flex>
                <Flex $justify="space-between" $align="center">
                  <Text $typography="t16">기타</Text>
                  <div
                    className={
                      memberInfoReq.gender === 'OTHER'
                        ? 'check checked'
                        : 'check'
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
                  value={nickNameStr}
                  onChange={onChangeHandler}
                  rightElement={
                    <BaseButton
                      size="radius"
                      fontSize={1.2}
                      $weak={!sendNick}
                      style={{ marginLeft: '8px' }}
                      onClick={() => {
                        if (memberInfoReq.nickname?.trim().length !== 0) {
                          checkNickname(nickNameStr);
                        }
                      }}
                    >
                      {sendNick ? (
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
              />
            )}
          </div>
        </>
      )}
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
