import styled from 'styled-components';
import img from '../../assets/img/mountain.jpg';
import MeetInfo from '@/components/Meet/MeetInfo';
import MeetSchedule from '@/components/Meet/MeetSchedule';
import MajorTour from '@/components/Meet/MajorTour';
import Member from '@/components/Meet/Member';
import { colors } from '@/styles/colorPalette';

function MeetDetailPage() {
  return (
    <MeetDetailPageContainer>
      <img src={img} alt="" />
      <MeetInfo />
      <div className="grayBox" />
      <MeetSchedule />
      <MajorTour />
      <Member />
    </MeetDetailPageContainer>
  );
}

export default MeetDetailPage;

const MeetDetailPageContainer = styled.div`
  width: 100%;
  height: 100%;

  img {
    width: 100%;
    height: 29.5rem;
  }

  .grayBox {
    width: 100%;
    height: 35.8rem;
    background-color: ${colors.grey1};
  }
`;
