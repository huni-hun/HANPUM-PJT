import Text from '@/components/common/Text';
import styled from 'styled-components';
import HotMeet from '../../components/Meet/HotMeet';

function MeetPage() {
  return (
    <MeetPageContainer>
      <Text typography="t20">지금 가장 인기 있는 모임</Text>
      <HotMeet />
    </MeetPageContainer>
  );
}

export default MeetPage;

const MeetPageContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 16px;
  margin-top: 24px;
  box-sizing: border-box;
`;
