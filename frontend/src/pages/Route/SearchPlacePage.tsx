import { PostSearchPlace } from '@/api/route/POST';
import Icon from '@/components/common/Icon/Icon';
import * as R from '@/components/Style/Route/SearchPlacePage.styled';
import { searchPlaceProps } from '@/models/route';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchPlacePage() {
  const [searchText, setSearchText] = useState<string>('');
  const [searchedPlace, setSearchedPlace] = useState<searchPlaceProps[]>([]);
  const navigator = useNavigate();
  useEffect(() => {
    // console.log(searchedPlace);
  }, [searchedPlace]);

  return (
    <R.Container>
      <R.Header>
        <R.HeaderButton>
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
                PostSearchPlace(searchText).then((result) => {
                  if (result.status === 200) {
                    let arr: searchPlaceProps[] = [];
                    // result.data.data.map((ele: any) => {
                    let data: searchPlaceProps = {
                      placeName: result.data.data.placeName,
                      address: result.data.data.address,
                      latitude: result.data.data.lat,
                      longitude: result.data.data.lon,
                    };
                    arr.push(data);
                    // });

                    setSearchedPlace(arr);
                  }
                });
              }
            }}
            placeholder="장소 이름, 주소로 검색해보세요."
          />
        </R.InputContainer>
      </R.Header>
      <R.MainContainer>
        {searchedPlace.map((ele: searchPlaceProps) => (
          <R.PlaceBox
            key={ele.placeName}
            onClick={() => {
              navigator('/route/add', {
                state: {
                  placeName: ele.placeName,
                  address: ele.address,
                  latitude: ele.latitude,
                  longitude: ele.longitude,
                },
              });
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
