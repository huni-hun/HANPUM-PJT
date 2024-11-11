import { useNavigate } from 'react-router-dom';
import Icon from '../common/Icon/Icon';
import Text from '../common/Text';
import * as S from '../Style/My/Activity.styled';

function Activity() {
  const navigate = useNavigate();
  return (
    <S.ActivityContainer>
      <Text $bold={true} $typography="t16">
        활동 관리
      </Text>
      <div className="activity_container">
        <div
          className="activity_item"
          onClick={() => navigate('/mypage/:interest')}
        >
          <Icon name="IconInterestList" />
          <Text $typography="t12">관심 목록</Text>
        </div>
        <div
          className="activity_item"
          onClick={() => navigate('/mypage/:myroot')}
        >
          <Icon name="IconMyRoot" />
          <Text $typography="t12">나의 경로</Text>
        </div>
        <div
          className="activity_item"
          onClick={() => navigate('/mypage/:finish')}
        >
          <Icon name="IconfinishedRoot" />
          <Text $typography="t12">사용한 경로</Text>
        </div>
      </div>
    </S.ActivityContainer>
  );
}

export default Activity;
