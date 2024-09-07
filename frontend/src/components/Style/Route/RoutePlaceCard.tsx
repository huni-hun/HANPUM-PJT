import { DaysOfRouteProps } from '@/models/route';
import * as R from '../Route/RoutePlaceCard.styled';

function RoutePlaceCard(props: DaysOfRouteProps) {
  return (
    <R.Card>
      <R.PlaceInfoBox>
        <R.PlaceName>{props.routeName}</R.PlaceName>
        <R.PlaceAddressBox>{props.routeAddress}</R.PlaceAddressBox>
      </R.PlaceInfoBox>
      <R.PlaceNumberBox turnGreen={props.turnGreen || false}>
        {props.routePoint}
      </R.PlaceNumberBox>
    </R.Card>
  );
}

export default RoutePlaceCard;
