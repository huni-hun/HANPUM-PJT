import Icon from '@common/Icon/Icon';
import * as S from '../Style/Main/Schedule.styled';
import Flex from '../common/Flex';
import Text from '../common/Text';

function Schedule() {
  const percentage = 68;
  return (
    <S.Container>
      <Flex $justify="space-between">
        <Flex direction="column" $gap={4} style={{ width: 'auto' }}>
          <Text $typography="t20" $bold={true}>
            동동님의
          </Text>
          <Text $typography="t20" $bold={true}>
            3일차 일정
          </Text>
        </Flex>
        <div className="location-container">
          <div className="location-item">
            <Text $typography="t10" color="grey2" $bold={true}>
              출발지
            </Text>
            <Text $typography="t12" $bold={true}>
              부산역
            </Text>
          </div>

          <Icon name="IconGreyLeftArrow" width={12} height={8} />

          <div className="location-item">
            <Text $typography="t10" color="grey2" $bold={true}>
              출발지
            </Text>
            <Text $typography="t12" $bold={true}>
              부산역
            </Text>
          </div>
        </div>
      </Flex>
      <div className="attainment-container">
        <Text $typography="t16" $bold={true} style={{ marginBottom: '13px' }}>
          오늘일정의 달성률
        </Text>

        <Flex $justify="space-between">
          <Flex direction="column" $gap={8}>
            <Flex>
              <Text
                $typography="t12"
                color="grey2"
                style={{ maxWidth: '7.5rem', flex: '1' }}
              >
                현재 위치
              </Text>
              <Text $typography="t12" color="grey2" $bold={true}>
                태종대 전망대
              </Text>
            </Flex>

            <Flex>
              <Text
                $typography="t12"
                color="grey2"
                style={{ maxWidth: '7.5rem', flex: '1' }}
              >
                다음 경유지
              </Text>
              <Text $typography="t12" color="grey2" $bold={true}>
                태종대 전망대
              </Text>
            </Flex>
          </Flex>

          <Flex
            direction="column"
            $justify="center"
            $align="center"
            $gap={6}
            style={{
              width: 'auto',
              paddingLeft: '27px',
              borderLeft: '1px solid #e0e0e0',
            }}
          >
            <Text $typography="t20" $bold={true} color="main">
              0%
            </Text>
            <Flex style={{ width: 'auto' }}>
              <Text $typography="t12" color="main">
                0km
              </Text>
              <Text $typography="t12">/52.8km</Text>
            </Flex>
          </Flex>
        </Flex>

        <S.ProgressBar percentage={percentage}>
          <div className="progress" />
        </S.ProgressBar>
      </div>
    </S.Container>
  );
}

export default Schedule;
