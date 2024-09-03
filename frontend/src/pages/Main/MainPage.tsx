import styled from 'styled-components';

import BottomTab from '@components/common/BottomTab/BottomTab';
import Schedule from '@components/Main/Schedule';
import Text from '@components/common/Text';
import Course from '@components/Main/Course';
import Meet from '@components/Main/Meet';
import Header from '@/components/common/Header/Header';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useSetRecoilState } from 'recoil';
import { signupStepAtom } from '@/atoms/signupStepAtom';
import { encodeToken, startDateEndDateStringFormat } from '@/utils/util';
import { colors } from '@/styles/colorPalette';
import * as R from '../../components/Style/Route/RouteList.styled';
import Icon from '@/components/common/Icon/Icon';
import NotHaveSchedule from '@/components/Main/NotHaveSchedule';
import MeetLongCard from '@/components/Meet/MeetLongCard';
import tempImg from '../../assets/img/mountain.jpg';
import DateBadge from '@/components/common/Badge/DateBadge';
import InfoBadge from '@/components/common/Badge/InfoBadge';
import RouteBadge from '@/components/common/Badge/RouteBadge';
import StarBadge from '@/components/common/Badge/StarBadge';
import Flex from '@/components/common/Flex';
import { useQuery } from 'react-query';
import { getMyScheduleData } from '@/api/schedule/GET';
import { STATUS } from '@/constants';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';

function MainPage() {
  const navigator = useNavigate();

  const clickMoreBtn = (keyword: string) => {
    navigator('/route/list/more', { state: { keyword: keyword } });
  };

  // const { data: mySchedule } = useQuery(
  //   'geMySchedule', // Query Key
  //   () =>
  //     getMyScheduleData(
  //       'eyJhbGciOiJIUzI1NiJ9.eyJ0eXBlIjoiQ09NTU9OIiwic3ViIjoidGVzdDEyMzQ1IiwiaWF0IjoxNzI1MjczNTMwLCJleHAiOjE3MjUzNDU1MzB9.YDLFmQfLa7nAPNK0cAq2mXVEe6gKzqbEJAM2CZcJ0k8',
  //     ),
  //   {
  //     onSuccess: (res) => {
  //       console.log('res ::', res.data);
  //       if (res.status === STATUS.success) {
  //       } else if (res.status === STATUS.error) {
  //         toast.error(res.message);
  //       }
  //     },
  //     onError: (error: AxiosError) => {
  //       toast.error(error.message);
  //     },
  //   },
  // );

  return (
    <MainPageContainer>
      <Header purpose="main" isborder={true} clickBack={() => {}} />
      <div className="container">
        <NotHaveSchedule />
        {/* <Schedule /> */}
        <div className="spacing" />

        <div className="route-container">
          <Flex $justify="space-between" $align="center">
            <Text $typography="t20" $bold={true}>
              동동님을 위한 추천코스
            </Text>

            <Flex $align="center" style={{ width: 'auto' }}>
              <Text $typography="t10">더 보기</Text>
              <Icon name="IconLeftBlackArrow" width={6} height={4} />
            </Flex>
          </Flex>
          <div className="main-smallCard">
            <img src={tempImg} alt="그룹 이미지" />
            <DateBadge totalDays={3} style={{ top: '12px', left: '12px' }} />
            <Icon
              name="IconHeartWhiteBorder"
              size={20}
              style={{
                position: 'absolute',
                top: '14px',
                right: '12px',
                zIndex: '3',
              }}
            />

            <StarBadge
              style={{
                position: 'absolute',
                bottom: '50px',
                left: '12px',
                zIndex: '3',
              }}
            />

            <Text
              as="div"
              $typography="t14"
              $bold={true}
              color="white"
              style={{
                position: 'absolute',
                left: '12px',
                bottom: '28px',
                zIndex: '3',
              }}
            >
              무더위사냥
            </Text>

            <RouteBadge
              startPoint={'인천'}
              endPoint={'당진'}
              totalDistance={23.5}
              style={{
                left: '12px',
                bottom: '12px',
              }}
            />
            <div className="black-bg" />
          </div>

          <div className="main-smallCard">
            <img src={tempImg} alt="그룹 이미지" />
            <DateBadge totalDays={3} style={{ top: '12px', left: '12px' }} />
            <Icon
              name="IconHeartWhiteBorder"
              size={20}
              style={{
                position: 'absolute',
                top: '14px',
                right: '12px',
                zIndex: '3',
              }}
            />

            <StarBadge
              style={{
                position: 'absolute',
                bottom: '50px',
                left: '12px',
                zIndex: '3',
              }}
            />

            <Text
              as="div"
              $typography="t14"
              $bold={true}
              color="white"
              style={{
                position: 'absolute',
                left: '12px',
                bottom: '28px',
                zIndex: '3',
              }}
            >
              무더위사냥
            </Text>

            <RouteBadge
              startPoint={'인천'}
              endPoint={'당진'}
              totalDistance={23.5}
              style={{
                left: '12px',
                bottom: '12px',
              }}
            />
            <div className="black-bg" />
          </div>
        </div>

        <div className="spacing" />

        <div className="meet-container">
          <Flex $justify="space-between" $align="center">
            <Text $typography="t20" $bold={true}>
              한품 PICK 모임 추천
            </Text>

            <Flex $align="center" style={{ width: 'auto' }}>
              <Text $typography="t10">더 보기</Text>
              <Icon name="IconLeftBlackArrow" width={6} height={4} />
            </Flex>
          </Flex>
          <div className="main-longCard">
            <img src={tempImg} alt="" />
            <DateBadge style={{ top: '16px', left: '20px' }} totalDays={6} />
            {/* {data.like ? (
            <Icon
              name="IconHeartWhiteFill"
              size={20}
              style={{
                position: 'absolute',
                top: '18px',
                right: '20px',
                zIndex: '3',
              }}
            />
          ) : (
            <Icon
              name="IconHeartWhiteBorder"
              size={20}
              style={{
                position: 'absolute',
                top: '18px',
                right: '20px',
                zIndex: '3',
              }}
            />
          )} */}
            <Icon
              name="IconHeartWhiteBorder"
              size={20}
              style={{
                position: 'absolute',
                top: '18px',
                right: '20px',
                zIndex: '3',
              }}
            />

            <StarBadge
              style={{
                position: 'absolute',
                bottom: '57px',
                left: '20px',
                zIndex: '3',
              }}
            />

            <Text
              $typography="t14"
              color="white"
              $bold={true}
              style={{
                position: 'absolute',
                bottom: '34px',
                left: '20px',
                zIndex: 3,
              }}
            >
              무더위 사냥
            </Text>
            <InfoBadge
              style={{ bottom: '20px', right: '20px' }}
              recruitmentCount={10}
              recruitedCount={6}
              likeCount={13}
            />
            <RouteBadge
              style={{ bottom: '20px', left: '20px' }}
              startPoint={'인천'}
              endPoint={'당진'}
              totalDistance={76}
            />
            <div className="black-bg" />
          </div>
        </div>
        <BottomTab />
      </div>
    </MainPageContainer>
  );
}

export default MainPage;

const MainPageContainer = styled.div`
  width: 100%;
  padding-bottom: 7vh;
  background-color: ${colors.white};
  .container {
    width: 100%;
    height: 100%;

    .spacing {
      width: 100%;
      height: 8px;
      background-color: #f5f5f5;
    }

    .meet-container {
      padding: 20px 16px;
      background-color: ${colors.white};
      .main-longCard {
        width: 100%;
        height: 16rem;
        border-radius: 20px;
        margin: 12px 0 20px;
        position: relative;
        overflow: hidden;
        .black-bg {
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          background-color: rgba(0, 0, 0, 0.3);
          z-index: 2;
        }

        img {
          width: 100%;
          height: 100%;
        }
      }
    }

    .route-container {
      display: flex;
      flex-wrap: wrap;
      gap: 12px 0;
      justify-content: space-between;
      padding: 20px 16px;
      .main-smallCard {
        width: 16.6rem;
        height: 16.6rem;
        position: relative;
        overflow: hidden;
        img {
          width: 100%;
          height: 16.6rem;
          border-radius: 12px;

          border: 1px solid #e1e1e1;
          box-sizing: border-box;
        }
        .black-bg {
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          background-color: rgba(0, 0, 0, 0.3);
          z-index: 2;
          border-radius: 12px;
        }
      }
    }
  }
`;
