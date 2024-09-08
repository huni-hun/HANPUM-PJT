import { DaysOfRouteProps } from '@/models/route';
import * as R from '../Route/RoutePlaceCard.styled';

function RoutePlaceCard(props: DaysOfRouteProps & { isSchedule?: boolean }) {
  // 조건: isSchedule일 때,  state가 2인 경우에만 turnGreen 적용
  const scheduleState = props.isSchedule && props.state === 2;

  return (
    <R.Card>
      <R.PlaceInfoBox>
        <R.PlaceName>{props.routeName}</R.PlaceName>
        <R.PlaceAddressBox>{props.routeAddress}</R.PlaceAddressBox>
      </R.PlaceInfoBox>
      <R.PlaceNumberBox
        scheduleState={scheduleState}
        turnGreen={props.turnGreen}
      >
        {props.routePoint}
      </R.PlaceNumberBox>
    </R.Card>
  );
}

export default RoutePlaceCard;
