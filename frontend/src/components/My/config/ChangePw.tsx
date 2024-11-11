import Header from '@/components/common/Header/Header';
import { useNavigate } from 'react-router-dom';
import * as S from '../../Style/My/config/ConfigItem.styled';
import { ChangeEvent, useMemo, useState } from 'react';
import { ChangePasswordIncludCheckValues } from '@/models/signup';
import { useMutation } from 'react-query';
import { STATUS } from '@/constants';
import { UpdatePassword } from '@/api/mypage/PUT';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import TextField from '@/components/common/TextField/TextField';
import Message from '@/components/common/Message';
import Spacing from '@/components/common/Spacing';
import Flex from '@/components/common/Flex';
import BaseButton from '@/components/common/BaseButton';
import FixedBottomButton from '@/components/common/FixedBottomButton';

function ChangePw() {
  const navigate = useNavigate();

  const [updatePasswordReq, setUpdatePasswordReq] = useState({
    currentPassword: '',
    checkPassword: '',
    updatePassword: '',
  });

  // console.log(updatePasswordReq);

  const handleReqChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setUpdatePasswordReq((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const [dirty, setDirty] = useState<
    Partial<Record<keyof ChangePasswordIncludCheckValues, boolean>>
  >({});

  const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setDirty((prev) => ({
      ...prev,
      [name]: 'true',
    }));
  };

  const validate = useMemo(() => {
    let errors: Partial<ChangePasswordIncludCheckValues> = {};

    // 이전 비밀번호 유효성 검사
    const passwordPattern =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/;
    if (
      !passwordPattern.test(updatePasswordReq.currentPassword?.trim() || '')
    ) {
      errors.currentPassword =
        '※영문 대/소문자, 숫자, 특수문자를 조합하여 8~16자로 입력해 주세요.';
    }

    if (!passwordPattern.test(updatePasswordReq.updatePassword?.trim() || '')) {
      errors.updatePassword =
        '※영문 대/소문자, 숫자, 특수문자를 조합하여 8~16자로 입력해 주세요.';
    } else if (
      updatePasswordReq.updatePassword?.trim() ===
      updatePasswordReq.currentPassword?.trim()
    ) {
      errors.updatePassword = '이전과 비밀번호가 달라야합니다.';
    }

    // 비밀번호 확인
    if ((updatePasswordReq.checkPassword?.trim() || '').length === 0) {
      errors.checkPassword = '비밀번호를 입력해주세요.';
    } else if (
      updatePasswordReq.updatePassword?.trim() !==
      updatePasswordReq.checkPassword?.trim()
    ) {
      errors.checkPassword = '비밀번호가 일치하지 않습니다.';
    }
    // console.log(errors);
    return errors;
  }, [updatePasswordReq]);

  const noError = Object.keys(validate).length === 0;

  const { mutate } = useMutation(
    (passwords: { currentPassword: string; updatePassword: string }) =>
      UpdatePassword(passwords.currentPassword, passwords.updatePassword),
    {
      onSuccess: (res) => {
        if (res.status === STATUS.success) {
          toast.success(res.message);
          navigate('/config');
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

  return (
    <S.ChangePwContainer>
      <TextField
        label="현재 비밀번호"
        type="password"
        name="currentPassword"
        onBlur={handleBlur}
        value={updatePasswordReq.currentPassword}
        onChange={handleReqChange}
        hasError={dirty.currentPassword && Boolean(validate.currentPassword)}
      />

      {dirty.currentPassword && Boolean(validate.currentPassword) ? (
        <>
          <Message
            hasError={
              dirty.currentPassword && Boolean(validate.currentPassword)
            }
            text={validate.updatePassword || ''}
          />
        </>
      ) : (
        <Spacing size={4.2} />
      )}

      <TextField
        label="새 비밀번호"
        type="password"
        name="updatePassword"
        onBlur={handleBlur}
        value={updatePasswordReq.updatePassword}
        onChange={handleReqChange}
        hasError={dirty.updatePassword && Boolean(validate.updatePassword)}
        helpMessage={validate.updatePassword}
      />

      {dirty.updatePassword && Boolean(validate.updatePassword) ? (
        <>
          <Message
            hasError={dirty.updatePassword && Boolean(validate.updatePassword)}
            text={validate.updatePassword || ''}
          />
        </>
      ) : (
        <Spacing size={4.2} />
      )}

      <TextField
        label="새 비밀번호 확인"
        type="password"
        name="checkPassword"
        onBlur={handleBlur}
        value={updatePasswordReq.checkPassword}
        onChange={handleReqChange}
        hasError={dirty.checkPassword && Boolean(validate.checkPassword)}
        helpMessage={validate.checkPassword}
      />

      {dirty.checkPassword && Boolean(validate.checkPassword) && (
        <>
          <Message
            hasError={dirty.checkPassword && Boolean(validate.checkPassword)}
            text={validate.checkPassword || ''}
          />
        </>
      )}

      <FixedBottomButton
        label="변경하기"
        onClick={() => {
          const { currentPassword, updatePassword } = updatePasswordReq;
          mutate({ currentPassword, updatePassword });
        }}
        disabled={!noError}
      />
    </S.ChangePwContainer>
  );
}

export default ChangePw;
