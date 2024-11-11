/** 일정 - 내일정 tab - card 컴포넌트 */
import React from 'react';
import * as S from '@/components/Style/Schedule/SchduleCard.styled';
import { SchduleCardProps } from '@/models/schdule';

const SchduleCard = ({
  backgroundImg,
  title,
  startPoint,
  endPoint,
  startDate,
  endDate,
  tripDay,
  dDay,
  onClick,
}: SchduleCardProps) => {
  // dDay가 "d+1"과 같은 형식일 때 '진행완료' 텍스트를 추가
  const displayDDay = dDay && dDay.includes('+') ? '진행완료' : dDay || '';

  return (
    <S.CardContainder onClick={onClick}>
      <S.CardWarp backGroundImg={backgroundImg || ''}>
        <S.CardDateWrap>
          <S.CardDDay>{displayDDay}</S.CardDDay>
          <S.CardScheduleDate>
            <p>
              {startDate} - {endDate}
            </p>
          </S.CardScheduleDate>
        </S.CardDateWrap>
        <S.CardInfo>
          <span>{title}</span>
          <p>
            {startPoint} - {endPoint}
          </p>
        </S.CardInfo>
        <S.CardDdayBadge>{tripDay}</S.CardDdayBadge>
      </S.CardWarp>
    </S.CardContainder>
  );
};

export default SchduleCard;
