import noImage from '@/assets/img/noInterest.png';
import Text from '@/components/common/Text';
import Flex from '@/components/common/Flex';
import BaseButton from '@/components/common/BaseButton';
import * as S from '@/components/Style/My/NoHave.styled';
import { useNavigate } from 'react-router-dom';

function MyRouteNoHave({ category }: { category: string }) {
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
        {category === 'my' ? '내 경로가 없어요.' : '사용한 경로가 없어요'}
      </Text>
      <Flex direction="column" style={{ textAlign: 'center' }}>
        <Text $typography="t14" color="grey2" style={{ marginBottom: '4px' }}>
          {category === 'my' ? '내 경로를 등록하고' : '경로를 둘러보고'}
        </Text>
        <Text $typography="t14" color="grey2">
          {category === 'my' ? '일정을 만들어보세요.' : '일정을 만들어보세요.'}
        </Text>
      </Flex>

      <BaseButton
        size="large"
        style={{ margin: '36px auto 0' }}
        onClick={() => {
          {
            category === 'my'
              ? navigate('/route/addMain')
              : navigate('/route/list');
          }
        }}
      >
        {category === 'my' ? '경로 생성하기' : '경로 둘러보기'}
      </BaseButton>
    </S.NoHaveContainer>
  );
}

export default MyRouteNoHave;
