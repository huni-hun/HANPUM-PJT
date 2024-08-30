import { useMutation } from 'react-query';
import FixedBottomButton from '../common/FixedBottomButton';
import Message from '../common/Message';
import Text from '../common/Text';
import TextField from '../common/TextField/TextField';
import * as S from '../Style/Auth/FindId.styled';
import { FindId } from '@/api/signup/GET';
import { STATUS } from '@/constants';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { UserSignupFormValues } from '@/models/signup';
import Flex from '../common/Flex';
import BaseButton from '../common/BaseButton';
import { CertificationEmail } from '@/api/signup/POST';
import Icon from '../common/Icon/Icon';

function FindPwComponent({
  param,
  certificationFindPw,
  sendMail,
  isLoading,
  setStep,
}: {
  param: string;
  certificationFindPw: ({
    loginId,
    email,
  }: {
    loginId: string;
    email: string;
  }) => void;
  sendMail: boolean;
  isLoading: boolean;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [findPwReq, setFindPwReq] = useState({
    loginId: '',
    email: '',
  });

  const [checkInputCodeMessage, setCheckInputcodeMessage] = useState<
    string | null
  >(null);

  const [sendAuthCode, setSendAuthCode] = useState(false);

  const [inputAuthCode, setInputAuthCode] = useState('');

  const [time, setTime] = useState(300);

  const handlePwReq = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFindPwReq((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const handleInputAuthCode = (e: ChangeEvent<HTMLInputElement>) => {
    setInputAuthCode(e.target.value);
  };

  const [dirty, setDirty] = useState<
    Partial<Record<keyof UserSignupFormValues, boolean>>
  >({});

  const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setDirty((prev) => ({
      ...prev,
      [name]: 'true',
    }));
  };

  // 인증코드 인증
  const { mutate: certificationEmail } = useMutation(
    ({ email, inputAuthCode }: { email: string; inputAuthCode: string }) =>
      CertificationEmail(email, inputAuthCode),
    {
      onSuccess: (res) => {
        if (res.status === STATUS.success) {
          toast.success(res.message);
          setCheckInputcodeMessage(null);
          setSendAuthCode(true);
        }
        if (res.status === STATUS.error) {
          toast.error(res.message);
          setCheckInputcodeMessage(res.message);
          setSendAuthCode(false);
        }
      },
      onError: (error: AxiosError) => {
        toast.error(error.message);
      },
    },
  );

  const validate = useMemo(() => {
    let errors: Partial<UserSignupFormValues> = {};

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if ((findPwReq.email?.trim() || '').length === 0) {
      errors.email = '이메일을 입력해주세요.';
    } else if (!emailPattern.test(findPwReq.email?.trim() || '')) {
      errors.email = '유효한 이메일 형식을 입력해 주세요.';
    }

    const loginIdPattern = /^[a-zA-Z0-9]{6,13}$/;
    if (!loginIdPattern.test(findPwReq.loginId?.trim() || '')) {
      errors.loginId = '※영문과 숫자를 조합하여 6~13자로 입력해 주세요.';
    }

    if ((inputAuthCode?.trim() || '')?.length === 0) {
      errors.inputAuthCode = '인증번호를 입력해주세요.';
    } else if (checkInputCodeMessage) {
      errors.inputAuthCode = checkInputCodeMessage;
    }

    return errors;
  }, [findPwReq, inputAuthCode, checkInputCodeMessage]);

  const noError = Object.keys(validate).length === 0;

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(
      remainingSeconds,
    ).padStart(2, '0')}`;
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (sendMail && time > 0) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    }

    return () => {
      clearInterval(timer);
    };
  }, [time, sendMail]);

  if (isLoading) {
    return <div>메일 전송중...</div>;
  }

  return (
    <S.FindContainer>
      <div className="form-container">
        <Text $typography="t20" $bold={true} style={{ margin: '16px 0px' }}>
          비밀번호 찾기
        </Text>
        <Text $typography="t14" style={{ marginBottom: '24px' }}>
          가입한 계정 정보를 입력해주세요
        </Text>

        <TextField
          label={'아이디'}
          name={'loginId'}
          placeholder="김동산"
          onChange={handlePwReq}
          value={findPwReq.loginId}
          onBlur={handleBlur}
          hasError={
            param === 'id'
              ? dirty.name && Boolean(validate.name)
              : dirty.loginId && Boolean(validate.loginId)
          }
        />
        {param === 'id' ? (
          <Message
            hasError={dirty.name && Boolean(validate.name)}
            text={dirty.name ? validate.name || '' : ''}
          />
        ) : (
          <Message
            hasError={dirty.loginId && Boolean(validate.loginId)}
            text={dirty.loginId ? validate.loginId || '' : ''}
          />
        )}

        <TextField
          label="이메일"
          name="email"
          onChange={handlePwReq}
          value={findPwReq.email}
          hasError={
            dirty.email && Boolean(validate.email || validate.checkEmail)
          }
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
              {dirty.email &&
                Boolean(validate.email || validate.checkEmail) && (
                  <Message
                    hasError={
                      dirty.email &&
                      Boolean(validate.email || validate.checkEmail)
                    }
                    text={validate.email || validate.checkEmail || ''}
                  />
                )}

              {!validate.email && !validate.checkEmail && (
                <BaseButton
                  fontSize={1.2}
                  size="longRadius"
                  $weak={!sendMail}
                  style={{ marginTop: 8 }}
                  onClick={() => {
                    if ((findPwReq.email || '').length !== 0) {
                      certificationFindPw({
                        loginId: findPwReq.loginId,
                        email: findPwReq.email,
                      });
                    }
                  }}
                >
                  {sendMail ? '인증번호 재발송' : '인증번호 발송'}
                </BaseButton>
              )}
            </Flex>
          }
        />

        {sendMail && (
          <>
            <TextField
              label="인증번호"
              name="inputAuthCode"
              value={inputAuthCode}
              onChange={handleInputAuthCode}
              placeholder="123456"
              onBlur={handleBlur}
              hasError={dirty.inputAuthCode && Boolean(validate.inputAuthCode)}
              helpMessage={validate.inputAuthCode || validate.checkAuthCode}
              hasFloat={sendMail ? formatTime(time) : ''}
              rightElement={
                <BaseButton
                  size="radius"
                  fontSize={1.2}
                  $weak={!sendAuthCode}
                  style={{
                    marginLeft: '8px',
                  }}
                  onClick={() =>
                    certificationEmail({
                      email: findPwReq.email,
                      inputAuthCode: inputAuthCode,
                    })
                  }
                >
                  <Flex $align="center" $justify="center" $gap={4}>
                    {sendAuthCode && time !== 0 && (
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
      </div>
      <FixedBottomButton
        label={'다음'}
        onClick={() => {
          setStep(1);
        }}
        disabled={!noError}
      />
    </S.FindContainer>
  );
}

export default FindPwComponent;
