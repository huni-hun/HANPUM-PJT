import * as S from '../Style/Meet/MeetScheduleItem.styled';
import img from '../../assets/img/mountain.jpg';

interface ScheduleItemProps {
  scheDuleItemData: {
    id: number;
    title: string;
    category: string;
    address: string;
    img: string;
  };
}

function MeetScheduleItem({ scheDuleItemData }: ScheduleItemProps) {
  const { title, category, address, img } = scheDuleItemData;

  return (
    <S.MeetScheduleItemContainer>
      <div className="left">
        <div className="green_circle" />
      </div>
      <div className="center">
        <div className="place_info">
          <div className="place_info-top">
            <div className="place_info-top-title">{title}</div>
            <div className="place_info-top-category">{category}</div>
          </div>

          <div className="place_info-bottom">
            <div className="place_info-bottom-address">{address}</div>
          </div>
        </div>
      </div>
      <div className="right">
        <img src={img} alt={title} />
      </div>
    </S.MeetScheduleItemContainer>
  );
}

export default MeetScheduleItem;
