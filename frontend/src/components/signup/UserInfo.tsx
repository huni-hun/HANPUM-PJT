import * as S from '../Style/Signup/UserInfo.styled';
import TextField from '../common/TextField/TextField';
import BaseButton from '../common/BaseButton';
import Flex from '../common/Flex';
import Icon from '../common/Icon/Icon';
import Spacing from '../common/Spacing';
import FixedBottomButton from '../common/FixedBottomButton';
import { CertificationEmail, CheckEmail, CheckId } from '@/api/signup/POST';
import { CertificationValidate, SignupValues } from '@/models/signup';
import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { STATUS } from '@/constants';
import { AxiosError } from 'axios';

type InfoValues = Pick<
  SignupValues,
  'loginId' | 'password' | 'email' | 'checkPassword' | 'inputAuthCode'
>;

function UserInfo({
  clickNext,
  pagenation,
}: {
  clickNext: (signupForms: Partial<SignupValues>) => void;
  pagenation: () => React.ReactNode;
}) {
  // 회원 정보에만 있는 state
  const [infoValue, setInfoValue] = useState<InfoValues>({
    loginId: '',
    password: '',
    email: '',
    checkPassword: '',
    inputAuthCode: '',
  });

  // 초기 진입시 error message 뜨는 것 dirty로 분기처리
  const [dirty, setDirty] = useState<
    Partial<Record<keyof InfoValues, boolean>>
  >({});

  // 아이디, 이메일 중복확인 상태
  const [infoValidate, setInfoValidate] = useState<
    Partial<CertificationValidate>
  >({
    checkId: '',
    checkEmail: '',
  });

  const [isSend, setIsSend] = useState<Partial<CertificationValidate>>({
    checkId: false,
    checkEmail: false,
    checkComplete: false,
  });

  const [time, setTime] = useState(300);

  const [isComplete, setIsComplete] = useState(false);

  const handleInfoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setInfoValue((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));

    if (name === 'loginId') {
      setInfoValidate((prev) => ({
        ...prev,
        checkId: '',
      }));
    }
  };

  const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setDirty((prev) => ({
      ...prev,
      [name]: 'true',
    }));
  };

  // 인증 및 필드 유효성 검사
  const validate = useMemo(() => {
    let errors: Partial<InfoValues & CertificationValidate> = {};

    // 아이디 유효성 검사
    const loginIdPattern = /^[a-zA-Z0-9]{6,13}$/;
    if (!loginIdPattern.test(infoValue.loginId)) {
      errors.loginId = '※영문과 숫자를 조합하여 6~13자로 입력해 주세요.';
    }

    // 비밀번호 유효성 검사
    const passwordPattern =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/;
    if (!passwordPattern.test(infoValue.password)) {
      errors.password =
        '※영문 대/소문자, 숫자, 특수문자를 조합하여 8~16자로 입력해 주세요.';
    }

    // 비밀번호 확인
    if (infoValue.checkPassword.length === 0) {
      errors.checkPassword = '비밀번호를 입력해주세요.';
    } else if (infoValue.password !== infoValue.checkPassword) {
      errors.checkPassword = '비밀번호가 일치하지 않습니다.';
    }

    // 이메일 유효성 검사
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(infoValue.email)) {
      errors.email = '유효한 이메일 형식을 입력해 주세요.';
    }

    // 아이디 중복 확인 에러
    if (infoValidate.checkId) {
      errors.checkId = infoValidate.checkId;
    }

    if (!infoValue.inputAuthCode) {
      errors.inputAuthCode = '인증번호를 입력해 주세요.';
    }

    return errors;
  }, [infoValue, infoValidate]);

  const noError = Object.keys(validate).length === 0;

  // 아이디 중복확인
  const { mutate: checkId } = useMutation(CheckId, {
    onSuccess: (res) => {
      console.log(res);
      if (res.status === STATUS.success) {
        // console.log('성공');
        toast.success(res.message);
        setInfoValidate((prev) => ({
          ...prev,
          checkId: '',
        }));

        setIsSend((prev) => ({
          ...prev,
          checkId: true,
        }));
      }
      if (res.status === STATUS.error) {
        // console.log('실패');
        toast.error(res.message);
        setInfoValidate((prev) => ({
          ...prev,
          checkId: res.message,
        }));
      }
    },
    onError: (error: AxiosError) => {
      toast.error(error.message);
    },
  });

  const { mutate: checkEmail, isLoading: checkEmailLoading } = useMutation(
    CheckEmail,
    {
      onSuccess: (res) => {
        console.log(res);
        if (res.status === STATUS.success) {
          toast.success(res.message);
          setIsSend((prev) => ({
            ...prev,
            checkEmail: true,
          }));
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

  // 메일 인증
  const { mutate: certificationEmail } = useMutation(
    ({ email, inputAuthCode }: { email: string; inputAuthCode: string }) =>
      CertificationEmail(email, inputAuthCode),
    {
      onSuccess: (res) => {
        console.log(res);
        if (res.status === STATUS.success) {
          toast.success(res.message);
          setIsComplete(true);
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

  // console.log(isSend);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isSend.checkEmail && time > 0) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    }

    return () => {
      clearInterval(timer);
    };
  }, [time, isSend.checkEmail]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(
      remainingSeconds,
    ).padStart(2, '0')}`;
  };

  if (checkEmailLoading) {
    return <div>...메일 전송중</div>;
  }
  return (
    <S.UserInfoContainer>
      {pagenation()}
      <TextField
        label="아이디"
        name="loginId"
        placeholder="김동산"
        onChange={handleInfoChange}
        value={infoValue.loginId}
        hasError={
          Boolean(dirty.loginId) &&
          (Boolean(validate.loginId) || Boolean(infoValidate.checkId))
        }
        helpMessage={
          Boolean(dirty.loginId) && (validate.loginId || infoValidate.checkId)
            ? validate.loginId || infoValidate.checkId
            : '※영문, 숫자를 조합해서 입력해주세요.(6~13자)'
        }
        onBlur={handleBlur}
        rightElement={
          <BaseButton
            size="radius"
            fontSize={1.2}
            $weak={!isSend.checkId as boolean}
            style={{
              marginLeft: '8px',
            }}
            onClick={() => {
              if (infoValue.loginId.length !== 0) {
                checkId(infoValue.loginId);
              }
            }}
          >
            {isSend.checkId ? (
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

      <TextField
        label="비밀번호"
        type="password"
        name="password"
        value={infoValue.password}
        onChange={handleInfoChange}
        hasError={Boolean(dirty.password) && Boolean(validate.password)}
        helpMessage={
          Boolean(dirty.password) && validate.password
            ? validate.password
            : '※영문 대/소문자, 숫자, 특수문자를 조합해서 입력해 주세요.(8~16자)'
        }
        onBlur={handleBlur}
      />

      <TextField
        label="비밀번호 확인"
        type="password"
        name="checkPassword"
        value={infoValue.checkPassword}
        onChange={handleInfoChange}
        hasError={
          Boolean(dirty.checkPassword) && Boolean(validate.checkPassword)
        }
        helpMessage={
          Boolean(dirty.checkPassword)
            ? validate.checkPassword
            : '비밀번호를 다시 입력해 주세요.'
        }
        onBlur={handleBlur}
      />

      <Spacing size={4.2} />

      <TextField
        label="이메일"
        name="email"
        onChange={handleInfoChange}
        value={infoValue.email}
        hasError={Boolean(dirty.email) && Boolean(validate.email)}
        helpMessage={Boolean(dirty.email) ? validate.email : ''}
        onBlur={handleBlur}
        bottomElement={
          <BaseButton
            fontSize={1.2}
            size="longRadius"
            $weak={true}
            style={{ marginTop: 8 }}
            onClick={() => {
              if (infoValue.email.length !== 0) {
                checkEmail(infoValue.email);
              }
            }}
          >
            {isSend.checkEmail ? '인증번호 재발송' : '인증번호 발송'}
          </BaseButton>
        }
      />

      <TextField
        label="인증번호"
        name="inputAuthCode"
        value={infoValue.inputAuthCode}
        onBlur={handleBlur}
        onChange={handleInfoChange}
        placeholder="123456"
        hasError={
          Boolean(dirty.inputAuthCode) && Boolean(validate.inputAuthCode)
        }
        helpMessage={
          Boolean(dirty.inputAuthCode) && validate.inputAuthCode
            ? validate.inputAuthCode
            : ''
        }
        hasFloat={isSend.checkEmail ? formatTime(time) : ''}
        rightElement={
          <BaseButton
            size="radius"
            fontSize={1.2}
            $weak={!isComplete}
            style={{
              marginLeft: '8px',
            }}
            onClick={() =>
              certificationEmail({
                email: infoValue.email,
                inputAuthCode: infoValue.inputAuthCode,
              })
            }
          >
            <Flex $align="center" $justify="center" $gap={4}>
              {isComplete && time !== 0 && <Icon name="IconCheck" size={9} />}
              <span>인증</span>
            </Flex>
          </BaseButton>
        }
      />

      <Spacing size={10} />

      <FixedBottomButton
        label="다음"
        onClick={() => {
          clickNext(infoValue);
        }}
        disabled={!(isComplete && noError)}
        // $bottom="5"
      />
    </S.UserInfoContainer>
  );
}

export default UserInfo;
