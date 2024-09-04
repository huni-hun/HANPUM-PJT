import React, { useState } from 'react';
import * as S from '../../Style/My/category/Interest.styled';
import { useQuery } from 'react-query';
import { GetInterestMeetList } from '@/api/mypage/GET';
import { STATUS } from '@/constants';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import NoHave from '../NoHave';
import CardLong from '@/components/common/CardLong/CardLong';

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
      routeName: '대전에서 서울까지',
      routeContent: '서울에서 대전까지 가는 초보자용 코스입니다.',
      routeScore: 3.25,
      routeComment: 2,
      routeId: 1,
      img: 'testurl',
      writeState: false,
      openState: true,
      memberId: 1,
      writeDate: '2024-08-27',
      start: '서울',
      end: '대전',
      totalDistance: 76,
      totalDays: 6,
      interestFlag: false,
    },
    {
      routeName: '대전에서 서울까지',
      routeContent: '서울에서 대전까지 가는 초보자용 코스입니다.',
      routeScore: 3.25,
      routeComment: 2,
      routeId: 2,
      img: 'testurl',
      writeState: false,
      openState: true,
      memberId: 1,
      writeDate: '2024-08-27',
      start: '서울',
      end: '대전',
      totalDistance: 76,
      totalDays: 6,
      interestFlag: false,
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
                key={item.routeId}
                hasHeart={true}
                item={item}
                isSwiped={swipedId === item.routeId}
                onSwipe={handleSwipe}
                onClickOutside={handleClickOutside}
              />
            ))}
          </div>
        ))}

      {/*  모임 */}
      {tab === '모임' &&
        meet &&
        (meet.data.groupResDtoList.length === 0 ? (
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
