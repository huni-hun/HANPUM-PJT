import Header from '../common/Header/Header';
import Text from '../common/Text';
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

      <Text $typography="t20">지금 가장 인기 있는 모임</Text>
      <HotMeetItem />
      <HotMeetItem />
      <HotMeetItem />
      <HotMeetItem />
      <div className="more">더보기</div>
    </S.Container>
  );
}

export default HotMeet;
