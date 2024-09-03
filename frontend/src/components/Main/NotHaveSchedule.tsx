import styled from 'styled-components';
import Flex from '../common/Flex';
import Icon from '../common/Icon/Icon';
import noScheduleImg from '../../assets/img/nohave_schedule.png';
import { colors } from '@/styles/colorPalette';
import Text from '../common/Text';
import { useNavigate } from 'react-router-dom';

function NotHaveSchedule() {
  const navigate = useNavigate();
  return (
    <NotHaveScheduleContainer>
      <Flex $justify="space-between">
        <p>아직 일정이 없으시다면?</p>
        <img src={noScheduleImg} alt="" />
      </Flex>
      <div
        className="btn-box"
        onClick={() => {
          //  일정 추가 페이지
        }}
      >
        <Icon name="IconAddSchedule" size={33} />
        <Text $typography="t14" $bold={true} color="main">
          나의 일정 만들기
        </Text>
      </div>
    </NotHaveScheduleContainer>
  );
}

export default NotHaveSchedule;

const NotHaveScheduleContainer = styled.div`
  padding: 20px 24px 20px;
  background-color: ${colors.white};
  p {
    width: 10.3rem;
    height: 5.6rem;
    line-height: 140%;
    font-size: 2rem;
    font-weight: bold;
    margin-top: 7px;
  }
  img {
    width: 9.5rem;
    height: 7.7rem;
    margin-right: 12px;
  }

  .btn-box {
    width: 100%;
    height: 7.9rem;
    border-radius: 12px;
    background-color: rgba(26, 130, 59, 0.1);
    margin-top: 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 5px;
  }
`;
