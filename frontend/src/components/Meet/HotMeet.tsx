import * as S from '../Style/Meet/HotMeet.styled';
import HotMeetItem from './HotMeetItem';

function HotMeet() {
  return (
    <S.Container>
      <HotMeetItem />
      <HotMeetItem />
      <HotMeetItem />
      <HotMeetItem />

      <div className="more">더보기</div>

      <HotMeetItem />
      <HotMeetItem />
      <HotMeetItem />
      <HotMeetItem />

      <div className="more">더보기</div>
    </S.Container>
  );
}

export default HotMeet;
