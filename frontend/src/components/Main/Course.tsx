import * as S from '../Style/Main/Course.styled';
import img from '../../assets/img/img1.jpg';
import Icon from '../common/Icon/Icon';

function Course() {
  return (
    <S.Container>
      <img src={img} alt="img1" />

      <div className="course-text">
        <div className="course-text_title">무더운 여름의 초록숲</div>
        <div className="course-text_desc">
          무더운 여름을 아름다운 풍경으로 이겨내요!
        </div>
      </div>

      <div className="course">
        <span className="course-item">인천</span>
        <Icon name="IconArrowWhite" size={6} />
        <span className="course-item">당진</span>
      </div>

      <div className="course_info">
        <div className="course_info-day">10박 11일</div>
        <div className="course_info-km">76km</div>
      </div>
    </S.Container>
  );
}

export default Course;
