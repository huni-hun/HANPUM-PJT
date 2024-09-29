import Header from '@/components/common/Header/Header';
import Button from '../../components/common/Button/Button';
import Icon from '../../components/common/Icon/Icon';
import RouteCard from '../../components/Style/Route/RouteCard';
import * as R from '../../components/Style/Route/RouteList.styled';
import BottomTab from '@/components/common/BottomTab/BottomTab';
import { useEffect, useState } from 'react';
import { getRouteList } from '@/api/route/GET';
import { RouteListProps } from '@/models/route';
import { useLocation, useNavigate } from 'react-router-dom';
import CardLong from '@/components/common/CardLong/CardLong';
import { GetUser } from '@/api/mypage/GET';
import { useQuery } from 'react-query';
import { STATUS } from '@/constants';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import Loading from '@/components/common/Loading';

function RouteList() {
  const [arr, setArr] = useState<RouteListProps[]>([]);
  const [arrC, setArrC] = useState<RouteListProps[]>([]);
  const [arrD, setArrD] = useState<RouteListProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [morePageOpen, setMoreOpenPage] = useState<boolean>(false);
  const navigator = useNavigate();

  const location = useLocation();
  const { startDate, recruitmentPeriod, type } = location.state || {};

  const { data: userInfo } = useQuery('getUser', GetUser, {
    onSuccess: (res) => {
      // console.log('res ::', res.data);
      if (res.status === STATUS.success) {
      } else if (res.status === STATUS.error) {
        toast.error(res.message);
      }
    },
    onError: (error: AxiosError) => {
      toast.error(error.message);
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(false); // Set loading to false while fetching data
      try {
        const [seaRoutes, beginnerRoutes, expertRoutes] = await Promise.all([
          getRouteList('해안길', 4),
          getRouteList('초보자', 4),
          getRouteList('숙련자', 4),
        ]);

        // 해안길 데이터 처리
        if (seaRoutes.status === 200) {
          seaRoutes.data.data.courseListMap['해안길'].forEach((ele: any) => {
            const data: RouteListProps = {
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

        // 초보자 데이터 처리
        if (beginnerRoutes.status === 200) {
          beginnerRoutes.data.data.courseListMap['초보자'].forEach(
            (ele: any) => {
              const data: RouteListProps = {
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
            },
          );
        }

        // 숙련자 데이터 처리
        if (expertRoutes.status === 200) {
          expertRoutes.data.data.courseListMap['숙련자'].forEach((ele: any) => {
            const data: RouteListProps = {
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
      } catch (error) {
        toast.error('경로를 가져오지 못 했습니다.');
      } finally {
        setLoading(true); // Set loading to true after all data is fetched
      }
    };

    fetchData();
  }, []);

  const clickMoreBtn = (keyword: string) => {
    navigator('/route/list/more', { state: { keyword: keyword } });
  };

  return loading ? (
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
            {userInfo && (
              <R.TypeTitle>
                {userInfo.data.nickname}님에게 잘 맞는 경로
              </R.TypeTitle>
            )}
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
                <RouteCard
                  ele={ele}
                  startDate={startDate}
                  type={type}
                  recruitmentPeriod={recruitmentPeriod}
                  key={ele.routeId}
                />
              ))}
            </R.OverFlow>
            <R.BlankBox />
          </R.CardContainer>
        </R.RouteCardContainer>
        <R.RouteCardContainer>
          <R.RouteTypeHeader>
            <R.TypeTitle>지금 가장 인기 있는 경로</R.TypeTitle>
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
                <RouteCard
                  ele={ele}
                  startDate={startDate}
                  type={type}
                  recruitmentPeriod={recruitmentPeriod}
                  key={ele.routeId}
                />
              ))}
            </R.OverFlow>
          </R.CardContainer>
        </R.RouteCardContainer>
        <R.RouteCardContainer>
          <R.RouteTypeHeader>
            <R.TypeTitle>초보자를 위한 경로</R.TypeTitle>
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
                <RouteCard
                  ele={ele}
                  startDate={startDate}
                  type={type}
                  recruitmentPeriod={recruitmentPeriod}
                  key={ele.routeId}
                />
              ))}
            </R.OverFlow>
          </R.CardContainer>
        </R.RouteCardContainer>
        <R.RouteCardContainer>
          <R.RouteTypeHeader>
            <R.TypeTitle>숙련자를 위한 경로</R.TypeTitle>
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
                <RouteCard
                  ele={ele}
                  startDate={startDate}
                  type={type}
                  recruitmentPeriod={recruitmentPeriod}
                  key={ele.routeId}
                />
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
  ) : (
    <Loading />
  );
}

export default RouteList;
