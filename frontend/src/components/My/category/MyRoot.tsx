import React, { useState } from 'react';
import * as S from '../../Style/My/category/MyRoot.styled';
import BaseButton from '../../common/BaseButton';

import Text from '../../common/Text';
import Flex from '../../common/Flex';
import Icon from '../../common/Icon/Icon';
import CardLong from '../../common/CardLong/CardLong';

function MyRoot() {
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

  const [swipedCard, setSwipedCard] = useState<number | null>(null);

  const handleSwipe = (id: number) => {
    setSwipedCard(id);
  };

  const handleClickOutside = () => {
    setSwipedCard(null);
  };

  return (
    <S.MyRootContainer>
      <div className="card-container">
        {root.map((item) => (
          <CardLong
            key={item.routeId}
            item={item}
            hasLock={true}
            canDelete={true}
            isSwiped={swipedCard === item.routeId}
            onSwipe={handleSwipe}
            onClickOutside={handleClickOutside}
          />
        ))}
      </div>
    </S.MyRootContainer>
  );
}

export default MyRoot;
