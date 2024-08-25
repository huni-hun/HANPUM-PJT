import * as S from './Style/My/RootCard.styled';
import img from '../assets/img/img1.jpg';
import Text from './common/Text';
import Flex from './common/Flex';
import BaseButton from './common/BaseButton';
import Icon from './common/Icon/Icon';

function RootCard() {
  return (
    <S.RootCardContainer>
      <div className="card">
        <div className="card-top">
          <div className="card-top-img">
            <img src={img} alt="" />
            <div className="card-progress">78%</div>
          </div>
          <div className="card-top-info">
            <Text $bold={true} $typography="t16">
              대한민국 여행
            </Text>
            <div className="detail-info">
              <Flex>
                <Text $typography="t12" color="grey2">
                  서울
                </Text>
                <Text $typography="t12" color="grey2">
                  -
                </Text>
                <Text $typography="t12" color="grey2">
                  부산
                </Text>
              </Flex>

              <Flex>
                <Text $typography="t12">2024.06.26(수)</Text>
                <Text $typography="t12">-</Text>
                <Text $typography="t12">2024.06.28(금)</Text>
              </Flex>
            </div>
          </div>
        </div>
        <div className="card-bottom">
          <BaseButton size="large" onClick={() => {}}>
            리뷰쓰기
          </BaseButton>
        </div>

        <Icon name="IconMyRooteClose" />
      </div>
    </S.RootCardContainer>
  );
}

export default RootCard;
