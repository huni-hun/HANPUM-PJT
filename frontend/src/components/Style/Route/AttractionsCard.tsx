import Icon from '@/components/common/Icon/Icon';
import * as R from '@/components/Style/Route/RouteDetailPage.styled';
import { AttractionsProps } from '@/models/route';
import { useState } from 'react';

interface AttractionsCardProps {
  ele: AttractionsProps;
  isAble: boolean;
  deleteHandler: (name: string) => void;
}

function AttractionsCard(props: AttractionsCardProps) {
  const [isSwiped, setIsSwiped] = useState<boolean>(false);
  return (
    <R.PlaceCardCotainer>
      <R.PlaceCardBox
        isSwiped={isSwiped}
        key={props.ele.attractionId}
        onClick={() => {
          if (props.isAble) {
            setIsSwiped(!isSwiped);
          }
        }}
      >
        <R.PlaceCard>
          <R.PlaceTextBox>
            <R.PlacetTitleBox>
              <R.Title>{props.ele.name}</R.Title>
            </R.PlacetTitleBox>
            <R.PlacetAddressBox>{props.ele.address}</R.PlacetAddressBox>
          </R.PlaceTextBox>
          <R.PlaceImg>
            <R.PlaceImage src={props.ele.img} />
          </R.PlaceImg>
        </R.PlaceCard>
      </R.PlaceCardBox>
      <R.PlaceCardDeleteIcon
        onClick={() => {
          if (props.isAble) {
            props.deleteHandler(props.ele.name);
          }
        }}
      >
        <Icon name="IconDelete" size={15} />
        삭제
      </R.PlaceCardDeleteIcon>
    </R.PlaceCardCotainer>
  );
}

export default AttractionsCard;
