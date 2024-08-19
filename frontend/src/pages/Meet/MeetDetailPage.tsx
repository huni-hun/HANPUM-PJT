import styled from 'styled-components';
import DummyImg from '../../assets/img/mountain.jpg';
import MeetInfo from '@/components/Meet/MeetInfo';
import MeetSchedule from '@/components/Meet/MeetSchedule';
import MajorTour from '@/components/Meet/MajorTour';
import Member from '@/components/Meet/Member';
import { colors } from '@/styles/colorPalette';

function MeetDetailPage() {
  /** feed 더미 데이터 */
  const dummyFeedData = {
    leaderName: '김땡땡',
    leaderImg: '/path/to/leaderImg.jpg',
    courseTitle: '태종대 전망대',
    courseDesc: '부산의 대표적인 관광지로...',
    departDate: '2024.07.13',
    arriveDate: '2024.07.26',
    totalDistance: '52.8KM',
    totalPeriod: '15박 16일',
    memberCount: '6/8',
    likeCount: 25,
  };

  /** day[index]마다 스케줄 리스트 */
  const dummySchduleListData = [
    {
      id: 1,
      title: '태종대 전망대',
      category: '관광지',
      address: '부산 영도구 전망로 209 1~3층',
      img: DummyImg,
    },
    {
      id: 2,
      title: '해운대 해수욕장',
      category: '해변',
      address: '부산 해운대구 해운대해변로 264',
      img: DummyImg,
    },
    {
      id: 3,
      title: '부산 타워',
      category: '관광지',
      address: '부산 중구 용두산길 37-55',
      img: DummyImg,
    },
  ];

  /** 주요 관광지 더미 데이터 */
  const dummyTourData = [
    { id: 1, place: '제주도', detail: '모슬포항', img: DummyImg },
    { id: 2, place: '부산', detail: '해운대', img: DummyImg },
    { id: 3, place: '강릉', detail: '경포대', img: DummyImg },
    { id: 4, place: '속초', detail: '속초해변', img: DummyImg },
  ];

  /** member 더미 데이터 */
  const dummyMemberData = [
    { id: 1, name: '김땡이', img: '이미지' },
    { id: 2, name: '박땡이', img: '이미지' },
    { id: 3, name: '이땡이', img: '이미지' },
    { id: 4, name: '최땡이', img: '이미지' },
    { id: 5, name: '정땡이', img: '이미지' },
    { id: 6, name: '홍땡이', img: '이미지' },
  ];

  return (
    <MeetDetailPageContainer>
      <img src={DummyImg} alt="" />

      <MeetInfo feedData={dummyFeedData} />
      <div className="grayBox" />
      <MeetSchedule scheduleDataList={dummySchduleListData} />
      <MajorTour majorTourData={dummyTourData} />
      <Member memberData={dummyMemberData} />
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
