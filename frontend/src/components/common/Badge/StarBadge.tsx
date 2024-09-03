import React from 'react';
import Flex from '../Flex';
import Icon from '../Icon/Icon';
import Text from '../Text';

function StarBadge({ style }: { style?: React.CSSProperties }) {
  return (
    <Flex $align="center" $gap={3} style={{ width: 'auto', ...style }}>
      <Icon name="IconStar" />
      <Text $typography="t12" $bold={true} color="white">
        3.5
      </Text>
      <Text $typography="t12" color="white">
        (3)
      </Text>
    </Flex>
  );
}

export default StarBadge;
