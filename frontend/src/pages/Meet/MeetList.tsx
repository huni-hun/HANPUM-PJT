/** 모임 List (main) */

import Header from '@/components/common/Header/Header';
import Icon from '../../components/common/Icon/Icon';
import RouteCard from '../../components/Style/Route/RouteCard';
import * as R from '../../components/Style/Route/RouteList.styled';
import BottomTab from '@/components/common/BottomTab/BottomTab';
import { useEffect, useState } from 'react';
import { getRouteList } from '@/api/route/GET';
import { RouteListProps } from '@/models/route';
import { useNavigate } from 'react-router-dom';
import Text from '@/components/common/Text';
import Flex from '@/components/common/Flex';
import CardLong from '@/components/common/CardLong/CardLong';
import { useQuery } from 'react-query';
import { GetMyMeet } from '@/api/meet/GET';
import { STATUS } from '@/constants';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import DateBadge from '@/components/common/Badge/DateBadge';
import InfoBadge from '@/components/common/Badge/InfoBadge';
import RouteBadge from '@/components/common/Badge/RouteBadge';

function RouteList() {
  // const [arr, setArr] = useState<RouteListProps[]>([]);
  const navigator = useNavigate();

  const { data: myMeet } = useQuery('getmyMeet', GetMyMeet, {
    onSuccess: (res) => {
      console.log('res ::', res.data);
      if (res.status === STATUS.success) {
      } else if (res.status === STATUS.error) {
        toast.error(res.message);
      }
    },
    onError: (error: AxiosError) => {
      toast.error(error.message);
    },
  });

  return (
    <R.RouteListContainer>
      <Header
        purpose="meet"
        isBorder={true}
        back={false}
        clickBack={() => {}}
      />
      {myMeet && (
        <R.MainContainer>
          <Flex direction="column">
            <Text $typography="t20" $bold={true}>
              내 모임
            </Text>

            {/* 임시 cardLong 타입 이슈 */}
            <div className="cardLong">
              <img src={myMeet.data.groupImg} alt="" />
              <DateBadge
                style={{ top: '16px', left: '20px' }}
                totalDays={myMeet.data.totalDays}
              />
              {myMeet.data.like ? (
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
              )}

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
                {myMeet.data.title}
              </Text>
              <InfoBadge
                style={{ bottom: '20px', right: '20px' }}
                recruitmentCount={myMeet.data.recruitmentCount}
                recruitedCount={myMeet.data.recruitedCount}
                likeCount={myMeet.data.likeCount}
              />
              <RouteBadge
                style={{ bottom: '20px', left: '20px' }}
                startPoint={myMeet.data.startPoint}
                endPoint={myMeet.data.endPoint}
                totalDistance={myMeet.data.totalDistance}
              />
              <div className="black-bg" />
            </div>

            <Text $typography="t20" $bold={true}>
              추천하는 모임
            </Text>
          </Flex>
        </R.MainContainer>
      )}
      <BottomTab />
    </R.RouteListContainer>
  );
}

export default RouteList;
