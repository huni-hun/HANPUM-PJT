import { useState } from 'react';
import * as S from '../../components/Style/Schedule/SchduleMainPage.styled';
import Button from '../../components/common/Button/Button';
import Header from '@/components/common/Header/Header';
import MeetInfo from '@/components/Meet/MeetInfo';
import MeetSchedule from '@/components/Meet/MeetSchedule';
import MajorTour from '@/components/Meet/MajorTour';
import Member from '@/components/Meet/Member';
import DummyImg from '../../assets/img/mountain.jpg';

// import PlusIcon from '../../PlusIcon.svg';

function ScheduleMainPage() {
  const BtnClick = () => {};

  const [isSelected, setIsSelected] = useState<String>('Mine');

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
    <S.Container>
      <Header purpose="user" />

      <S.SchduleTypeContainer>
        <S.SchduleTypeBox>
          <S.ScheduleType
            isSelected={isSelected === 'Proceeding'}
            onClick={() => {
              setIsSelected('Proceeding');
            }}
          >
            진행중
          </S.ScheduleType>
          <S.ScheduleType
            isSelected={isSelected === 'Mine'}
            onClick={() => {
              setIsSelected('Mine');
            }}
          >
            내 일정
          </S.ScheduleType>
          <S.ScheduleType
            isSelected={isSelected === 'class'}
            onClick={() => {
              setIsSelected('class');
            }}
          >
            모임일정
          </S.ScheduleType>
        </S.SchduleTypeBox>
      </S.SchduleTypeContainer>
      <S.ScheduleMainContainer>
        {/** 모임 피드 */}
        <MeetInfo feedData={dummyFeedData} />
        {/** map */}
        {/** course */}
        <MeetSchedule scheduleDataList={dummySchduleListData} />
        {/** 주요 관광지 */}
        <MajorTour majorTourData={dummyTourData} />
        {/** 모임멤버 */}
        <Member memberData={dummyMemberData} />
      </S.ScheduleMainContainer>
    </S.Container>
  );
}

export default ScheduleMainPage;
