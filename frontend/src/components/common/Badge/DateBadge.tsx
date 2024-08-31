import * as S from '../../Style/Common/Badge.styled';
import Flex from '../Flex';
import Text from '../Text';

function DateBadge({
  style,
  totalDays,
}: {
  style?: React.CSSProperties;
  totalDays: number;
}) {
  return (
    <S.DateBadgeContainer style={style}>
      <Flex $justify="center" $align="center">
        <Text $typography="t12" color="white">
          {totalDays - 1}박 {totalDays}일
        </Text>
      </Flex>
    </S.DateBadgeContainer>
  );
}

export default DateBadge;
