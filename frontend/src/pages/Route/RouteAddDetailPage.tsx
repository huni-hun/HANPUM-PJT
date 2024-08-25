import Button from '@/components/common/Button/Button';
import * as R from '../../components/Style/Route/RouteAddDetailPage.styled';
import Icon from '@/components/common/Icon/Icon';
import Map from '@/components/common/Map/Map';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/common/Header/Header';

function RouteAddDetailPage() {
  const [curLatitude, setCurLatitude] = useState<number>(0);
  const [curLongtitude, setCurLongtitude] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [day, setDay] = useState<number>(1);
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [route, setRoute] = useState<number[]>([1]);
  const navigate = useNavigate();

  const getSuccess = (pos: GeolocationPosition) => {
    setCurLatitude(pos.coords.latitude);
    setCurLongtitude(pos.coords.longitude);
    setLoading(true);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      getSuccess,
      () => {
        alert('위치 가져오기 실패');
      },
      {
        enableHighAccuracy: true,
        maximumAge: 30000,
        timeout: 27000,
      },
    );
  }, []);

  return (
    <R.Container>
      <Header
        purpose="root"
        depart="서울"
        arrive="대전"
        clickBack={() => {}}
        back={true}
      />
      <R.MainContainer>
        <R.OverFlow>
          <R.DayContainer>
            <R.DayOverFlow>
              {route.map((ele) => (
                <R.DayCard
                  isSelected={selectedDay === ele}
                  onClick={() => {
                    setSelectedDay(ele);
                  }}
                >{`Day ${ele}`}</R.DayCard>
              ))}
              <R.DatAddCard
                onClick={() => {
                  setRoute((pre) => [...pre, day + 1]);
                  setDay(day + 1);
                }}
              >
                +
              </R.DatAddCard>
            </R.DayOverFlow>
          </R.DayContainer>
          <R.MapCard>
            <R.MapCardTitle>
              {selectedDay}일차 경로를 설정해주세요.
            </R.MapCardTitle>
            <R.MapSearchBox
              onClick={() => {
                navigate('/route/search');
              }}
            >
              <Icon name="IconSearch" size={20} />
              <R.SearchText>위치 검색</R.SearchText>
            </R.MapSearchBox>
            <R.MapBox>
              {loading ? (
                <Map latitude={curLatitude} longitude={curLongtitude} />
              ) : null}
            </R.MapBox>
            <R.PlaceContainer>
              <R.PlaceBox>
                <R.PlaceTypeBox>경유지</R.PlaceTypeBox>
              </R.PlaceBox>
            </R.PlaceContainer>
          </R.MapCard>
        </R.OverFlow>
      </R.MainContainer>
      <R.BottomContainer>
        <R.ButtonBox>
          <Button
            width={30}
            height={6}
            fontColor="ffffff"
            backgroundColor="#D9D9D9"
            radius={0.7}
            fontSize={1.6}
            children="경로완성"
            color="#ffffff"
            onClick={() => {}}
          />
        </R.ButtonBox>
      </R.BottomContainer>
    </R.Container>
  );
}

export default RouteAddDetailPage;
