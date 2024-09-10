import * as S from './Style/My/RootCard.styled';
import img from '../assets/img/img1.jpg';
import Text from './common/Text';
import Flex from './common/Flex';
import BaseButton from './common/BaseButton';
import Icon from './common/Icon/Icon';
import { useNavigate } from 'react-router-dom';

interface RootCardProps {
  backgroundImg: string;
  courseId: number;
  courseName: string;
  courseUsedId: number;
  endDate: string;
  endPoint: string;
  progressRate: number;
  startDate: string;
  startPoint: string;
  useFlag: boolean;
}

function RootCard(props: RootCardProps) {
  const navigate = useNavigate();

  const setDate = (date: string) => {
    const dayOfWeek = new Date(date).getDay();

    switch (dayOfWeek) {
      case 0:
        return '일';
      case 1:
        return '월';
      case 2:
        return '화';
      case 3:
        return '수';
      case 4:
        return '목';
      case 5:
        return '금';
      default:
        return '토';
    }
  };

  return (
    <S.RootCardContainer>
      <div className="card">
        <div className="card-top">
          <div className="card-top-img">
            <img src={props.backgroundImg} alt="" />
            <div className="card-progress">{props.progressRate}%</div>
          </div>
          <div className="card-top-info">
            <Text $bold={true} $typography="t16">
              {props.courseName}
            </Text>
            <div className="detail-info">
              <Flex>
                <Text $typography="t12" color="grey2">
                  {props.startPoint}
                </Text>
                <Text $typography="t12" color="grey2">
                  -
                </Text>
                <Text $typography="t12" color="grey2">
                  {props.endPoint}
                </Text>
              </Flex>

              <Flex>
                {props.endDate !== null && (
                  <Text $typography="t12">
                    {props.startDate}({setDate(props.startDate)})
                  </Text>
                )}
                {props.endDate !== null && <Text $typography="t12">-</Text>}
                {props.endDate !== null && (
                  <Text $typography="t12">
                    {props.endDate}({setDate(props.endDate)})
                  </Text>
                )}
                {props.endDate === null && (
                  <Text $typography="t12">진행중</Text>
                )}
              </Flex>
            </div>
          </div>
        </div>
        <div className="card-bottom">
          <BaseButton
            size="large"
            onClick={() => {
              navigate(`/mypage/review/${1}`, {
                state: {
                  start: props.startPoint,
                  end: props.endPoint,
                  title: props.courseName,
                  courseId: props.courseId,
                  img: props.backgroundImg,
                },
              });
            }}
          >
            리뷰쓰기
          </BaseButton>
        </div>

        <Icon name="IconMyRooteClose" />
      </div>
    </S.RootCardContainer>
  );
}

export default RootCard;
