import Text from '../common/Text';
import * as S from '../Style/My/ProfileItem.styled';
import kakao from '../../assets/img/kakaoImg.png';
import Flex from '../common/Flex';
import { useNavigate } from 'react-router-dom';
import { Dispatch, SetStateAction } from 'react';
import { SignupRequestValues } from '@/models/signup';

function ProfileItem({
  label,
  value,
  param,
}: {
  label: string;
  value: string;
  param?: string;
}) {
  const navigate = useNavigate();
  return (
    <S.ProfileItemContainer className="info-item">
      <Text $typography="t15" color="grey2" style={{ width: '7.7rem' }}>
        {label}
      </Text>

      {label === '소셜로그인' ? (
        <div className="info no-border">
          <div className="kakao">
            <Text $typography="t16">{value}</Text>
            <Flex $align="center" $justify="end">
              <img src={kakao} alt="kakao" />
              <Text $typography="t12">카카오</Text>
            </Flex>
          </div>
        </div>
      ) : (
        <div className="info" onClick={() => navigate(`/myprofile/:${param}`)}>
          {value}
        </div>
      )}
    </S.ProfileItemContainer>
  );
}

export default ProfileItem;
