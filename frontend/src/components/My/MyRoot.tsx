import React from 'react';
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

  return (
    <S.MyRootContainer>
      {root.map((item) => (
        <div className="card-container">
          <CardLong item={item} hasLock={true} canDelete={true} />
        </div>
      ))}
    </S.MyRootContainer>
  );
}

export default MyRoot;
