/** 일정 - 내일정 tab - card 컴포넌트 */
import React from 'react';
import * as S from '@/components/Style/Schedule/SchduleCard.styled';
import { SchduleCardProps } from '@/models/schdule';

const SchduleCard = ({
  backGroundImg,
  scheduleTitle,
  departure,
  arrival,
  startDate,
  endDate,
  tripDay,
  dDay,
  onClick,
}: SchduleCardProps) => {
  return (
    <S.CardContainder onClick={onClick}>
      <S.CardWarp backGroundImg={backGroundImg}>
        <S.CardDateWrap>
          <S.CardDDay>{dDay}</S.CardDDay>
          <S.CardScheduleDate>
            <p>
              {startDate} - {endDate}
            </p>
          </S.CardScheduleDate>
        </S.CardDateWrap>
        <S.CardInfo>
          <span>{scheduleTitle}</span>

          <p>
            {departure} - {arrival}
          </p>
        </S.CardInfo>
        <S.CardDdayBadge>{tripDay}</S.CardDdayBadge>
      </S.CardWarp>
    </S.CardContainder>
  );
};
export default SchduleCard;
