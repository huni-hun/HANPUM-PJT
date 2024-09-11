import noImage from '../../assets/img/noInterest.png';
import Text from '../common/Text';
import Flex from '../common/Flex';
import BaseButton from '../common/BaseButton';
import * as S from '../Style/My/NoHave.styled';
import { useNavigate } from 'react-router-dom';

function NoHave({ category }: { category: string }) {
  const navigate = useNavigate();
  return (
    <S.NoHaveContainer>
      <img src={noImage} alt="" />
      <Text
        $bold={true}
        $typography="t16"
        color="grey2"
        style={{ marginBottom: '12px' }}
      >
        {category === 'schedule'
          ? '진행중인 일정이 없어요.'
          : '관심있는 모임이 없어요'}
      </Text>
      <Flex direction="column" style={{ textAlign: 'center' }}>
        <Text $typography="t14" color="grey2" style={{ marginBottom: '4px' }}>
          {category === 'schedule'
            ? '관심있는 경로를 등록하고'
            : '모임을 둘러보고'}
        </Text>
        <Text $typography="t14" color="grey2">
          {category === 'schedule'
            ? '일정을 만들어보세요.'
            : '함께하는 일정을 만들어보세요.'}
        </Text>
      </Flex>

      <BaseButton
        size="large"
        style={{ margin: '36px auto 0' }}
        onClick={() => {
          {
            category === 'schedule'
              ? navigate('/schedule/addSchedule')
              : navigate('/meet/list');
          }
        }}
      >
        {category === 'schedule' ? '일정 생성하기' : '모임 둘러보기'}
      </BaseButton>
    </S.NoHaveContainer>
  );
}

export default NoHave;
