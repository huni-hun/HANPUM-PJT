import Icon from '@/components/common/Icon/Icon';
import * as R from '@/components/Style/Route/RouteListMorePage.styled';
import { useNavigate } from 'react-router-dom';

interface RouteListMoreCardProps {
  title: string;
  start: string;
  end: string;
  score: number;
  review: number;
  img: string;
  id: number;
}

function RouteListMoreCard(props: RouteListMoreCardProps) {
  const navigator = useNavigate();

  return (
    <R.RouteCard
      onClick={() => {
        navigator(`/route/detail/${props.id}`);
      }}
    >
      <R.ContentBox>
        <R.Img />
        <R.TextBox>
          <R.Title>{props.title}</R.Title>
          <R.RouteTextBox>
            {props.start}
            <Icon name="IconGreyLeftArrow" size={10} />
            {props.end}
            <R.RouteDistanceBox>76km</R.RouteDistanceBox>
          </R.RouteTextBox>
          <R.ScoreBox>
            <Icon name="IconGrenStar" size={10} />
            <R.Score>{props.score}</R.Score>
            <R.Review>({props.review})</R.Review>
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
