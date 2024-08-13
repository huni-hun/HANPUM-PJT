import Icon from '../common/Icon/Icon';
import Text from '../common/Text';
import * as S from '../Style/Signup/ProfileConfig.styled';
import img from '../../assets/img/img1.jpg';
import TextField from '../common/TextField/TextField';
import BaseButton from '../common/BaseButton';
import { useAlert } from '@/hooks/global/useAlert';
import CalenderAlert from '../common/Modal/CalenderAlert';
import Calender from './Calender';

function ProfileConfig({ pagenation }: { pagenation: () => React.ReactNode }) {
  const { open } = useAlert();

  const handleClick = () => {
    open({
      purpose: 'calender',
      onButtonClick: () => {
        // console.log('버튼이 클릭되었습니다.');
      },
      element: <Calender />,
    });
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
        name="nickName"
        // onChange={handleInfoChange}
        // value={infoValue.loginId}
        // hasError={
        //   Boolean(dirty.loginId) &&
        //   (Boolean(validate.loginId) || Boolean(infoValidate.checkId))
        // }
        // helpMessage={
        //   Boolean(dirty.loginId) && (validate.loginId || infoValidate.checkId)
        //     ? validate.loginId || infoValidate.checkId
        //     : '※영문, 숫자를 조합해서 입력해주세요.(6~13자)'
        // }
        // onBlur={handleBlur}
        helpMessage="※특수 문자는 제외해 주세요.(3~8자)"
        rightElement={
          <BaseButton
            size="radius"
            fontSize={1.2}
            // $weak={!isSend.checkId as boolean}
            style={{
              marginLeft: '8px',
            }}
            // onClick={() => {
            //   if (infoValue.loginId.length !== 0) {
            //     checkId(infoValue.loginId);
            //   }
            // }}
          >
            {/* {isSend.checkId ? (
              <Flex $align="center" $gap={4} $justify="center">
                중복확인
                <Icon name="IconCheck" size={9} />
              </Flex>
            ) : (
              '중복확인'
            )} */}
            중복확인
          </BaseButton>
        }
      />

      <div className="gender">
        <Text $typography="t12" display="block" $bold={true}>
          성별
        </Text>
        <div className="gender_list">
          <div className="gender_list-item">남성</div>
          <div className="gender_list-item active">여성</div>
          <div className="gender_list-item">기타</div>
        </div>
      </div>

      <TextField
        label="생년월일"
        name="birthDay"
        readOnly={true}
        placeholder="1999-01-21"
        helpMessage="생년월일을 선택해주세요."
        onClick={handleClick}
        hasFloat={
          <Icon name="IconSignupCalender" size={21} onClick={handleClick} />
        }
      />

      <TextField
        label="전화번호"
        name="tel"
        placeholder="010-0000-0000"
        helpMessage="전화번호를 입력해주세요."
      />
    </S.ProfileConfigContainer>
  );
}

export default ProfileConfig;
