import * as R from '@/components/Style/Route/RouteDetailPage.styled';
import Icon from '@/components/common/Icon/Icon';
import { RouteReviewProps } from '@/models/route';

interface ReviewCardProps {
  ele: RouteReviewProps;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

function ReviewCard(props: ReviewCardProps) {
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
              <R.ReviewName>{props.ele.memberNickname}</R.ReviewName>
              <Icon name="IconGrenStar" size={15} />
              <R.ReviewRate>{props.ele.score}</R.ReviewRate>
            </R.ReviewNameBox>
            <R.ReviewDetailBox>
              <R.ReviewDetail>{props.ele.content}</R.ReviewDetail>
            </R.ReviewDetailBox>
          </R.ReviewTextBox>
          <R.ReviewDateBox>
            <R.ReviewDate>{props.ele.writeDate}</R.ReviewDate>
          </R.ReviewDateBox>
        </R.ReviewTextcontainer>
        <R.HeartBox>
          <Icon name="IconHeartGrey" size={15} />
          <R.HeartText>{props.ele.like}</R.HeartText>
        </R.HeartBox>
      </R.ReviewCard>
    </R.ReviewCardBox>
  );
}

export default ReviewCard;
