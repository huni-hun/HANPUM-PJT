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
    <A.SuccessContainer>
      <Header
        purpose="title"
        clickBack={() => navigate('/schedule/addSchedule')}
      />
      <S.SchduleContainer>
        <A.SuccessWrap>
          <img src={successImg} />
          <span>나의 일정이</span>
          <span>등록되었어요!</span>
        </A.SuccessWrap>

        <BaseButton size="large" style={{}}>
          시작하기
        </BaseButton>
      </S.SchduleContainer>
    </A.SuccessContainer>
  );
}

export default SuccessAddSchedulePage;
