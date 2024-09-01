import { useEffect, useRef, useCallback } from 'react';
import Header from '@/components/common/Header/Header';
import Icon from '../../components/common/Icon/Icon';
import * as R from '../../components/Style/Route/RouteList.styled';
import BottomTab from '@/components/common/BottomTab/BottomTab';
import { useNavigate } from 'react-router-dom';
import Text from '@/components/common/Text';
import Flex from '@/components/common/Flex';
import { useInfiniteQuery, useQuery } from 'react-query';
import { GetGroupList, GetMyMeet } from '@/api/meet/GET';
import { STATUS } from '@/constants';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import MeetLongCard from '@/components/Meet/MeetLongCard';
import MeetSmallCard from '@/components/Meet/MeetSmallCard';
import { MeetInfo } from '@/models/meet';

function RouteList() {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const navigator = useNavigate();

  // 내 모임
  const { data: myMeet } = useQuery('getmyMeet', GetMyMeet, {
    onSuccess: (res) => {
      if (res.status === STATUS.success) {
      } else if (res.status === STATUS.error) {
        toast.error(res.message);
      }
    },
    onError: (error: AxiosError) => {
      toast.error(error.message);
    },
  });

  // 모임 리스트 (무한 스크롤)
  const {
    data: groupListData,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery(
    'getGroupList',
    ({ pageParam = 0 }) =>
      GetGroupList({ pageable: { page: pageParam, size: 4, sort: ['asc'] } }),
    {
      getNextPageParam: (lastPage, pages) => {
        const morePagesExist = lastPage.data.groupResDtoList.length > 0;
        if (!morePagesExist) return undefined;
        return pages.length;
      },
      onError: (error: AxiosError) => {
        toast.error(error.message);
      },
    },
  );

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [hasNextPage, isFetchingNextPage, fetchNextPage],
  );

  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    });

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current);
    }

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [handleObserver, loadMoreRef]);

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
            {groupListData?.pages.map((page) =>
              page.data.groupResDtoList.map((groupData: MeetInfo) => (
                <MeetSmallCard key={groupData.groupId} data={groupData} />
              )),
            )}
            <div ref={loadMoreRef} style={{ height: '1px' }} />
          </div>
        </Flex>
      </R.MainContainer>

      <BottomTab />
    </R.RouteListContainer>
  );
}

export default RouteList;
