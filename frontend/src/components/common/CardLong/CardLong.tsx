import * as S from './CardLong.styled';
import image from '../../../assets/img/img1.jpg';
import Icon from '../Icon/Icon';
import Text from '../Text';
import { useEffect, useState } from 'react';
import Flex from '../Flex';
import { RouteListProps, UserRouteProps } from '@/models/route';
import { MeetInfo } from '@/models/meet';
import { RouteDelete } from '@/api/route/Delete';
import { toast } from 'react-toastify';

function CardLong({
  item,
  hasHeart,
  hasLock,
  canDelete,
  isSwiped,
  onSwipe,
  onClickOutside,
  onClickCard,
  onDeleteHandler,
}: {
  item: UserRouteProps | MeetInfo;
  hasHeart?: boolean;
  hasLock?: boolean;
  canDelete?: boolean;
  isSwiped?: boolean;
  onSwipe?: (id: number) => void;
  onClickOutside?: () => void;
  onClickCard?: () => void;
  onDeleteHandler?: (item: UserRouteProps) => void;
}) {
  // const [isSwiped, setIsSwiped] = useState(false);
  const [startX, setStartX] = useState<number | null>(null);
  const [canDeleted, setCanDeleted] = useState(false);
  const [img, setImg] = useState<string>('');

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (startX !== null) {
      const deltaX = e.touches[0].clientX - startX;
      if (deltaX < -58) {
        if (onSwipe) {
          if (isMeetInfo(item)) {
            onSwipe(item.groupId);
          } else {
            onSwipe(item.courseId);
          }
        }
        setCanDeleted(true);
      } else {
        setCanDeleted(false);
      }
    }
  };

  // 터치 끝날 때
  const handleTouchEnd = () => {
    setStartX(null);
  };

  // 바깥요소 누르면 다시 늘리기
  const handleClickOutside = () => {
    if (onClickOutside) {
      onClickOutside();
    }
  };

  // 삭제 버튼 누르기
  const deleteClick = (e: React.MouseEvent) => {
    if (isUserRouteProps(item)) {
      if (onDeleteHandler !== undefined) {
        onDeleteHandler(item);
      }
    }

    e.stopPropagation();
  };

  useEffect(() => {
    if (isSwiped) {
      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isSwiped]);

  useEffect(() => {
    if (isUserRouteProps(item)) {
      if (item.backgroundImg !== null) {
        if (item.backgroundImg.includes('test')) {
          setImg(image);
        } else {
          setImg(item.backgroundImg);
        }
      } else {
        setImg(image);
      }
    } else {
      if (item.groupImg.includes('test') || item.groupImg === '') {
        setImg(image);
      } else {
        setImg(item.groupImg);
      }
    }
  }, []);

  const isUserRouteProps = (
    item: UserRouteProps | MeetInfo,
  ): item is UserRouteProps => {
    return (item as UserRouteProps).courseId !== undefined;
  };

  const isMeetInfo = (item: UserRouteProps | MeetInfo): item is MeetInfo => {
    return (item as MeetInfo).groupId !== undefined;
  };

  return (
    <S.CardLongContainer onClick={onClickCard}>
      <div
        className="card"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          width: isSwiped ? 'calc(100% - 58px)' : '100%',
          transition: 'width 0.3s ease',
        }}
      >
        <img src={img} alt="" />
        <div className="info-box">
          <div className="review">
            {/* <Icon name="IconStar" /> */}
            {isUserRouteProps(item) && (
              <Text $typography="t12" color="white">
                {item.scoreAvg}
              </Text>
            )}
            {isUserRouteProps(item) && (
              <Text $typography="t12" color="white">
                ({item.commentCnt})
              </Text>
            )}
          </div>

          {isUserRouteProps(item) ? (
            <Text $typography="t14" $bold={true} color="white">
              {item.courseName}
            </Text>
          ) : (
            <Text $typography="t14" $bold={true} color="white">
              {item.title}
            </Text>
          )}

          <div className="info-root">
            <Text $typography="t10" color="white">
              {item.startPoint}
            </Text>
            <Icon name="IconArrowWhite" />
            <Text $typography="t10" color="white">
              {item.endPoint}
            </Text>
            <div className="line" />
            <Text $typography="t10" color="white">
              {item.totalDistance}km
            </Text>
          </div>
        </div>

        {hasHeart && (
          <Icon
            name="IconHeartWhiteFill"
            size={20}
            style={{
              position: 'absolute',
              right: '20px',
              top: '18px',
              zIndex: '4',
            }}
          />
        )}

        {hasLock && (
          <Icon
            name="IconLock"
            size={20}
            style={{
              position: 'absolute',
              right: '20px',
              top: '18px',
              zIndex: '4',
            }}
          />
        )}

        <div className="badge">
          <Text $typography="t12" $bold={true} color="white">
            {item.totalDays - 1}박 {item.totalDays}일
          </Text>
        </div>

        <div className="black-bg" />
      </div>

      <div className="delete-bg">
        <Flex
          direction="column"
          $align="center"
          $gap="3px"
          onClick={deleteClick}
          style={{ marginRight: '19px', width: 'auto' }}
        >
          <Icon name="IconDelete" />
          <Text $typography="t14" color="white">
            삭제
          </Text>
        </Flex>
      </div>
    </S.CardLongContainer>
  );
}

export default CardLong;
