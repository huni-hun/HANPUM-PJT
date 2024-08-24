/** feed 정보 컴포넌트 */
import React from 'react';
import * as S from '@/components/Style/Schedule/SchduleCard.styled';
import { SchduleCardProps } from '@/models/schdule';

const SchduleCard = ({
  backGroundImg,
  scheduleTitle,
  departure,
  arrival,
}: SchduleCardProps) => {
  return (
    <S.CardContainder>
      <S.CardWarp backGroundImg={backGroundImg}>{scheduleTitle}</S.CardWarp>
    </S.CardContainder>
  );
};

export default SchduleCard;
