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
          <R.PlaceImage src="http://tong.visitkorea.or.kr/cms/resource/85/3051785_image2_1.JPG" />
        </R.PlaceImg>
      </R.PlaceCard>
    </R.PlaceCardBox>
  );
}

export default AttractionsCard;
