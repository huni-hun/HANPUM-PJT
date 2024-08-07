import Icon from '../common/Icon/Icon';
import * as S from '../Style/Main/MeetItem.styled';

function MeetItem() {
  return (
    <S.Container>
      <div className="meet_info">
        <div className=" meet_info-item">
          <Icon name="IconMember" size={8} />
          <span>6/8</span>
        </div>

        <div className=" meet_info-item">
          <Icon name="IconHeart" size={8} />
          <span>25</span>
        </div>
      </div>

      <div className="heart">
        <Icon name="IconHeart" size={20} />
      </div>

      <div className="meet_course">
        <div className="meet_course-info">
          <div className="meet_course-info-title">무더위 사냥</div>
          <div className="meet_course-info-day">5박 6일</div>
        </div>

        <div className="course">
          <div className="course-place">
            <span className="course-place_item">인천</span>
            <Icon name="IconArrowWhite" size={6} />
            <span className="course-place_item">당진</span>
          </div>
          <span className="course-km">80km</span>
        </div>
      </div>
    </S.Container>
  );
}

export default MeetItem;
