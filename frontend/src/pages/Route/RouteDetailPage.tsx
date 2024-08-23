import Icon from '@/components/common/Icon/Icon';
import * as R from '@/components/Style/Route/RouteDetailPage.styled';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getRouteDetail } from '@/api/route/GET';
import {
  AttractionsProps,
  RouteDetailDayProps,
  RouteDetailProps,
} from '@/models/route';
import Header from '@/components/common/Header/Header';
import Button from '@/components/common/Button/Button';
import RouteDetailInfo from '@/components/Style/Route/RouteDetailInfo';

function RouteDetailPage() {
  const { routeid } = useParams();
  const [selected, setSelected] = useState<string>('course');
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [routeData, setRouteData] = useState<RouteDetailProps>(null!);
  const [dayData, setDayData] = useState<RouteDetailDayProps[]>([]);
  const [totalDistance, setTotalDistance] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);
  const [attractions, setAttractions] = useState<AttractionsProps[]>([]);
  const [linePath, setLinePath] = useState([]);

  useEffect(() => {
    if (dayData.length === 0) {
      console.log(routeid);
      getRouteDetail(routeid as string).then((result) => {
        if (result.status === 200) {
          let num = 0;
          let rd: RouteDetailProps = {
            routeName: result.data.data.course.courseName,
            routeContent: result.data.data.course.content,
            writeDate: result.data.data.course.writeDate,
            routeComment: 3,
            routeScore: 3.5,
          };
          setRouteData(rd);
          result.data.data.courseDays.map((ele: any) => {
            let data: RouteDetailDayProps = {
              dayNum: ele.dayNumber,
              totalDistance: ele.total_distance,
              totalCalorie: ele.total_calorie,
              totalDuration: ele.total_duration,
            };
            setDayData((pre) => [...pre, data]);
            num += Number(ele.total_distance.split('k')[0]);
          });
          setTotalDistance(num);
          setLatitude(result.data.data.attractions[0].lat);
          setLongitude(result.data.data.attractions[0].lon);

          let attArr: AttractionsProps[] = [];
          result.data.data.attractions.map((ele: any) => {
            let attData: AttractionsProps = {
              name: ele.name,
              type: ele.type,
              attractionId: ele.attractionId,
              address: ele.address,
              latitude: ele.lat,
              longitude: ele.lon,
            };
            attArr.push(attData);
          });
          setAttractions(attArr);
        }

        setLoading(true);
      });
    }
  }, []);

  return loading ? (
    <R.Container>
      <Header purpose="route-detail" back={true} clickBack={() => {}} />
      <R.Main>
        <R.Overflow>
          <R.RouteInfoContainer>
            <R.ImgBox></R.ImgBox>
            <R.UserContainer>
              <R.UserImgBox>
                <Icon name="IconUserBasicImg" size={42} />
              </R.UserImgBox>
              <R.UserName>작성자</R.UserName>
            </R.UserContainer>
            <R.RouteNameInfo>
              <R.RouteNameInfoContainer>
                <R.RouteName>{routeData.routeName}</R.RouteName>
                <R.RouteInfo>{routeData.routeContent}</R.RouteInfo>
              </R.RouteNameInfoContainer>
              <R.RouteReviewContainer>
                <R.IconContainer>
                  <R.IconBox>
                    <Icon name="IconGreyStar" size={10} />
                    {routeData.routeScore}
                  </R.IconBox>
                  <R.IconBox>
                    <Icon
                      name="IconGreyReview"
                      size={10}
                      style={{ marginLeft: '0.9rem' }}
                    />
                    {routeData.routeComment}
                  </R.IconBox>
                </R.IconContainer>
                <R.WriteDateBox>{routeData.writeDate}</R.WriteDateBox>
              </R.RouteReviewContainer>
            </R.RouteNameInfo>
            <R.RouteDateBox>
              <R.StartDateBox>
                <R.DateBox>
                  <R.DateText>출발일 2024.08.04 </R.DateText>
                  <R.DateText>도착일 2024.08.16 </R.DateText>
                </R.DateBox>
                <R.DistanceBox>
                  <R.DistanceText>총 이동거리</R.DistanceText>
                  <R.Distance>{totalDistance}km</R.Distance>
                </R.DistanceBox>
              </R.StartDateBox>
              <R.EndDateBox>
                <R.DateBox>
                  <R.DateText>출발일 2024.08.04 </R.DateText>
                  <R.DateText>도착일 2024.08.16 </R.DateText>
                </R.DateBox>
                <R.DistanceBox>
                  <R.DistanceText>총 일정기간</R.DistanceText>
                  <R.Distance>
                    {dayData[dayData.length - 1].dayNum - 1}박{' '}
                    {dayData[dayData.length - 1].dayNum}일
                  </R.Distance>
                </R.DistanceBox>
              </R.EndDateBox>
            </R.RouteDateBox>
            <R.ContentSelecContainer>
              <R.ContentBox
                isSelected={selected === 'course'}
                onClick={() => {
                  setSelected('course');
                }}
              >
                코스
              </R.ContentBox>
              <R.ContentBox
                isSelected={selected === 'information'}
                onClick={() => {
                  setSelected('information');
                }}
              >
                정보
              </R.ContentBox>
              <R.ContentBox
                isSelected={selected === 'review'}
                onClick={() => {
                  setSelected('review');
                }}
              >
                리뷰
              </R.ContentBox>
            </R.ContentSelecContainer>
          </R.RouteInfoContainer>
          <R.RouteDetailInfoContainer>
            <RouteDetailInfo
              linePath={linePath}
              selected={selected}
              selectedDay={selectedDay}
              latitude={latitude}
              longitude={longitude}
              dayData={dayData}
              attractions={attractions}
              setLoading={setLoading}
              setSelectedDay={setSelectedDay}
            />
          </R.RouteDetailInfoContainer>
        </R.Overflow>
      </R.Main>
      <R.BottomContainer>
        <R.ButtonBox>
          <Button
            width={35}
            height={6}
            fontColor="ffffff"
            backgroundColor="#1A823B"
            radius={0.7}
            fontSize={1.6}
            children="일정 생성"
            color="#ffffff"
            onClick={() => {}}
          />
        </R.ButtonBox>
      </R.BottomContainer>
    </R.Container>
  ) : null;
}

export default RouteDetailPage;
