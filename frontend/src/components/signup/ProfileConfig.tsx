import Icon from '../common/Icon/Icon';
import Text from '../common/Text';
import * as S from '../Style/Signup/ProfileConfig.styled';
import img from '../../assets/img/img1.jpg';
import TextField from '../common/TextField/TextField';
import BaseButton from '../common/BaseButton';
import { useAlert } from '@/hooks/global/useAlert';
import CalenderAlert from '../common/Modal/CalenderAlert';
import Calender from './Calender';
import { CertificationValidate, Gender, SignupValues } from '@/models/signup';
import { ChangeEvent, MouseEvent, useMemo, useState } from 'react';
import { dateFormat, telnumberFormat } from '@/ustils/util';
import { useMutation } from 'react-query';
import { CheckNickname } from '@/api/signup/POST';
import { toast } from 'react-toastify';
import { STATUS } from '@/constants';
import { AxiosError } from 'axios';
import FixedBottomButton from '../common/FixedBottomButton';
import Flex from '../common/Flex';

function ProfileConfig({
  pagenation,
  clickNext,
}: {
  pagenation: () => React.ReactNode;
  clickNext: (profileInfo: Partial<SignupValues>) => void;
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

  // 프로필 기본 정보
  const [profileInfo, setProfileInfo] = useState<Partial<SignupValues>>({
    gender: null,
    nickname: '',
    birthDate: '',
    profilePicture: '',
  });

  // 중복 했을 때 메세지 담을 state
  const [infoValidate, setInfoValidate] = useState<
    Partial<CertificationValidate>
  >({
    checkNickname: '',
  });

  // 중복확인 결과
  const [isSend, setIsSend] = useState<Partial<CertificationValidate>>({
    checkNickname: false,
  });

  const [dirty, setDirty] = useState<
    Partial<Record<keyof SignupValues, boolean>>
  >({});

  const handleInfoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;

    setProfileInfo((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  // console.log('profileInfo ::', profileInfo);

  const handleClickGender = (value: string) => {
    setProfileInfo((prevValue) => ({
      ...prevValue,
      gender: value,
    }));

    if (!dirty.gender) {
      setDirty((prev) => ({
        ...prev,
        gender: true,
      }));
    }
  };

  const handleDate = (birthDate: string) => {
    setProfileInfo((prevValue) => ({
      ...prevValue,
      birthDate,
    }));

    if (!dirty.birthDate) {
      setDirty((prev) => ({
        ...prev,
        birthDate: true,
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

  const handleClickAlert = () => {
    open({
      purpose: 'calender',
      onButtonClick: () => {
        // console.log('버튼이 클릭되었습니다.');
      },
      element: <Calender onChange={handleDate} />,
    });
  };

  const { mutate: checkNickname } = useMutation(CheckNickname, {
    onSuccess: (res) => {
      console.log(res);
      if (res.status === STATUS.success) {
        // console.log('성공');
        toast.success(res.message);
        setIsSend((prev) => ({
          ...prev,
          checkNickname: true,
        }));
      }
      if (res.status === STATUS.error) {
        // console.log('실패');
        toast.error(res.message);
        setInfoValidate((prev) => ({
          ...prev,
          checkNickname: res.message,
        }));
      }
    },
    onError: (error: AxiosError) => {
      toast.error(error.message);
    },
  });

  const validate = useMemo(() => {
    let errors: Partial<SignupValues & CertificationValidate> = {};

    const nickNamePattern = /^[a-zA-Z0-9]{3,8}$/;

    if (nickNamePattern.test(profileInfo.nickname as string)) {
      errors.nickname = '※특수 문자는 제외해 주세요.(3~8자)';
    }

    if (profileInfo.gender == null) {
      errors.gender = '성별을 선택해주세요.';
    }

    if (profileInfo.birthDate?.length === 0) {
      errors.gender = '생년월일을 선택해주세요.';
    }

    if (!profileInfo.phoneNumber?.length) {
      errors.phoneNumber = '휴대폰번호를 입력해주세요.';
    } else if (profileInfo.phoneNumber.length > 11) {
      errors.gender = '휴대폰번호는 11자리 입니다.';
    }

    console.log(errors);

    return errors;
  }, []);

  const noError = Object.keys(validate).length === 0;

  console.log(isSend);

  return (
    <S.ProfileConfigContainer>
      {pagenation()}
      <div className="profile">
        <Text $typography="t16" $bold={true}>
          프로필 이미지
        </Text>
        <div className="profile-prev_img">{/* <img src={img} alt="" /> */}</div>

        <div className="profile-icon_box">
          <input type="file" accept="image/*" />
          <Icon name="IconCamera" size={19} />
        </div>
      </div>

      <TextField
        label="닉네임"
        name="nickname"
        value={profileInfo.nickname}
        hasError={Boolean(
          dirty.nickname && (validate.nickname || infoValidate.checkNickname),
        )}
        onBlur={handleBlur}
        onChange={handleInfoChange}
        helpMessage={
          dirty.nickname
            ? validate.nickname || infoValidate.checkNickname
            : '※특수 문자는 제외해 주세요.(3~8자)'
        }
        rightElement={
          <BaseButton
            size="radius"
            fontSize={1.2}
            $weak={!isSend.checkNickname}
            style={{ marginLeft: '8px' }}
            onClick={() => {
              if (profileInfo.nickname?.length !== 0) {
                checkNickname(profileInfo.nickname as string);
              }
            }}
          >
            {isSend.checkNickname ? (
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

      <div className="gender">
        <Text $typography="t12" display="block" $bold={true}>
          성별
        </Text>
        <div className="gender_list">
          {genderList.map((gender) => (
            <div
              className={`gender_list-item ${profileInfo.gender === gender.value ? 'active' : ''}`}
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
        value={dateFormat(profileInfo.birthDate) || ''}
        readOnly
        placeholder="1999-01-21"
        helpMessage="생년월일을 선택해주세요."
        onClick={handleClickAlert}
        hasFloat={
          <Icon
            name="IconSignupCalender"
            size={21}
            onClick={handleClickAlert}
          />
        }
      />

      <TextField
        label="전화번호"
        name="phoneNumber"
        placeholder="010-0000-0000"
        helpMessage="전화번호를 입력해주세요."
        onChange={handleInfoChange}
        onBlur={handleBlur}
        value={telnumberFormat(profileInfo.phoneNumber)}
        hasError={Boolean(dirty.phoneNumber && validate.phoneNumber)}
      />

      <FixedBottomButton
        label="확인"
        onClick={() => {
          if (noError) {
            clickNext(profileInfo);
          }
        }}
        disabled={!noError}
      />
    </S.ProfileConfigContainer>
  );
}

export default ProfileConfig;
