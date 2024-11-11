import Flex from '@/components/common/Flex';
import Text from '@/components/common/Text';
import { ANNOUNCEMENT } from '@/constants';
import { colors } from '@/styles/colorPalette';
import styled from 'styled-components';
import * as S from '../../Style/My/config/ConfigItem.styled';
import { useNavigate } from 'react-router-dom';

function Announcement({ param }: { param: string }) {
  const navigate = useNavigate();
  return (
    <S.AnnouncementContainer>
      {ANNOUNCEMENT.reverse().map((announcement) => (
        <AnnouncmentItem
          key={announcement.id}
          onClick={() =>
            navigate(`/config/:${param}/detail/${announcement.id}`)
          }
        >
          <Flex
            direction="column"
            $gap={4}
            style={{ padding: '20px 24px', width: 'auto' }}
          >
            <Text $typography="t20" $bold={true}>
              {announcement.title}
            </Text>
            <Text $typography="t12" color="grey2">
              {announcement.date}
            </Text>
          </Flex>
        </AnnouncmentItem>
      ))}
    </S.AnnouncementContainer>
  );
}

export default Announcement;

const AnnouncmentItem = styled.div`
  width: 100%;
  border-bottom: 1px solid ${colors.grey4};
`;
