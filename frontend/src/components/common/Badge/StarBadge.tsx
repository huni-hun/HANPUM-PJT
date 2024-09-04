import React from 'react';
import Flex from '../Flex';
import Icon from '../Icon/Icon';
import Text from '../Text';

function StarBadge({
  style,
  scoreAvg,
}: {
  style?: React.CSSProperties;
  scoreAvg: number;
}) {
  return (
    <Flex $align="center" $gap={3} style={{ width: 'auto', ...style }}>
      <Icon name="IconStar" />
      <Text $typography="t12" $bold={true} color="white">
        {scoreAvg}
      </Text>
      <Text $typography="t12" color="white" $bold={true}>
        ({Math.floor(scoreAvg)})
      </Text>
    </Flex>
  );
}

export default StarBadge;
