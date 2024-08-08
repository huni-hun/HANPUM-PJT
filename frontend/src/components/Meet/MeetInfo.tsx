import Icon from '../common/Icon/Icon';
import * as S from '../Style/Meet/MeetInfo.styled';

function MeetInfo() {
  return (
    <S.MeetInfoContainer>
      <div className="section">
        <div className="section_user">
          <div className="section_user-userImg">
            {/* <img src="" alt="" /> */}
          </div>
          <div className="section_user-name">모임 대장 이름</div>
        </div>
      </div>

      <div className="section">
        <div className="section_course">
          <div className="section_course-title">태종대 전망대</div>
          <div className="section_course-desc">모임 소개글</div>
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
                  2024.07.13
                </div>
              </div>
              <div className="section_meetInfo-detail-date-flex arrive">
                <div className="section_meetInfo-detail-date-flex-label">
                  도착일
                </div>
                <div className="section_meetInfo-detail-date-flex-day">
                  2024.07.26
                </div>
              </div>
            </div>

            <div className="section_meetInfo-detail-total">
              <div className="section_meetInfo-detail-total-label">
                총 이동거리
              </div>
              <div className="section_meetInfo-detail-total-value">52.8KM</div>
            </div>
          </div>

          <div className="section_meetInfo-detail start">
            <div className="section_meetInfo-detail-date">
              <div className="section_meetInfo-detail-date-flex depart">
                <div className="section_meetInfo-detail-date-flex-label">
                  출발일
                </div>
                <div className="section_meetInfo-detail-date-flex-day">
                  2024.07.13
                </div>
              </div>
              <div className="section_meetInfo-detail-date-flex arrive">
                <div className="section_meetInfo-detail-date-flex-label">
                  도착일
                </div>
                <div className="section_meetInfo-detail-date-flex-day">
                  2024.07.26
                </div>
              </div>
            </div>

            <div className="section_meetInfo-detail-total">
              <div className="section_meetInfo-detail-total-label">
                총 일정기간
              </div>
              <div className="section_meetInfo-detail-total-value">
                15박 16일
              </div>
            </div>
          </div>

          <div className="section_meetInfo_items">
            <div className="section_meetInfo_items-item">
              <Icon name="IconMy" size={20} />
              <span>6/8</span>
            </div>

            <div className="section_meetInfo_items-item">
              <Icon name="IconMy" size={20} />
              <span>25</span>
            </div>
          </div>
        </div>
      </div>
    </S.MeetInfoContainer>
  );
}

export default MeetInfo;
