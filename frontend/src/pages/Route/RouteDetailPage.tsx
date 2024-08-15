import Icon from '@/components/common/Icon/Icon';
import * as R from '@/components/Style/Route/RouteDetailPage.styled';
import { useState } from 'react';
import Select from '@/components/common/Select/Select';

function RouteDetailPage() {
  const [selected, setSelected] = useState<string>('course');
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const dummyData = [
    {
      day: 1,
      name: '대천 해수욕장',
      address: '충남 보령시',
    },
    {
      day: 2,
      name: '대천 해수욕장',
      address: '충남 보령시',
    },
    {
      day: 3,
      name: '대천 해수욕장',
      address: '충남 보령시',
    },
    {
      day: 4,
      name: '대천 해수욕장',
      address: '충남 보령시',
    },
    {
      day: 5,
      name: '대천 해수욕장',
      address: '충남 보령시',
    },
    {
      day: 6,
      name: '대천 해수욕장',
      address: '충남 보령시',
    },
    {
      day: 7,
      name: '대천 해수욕장',
      address: '충남 보령시',
    },
    {
      day: 8,
      name: '대천 해수욕장',
      address: '충남 보령시',
    },
    {
      day: 9,
      name: '대천 해수욕장',
      address: '충남 보령시',
    },
  ];

  return (
    <R.Container>
      <R.Header>
        <R.HeaderButton>
          <Icon name="IconBack" size={20} />
        </R.HeaderButton>
      </R.Header>
      <R.Main>
        <R.Overflow>
          <R.RouteInfoContainer>
            <R.ImgBox></R.ImgBox>
            <R.RouteNameInfo>
              <R.RouteName>대천 해수욕장</R.RouteName>
              <R.RouteInfo>경로 상세 설명</R.RouteInfo>
            </R.RouteNameInfo>
            <R.RouteDateBox>
              <R.StartDateBox>
                <R.DateBox>
                  <R.DateText>출발일 2024.08.04 </R.DateText>
                  <R.DateText>도착일 2024.08.16 </R.DateText>
                </R.DateBox>
                <R.DistanceBox>
                  <R.DistanceText>총 이동거리</R.DistanceText>
                  <R.Distance>56.8Km</R.Distance>
                </R.DistanceBox>
              </R.StartDateBox>
              <R.EndDateBox>
                <R.DateBox>
                  <R.DateText>출발일 2024.08.04 </R.DateText>
                  <R.DateText>도착일 2024.08.16 </R.DateText>
                </R.DateBox>
                <R.DistanceBox>
                  <R.DistanceText>총 일정기간</R.DistanceText>
                  <R.Distance>11박 12일</R.Distance>
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
            <R.DetailHeader>
              <R.HeaderOverflow>
                {selected === 'course' ? (
                  dummyData.map((ele) => (
                    <R.DayContainer>
                      <R.DayBox
                        isSelected={ele.day === selectedDay}
                        onClick={() => {
                          setSelectedDay(ele.day);
                        }}
                      >{`Day ${ele.day}`}</R.DayBox>
                    </R.DayContainer>
                  ))
                ) : selected === 'information' ? (
                  <R.DetailHeaderTitle>주요 관광지</R.DetailHeaderTitle>
                ) : (
                  <Select
                    list={['최근 수정순', '별점순']}
                    width={20}
                    height={2}
                    radius={0}
                    border=""
                    fontSize={1.5}
                    fontColor="a0a0a0"
                    padding={0}
                    isOpen={isOpen}
                    setOpen={() => {
                      setIsOpen(!isOpen);
                    }}
                    onClick={() => {}}
                  />
                )}
              </R.HeaderOverflow>
            </R.DetailHeader>
            <R.DetailMain>
              <R.DetailMainOverflow>
                {selected != 'review' ? (
                  <R.PlaceCardBox>
                    <R.PlaceCard>
                      <R.PlaceTextBox>
                        <R.CircleBox>
                          <R.Circle />
                        </R.CircleBox>
                        <R.TextBox>
                          <R.PlacetTitleBox>
                            <R.Title>대천 해수욕장</R.Title>
                            <R.TypeBox>관광지</R.TypeBox>
                          </R.PlacetTitleBox>
                          <R.PlacetAddressBox>충남 보령시</R.PlacetAddressBox>
                        </R.TextBox>
                      </R.PlaceTextBox>
                      <R.PlaceImgBox>
                        <R.PlaceImg />
                      </R.PlaceImgBox>
                    </R.PlaceCard>
                  </R.PlaceCardBox>
                ) : (
                  <R.PlaceCardBox>
                    <R.PlaceCard>
                      <R.UserImgContainer>
                        <R.UserImg>
                          <Icon name="IconUser" size={30} />
                        </R.UserImg>
                      </R.UserImgContainer>
                      <R.ReviewTextcontainer>
                        <R.ReviewTextBox>
                          <R.ReviewNameBox>
                            <R.ReviewName>박뚱이</R.ReviewName>
                            {/* <Icon name="IconStar" size={15} /> */}
                            <R.ReviewRate>3.5</R.ReviewRate>
                          </R.ReviewNameBox>
                          <R.ReviewDetailBox>
                            <R.ReviewDetail>테스트입니다.</R.ReviewDetail>
                          </R.ReviewDetailBox>
                        </R.ReviewTextBox>
                        <R.ReviewDateBox>
                          <R.ReviewDate>2024.08.07</R.ReviewDate>
                        </R.ReviewDateBox>
                      </R.ReviewTextcontainer>
                      <R.HeartBox>
                        <Icon name="IconHeart" size={15} />
                        <R.HeartText>11</R.HeartText>
                      </R.HeartBox>
                    </R.PlaceCard>
                  </R.PlaceCardBox>
                )}
              </R.DetailMainOverflow>
            </R.DetailMain>
          </R.RouteDetailInfoContainer>
        </R.Overflow>
      </R.Main>
    </R.Container>
  );
}

export default RouteDetailPage;
