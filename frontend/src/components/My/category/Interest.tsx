import React, { useState } from 'react';
import * as S from '../../Style/My/category/Interest.styled';
import { useQuery } from 'react-query';
import { GetInterestMeetList, GetInterestRouteList } from '@/api/mypage/GET';
import { STATUS } from '@/constants';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import NoHave from '../NoHave';
import CardLong from '@/components/common/CardLong/CardLong';
import { useNavigate } from 'react-router-dom';

function Interest() {
  const [tab, setTab] = useState('경로');
  const [swipedId, setSwipedId] = useState<number | null>(null);
  const navigate = useNavigate();

  const setTabvalue = (e: React.MouseEvent<HTMLElement>) => {
    setTab(e.currentTarget.innerText);
  };

  const handleSwipe = (id: number) => {
    setSwipedId(id);
  };

  const handleClickOutside = () => {
    setSwipedId(null);
  };

  const { data: interestMeet } = useQuery(
    'getInterestMeet', // Query Key
    GetInterestMeetList,
    {
      onSuccess: (res) => {
        // console.log('res ::', res.data);
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

  const { data: interesRoot } = useQuery(
    'getInterestRoute', // Query Key
    GetInterestRouteList,
    {
      onSuccess: (res) => {
        // console.log('res ::', res.data);
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

  const onClickCard = (id: number) => {
    navigate(`/route/detail/${id}`, { state: { type: 'schedule' } });
  };

  const onClickCardMeet = (id: number) => {
    navigate(`/meet/detail`, { state: { groupId: id } });
  };

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
        interesRoot &&
        (interesRoot.data.length === 0 ? (
          <NoHave category="root" />
        ) : (
          <div className="card-container">
            {interesRoot.data.map((item: any) => (
              <CardLong
                key={item.courseId}
                hasHeart={true}
                item={item}
                isSwiped={swipedId === item.courseId}
                onSwipe={handleSwipe}
                onClickOutside={handleClickOutside}
                onClickCard={() => onClickCard(item.courseId)}
              />
            ))}
          </div>
        ))}

      {/*  모임 */}
      {tab === '모임' &&
        interestMeet &&
        (interestMeet.data.groupResDtoList.length === 0 ? (
          <NoHave category="meet" />
        ) : (
          <div className="card-container">
            {interestMeet.data.groupResDtoList.map((item: any) => (
              <CardLong
                key={item.groupId}
                item={item}
                hasHeart={true}
                isSwiped={swipedId === item.groupId}
                onSwipe={handleSwipe}
                onClickOutside={handleClickOutside}
                onClickCard={() => onClickCardMeet(item.groupId)}
              />
            ))}
          </div>
        ))}
    </S.InterestContainer>
  );
}

export default Interest;
