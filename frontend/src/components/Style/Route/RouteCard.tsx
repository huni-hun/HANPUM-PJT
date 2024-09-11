import * as C from './RouteCard.styled';

import Icon from '../../common/Icon/Icon';
import test from '../../../assets/img/mountain.jpg';
import { useNavigate } from 'react-router-dom';
import { RouteListProps } from '@/models/route';
import { useEffect, useState } from 'react';
import { setRouteLike } from '@/api/route/GET';
import { RouteLikeDelete } from '@/api/route/Delete';
import { useRecoilValue } from 'recoil';
import { isAuthEnticatedAtom } from '@/atoms/isAuthEnticatedAtom';

interface RouteCardProps {
  ele: RouteListProps;
  startDate?: string;
  recruitmentPeriod?: string;
  type?: string;
}

function RouteCard(props: RouteCardProps) {
  const navigator = useNavigate();

  const isAuth = useRecoilValue(isAuthEnticatedAtom);
  const [like, setLike] = useState<boolean>(false);

  const likeHandler = () => {
    if (isAuth) {
      if (!like) {
        setRouteLike(String(props.ele.routeId))
          .then((result) => {
            if (result.status === 200 && result.data.status === 'SUCCESS') {
              setLike(true);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        RouteLikeDelete(String(props.ele.routeId))
          .then((result) => {
            if (result.status === 200 && result.data.status === 'SUCCESS') {
              setLike(false);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } else {
      navigator('/login');
    }
  };

  useEffect(() => {
    setLike(props.ele.interestFlag);
  }, []);

  return (
    <C.Card
      onClick={() => {
        navigator(`/route/detail/${props.ele.routeId}`, {
          state: {
            startDate: props.startDate,
            type: props.type,
            recruitmentPeriod: props.recruitmentPeriod,
          },
        });
      }}
      img={props.ele.img.startsWith('testu') ? test : props.ele.img}
    >
      <C.TopContent>
        <C.ContentContainer>
          <C.Content>{`${props.ele.totalDays - 1}박 ${props.ele.totalDays}일`}</C.Content>
        </C.ContentContainer>
        <Icon
          name={like ? 'IconModiHeartFill' : 'IconModiHeartNonFill'}
          size={30}
          onClick={(e) => {
            e.stopPropagation();
            likeHandler();
          }}
        />
      </C.TopContent>
      <C.BottomContent>
        <C.RouteNTitleBox>
          <C.RouteContentBox>
            <Icon name="IconGrenStar" size={15} />
            <C.RouteScoreText>
              {Math.floor(props.ele.routeScore)}
            </C.RouteScoreText>
            <C.RouteScoreText>{`(${props.ele.routeComment})`}</C.RouteScoreText>
          </C.RouteContentBox>
          <C.TitleBox>{props.ele.routeName}</C.TitleBox>
          <C.RouteBox>
            <C.RouteText>
              {props.ele.start.length > 2
                ? props.ele.start.substring(0, 2)
                : props.ele.start}
            </C.RouteText>
            <Icon name="IconArrowWhite" size={10} path="" />
            <C.RouteText>
              {props.ele.end.length > 2
                ? props.ele.end.substring(0, 2)
                : props.ele.end}
            </C.RouteText>
            <C.RouteDistanceBox>{props.ele.totalDistance}km</C.RouteDistanceBox>
          </C.RouteBox>
        </C.RouteNTitleBox>
        {/* <C.BContent>
          <Icon name="IconRoute" size={25} />
          <C.ContentText>70.5km</C.ContentText>
        </C.BContent> */}
      </C.BottomContent>
    </C.Card>
  );
}

export default RouteCard;
