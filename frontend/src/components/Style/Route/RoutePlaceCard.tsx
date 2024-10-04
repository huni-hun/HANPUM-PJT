import { DaysOfRouteProps, WayPointReqDto } from '@/models/route';
import * as R from '../Route/RoutePlaceCard.styled';
import Icon from '@/components/common/Icon/Icon';

declare global {
  interface Window {
    kakao: any;
  }
}

function RoutePlaceCard(
  props: DaysOfRouteProps & {
    isAdd?: boolean;
    isDetail?: boolean;
    isSchedule?: boolean;
    state?: number;
    deleteHandler?: () => void;
    makers?: any;
    setSelectedMarker?: React.Dispatch<React.SetStateAction<any>>;
  },
) {
  return (
    <R.Card
      onClick={() => {
        if (props.makers !== undefined) {
          if (props.setSelectedMarker !== undefined) {
            props.setSelectedMarker(props.makers);
          }
          // props.makers.map((ele: any) => {
          //   if (ele.name === props.routeName) {
          //     // console.log(ele);
          //     // window.kakao.maps.event.trigger(ele, 'click');
          //   }
          // });
          // window.kakao.maps.event.trigger(props.makers, 'click');
        }
      }}
    >
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
        <R.RetouchAddIconBox
          onClick={(e) => {
            e.stopPropagation();
            if (props.deleteHandler !== undefined) {
              if (props.setSelectedMarker !== undefined) {
                props.setSelectedMarker(null!);
              }

              props.deleteHandler();
            }
          }}
        >
          <Icon name="IconRetouchDelete" size={15} />
        </R.RetouchAddIconBox>
      )}
      {props.isDetail && (
        <R.RetouchAddIconBox
          onClick={() => {
            if (props.deleteHandler !== undefined) {
              props.deleteHandler();
            }
          }}
        >
          <R.RetouchInfoBox onClick={() => {}}>i</R.RetouchInfoBox>
        </R.RetouchAddIconBox>
      )}
    </R.Card>
  );
}

export default RoutePlaceCard;
