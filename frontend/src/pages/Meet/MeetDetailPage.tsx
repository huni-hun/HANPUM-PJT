import { useEffect, useState } from 'react';
import * as S from '../../components/Style/Schedule/SchduleMainPage.styled';
import * as R from '@/components/Style/Route/RouteDetailPage.styled';

import Header from '@/components/common/Header/Header';

import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';

import Feed from '@/components/Style/Common/Feed';
import FeedInfo from '@/components/Style/Common/FeedInfo';
import memberImg from '../../assets/img/memberImg.svg';

import goyuMY from '../../assets/img/goyuMY.png';
import { Member, SchduleCardProps } from '@/models/schdule';
import { GetMeetDetailList } from '@/api/meet/GET';

function DetailMineSchedulePage() {
  const BtnClick = () => {};
  const navigate = useNavigate();
  const location = useLocation();
  const { groupId } = location.state || {};
  const [memberData, setMemberData] = useState<Member>();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  /** feed 더미 데이터 */
  /** === useState (routeData) */
  const feedData = {
    routeFeedImg: memberData?.groupImg || goyuMY,
    routeUserImg: memberData?.readerProfileImg || memberImg,
    routeName: memberData?.title,
    routeContent: memberData?.description,
    memberCount: memberData?.recruitedCount,
    totalMember: memberData?.recruitmentCount,
    likeCount: memberData?.likeCount,
    startDate: memberData?.startDate,
    endDate: memberData?.endDate,
    meetDday: memberData?.dday,
    meetTypes: memberData?.courseTypes || [],
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GetMeetDetailList(groupId);

        if (response && response.status === 'SUCCESS') {
          setMemberData(response.data);
        } else {
          setError('데이터 가져오기 실패');
        }
      } catch (error) {
        console.error('Fetch Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const dayNum = memberData?.totalDays || 0;
  const dayData = [{ dayNum: dayNum }];

  return (
    <ScheduleMainPageContainer>
      <Header
        purpose="result"
        title={`D-${memberData?.dday}`}
        clickBack={() => navigate(-1)}
      />

      <R.Main>
        <R.Overflow>
          <R.RouteInfoContainer>
            <Feed routeData={feedData} isUserContainer meetRouter />
            <FeedInfo
              feedInfoTitle="모임 일정 정보"
              departuresPlace={memberData?.endPoint}
              arrivalsPlace={memberData?.startPoint}
              startDate={memberData?.startDate}
              endDate={memberData?.endDate}
              totalDistance={53}
              dayData={dayData}
              isMeetFeed={'30rem'}
            />
          </R.RouteInfoContainer>

          {/* 지도 및 하위 컴포넌트 container */}
          <R.RouteDetailInfoContainer>
            {/* <RouteDetailInfo
          selected={selected}
          selectedDay={selectedDay}
          latitude={latitude}
          longitude={longitude}
          dayData={dayData}
          attractions={attractions}
          setLoading={setLoading}
          setSelectedDay={setSelectedDay}
        /> */}
            {/* 모임멤버 */}
            {/* <S.ScheduleMainContainer>
              <MeetMember
                memberCount={memberData.length}
                members={memberData || []}
              />
            </S.ScheduleMainContainer> */}
          </R.RouteDetailInfoContainer>
        </R.Overflow>
      </R.Main>
    </ScheduleMainPageContainer>
  );
}

export default DetailMineSchedulePage;

const ScheduleMainPageContainer = styled.div`
  width: 100%;
  height: 100%;
`;
