import styled from 'styled-components';
import img from '../../assets/img/mountain.jpg';
import MeetInfo from '@/components/Meet/MeetInfo';

function MeetDetailPage() {
  return (
    <MeetDetailPageContainer>
      <img src={img} alt="" />
      <MeetInfo />
      <div className="grayBox" />
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
    background-color: #d9d9d9;
  }
`;
