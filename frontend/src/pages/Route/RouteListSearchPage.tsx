import Header from '@/components/common/Header/Header';
import * as R from '@/components/Style/Route/RouteListSearchPage.styled';
import { colors } from '@/styles/colorPalette';
import Button from '@/components/common/Button/Button';
import { Slider } from '@mui/material';
import { useState } from 'react';

function RouteListSearchPage() {
  const [sliderValue, setSliderValue] = useState<number>(0);
  const [dateValue, setDateValue] = useState<number>(0);
  const [selectType, setSelectType] = useState<string[]>([]);

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
    '코리아둘레길코스',
    '서해랑길코스',
    '힐링',
  ];

  return (
    <R.Container>
      <Header purpose="search" clickBack={() => {}} back={true} />
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
            {typeArr.map((ele) => (
              <R.Type
                onClick={() => {
                  setSelectType((pre) => [...pre, ele]);
                }}
                isSelect={selectType.includes(ele)}
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
            fontColor="ffffff"
            backgroundColor="#1A823B"
            radius={0.7}
            fontSize={1.6}
            children="경로 검색"
            color="#ffffff"
            onClick={() => {}}
          />
        </R.ButtonBox>
      </R.BottomContainer>
    </R.Container>
  );
}

export default RouteListSearchPage;
