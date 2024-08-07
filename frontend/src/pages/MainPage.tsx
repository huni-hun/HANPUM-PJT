import BottomTab from '@/components/common/BottomTab/BottomTab';
import styled from 'styled-components';

function MainPage() {
  return (
    <MainPageContainer>
      <div className="schedule"></div>
      <p>동동님을 위한 추천코스</p>
      <div className="course"></div>
      <p>모임추천</p>
      {/* swiper */}
      {/* <BottomTab /> */}
    </MainPageContainer>
  );
}

export default MainPage;

const MainPageContainer = styled.div`
  width: 100%;
  height: 100%;

  .schedule {
    margin: 24px auto;
    width: 34.3rem;
    height: 24rem;
    border-radius: 2rem;
    box-shadow: 0px 4px 4px 0 rgba(0, 0, 0, 0.25);
  }

  .course {
    width: 34.3rem;
    height: 19.9rem;
    border-radius: 17px;
    border: 1px solid;
    box-sizing: border-box;
    margin: 16px auto 20px;
  }
  p {
    padding: 0 24px;
    font-size: 2rem;
    font-weight: bold;
  }
`;
