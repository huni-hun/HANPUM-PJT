/** 경로, 모임, 일정에 쓰이는 맨 위 feed 부분 */
import * as R from '@/components/Style/Route/RouteDetailPage.styled';
import * as S from '@/components/Style/Schedule/SchduleMainPage.styled';
import { FeedProps } from '@/models/route';
import Icon from '@/components/common/Icon/Icon';

// FeedContainer 컴포넌트
const FeedContainer = ({ routeData, isUserContainer }: FeedProps) => {
  return (
    <>
      <R.ImgBox>
        <img src={routeData?.routeFeedImg} />
      </R.ImgBox>
      {/** 작성자 있을 경우 boolean으로 받아 쓰세요 ! */}
      {isUserContainer ? (
        <R.UserContainer>
          <R.UserImgBox>
            <img src={routeData?.routeUserImg} />
          </R.UserImgBox>
          <R.UserName>작성자</R.UserName>
        </R.UserContainer>
      ) : (
        <></>
      )}

      <R.RouteNameInfo>
        <R.RouteNameInfoContainer>
          <R.RouteName>{routeData?.routeName || ''}</R.RouteName>
          <R.RouteInfo>{routeData?.routeContent || ''}</R.RouteInfo>
        </R.RouteNameInfoContainer>
      </R.RouteNameInfo>
    </>
  );
};

export default FeedContainer;
