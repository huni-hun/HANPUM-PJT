/** 모임 List (main) */

import Header from '@/components/common/Header/Header';
import Icon from '../../components/common/Icon/Icon';
import * as R from '../../components/Style/Route/RouteList.styled';
import BottomTab from '@/components/common/BottomTab/BottomTab';
import { useNavigate } from 'react-router-dom';
import Text from '@/components/common/Text';
import Flex from '@/components/common/Flex';
import { useQuery } from 'react-query';
import { GetGroupList, GetMyMeet } from '@/api/meet/GET';
import { STATUS } from '@/constants';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { useInfiniteQuery } from 'react-query';
import { useRef, useState } from 'react';
import MeetLongCard from '@/components/Meet/MeetLongCard';
import MeetSmallCard from '@/components/Meet/MeetSmallCard';
import { MeetInfo } from '@/models/meet';

function RouteList() {
  // const [arr, setArr] = useState<RouteListProps[]>([]);
  const navigator = useNavigate();

  const [page, setPage] = useState(1);

  const { data: myMeet } = useQuery('getmyMeet', GetMyMeet, {
    onSuccess: (res) => {
      // console.log('res ::', res.data);
      if (res.status === STATUS.success) {
      } else if (res.status === STATUS.error) {
        toast.error(res.message);
      }
    },
    onError: (error: AxiosError) => {
      toast.error(error.message);
    },
  });

  const { data: groupListData, isLoading } = useQuery(
    ['getGroupList', page], // 페이지를 쿼리 키에 포함하여 변경 시 다시 페칭
    () => GetGroupList({ pageable: { page: page, size: 4, sort: ['asc'] } }),
    {
      onSuccess: (res) => {
        // toast.success('데이터를 성공적으로 가져왔습니다.');
        console.log(res.data.groupResDtoList);
      },
      onError: (error: AxiosError) => {
        toast.error(error.message);
      },
    },
  );

  // console.log();

  return (
    <R.RouteListContainer>
      <Header
        purpose="meet"
        isborder={true}
        back={false}
        clickBack={() => {}}
      />

      <R.MainContainer>
        <Flex direction="column">
          <Text $typography="t20" $bold={true} style={{ paddingLeft: '8px' }}>
            내 모임
          </Text>
          {myMeet && <MeetLongCard data={myMeet.data} />}
          <Flex
            $align="center"
            $gap={3}
            style={{ paddingLeft: '8px', marginBottom: '16px' }}
          >
            <Text $typography="t10" color="grey2">
              최신순
            </Text>
            <Icon name="IconDownArrow" />
          </Flex>
          <div className="small-list">
            {groupListData &&
              groupListData.data.groupResDtoList.map((groupData: MeetInfo) => (
                <MeetSmallCard key={groupData.groupId} data={groupData} />
              ))}
          </div>
        </Flex>
      </R.MainContainer>

      <BottomTab />
    </R.RouteListContainer>
  );
}

export default RouteList;
