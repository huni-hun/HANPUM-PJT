/** 경로, 모임, 일정에 쓰이는 맨 위 feed 부분 */
import * as R from '@/components/Style/Route/RouteDetailPage.styled';
import * as M from '@/components/Style/Meet/MeetDetail.styled';
import { FeedProps } from '@/models/route';
import Icon from '@/components/common/Icon/Icon';

// FeedContainer 컴포넌트
const FeedContainer = ({
  /** data */
  routeData,
  isUserContainer,
  meetRouter,
  isMeetFeed,
}: FeedProps) => {
  return (
    <>
      {meetRouter ? (
        <>
          <R.ImgBox backgroundImg={routeData?.routeFeedImg}>
            <M.Badge>
              {routeData?.startDate} - {routeData?.endDate}
            </M.Badge>
          </R.ImgBox>
        </>
      ) : (
        <></>
      )}

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

      <R.RouteNameInfo isMeetFeed={isMeetFeed}>
        <R.RouteNameInfoContainer>
          <R.RouteName>{routeData?.routeName || ''}</R.RouteName>
          <R.RouteInfo>{routeData?.routeContent || ''}</R.RouteInfo>
          <R.TagsWrap>
            {routeData?.routeTypes?.map((type, index) => (
              <R.Tags key={index}>{type}</R.Tags>
            )) || ''}
          </R.TagsWrap>
        </R.RouteNameInfoContainer>
      </R.RouteNameInfo>

      {meetRouter ? (
        <>
          <M.MeetInfoContainer>
            <M.MeetInfoWrap>
              <M.MeetInfoText>
                <p>D - {routeData?.meetDday}</p>
                <span>모집 마감</span>
              </M.MeetInfoText>
              <M.Hr />
              <M.MeetInfoText>
                <p>
                  {routeData?.memberCount} / {routeData?.totalMember}
                </p>
                <span>모집 인원</span>
              </M.MeetInfoText>
              <M.Hr />
              <M.MeetInfoText>
                <p>{routeData?.likeCount}</p>
                <span>관심</span>
              </M.MeetInfoText>
            </M.MeetInfoWrap>
            <M.TagsWrap>
              {routeData?.meetTypes?.map((type, index) => (
                <M.Tags key={index}>{type}</M.Tags>
              )) || ''}
            </M.TagsWrap>
          </M.MeetInfoContainer>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default FeedContainer;
