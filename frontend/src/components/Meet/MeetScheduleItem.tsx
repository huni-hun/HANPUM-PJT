import * as S from '../Style/Meet/MeetScheduleItem.styled';
import img from '../../assets/img/mountain.jpg';

function MeetScheduleItem() {
  return (
    <S.MeetScheduleItemContainer>
      <div className="left">
        <div className="green_circle" />
      </div>
      <div className="center">
        <div className="place_info">
          <div className="place_info-top">
            <div className="place_info-top-title">태종대 전망대</div>
            <div className="place_info-top-category">관광지</div>
          </div>

          <div className="place_info-bottom">
            <div className="place_info-bottom-address">
              부산 영도구 전망로 209 1~3층
            </div>
          </div>
        </div>
      </div>
      <div className="right">
        <img src={img} alt="" />
      </div>
    </S.MeetScheduleItemContainer>
  );
}

export default MeetScheduleItem;
