import Header from '@/components/common/Header/Header';
import Icon from '@/components/common/Icon/Icon';
import Button from '@/components/common/Button/Button';
import * as R from '@/components/Style/Route/RouteAddCompletePage.styled';
import { useNavigate } from 'react-router-dom';

function MeetAddCompletePage() {
  const navigator = useNavigate();
  return (
    <R.Container>
      <Header
        purpose="result"
        clickBack={() => {
          navigator('/meet/list');
        }}
      />
      <R.MainContainer>
        <Icon name="IconMeetComplete" height={212} width={206} />
        <R.TextBox>
          <R.Text>모임이 생성되었어요!</R.Text>
        </R.TextBox>
      </R.MainContainer>
      <R.BtnContainer>
        <Button
          width={70}
          height={6}
          fc="ffffff"
          bc="#1A823B"
          radius={0.7}
          fontSize={1.6}
          children="확인"
          color="#ffffff"
          onClick={() => {
            navigator('/meet/list');
          }}
          fontWeight="bold"
        />
      </R.BtnContainer>
    </R.Container>
  );
}

export default MeetAddCompletePage;
