import { getRouteList } from '@/api/route/GET';
import Header from '@/components/common/Header/Header';
import RouteListMoreCard from '@/components/Style/Route/RouteListMoreCard';
import * as R from '@/components/Style/Route/RouteListMorePage.styled';
import { RouteListProps } from '@/models/route';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function RouteListMorePage() {
  const location = useLocation();
  const navigator = useNavigate();
  const data = { ...location };
  const key = data.state.keyword;

  const [arr, setArr] = useState<RouteListProps[]>([]);

  useEffect(() => {
    getRouteList(key).then((res) => {
      res.data.data.courseListMap[key].map((ele: any) => {
        let data: RouteListProps = {
          routeName: ele.courseName,
          routeContent: ele.content,
          routeScore: ele.scoreAvg,
          routeComment: ele.commentCnt,
          routeId: ele.courseId,
          img: ele.backgroundImg,
          writeState: ele.writeState,
          openState: ele.openState,
          memberId: ele.memberId,
          writeDate: ele.writeDate,
          start: ele.startPoint,
          end: ele.endPoint,
          totalDistance: Math.round(ele.totalDistance),
          totalDays: ele.totalDays,
        };

        setArr((pre) => [...pre, data]);
      });
    });
  }, []);
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
        {arr.map((ele: RouteListProps) => (
          <RouteListMoreCard
            id={ele.routeId}
            title={ele.routeName}
            start={ele.start}
            end={ele.end}
            score={ele.routeScore}
            review={ele.routeComment}
            img={ele.img}
          />
        ))}
      </R.MainContainer>
    </R.Container>
  );
}

export default RouteListMorePage;
