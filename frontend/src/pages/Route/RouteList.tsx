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
import CardLong from '@/components/common/CardLong/CardLong';

function RouteList() {
  const [arr, setArr] = useState<RouteListProps[]>([]);
  const [arrC, setArrC] = useState<RouteListProps[]>([]);
  const [arrD, setArrD] = useState<RouteListProps[]>([]);
  const [morePageOpen, setMoreOpenPage] = useState<boolean>(false);
  const navigator = useNavigate();

  useEffect(() => {
    const data: RouteListProps[] = [];
    getRouteList('해안길').then((result) => {
      if (result.status === 200) {
        result.data.data.courseListMap['해안길'].map((ele: any) => {
          let data: RouteListProps = {
            routeName: ele.courseName,
            routeContent: ele.content,
            routeScore: ele.scoreAvg,
            routeComment: ele.commentCnt,
            routeId: ele.courseId,
            img: ele.backgroundImg,
            writeState: ele.writeState,
            openState: ele.openState,
            memberId: ele.memberId,
            writeDate: ele.writeDate,
            start: ele.startPoint,
            end: ele.endPoint,
            totalDistance: Math.round(ele.totalDistance),
            totalDays: ele.totalDays,
            interestFlag: ele.interestFlag,
          };

          setArr((pre) => [...pre, data]);
        });
      }
    });

    getRouteList('초보자').then((result) => {
      if (result.status === 200) {
        result.data.data.courseListMap['초보자'].map((ele: any) => {
          let data: RouteListProps = {
            routeName: ele.courseName,
            routeContent: ele.content,
            routeScore: ele.scoreAvg,
            routeComment: ele.commentCnt,
            routeId: ele.courseId,
            img: ele.backgroundImg,
            writeState: ele.writeState,
            openState: ele.openState,
            memberId: ele.memberId,
            writeDate: ele.writeDate,
            start: ele.startPoint,
            end: ele.endPoint,
            totalDistance: Math.round(ele.totalDistance),
            totalDays: ele.totalDays,
            interestFlag: ele.interestFlag,
          };

          setArrC((pre) => [...pre, data]);
        });
      }
    });

    getRouteList('숙련자').then((result) => {
      if (result.status === 200) {
        result.data.data.courseListMap['숙련자'].map((ele: any) => {
          let data: RouteListProps = {
            routeName: ele.courseName,
            routeContent: ele.content,
            routeScore: ele.scoreAvg,
            routeComment: ele.commentCnt,
            routeId: ele.courseId,
            img: ele.backgroundImg,
            writeState: ele.writeState,
            openState: ele.openState,
            memberId: ele.memberId,
            writeDate: ele.writeDate,
            start: ele.startPoint,
            end: ele.endPoint,
            totalDistance: Math.round(ele.totalDistance),
            totalDays: ele.totalDays,
            interestFlag: ele.interestFlag,
          };

          setArrD((pre) => [...pre, data]);
        });
      }
    });
  }, []);

  const clickMoreBtn = (keyword: string) => {
    navigator('/route/list/more', { state: { keyword: keyword } });
  };

  return (
    <R.RouteListContainer>
      <Header
        purpose="merge"
        back={false}
        clickBack={() => {}}
        clickOption={() => {
          navigator('/route/list/search');
        }}
        plusBtnclick={() => navigator('/route/addMain')}
      />
      <R.MainContainer>
        <R.RouteCardContainer>
          <R.RouteTypeHeader>
            <R.TypeTitle>김미미님에게 잘 맞는 경로</R.TypeTitle>
            <R.MoreButton>
              <R.MoreText
                onClick={() => {
                  clickMoreBtn('해안길');
                }}
              >
                더보기
              </R.MoreText>
              <Icon name="IconLeftBlackArrow" size={10} />
            </R.MoreButton>
          </R.RouteTypeHeader>
          <R.CardContainer>
            <R.BlankBox />
            <R.OverFlow>
              {arr.map((ele) => (
                <RouteCard {...ele} key={ele.routeId} />
              ))}
            </R.OverFlow>
            <R.BlankBox />
          </R.CardContainer>
        </R.RouteCardContainer>
        <R.RouteCardContainer>
          <R.RouteTypeHeader>
            <R.TypeTitle>지금 가장 인기 있는 코스</R.TypeTitle>
            <R.MoreButton
              onClick={() => {
                clickMoreBtn('해안길');
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
                <RouteCard {...ele} key={ele.routeId} />
              ))}
            </R.OverFlow>
          </R.CardContainer>
        </R.RouteCardContainer>
        <R.RouteCardContainer>
          <R.RouteTypeHeader>
            <R.TypeTitle>초보자를 위한 코스</R.TypeTitle>
            <R.MoreButton>
              <R.MoreText
                onClick={() => {
                  clickMoreBtn('초보자');
                }}
              >
                더보기
              </R.MoreText>
              <Icon name="IconLeftBlackArrow" size={10} />
            </R.MoreButton>
          </R.RouteTypeHeader>
          <R.CardContainer>
            <R.BlankBox />
            <R.OverFlow>
              {arrC.map((ele) => (
                <RouteCard {...ele} />
              ))}
            </R.OverFlow>
          </R.CardContainer>
        </R.RouteCardContainer>
        <R.RouteCardContainer>
          <R.RouteTypeHeader>
            <R.TypeTitle>숙련자를 위한 코스</R.TypeTitle>
            <R.MoreButton>
              <R.MoreText
                onClick={() => {
                  clickMoreBtn('숙련자');
                }}
              >
                더보기
              </R.MoreText>
              <Icon name="IconLeftBlackArrow" size={10} />
            </R.MoreButton>
          </R.RouteTypeHeader>
          <R.CardContainer>
            <R.BlankBox />
            <R.OverFlow>
              {arrD.map((ele) => (
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
