import * as S from '../Style/Signup/UserInfo.styled';
import TextField from '../common/TextField/TextField';
import BaseButton from '../common/BaseButton';
import Flex from '../common/Flex';
import Icon from '../common/Icon/Icon';
import Spacing from '../common/Spacing';
import FixedBottomButton from '../common/FixedBottomButton';
import { CertificationEmail, CheckEmail, CheckId } from '@/api/signup/POST';
import { SignupRequestValues, UserSignupFormValues } from '@/models/signup';
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { STATUS } from '@/constants';
import { AxiosError } from 'axios';
import Message from '../common/Message';

// type InfoValues = Pick<
//   SignupRequestValues,
//   'loginId' | 'password' | 'email' | 'checkPassword' | 'inputAuthCode'
// >;

function UserInfo({
  clickNext,
  pagenation,
  setFormValues,
  formValues,
}: {
  clickNext: () => void;
  pagenation: () => React.ReactNode;
  setFormValues: Dispatch<SetStateAction<Partial<SignupRequestValues>>>;
  formValues: Partial<UserSignupFormValues>;
}) {
  const [checkIdErrorMessage, setCheckIdErrorMessage] = useState<string | null>(
    null,
  );
  const [checkEmailMessage, setCheckEmailMessage] = useState<string | null>(
    null,
  );
  const [checkInputCodeMessage, setCheckInputcodeMessage] = useState<
    string | null
  >(null);

  // 초기 진입시 error message 뜨는 것 dirty로 분기처리
  const [dirty, setDirty] = useState<
    Partial<Record<keyof UserSignupFormValues, boolean>>
  >({});

  const [time, setTime] = useState(300);

  const handleInfoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormValues((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
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
    let errors: Partial<UserSignupFormValues> = {};

    // 아이디 유효성 검사
    const loginIdPattern = /^[a-zA-Z0-9]{6,13}$/;
    if (!loginIdPattern.test(formValues.loginId?.trim() || '')) {
      errors.loginId = '※영문과 숫자를 조합하여 6~13자로 입력해 주세요.';
    }

    // 비밀번호 유효성 검사
    const passwordPattern =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/;
    if (!passwordPattern.test(formValues.password?.trim() || '')) {
      errors.password =
        '※영문 대/소문자, 숫자, 특수문자를 조합하여 8~16자로 입력해 주세요.';
    }

    // 비밀번호 확인
    if ((formValues.checkPassword?.trim() || '').length === 0) {
      errors.checkPassword = '비밀번호를 입력해주세요.';
    } else if (
      formValues.password?.trim() !== formValues.checkPassword?.trim()
    ) {
      errors.checkPassword = '비밀번호가 일치하지 않습니다.';
    }

    // 이름 유효성 검사
    if ((formValues.name?.trim() || '').length === 0) {
      errors.name = '이름을 입력해주세요.';
    }

    // 이메일 유효성 검사
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if ((formValues.email?.trim() || '').length === 0) {
      errors.email = '이메일을 입력해주세요.';
    } else if (!emailPattern.test(formValues.email?.trim() || '')) {
      errors.email = '유효한 이메일 형식을 입력해 주세요.';
    }

    // 아이디 중복 확인 에러
    if (checkIdErrorMessage) {
      errors.checkLoginId = checkIdErrorMessage;
    }

    // 인증코드 전송 확인 에러
    if (checkEmailMessage) {
      errors.checkEmail = checkEmailMessage;
    }

    // 이메일 인증 확인 에러
    if ((formValues.inputAuthCode?.trim() || '')?.length === 0) {
      errors.inputAuthCode = '인증번호를 입력해주세요.';
    } else if (checkInputCodeMessage) {
      errors.inputAuthCode = checkInputCodeMessage;
    }
    return errors;
  }, [
    formValues,
    checkEmailMessage,
    checkIdErrorMessage,
    checkInputCodeMessage,
  ]);

  const noError = Object.keys(validate).length === 0;

  // 아이디 중복확인
  const { mutate: checkId } = useMutation(CheckId, {
    onSuccess: (res) => {
      // console.log(res);
      if (res.status === STATUS.success) {
        // console.log('성공');
        toast.success(res.message);
        setCheckIdErrorMessage(null);
        setFormValues((prev) => ({
          ...prev,
          sendLoginId: true,
        }));
      }
      if (res.status === STATUS.error) {
        // console.log('실패');
        toast.error(res.message);
        setCheckIdErrorMessage(res.message);
        setFormValues((prev) => ({
          ...prev,
          sendLoginId: false,
        }));
      }
    },
    onError: (error: AxiosError) => {
      toast.error(error.message);
    },
  });

  // 인증번호 발송
  const { mutate: checkEmail, isLoading: checkEmailLoading } = useMutation(
    CheckEmail,
    {
      onSuccess: (res) => {
        if (res.status === STATUS.success) {
          toast.success(res.message);
          setCheckEmailMessage(null);
          setFormValues((prev) => ({
            ...prev,
            sendEmail: true,
          }));
        }
        if (res.status === STATUS.error) {
          toast.error(res.message);
          setCheckEmailMessage(res.message);
          setFormValues((prev) => ({
            ...prev,
            sendEmail: false,
          }));
        }
      },
      onError: (error: AxiosError) => {
        toast.error(error.message);
      },
    },
  );

  // 인증코드 인증
  const { mutate: certificationEmail } = useMutation(
    ({ email, inputAuthCode }: { email: string; inputAuthCode: string }) =>
      CertificationEmail(email, inputAuthCode),
    {
      onSuccess: (res) => {
        if (res.status === STATUS.success) {
          toast.success(res.message);
          setCheckInputcodeMessage(null);
          setFormValues((prev) => ({
            ...prev,
            sendAuthCode: true,
          }));
        }
        if (res.status === STATUS.error) {
          toast.error(res.message);
          setCheckInputcodeMessage(res.message);
          setFormValues((prev) => ({
            ...prev,
            sendAuthCode: false,
          }));
        }
      },
      onError: (error: AxiosError) => {
        toast.error(error.message);
      },
    },
  );

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (formValues.sendEmail && time > 0) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    }

    return () => {
      clearInterval(timer);
    };
  }, [time, formValues.sendEmail]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(
      remainingSeconds,
    ).padStart(2, '0')}`;
  };

  if (checkEmailLoading) {
    // TODO UI 수정
    return <div>...메일 전송중</div>;
  }

  console.log(formValues);
  return (
    <S.UserInfoContainer>
      {pagenation()}
      <TextField
        label="아이디"
        name="loginId"
        placeholder="김동산"
        onChange={handleInfoChange}
        value={formValues.loginId}
        hasError={
          dirty.loginId && Boolean(validate.loginId || validate.checkLoginId)
        }
        onBlur={handleBlur}
        // helpMessage={
        //   validate.loginId ||
        //   validate.checkLoginId ||
        //   '※영문, 숫자를 조합해서 입력해주세요.(6~13자)'
        // }
        rightElement={
          <BaseButton
            size="radius"
            fontSize={1.2}
            $weak={!formValues.sendLoginId}
            style={{
              marginLeft: '8px',
            }}
            onClick={() => {
              if (
                (formValues.loginId?.trim() || '').length !== 0 &&
                !validate.loginId
              ) {
                checkId(formValues.loginId || '');
              }
            }}
          >
            {formValues.sendLoginId ? (
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
      <Message
        hasError={
          dirty.loginId && Boolean(validate.loginId || validate.checkLoginId)
        }
        text={
          validate.loginId ||
          validate.checkLoginId ||
          '※영문, 숫자를 조합해서 입력해주세요.(6~13자)'
        }
      />

      <TextField
        label="비밀번호"
        type="password"
        name="password"
        onBlur={handleBlur}
        value={formValues.password}
        onChange={handleInfoChange}
        hasError={dirty.password && Boolean(validate.password)}
      />
      <Message
        hasError={dirty.password && Boolean(validate.password)}
        text={
          validate.password ||
          '※영문 대/소문자, 숫자, 특수문자를 조합하여 8~16자로 입력해 주세요.'
        }
      />

      <TextField
        label="비밀번호 확인"
        type="password"
        name="checkPassword"
        onBlur={handleBlur}
        value={formValues.checkPassword}
        onChange={handleInfoChange}
        hasError={dirty.checkPassword && Boolean(validate.checkPassword)}
        helpMessage={validate.checkPassword}
      />

      {dirty.checkPassword && Boolean(validate.checkPassword) ? (
        <>
          <Message
            hasError={dirty.checkPassword && Boolean(validate.checkPassword)}
            text={validate.checkPassword || ''}
          />
        </>
      ) : (
        <Spacing size={4.2} />
      )}

      <TextField
        label="이름"
        name="name"
        onBlur={handleBlur}
        value={formValues.name}
        onChange={handleInfoChange}
        hasError={dirty.name && Boolean(validate.name)}
      />

      {dirty.name && Boolean(validate.name) ? (
        <Message
          hasError={dirty.name && Boolean(validate.name)}
          text={validate.name || ''}
        />
      ) : (
        <Spacing size={4.2} />
      )}

      <TextField
        label="이메일"
        name="email"
        onChange={handleInfoChange}
        value={formValues.email}
        hasError={dirty.email && Boolean(validate.email || validate.checkEmail)}
        onBlur={handleBlur}
        bottomElement={
          <Flex
            $justify={
              Boolean(validate.email || validate.checkEmail)
                ? 'space-between'
                : 'end'
            }
            $align="center"
          >
            {dirty.email && Boolean(validate.email || validate.checkEmail) && (
              <Message
                hasError={
                  dirty.email && Boolean(validate.email || validate.checkEmail)
                }
                text={validate.email || validate.checkEmail || ''}
              />
            )}

            {!validate.email && !validate.checkEmail && (
              <BaseButton
                fontSize={1.2}
                size="longRadius"
                $weak={!formValues.sendEmail}
                style={{ marginTop: 8 }}
                onClick={() => {
                  if ((formValues.email || '').length !== 0) {
                    checkEmail(formValues.email || '');
                  }
                }}
              >
                {formValues.sendEmail ? '인증번호 재발송' : '인증번호 발송'}
              </BaseButton>
            )}
          </Flex>
        }
      />

      <Spacing size={dirty.email && Boolean(validate.email) ? 1.7 : 0} />

      {formValues.sendEmail && (
        <>
          <TextField
            label="인증번호"
            name="inputAuthCode"
            value={formValues.inputAuthCode}
            onChange={handleInfoChange}
            placeholder="123456"
            onBlur={handleBlur}
            hasError={dirty.inputAuthCode && Boolean(validate.inputAuthCode)}
            helpMessage={validate.inputAuthCode || validate.checkAuthCode}
            hasFloat={formValues.sendEmail ? formatTime(time) : ''}
            rightElement={
              <BaseButton
                size="radius"
                fontSize={1.2}
                $weak={!formValues.sendAuthCode}
                style={{
                  marginLeft: '8px',
                }}
                onClick={() =>
                  certificationEmail({
                    email: formValues.email || '',
                    inputAuthCode: formValues.inputAuthCode || '',
                  })
                }
              >
                <Flex $align="center" $justify="center" $gap={4}>
                  {formValues.sendAuthCode && time !== 0 && (
                    <Icon name="IconCheck" size={9} />
                  )}
                  <span>인증</span>
                </Flex>
              </BaseButton>
            }
          />
          {dirty.inputAuthCode && Boolean(validate.inputAuthCode) && (
            <Message
              hasError={
                dirty.inputAuthCode &&
                Boolean(validate.inputAuthCode || validate.inputAuthCode)
              }
              text={validate.inputAuthCode || ''}
            />
          )}
        </>
      )}

      <Spacing size={10} />

      <FixedBottomButton
        label="다음"
        onClick={() => {
          clickNext();
          setTime(0);
        }}
        disabled={
          !(
            formValues.sendAuthCode &&
            formValues.sendEmail &&
            formValues.sendLoginId &&
            noError
          )
        }
        // $bottom="5"
      />
    </S.UserInfoContainer>
  );
}

export default UserInfo;
