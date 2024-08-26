/** 모임 List (main) */

import Header from '@/components/common/Header/Header';
import Button from '../../components/common/Button/Button';
import Icon from '../../components/common/Icon/Icon';
import RouteCard from '../../components/Style/Route/RouteCard';
import * as R from '../../components/Style/Route/RouteList.styled';
import BottomTab from '@/components/common/BottomTab/BottomTab';
import { useEffect, useState } from 'react';
import { getRouteList } from '@/api/route/GET';
import { RouteListProps } from '@/models/route';
import { useNavigate } from 'react-router-dom';

function RouteList() {
  const [arr, setArr] = useState<RouteListProps[]>([]);
  const navigator = useNavigate();

  return (
    <R.RouteListContainer>
      <Header purpose="merge" back={false} clickBack={() => {}} />
      <R.MainContainer>
        <R.RouteCardContainer>
          <R.RouteTypeHeader>
            <R.TypeTitle>김미미님에게 잘 맞는 경로</R.TypeTitle>
            <R.MoreButton>
              <R.MoreText>더보기</R.MoreText>
              <Icon name="IconLeftBlackArrow" size={10} />
            </R.MoreButton>
          </R.RouteTypeHeader>
          <R.CardContainer>
            <R.BlankBox />
            <R.OverFlow>
              <RouteCard {...arr[0]} />
            </R.OverFlow>
          </R.CardContainer>
        </R.RouteCardContainer>
        <R.RouteCardContainer>
          <R.RouteTypeHeader>
            <R.TypeTitle>지금 가장 인기 있는 코스</R.TypeTitle>
            <R.MoreButton
              onClick={() => {
                navigator('/route/list/more');
              }}
            >
              <R.MoreText>더보기</R.MoreText>
              <Icon name="IconLeftBlackArrow" size={10} />
            </R.MoreButton>
          </R.RouteTypeHeader>
          <R.CardContainer>
            <R.BlankBox />
            <R.OverFlow>
              {arr.map((ele) => (
                <RouteCard {...ele} />
              ))}
            </R.OverFlow>
          </R.CardContainer>
        </R.RouteCardContainer>
        <R.RouteCardContainer>
          <R.RouteTypeHeader>
            <R.TypeTitle>지금 가장 인기 있는 코스</R.TypeTitle>
            <R.MoreButton>
              <R.MoreText>더보기</R.MoreText>
              <Icon name="IconLeftBlackArrow" size={10} />
            </R.MoreButton>
          </R.RouteTypeHeader>
          <R.CardContainer>
            <R.BlankBox />
            <R.OverFlow>
              {arr.map((ele) => (
                <RouteCard {...ele} />
              ))}
            </R.OverFlow>
          </R.CardContainer>
        </R.RouteCardContainer>
        <R.RouteCardContainer>
          <R.RouteTypeHeader>
            <R.TypeTitle>지금 가장 인기 있는 코스</R.TypeTitle>
            <R.MoreButton>
              <R.MoreText>더보기</R.MoreText>
              <Icon name="IconLeftBlackArrow" size={10} />
            </R.MoreButton>
          </R.RouteTypeHeader>
          <R.CardContainer>
            <R.BlankBox />
            <R.OverFlow>
              {arr.map((ele) => (
                <RouteCard {...ele} />
              ))}
            </R.OverFlow>
          </R.CardContainer>
        </R.RouteCardContainer>
        <R.ButtonContainer>
          <R.RouteAddBtn
            onClick={() => {
              navigator('/route/addMain');
            }}
          >
            <R.RouteAddBtnTextBox>
              <R.RouteAddBasicText>
                찾으시는 경로가 없으신가요?
              </R.RouteAddBasicText>
              <R.RouteAddBoldText>나의 경로 만들기</R.RouteAddBoldText>
            </R.RouteAddBtnTextBox>
            <Icon name="IconRouteAdd" size={70} />
          </R.RouteAddBtn>
        </R.ButtonContainer>
      </R.MainContainer>
      <BottomTab />
    </R.RouteListContainer>
  );
}

export default RouteList;
