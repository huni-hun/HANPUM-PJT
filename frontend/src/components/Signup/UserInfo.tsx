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
  // const setStep = useSetRecoilState(signupStepAtom);

  // 회원 정보에만 있는 state
  // const [infoValues, setInfoValues] = useState<Partial<UserSignupFormValues>>(
  //   {},
  // );

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
  // const [dirty, setDirty] = useState<
  //   Partial<Record<keyof SignupRequestValues, boolean>>
  // >({});

  // 아이디, 이메일 중복확인 상태
  // const [infoValidate, setInfoValidate] = useState<
  //   Partial<CertificationValidate>
  // >({
  //   checkId: '',
  //   checkEmail: '',
  // });

  // TODO checked랑 message로 타입 수정 terms 처럼
  // const [isSend, setIsSend] = useState<Partial<CertificationValidate>>({
  //   checkId: false,
  //   checkEmail: false,
  //   checkComplete: false,
  // });

  const [time, setTime] = useState(300);

  // const [isComplete, setIsComplete] = useState(false);

  const handleInfoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormValues((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  // const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
  // const { name } = e.target;
  // setDirty((prev) => ({
  //   ...prev,
  //   [name]: 'true',
  // }));
  // };

  // TODO ValidateMessage로 타입 수정
  // 인증 및 필드 유효성 검사
  // console.log('formValues ::', formValues);
  const validate = useMemo(() => {
    let errors: Partial<UserSignupFormValues> = {};

    // 아이디 유효성 검사
    const loginIdPattern = /^[a-zA-Z0-9]{6,13}$/;
    if (!loginIdPattern.test(formValues.loginId || '')) {
      errors.loginId = '※영문과 숫자를 조합하여 6~13자로 입력해 주세요.';
    }

    // 비밀번호 유효성 검사
    const passwordPattern =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/;
    if (!passwordPattern.test(formValues.password || '')) {
      errors.password =
        '※영문 대/소문자, 숫자, 특수문자를 조합하여 8~16자로 입력해 주세요.';
    }

    // 비밀번호 확인
    if ((formValues.checkPassword || '').length === 0) {
      errors.checkPassword = '비밀번호를 입력해주세요.';
    } else if (formValues.password !== formValues.checkPassword) {
      errors.checkPassword = '비밀번호가 일치하지 않습니다.';
    }

    // 이메일 유효성 검사
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formValues.email || '')) {
      errors.email = '유효한 이메일 형식을 입력해 주세요.';
    }

    // 아이디 중복 확인 에러
    if (checkIdErrorMessage) {
      errors.checkLoginId = checkIdErrorMessage;
    }

    if (checkEmailMessage) {
      errors.checkEmail = checkEmailMessage;
    }

    if ((formValues.inputAuthCode || '')?.length === 0) {
      errors.inputAuthCode = '인증번호를 입력해주세요.';
    } else if (checkInputCodeMessage) {
      errors.inputAuthCode = checkInputCodeMessage;
    }

    // if (!infoValue.inputAuthCode) {
    //   errors.inputAuthCode = '인증번호를 입력해 주세요.';
    // }
    // console.log('errors::', errors);
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
        // console.log(res);
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
        // console.log(res);
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

  // console.log('values :::', formValues);

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

  // console.log(time);

  if (checkEmailLoading) {
    // TODO UI 수정
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
        value={formValues.loginId}
        hasError={Boolean(validate.loginId || validate.checkLoginId)}
        helpMessage={
          validate.loginId ||
          validate.checkLoginId ||
          '※영문, 숫자를 조합해서 입력해주세요.(6~13자)'
        }
        rightElement={
          <BaseButton
            size="radius"
            fontSize={1.2}
            $weak={!formValues.sendLoginId}
            style={{
              marginLeft: '8px',
            }}
            onClick={() => {
              //TODO 글자 수 검사
              if ((formValues.loginId || '').length !== 0) {
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

      <TextField
        label="비밀번호"
        type="password"
        name="password"
        value={formValues.password}
        onChange={handleInfoChange}
        hasError={Boolean(validate.password)}
        helpMessage={
          validate.password ||
          '※영문 대/소문자, 숫자, 특수문자를 조합하여 8~16자로 입력해 주세요.'
        }
      />

      <TextField
        label="비밀번호 확인"
        type="password"
        name="checkPassword"
        value={formValues.checkPassword}
        onChange={handleInfoChange}
        hasError={Boolean(validate.checkPassword)}
        helpMessage={validate.checkPassword}
      />

      {/* <Spacing size={4.2} /> */}

      <TextField
        label="이메일"
        name="email"
        onChange={handleInfoChange}
        value={formValues.email}
        hasError={Boolean(validate.email || validate.checkEmail)}
        helpMessage={validate.email || validate.checkEmail}
        bottomElement={
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
        }
      />

      <TextField
        label="인증번호"
        name="inputAuthCode"
        value={formValues.inputAuthCode}
        onChange={handleInfoChange}
        placeholder="123456"
        hasError={Boolean(validate.inputAuthCode || validate.checkAuthCode)}
        helpMessage={validate.inputAuthCode || validate.checkAuthCode}
        hasFloat={formValues.sendAuthCode ? formatTime(time) : ''}
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
