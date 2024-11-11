import Header from '@/components/common/Header/Header';
import Icon from '@/components/common/Icon/Icon';
import Button from '@/components/common/Button/Button';
import * as R from '@/components/Style/Route/RouteAddCompletePage.styled';
import { useLocation, useNavigate } from 'react-router-dom';

function MeetAddCompletePage() {
  const location = useLocation();
  const { category, groupIdNumber, groupId } = location.state || {};
  const navigator = useNavigate();

  const getMessage = () => {
    switch (category) {
      case 'edit':
        return '모임이 수정되었어요!';
      case 'create':
        return '모임이 생성되었어요!';

      default:
        return '알 수 없는 상태입니다.';
    }
  };

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
          <R.Text>{getMessage()}</R.Text>
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
            switch (category) {
              case 'edit':
                navigator('/meet/detail', {
                  state: {
                    groupId: groupId,
                  },
                });
                break;
              case 'create':
                navigator('/meet/list');
                break;
              default:
                navigator('/meet/list');
            }
          }}
          fontWeight="bold"
        />
      </R.BtnContainer>
    </R.Container>
  );
}

export default MeetAddCompletePage;
