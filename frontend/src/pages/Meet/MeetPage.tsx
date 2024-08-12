import Text from '@/components/common/Text';
import styled from 'styled-components';
import HotMeet from '../../components/Meet/HotMeet';
import Header from '@/components/common/Header/Header';

function MeetPage() {
  return (
    <MeetPageContainer>
      <Header purpose="title" title="임시방편이요" />
      <div className="layout">
        <Text $typography="t20">지금 가장 인기 있는 모임</Text>
        <HotMeet />
      </div>
    </MeetPageContainer>
  );
}

export default MeetPage;

const MeetPageContainer = styled.div`
  width: 100%;
  height: 100%;

  .layout {
    padding: 0 16px;
    margin-top: 24px;
    box-sizing: border-box;
  }
`;
