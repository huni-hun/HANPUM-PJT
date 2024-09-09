import React, { useState } from 'react';
import * as S from '../../Style/My/category/MyRoot.styled';
import BaseButton from '../../common/BaseButton';

import Text from '../../common/Text';
import Flex from '../../common/Flex';
import Icon from '../../common/Icon/Icon';
import CardLong from '../../common/CardLong/CardLong';
import { useQuery } from 'react-query';
import { GetInterestRouteList } from '@/api/mypage/GET';
import { STATUS } from '@/constants';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

function MyRoot() {
  const navigate = useNavigate();

  const { data: userRoute } = useQuery('getUserRoute', GetInterestRouteList, {
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
  });

  const [swipedCard, setSwipedCard] = useState<number | null>(null);

  const handleSwipe = (id: number) => {
    setSwipedCard(id);
  };

  const handleClickOutside = () => {
    setSwipedCard(null);
  };

  const onClickCard = (id: number) => {
    navigate(`/route/detail/${id}`);
  };

  return (
    <S.MyRootContainer>
      <div className="card-container">
        {userRoute &&
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
            />
          ))}
      </div>
    </S.MyRootContainer>
  );
}

export default MyRoot;
