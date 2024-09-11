/** 경로, 모임, 일정에 쓰이는 맨 위 feed 부분 */
import * as R from '@/components/Style/Route/RouteDetailPage.styled';
import * as M from '@/components/Style/Meet/MeetDetail.styled';
import * as S from '@/components/Style/Schedule/SchduleMainPage.styled';
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
  console.log(routeData?.routeFeedImg, '백그라운드 이미지');
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

      <S.RouteNameInfo isMeetFeed={isMeetFeed}>
        <S.RouteNameInfoContainer>
          <S.RouteName>{routeData?.routeName || ''}</S.RouteName>
          <S.RouteInfo>{routeData?.routeContent || ''}</S.RouteInfo>
          <S.TagsWrap>
            {routeData?.routeTypes?.map((type, index) => (
              <R.Tags key={index}>{type}</R.Tags>
            )) || ''}
          </S.TagsWrap>
        </S.RouteNameInfoContainer>
      </S.RouteNameInfo>

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
