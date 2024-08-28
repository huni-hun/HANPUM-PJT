import { PostSearchPlace } from '@/api/route/POST';
import Icon from '@/components/common/Icon/Icon';
import * as R from '@/components/Style/Route/SearchPlacePage.styled';
import {
  DateRouteDetailProps,
  searchPlaceProps,
  WayPointListProps,
} from '@/models/route';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RouteAddPlacePage from './RouteAddPlacePage';

interface SearchPlacePageProps {
  setSearchOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setWayPoints: React.Dispatch<React.SetStateAction<WayPointListProps[]>>;
  wayPoints: WayPointListProps[];
  setDateDetail: React.Dispatch<React.SetStateAction<DateRouteDetailProps[]>>;
  dateDetail: DateRouteDetailProps[];
  day: number;
}

function SearchPlacePage(props: SearchPlacePageProps) {
  const [searchText, setSearchText] = useState<string>('');
  const [pageOpen, setPageOpen] = useState<boolean>(false);
  const [searchedPlace, setSearchedPlace] = useState<searchPlaceProps[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<searchPlaceProps>(null!);
  const navigator = useNavigate();

  useEffect(() => {
    setSearchedPlace([]);
  }, []);

  return pageOpen ? (
    <RouteAddPlacePage
      day={props.day}
      setSearchOpen={props.setSearchOpen}
      setDateDetail={props.setDateDetail}
      setPageOpen={setPageOpen}
      selectedPlace={selectedPlace}
      setWayPoints={props.setWayPoints}
      wayPoints={props.wayPoints}
      dateDetail={props.dateDetail}
    />
  ) : (
    <R.Container>
      <R.Header>
        <R.HeaderButton
          onClick={() => {
            props.setSearchOpen(false);
          }}
        >
          <Icon name="IconBackArrow" size={20} />
        </R.HeaderButton>
        <R.InputContainer>
          <R.Input
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
            onKeyDown={(e) => {
              // console.log(e);
              if (e.code === 'Enter') {
                setSearchedPlace([]);
                if (searchText !== '') {
                  PostSearchPlace(searchText).then((result) => {
                    if (result.status === 200) {
                      let arr: searchPlaceProps[] = [];
                      result.data.data.map((ele: any) => {
                        let data: searchPlaceProps = {
                          placeName: ele.placeName,
                          address: ele.address,
                          latitude: ele.lat,
                          longitude: ele.lon,
                        };
                        arr.push(data);
                      });

                      setSearchedPlace(arr);
                    }
                  });
                } else {
                  setSearchedPlace([]);
                }
              }
            }}
            placeholder="장소 이름, 주소로 검색해보세요."
          />
        </R.InputContainer>
      </R.Header>
      <R.MainContainer>
        {searchedPlace.map((ele: searchPlaceProps) => (
          <R.PlaceBox
            key={ele.address}
            onClick={() => {
              setSelectedPlace(ele);
              setPageOpen(true);
            }}
          >
            <R.PlaceText>{ele.placeName}</R.PlaceText>
          </R.PlaceBox>
        ))}
      </R.MainContainer>
    </R.Container>
  );
}

export default SearchPlacePage;
