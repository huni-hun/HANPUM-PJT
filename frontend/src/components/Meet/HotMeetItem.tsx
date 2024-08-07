import Icon from '@/components/common/Icon/Icon';
import * as S from '../Style/Meet/HotMeetItem.styled';
import img from '../../assets/img/mountain.jpg';
import { useNavigate } from 'react-router-dom';

function HotMeetItem() {
  const id = 1;
  const navigate = useNavigate();
  return (
    <S.ItemContainer onClick={() => navigate(`/meet/${id}`)}>
      <div className="meet-img">
        <img src={img} alt="" />
      </div>

      <div className="meet-date">5박 6일</div>

      <div className="meet-heart">
        <Icon name="IconMy" size={20} />
      </div>

      <div className="meet_info">
        <div className="meet_info-root">
          <span>인천</span>
          <Icon name="IconArrow" size={6} />
          <span>당진</span>
        </div>

        <div className="meet_info-title">무더위 사냥</div>
        <div className="meet_info-date">
          <span>2024. 07. 21</span>
          <span>-</span>
          <span>2024. 08. 05</span>
        </div>

        <div className="meet_info_items">
          <div className="meet_info_items-item">
            <Icon name="IconMy" size={8} />
            <span>6/8</span>
          </div>

          <div className="meet_info_items-item">
            <Icon name="IconMy" size={8} />
            <span>25</span>
          </div>
        </div>
      </div>
    </S.ItemContainer>
  );
}

export default HotMeetItem;
