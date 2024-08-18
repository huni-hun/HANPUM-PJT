import Icon from '../common/Icon/Icon';
import * as S from '../Style/Meet/MeetInfo.styled';

interface FeedDataProps {
  feedData: {
    leaderName: string;
    leaderImg: string;
    courseTitle: string;
    courseDesc: string;
    departDate: string;
    arriveDate: string;
    totalDistance: string;
    totalPeriod: string;
    memberCount: string;
    likeCount: number;
  };
}

function MeetInfo({ feedData }: FeedDataProps) {
  const {
    leaderName,
    leaderImg,
    courseTitle,
    courseDesc,
    departDate,
    arriveDate,
    totalDistance,
    totalPeriod,
    memberCount,
    likeCount,
  } = feedData;

  return (
    <S.MeetInfoContainer>
      <div className="section">
        <div className="section_user">
          <div className="section_user-userImg">
            <img src={leaderImg} alt={leaderName} />
          </div>
          <div className="section_user-name">{leaderName}</div>
        </div>
      </div>

      <div className="section">
        <div className="section_course">
          <div className="section_course-title">{courseTitle}</div>
          <div className="section_course-desc">{courseDesc}</div>
        </div>
      </div>

      <div className="section">
        <div className="section_meetInfo">
          <div className="section_meetInfo-title">모임 정보</div>
          <div className="section_meetInfo-detail start">
            <div className="section_meetInfo-detail-date">
              <div className="section_meetInfo-detail-date-flex depart">
                <div className="section_meetInfo-detail-date-flex-label">
                  출발일
                </div>
                <div className="section_meetInfo-detail-date-flex-day">
                  {departDate}
                </div>
              </div>
              <div className="section_meetInfo-detail-date-flex arrive">
                <div className="section_meetInfo-detail-date-flex-label">
                  도착일
                </div>
                <div className="section_meetInfo-detail-date-flex-day">
                  {arriveDate}
                </div>
              </div>
            </div>

            <div className="section_meetInfo-detail-total">
              <div className="section_meetInfo-detail-total-label">
                총 이동거리
              </div>
              <div className="section_meetInfo-detail-total-value">
                {totalDistance}
              </div>
            </div>
          </div>

          <div className="section_meetInfo-detail start">
            <div className="section_meetInfo-detail-date">
              <div className="section_meetInfo-detail-date-flex depart">
                <div className="section_meetInfo-detail-date-flex-label">
                  출발일
                </div>
                <div className="section_meetInfo-detail-date-flex-day">
                  {departDate}
                </div>
              </div>
              <div className="section_meetInfo-detail-date-flex arrive">
                <div className="section_meetInfo-detail-date-flex-label">
                  도착일
                </div>
                <div className="section_meetInfo-detail-date-flex-day">
                  {arriveDate}
                </div>
              </div>
            </div>

            <div className="section_meetInfo-detail-total">
              <div className="section_meetInfo-detail-total-label">
                총 일정기간
              </div>
              <div className="section_meetInfo-detail-total-value">
                {totalPeriod}
              </div>
            </div>
          </div>

          <div className="section_meetInfo_items">
            <div className="section_meetInfo_items-item">
              <Icon name="IconSquareGreyFill" size={20} />
              <span>{memberCount}</span>
            </div>

            <div className="section_meetInfo_items-item">
              <Icon name="IconHeartGreyFill" size={20} />
              <span>{likeCount}</span>
            </div>
          </div>
        </div>
      </div>
    </S.MeetInfoContainer>
  );
}

export default MeetInfo;
