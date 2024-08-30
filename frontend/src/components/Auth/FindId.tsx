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
import { ChangeEvent, Dispatch, useMemo, useState } from 'react';
import { UserSignupFormValues } from '@/models/signup';

function FindIdComponent({
  param,
  findId,
}: {
  param: string;
  findId: (data: { name: string; email: string }) => void;
}) {
  const [findIdReq, setFindIdReq] = useState({
    name: '',
    email: '',
  });

  const handleIdReq = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFindIdReq((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
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

  const validate = useMemo(() => {
    let errors: Partial<UserSignupFormValues> = {};

    if ((findIdReq.name?.trim() || '').length === 0) {
      errors.name = '이름을 입력해주세요.';
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if ((findIdReq.email?.trim() || '').length === 0) {
      errors.email = '이메일을 입력해주세요.';
    } else if (!emailPattern.test(findIdReq.email?.trim() || '')) {
      errors.email = '유효한 이메일 형식을 입력해 주세요.';
    }

    return errors;
  }, [findIdReq, param]);

  const noError = Object.keys(validate).length === 0;

  return (
    <S.FindContainer>
      <div className="form-container">
        <Text $typography="t20" $bold={true} style={{ margin: '16px 0px' }}>
          아이디 찾기
        </Text>
        <Text $typography="t14" style={{ marginBottom: '24px' }}>
          가입한 계정 정보를 입력해주세요
        </Text>

        <TextField
          label={'이름'}
          name={'name'}
          placeholder="김동산"
          onChange={handleIdReq}
          value={findIdReq.name}
          onBlur={handleBlur}
          hasError={dirty.name && Boolean(validate.name)}
        />
        <Message
          hasError={dirty.name && Boolean(validate.name)}
          text={dirty.name ? validate.name || '' : ''}
        />

        <TextField
          label="이메일"
          name="email"
          placeholder="123456@naver.com"
          onChange={handleIdReq}
          value={findIdReq.email}
          onBlur={handleBlur}
          hasError={dirty.email && Boolean(validate.email)}
        />
        <Message
          hasError={dirty.email && Boolean(validate.email)}
          text={dirty.email ? validate.email || '' : ''}
        />
      </div>
      <FixedBottomButton
        size="large"
        full={false}
        label={'다음'}
        onClick={() => {
          findId({
            name: findIdReq.name,
            email: findIdReq.email,
          });
        }}
        disabled={!noError}
      />
    </S.FindContainer>
  );
}

export default FindIdComponent;
