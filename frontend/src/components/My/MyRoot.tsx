import React, { useState } from 'react';
import * as S from '../Style/My/MyRoot.styled';
import BaseButton from '../common/BaseButton';

import Text from '../common/Text';
import Flex from '../common/Flex';
import Icon from '../common/Icon/Icon';
import CardLong from '../common/CardLong/CardLong';

function MyRoot() {
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
            key={item.courseId}
            item={item}
            hasLock={true}
            canDelete={true}
            isSwiped={swipedCard === item.courseId}
            onSwipe={handleSwipe}
            onClickOutside={handleClickOutside}
          />
        ))}
      </div>
    </S.MyRootContainer>
  );
}

export default MyRoot;
