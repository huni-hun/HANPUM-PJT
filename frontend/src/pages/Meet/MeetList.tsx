import { useEffect, useRef, useCallback, useState } from 'react';
import Header from '@/components/common/Header/Header';
import Icon from '../../components/common/Icon/Icon';
import * as R from '../../components/Style/Route/RouteList.styled';
import noImage from '../../assets/img/noInterest.png';
import BaseButton from '../../components/common/BaseButton';
import * as S from '../../components/Style/My/NoHave.styled';
import BottomTab from '@/components/common/BottomTab/BottomTab';
import { useNavigate } from 'react-router-dom';
import Text from '@/components/common/Text';
import Flex from '@/components/common/Flex';
import { useInfiniteQuery, useQuery } from 'react-query';
import { GetGroupList, GetMyMeet } from '@/api/meet/GET';
import { sortList, STATUS } from '@/constants';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import MeetLongCard from '@/components/Meet/MeetLongCard';
import MeetSmallCard from '@/components/Meet/MeetSmallCard';
import { MeetInfo, MeetRequestDto } from '@/models/meet';
import SortBox from '@/components/Meet/SortBox';
import { meetFilterInfoAtom } from '@/atoms/meetFilterAtom';
import { useRecoilValue } from 'recoil';
import Loading from '@/components/common/Loading';

function MeetList() {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [openSort, setOpenSort] = useState(false);
  const meetFilterInfo = useRecoilValue(meetFilterInfoAtom);

  const [requestDto, setRequestDto] = useState<MeetRequestDto>({
    ...meetFilterInfo,
    pageable: {
      page: 0,
      size: 4,
      sort: 'latest,desc',
    },
  });

  const navigator = useNavigate();

  useEffect(() => {
    setLoading(true);
  }, []);

  // 내 모임
  const { data: myMeet } = useQuery('getmyMeet', GetMyMeet, {
    onSuccess: (res) => {
      if (res.status === STATUS.success) {
        // console.log(res);
        setLoading(false);
      } else if (res.status === STATUS.error) {
        setLoading(false);
        toast.error(res.message);
      }
    },
    onError: (error: AxiosError) => {
      setLoading(false);
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
    refetch,
  } = useInfiniteQuery(
    ['getGroupList', requestDto.pageable.sort],
    ({ pageParam = 0 }) => {
      const updatedRequestDto = {
        ...requestDto,
        pageable: {
          ...requestDto.pageable,
          page: pageParam,
        },
      };
      return GetGroupList(updatedRequestDto);
    },
    {
      getNextPageParam: (lastPage, pages) => {
        const morePagesExist = lastPage.data.groupResDtoList.length > 0;
        const isLastPage =
          lastPage.data.groupResDtoList.length < requestDto.pageable.size;
        if (!morePagesExist || isLastPage) return undefined;
        setLoading(false);
        return pages.length;
      },
      onError: (error: AxiosError) => {
        toast.error(error.message);
        setLoading(false);
      },
    },
  );

  // 옵저버 handler(스크롤이다 보니 useCallback 사용)
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
      threshold: 0.7,
    });

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current);
    }

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [handleObserver, loadMoreRef]);

  // 정렬 토글함수
  const handleToggleOpen = () => {
    // console.log('눌림');
    setOpenSort(!openSort);
  };

  const clickSort = (stateValue: string) => {
    if (stateValue === 'nothing') {
      setOpenSort(false);
    }
    setRequestDto((prev) => ({
      ...prev,
      pageable: {
        ...prev.pageable,
        sort: stateValue,
        page: 0,
      },
    }));
  };

  const clickMeetCard = (groupId: number) => {
    navigate(`/meet/detail`, { state: { groupId } });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <R.RouteListContainer>
      <Header
        purpose="meet"
        $isborder={true}
        back={false}
        clickBack={() => {}}
      />

      <R.MainContainer>
        <Flex direction="column">
          {myMeet && myMeet.data && (
            <>
              <Text
                $typography="t20"
                $bold={true}
                style={{ paddingLeft: '8px' }}
              >
                내 모임
              </Text>
              <MeetLongCard
                data={myMeet.data}
                onClick={() => clickMeetCard(myMeet.data.groupId)}
              />
            </>
          )}
          <Flex
            $align="center"
            $gap={3}
            style={{ paddingLeft: '8px', marginBottom: '16px' }}
          >
            <Text $typography="t10" color="grey2" onClick={handleToggleOpen}>
              {sortList.filter(
                (val) => val.value === requestDto.pageable.sort,
              )[0]?.label || '최신순'}
            </Text>
            <Icon name="IconDownArrow" />
          </Flex>
          <div className="small-list">
            {groupListData?.pages?.[0]?.data?.groupResDtoList &&
            groupListData.pages[0].data.groupResDtoList.length === 0 ? (
              <Flex $align="center" $justify="center" $gap={3}>
                <S.NoHaveContainer>
                  <img src={noImage} alt="" />
                  <Text
                    $bold={true}
                    $typography="t16"
                    color="grey2"
                    style={{ marginBottom: '12px' }}
                  >
                    현재 모임이 없어요
                  </Text>
                  <Flex direction="column" style={{ textAlign: 'center' }}>
                    <Text
                      $typography="t14"
                      color="grey2"
                      style={{ marginBottom: '4px' }}
                    >
                      모임을 생성하여
                    </Text>
                    <Text $typography="t14" color="grey2">
                      함께하는 일정을 만들어보세요.
                    </Text>
                  </Flex>

                  <BaseButton
                    size="large"
                    style={{ margin: '36px auto 0' }}
                    onClick={() => {
                      navigate('/meet/addMain');
                    }}
                  >
                    모임 생성하기
                  </BaseButton>
                </S.NoHaveContainer>
              </Flex>
            ) : (
              groupListData?.pages?.map((page) =>
                page.data.groupResDtoList?.map((groupData: MeetInfo) => (
                  <MeetSmallCard
                    key={groupData.groupId}
                    data={groupData}
                    onClick={() => clickMeetCard(groupData.groupId)}
                    refetchGroupList={refetch}
                  />
                )),
              )
            )}
            {isFetching && <div>불러오는 중..</div>}
            <div ref={loadMoreRef} style={{ height: '1px' }} />
          </div>
        </Flex>
      </R.MainContainer>

      {openSort ? (
        <SortBox
          onClick={handleToggleOpen}
          sortState={requestDto}
          clickSort={clickSort}
        />
      ) : (
        <BottomTab />
      )}
    </R.RouteListContainer>
  );
}

export default MeetList;
