import { DaysOfRouteProps } from '@/models/route';
import * as R from '../Route/RoutePlaceCard.styled';
import Icon from '@/components/common/Icon/Icon';

function RoutePlaceCard(
  props: DaysOfRouteProps & {
    isAdd?: boolean;
    isSchedule?: boolean;
    state?: number;
  },
) {
  return (
    <R.Card>
      <R.PlaceInfoBox>
        <R.PlaceName>{props.routeName}</R.PlaceName>
        <R.PlaceAddressBox>{props.routeAddress}</R.PlaceAddressBox>
      </R.PlaceInfoBox>
      <R.PlaceNumberBox
        $isSchedule={props.isSchedule}
        state={props.state}
        $turnGreen={props.turnGreen}
      >
        {props.routePoint}
      </R.PlaceNumberBox>
      {props.isAdd && (
        <R.RetouchAddIconBox>
          <Icon name="IconRetouchDelete" size={15} />
        </R.RetouchAddIconBox>
      )}
    </R.Card>
  );
}

export default RoutePlaceCard;
