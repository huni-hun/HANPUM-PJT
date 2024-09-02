import Flex from '@/components/common/Flex';
import * as S from '../../Style/My/config/ConfigItem.styled';
import Text from '@/components/common/Text';
import Icon from '@/components/common/Icon/Icon';
import { useNavigate } from 'react-router-dom';

function ConfigItem({ label, url }: { label: string; url: string }) {
  const navigate = useNavigate();
  return (
    <S.ConfigItemContainer onClick={() => navigate(url)}>
      <Flex $justify="space-between">
        <Text $typography="t16">{label}</Text>
        <Icon name="IconRightArrowGrey" />
      </Flex>
    </S.ConfigItemContainer>
  );
}

export default ConfigItem;
