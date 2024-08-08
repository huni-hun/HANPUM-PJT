import styled from 'styled-components';
import * as S from '../Style/Meet/MeetSchedule.styled';
import MeetScheduleNav from './MeetScheduleNav';
import MeetScheduleItem from './MeetScheduleItem';

function MeetSchedule() {
  return (
    <S.MeetScheduleContainer>
      {/* <div className="dateNav"></div> */}
      <MeetScheduleNav />
      <div className="list">
        <MeetScheduleItem />
        <MeetScheduleItem />
        <MeetScheduleItem />
      </div>
    </S.MeetScheduleContainer>
  );
}

export default MeetSchedule;
