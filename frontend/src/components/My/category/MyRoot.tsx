import React, { useState } from 'react';
import * as S from '../../Style/My/category/MyRoot.styled';
import BaseButton from '../../common/BaseButton';

import Text from '../../common/Text';
import Flex from '../../common/Flex';
import Icon from '../../common/Icon/Icon';
import CardLong from '../../common/CardLong/CardLong';
import { useQuery } from 'react-query';
import { GetSelfRouteList } from '@/api/mypage/GET';
import { STATUS } from '@/constants';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { RouteDelete } from '@/api/route/Delete';
import { UserRouteProps } from '@/models/route';
import { MeetInfo } from '@/models/meet';
import MyRouteNoHave from './MyORFinishedNoHave';

function MyRoot() {
  const navigate = useNavigate();

  const [haveData, setHaveData] = useState<boolean>(false);

  const { data: userRoute, refetch } = useQuery(
    'getUserRoute',
    GetSelfRouteList,
    {
      onSuccess: (res) => {
        if (res.status === STATUS.success) {
          // 데이터 로직 처리
          if (res.data.length > 0) {
            setHaveData(true);
          }
        } else if (res.status === STATUS.error) {
          toast.error(res.message);
        }
      },
      onError: (error: AxiosError) => {
        toast.error(error.message);
      },
    },
  );

  const handleDeleteClick = (item: UserRouteProps) => {
    RouteDelete(String(item.courseId))
      .then((res) => {
        if (res.data.status === 'SUCCESS') {
          refetch();
          toast.done('경로 삭제에 성공했습니다.');
        } else {
          toast.error('경로 삭제 권한이 없습니다.');
        }
      })
      .catch((err) => {
        toast.error('경로 삭제에 실패했습니다.');
      });
  };

  const [swipedCard, setSwipedCard] = useState<number | null>(null);

  const handleSwipe = (id: number) => {
    setSwipedCard(id);
  };

  const handleClickOutside = () => {
    setSwipedCard(null);
  };

  const onClickCard = (id: number) => {
    navigate(`/route/detail/${id}`, { state: { type: 'schedule' } });
  };

  return (
    <S.MyRootContainer>
      <div className="card-container">
        {haveData ? (
          userRoute.data.map((item: any) => (
            <CardLong
              key={item.courseId}
              item={item}
              hasLock={true}
              canDelete={true}
              isSwiped={swipedCard === item.courseId}
              onSwipe={handleSwipe}
              onClickOutside={handleClickOutside}
              onClickCard={() => onClickCard(item.courseId)}
              onDeleteHandler={handleDeleteClick}
            />
          ))
        ) : (
          <MyRouteNoHave category="my" />
        )}
      </div>
    </S.MyRootContainer>
  );
}

export default MyRoot;
function isUserRouteProps(item: any) {
  throw new Error('Function not implemented.');
}
