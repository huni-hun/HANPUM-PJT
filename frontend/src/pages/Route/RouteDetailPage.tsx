import Icon from '@/components/common/Icon/Icon';
import * as R from '@/components/Style/Route/RouteDetailPage.styled';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  getRouteDayDetail,
  getRouteDetail,
  getRouteReview,
} from '@/api/route/GET';
import {
  AttractionsProps,
  DaysOfRouteProps,
  RouteDetailDayProps,
  RouteDetailProps,
  RouteReviewProps,
} from '@/models/route';
import Header from '@/components/common/Header/Header';
import Button from '@/components/common/Button/Button';
import RouteDetailInfo from '@/components/Style/Route/RouteDetailInfo';
import BottomSheet from '@/components/Style/Route/BottomSheet';
import ReviewModal from '@/components/Style/Route/ReviewModal';

function RouteDetailPage() {
  const { routeid } = useParams();
  const navigate = useNavigate();

  const [selected, setSelected] = useState<string>('course');
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [routeData, setRouteData] = useState<RouteDetailProps>(null!);
  const [dayData, setDayData] = useState<RouteDetailDayProps[]>([]);
  const [routeType, setRouteType] = useState<string[]>([]);
  const [totalDistance, setTotalDistance] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);
  const [attractions, setAttractions] = useState<AttractionsProps[]>([]);
  const [linePath, setLinePath] = useState([]);
  const [bsType, setBsType] = useState<string>('설정');
  const [reviewType, setReviewType] = useState<string>('최신순');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [retouch, setRetouch] = useState<boolean>(false);
  const [dayOfRoute, setDayOfRoute] = useState<DaysOfRouteProps[]>([]);
  const [reviewLoading, setReviewLoading] = useState<boolean>(false);
  const [reviews, setReviews] = useState<RouteReviewProps[]>([]);
  const [selectedIdx, setSelectedIdx] = useState<number>(-1);
  useEffect(() => {
    if (dayData.length === 0) {
      getRouteDetail(routeid as string).then((result) => {
        if (result.data.status !== 'ERROR' && result.status === 200) {
          let num = 0;
          let rd: RouteDetailProps = {
            routeName: result.data.data.course.courseName,
            routeContent: result.data.data.course.content,
            writeDate: result.data.data.course.writeDate,
            routeComment: result.data.data.course.commentCnt,
            routeScore: result.data.data.course.scoreAvg,
            start: result.data.data.course.startPoint,
            end: result.data.data.course.endPoint,
            img: result.data.data.course.backgroundImg,
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
          let type: string[] = [];
          result.data.data.course.courseTypes.map((ele: string) => {
            type.push(ele);
          });
          setRouteType(type);
          setTotalDistance(num);

          let attArr: AttractionsProps[] = [];
          result.data.data.attractions.map((ele: any) => {
            let attData: AttractionsProps = {
              name: ele.name,
              type: ele.type,
              attractionId: ele.attractionId,
              address: ele.address,
              latitude: ele.lat,
              longitude: ele.lon,
              img: ele.img,
            };
            attArr.push(attData);
          });
          setAttractions(attArr);
        }

        setLoading(true);
      });
    }
  }, []);

  useEffect(() => {
    getRouteDayDetail(routeid as string, selectedDay).then((result) => {
      if (result.status === 200) {
        let arr: DaysOfRouteProps[] = [];
        result.data.data.wayPoints.map((ele: any) => {
          let data: DaysOfRouteProps = {
            routeName: ele.name,
            routeAddress: ele.address,
            routeType: ele.type,
            routeId: ele.waypointId,
            routePoint: ele.pointNumber,
            latitude: ele.lat,
            longitude: ele.lon,
          };
          arr.push(data);
        });
        arr.sort((a: any, b: any) => a.routePoint - b.routePoint);
        setDayOfRoute(arr);

        setLatitude(arr[0].latitude);
        setLongitude(arr[0].longitude);
      }
    });
  }, [selectedDay]);

  useEffect(() => {
    getRouteReview(routeid as string).then((result) => {
      let arr: RouteReviewProps[] = [];
      if (result.data.status !== 'ERROR' && result.status === 200) {
        result.data.data.map((ele: any) => {
          let data: RouteReviewProps = {
            memberId: ele.memberId,
            routeId: ele.courseId,
            content: ele.content,
            score: ele.score,
            writeDate: ele.writeDate,
          };
          arr.push(data);
        });

        setReviews(arr);
      }
      setReviewLoading(true);
    });
  }, []);

  return loading ? (
    <R.Container>
      <Header
        purpose="route-detail"
        back={true}
        clickBack={() => {
          navigate(-1);
        }}
        clickOption={() => {
          setIsOpen(true);
          setBsType('설정');
        }}
      />
      <R.Main>
        <R.Overflow>
          <R.RouteInfoContainer>
            <R.ImgBox>
              <img src={routeData.img} />
            </R.ImgBox>
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
              <R.RouteTypeContainer>
                {routeType.map((ele: string) => (
                  <R.RouteType isLong={ele.length > 3}>{ele}</R.RouteType>
                ))}
              </R.RouteTypeContainer>
              <R.RouteReviewContainer>
                <R.IconContainer>
                  <R.IconBox>
                    <Icon name="IconGrenStar" size={13} />
                    {routeData.routeScore}
                  </R.IconBox>
                  {`(${routeData.routeComment})`}
                </R.IconContainer>
                <R.WriteDateBox>{routeData.writeDate}</R.WriteDateBox>
              </R.RouteReviewContainer>
            </R.RouteNameInfo>
            <R.RouteDateBox>
              <R.RouteDateTilteBox>경로 일정 정보</R.RouteDateTilteBox>
              <R.RouteDateInfoBox>
                <R.RoutePlaceInfoBox>
                  <R.PointText>출발지</R.PointText>
                  <R.PlaceText>{routeData.start}</R.PlaceText>
                </R.RoutePlaceInfoBox>
                <R.RoutePlaceInfoBox>
                  <R.PointText style={{ marginLeft: '1.5rem' }}>
                    도착지
                  </R.PointText>
                  <R.PlaceText style={{ marginLeft: '1.5rem' }}>
                    {routeData.end}
                  </R.PlaceText>
                </R.RoutePlaceInfoBox>
                <R.RouteIconBox>
                  <R.ArrowBox>
                    <Icon name="IconArrowBlack" size={10} />
                  </R.ArrowBox>
                  <R.DistanceNumBox>
                    {Math.round(totalDistance)}km
                  </R.DistanceNumBox>
                </R.RouteIconBox>
              </R.RouteDateInfoBox>
              <R.RouteDateTextBox>
                총 일정기간
                <R.DateBoldText>{`${dayData.length - 1}박 ${dayData.length}일`}</R.DateBoldText>
              </R.RouteDateTextBox>
            </R.RouteDateBox>
            <R.ContentSelecContainer>
              <R.ContentBox
                selected={selected === 'course'}
                onClick={() => {
                  setSelected('course');
                }}
              >
                코스
              </R.ContentBox>
              <R.ContentBox
                selected={selected === 'information'}
                onClick={() => {
                  setSelected('information');
                }}
              >
                관광지
              </R.ContentBox>
              <R.ContentBox
                selected={selected === 'review'}
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
              deleteHandler={(name: string) => {}}
              setSelectedIdx={setSelectedIdx}
              reviews={reviews}
              setDayOfRoute={setDayOfRoute}
              dayOfRoute={dayOfRoute}
              linePath={linePath}
              selected={selected}
              selectedDay={selectedDay}
              latitude={latitude}
              longitude={longitude}
              dayData={dayData}
              attractions={attractions}
              setLoading={setLoading}
              setSelectedDay={setSelectedDay}
              setIsOpen={setIsOpen}
              setBsType={setBsType}
              reviewType={reviewType}
            />
          </R.RouteDetailInfoContainer>
        </R.Overflow>
      </R.Main>
      <R.BottomContainer>
        <R.WriteTextBox
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          리뷰작성
        </R.WriteTextBox>
        <R.ButtonBox>
          <Button
            width={65}
            height={6}
            fc="ffffff"
            bc="#1A823B"
            radius={0.7}
            fontSize={1.6}
            children="일정 생성"
            color="#ffffff"
            onClick={() => {
              navigate('/schedule/addSchedule');
            }}
          />
        </R.ButtonBox>
      </R.BottomContainer>
      {isOpen && (
        <BottomSheet
          id={Number(routeid)}
          selected={reviewType}
          setSelected={setReviewType}
          bsType={bsType}
          setIsOpen={setIsOpen}
        />
      )}
      {isModalOpen && (
        <ReviewModal isVisible={isModalOpen} setIsOpen={setIsModalOpen} />
      )}
    </R.Container>
  ) : null;
}

export default RouteDetailPage;
