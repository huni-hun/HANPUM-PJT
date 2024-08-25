import { useState } from 'react';
import * as S from '../../components/Style/Schedule/AddSchdulePage.styled';
import * as A from '../../components/Style/Schedule/SuccessPage.styled';

import Header from '@/components/common/Header/Header';
import { useNavigate } from 'react-router-dom';
import successImg from '../../assets/img/successSchedule.png';
import BaseButton from '@/components/common/BaseButton';

function SuccessAddSchedulePage() {
  const navigate = useNavigate();
  return (
    <S.Container>
      <Header purpose="title" clickBack={() => navigate(-1)} />
      <S.SchduleContainer>
        <A.SuccessWrap>
          <img src={successImg} />
          <p></p>
        </A.SuccessWrap>

        <BaseButton size="large" style={{}}>
          시작하기
        </BaseButton>
      </S.SchduleContainer>
    </S.Container>
  );
}

export default SuccessAddSchedulePage;
