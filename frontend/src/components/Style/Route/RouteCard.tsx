import * as C from './RouteCard.styled';

import Icon from '../../common/Icon/Icon';
import test from '../../../assets/img/mountain.jpg';
import { useNavigate } from 'react-router-dom';
import { RouteListProps } from '@/models/route';

function RouteCard(props: RouteListProps) {
  const navigator = useNavigate();
  return (
    <C.Card
      onClick={() => {
        navigator(`/route/detail/${props.routeId}`);
      }}
      img={test}
    >
      <C.TopContent>
        <C.ContentContainer>
          <C.Content>5박 6일</C.Content>
        </C.ContentContainer>
        <Icon name="IconHeartInGrey" size={30} />
      </C.TopContent>
      <C.BottomContent>
        <C.RouteNTitleBox>
          <C.RouteContentBox>
            <Icon name="IconGrenStar" size={15} />
            <C.RouteScoreText>{props.routeScore}</C.RouteScoreText>
            <C.RouteScoreText>{`(${props.routeComment})`}</C.RouteScoreText>
          </C.RouteContentBox>
          <C.TitleBox>{props.routeName}</C.TitleBox>
          <C.RouteBox>
            <C.RouteText>
              {props.start.length > 2
                ? props.start.substring(0, 2)
                : props.start}
            </C.RouteText>
            <Icon name="IconArrowWhite" size={10} path="" />
            <C.RouteText>
              {props.end.length > 2 ? props.end.substring(0, 2) : props.end}
            </C.RouteText>
            <C.RouteDistanceBox>{props.totalDistance}km</C.RouteDistanceBox>
          </C.RouteBox>
        </C.RouteNTitleBox>
        {/* <C.BContent>
          <Icon name="IconRoute" size={25} />
          <C.ContentText>70.5km</C.ContentText>
        </C.BContent> */}
      </C.BottomContent>
    </C.Card>
  );
}

export default RouteCard;
