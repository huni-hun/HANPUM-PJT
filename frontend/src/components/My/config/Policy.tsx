import Flex from '@/components/common/Flex';
import Text from '@/components/common/Text';
import { POLICY } from '@/constants';
import { colors } from '@/styles/colorPalette';
import styled from 'styled-components';
import * as S from '../../Style/My/config/ConfigItem.styled';
import { useNavigate } from 'react-router-dom';
import Icon from '@/components/common/Icon/Icon';

function Policy({ param }: { param: string }) {
  const navigate = useNavigate();
  return (
    <S.PolicyContainer>
      {POLICY.map((policy) => (
        <PolicyItem
          key={policy.id}
          onClick={() => navigate(`/config/:${param}/detail/${policy.id}`)}
        >
          <Flex
            $justify="space-between"
            style={{ padding: '20px 24px', width: 'auto' }}
          >
            <Text $typography="t16">{policy.title}</Text>
            <Icon name="IconRightArrowGrey" />
          </Flex>
        </PolicyItem>
      ))}
    </S.PolicyContainer>
  );
}

export default Policy;

const PolicyItem = styled.div`
  width: 100%;
  border-bottom: 1px solid ${colors.grey4};
`;
