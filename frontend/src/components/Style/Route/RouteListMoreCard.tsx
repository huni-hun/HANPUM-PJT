import Icon from '@/components/common/Icon/Icon';
import * as R from '@/components/Style/Route/RouteListMorePage.styled';

function RouteListMoreCard() {
  return (
    <R.RouteCard>
      <R.ContentBox>
        <R.Img />
        <R.TextBox>
          <R.Title>무더위 사냥</R.Title>
          <R.RouteTextBox>인천 당진</R.RouteTextBox>
          <R.ScoreBox>
            <Icon name="IconGrenStar" size={15} />
            <R.Score>3.5</R.Score>
            <R.Review>(3)</R.Review>
          </R.ScoreBox>
        </R.TextBox>
        <R.DateBox>
          <Icon name="IconHeartGrey" size={18} />
          <R.Date>5박6일</R.Date>
        </R.DateBox>
      </R.ContentBox>
    </R.RouteCard>
  );
}

export default RouteListMoreCard;
