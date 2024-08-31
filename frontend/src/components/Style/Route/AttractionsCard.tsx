import * as R from '@/components/Style/Route/RouteDetailPage.styled';
import { AttractionsProps } from '@/models/route';

function AttractionsCard(ele: AttractionsProps) {
  return (
    <R.PlaceCardBox key={ele.attractionId}>
      <R.PlaceCard>
        <R.PlaceTextBox>
          <R.PlacetTitleBox>
            <R.Title>{ele.name}</R.Title>
          </R.PlacetTitleBox>
          <R.PlacetAddressBox>{ele.address}</R.PlacetAddressBox>
        </R.PlaceTextBox>
        <R.PlaceImg>
          <R.PlaceImage src={ele.img} />
        </R.PlaceImg>
      </R.PlaceCard>
    </R.PlaceCardBox>
  );
}

export default AttractionsCard;
