import Icon from '../common/Icon/Icon';
import Text from '../common/Text';
import * as S from '../Style/Signup/ProfileConfig.styled';
import img from '../../assets/img/img1.jpg';
import TextField from '../common/TextField/TextField';
import BaseButton from '../common/BaseButton';
import { useAlert } from '@/hooks/global/useAlert';
import CalenderAlert from '../common/Modal/CalenderAlert';
import Calender from './Calender';
import {
  Gender,
  SignupRequestValues,
  UserSignupFormValues,
} from '@/models/signup';
import {
  ChangeEvent,
  Dispatch,
  MouseEvent,
  SetStateAction,
  useMemo,
  useState,
} from 'react';
import { dateFormat, telnumberFormat } from '@/ustils/util';
import { useMutation } from 'react-query';
import { CheckNickname, SignUp } from '@/api/signup/POST';
import { toast } from 'react-toastify';
import { STATUS } from '@/constants';
import { AxiosError } from 'axios';
import FixedBottomButton from '../common/FixedBottomButton';
import Flex from '../common/Flex';
import { signupStepAtom } from '@/atoms/signupStepAtom';
import { useSetRecoilState } from 'recoil';
import { profile } from 'console';

function ProfileConfig({
  pagenation,
  setFormValues,
  formValues,
}: {
  pagenation: () => React.ReactNode;
  setFormValues: Dispatch<SetStateAction<Partial<SignupRequestValues>>>;
  formValues: Partial<UserSignupFormValues>;
}) {
  // const setStep = useSetRecoilState(signupStepAtom);
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
  // const [formValues, setformValues] = useState<Partial<UserSignupFormValues>>(
  //   {
  //     gender: null,
  //     profilePicture: '',
  //     birthDate: '',
  //     phoneNumber: '',
  //   },
  // );

  const [chcekNicknameMessage, setCheckNicknameMessage] = useState<
    string | null
  >(null);

  // console.log(formValues);

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
    // setformValues((prevValue) => ({
    //   ...prevValue,
    //   gender: value,
    // }));

    setFormValues((prevValue) => ({
      ...prevValue,
      gender: value,
    }));
  };

  // 달력
  const handleDate = (birthDate: string) => {
    setFormValues((prevValue) => ({
      ...prevValue,
      birthDate: birthDate,
    }));
  };

  // const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
  //   const { name } = e.target;
  //   setDirty((prev) => ({
  //     ...prev,
  //     [name]: 'true',
  //   }));
  // };

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
      // console.log(res);
      if (res.status === STATUS.success) {
        // console.log('성공');
        toast.success(res.message);
        setCheckNicknameMessage(null);
        setFormValues((prev) => ({
          ...prev,
          sendNickname: true,
        }));
      }
      if (res.status === STATUS.error) {
        // console.log('실패');
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
    if (!nickNamePattern.test(formValues.nickname || '')) {
      errors.nickname = '※특수 문자는 제외해 주세요.(3~8자)';
    }

    if (chcekNicknameMessage) {
      errors.checkNickname = chcekNicknameMessage;
    }

    if (formValues.gender == null) {
      errors.gender = '성별을 선택해주세요.';
    }

    if (formValues.birthDate?.length === 0) {
      errors.birthDate = '생년월일을 선택해주세요.';
    }

    if (formValues.phoneNumber?.length === 0) {
      errors.phoneNumber = '휴대폰번호를 입력해주세요.';
    } else if (formValues.phoneNumber?.length !== 13) {
      errors.phoneNumber = '유효한 휴대폰번호 형식을 입력해 주세요.';
    }

    console.log(errors);

    return errors;
  }, [formValues, chcekNicknameMessage]);

  const noError = Object.keys(validate).length === 0;

  const { mutate } = useMutation(SignUp, {
    onSuccess: (res) => {
      console.log(res);
      if (res.status === STATUS.success) {
        toast.success(res.message);
      }
      if (res.status === STATUS.error) {
        toast.error(res.message);
      }
    },
    onError: (error: AxiosError) => {
      toast.error(error.message);
    },
  });

  const submitTemp = () => {
    // console.log(formValues);
    // console.log('회원가입에 필요한 데이터는', formValues);

    const signupReq: SignupRequestValues = {
      loginId: formValues.loginId || '',
      password: formValues.password || '',
      email: formValues.email || '',
      profilePicture: formValues.profilePicture || '',
      name: '심채운',
      birthDate: formValues.birthDate || '',
      gender: formValues.gender || '',
      phoneNumber: formValues.phoneNumber || '',
      nickname: formValues.nickname || '',
      memberType: 'COMMON',
    };

    mutate({ ...signupReq });
  };

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
        value={formValues.nickname}
        // onBlur={handleBlur}
        onChange={handleInfoChange}
        hasError={Boolean(validate.nickname || validate.checkNickname)}
        helpMessage={
          validate.nickname ||
          validate.checkNickname ||
          '※특수 문자는 제외해 주세요.(3~8자)'
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
        hasError={Boolean(validate.birthDate)}
        helpMessage={validate.birthDate}
      />

      <TextField
        label="전화번호"
        name="phoneNumber"
        placeholder="010-0000-0000"
        onChange={handleInfoChange}
        value={telnumberFormat(formValues.phoneNumber)}
        hasError={Boolean(validate.phoneNumber)}
        helpMessage={validate.phoneNumber}
        // onBlur={handleBlur}
      />

      <FixedBottomButton
        label="회원가입"
        onClick={() => {
          submitTemp();
          // console.log(formValues);
          // const { birthDate, gender, nickname, phoneNumber, profilePicture } =
          //   formValues;

          // const filteredValues: Partial<SignupRequestValues> = {
          //   birthDate,
          //   gender,
          //   nickname,
          //   phoneNumber: phoneNumber?.slice(0, 13),
          //   profilePicture,
          // };
          // clickNext(filteredValues);
        }}
        disabled={!(formValues.sendNickname && noError)}
      />
    </S.ProfileConfigContainer>
  );
}

export default ProfileConfig;
