import { DaysOfRouteProps } from '@/models/route';
import * as R from '../Route/RoutePlaceCard.styled';
import Icon from '@/components/common/Icon/Icon';

interface RouteRetouchPlaceCardProps {
  data: DaysOfRouteProps;
  dragStartHandler: (position: number) => void;
  dragEndHandler: (position: number) => void;
  dropHandler: () => void;
  handleTouchMove: (e: React.TouchEvent) => void;
  handleTouchEnd: () => void;
  selectHandler: (i: number) => void;
  idx: number;
}

function RouteRetouchPlaceCard(props: RouteRetouchPlaceCardProps) {
  return (
    <R.RetouchCardContainer>
      <R.RetouchIconBox
        onClick={() => {
          props.selectHandler(props.idx);
        }}
      >
        <Icon
          name="IconRetouchDelete"
          size={15}
          style={{ marginLeft: '2rem' }}
        />
      </R.RetouchIconBox>

      <R.RetouchCard>
        <R.RetouchPlaceInfoBox>
          <R.PlaceName>{props.data.routeName}</R.PlaceName>
          <R.PlaceAddressBox>{props.data.routeAddress}</R.PlaceAddressBox>
        </R.RetouchPlaceInfoBox>
        <R.PlaceNumberBox>{props.data.routePoint}</R.PlaceNumberBox>
      </R.RetouchCard>
      <R.RetouchIconBox
        draggable
        data-position={props.idx}
        onDragStart={(e) => {
          props.dragStartHandler(props.idx);
          e.preventDefault();
        }}
        onDragOver={(e) => {
          e.preventDefault();
          props.dragEndHandler(props.idx);
        }}
        onDrop={props.dropHandler}
        onTouchStart={(e) => {
          props.dragStartHandler(props.idx);
          e.preventDefault();
        }}
        onTouchMove={props.handleTouchMove}
        onTouchEnd={props.handleTouchEnd}
      >
        <Icon name="IconReOrder" size={15} />
      </R.RetouchIconBox>
    </R.RetouchCardContainer>
  );
}

export default RouteRetouchPlaceCard;
