import Icon from '@common/Icon/Icon';
import * as S from '../Style/Main/Schedule.styled';
import Flex from '../common/Flex';
import Text from '../common/Text';
import { RunningScheduleProps } from '@/models/schdule'; // 타입 import

interface ScheduleProps {
  data: RunningScheduleProps;
  nickname: string;
}

function Schedule({ data, nickname }: ScheduleProps) {
  const percentage = data.rate ? data.rate : 0;
  const startPoint = data.startPoint || '알 수 없음';
  const endPoint = data.endPoint || '알 수 없음';

  const today = new Date();

  let startDate: Date | undefined;
  let diffDays = 0;

  if (data.startDate) {
    startDate = new Date(
      parseInt(data.startDate.slice(0, 4)),
      parseInt(data.startDate.slice(4, 6)) - 1,
      parseInt(data.startDate.slice(6, 8)),
    );

    const diffTime = Math.abs(today.getTime() - startDate.getTime());
    diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  const todaySchedule = data?.scheduleDayResDtoList?.find(
    (schedule) =>
      schedule.date === today.toISOString().slice(0, 10).replace(/-/g, ''),
  );

  const scheduleWayPointList = todaySchedule?.scheduleWayPointList || [];

  let currentPointIndex: number | undefined = undefined;
  for (let i = scheduleWayPointList.length - 1; i >= 0; i--) {
    if (scheduleWayPointList[i].state === 2) {
      currentPointIndex = i;
      break;
    }
  }

  const currentWayPoint =
    currentPointIndex !== undefined
      ? scheduleWayPointList[currentPointIndex].name
      : '-';

  const nextWaypoint =
    currentPointIndex !== undefined &&
    currentPointIndex < scheduleWayPointList.length - 1
      ? scheduleWayPointList[currentPointIndex + 1].name
      : '-';

  const currentVisitCount =
    todaySchedule?.scheduleWayPointList?.filter((point) => point.state === 2)
      .length || 0;

  const todayTotalVisitCount = todaySchedule?.scheduleWayPointList?.length || 0;

  const achievementPercentage =
    todayTotalVisitCount > 0
      ? (currentVisitCount / todayTotalVisitCount) * 100
      : 0;

  return (
    <S.Container>
      <Flex $justify="space-between">
        <Flex direction="column" $gap={4} style={{ width: 'auto' }}>
          <Text $typography="t20" $bold={true}>
            {nickname}님의
          </Text>
          <Text $typography="t20" $bold={true}>
            {diffDays}일차 일정
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
                현재 경유지
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
              <Text $typography="t12" color="main"></Text>
              <Text $typography="t12"></Text>
            </Flex>
          </Flex>
        </Flex>

        <S.ProgressBar percentage={achievementPercentage}>
          <div className="progress" />
        </S.ProgressBar>
      </div>
    </S.Container>
  );
}

export default Schedule;
