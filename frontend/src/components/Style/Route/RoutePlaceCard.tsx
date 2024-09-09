import { DaysOfRouteProps } from '@/models/route';
import * as R from '../Route/RoutePlaceCard.styled';

function RoutePlaceCard(
  props: DaysOfRouteProps & { isSchedule?: boolean; state?: number },
) {
  return (
    <R.Card>
      <R.PlaceInfoBox>
        <R.PlaceName>{props.routeName}</R.PlaceName>
        <R.PlaceAddressBox>{props.routeAddress}</R.PlaceAddressBox>
      </R.PlaceInfoBox>
      <R.PlaceNumberBox
        isSchedule={props.isSchedule}
        state={props.state}
        turnGreen={props.turnGreen}
      >
        {props.routePoint}
      </R.PlaceNumberBox>
    </R.Card>
  );
}

export default RoutePlaceCard;
