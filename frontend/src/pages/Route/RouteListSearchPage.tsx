import Header from '@/components/common/Header/Header';
import * as R from '@/components/Style/Route/RouteListSearchPage.styled';
import { colors } from '@/styles/colorPalette';
import Button from '@/components/common/Button/Button';
import { Slider } from '@mui/material';
import { useEffect, useState } from 'react';
import {
  getRouteSearchList,
  getRouteSearchListWithProps,
} from '@/api/route/GET';
import RouteListSearchResult from './RouteListSearchResult';
import { RouteListProps } from '@/models/route';
import { useNavigate } from 'react-router-dom';

function RouteListSearchPage() {
  const [sliderValue, setSliderValue] = useState<number>(0);
  const [dateValue, setDateValue] = useState<number>(0);
  const [selectType, setSelectType] = useState<string[]>([]);
  const [keyword, setKeyword] = useState<string>('');
  const [searchSucess, setSearchSucess] = useState<boolean>(false);
  const [searchResult, setSearchResult] = useState<RouteListProps[]>([]);
  const [distance, setDistance] = useState<string>('');
  const [days, setDays] = useState<string>('');
  const [types, setTypes] = useState<string>('');

  const navigator = useNavigate();

  const searchHandler = () => {
    if (
      dateValue > 0 ||
      sliderValue > 0 ||
      selectType.length > 0 ||
      keyword !== ''
    ) {
      let dis = sliderValue > 0 ? `&maxDistance=${sliderValue}` : '';
      setDistance(dis);
      let day = dateValue > 0 ? `&maxDays=${dateValue}` : '';
      setDays(day);
      let type = `&selectedTypes=${selectType.join(',')}`;
      setTypes(type);
      //   const response = getRouteSearchListWithProps(
      //     keyword,
      //     distance,
      //     days,
      //     types,
      //   );

      //   response.then((res) => {
      //     if (res.status === 200) {
      //       res.data.data.courseListMap.searchResult.map((ele: any) => {
      //         let data: RouteListProps = {
      //           routeName: ele.courseName,
      //           routeContent: ele.content,
      //           routeScore: ele.scoreAvg,
      //           routeComment: ele.commentCnt,
      //           routeId: ele.courseId,
      //           img: ele.backgroundImg,
      //           writeState: ele.writeState,
      //           openState: ele.openState,
      //           memberId: ele.memberId,
      //           writeDate: ele.writeDate,
      //           start: ele.startPoint,
      //           end: ele.endPoint,
      //           totalDistance: Math.round(ele.totalDistance),
      //           totalDays: ele.totalDays,
      //           interestFlag: ele.interestFlag,
      //         };
      //         setSearchResult((pre) => [...pre, data]);
      //       });
      //       setSearchSucess(true);
      //     }
      //   });
      // } else {
      //   const response = getRouteSearchList(keyword);
      //   response.then((res) => {
      //     if (res.status === 200) {
      //       res.data.data.courseListMap.searchResult.map((ele: any) => {
      //         let data: RouteListProps = {
      //           routeName: ele.courseName,
      //           routeContent: ele.content,
      //           routeScore: ele.scoreAvg,
      //           routeComment: ele.commentCnt,
      //           routeId: ele.courseId,
      //           img: ele.backgroundImg,
      //           writeState: ele.writeState,
      //           openState: ele.openState,
      //           memberId: ele.memberId,
      //           writeDate: ele.writeDate,
      //           start: ele.startPoint,
      //           end: ele.endPoint,
      //           totalDistance: Math.round(ele.totalDistance),
      //           totalDays: ele.totalDays,
      //           interestFlag: ele.interestFlag,
      //         };
      //         setSearchResult((pre) => [...pre, data]);
      //       });
      //       setSearchSucess(true);
      //     }
      //   });
      setSearchSucess(true);
    }
  };

  const typeArr = [
    '해안길',
    '도시탐방',
    '역사탐방',
    '자연탐방',
    '초보자',
    '숙련자',
    '잦은휴식',
    '짧은코스',
    '긴코스',
    '문화탐방',
    '미식투어',
    '사진명소',
    '힐링코스',
    '문화재길',
    '제주올레길',
    'DMZ접경지역',
    '해파랑길코스',
    '코리아둘레길',
    '서해랑길코스',
  ];

  useEffect(() => {
    if (!searchSucess) {
      setKeyword('');
      setSearchResult([]);
    }
  }, [searchSucess]);

  return searchSucess ? (
    <RouteListSearchResult
      keyword={keyword}
      distance={distance}
      days={days}
      types={types}
      setSearchSucess={setSearchSucess}
    />
  ) : (
    <R.Container>
      <Header
        purpose="search"
        clickBack={() => {
          navigator(-1);
        }}
        back={true}
        changeEven={(e: React.ChangeEvent<HTMLInputElement>) => {
          setKeyword(e.target.value);
        }}
        keyDownEven={(e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.code === 'Enter' || e.key === 'Enter') {
            searchHandler();
          }
        }}
      />
      <R.MainContainer>
        <R.SliderBox>
          <R.SliderTextBox>
            <R.SliderText>경로 거리</R.SliderText>
            <R.ContentText>{`0km ${sliderValue > 0 ? `~ ${sliderValue}km` : ''}`}</R.ContentText>
          </R.SliderTextBox>
          <Slider
            size="medium"
            min={0}
            max={300}
            value={sliderValue}
            onChange={(event: Event, newValue: number | number[]) => {
              if (typeof newValue === 'number') {
                setSliderValue(newValue);
              }
            }}
            aria-label="Small"
            valueLabelDisplay="auto"
            sx={{
              color: colors.main,
              height: 8,
              '& .MuiSlider-thumb': {
                width: 25,
                height: 25,
                color: colors.white,
              },
              '& .MuiSlider-rail': {
                height: '0.7rem',
                color: 'grey',
              },
            }}
          />
        </R.SliderBox>
        <R.SliderBox>
          <R.SliderTextBox>
            <R.SliderText>소요일차</R.SliderText>
            <R.ContentText>{`0일 ${dateValue > 0 ? `~ ${dateValue}일` : ''}`}</R.ContentText>
          </R.SliderTextBox>
          <Slider
            size="medium"
            min={0}
            max={15}
            value={dateValue}
            onChange={(event: Event, newValue: number | number[]) => {
              if (typeof newValue === 'number') {
                setDateValue(newValue);
              }
            }}
            aria-label="Small"
            valueLabelDisplay="auto"
            sx={{
              color: colors.main,
              height: 8,
              '& .MuiSlider-thumb': {
                width: 25,
                height: 25,
                color: colors.white,
              },
              '& .MuiSlider-rail': {
                height: '0.7rem',
                color: 'grey',
              },
            }}
          />
        </R.SliderBox>
        <R.TypeContainer>
          <R.SliderTextBox>
            <R.SliderText>경로 타입</R.SliderText>
          </R.SliderTextBox>
          <R.TypeBox>
            {typeArr.map((ele, idx: number) => (
              <R.Type
                key={idx}
                onClick={() => {
                  if (selectType.includes(ele)) {
                    let arr: string[] = [];
                    selectType.map((el: string) => {
                      if (ele !== el) {
                        arr.push(el);
                      }
                    });
                    setSelectType(arr);
                  } else {
                    setSelectType((pre) => [...pre, ele]);
                  }
                }}
                $isSelect={selectType.includes(ele)}
              >
                {ele}
              </R.Type>
            ))}
          </R.TypeBox>
        </R.TypeContainer>
      </R.MainContainer>
      <R.BottomContainer>
        <R.ButtonBox>
          <Button
            width={35}
            height={6}
            fc="ffffff"
            bc="#1A823B"
            radius={0.7}
            fontSize={1.6}
            children="경로 검색"
            color="#ffffff"
            onClick={() => {
              searchHandler();
            }}
          />
        </R.ButtonBox>
      </R.BottomContainer>
    </R.Container>
  );
}

export default RouteListSearchPage;
