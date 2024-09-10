import * as S from '../../Style/My/edit/ProfileItem.styled';
import kakao from '../../../assets/img/kakaoImg.png';
import { useNavigate } from 'react-router-dom';
import { Dispatch, SetStateAction } from 'react';
import { SignupRequestValues } from '@/models/signup';
import Text from '@/components/common/Text';
import Flex from '@/components/common/Flex';

function ProfileItem({
  label,
  value,
  param,
  memberType,
}: {
  label: string;
  value: string;
  param?: string;
  memberType?: string;
}) {
  const navigate = useNavigate();
  const temp = false;
  return (
    <S.ProfileItemContainer className="info-item">
      <Text $typography="t15" color="grey2" style={{ width: '7.7rem' }}>
        {label}
      </Text>

      <div
        className="info"
        onClick={() => {
          if (param !== 'email') {
            navigate(`/myprofile/:${param}`);
          }
        }}
      >
        <div className="kakao">
          <Text $typography="t16">{value}</Text>
          {memberType === 'KAKAO' && (
            <Flex $align="center">
              <img src={kakao} alt="kakao" />
              <Text $typography="t12">카카오 연동계정</Text>
            </Flex>
          )}
          {/* {temp === false && (
            <Flex $align="center">
              <img src={kakao} alt="kakao" />
              <Text $typography="t12">카카오 연동 계정</Text>
            </Flex>
          )} */}
        </div>
      </div>
    </S.ProfileItemContainer>
  );
}

export default ProfileItem;
