import noImage from '../../assets/img/noInterest.png';
import Text from '../common/Text';
import Flex from '../common/Flex';
import BaseButton from '../common/BaseButton';
import * as S from '../Style/My/NoHave.styled';
import { useNavigate, useLocation } from 'react-router-dom';

function MeetNoHave({ category }: { category?: string }) {
  const getMessage = () => {
    switch (category) {
      case 'requestList':
        return '신청 인원이 없습니다.';
      case 'memberList':
        return '인원이 없습니다.';
      case 'tabMemberList':
        return '해당 모임에 허가되지 않은 접근입니다.';
      default:
        return '데이터가 없습니다.';
    }
  };

  return (
    <S.NoHaveContainer
      marginTop={category === 'tabMemberList' ? '50px' : '144px'}
    >
      <img src={noImage} alt="" />
      <Text
        $bold={true}
        $typography="t16"
        color="grey2"
        style={{ marginBottom: '12px' }}
      >
        {getMessage()}
      </Text>
      <Flex direction="column" style={{ textAlign: 'center' }}>
        {category !== 'tabMemberList' && (
          <Text $typography="t14" color="grey2" style={{ marginBottom: '4px' }}>
            조금 더 기다려볼까요?
          </Text>
        )}
      </Flex>
    </S.NoHaveContainer>
  );
}

export default MeetNoHave;
