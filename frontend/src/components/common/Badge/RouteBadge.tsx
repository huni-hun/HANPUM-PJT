import * as S from '../../Style/Common/Badge.styled';
import Icon from '../Icon/Icon';
import Text from '../Text';

function RouteBadge({
  style,
  startPoint,
  endPoint,
  totalDistance,
}: {
  style?: React.CSSProperties;
  startPoint: string;
  endPoint: string;
  totalDistance: number;
}) {
  return (
    <S.RouteBadgeContainer style={style}>
      <Text $typography="t10" color="white">
        {startPoint}
      </Text>
      <Icon name="IconArrowWhite" />
      <Text $typography="t10" color="white">
        {endPoint}
      </Text>
      <div className="line" />
      <Text $typography="t10" color="white">
        {Math.floor(totalDistance)}km
      </Text>
    </S.RouteBadgeContainer>
  );
}

export default RouteBadge;
