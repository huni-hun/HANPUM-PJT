/** 일정 등록 완료 page */

import { useState } from 'react';
import * as S from '../../components/Style/Schedule/AddSchdulePage.styled';
import * as A from '../../components/Style/Schedule/SuccessPage.styled';

import Header from '@/components/common/Header/Header';
import { useNavigate } from 'react-router-dom';
import successImg from '../../assets/img/successSchedule.png';
import BaseButton from '@/components/common/BaseButton';
import Button from '@/components/common/Button/Button';
import { colors } from '@/styles/colorPalette';

function SuccessAddSchedulePage() {
  const navigate = useNavigate();

  const clickBtn = () => {
    navigate(`/schedule/main`);
  };

  return (
    <A.SuccessContainer>
      <Header
        purpose="title"
        clickBack={() => navigate('/schedule/addSchedule')}
      />
      <S.SchduleContainer>
        <A.SuccessWrap>
          <img src={successImg} alt="" />
          <span>나의 일정이</span>
          <span>등록되었어요!</span>
        </A.SuccessWrap>
        <A.BtnWrap>
          <Button
            width={70}
            height={5}
            fc="ffffff"
            bc={colors.main}
            radius={0.7}
            fontSize={1.6}
            children="시작하기"
            color="#ffffff"
            onClick={clickBtn}
          />
        </A.BtnWrap>
      </S.SchduleContainer>
    </A.SuccessContainer>
  );
}

export default SuccessAddSchedulePage;
