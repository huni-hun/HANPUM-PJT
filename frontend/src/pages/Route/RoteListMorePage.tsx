import { getRouteMoreList } from '@/api/route/GET';
import Header from '@/components/common/Header/Header';
import RouteListMoreCard from '@/components/Style/Route/RouteListMoreCard';
import * as R from '@/components/Style/Route/RouteListMorePage.styled';
import { AxiosError } from 'axios';
import { useCallback, useEffect, useRef } from 'react';
import { useInfiniteQuery } from 'react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function RouteListMorePage() {
  const location = useLocation();
  const navigator = useNavigate();
  const data = { ...location };
  const key = data.state.keyword;

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
    ['RouteList', key],
    ({ pageParam = 0 }) => {
      return getRouteMoreList(key, 8, pageParam);
    },
    {
      getNextPageParam: (lastPage, pages) => {
        // console.log(lastPage.data.data.courseListMap[key]);
        const exist = lastPage.data.data.courseListMap[key].length >= 8;
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

  useEffect(() => {
    refetch(); // 해당 값이 바뀔 때 데이터를 다시 가져옴
  }, [key, refetch]);

  return (
    <R.Container>
      <Header
        purpose="title"
        title={key}
        clickBack={() => {
          navigator(-1);
        }}
      />
      <R.MainContainer>
        {RouteMoreList?.pages.map((pages) =>
          pages.data.data.courseListMap[key].map((ele: any) => (
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
    </R.Container>
  );
}

export default RouteListMorePage;
