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
          <C.Content>
            <Icon name="IconWhiteStar" size={13} fill="#ffffff" />
            <C.ContentText>{props.routeScore}</C.ContentText>
          </C.Content>
          <C.Content>
            <Icon name="IconReview" size={13} />
            <C.ContentText>{props.routeComment}</C.ContentText>
          </C.Content>
        </C.ContentContainer>
        <Icon name="IconBookMarkerWhite" size={20} />
      </C.TopContent>
      <C.BottomContent>
        <C.RouteNTitleBox>
          <C.RouteBox>
            <C.RouteText>인천</C.RouteText>
            <Icon name="IconArrowWhite" size={10} path="" />
            <C.RouteText>당진</C.RouteText>
          </C.RouteBox>
          <C.TitleBox>{props.routeName}</C.TitleBox>
        </C.RouteNTitleBox>
        <C.BContent>
          <Icon name="IconRoute" size={25} />
          <C.ContentText>70.5km</C.ContentText>
        </C.BContent>
      </C.BottomContent>
    </C.Card>
  );
}

export default RouteCard;
