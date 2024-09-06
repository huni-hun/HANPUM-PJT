import Header from '@/components/common/Header/Header';
import Icon from '@/components/common/Icon/Icon';
import BottomSheet from '@/components/Style/Route/BottomSheet';
import RouteListMoreCard from '@/components/Style/Route/RouteListMoreCard';
import * as R from '@/components/Style/Route/RouteListMorePage.styled';
import { useCallback, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { useInfiniteQuery } from 'react-query';
import { getRouteSearchListWithProps } from '@/api/route/GET';

interface RouteListSearchResultProps {
  keyword: string;
  distance: string;
  days: string;
  types: string;
  setSearchSucess: React.Dispatch<React.SetStateAction<boolean>>;
}

function RouteListSearchResult(props: RouteListSearchResultProps) {
  const [reviewType, setReviewType] = useState<string>('최신순');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const {
    data: RouteMoreList,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery(
    ['RouteList', props.keyword, props.distance, props.days, props.types],
    ({ pageParam = 0 }) => {
      return getRouteSearchListWithProps(
        props.keyword,
        props.distance,
        props.days,
        props.types,
        pageParam,
      );
    },
    {
      getNextPageParam: (lastPage, pages) => {
        const exist =
          lastPage.data.data.courseListMap['searchResult'].length >= 8;
        if (!exist) return undefined;
        return pages.length;
      },
      onError: (error: AxiosError) => {
        toast.error(error.message);
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
    refetch(); // 해당 값이 바뀔 때 데이터를 다시 가져옴
  }, [
    props.keyword,
    props.distance,
    props.days,
    props.types,
    props.setSearchSucess,
    refetch,
  ]);

  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();
    console.log(RouteMoreList);
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

  return (
    <R.Container>
      <Header
        back={true}
        purpose="search"
        clickBack={() => {
          props.setSearchSucess(false);
        }}
        searchValue={props.keyword}
      />
      <R.RouteTypeContainer>
        <R.ReviewHeaderTextBox
          onClick={() => {
            setIsOpen(true);
          }}
        >
          <R.ReviewHeaderText>{reviewType}</R.ReviewHeaderText>
          <div
            style={{
              transform: 'rotate(270deg)',
              marginLeft: '0.3rem',
            }}
          >
            <Icon name="IconBackArrow" size={10} />
          </div>
        </R.ReviewHeaderTextBox>
      </R.RouteTypeContainer>
      <R.MainContainer>
        {RouteMoreList?.pages.map((pages) =>
          pages.data.data.courseListMap['searchResult'].map((ele: any) => (
            <RouteListMoreCard
              id={ele.courseId}
              title={ele.courseName}
              start={ele.startPoint}
              end={ele.endPoint}
              score={ele.scoreAvg}
              review={ele.commentCnt}
              img={ele.backgroundImg}
              interestFlag={ele.interestFlag}
              totalDays={ele.totalDays}
              routeId={String(ele.courseId)}
            />
          )),
        )}
        <div ref={loadMoreRef} style={{ height: '1px' }} />
      </R.MainContainer>
      {isOpen && (
        <BottomSheet
          id={0}
          selected={reviewType}
          setSelected={setReviewType}
          bsType={'정렬'}
          setIsOpen={setIsOpen}
        />
      )}
    </R.Container>
  );
}

export default RouteListSearchResult;
