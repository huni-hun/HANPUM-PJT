import * as R from '@/components/Style/Route/RouteDetailPage.styled';
import Icon from '@/components/common/Icon/Icon';
import { RouteReviewProps } from '@/models/route';

function ReviewCard(ele: RouteReviewProps) {
  return (
    <R.ReviewCardBox>
      <R.ReviewCard>
        <R.UserImgContainer>
          <R.UserImg>
            <Icon name="IconUserBasicImg" size={43} />
          </R.UserImg>
        </R.UserImgContainer>
        <R.ReviewTextcontainer>
          <R.ReviewTextBox>
            <R.ReviewNameBox>
              <R.ReviewName>박뚱이</R.ReviewName>
              <Icon name="IconGrenStar" size={15} />
              <R.ReviewRate>{ele.score}</R.ReviewRate>
            </R.ReviewNameBox>
            <R.ReviewDetailBox>
              <R.ReviewDetail>{ele.content}</R.ReviewDetail>
            </R.ReviewDetailBox>
          </R.ReviewTextBox>
          <R.ReviewDateBox>
            <R.ReviewDate>{ele.writeDate}</R.ReviewDate>
          </R.ReviewDateBox>
        </R.ReviewTextcontainer>
        <R.HeartBox>
          <Icon name="IconHeartGrey" size={15} />
          <R.HeartText>11</R.HeartText>
        </R.HeartBox>
      </R.ReviewCard>
    </R.ReviewCardBox>
  );
}

export default ReviewCard;
