import * as S from '../../Style/My/edit/ProfileItem.styled';
import kakao from '../../../assets/img/kakaoImg.png';
import { useNavigate } from 'react-router-dom';
import { Dispatch, SetStateAction } from 'react';
import { SignupRequestValues } from '@/models/signup';
import Text from '@/components/common/Text';
import Flex from '@/components/common/Flex';
import Icon from '@/components/common/Icon/Icon';

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
  console.log(label);
  const navigate = useNavigate();
  return (
    <S.ProfileItemContainer className="info-item">
      <Text $typography="t15" color="grey2" style={{ width: '7.7rem' }}>
        {label}
      </Text>

      <div className="info">
        <div className="info-box">
          <Text $typography="t16" style={{ flex: 1 }}>
            {value}
          </Text>
          {memberType === 'KAKAO' && (
            <Flex $align="center">
              <img src={kakao} alt="kakao" />
              <Text $typography="t12">카카오 연동계정</Text>
            </Flex>
          )}

          {label !== '이메일' && (
            <Icon
              name="IconRetouch"
              size={12}
              onClick={() => {
                if (param !== 'email') {
                  navigate(`/myprofile/:${param}`);
                }
              }}
            />
          )}
        </div>
      </div>
    </S.ProfileItemContainer>
  );
}

export default ProfileItem;
