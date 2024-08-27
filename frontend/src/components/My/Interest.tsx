import React, { useState } from 'react';
import * as S from '../Style/My/Interest.styled';
import NoHave from './NoHave';
import CardLong from '../common/CardLong/CardLong';
import { useQuery } from 'react-query';
import { GetInterestMeetList } from '@/api/mypage/GET';
import { STATUS } from '@/constants';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';

function Interest() {
  const [tab, setTab] = useState('경로');
  const [swipedId, setSwipedId] = useState<number | null>(null);

  const setTabvalue = (e: React.MouseEvent<HTMLElement>) => {
    setTab(e.currentTarget.innerText);
  };

  const handleSwipe = (id: number) => {
    setSwipedId(id);
  };

  const handleClickOutside = () => {
    setSwipedId(null);
  };

  const root = [
    {
      courseId: 1,
      courseName: '서울에서 대전까지',
      backgroundImg: 'testurl',
      content: '서울에서 대전까지 가는 초보자용 코스입니다.',
      writeState: false,
      openState: true,
      writeDate: '2024-08-27',
      startPoint: '서울',
      endPoint: '대전',
      totalDistance: 76,
      memberId: 1,
      courseTypes: null,
      scoreAvg: 3.25,
      commentCnt: 2,
    },
    {
      courseId: 2,
      courseName: '대전에서 서울까지',
      backgroundImg: 'testurl',
      content: '서울에서 대전까지 가는 초보자용 코스입니다.',
      writeState: false,
      openState: true,
      writeDate: '2024-08-27',
      startPoint: '서울',
      endPoint: '대전',
      totalDistance: 76,
      memberId: 1,
      courseTypes: null,
      scoreAvg: 3.25,
      commentCnt: 2,
    },
  ];

  const { data: meet } = useQuery(
    'getInterestMeet', // Query Key
    GetInterestMeetList,
    {
      onSuccess: (res) => {
        console.log('res ::', res.data);
        if (res.status === STATUS.success) {
        } else if (res.status === STATUS.error) {
          toast.error(res.message);
        }
      },
      onError: (error: AxiosError) => {
        toast.error(error.message);
      },
    },
  );

  return (
    <S.InterestContainer>
      <div className="tab">
        <div
          className={`tab-item ${tab === '경로' ? 'active' : ''}`}
          onClick={(e) => setTabvalue(e)}
        >
          경로
        </div>
        <div
          className={`tab-item ${tab === '모임' ? 'active' : ''}`}
          onClick={(e) => setTabvalue(e)}
        >
          모임
        </div>
      </div>

      {/*  경로 */}
      {tab === '경로' &&
        (root.length === 0 ? (
          <NoHave category="root" />
        ) : (
          <div className="card-container">
            {root.map((item) => (
              <CardLong
                key={item.courseId}
                hasHeart={true}
                item={item}
                isSwiped={swipedId === item.courseId}
                onSwipe={handleSwipe}
                onClickOutside={handleClickOutside}
              />
            ))}
          </div>
        ))}

      {/*  모임 */}
      {tab === '모임' &&
        (meet.length === 0 ? (
          <NoHave category="meet" />
        ) : // <div className="card-container">
        //   {meet.map((item, index) => (
        //     <CardLong key={index} item={item} />
        //   ))}
        // </div>
        null)}
    </S.InterestContainer>
  );
}

export default Interest;
