import styled from 'styled-components';
import * as S from '../Style/Meet/MeetSchedule.styled';
import MeetScheduleNav from './MeetScheduleNav';
import MeetScheduleItem from './MeetScheduleItem';

interface MeetScheduleProps {
  scheduleDataList: {
    id: number;
    title: string;
    category: string;
    address: string;
    img: string;
  }[];
}

function MeetSchedule({ scheduleDataList }: MeetScheduleProps) {
  return (
    <S.MeetScheduleContainer>
      <MeetScheduleNav />
      <div className="list">
        {scheduleDataList.map((scheduleItem) => (
          <MeetScheduleItem
            key={scheduleItem.id}
            scheDuleItemData={scheduleItem}
          />
        ))}
      </div>
    </S.MeetScheduleContainer>
  );
}

export default MeetSchedule;
