import { getRouteDayDetail, getRouteReview } from '@/api/route/GET';
import * as R from '@/components/Style/Route/RouteDetailPage.styled';
import {
  AttractionsProps,
  DaysOfRouteProps,
  RouteDetailDayProps,
  RouteReviewProps,
} from '@/models/route';
import { useEffect, useRef, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Map from '@/components/common/Map/Map';
import RoutePlaceCard from './RoutePlaceCard';
import AttractionsCard from './AttractionsCard';
import ReviewCard from './ReviewCard';
import { Select } from '@mobiscroll/react';
import Icon from '@/components/common/Icon/Icon';
import RouteRetouchPlaceCard from './RouteRetouchPlaceCard';
import Button from '@/components/common/Button/Button';

interface RouteDetailInfoProps {
  selected: string;
  selectedDay: number;
  latitude: number;
  longitude: number;
  dayData: RouteDetailDayProps[];
  attractions: AttractionsProps[];
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedDay: React.Dispatch<React.SetStateAction<number>>;
  reviews: RouteReviewProps[];
  linePath: any[];
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setBsType: React.Dispatch<React.SetStateAction<string>>;
  reviewType: string;
  dayOfRoute: DaysOfRouteProps[];
  setDayOfRoute: React.Dispatch<React.SetStateAction<DaysOfRouteProps[]>>;
  clickWayBtn?: () => void;
  clickAttryBtn?: () => void;
  setSelectedIdx: React.Dispatch<React.SetStateAction<number>>;
}

function RouteDetailInfo(props: RouteDetailInfoProps) {
  const location = useLocation();

  const draggingPos = useRef<any>(null);
  const dragOverPos = useRef<any>(null);

  const handleDragStart = (position: number) => {
    draggingPos.current = position;
  };

  const handleDragEnter = (position: number) => {
    dragOverPos.current = position;
  };

  const handleDrop = () => {
    if (draggingPos.current === null || dragOverPos.current === null) return;

    const newItems = [...props.dayOfRoute];
    const draggingItem = newItems[draggingPos.current];

    newItems.splice(draggingPos.current, 1);
    newItems.splice(dragOverPos.current, 0, draggingItem);

    const reorderedItems = newItems.map((item, index) => ({
      ...item,
      order: index,
    }));

    draggingPos.current = null;
    dragOverPos.current = null;

    props.setDayOfRoute(reorderedItems);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const touchLocation = e.targetTouches[0];
    const element = document.elementFromPoint(
      touchLocation.clientX,
      touchLocation.clientY,
    );

    if (element && element.getAttribute('data-position')) {
      const newPosition = parseInt(element.getAttribute('data-position')!, 10);
      dragOverPos.current = newPosition;
    }
  };

  const handleTouchEnd = () => {
    if (draggingPos.current === null || dragOverPos.current === null) return;

    const newItems = [...props.dayOfRoute];
    const draggingItem = newItems[draggingPos.current];

    newItems.splice(draggingPos.current, 1);
    newItems.splice(dragOverPos.current, 0, draggingItem);

    const reorderedItems = newItems.map((item, index) => ({
      ...item,
      order: index,
    }));

    draggingPos.current = null;
    dragOverPos.current = null;

    props.setDayOfRoute(reorderedItems);
  };

  const selectHandler = (i: number) => {
    props.setSelectedIdx(i);
  };

  const renderMain = () => {
    switch (props.selected) {
      case 'course':
        return (
          <>
            <R.MapBox>
              <Map
                linePath={props.linePath}
                latitude={props.longitude}
                longitude={props.latitude}
              />
            </R.MapBox>
            <R.DetailHeader>
              {location.pathname.includes('retouch') ? (
                <R.RetouchHeaderOverflow>
                  {props.dayData.map((ele) => (
                    <R.DayContainer>
                      <R.DayBox
                        selected={ele.dayNum === props.selectedDay}
                        onClick={() => {
                          props.setSelectedDay(ele.dayNum);
                        }}
                      >{`Day ${ele.dayNum}`}</R.DayBox>
                    </R.DayContainer>
                  ))}
                </R.RetouchHeaderOverflow>
              ) : (
                <R.HeaderOverflow>
                  {props.dayData.map((ele) => (
                    <R.DayContainer>
                      <R.DayBox
                        selected={ele.dayNum === props.selectedDay}
                        onClick={() => {
                          props.setSelectedDay(ele.dayNum);
                        }}
                      >
                        {`Day ${ele.dayNum}`}
                      </R.DayBox>
                    </R.DayContainer>
                  ))}
                </R.HeaderOverflow>
              )}
            </R.DetailHeader>
            <R.DetailMain>
              <R.DetailMainOverflow>
                {props.dayOfRoute.length > 0
                  ? props.dayOfRoute.map((ele, idx) =>
                      location.pathname.includes('retouch') ? (
                        <RouteRetouchPlaceCard
                          selectHandler={selectHandler}
                          handleTouchMove={handleTouchMove}
                          handleTouchEnd={handleTouchEnd}
                          dropHandler={handleDrop}
                          data={ele}
                          dragEndHandler={handleDragEnter}
                          dragStartHandler={handleDragStart}
                          idx={idx}
                        />
                      ) : (
                        <RoutePlaceCard {...ele} />
                      ),
                    )
                  : null}
                {location.pathname.includes('retouch') && (
                  <R.AddBtnContainer>
                    <Button
                      width={65}
                      height={6}
                      fc="ffffff"
                      bc="#1A823B"
                      radius={0.7}
                      fontSize={1.6}
                      children="경유지 추가"
                      color="#ffffff"
                      onClick={() => {
                        if (props.clickWayBtn !== undefined) {
                          props.clickWayBtn();
                        }
                      }}
                    />
                  </R.AddBtnContainer>
                )}
              </R.DetailMainOverflow>
            </R.DetailMain>
          </>
        );
      case 'review':
        return (
          <>
            <R.DetailHeader>
              <R.HeaderOverflow>
                <R.ReviewHeaderTextBox
                  onClick={() => {
                    props.setIsOpen(true);
                    props.setBsType('정렬');
                  }}
                >
                  <R.ReviewHeaderText>{props.reviewType}</R.ReviewHeaderText>
                  <div
                    style={{
                      transform: 'rotate(270deg)',
                      marginLeft: '0.3rem',
                    }}
                  >
                    <Icon name="IconBackArrow" size={10} />
                  </div>
                </R.ReviewHeaderTextBox>
              </R.HeaderOverflow>
            </R.DetailHeader>
            <R.DetailMain>
              <R.DetailMainOverflow>
                {props.reviews.map((ele: RouteReviewProps) => (
                  <ReviewCard {...ele} />
                ))}
              </R.DetailMainOverflow>
            </R.DetailMain>
          </>
        );
      default:
        return (
          <>
            <R.MapBox>
              <Map
                linePath={props.linePath}
                latitude={props.longitude}
                longitude={props.latitude}
              />
            </R.MapBox>
            <R.DetailHeader>
              <R.HeaderOverflow>
                {props.dayData.map((ele) => (
                  <R.DayContainer>
                    <R.DayBox
                      selected={ele.dayNum === props.selectedDay}
                      onClick={() => {
                        props.setSelectedDay(ele.dayNum);
                      }}
                    >{`Day ${ele.dayNum}`}</R.DayBox>
                  </R.DayContainer>
                ))}
              </R.HeaderOverflow>
            </R.DetailHeader>
            <R.DetailMain>
              <R.DetailMainOverflow>
                {props.attractions.map((ele: AttractionsProps) => (
                  <AttractionsCard {...ele} />
                ))}
                {location.pathname.includes('retouch') && (
                  <R.AddBtnContainer>
                    <Button
                      width={65}
                      height={6}
                      fc="ffffff"
                      bc="#1A823B"
                      radius={0.7}
                      fontSize={1.6}
                      children="관광지 추가"
                      color="#ffffff"
                      onClick={() => {
                        if (props.clickAttryBtn !== undefined) {
                          props.clickAttryBtn();
                        }
                      }}
                    />
                  </R.AddBtnContainer>
                )}
              </R.DetailMainOverflow>
            </R.DetailMain>
          </>
        );
    }
  };

  return <>{renderMain()}</>;
}

export default RouteDetailInfo;
