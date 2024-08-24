/** 경로, 모임, 일정에 쓰이는 맨 위 feed 부분 */
import * as R from '@/components/Style/Route/RouteDetailPage.styled';
import { FeedProps } from '@/models/route';
import Icon from '@/components/common/Icon/Icon';

// FeedContainer 컴포넌트
const FeedContainer = ({ routeData }: FeedProps) => {
  return (
    <>
      <R.ImgBox></R.ImgBox>
      <R.UserContainer>
        <R.UserImgBox></R.UserImgBox>
        <R.UserName>작성자</R.UserName>
      </R.UserContainer>
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
