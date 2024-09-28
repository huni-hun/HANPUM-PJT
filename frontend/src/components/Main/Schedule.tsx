import Icon from '@common/Icon/Icon';
import * as S from '../Style/Main/Schedule.styled';
import Flex from '../common/Flex';
import Text from '../common/Text';
import { RunningScheduleProps } from '@/models/schdule'; // 타입 import

function Schedule({ data }: { data: RunningScheduleProps }) {
  const percentage = data.rate ? data.rate : 0;
  // const totalDistance = data.totalDistance ? data.totalDistance : 0;
  // const currentLocation = data.scheduleWayPointList?.[0]?.name || '알 수 없음';
  const startPoint = data.startPoint || '알 수 없음';
  const endPoint = data.endPoint || '알 수 없음';

  /** 오늘 달성률 */
  const today = new Date().toISOString().slice(0, 10).replace(/-/g, '');

  const todaySchedule = data?.scheduleDayResDtoList?.find(
    (schedule) => schedule.date === today,
  );

  const scheduleWayPointList = todaySchedule?.scheduleWayPointList || [];

  // 현재 경유지 인덱스를 찾습니다 (point.state === 2인 항목 중 첫 번째 요소)
  let currentPointIndex: number | undefined = undefined;
  for (let i = scheduleWayPointList.length - 1; i >= 0; i--) {
    if (scheduleWayPointList[i].state === 2) {
      currentPointIndex = i;
      break;
    }
  }

  // 현재 경유지
  const currentWayPoint =
    currentPointIndex !== undefined
      ? scheduleWayPointList[currentPointIndex].name
      : '알 수 없음';

  // 다음 경유지
  const nextWaypoint =
    currentPointIndex !== undefined &&
    currentPointIndex < scheduleWayPointList.length - 1
      ? scheduleWayPointList[currentPointIndex + 1].name
      : '도착지 없음';

  const currentVisitCount =
    todaySchedule?.scheduleWayPointList?.filter((point) => point.state === 2)
      .length || 0;

  const todayTotalVisitCount = todaySchedule?.scheduleWayPointList?.length || 0;

  // 달성률 퍼센트 계산
  const achievementPercentage =
    todayTotalVisitCount > 0
      ? (currentVisitCount / todayTotalVisitCount) * 100
      : 0;

  return (
    <S.Container>
      <Flex $justify="space-between">
        <Flex direction="column" $gap={4} style={{ width: 'auto' }}>
          <Text $typography="t20" $bold={true}>
            동동님의
          </Text>
          <Text $typography="t20" $bold={true}>
            {data.title || '일정'} {/* 일정 제목 */}
          </Text>
        </Flex>
        <div className="location-container">
          <div className="location-item">
            <Text $typography="t10" color="grey2" $bold={true}>
              출발지
            </Text>
            <Text $typography="t12" $bold={true}>
              {startPoint}
            </Text>
          </div>

          <Icon name="IconGreyLeftArrow" width={12} height={8} />

          <div className="location-item">
            <Text $typography="t10" color="grey2" $bold={true}>
              도착지
            </Text>
            <Text $typography="t12" $bold={true}>
              {endPoint}
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
                {/* 현재 위치 */}
                출발 경유지
              </Text>
              <Text $typography="t12" color="grey2" $bold={true}>
                {currentWayPoint}
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
                {nextWaypoint}
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
              {achievementPercentage}%
            </Text>
            <Flex style={{ width: 'auto' }}>
              <Text $typography="t12" color="main">
                {/* 0km */}
              </Text>
              <Text $typography="t12">
                {/* {todaySchedule?.totalDistance !== undefined
                  ? parseFloat(todaySchedule.totalDistance)
                  : 0}
                km */}
              </Text>
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
