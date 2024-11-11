import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useMemo,
  useState,
} from 'react';
import Cookies from 'js-cookie';

import * as S from '../Style/Signup/ProfileConfig.styled';
import Icon from '@common/Icon/Icon';
import Text from '@common/Text';
import TextField from '@common/TextField/TextField';
import BaseButton from '@common/BaseButton';
import { useAlert } from '@hooks/global/useAlert';
import Calender from './Calender';
import { SignupRequestValues, UserSignupFormValues } from '@models/signup';
import { convertImageToFile, dateFormat, telnumberFormat } from '@utils/util';
import { useMutation } from 'react-query';
import { CheckNickname, KaKaoLogin, SignUp } from '@/api/signup/POST';
import { toast } from 'react-toastify';
import { genderList, SIZEMB, STATUS } from '@constants';
import { AxiosError } from 'axios';
import FixedBottomButton from '@common/FixedBottomButton';
import Flex from '@common/Flex';
import Message from '@common/Message';
import Spacing from '@common/Spacing';
import { useSetRecoilState } from 'recoil';
import { signupStepAtom } from '@/atoms/signupStepAtom';
import useImageCompression from '@/hooks/global/useImageCompression';
import { isAuthEnticatedAtom } from '@/atoms/isAuthEnticatedAtom';
import defaultImg from '@imgs/default.png';

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
  const { open } = useAlert();
  const { compressImage, compressedImage } = useImageCompression();

  const setStep = useSetRecoilState(signupStepAtom);

  const [dirty, setDirty] = useState<
    Partial<Record<keyof UserSignupFormValues, boolean>>
  >({});

  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const [chcekNicknameMessage, setCheckNicknameMessage] = useState<
    string | null
  >(null);

  // 프로필 이미지
  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    // console.log(file);
    // const temp = new File([defaultImg], 'default.png', { type: 'image/png' });
    // console.log(defaultImg);
    // console.log(temp);
    if (file) {
      // console.log(
      //   '압축 전 ::',
      //   `${file.size}바이트`,
      //   (file.size / 1024 / 1024).toFixed(2),
      // );
      const compressedFile = (await compressImage(file)) ?? file;
      // console.log(compressedFile);
      // console.log(
      //   '압축 후 ::',
      //   `${compressedFile.size}바이트`,
      //   (compressedFile.size / 1024 / 1024).toFixed(2),
      // );
      const imageUrl = URL.createObjectURL(compressedFile || file);
      setPreviewImage(imageUrl);

      // console.log(file.size, SIZEMB);

      // if (file.size >= SIZEMB) {
      //   console.log('파일커요');
      // }

      setFormValues((prevValue) => ({
        ...prevValue,
        multipartFile: compressedFile || file,
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
        if (cancel) {
          // console.log('취소');
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

    const namePattern = /^[가-힣]+$/;

    // 이름 유효성 검사
    if ((formValues.name?.trim() || '').length === 0) {
      errors.name = '이름을 입력해주세요.';
    } else if (/\s/.test(formValues.name || '')) {
      errors.name = '※빈칸은 사용할 수 없습니다.';
    } else if (!namePattern.test(formValues.name?.trim() || '')) {
      errors.name = '이름은 한글로 자음과 모음을 같이 입력해주세요.';
    }

    const nickNamePattern = /^[가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9]{3,8}$/;
    if (/\s/.test(formValues.nickname || '')) {
      errors.nickname = '※빈칸은 사용할 수 없습니다.';
    } else if (!nickNamePattern.test(formValues.nickname?.trim() || '')) {
      errors.nickname = '※특수 문자는 제외해 주세요.(3~8자)';
    } else if ((formValues.nickname?.trim() || '').length === 0) {
      errors.nickname = '닉네임을 입력해주세요.';
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

  const { mutate: localLogin } = useMutation(SignUp, {
    onSuccess: (res) => {
      // console.log('res ::', res);
      if (res.status === STATUS.success) {
        toast.success(res.message);
        clickNext();
      }
      if (res.status === STATUS.error) {
        toast.error(res.message);
        setStep((prev) => ({
          ...prev,
          currStep: 1,
        }));
      }
    },
    onError: (error: AxiosError) => {
      toast.error(error.message);
    },
  });

  const { mutate: kakaoLogin } = useMutation(KaKaoLogin, {
    onSuccess: (res) => {
      // console.log('res ::', res);
      if (res.status === STATUS.success) {
        toast.success(res.message);
        // console.log(res);
        sessionStorage.setItem('send', 'true');
        clickNext();
      }
      if (res.status === STATUS.error) {
        toast.error(res.message);
      }
    },
    onError: (error: AxiosError) => {
      toast.error(error.message);
    },
  });

  const submitLocal = async () => {
    // const

    const signupReq: SignupRequestValues = {
      loginId: formValues.loginId || '',
      password: formValues.password || '',
      email: formValues.email || '',
      multipartFile:
        formValues.multipartFile || (await convertImageToFile(defaultImg)),
      name: formValues.name || '',
      birthDate: formValues.birthDate || '',
      gender: formValues.gender || '',
      phoneNumber: formValues.phoneNumber || '',
      nickname: formValues.nickname || '',
      memberType: 'COMMON',
    };

    // console.log(signupReq);
    // console.log(signupReq);
    localLogin({ ...signupReq });
  };

  // 카카오 로그인
  const submitKaKao = async () => {
    // console.log('kakao');

    const signupKaKaoReq: Pick<
      SignupRequestValues,
      | 'multipartFile'
      | 'nickname'
      | 'gender'
      | 'phoneNumber'
      | 'birthDate'
      | 'name'
    > = {
      name: formValues.name || '',
      birthDate: formValues.birthDate || '',
      gender: formValues.gender || '',
      nickname: formValues.nickname || '',
      phoneNumber: formValues.phoneNumber || '',
      multipartFile:
        formValues.multipartFile || (await convertImageToFile(defaultImg)),
    };

    kakaoLogin({ ...signupKaKaoReq });
  };

  return (
    <S.ProfileConfigContainer>
      {pagenation()}
      <div className="profile">
        <Text $typography="t16" $bold={true}>
          프로필 이미지
        </Text>
        <div className="profile-prev_img">
          {previewImage ? (
            <img src={previewImage} alt="프로필 이미지 미리보기" />
          ) : (
            <img src={defaultImg} alt="기본 이미지" />
          )}
        </div>

        <div className="profile-icon_box">
          <input type="file" accept="image/*" onChange={handleImageChange} />
          <Icon name="IconCamera" size={19} />
        </div>
      </div>

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
              if (formValues.nickname?.length !== 0 && !validate.nickname) {
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
          // 기존은 쿠키의 memberType으로만 분기 처리하면 카카오로 로그인 한 후에 취소하고 로컬로 하게되면 오류가 생길수 밖에 없음. 쿠키에 이미 있기 때문
          if (Cookies.get('memberType') === 'KAKAO_INCOMPLETE') {
            // console.log('카카오로 ');
            submitKaKao();
          } else {
            submitLocal();
          }
        }}
        disabled={!(formValues.sendNickname && noError)}
      />
    </S.ProfileConfigContainer>
  );
}

export default ProfileConfig;
