import * as S from './CardLong.styled';
import image from '../../../assets/img/img1.jpg';
import Icon from '../Icon/Icon';
import Text from '../Text';
import { Root } from '@/models/root';

function CardLong({ item }: { item: Root }) {
  return (
    <S.CardLongContainer>
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

      <div className="badge">
        <Text $typography="t12" $bold={true} color="white">
          5박 6일
        </Text>
      </div>

      <div className="black-bg" />
    </S.CardLongContainer>
  );
}

export default CardLong;
