import Icon from '../common/Icon/Icon';
import Text from '../common/Text';
import * as S from '../Style/Signup/ProfileConfig.styled';
import TextField from '../common/TextField/TextField';
import BaseButton from '../common/BaseButton';
import { useAlert } from '@/hooks/global/useAlert';
import Calender from './Calender';
import {
  Gender,
  SignupRequestValues,
  UserSignupFormValues,
} from '@/models/signup';
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useMemo,
  useState,
} from 'react';
import { dateFormat, telnumberFormat } from '@/utils/util';
import { useMutation } from 'react-query';
import { CheckNickname, SignUp } from '@/api/signup/POST';
import { toast } from 'react-toastify';
import { STATUS } from '@/constants';
import { AxiosError } from 'axios';
import FixedBottomButton from '../common/FixedBottomButton';
import Flex from '../common/Flex';
import Message from '../common/Message';
import Spacing from '../common/Spacing';

function ProfileConfig({
  pagenation,
  setFormValues,
  formValues,
  clickNext,
}: {
  pagenation: () => React.ReactNode;
  setFormValues: Dispatch<SetStateAction<Partial<SignupRequestValues>>>;
  formValues: Partial<UserSignupFormValues>;
  clickNext: () => void;
}) {
  const genderList: Gender[] = [
    {
      label: '남성',
      value: 'MAN',
    },
    {
      label: '여성',
      value: 'WOMAN',
    },
    {
      label: '기타',
      value: 'OTHER',
    },
  ];
  const { open } = useAlert();

  const [dirty, setDirty] = useState<
    Partial<Record<keyof UserSignupFormValues, boolean>>
  >({});

  // console.log('dirty :::', dirty);

  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const [chcekNicknameMessage, setCheckNicknameMessage] = useState<
    string | null
  >(null);

  // 프로필 이미지
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // const reader = new FileReader();
      // reader.onloadend = () => {
      //   setPreviewImage(reader.result as string);
      // };
      // reader.readAsDataURL(file);
      const blob = new Blob([file], { type: file.type });

      const imageUrl = URL.createObjectURL(blob);
      setPreviewImage(imageUrl);

      // const blob = file;

      console.log(typeof blob);

      setFormValues((prevValue) => ({
        ...prevValue,
        multipartFile: blob,
      }));
    }
  };

  const handleInfoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;

    setFormValues((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  // console.log('formValues :::', formValues);

  // gender
  const handleClickGender = (value: string) => {
    setFormValues((prevValue) => ({
      ...prevValue,
      gender: value,
    }));

    if (!dirty.gender) {
      setDirty((prev) => ({ ...prev, gender: true }));
    }
  };

  // birthDate
  const handleDate = (birthDate: string) => {
    setFormValues((prevValue) => ({
      ...prevValue,
      birthDate: birthDate,
    }));

    if (!dirty.birthDate) {
      setDirty((prev) => ({ ...prev, birthDate: true }));
    }
  };

  const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setDirty((prev) => ({
      ...prev,
      [name]: 'true',
    }));
  };

  const handleClickAlert = () => {
    open({
      purpose: 'calender',
      onButtonClick: (cancel?: boolean) => {
        // console.log(cancel);
        if (cancel) {
          console.log('취소');
          setFormValues((prev) => ({
            ...prev,
            birthDate: '',
          }));
        }
      },
      element: <Calender onChange={handleDate} />,
    });
  };

  const { mutate: checkNickname } = useMutation(CheckNickname, {
    onSuccess: (res) => {
      if (res.status === STATUS.success) {
        toast.success(res.message);
        setCheckNicknameMessage(null);
        setFormValues((prev) => ({
          ...prev,
          sendNickname: true,
        }));
      }
      if (res.status === STATUS.error) {
        toast.error(res.message);
        setCheckNicknameMessage(res.message);
        setFormValues((prev) => ({
          ...prev,
          sendNickname: false,
        }));
      }
    },
    onError: (error: AxiosError) => {
      toast.error(error.message);
    },
  });

  const validate = useMemo(() => {
    let errors: Partial<UserSignupFormValues> = {};

    const nickNamePattern = /^[가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9]{3,8}$/;
    if (!nickNamePattern.test(formValues.nickname?.trim() || '')) {
      errors.nickname = '※특수 문자는 제외해 주세요.(3~8자)';
    }

    if (chcekNicknameMessage) {
      errors.checkNickname = chcekNicknameMessage;
    }

    if (formValues.gender == null) {
      errors.gender = '성별을 선택해주세요.';
    }

    if (formValues.birthDate?.trim().length === 0) {
      errors.birthDate = '생년월일을 선택해주세요.';
    }

    if (formValues.phoneNumber?.trim().length === 0) {
      errors.phoneNumber = '휴대폰번호를 입력해주세요.';
    } else if (formValues.phoneNumber?.trim().length !== 13) {
      errors.phoneNumber = '유효한 휴대폰번호 형식을 입력해 주세요.';
    }

    return errors;
  }, [formValues, chcekNicknameMessage]);

  const noError = Object.keys(validate).length === 0;

  const { mutate } = useMutation(SignUp, {
    onSuccess: (res) => {
      console.log(res);
      // if (res.status === STATUS.success) {
      //   toast.success(res.message);
      //   clickNext();
      // }
      // if (res.status === STATUS.error) {
      //   toast.error(res.message);
      // }
    },
    onError: (error: AxiosError) => {
      toast.error(error.message);
    },
  });

  const submitTemp = () => {
    const signupReq: SignupRequestValues = {
      loginId: formValues.loginId || '',
      password: formValues.password || '',
      email: formValues.email || '',
      multipartFile: formValues.multipartFile || '',
      name: formValues.name || '',
      birthDate: formValues.birthDate || '',
      gender: formValues.gender || '',
      phoneNumber: formValues.phoneNumber || '',
      nickname: formValues.nickname || '',
      memberType: 'COMMON',
    };

    mutate({ ...signupReq });
  };

  // console.log(formValues);

  return (
    <S.ProfileConfigContainer>
      {pagenation()}
      <div className="profile">
        <Text $typography="t16" $bold={true}>
          프로필 이미지
        </Text>
        <div className="profile-prev_img">
          {previewImage && (
            <img src={previewImage} alt="프로필 이미지 미리보기" />
          )}
        </div>

        <div className="profile-icon_box">
          <input type="file" accept="image/*" onChange={handleImageChange} />
          <Icon name="IconCamera" size={19} />
        </div>
      </div>

      <TextField
        label="닉네임"
        name="nickname"
        value={formValues.nickname}
        onBlur={handleBlur}
        onChange={handleInfoChange}
        hasError={
          dirty.nickname && Boolean(validate.nickname || validate.checkNickname)
        }
        rightElement={
          <BaseButton
            size="radius"
            fontSize={1.2}
            $weak={!formValues.sendNickname}
            style={{ marginLeft: '8px' }}
            onClick={() => {
              if (formValues.nickname?.length !== 0) {
                checkNickname(formValues.nickname as string);
              }
            }}
          >
            {formValues.sendNickname ? (
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
          dirty.nickname && Boolean(validate.nickname || validate.checkNickname)
        }
        text={
          validate.nickname ||
          validate.checkNickname ||
          '※특수 문자는 제외해 주세요.(3~8자)'
        }
      />

      <div className="gender">
        <Text $typography="t12" display="block" $bold={true}>
          성별
        </Text>
        <div className="gender_list">
          {genderList.map((gender) => (
            <div
              className={`gender_list-item ${formValues.gender === gender.value ? 'active' : ''}`}
              key={gender.value}
              onClick={() => handleClickGender(gender.value)}
            >
              {gender.label}
            </div>
          ))}
        </div>
      </div>

      <TextField
        label="생년월일"
        name="birthDate"
        value={dateFormat(formValues.birthDate) || ''}
        readOnly
        placeholder="1999-01-21"
        onClick={handleClickAlert}
        hasFloat={
          <Icon
            name="IconSignupCalender"
            size={21}
            onClick={handleClickAlert}
          />
        }
        hasError={dirty.birthDate && Boolean(validate.birthDate)}
        helpMessage={validate.birthDate}
      />

      {dirty.birthDate && Boolean(validate.birthDate) ? (
        <Message
          hasError={Boolean(validate.birthDate)}
          text={validate.birthDate || ''}
        />
      ) : (
        <Spacing size={4.2} />
      )}

      <TextField
        label="전화번호"
        name="phoneNumber"
        placeholder="010-0000-0000"
        onChange={handleInfoChange}
        maxLength={13}
        value={telnumberFormat(formValues.phoneNumber)}
        hasError={dirty.phoneNumber && Boolean(validate.phoneNumber)}
        onBlur={handleBlur}
      />

      {dirty.phoneNumber && Boolean(validate.phoneNumber) ? (
        <Message
          hasError={Boolean(validate.phoneNumber)}
          text={validate.phoneNumber || ''}
        />
      ) : (
        <Spacing size={4.2} />
      )}

      <FixedBottomButton
        label="확인"
        onClick={() => {
          submitTemp();
        }}
        disabled={!(formValues.sendNickname && noError)}
      />
    </S.ProfileConfigContainer>
  );
}

export default ProfileConfig;
