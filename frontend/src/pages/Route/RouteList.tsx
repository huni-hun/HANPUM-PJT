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

  useEffect(() => {
    const data: RouteListProps[] = [];
    getRouteList('해안길').then((result) => {
      if (result.status === 200) {
        let response: RouteListProps = {
          routeName: result.data.data.courseListMap.해안길[0].courseName,
          routeContent: result.data.data.courseListMap.해안길[0].content,
          routeScore: result.data.data.courseListMap.해안길[0].scoreAvg,
          routeComment: result.data.data.courseListMap.해안길[0].commentCnt,
          routeId: result.data.data.courseListMap.해안길[0].courseId,
          img: result.data.data.courseListMap.해안길[0].backgroundImg,
          writeState: result.data.data.courseListMap.해안길[0].writeState,
          openState: result.data.data.courseListMap.해안길[0].openState,
          memberId: result.data.data.courseListMap.해안길[0].memberId,
          writeDate: result.data.data.courseListMap.해안길[0].writeDate,
        };
        for (let i = 0; i < 5; i++) {
          data.push(response);
        }

        setArr(data);
      }
    });
  }, []);
  return (
    <R.RouteListContainer>
      <Header purpose="merge" back={false} clickBack={() => {}} />
      <R.MainContainer>
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
        <R.MentContainer>🤔찾으시는 코스가 없으신가요?</R.MentContainer>
        <R.ButtonContainer>
          <Button
            width={90}
            height={7}
            fontColor="ffffff"
            backgroundColor="#A0A0A0"
            radius={0.7}
            fontSize={1.6}
            children="나의 경로 만들기"
            color=""
            onClick={() => {
              navigator('/route/addMain');
            }}
          />
        </R.ButtonContainer>
      </R.MainContainer>
      <BottomTab />
    </R.RouteListContainer>
  );
}

export default RouteList;
