import * as S from './CardLong.styled';
import image from '../../../assets/img/img1.jpg';
import Icon from '../Icon/Icon';
import Text from '../Text';
import { Root } from '@/models/root';
import { useState } from 'react';
import Flex from '../Flex';

function CardLong({
  item,
  hasHeart,
  hasLock,
  canDelete,
}: {
  item: Root;
  hasHeart?: boolean;
  hasLock?: boolean;
  canDelete?: boolean;
}) {
  const [translateX, setTranslateX] = useState(0);
  const [startX, setStartX] = useState<number | null>(null);
  const [isSwiped, setIsSwiped] = useState(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (startX !== null) {
      let deltaX = e.touches[0].clientX - startX;
      if (deltaX < -58) {
        deltaX = -58; // deltaX를 -58로 제한
        setIsSwiped(true);
      }
      setTranslateX(deltaX);
    }
  };

  const handleTouchEnd = () => {
    if (translateX < -30) {
      setIsSwiped(true);
    } else {
      setIsSwiped(false);
    }
    setTranslateX(0); // 드래그를 놓으면 원래 자리로 돌아감
    setStartX(null);
  };

  return (
    <S.CardLongContainer>
      <div
        className="card"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <img src={image} alt="" />
        <div className="info-box">
          <div className="review">
            <Icon name="IconStar" />
            <Text $typography="t12" color="white">
              3.5
            </Text>
            <Text $typography="t12" color="white">
              (3)
            </Text>
          </div>

          <Text $typography="t14" $bold={true} color="white">
            {item.courseName}
          </Text>

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
            5박 6일
          </Text>
        </div>

        <div className="black-bg" />
      </div>

      <div className="delete-bg">
        <Flex
          direction="column"
          $align="center"
          $gap="3px"
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
