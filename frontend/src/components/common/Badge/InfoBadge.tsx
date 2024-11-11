import * as S from '../../Style/Common/Badge.styled';
import Flex from '../Flex';
import Icon from '../Icon/Icon';
import Text from '../Text';

function InfoBadge({
  style,
  recruitmentCount,
  recruitedCount,
  likeCount,
}: {
  style?: React.CSSProperties;
  recruitmentCount: number;
  recruitedCount: number;
  likeCount: number;
}) {
  return (
    <S.InfoBadgeContainer style={style}>
      <Flex $gap={4} $align="center">
        <Flex $gap={3.7} $align="center">
          <Icon name="IconMember" width={8.25} height={17} />
          <Text $typography="t12" color="white">
            {recruitedCount}/{recruitmentCount}
          </Text>
        </Flex>
        <Flex $gap={3} $align="center">
          <Icon name="IconHeartWhiteBorder" size={10} />
          {/* <Icon name="IconHeartWhiteFill" size={10} /> */}
          <Text $typography="t12" color="white">
            {likeCount}
          </Text>
        </Flex>
      </Flex>
    </S.InfoBadgeContainer>
  );
}

export default InfoBadge;
